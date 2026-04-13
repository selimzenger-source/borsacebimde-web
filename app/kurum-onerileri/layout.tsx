import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kurum Önerileri 2026 - Aracı Kurum Hedef Fiyat & Tavsiyeler',
  description:
    'Aracı kurum hisse senedi önerileri ve hedef fiyatları. Al, tut, sat tavsiyeleri, potansiyel getiri oranları ve güncel kurum raporları.',
  keywords: ['kurum önerileri', 'hedef fiyat', 'aracı kurum tavsiye', 'hisse öneri', 'borsa tavsiye', 'al sat önerisi', 'hedef fiyat 2026', 'BIST kurum raporu'],
  alternates: { canonical: 'https://borsacebimde.app/kurum-onerileri' },
  openGraph: {
    title: 'Kurum Önerileri 2026 - Borsa Cebimde',
    description: 'Aracı kurum hisse senedi önerileri, hedef fiyatlar ve potansiyel getiri oranları.',
  },
};

export default function KurumOnerileriLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Kurum Önerileri 2026</h1>
          <p>
            Borsa Cebimde kurum önerileri sayfasında aracı kurumların hisse senedi
            hedef fiyatlarını ve al/tut/sat tavsiyelerini takip edebilirsiniz.
          </p>
        </div>
      </noscript>
    </>
  );
}
