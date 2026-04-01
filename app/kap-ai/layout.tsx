import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Haber Analizi - Yapay Zeka ile KAP Haber Ozeti ve Yorumu',
  description:
    'Yapay zeka destekli KAP haber analizi. AI ile ozetlenmis borsa haberleri, sirket bildirimleri ve piyasa yorumlari. Hizli ve anlasilir haber ozeti.',
  keywords: [
    'AI haber analizi',
    'yapay zeka borsa',
    'KAP AI analiz',
    'borsa yapay zeka',
    'haber özeti',
    'AI borsa haberleri',
    'akıllı haber analizi',
    'otomatik haber özeti',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/kap-ai/',
  },
  openGraph: {
    title: 'AI Haber Analizi - Borsa Cebimde',
    description: 'Yapay zeka ile KAP haber ozeti ve borsa analizi.',
    url: 'https://borsacebimde.app/kap-ai/',
  },
};

export default function KapAiLayout({ children }: { children: React.ReactNode }) {
  return children;
}
