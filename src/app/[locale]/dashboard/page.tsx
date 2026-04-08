import { createClient } from '@/lib/supabase/server';
import OverviewStats from '@/components/dashboard/OverviewStats';
import RevenueChart from '@/components/dashboard/RevenueChart';
import FulfillmentStub from '@/components/dashboard/FulfillmentStub';
import ActivityFeed from '@/components/dashboard/ActivityFeed';

export default async function DashboardOverview() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch real data
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const safeOrders = orders || [];
  
  // Calculate stats
  const totalOrders = safeOrders.length;
  const totalRevenue = safeOrders.reduce((acc, order) => acc + (order.total_da || 0), 0);
  
  // Fulfillment stats logic placeholder
  const fulfillmentActiveCount = safeOrders.filter(o => o.fulfillment_stage && o.fulfillment_stage !== 'not_started').length;

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div className="flex flex-col">
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Performance Overview</h2>
        <p className="text-[var(--text-sub)]">Real-time metrics and AI analytics for your store.</p>
      </div>

      <OverviewStats 
        revenue={totalRevenue} 
        ordersCount={totalOrders} 
        fulfillmentActive={fulfillmentActiveCount} 
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card-glass p-6">
          <h3 className="text-xl font-poppins font-bold mb-6 text-white">Revenue Pipeline</h3>
          <div className="h-[300px] w-full">
            <RevenueChart orders={safeOrders} />
          </div>
        </div>
        
        <div className="lg:col-span-1 card-glass p-6 flex flex-col">
          <h3 className="text-xl font-poppins font-bold mb-6 text-white">Live Activity</h3>
          <div className="flex-1 overflow-y-auto pr-2">
            <ActivityFeed orders={safeOrders} />
          </div>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="text-xl font-poppins font-bold mb-6 text-white">EcoMate Fulfillment Pipeline</h3>
        <FulfillmentStub />
      </div>
    </div>
  );
}
