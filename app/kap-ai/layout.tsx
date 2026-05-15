import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Şirket Haberleri - AI Destekli Haber Analizi',
  description:
    'Yapay zeka destekli şirket haber analizi. Borsa bildirimlerinin otomatik özetleri, pozitif ve negatif sınıflandırma.',
  keywords: ['borsa haberleri', 'şirket bildirimleri', 'yapay zeka haber analizi', 'BIST haberleri', 'hisse senedi haber', 'borsa haberleri', 'AI haber analiz', 'kamuyu aydınlatma platformu'],
  alternates: { canonical: 'https://borsacebimde.com/kap-ai' },
  openGraph: {
    title: 'Şirket Haberleri - AI Analiz | Borsa Cebimde',
    description: 'Yapay zeka destekli şirket haber analizi ve pozitif/negatif sınıflandırma.',
  },
};

export default function KapAiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Şirket Haberleri - AI Analiz</h1>
          <p>
            Borsa Cebimde şirket haber analizi sayfasında borsa bildirimlerinin
            yapay zeka ile hazırlanmış özetlerini okuyabilirsiniz. Her haber pozitif, negatif veya
            nötr olarak sınıflandırılır.
          </p>
        </div>
      </noscript>
    </>
  );
}
