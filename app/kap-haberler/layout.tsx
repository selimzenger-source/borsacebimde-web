import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'KAP Haberleri - Guncel Borsa Bildirimleri ve Sirket Haberleri',
  description:
    'Kamuyu Aydinlatma Platformu (KAP) haberleri anlik takip. BIST sirket bildirimleri, ozel durum aciklamalari, finansal tablolar ve onemli gelismeler.',
  keywords: [
    'KAP haberleri',
    'KAP bildirimleri',
    'borsa haberleri',
    'şirket haberleri',
    'BIST haberler',
    'özel durum açıklaması',
    'finansal tablolar',
    'borsa bildirimleri',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/kap-haberler/',
  },
  openGraph: {
    title: 'KAP Haberleri - Borsa Cebimde',
    description: 'Guncel KAP bildirimleri, sirket haberleri ve borsa gelismeleri.',
    url: 'https://borsacebimde.app/kap-haberler/',
  },
};

export default function KapHaberlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
