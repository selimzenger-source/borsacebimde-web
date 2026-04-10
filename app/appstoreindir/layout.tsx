import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Borsa Cebimde - iPhone Uygulama | App Store',
  description:
    'Borsa Cebimde iOS uygulamasini App Store\'dan ucretsiz indirin. Halka arz takibi, AI destekli KAP haberleri, tavan taban bildirimleri.',
  keywords: ['borsa uygulamasi ios', 'borsa uygulamasi iphone', 'halka arz uygulamasi iphone', 'borsa cebimde app store', 'ucretsiz borsa uygulamasi ios', 'BIST uygulama iphone'],
  alternates: {
    canonical: 'https://borsacebimde.app/indir',
  },
  openGraph: {
    title: 'Borsa Cebimde - iPhone Uygulama | Ucretsiz',
    description: 'Halka arz, KAP haberleri, AI analiz. App Store\'dan ucretsiz indir!',
    url: 'https://borsacebimde.app/appstoreindir',
    images: [{ url: '/images/icon-512.png', width: 512, height: 512, alt: 'Borsa Cebimde' }],
  },
};

export default function AppStoreIndirLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Borsa Cebimde - iPhone Uygulama</h1>
          <p>Borsa Cebimde uygulamasini iPhone icin ucretsiz indirin.</p>
          <a href="https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446?l=tr">App Store&apos;dan Indir</a>
        </div>
      </noscript>
    </>
  );
}
