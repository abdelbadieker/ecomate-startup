import { createClient } from '@/lib/supabase/server';
import ClientIntegrationsTable from '@/components/admin/ClientIntegrationsTable';

export default async function AdminIntegrationsPage() {
  const supabase = await createClient();

  // Admin RLS policy allows admin to see all integrations
  const { data: integrations } = await supabase
    .from('social_integrations')
    .select('*, profiles!social_integrations_user_id_fkey(full_name, business_name, email)')
    .order('connected_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Client Integrations</h2>
        <p className="text-[#a78bfa]/60">Manage social tokens for ManyChat/Make.com scenario setup.</p>
      </div>

      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}>
        <ClientIntegrationsTable integrations={integrations || []} />
      </div>
    </div>
  );
}
