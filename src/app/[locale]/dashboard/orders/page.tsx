import { createClient } from '@/lib/supabase/server';
import OrdersKanban from '@/components/dashboard/orders/OrdersKanban';
import CreateOrderModal from '@/components/dashboard/orders/CreateOrderModal';

export default async function OrdersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-poppins font-bold text-white mb-2">Orders Pipeline</h2>
          <p className="text-[var(--text-sub)]">Drag and drop orders across fulfillment stages.</p>
        </div>
        <CreateOrderModal />
      </div>

      <div className="flex-1 min-h-0">
        <OrdersKanban initialOrders={orders || []} locale={locale} />
      </div>
    </div>
  );
}
