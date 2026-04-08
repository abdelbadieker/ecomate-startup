import { createClient } from '@/lib/supabase/server';
import PartnersManager from '@/components/admin/PartnersManager';

export default async function AdminPartnersPage() {
  const supabase = await createClient();

  const { data: partners } = await supabase
    .from('partners')
    .select('*')
    .order('row_num', { ascending: true })
    .order('sort_order', { ascending: true });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Partners Marquee</h2>
        <p className="text-[#a78bfa]/60">Manage the 16 partner slots displayed on the Landing Page.</p>
      </div>

      <PartnersManager partners={partners || []} />
    </div>
  );
}
