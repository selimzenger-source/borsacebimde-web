import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Halka Arz Takvimi 2026 - Güncel Halka Arz Listesi',
  description:
    'Güncel halka arz takvimi, onaylanan ve dağıtımda olan halka arzlar, tahmini lot dağılımı, eşit dağıtım bilgileri ve detaylı halka arz analizleri.',
  keywords: ['halka arz', 'halka arz takvimi', 'halka arz 2026', 'halka arz listesi', 'yeni halka arz', 'halka arz lot dağılımı', 'eşit dağıtım halka arz', 'SPK onaylı halka arz', 'halka arz başvuru', 'borsa halka arz', 'BIST halka arz', 'halka arz ne zaman'],
  alternates: { canonical: 'https://borsacebimde.app/halka-arz' },
  openGraph: {
    title: 'Halka Arz Takvimi 2026 - Borsa Cebimde',
    description: 'Güncel halka arz takvimi, onaylanan ve dağıtımda olan halka arzlar ve detaylı analizler.',
  },
};

export default function HalkaArzLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Halka Arz Takvimi 2026</h1>
          <p>
            Borsa Cebimde halka arz takvimi sayfasında güncel halka arzları takip edebilirsiniz.
            SPK onaylı halka arzlar, dağıtımda olan halka arzlar, tahmini lot bilgileri ve eşit
            dağıtım detayları bu sayfada listelenir.
          </p>
        </div>
      </noscript>
    </>
  );
}
