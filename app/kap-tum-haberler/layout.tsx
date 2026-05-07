import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tüm Şirket Haberleri - Borsa Bildirimleri',
  description:
    'Şirket bildirimlerinin tam listesi. Tüm hisse senetleri için haberler, özel durum açıklamaları ve finansal raporlar.',
  keywords: ['borsa haberleri', 'şirket bildirimleri', 'özel durum açıklaması', 'finansal rapor', 'BIST hisse haberleri', 'şirket haberleri', 'borsa bildirimleri'],
  alternates: { canonical: 'https://borsacebimde.app/kap-tum-haberler' },
  openGraph: {
    title: 'Tüm Şirket Haberleri | Borsa Cebimde',
    description: 'Şirket bildirimlerinin tam listesi, özel durum açıklamaları ve finansal raporlar.',
  },
};

export default function KapTumHaberlerLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Tüm Şirket Haberleri</h1>
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
