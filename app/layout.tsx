import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdBanner from '@/components/AdBanner';

const inter = Inter({ subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Borsa Cebimde - Halka Arz, KAP Haberleri ve Borsa Takibi',
  description:
    'Türkiye\'nin halka arz ve borsa haber platformu. KAP açıklamaları, SPK bültenler, BIST hisse takibi, halka arz takvimi ve yapay zeka destekli borsa haberleri.',
  keywords:
    'halka arz, KAP haberleri, BIST, borsa, hisse senedi, SPK bülten, VIOP, tavan taban, Türkiye borsa',
  authors: [{ name: 'Borsa Cebimde' }],
  creator: 'Borsa Cebimde',
  publisher: 'Borsa Cebimde',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://www.borsacebimde.app',
  },
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://www.borsacebimde.app',
    siteName: 'Borsa Cebimde',
    title: 'Borsa Cebimde - Halka Arz, KAP Haberleri ve Borsa Takibi',
    description:
      'Türkiye\'nin halka arz ve borsa haber platformu. KAP açıklamaları, SPK bültenler, BIST hisse takibi ve halka arz takvimi.',
    images: [
      {
        url: 'https://www.borsacebimde.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Borsa Cebimde - Halka Arz ve Borsa Haber Platformu',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Borsa Cebimde - Halka Arz, KAP Haberleri ve Borsa Takibi',
    description:
      'Türkiye\'nin halka arz ve borsa haber platformu. KAP açıklamaları, SPK bültenler, BIST hisse takibi.',
    images: ['https://www.borsacebimde.app/og-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={inter.className}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#071A14" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4684027780055868"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-bg-primary text-text-primary min-h-screen">
        {/* Header */}
        <Header />

        {/* Page wrapper */}
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
          {/* Top leaderboard ad */}
          <div className="mb-6 hidden sm:block">
            <AdBanner slot="3394160229" format="horizontal" className="mx-auto" />
          </div>
          {/* Mobile banner */}
          <div className="mb-4 sm:hidden">
            <AdBanner slot="3394160229" format="auto" className="mx-auto" />
          </div>

          {/* Main + sidebar layout */}
          <div className="flex gap-6 items-start">
            {/* Main content */}
            <main className="flex-1 min-w-0">
              {children}
            </main>

            {/* Right sidebar — hidden on mobile/tablet */}
            <aside className="hidden lg:block w-[300px] shrink-0">
              <div className="ad-sidebar flex flex-col gap-6">
                <AdBanner slot="3394160229" format="rectangle" />
                <AdBanner slot="3394160229" format="rectangle" />
              </div>
            </aside>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </body>
    </html>
  );
}
