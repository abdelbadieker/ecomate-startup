'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Star, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { approveReview, rejectReview, featureReview } from '@/lib/actions/admin.actions';

interface Review {
  id: string;
  is_approved: boolean;
  is_featured: boolean;
  reviewer_name: string;
  business_name: string;
  reviewer_wilaya: string;
  rating: number;
  title?: string;
  content: string;
}

export default function ReviewsManager({ reviews: initialReviews }: { reviews: Review[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved'>('all');

  const filtered = reviews.filter(r => {
    if (filter === 'pending') return !r.is_approved;
    if (filter === 'approved') return r.is_approved;
    return true;
  });

  const handleApprove = async (id: string) => {
    const res = await approveReview(id);
    if (res.success) {
      setReviews(reviews.map(r => r.id === id ? { ...r, is_approved: true } : r));
      toast.success('Review approved!');
    } else {
      toast.error(res.error || 'Failed');
    }
  };

  const handleReject = async (id: string) => {
    const res = await rejectReview(id);
    if (res.success) {
      setReviews(reviews.filter(r => r.id !== id));
      toast.success('Review removed.');
    } else {
      toast.error(res.error || 'Failed');
    }
  };

  const handleFeature = async (id: string, current: boolean) => {
    const res = await featureReview(id, !current);
    if (res.success) {
      setReviews(reviews.map(r => r.id === id ? { ...r, is_featured: !current } : r));
      toast.success(!current ? 'Review featured!' : 'Unfeatured.');
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-3">
        {(['all', 'pending', 'approved'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              filter === f
                ? 'bg-[#7c3aed]/15 text-[#a78bfa] border border-[#7c3aed]/20'
                : 'bg-white/5 text-white/40 hover:text-white border border-transparent'
            }`}
          >
            {f === 'all' ? `All (${reviews.length})` : f === 'pending' ? `Pending (${reviews.filter(r => !r.is_approved).length})` : `Approved (${reviews.filter(r => r.is_approved).length})`}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="h-40 flex items-center justify-center border-2 border-dashed border-[#7c3aed]/10 rounded-2xl text-white/30">
          No reviews to display.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl p-6 relative overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}
            >
              {review.is_featured && (
                <div className="absolute top-3 right-3">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                </div>
              )}

              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed]/30 to-[#5b21b6]/30 flex items-center justify-center text-white font-bold">
                  {review.reviewer_name?.charAt(0)?.toUpperCase() || 'R'}
                </div>
                <div className="flex-1">
                  <h4 className="text-white font-poppins font-bold">{review.reviewer_name}</h4>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-white/30">{review.business_name}</span>
                    <span className="text-xs text-white/20">•</span>
                    <span className="text-xs text-white/30">{review.reviewer_wilaya}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-0.5 mb-3">
                {Array.from({ length: 5 }).map((_, si) => (
                  <Star key={si} className={`w-4 h-4 ${si < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/10'}`} />
                ))}
              </div>

              {review.title && <h5 className="text-white font-medium mb-1">{review.title}</h5>}
              <p className="text-sm text-white/50 leading-relaxed">{review.content}</p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#7c3aed]/10">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  review.is_approved ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                }`}>
                  {review.is_approved ? '✓ Approved' : '⏳ Pending'}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleFeature(review.id, review.is_featured)}
                    className="w-8 h-8 rounded-lg bg-white/5 border border-[#7c3aed]/10 flex items-center justify-center text-white/40 hover:text-yellow-400 transition-colors"
                    title="Toggle Featured"
                  >
                    <Sparkles className="w-4 h-4" />
                  </button>
                  {!review.is_approved && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-400 hover:bg-green-500/20 transition-colors"
                      title="Approve"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleReject(review.id)}
                    className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors"
                    title="Reject / Delete"
                  >
                    <XCircle className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
