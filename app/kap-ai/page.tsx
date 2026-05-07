import type { Metadata } from 'next';
import KapAIContent from './Content';

export const metadata: Metadata = {
  title: 'Şirket Haberleri - Yapay Zeka Destekli Haber Analizi',
  description:
    'Yapay zeka ile filtrelenmiş pozitif şirket haberleri. BIST şirketlerinin olumlu bildirimleri, AI etki puanı ve duygu analizi ile anlık takip.',
  alternates: { canonical: 'https://borsacebimde.app/kap-ai' },
  keywords: ['borsa haberleri', 'şirket bildirimleri', 'pozitif haber', 'haber AI', 'BIST bildirimleri'],
};

export default function KapAiPage() {
  return <KapAIContent />;
}
