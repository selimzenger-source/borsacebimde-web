import type { Metadata } from 'next';
import BilancoContent from './Content';

export const metadata: Metadata = {
  title: 'Bilanço Analizleri - BIST Şirketleri Çeyreklik Mali Tablo',
  description:
    'BIST 100 ve tüm Borsa İstanbul şirketlerinin güncel çeyreklik bilanço verileri. Net satış, FAVÖK, net kâr, YoY büyüme oranları ve yapay zeka destekli bilanço analizi.',
  alternates: { canonical: 'https://borsacebimde.com/bilanco' },
  keywords: [
    'bilanço analizi',
    'BIST bilanço',
    'çeyreklik bilanço',
    'FAVÖK',
    'net kâr',
    'yoy büyüme',
    'şirket finansal tablo',
    '2026 Q1 bilanço',
    'borsa istanbul bilanço',
  ],
  openGraph: {
    title: 'Bilanço Analizleri | Borsa Cebimde',
    description:
      'BIST şirketlerinin çeyreklik bilanço verileri ve yapay zeka destekli mali tablo analizleri. Net satış, FAVÖK, net kâr büyüme oranları.',
    url: 'https://borsacebimde.com/bilanco',
    type: 'website',
  },
};

export default function BilancoPage() {
  return <BilancoContent />;
}
