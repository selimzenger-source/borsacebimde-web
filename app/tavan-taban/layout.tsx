import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tavan Taban Hisseleri - Günlük Tavan ve Taban Yapan Hisseler',
  description:
    'Bugün tavan ve taban yapan BIST hisseleri. Günlük tavan taban listesi, fiyat değişimleri ve hacim bilgileri.',
  keywords: ['tavan taban hisseleri', 'bugün tavan yapan hisseler', 'bugün taban yapan hisseler', 'BIST tavan taban', 'borsa tavan', 'borsa taban', 'günlük tavan taban listesi', 'hisse fiyat değişim'],
  alternates: { canonical: 'https://borsacebimde.app/tavan-taban' },
  openGraph: {
    title: 'Tavan Taban Hisseleri | Borsa Cebimde',
    description: 'Bugün tavan ve taban yapan BIST hisseleri ve günlük fiyat değişimleri.',
  },
};

export default function TavanTabanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Tavan Taban Hisseleri</h1>
          <p>
            BIST borsasında bugün tavan ve taban yapan hisselerin güncel listesi. Her hisse için
            fiyat değişimi, hacim bilgisi ve yüzdesel değişim oranları gösterilir.
          </p>
        </div>
      </noscript>
    </>
  );
}
