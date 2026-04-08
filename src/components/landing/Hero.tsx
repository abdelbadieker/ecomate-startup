import { useTranslations } from 'next-intl';

export default function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative pt-40 pb-20 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 min-h-[90vh]">
      {/* Text Content */}
      <div className="flex-1 text-center lg:text-start lg:rtl:text-right z-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary-light font-bold text-sm mb-8 animate-fade-up">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          {t('badge')}
        </div>
        
        <h1 className="text-5xl md:text-7xl font-poppins font-extrabold leading-[1.1] mb-6 tracking-tight">
          <span className="block opacity-90 animate-fade-up d1">{t('line1')}</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-light to-accent animate-fade-up d2">
            {t('line2')}
          </span>
          <span className="block opacity-90 animate-fade-up d3">{t('line3')}</span>
        </h1>
        
        <p className="text-lg md:text-xl text-text-sub font-medium max-w-2xl mx-auto lg:mx-0 mb-10 animate-fade-up d4">
          {t('sub')}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-fade-up" style={{ animationDelay: '0.5s' }}>
          <button className="btn-primary w-full sm:w-auto text-lg flex justify-center items-center gap-2 group">
            Get Started Free
            <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">→</span>
          </button>
          <button className="btn-ghost w-full sm:w-auto text-lg flex justify-center">
            View Live Demo
          </button>
        </div>
      </div>

      {/* Visual / Mockup (Gradient Orbs replacing Three.js temporarily as per guidelines) */}
      <div className="flex-1 relative w-full aspect-square max-w-[500px] z-0">
        {/* Decorative glassmorphism card */}
        <div className="absolute inset-0 m-auto w-3/4 h-3/4 card-glass rounded-3xl rotate-12 flex items-center justify-center -z-10 shadow-2xl overflow-hidden">
          <div className="absolute w-full h-full bg-gradient-to-br from-primary/10 to-accent/10 opacity-50" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 left-0 w-32 h-32 bg-primary-light rounded-full mix-blend-screen filter blur-[50px] opacity-60 animate-float-1" />
        <div className="absolute bottom-1/4 right-0 w-40 h-40 bg-accent rounded-full mix-blend-screen filter blur-[60px] opacity-40 animate-float-2" />
        
        {/* Central Dashboard Mockup Stub */}
        <div className="absolute inset-0 m-auto w-[85%] h-[85%] card-glass rounded-2xl flex flex-col p-6 animate-fade-up">
          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="badge-green">AI Active</div>
          </div>
          
          <div className="flex-1 flex flex-col gap-4">
            <div className="w-full h-24 rounded-xl bg-white/5 border border-white/10 flex items-center p-4 gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl">💰</div>
              <div>
                <div className="text-text-muted text-sm pb-1">Revenue Today</div>
                <div className="text-xl font-bold font-poppins">124,500 DA</div>
              </div>
            </div>
            <div className="w-full h-24 rounded-xl bg-white/5 border border-white/10 flex items-center p-4 gap-4">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-2xl">📦</div>
              <div>
                <div className="text-text-muted text-sm pb-1">Orders Pending</div>
                <div className="text-xl font-bold font-poppins">14 Orders</div>
              </div>
            </div>
            <div className="mt-auto h-8 flex gap-2">
              <div className="h-full w-1/3 bg-primary-light/50 rounded-md" />
              <div className="h-full w-full bg-white/10 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
