import type { Metadata } from 'next';
import KapTumContent from './Content';

export const metadata: Metadata = {
  title: 'Tüm Şirket Haberleri - BIST Bildirimleri ve AI Analiz',
  description:
    'BIST şirketlerinin tüm bildirimlerini yapay zeka analizi ile takip edin. Bilanço, temettü, sermaye artırımı, sözleşme ve ortaklık bildirimleri.',
  alternates: { canonical: 'https://borsacebimde.app/kap-tum-haberler' },
  keywords: ['borsa haberleri', 'tüm şirket haberleri', 'şirket bildirimleri', 'BIST şirket bildirimleri'],
};

export default function KapTumHaberlerPage() {
  return <KapTumContent />;
}
