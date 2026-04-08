import Link from 'next/link';

export default function Pricing() {
  // const t = useTranslations('plans');

  return (
    <section id="pricing" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="text-center mb-16 sr vis d1">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
          Simple, Transparent <span className="text-primary-light">Pricing.</span>
        </h2>
        <p className="text-text-sub text-lg max-w-2xl mx-auto">
          Choose a plan to activate your EcoMate environment. All features included.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 justify-center max-w-5xl mx-auto">
        {/* Starter Plan */}
        <div className="flex-1 card-glass p-8 flex flex-col sr vis d1">
          <h3 className="text-xl font-poppins font-bold mb-2">Starter</h3>
          <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-bold font-poppins">Free</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-accent">✓</span> AI Chatbot (basic)
            </li>
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-accent">✓</span> 50 orders/month
            </li>
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-accent">✓</span> 1 connected channel
            </li>
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-accent">✓</span> Google Sheets export
            </li>
          </ul>
          <Link href="/auth?modal=signup" className="btn-ghost w-full block text-center">Get Started</Link>
        </div>

        {/* Growth Plan */}
        <div className="flex-1 card-glass p-8 flex flex-col sr vis d2 relative border-primary/50 shadow-[0_0_40px_rgba(37,99,235,0.15)] transform scale-105 z-10">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-primary-light to-accent rounded-t-2xl"></div>
          <div className="absolute top-4 right-4 badge-green">Popular</div>
          <h3 className="text-xl font-poppins font-bold mb-2 text-primary-light">Growth</h3>
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
              <span className="text-accent">✓</span> All social channels
            </li>
            <li className="flex items-center gap-3 text-text-main font-medium">
              <span className="text-accent">✓</span> Delivery tracking sync
            </li>
            <li className="flex items-center gap-3 text-text-main font-medium">
              <span className="text-accent">✓</span> Advanced Analytics
            </li>
          </ul>
          <Link href="/auth?modal=signup" className="btn-primary w-full block text-center">Activate Growth</Link>
        </div>

        {/* Custom / Creative Plan */}
        <div className="flex-1 card-glass p-8 flex flex-col sr vis d3">
          <h3 className="text-xl font-poppins font-bold mb-2">Agency Services</h3>
          <div className="flex items-end gap-2 mb-6">
            <span className="text-4xl font-bold font-poppins text-admin">Custom</span>
          </div>
          <ul className="flex flex-col gap-4 mb-8 flex-1">
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-admin">✓</span> TikTok/Reels creation
            </li>
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-admin">✓</span> Physical order fulfillment
            </li>
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-admin">✓</span> Custom E-Commerce Sites
            </li>
            <li className="flex items-center gap-3 text-text-sub">
              <span className="text-admin">✓</span> Dedicated Account Manager
            </li>
          </ul>
          <button className="btn-ghost w-full hover:border-admin/50 hover:text-admin">Contact Sales</button>
        </div>
      </div>
    </section>
  );
}
