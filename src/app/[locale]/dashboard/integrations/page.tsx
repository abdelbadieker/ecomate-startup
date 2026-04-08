import { createClient } from '@/lib/supabase/server';
import IntegrationsGrid from '@/components/dashboard/integrations/IntegrationsGrid';

export default async function IntegrationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  // Fetch existing integrations for this user (non-sensitive columns only via RLS)
  const { data: integrations } = await supabase
    .from('social_integrations')
    .select('id, platform, account_name, status, connected_at, last_synced_at')
    .eq('user_id', user.id);

  // Fetch automation configs
  const { data: automations } = await supabase
    .from('automation_configs')
    .select('*')
    .eq('user_id', user.id);

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Integrations Hub</h2>
        <p className="text-[var(--text-sub)]">Connect your social channels and automate your sales pipeline.</p>
      </div>

      <IntegrationsGrid
        integrations={integrations || []}
        automations={automations || []}
      />
    </div>
  );
}
