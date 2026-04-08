'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, CreditCard, Star, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { updateProfile, changePassword, submitReview, deleteAccount } from '@/lib/actions/settings.actions';

const TABS = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'subscription', label: 'Subscription', icon: CreditCard },
  { id: 'review', label: 'Leave a Review', icon: Star },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
];

interface Subscription {
  status: string;
  plans?: {
    name: string;
    price_da: number;
  };
}

interface Profile {
  full_name?: string;
  business_name?: string;
  phone?: string;
  wilaya?: string;
  subscription_status?: string;
  subscriptions?: Subscription | Subscription[] | null;
}

export default function SettingsTabs({ profile, userEmail }: { profile: Profile | null; userEmail: string }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sub = Array.isArray(profile?.subscriptions) ? profile.subscriptions[0] : profile?.subscriptions;

  return (
    <div className="flex flex-col gap-6">
      {/* Tab Navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary/10 text-primary-light border border-primary/20'
                  : 'text-[var(--text-sub)] hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'profile' && (
            <div className="card-glass p-6 md:p-8">
              <h3 className="text-xl font-poppins font-bold text-white mb-6">Business Profile</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const res = await updateProfile(new FormData(e.currentTarget));
                  setIsSubmitting(false);
                  if (res.error) {
                    toast.error(res.error);
                  } else {
                    toast.success('Profile updated!');
                  }
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Full Name</label>
                  <input name="full_name" defaultValue={profile?.full_name || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Business Name</label>
                  <input name="business_name" defaultValue={profile?.business_name || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Phone</label>
                  <input name="phone" defaultValue={profile?.phone || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Wilaya</label>
                  <input name="wilaya" defaultValue={profile?.wilaya || ''} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Email</label>
                  <input disabled value={userEmail} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[var(--text-muted)] cursor-not-allowed" />
                </div>
                <div className="md:col-span-2">
                  <button type="submit" disabled={isSubmitting} className="btn-primary">
                    {isSubmitting ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="card-glass p-6 md:p-8">
              <h3 className="text-xl font-poppins font-bold text-white mb-6">Change Password</h3>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const fd = new FormData(e.currentTarget);
                  const newPw = fd.get('new_password') as string;
                  const confirmPw = fd.get('confirm_password') as string;
                  if (newPw !== confirmPw) { toast.error('Passwords do not match'); setIsSubmitting(false); return; }
                  if (newPw.length < 8) { toast.error('Password must be at least 8 characters'); setIsSubmitting(false); return; }
                  const res = await changePassword('', newPw);
                  setIsSubmitting(false);
                  if (res.error) {
                    toast.error(res.error);
                  } else {
                    toast.success('Password updated!');
                  }
                }}
                className="flex flex-col gap-4 max-w-md"
              >
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">New Password</label>
                  <input name="new_password" type="password" required minLength={8} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Confirm New Password</label>
                  <input name="confirm_password" type="password" required minLength={8} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-fit">
                  {isSubmitting ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'subscription' && (
            <div className="card-glass p-6 md:p-8">
              <h3 className="text-xl font-poppins font-bold text-white mb-6">Subscription</h3>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center">
                  <CreditCard className="w-8 h-8 text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-poppins font-bold text-lg">
                    {sub?.plans?.name || 'No Plan'}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      sub?.status === 'active' ? 'badge-green' : 'bg-white/5 text-[var(--text-muted)]'
                    }`}>
                      {sub?.status || profile?.subscription_status || 'inactive'}
                    </span>
                    {(sub?.plans?.price_da ?? 0) > 0 && (
                      <span className="text-sm text-[var(--text-sub)]">
                        {sub?.plans?.price_da?.toLocaleString()} DA/month
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <p className="text-sm text-[var(--text-sub)] leading-relaxed">
                To upgrade or change your plan, please contact our team or visit the pricing page.
                Plan changes take effect immediately upon admin confirmation.
              </p>
            </div>
          )}

          {activeTab === 'review' && (
            <div className="card-glass p-6 md:p-8">
              <h3 className="text-xl font-poppins font-bold text-white mb-2">Leave a Review</h3>
              <p className="text-sm text-[var(--text-sub)] mb-6">
                Share your experience with EcoMate. Your review will be published after admin approval.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setIsSubmitting(true);
                  const res = await submitReview(new FormData(e.currentTarget));
                  setIsSubmitting(false);
                  if (res.error) {
                    toast.error(res.error);
                  } else {
                    toast.success('Review submitted for approval!');
                  }
                }}
                className="flex flex-col gap-4 max-w-lg"
              >
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(n => (
                      <label key={n} className="cursor-pointer">
                        <input type="radio" name="rating" value={n} defaultChecked={n === 5} className="hidden peer" />
                        <Star className="w-8 h-8 text-white/10 peer-checked:text-yellow-400 peer-checked:fill-yellow-400 transition-colors hover:text-yellow-400/60" />
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Title</label>
                  <input name="title" required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light" placeholder="Great platform!" />
                </div>
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Your Review</label>
                  <textarea name="content" required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light resize-none" placeholder="Tell us about your experience..." />
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-fit">
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

          {activeTab === 'danger' && (
            <div className="card-glass p-6 md:p-8 !border-red-500/20">
              <h3 className="text-xl font-poppins font-bold text-red-400 mb-2">Danger Zone</h3>
              <p className="text-sm text-[var(--text-sub)] mb-6">
                Deleting your account is permanent. All your orders, products, and customer data will be lost.
              </p>
              <button
                onClick={async () => {
                  if (!confirm('Are you absolutely sure? This action cannot be undone.')) return;
                  if (!confirm('FINAL WARNING: All your data will be permanently deleted. Continue?')) return;
                  setIsSubmitting(true);
                  const res = await deleteAccount();
                  setIsSubmitting(false);
                  if (res.success) {
                    window.location.href = '/';
                  } else {
                    toast.error(res.error || 'Failed to delete account');
                  }
                }}
                disabled={isSubmitting}
                className="px-6 py-3 rounded-xl text-sm font-bold bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 transition-all"
              >
                {isSubmitting ? 'Deleting...' : 'Delete My Account'}
              </button>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
