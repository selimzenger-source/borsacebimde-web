import type { Metadata } from 'next';
import TavanTabanContent from './Content';

export const metadata: Metadata = {
  title: 'Tavan Taban Hisseleri - BIST Günlük Fiyat Limitleri',
  description:
    'Borsa İstanbul günlük tavan ve taban yapan hisseler. Ardışık tavan-taban serileri, fiyat limitleri ve detaylı hisse analizi.',
  alternates: { canonical: 'https://borsacebimde.app/tavan-taban' },
  keywords: ['tavan hisseler', 'taban hisseler', 'BIST tavan taban', 'tavan yapan hisseler'],
};

export default function TavanTabanPage() {
  return <TavanTabanContent />;
}
