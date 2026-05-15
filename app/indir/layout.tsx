import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Borsa Cebimde - Uygulamayı İndir',
  description:
    'Borsa Cebimde uygulamasını Android ve iOS için ücretsiz indirin. Halka arz takibi, AI destekli şirket haberleri, tavan taban bildirimleri ve daha fazlası.',
  keywords: ['borsa uygulaması', 'borsa takip uygulaması', 'halka arz uygulaması', 'şirket haber uygulaması', 'borsa cebimde indir', 'borsa bildirim uygulaması', 'BIST uygulama', 'hisse takip uygulaması', 'ücretsiz borsa uygulaması'],
  alternates: {
    canonical: 'https://borsacebimde.com/indir',
  },
  openGraph: {
    title: 'Borsa Cebimde - Uygulamayı Ücretsiz İndir',
    description:
      'Halka arz, şirket haberleri, AI analiz ve borsa takibi. Şimdi ücretsiz indir!',
    url: 'https://borsacebimde.com/indir',
    images: [{ url: '/images/icon-512.png', width: 512, height: 512, alt: 'Borsa Cebimde' }],
  },
};

export default function IndirLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Borsa Cebimde - Uygulamayı İndir</h1>
          <p>
            Borsa Cebimde uygulamasını Android ve iOS için ücretsiz indirin.
            Halka arz takvimi, yapay zeka destekli şirket haberleri, tavan taban bildirimleri,
            VİOP gece seansı ve SPK bülten analizleri tek uygulamada.
          </p>
          <ul>
            <li><a href="https://play.google.com/store/apps/details?id=com.bistfinans.app">Google Play'den İndir</a></li>
            <li><a href="https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446">App Store'dan İndir</a></li>
          </ul>
        </div>
      </noscript>
    </>
  );
}
