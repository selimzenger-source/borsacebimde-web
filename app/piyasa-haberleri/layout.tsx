import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Piyasa Haberleri - Borsa ve Finans Haberleri',
  description:
    'Güncel borsa haberleri, piyasa analizleri, ekonomi haberleri. BIST, döviz, altın ve emtia piyasalarından son gelişmeler.',
  keywords: ['borsa haberleri', 'piyasa haberleri', 'finans haberleri', 'BIST haberler', 'ekonomi haberleri', 'döviz haberleri', 'altın haberleri', 'borsa gündem'],
  alternates: { canonical: 'https://borsacebimde.app/piyasa-haberleri' },
  openGraph: {
    title: 'Piyasa Haberleri | Borsa Cebimde',
    description: 'Güncel borsa haberleri, piyasa analizleri ve ekonomi haberleri.',
  },
};

export default function PiyasaHaberleriLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Piyasa Haberleri</h1>
          <p>
            Borsa ve finans dünyasından güncel haberler. BIST borsası, döviz kurları, altın fiyatları
            ve emtia piyasalarından anlık gelişmeleri takip edin.
          </p>
        </div>
      </noscript>
    </>
  );
}
