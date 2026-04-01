import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import AdBanner from '@/components/AdBanner';
import CookieConsent from '@/components/CookieConsent';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL('https://borsacebimde.app'),
  title: {
    default: 'Borsa Cebimde - Halka Arz, KAP Haberleri, AI Analiz ve Borsa Takibi',
    template: '%s | Borsa Cebimde',
  },
  description:
    'Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri, VIOP gece seansi, SPK bulten analizleri, temettü takibi ve borsa yatırım rehberi. BIST borsa verilerini anlık takip edin.',
  keywords: [
    'halka arz',
    'halka arz takvimi',
    'halka arz 2026',
    'KAP haberleri',
    'KAP bildirimleri',
    'borsa',
    'BIST',
    'BIST 100',
    'hisse senedi',
    'borsa yatırım',
    'temettü',
    'temettü takvimi',
    'bilanço analizi',
    'bilanço',
    'SPK bülten',
    'VIOP',
    'VIOP gece seansı',
    'tavan taban hisseleri',
    'AI haber analizi',
    'yapay zeka borsa',
    'borsa takibi',
    'borsa haberleri',
    'hisse analiz',
    'piyasa verileri',
    'borsa cebimde',
  ],
  authors: [{ name: 'Borsa Cebimde' }],
  creator: 'Borsa Cebimde',
  publisher: 'Borsa Cebimde',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://borsacebimde.app',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://borsacebimde.app',
    siteName: 'Borsa Cebimde',
    title: 'Borsa Cebimde - Halka Arz, KAP Haberleri, AI Analiz ve Borsa Takibi',
    description:
      'Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri, temettü takibi ve borsa yatırım rehberi.',
    images: [
      {
        url: '/images/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Borsa Cebimde Logo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Borsa Cebimde - Halka Arz, KAP Haberleri ve Borsa Takibi',
    description:
      'Halka arz takvimi, AI destekli KAP haberleri, tavan taban hisseleri ve borsa yatırım rehberi.',
    images: ['/images/icon-512.png'],
  },
  icons: {
    icon: [
      { url: '/images/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/images/icon-32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/images/icon-180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'j_zSJPqft3itjE5qK5MddE8b4kMPljzcCyCLl6dnWho',
  },
  category: 'finance',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Borsa Cebimde',
  alternateName: 'BorsaCebimde',
  url: 'https://borsacebimde.app',
  description:
    'Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri, temettü takibi ve borsa yatırım rehberi.',
  publisher: {
    '@type': 'Organization',
    name: 'Borsa Cebimde',
    logo: {
      '@type': 'ImageObject',
      url: 'https://borsacebimde.app/images/icon-512.png',
    },
  },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://borsacebimde.app/kap-haberler/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

const orgJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Borsa Cebimde',
  url: 'https://borsacebimde.app',
  logo: 'https://borsacebimde.app/images/icon-512.png',
  sameAs: [
    'https://play.google.com/store/apps/details?id=com.borsacebimde.app',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'borsacebimde@gmail.com',
    contactType: 'customer service',
    availableLanguage: 'Turkish',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#10b981" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="BorsaCebimde" />
        <link rel="apple-touch-icon" href="/images/icon-180.png" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4684027780055868"
          crossOrigin="anonymous"
        />
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </head>
      <body
        className="min-h-screen transition-colors duration-200"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <ThemeProvider>
          <Header />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
            {/* Top ad */}
            <AdBanner slot="3394160229" format="horizontal" className="mb-6" />

            {/* Main + sidebar */}
            <div className="flex gap-6 items-start">
              <main className="flex-1 min-w-0">
                {children}
              </main>

              <aside className="hidden lg:block w-[300px] shrink-0">
                <div className="ad-sidebar flex flex-col gap-6">
                  <AdBanner slot="3394160229" format="rectangle" />
                </div>
              </aside>
            </div>
          </div>

          <Footer />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
