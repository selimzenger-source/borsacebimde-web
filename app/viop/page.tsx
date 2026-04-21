import type { Metadata } from 'next';
import ViopContent from './Content';

export const metadata: Metadata = {
  title: 'VİOP Gece Seansı - Vadeli İşlem ve Opsiyon Piyasası',
  description:
    'VİOP gece seansı verileri, açılış-kapanış bilgileri ve saatlik seyir takibi. BIST 30, dolar, euro ve altın vadeli işlem sözleşmeleri.',
  alternates: { canonical: 'https://borsacebimde.app/viop' },
  keywords: ['VİOP', 'vadeli işlem', 'opsiyon piyasası', 'gece seansı', 'BIST 30 vadeli'],
};

export default function ViopPage() {
  return <ViopContent />;
}
