import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüm KAP Haberleri - Kamuyu Aydınlatma Platformu Bildirimleri',
  description:
    'KAP bildirimlerinin tam listesi. Tüm hisse senetleri için KAP haberleri, özel durum açıklamaları ve finansal raporlar.',
  alternates: { canonical: 'https://borsacebimde.app/kap-tum-haberler' },
  openGraph: {
    title: 'Tüm KAP Haberleri | Borsa Cebimde',
    description: 'KAP bildirimlerinin tam listesi, özel durum açıklamaları ve finansal raporlar.',
  },
};

export default function KapTumHaberlerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Tüm KAP Haberleri</h1>
          <p>
            Kamuyu Aydınlatma Platformu üzerinden yayınlanan tüm bildirimleri bu sayfada
            takip edebilirsiniz. Özel durum açıklamaları, finansal raporlar ve genel kurul kararları
            filtreleme seçenekleriyle listelenir.
          </p>
        </div>
      </noscript>
    </>
  );
}
