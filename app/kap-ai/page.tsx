import type { Metadata } from 'next';
import KapAIContent from './Content';

export const metadata: Metadata = {
  title: 'KAP Pozitif Haberler - Yapay Zeka Destekli KAP Analizi',
  description:
    'Yapay zeka ile filtrelenmiş pozitif KAP haberleri. BIST şirketlerinin olumlu bildirimleri, AI etki puanı ve duygu analizi ile anlık takip.',
  alternates: { canonical: 'https://borsacebimde.app/kap-ai' },
  keywords: ['KAP', 'KAP haberleri', 'pozitif KAP', 'KAP AI', 'BIST KAP bildirimleri'],
};

export default function KapAiPage() {
  return <KapAIContent />;
}
