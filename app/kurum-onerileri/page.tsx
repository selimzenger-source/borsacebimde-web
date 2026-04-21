import type { Metadata } from 'next';
import KurumOnerileriContent from './Content';

export const metadata: Metadata = {
  title: 'Kurum Önerileri - Aracı Kurum Hedef Fiyat ve Hisse Tavsiyeleri',
  description:
    'BIST hisseleri için aracı kurum hedef fiyat tavsiyeleri. Al, Tut, Sat önerileri ve potansiyel getiri.',
  alternates: { canonical: 'https://borsacebimde.app/kurum-onerileri' },
  keywords: ['kurum önerileri', 'hedef fiyat', 'aracı kurum tavsiye', 'hisse önerisi', 'BIST tavsiye'],
};

export default function KurumOnerileriPage() {
  return <KurumOnerileriContent />;
}
