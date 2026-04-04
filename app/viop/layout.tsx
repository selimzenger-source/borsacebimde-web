import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'VİOP Gece Seansı - Vadeli İşlem ve Opsiyon Piyasası',
  description:
    'VİOP gece seansı verileri, vadeli işlem kontratları, endeks ve döviz vadeli fiyatları. VIOP gece seansı anlık takip.',
  keywords: ['VİOP', 'VİOP gece seansı', 'VİOP akşam seansı', 'vadeli işlem', 'opsiyon piyasası', 'BIST vadeli', 'endeks vadeli', 'döviz vadeli', 'VİOP verileri'],
  alternates: { canonical: 'https://borsacebimde.app/viop' },
  openGraph: {
    title: 'VİOP Gece Seansı | Borsa Cebimde',
    description: 'VİOP gece seansı verileri, vadeli işlem kontratları ve anlık fiyatlar.',
  },
};

export default function ViopLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>VİOP Gece Seansı</h1>
          <p>
            Vadeli İşlem ve Opsiyon Piyasası gece seansı verilerini bu sayfada takip edebilirsiniz.
            Endeks vadeli kontratları, döviz vadeli fiyatları ve diğer VİOP enstrümanlarının
            verileri anlık olarak güncellenir.
          </p>
        </div>
      </noscript>
    </>
  );
}
