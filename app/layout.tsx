import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
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
    default: 'Borsa Cebimde — Halka Arz, KAP AI Haber ve BIST Takibi',
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

// Build aninda guncellenir — "taze icerik" sinyali
const LAST_MODIFIED = new Date().toISOString();

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Borsa Cebimde',
  alternateName: 'BorsaCebimde',
  url: 'https://borsacebimde.app',
  inLanguage: 'tr-TR',
  dateModified: LAST_MODIFIED,
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
      urlTemplate: 'https://borsacebimde.app/piyasa-haberleri/?q={search_term_string}',
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
  foundingDate: '2024',
  dateModified: LAST_MODIFIED,
  sameAs: [
    'https://play.google.com/store/apps/details?id=com.bistfinans.app',
    'https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446',
    'https://x.com/BorsaCebimde',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'borsacebimde@gmail.com',
    contactType: 'customer service',
    availableLanguage: 'Turkish',
  },
};

// FAQPage — AI arama motorlari (ChatGPT, Perplexity, Google AI Overviews) icin
// alintilanabilir soru-cevap seti.
const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Borsa Cebimde nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Borsa Cebimde, Borsa Istanbul (BIST) yatirimcilari icin gelistirilmis bir haber ve bildirim platformudur. Web sitesi ve iOS/Android mobil uygulamasi olarak hizmet verir. Halka arz takvimi, KAP haberleri AI analizi, SPK bulten ozetleri, tavan-taban takibi ve VIOP gece seansi gibi ozellikleri sunar.',
      },
    },
    {
      '@type': 'Question',
      name: 'Borsa Cebimde ucretsiz mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet, BIST 30 ve BIST 50 hisseleri icin tum KAP bildirimleri ucretsizdir. Tum BIST hisselerinin bildirimleri, AI Pozitif Haber paketi ve bireysel hisse bildirimleri icin abonelik paketleri mevcuttur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Uygulamayi nereden indirebilirim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Android icin Google Play Store, iOS icin App Store uzerinden ucretsiz indirebilirsiniz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Halka arz nedir ve nasil katilabilirim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Halka arz, bir sirketin hisselerini ilk kez borsaya satmasidir. Katilmak icin bir aracilik kurumunda yatirim hesabi acmaniz ve basvuru gunlerinde talep vermeniz gerekir. Borsa Cebimde tum surecin takvimini 6 asamali olarak gosterir.',
      },
    },
    {
      '@type': 'Question',
      name: 'KAP nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KAP (Kamu Aydinlatma Platformu), halka acik sirketlerin yatirimcilari bilgilendirmek zorunda oldugu ozel durum aciklamalarini yayinladigi resmi platformdur. Borsa Cebimde KAP bildirimlerini AI ile analiz edip 10 uzerinden duygu puani verir.',
      },
    },
    {
      '@type': 'Question',
      name: 'KAP AI Haber nasil calisir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KAP\'ta yayinlanan her bildirim saniyeler icinde Borsa Cebimde\'ye gelir. Yapay zeka (Claude Haiku + Gemini Flash) haberleri kategorize eder, 10 uzerinden onem puani verir ve 2-3 paragraflik ozet cikarir.',
      },
    },
    {
      '@type': 'Question',
      name: 'SPK bulten analizi nasil yapiliyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'SPK her Perşembe ve Cuma bulten yayinlar. Borsa Cebimde bu bulteni 15-30 dakika icinde AI ile okuyup ozet cikarir — halka arz onaylari, kayiti sermaye artislari, fon haberleri kategorilere ayrilir.',
      },
    },
    {
      '@type': 'Question',
      name: 'Tavan-taban hisseleri nasil takip ediliyor?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Her islem gununun sonunda tavan (%10 yukseliş) ve taban (%10 dusus) yapan hisseler tespit edilir. AI o gunku KAP haberlerini inceleyip olasi sebep analizi sunar.',
      },
    },
    {
      '@type': 'Question',
      name: 'VIOP gece seansi ne demek?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Vadeli Islem ve Opsiyon Piyasasi, 09:30-18:15 arasi gunduz seansi sonrasi 19:00-23:00 arasi aksam seansini da acar. Borsa Cebimde bu gece seansinda X30YVADE endeks kontratinin fiyat hareketlerini takip eder.',
      },
    },
    {
      '@type': 'Question',
      name: 'Halka Arz Defterim nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Katildiginiz halka arzlari kaydedip maliyet, lot ve anlik kar-zarar takibi yapan ozelliktir. Veriler sadece cihazinizda tutulur, sunucuya gonderilmez.',
      },
    },
    {
      '@type': 'Question',
      name: 'Borsa Cebimde yatirim tavsiyesi veriyor mu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'HAYIR. Borsa Cebimde SPK lisansli danismanlik hizmeti degildir. Tum icerik bilgilendirme amaclidir. Yatirim kararlari icin SPK lisansli danisman veya aracilik kurumu ile gorusunuz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Premium paketler neler?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Aylik AI Pozitif Haber paketi, Yillik/3 Aylik BIST Ana Pazar + Yildiz Pazar bildirim paketleri ve bireysel hisse bildirimleri (5 TL/hisse/yil) mevcuttur.',
      },
    },
    {
      '@type': 'Question',
      name: 'Hangi veri kaynaklarini kullaniyorsunuz?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'KAP (kap.org.tr), SPK (spk.gov.tr), BigPara RSS, Bloomberg HT, Dunya, Para Analiz ve Yahoo Finance gecikmeli fiyat verisi. Teknik: FastAPI backend + Claude/Gemini AI + PostgreSQL.',
      },
    },
    {
      '@type': 'Question',
      name: 'Cihaz verim guvende mi?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Evet. Favori hisseleriniz ve Halka Arz Defteri verileriniz cihazin yerel depolamasinda tutulur, sunucuya gonderilmez. KVKK uyumluyuz.',
      },
    },
    {
      '@type': 'Question',
      name: 'Kurum onerileri nedir?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Is Yatirim, Garanti Yatirim, Oyak Yatirim gibi aracilik kurumlarinin yayinladigi hisse hedef fiyat raporlarinin listesidir. Her gun yeni oneriler eklenir.',
      },
    },
  ],
};

const appJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  name: 'Borsa Cebimde - Haber & Halka Arz',
  operatingSystem: 'Android, iOS',
  applicationCategory: 'FinanceApplication',
  description: 'Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri, VİOP gece seansı, SPK bülten analizleri ve borsa takibi. BIST senetlerinden anlık bildirim alın.',
  url: 'https://borsacebimde.app/indir',
  image: 'https://borsacebimde.app/images/icon-512.png',
  author: {
    '@type': 'Organization',
    name: 'Borsa Cebimde',
  },
  offers: [
    {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'TRY',
      availability: 'https://schema.org/InStock',
    },
  ],
  installUrl: 'https://play.google.com/store/apps/details?id=com.bistfinans.app',
  downloadUrl: [
    'https://play.google.com/store/apps/details?id=com.bistfinans.app',
    'https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446',
  ],
  featureList: [
    'Halka arz takvimi ve bildirimler',
    'KAP haberleri yapay zeka analizi',
    'Tavan taban hisseleri günlük takip',
    'VİOP gece ve akşam seansı',
    'SPK bülten AI analizi',
    'Favori hisse listesi ve bildirimler',
    'BIST 50 hisseleri ücretsiz',
  ],
  inLanguage: 'tr',
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
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-PZP4GRB2');`}
        </Script>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(appJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className="min-h-screen transition-colors duration-200"
        style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)' }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-PZP4GRB2"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider>
          <Header />

          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-8">
            {/* Top ad */}
            <AdBanner slot="1819751923" format="horizontal" className="mb-6" />

            {/* Main + sidebar */}
            <div className="flex gap-6 items-start">
              <main className="flex-1 min-w-0">
                {children}
              </main>

              <aside className="hidden lg:block w-[300px] shrink-0">
                <div className="ad-sidebar flex flex-col gap-6 sticky top-24">
                  <AdBanner slot="6884376342" format="rectangle" />
                  <AdBanner slot="1897984416" format="multiplex" />
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
