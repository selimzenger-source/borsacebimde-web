import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tum KAP Haberleri - Borsa Bildirimleri Arsivi',
  description:
    'Tum KAP haberleri ve borsa bildirimleri arsivi. Sirket bazli filtreleme, tarih arama ve gecmis bildirimler. BIST sirketlerinin tum KAP aciklamalari.',
  keywords: [
    'KAP haberleri arşivi',
    'tüm KAP bildirimleri',
    'borsa bildirimleri',
    'şirket bildirimleri',
    'KAP arşiv',
    'geçmiş KAP haberleri',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/kap-tum-haberler/',
  },
  openGraph: {
    title: 'Tum KAP Haberleri - Borsa Cebimde',
    description: 'KAP haberleri arsivi ve borsa bildirimleri.',
    url: 'https://borsacebimde.app/kap-tum-haberler/',
  },
};

export default function KapTumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
