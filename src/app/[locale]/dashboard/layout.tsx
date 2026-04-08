import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Sidebar from '@/components/dashboard/Sidebar';
import Topbar from '@/components/dashboard/Topbar';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/${locale}/?modal=signin`);
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('*, subscriptions(status, plan_id)')
    .eq('id', user.id)
    .single();

  // Check subscription: denormalized column first, then joined subscriptions table
  const subStatus =
    profile?.subscription_status ||
    (Array.isArray(profile?.subscriptions)
      ? profile.subscriptions[0]?.status
      : (profile?.subscriptions as Record<string, unknown>)?.status);

  if (subStatus !== 'active') {
    redirect(`/${locale}/checkout`);
  }

  return (
    <div className="min-h-screen bg-[var(--bg-body)] flex relative overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
         <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
         <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
      </div>

      <Sidebar locale={locale} />
      
      <div className="flex-1 flex flex-col relative z-10 w-full overflow-hidden">
        <Topbar profile={profile} />
        <main className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}
