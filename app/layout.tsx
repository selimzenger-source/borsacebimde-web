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
  title: 'Borsa Cebimde - Halka Arz, KAP Haberleri ve Borsa Takibi',
  description:
    'Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri, VIOP gece seansi ve SPK bulten analizleri.',
  keywords:
    'halka arz, KAP haberleri, BIST, borsa, hisse senedi, SPK bulten, VIOP, tavan taban',
  authors: [{ name: 'Borsa Cebimde' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'tr_TR',
    url: 'https://borsacebimde.app',
    siteName: 'Borsa Cebimde',
    title: 'Borsa Cebimde - Halka Arz, KAP Haberleri ve Borsa Takibi',
    description:
      'Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri ve piyasa verileri.',
  },
  icons: {
    icon: '/favicon.ico',
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
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4684027780055868"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className="min-h-screen transition-colors duration-200"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        <ThemeProvider>
          <Header />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
            {/* Top ad - hidden until AdSense fills it */}
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
