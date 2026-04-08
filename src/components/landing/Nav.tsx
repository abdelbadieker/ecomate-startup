"use client";

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname, useRouter } from '@/i18n/routing';
import { useState, useEffect } from 'react';
import { Globe, LogIn } from 'lucide-react';

export default function Nav() {
  const t = useTranslations('nav');
  const path = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLocale = () => {
    // Basic toggle mechanism (EN/FR/AR logic will be simplified here to Arabic / French)
    // Assume current pathname indicates locale implicitly through the router in next-intl
    // But since usePathname strips the locale, we can push to a new locale.
    const nextLocale = document.documentElement.dir === 'rtl' ? 'fr' : 'ar';
    router.replace(path, { locale: nextLocale });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-nav-bg backdrop-blur-xl border-b border-border-c shadow-sm' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
            E
          </div>
          <span className="font-poppins font-bold text-2xl tracking-tight hidden sm:block">
            EcoMate
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="#features" className="text-text-sub hover:text-text-main transition-colors font-medium">
            {t('features')}
          </Link>
          <Link href="#how" className="text-text-sub hover:text-text-main transition-colors font-medium">
            {t('how')}
          </Link>
          <Link href="#pricing" className="text-text-sub hover:text-text-main transition-colors font-medium">
            {t('pricing')}
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={changeLocale}
            className="p-2 rounded-full hover:bg-card-hover transition-colors text-text-sub hover:text-text-main flex items-center gap-2"
            aria-label="Toggle Language"
          >
            <Globe className="w-5 h-5" />
            <span className="font-medium text-sm hidden sm:block">
              {document.documentElement?.dir === 'rtl' ? 'Français' : 'العربية'}
            </span>
          </button>
          
          <Link href="/auth?modal=signin" className="hidden sm:flex btn-ghost items-center gap-2">
            <LogIn className="w-4 h-4" />
            {t('signIn')}
          </Link>
          
          {/* Temporary stub for "Continue with Google" layout demonstration */}
          <button className="btn-primary flex items-center gap-2 text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5 bg-white rounded-full p-0.5"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>
            <span className="hidden sm:inline">Google Auth</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
