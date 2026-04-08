'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateOrderStatus(orderId: string, newStatus: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)
    .eq('user_id', user.id);

  if (error) {
    console.error('Failed to update order status:', error);
    return { error: error.message };
  }

  revalidatePath('/[locale]/dashboard/orders', 'page');
  return { success: true };
}

export async function createManualOrder(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'Unauthorized' };
  }

  const customerName = formData.get('customerName') as string;
  const customerPhone = formData.get('customerPhone') as string;
  const customerWilaya = formData.get('customerWilaya') as string;
  const totalAmount = parseInt((formData.get('totalAmount') as string) || '0', 10);
  
  // Create customer if doesn't exist
  // We do an upsert or just insert an order for simplicity, and insert customer record independently.
  await supabase.from('customers').insert({
    user_id: user.id,
    name: customerName,
    phone: customerPhone,
    wilaya: customerWilaya,
    source: 'manual',
    total_spent_da: totalAmount,
    total_orders: 1
  });

  const { error } = await supabase.from('orders').insert({
    user_id: user.id,
    customer_name: customerName,
    customer_phone: customerPhone,
    customer_wilaya: customerWilaya,
    total_da: totalAmount,
    status: 'pending',
    source: 'manual'
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/[locale]/dashboard/orders', 'page');
  return { success: true };
}
