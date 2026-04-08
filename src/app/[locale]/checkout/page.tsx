import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function CheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/?modal=signin');
  }

  // Check if they already have an active subscription, if so, bounce them to dashboard
  const { data: profile } = await supabase
    .from('profiles')
    .select('subscription_status')
    .eq('id', user.id)
    .single();

  if (profile?.subscription_status === 'active') {
    redirect('/dashboard');
  }

  return (
    <div className="min-h-screen bg-[var(--bg-body)] flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-primary-light rounded-full mix-blend-screen filter blur-[80px] opacity-20 animate-float-1" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent rounded-full mix-blend-screen filter blur-[100px] opacity-10 animate-float-2" />
      
      <div className="relative z-10 max-w-3xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white font-bold text-3xl shadow-lg mx-auto mb-6">
            E
          </div>
          <h1 className="text-4xl md:text-5xl font-poppins font-extrabold mb-4">
            Activate Your Account
          </h1>
          <p className="text-[var(--text-sub)] text-lg">
            Choose a plan to unlock the full power of the EcoMate ecosystem.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Growth Plan */}
          <div className="card-glass p-8 flex flex-col relative border-primary/50 shadow-[0_0_40px_rgba(37,99,235,0.15)] transform hover:scale-[1.02] transition-transform">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-light to-primary rounded-t-3xl"></div>
            <div className="badge-blue w-max mb-4">Most Popular</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">Growth Plan</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold font-poppins">4,900</span>
              <span className="text-text-muted mb-1">DA / month</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-text-main font-medium">
                <span className="text-accent">✓</span> Full AI Sales System
              </li>
              <li className="flex items-center gap-3 text-text-main font-medium">
                <span className="text-accent">✓</span> Unlimited orders
              </li>
              <li className="flex items-center gap-3 text-text-main font-medium">
                <span className="text-accent">✓</span> Native Yalidine Integration
              </li>
              <li className="flex items-center gap-3 text-text-main font-medium">
                <span className="text-accent">✓</span> Advanced Analytics
              </li>
            </ul>
            <button className="btn-primary w-full shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]">
              Pay dynamically via Chargily
            </button>
          </div>

          {/* Agency Plan */}
           <div className="card-glass p-8 flex flex-col hover:border-admin/50 transition-colors group">
            <div className="badge-purple w-max mb-4 group-hover:bg-admin/20 transition-colors">Premium</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">Agency Plan</h3>
            <div className="flex items-end gap-2 mb-6">
              <span className="text-4xl font-bold font-poppins text-admin">Custom</span>
            </div>
            <ul className="flex flex-col gap-4 mb-8 flex-1">
              <li className="flex items-center gap-3 text-[var(--text-sub)] group-hover:text-white transition-colors">
                <span className="text-admin">✓</span> TikTok/Reels creation
              </li>
              <li className="flex items-center gap-3 text-[var(--text-sub)] group-hover:text-white transition-colors">
                <span className="text-admin">✓</span> Physical order fulfillment
              </li>
              <li className="flex items-center gap-3 text-[var(--text-sub)] group-hover:text-white transition-colors">
                <span className="text-admin">✓</span> Dedicated Account Manager
              </li>
              <li className="flex items-center gap-3 text-[var(--text-sub)] group-hover:text-white transition-colors">
                <span className="text-admin">✓</span> Priority Support 24/7
              </li>
            </ul>
            <button className="btn-ghost w-full">
              Contact Sales
            </button>
          </div>
        </div>

        <div className="mt-12 text-center text-[var(--text-muted)] flex items-center justify-center gap-4">
          <div className="h-[1px] w-12 bg-[var(--border-c)]" />
          <p className="text-sm">Secure payment processing powered by <span className="text-white font-medium">Chargily Pay</span></p>
          <div className="h-[1px] w-12 bg-[var(--border-c)]" />
        </div>
      </div>
    </div>
  );
}
