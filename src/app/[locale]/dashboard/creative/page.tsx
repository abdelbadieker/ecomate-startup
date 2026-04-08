import { createClient } from '@/lib/supabase/server';
import CreativeViewer from '@/components/dashboard/creative/CreativeViewer';

export default async function CreativePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: assets } = await supabase
    .from('creative_assets')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Creative Studio</h2>
        <p className="text-[var(--text-sub)]">Your premium marketing assets, delivered by our in-house creative team.</p>
      </div>

      <CreativeViewer assets={assets || []} />
    </div>
  );
}
