import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// ═══════════════════════════════════════════════════════════════
// ECOMATE WEBHOOK — Make.com / n8n Inbound Order Endpoint
// ═══════════════════════════════════════════════════════════════
// Security: HMAC SHA-256 signature validation
// Bypass: Uses Service Role Key to bypass RLS for automated inserts
// ═══════════════════════════════════════════════════════════════

function verifySignature(payload: string, signature: string | null): boolean {
  const secret = process.env.MAKE_WEBHOOK_SECRET;
  if (!secret) {
    console.warn('[Webhook] MAKE_WEBHOOK_SECRET not set — skipping signature validation');
    return true; // Allow in dev if no secret configured
  }
  if (!signature) return false;

  const expected = crypto
    .createHmac('sha256', secret)
    .update(payload)
    .digest('hex');

  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expected, 'hex')
  );
}

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-ecomate-signature');

    // ── 1. Verify HMAC signature ──────────────────────────
    if (!verifySignature(rawBody, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }

    const body = JSON.parse(rawBody);

    // ── 2. Validate required fields ───────────────────────
    const { user_id, customer_name, customer_phone, customer_wilaya, products, source } = body;

    if (!user_id || !customer_name) {
      return NextResponse.json({ error: 'Missing required fields: user_id, customer_name' }, { status: 400 });
    }

    // ── 3. Create Supabase admin client (bypasses RLS) ────
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // ── 4. Upsert Customer ────────────────────────────────
    const { data: existingCustomer } = await supabase
      .from('customers')
      .select('id, total_orders, total_spent_da')
      .eq('user_id', user_id)
      .eq('phone', customer_phone || '')
      .single();

    // Calculate order total
    const orderProducts = Array.isArray(products) ? products : [];
    const subtotal = orderProducts.reduce((sum: number, p: Record<string, unknown>) => sum + ((Number(p.unit_price) || 0) * (Number(p.quantity) || 1)), 0);
    const deliveryFee = body.delivery_fee_da || 0;
    const totalDa = subtotal + deliveryFee;

    if (existingCustomer) {
      await supabase.from('customers').update({
        total_orders: (existingCustomer.total_orders || 0) + 1,
        total_spent_da: (existingCustomer.total_spent_da || 0) + totalDa,
        last_order_at: new Date().toISOString()
      }).eq('id', existingCustomer.id);
    } else {
      await supabase.from('customers').insert({
        user_id,
        name: customer_name,
        phone: customer_phone || '',
        wilaya: customer_wilaya || '',
        source: source || 'api',
        total_orders: 1,
        total_spent_da: totalDa,
        last_order_at: new Date().toISOString()
      });
    }

    // ── 5. Insert Order ───────────────────────────────────
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id,
        customer_name,
        customer_phone: customer_phone || '',
        customer_address: body.customer_address || '',
        customer_wilaya: customer_wilaya || '',
        customer_commune: body.customer_commune || '',
        products: orderProducts,
        subtotal_da: subtotal,
        delivery_fee_da: deliveryFee,
        total_da: totalDa,
        status: 'pending',
        payment_method: body.payment_method || 'cod',
        source: source || 'api',
        ai_confirmed: body.ai_confirmed || false,
        make_webhook_id: body.make_webhook_id || null
      })
      .select()
      .single();

    if (orderError) {
      console.error('[Webhook] Order insert error:', orderError);
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
    }

    // ── 6. Decrement Product Stock ────────────────────────
    for (const item of orderProducts) {
      if (item.product_id) {
        // Decrement product stock
        const { data: product } = await supabase
          .from('products')
          .select('stock')
          .eq('id', item.product_id)
          .single();

        if (product) {
          const newStock = Math.max(0, (product.stock || 0) - (item.quantity || 1));
          await supabase.from('products').update({ stock: newStock }).eq('id', item.product_id);

          // Also update inventory
          await supabase.from('inventory').update({
            quantity_reserved: item.quantity || 1
          }).eq('product_id', item.product_id);
        }
      }
    }

    return NextResponse.json({
      success: true,
      order_id: order.id,
      order_number: order.order_number
    }, { status: 201 });

  } catch (err: unknown) {
    console.error('[Webhook] Unhandled error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Health check for Make.com verification
export async function GET() {
  return NextResponse.json({ status: 'ok', service: 'ecomate-webhook-v2' });
}
