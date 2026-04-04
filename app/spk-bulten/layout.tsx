import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPK Bülten Analizleri - Haftalık Bülten Özetleri',
  description:
    'SPK haftalık bültenlerinin yapay zeka destekli analizleri ve özetleri. Halka arz kararları ve düzenleyici gelişmeler.',
  keywords: ['SPK bülten', 'SPK haftalık bülten', 'SPK analizi', 'sermaye piyasası kurulu', 'SPK kararları', 'halka arz SPK', 'SPK yaptırımlar', 'SPK düzenleme'],
  alternates: { canonical: 'https://borsacebimde.app/spk-bulten' },
  openGraph: {
    title: 'SPK Bülten Analizleri | Borsa Cebimde',
    description: 'SPK haftalık bültenlerinin AI destekli analizleri ve özetleri.',
  },
};

export default function SpkBultenLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>SPK Bülten Analizleri</h1>
          <p>
            Sermaye Piyasası Kurulu haftalık bültenlerinin yapay zeka destekli özetlerini bu
            sayfada bulabilirsiniz. Halka arz kararları, yaptırımlar ve düzenleyici gelişmeler
            otomatik olarak analiz edilir.
          </p>
        </div>
      </noscript>
    </>
  );
}
