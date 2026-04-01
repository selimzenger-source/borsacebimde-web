import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KAP Pozitif Haberler - AI Destekli KAP Haber Analizi',
  description:
    'Yapay zeka destekli KAP haber analizi. Kamuyu Aydınlatma Platformu bildirimlerinin otomatik özetleri, pozitif ve negatif sınıflandırma.',
  alternates: { canonical: 'https://borsacebimde.app/kap-ai' },
  openGraph: {
    title: 'KAP Pozitif Haberler - AI Analiz | Borsa Cebimde',
    description: 'Yapay zeka destekli KAP haber analizi ve pozitif/negatif sınıflandırma.',
  },
};

export default function KapAiLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>KAP Pozitif Haberler - AI Analiz</h1>
          <p>
            Borsa Cebimde KAP haber analizi sayfasında Kamuyu Aydınlatma Platformu bildirimlerinin
            yapay zeka ile hazırlanmış özetlerini okuyabilirsiniz. Her haber pozitif, negatif veya
            nötr olarak sınıflandırılır.
          </p>
        </div>
      </noscript>
    </>
  );
}
