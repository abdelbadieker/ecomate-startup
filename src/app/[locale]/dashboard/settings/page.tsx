import { createClient } from '@/lib/supabase/server';
import SettingsTabs from '@/components/dashboard/settings/SettingsTabs';

export const metadata = {
  title: 'Settings — EcoMate',
  description: 'Manage your EcoMate profile, security, subscription, and account settings.',
};

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, subscriptions(status, plan_id, plans(name, slug, price_da))')
    .eq('id', user.id)
    .single();

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Settings</h2>
        <p className="text-[var(--text-sub)]">Manage your account, security, and preferences.</p>
      </div>

      <SettingsTabs profile={profile} userEmail={user.email || ''} />
    </div>
  );
}
