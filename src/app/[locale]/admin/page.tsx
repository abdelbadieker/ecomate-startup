import { createClient } from '@/lib/supabase/server';
import AdminStats from '@/components/admin/AdminStats';

export default async function AdminOverview() {
  const supabase = await createClient();

  // Global platform metrics
  const [
    { count: merchantCount },
    { count: activeSubsCount },
    { data: allOrders },
    { count: pendingReviewCount },
  ] = await Promise.all([
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
    supabase.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    supabase.from('orders').select('total_da'),
    supabase.from('reviews').select('*', { count: 'exact', head: true }).eq('is_approved', false),
  ]);

  const totalRevenue = (allOrders || []).reduce((s, o) => s + (o.total_da || 0), 0);

  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Global Analytics</h2>
        <p className="text-[#a78bfa]/60">Platform-wide metrics and governance overview.</p>
      </div>

      <AdminStats
        merchantCount={merchantCount || 0}
        activeSubsCount={activeSubsCount || 0}
        totalRevenue={totalRevenue}
        pendingReviewCount={pendingReviewCount || 0}
      />
    </div>
  );
}
