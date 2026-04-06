import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Borsa Cebimde - Android Uygulama | Google Play',
  description:
    'Borsa Cebimde Android uygulamasini Google Play\'den ucretsiz indirin. Halka arz takibi, AI destekli KAP haberleri, tavan taban bildirimleri.',
  keywords: ['borsa uygulamasi android', 'borsa takip uygulamasi', 'halka arz uygulamasi android', 'borsa cebimde google play', 'ucretsiz borsa uygulamasi android', 'BIST uygulama android'],
  alternates: {
    canonical: 'https://borsacebimde.app/androidindir',
  },
  openGraph: {
    title: 'Borsa Cebimde - Android Uygulama | Ucretsiz',
    description: 'Halka arz, KAP haberleri, AI analiz. Google Play\'den ucretsiz indir!',
    url: 'https://borsacebimde.app/androidindir',
    images: [{ url: '/images/icon-512.png', width: 512, height: 512, alt: 'Borsa Cebimde' }],
  },
};

export default function AndroidIndirLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Borsa Cebimde - Android Uygulama</h1>
          <p>Borsa Cebimde uygulamasini Android icin ucretsiz indirin.</p>
          <a href="https://play.google.com/store/apps/details?id=com.bistfinans.app">Google Play&apos;den Indir</a>
        </div>
      </noscript>
    </>
  );
}
