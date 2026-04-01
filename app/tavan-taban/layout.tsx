import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tavan Taban Hisseleri - Gunluk BIST Tavan ve Taban Yapan Hisseler',
  description:
    'Gunluk tavan ve taban yapan BIST hisseleri. Tavan taban istatistikleri, hisse performansi ve piyasa analizi. Borsa Istanbul gunluk en cok yukselen ve dusen hisseler.',
  keywords: [
    'tavan taban hisseleri',
    'tavan yapan hisseler',
    'taban yapan hisseler',
    'BIST tavan',
    'borsa tavan taban',
    'en çok yükselen hisseler',
    'en çok düşen hisseler',
    'günlük borsa',
    'BIST 100 tavan',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/tavan-taban/',
  },
  openGraph: {
    title: 'Tavan Taban Hisseleri - Borsa Cebimde',
    description: 'Gunluk BIST tavan ve taban yapan hisseler ve istatistikler.',
    url: 'https://borsacebimde.app/tavan-taban/',
  },
};

export default function TavanTabanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
