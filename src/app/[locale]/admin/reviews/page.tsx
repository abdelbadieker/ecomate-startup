import { createClient } from '@/lib/supabase/server';
import ReviewsManager from '@/components/admin/ReviewsManager';

export default async function AdminReviewsPage() {
  const supabase = await createClient();

  const { data: reviews } = await supabase
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Review Moderation</h2>
        <p className="text-[#a78bfa]/60">Approve or reject merchant reviews before they go live on the Landing Page.</p>
      </div>

      <ReviewsManager reviews={reviews || []} />
    </div>
  );
}
