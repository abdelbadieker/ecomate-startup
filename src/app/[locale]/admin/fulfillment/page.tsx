import { createClient } from '@/lib/supabase/server';
import GlobalFulfillmentTable from '@/components/admin/GlobalFulfillmentTable';

export default async function AdminFulfillmentPage() {
  const supabase = await createClient();

  // Admin sees ALL inventory across all merchants
  const { data: inventory } = await supabase
    .from('inventory')
    .select('*, profiles!inventory_user_id_fkey(full_name, business_name)')
    .order('quantity_in_stock', { ascending: true });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Global Fulfillment</h2>
        <p className="text-[#a78bfa]/60">Warehouse oversight across all merchants — monitor logistics efficiency.</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}>
        <GlobalFulfillmentTable inventory={inventory || []} />
      </div>
    </div>
  );
}
