import type { Metadata } from 'next';
import PiyasaHaberleriContent from './Content';

export const metadata: Metadata = {
  title: 'Piyasa Haberleri - Güncel Borsa ve Finans Haberleri',
  description:
    'Borsa İstanbul ve küresel piyasalardan güncel finans haberleri. Bloomberg HT, BigPara ve Uzmanpara kaynaklı haber akışı.',
  alternates: { canonical: 'https://borsacebimde.app/piyasa-haberleri' },
  keywords: ['borsa haberleri', 'finans haberleri', 'piyasa haberleri', 'BIST haberleri'],
};

export default function PiyasaHaberleriPage() {
  return <PiyasaHaberleriContent />;
}
