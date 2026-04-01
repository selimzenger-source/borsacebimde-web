import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Piyasa Haberleri - Güncel Finans ve Borsa Haberleri',
  description:
    'Yapay zeka destekli güncel piyasa haberleri. BIST borsa haberleri, şirket gelişmeleri, global piyasa haberleri ve ekonomi gündemi.',
  keywords: [
    'piyasa haberleri',
    'borsa haberleri',
    'finans haberleri',
    'şirket haberleri',
    'BIST haberler',
    'ekonomi gündemi',
    'global piyasalar',
    'borsa gündem',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/piyasa-haberleri/',
  },
  openGraph: {
    title: 'Piyasa Haberleri - Borsa Cebimde',
    description: 'Yapay zeka destekli güncel finans ve borsa haberleri.',
    url: 'https://borsacebimde.app/piyasa-haberleri/',
  },
};

export default function PiyasaHaberlerLayout({ children }: { children: React.ReactNode }) {
  return children;
}
