import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import '../globals.css';
import AuthModal from '@/components/auth/AuthModal';
import { Toaster } from 'react-hot-toast';
import { Suspense } from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ecomate — Scale your Algerian business without the complexity',
  description: 'The ultimate SaaS platform for Algerian merchants. Automate your sales, inventory, and fulfillment with AI precision.',
  keywords: [
    'E-commerce Algeria',
    'SaaS Algeria',
    'التجارة الإلكترونية في الجزائر',
    'Automation DZ',
    'Ecomate'
  ],
  openGraph: {
    title: 'Ecomate — Scale your Algerian business',
    description: 'Bilingual (AR/EN) merchant platform for the Algerian market.',
    images: ['/og-image.png'],
  },
};
export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "ar")) {
    notFound();
  }

  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} data-theme="dark" className="scroll-smooth">
      <body className="antialiased min-h-screen">
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
          <Suspense fallback={null}>
            <AuthModal />
          </Suspense>
          <Toaster position="top-center" />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
