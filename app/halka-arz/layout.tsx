import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halka Arz Takvimi 2026 - Yeni Halka Arzlar ve SPK Onaylı Başvurular',
  description:
    'Guncel halka arz takvimi 2026. SPK onayli halka arz basvurulari, dagitim tarihleri, lot buyuklukleri ve halka arz sonuclari. Yeni halka arzlari kacirmayin.',
  keywords: [
    'halka arz',
    'halka arz takvimi',
    'halka arz 2026',
    'yeni halka arz',
    'SPK onaylı halka arz',
    'halka arz başvuruları',
    'halka arz sonuçları',
    'borsa halka arz',
    'BIST halka arz',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/halka-arz/',
  },
  openGraph: {
    title: 'Halka Arz Takvimi 2026 - Borsa Cebimde',
    description: 'SPK onayli halka arz basvurulari, dagitim tarihleri ve halka arz sonuclari.',
    url: 'https://borsacebimde.app/halka-arz/',
  },
};

export default function HalkaArzLayout({ children }: { children: React.ReactNode }) {
  return children;
}
