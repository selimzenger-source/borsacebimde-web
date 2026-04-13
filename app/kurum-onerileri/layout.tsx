import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kurum Önerileri - Aracı Kurum Hedef Fiyat Tavsiyeleri',
  description:
    'Aracı kurum hedef fiyat ve hisse tavsiyeleri. Al, Tut, Sat önerileri, potansiyel getiri ve güncel hedef fiyatlar.',
  keywords: ['kurum önerileri', 'hedef fiyat', 'aracı kurum tavsiye', 'hisse önerisi', 'BIST tavsiye', 'borsa önerileri', 'al sat tut'],
  alternates: { canonical: 'https://borsacebimde.app/kurum-onerileri' },
  openGraph: {
    title: 'Kurum Önerileri | Borsa Cebimde',
    description: 'Aracı kurum hedef fiyat ve hisse tavsiyeleri. Güncel al/sat/tut önerileri.',
  },
};

export default function KurumOnerileriLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Kurum Önerileri</h1>
          <p>Aracı kurum hedef fiyat ve hisse tavsiyeleri.</p>
        </div>
      </noscript>
    </>
  );
}
