import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VIOP Gece Seansi - Vadeli Islem ve Opsiyon Piyasasi Verileri',
  description:
    'VIOP gece seansi verileri, vadeli islem ve opsiyon piyasasi anlık takip. BIST 30 vadeli, dolar vadeli ve diger VIOP kontratları.',
  keywords: [
    'VIOP',
    'VIOP gece seansı',
    'vadeli işlem',
    'opsiyon piyasası',
    'BIST 30 vadeli',
    'dolar vadeli',
    'VIOP verileri',
    'gece seansı',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/viop/',
  },
  openGraph: {
    title: 'VIOP Gece Seansi - Borsa Cebimde',
    description: 'VIOP gece seansi verileri ve vadeli islem piyasasi.',
    url: 'https://borsacebimde.app/viop/',
  },
};

export default function ViopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
