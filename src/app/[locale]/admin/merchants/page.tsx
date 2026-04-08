import { createClient } from '@/lib/supabase/server';
import MerchantsTable from '@/components/admin/MerchantsTable';

export default async function AdminMerchantsPage() {
  const supabase = await createClient();

  const { data: merchants } = await supabase
    .from('profiles')
    .select('*, subscriptions(status, plan_id, plans(name, slug))')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Registered Merchants</h2>
        <p className="text-[#a78bfa]/60">Overview of all EcoMate platform users and their subscription status.</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}>
        <MerchantsTable merchants={merchants || []} />
      </div>
    </div>
  );
}
