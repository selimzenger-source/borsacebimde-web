import type { Metadata } from 'next';
import SpkBultenContent from './Content';

export const metadata: Metadata = {
  title: 'SPK Bülten Analizleri - Sermaye Piyasası Kurulu Haftalık Bülten',
  description:
    'SPK haftalık bültenlerinin yapay zeka destekli analizleri. Sermaye Piyasası Kurulu kararları, halka arz onayları ve yatırımcılar için önemli duyurular.',
  alternates: { canonical: 'https://borsacebimde.app/spk-bulten' },
  keywords: ['SPK bülten', 'SPK haftalık bülten', 'Sermaye Piyasası Kurulu', 'SPK kararları'],
};

export default function SpkBultenPage() {
  return <SpkBultenContent />;
}
