import { useTranslations } from 'next-intl';

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="features" className="py-24 px-6 max-w-7xl mx-auto z-10 relative">
      <div className="text-center mb-16 sr vis d1">
        <h2 className="text-3xl md:text-5xl font-poppins font-bold mb-4">
          Everything You Need, <span className="text-primary-light">In One Place.</span>
        </h2>
        <p className="text-text-sub text-lg max-w-2xl mx-auto">
          We replaced 6 different disjointed platforms with a single, perfectly integrated ecosystem built natively for the Algerian market.
        </p>
      </div>

      <div className="bento">
        {/* Card 1: AI Chatbot (Span 7) */}
        <div className="b-span-full md:b-span-7 card-glass p-8 flex flex-col justify-between h-[300px] sr vis d1 group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-3xl mb-4">🤖</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">{t('aiChatbot')}</h3>
            <p className="text-text-muted">Automate your DMs, convert comments to sales, and answer customer queries in Arabic/French instantly 24/7.</p>
          </div>
          <div className="badge-blue w-max">Included in Growth Plan</div>
        </div>

        {/* Card 2: Logistics (Span 5) */}
        <div className="b-span-full md:b-span-5 card-glass p-8 flex flex-col justify-between h-[300px] sr vis d2 group">
          <div>
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-3xl mb-4">🚚</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">{t('logistics')}</h3>
            <p className="text-text-muted">Direct Yalidine integration. Automatic status updates pushed directly to the dashboard across all 58 wilayas.</p>
          </div>
          <div className="badge-green w-max flex items-center gap-2"><div className="dot-green"></div> Active</div>
        </div>

        {/* Card 3: ePayment (Span 4) */}
        <div className="b-span-full md:b-span-4 card-glass p-8 flex flex-col justify-between h-[300px] sr vis d3">
          <div>
            <div className="w-12 h-12 rounded-xl bg-admin/20 flex items-center justify-center text-3xl mb-4">💳</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">{t('payment')}</h3>
            <p className="text-text-muted">CIB and Edahabia native support via Chargily API. Let customers pay upfront securely.</p>
          </div>
        </div>

        {/* Card 4: Fulfillment (Span 4) */}
        <div className="b-span-full md:b-span-4 card-glass p-8 flex flex-col justify-between h-[300px] sr vis d4">
          <div>
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center text-3xl mb-4">📦</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">{t('fulfillment')}</h3>
            <p className="text-text-muted">Send us your stock, we handle the packaging, calls, and shipping. Physical warehousing included.</p>
          </div>
        </div>

        {/* Card 5: Creative Studio (Span 4) */}
        <div className="b-span-full md:b-span-4 card-glass p-8 flex flex-col justify-between h-[300px] sr vis d1 relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-xl bg-pink-500/20 flex items-center justify-center text-3xl mb-4">🎬</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">{t('creative')}</h3>
            <p className="text-text-muted">TikTok & Reels creation. Stop worrying about content, let our agency produce high-converting short forms.</p>
          </div>
        </div>

        {/* Card 6: Web Dev (Span full or span 8/4) */}
        <div className="b-span-full card-glass p-8 rounded-b-3xl sr vis d2 flex flex-col md:flex-row items-center gap-8">
           <div className="flex-1">
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-3xl mb-4">💻</div>
            <h3 className="text-2xl font-poppins font-bold mb-2">{t('webdev')}</h3>
            <p className="text-text-muted">Need a custom landing page or store? Our team builds hyper-optimized sites with the EcoMate backend attached.</p>
          </div>
          <div className="flex-1 w-full h-32 rounded-xl flex items-center justify-start gap-4">
             {/* Abstract code visual */}
             <div className="w-full bg-[#0a1628] h-full rounded-xl border border-white/10 p-4 font-mono text-sm text-text-muted flex flex-col gap-2">
               <div className="w-3/4 h-3 bg-primary/20 rounded"></div>
               <div className="w-1/2 h-3 bg-white/10 rounded"></div>
               <div className="w-full h-3 bg-white/10 rounded"></div>
               <div className="w-5/6 h-3 bg-white/10 rounded"></div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
