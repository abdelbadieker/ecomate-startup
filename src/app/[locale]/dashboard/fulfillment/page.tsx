import { createClient } from '@/lib/supabase/server';
import FulfillmentTable from '@/components/dashboard/fulfillment/FulfillmentTable';

export default async function FulfillmentPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: inventory } = await supabase
    .from('inventory')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Fulfillment & Warehousing</h2>
        <p className="text-[var(--text-sub)]">EcoMate warehouse inventory tracking and stock management.</p>
      </div>

      <div className="card-glass p-6">
        <FulfillmentTable initialInventory={inventory || []} />
      </div>
    </div>
  );
}
