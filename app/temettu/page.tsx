import type { Metadata } from 'next';
import TemettuContent from './Content';

export const metadata: Metadata = {
  title: 'Temettü Şampiyonları - BIST Temettü Veren Hisseler 2026',
  description:
    'BIST temettü dağıtan hisseler, temettü şampiyonları, yıllık temettü verimi, payout oranı, üst üste temettü dağıtımı ve yaklaşan temettü takvimi. Ücretsiz takip.',
  alternates: { canonical: 'https://borsacebimde.com/temettu' },
  keywords: [
    'temettü hisseleri',
    'temettü şampiyonu',
    'BIST temettü',
    'temettü takvimi 2026',
    'temettü verimi',
    'yüksek temettü hissesi',
    'brüt temettü',
    'net temettü',
    'payout oranı',
    'ex-dividend',
  ],
  openGraph: {
    title: 'Temettü Şampiyonları | Borsa Cebimde',
    description:
      'BIST temettü dağıtan hisseler, temettü şampiyonları ve yaklaşan temettü takvimi. Yüksek verimli temettü hisselerini keşfedin.',
    url: 'https://borsacebimde.com/temettu',
    type: 'website',
  },
};

export default function TemettuPage() {
  return <TemettuContent />;
}
