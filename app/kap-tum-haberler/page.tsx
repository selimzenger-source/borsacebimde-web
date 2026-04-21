import type { Metadata } from 'next';
import KapTumContent from './Content';

export const metadata: Metadata = {
  title: 'Tüm KAP Haberleri - BIST Şirket Bildirimleri ve AI Analiz',
  description:
    'BIST şirketlerinin tüm KAP bildirimlerini yapay zeka analizi ile takip edin. Bilanço, temettü, sermaye artırımı, sözleşme ve ortaklık bildirimleri.',
  alternates: { canonical: 'https://borsacebimde.app/kap-tum-haberler' },
  keywords: ['KAP', 'tüm KAP haberleri', 'KAP bildirimleri', 'BIST şirket bildirimleri'],
};

export default function KapTumHaberlerPage() {
  return <KapTumContent />;
}
