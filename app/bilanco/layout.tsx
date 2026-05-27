import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bilanço Analizleri - BIST Çeyreklik Mali Tablo & FAVÖK',
  description:
    'BIST 100 ve tüm Borsa İstanbul şirketlerinin çeyreklik bilanço verileri. Net satış, FAVÖK, net kâr, YoY büyüme oranları, F/K ve PD/DD oranları, yapay zeka destekli bilanço analizi.',
  keywords: [
    'bilanço analizi',
    'BIST bilanço 2026',
    'çeyreklik bilanço',
    'FAVÖK',
    'net kâr',
    'yoy büyüme',
    'şirket mali tablo',
    'borsa istanbul bilanço',
    'net satış',
    'EBITDA',
    'F/K oranı',
    'PD/DD oranı',
  ],
  alternates: { canonical: 'https://borsacebimde.com/bilanco' },
  openGraph: {
    title: 'Bilanço Analizleri | Borsa Cebimde',
    description:
      'BIST şirketlerinin çeyreklik bilanço verileri ve yapay zeka destekli mali tablo analizleri.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://borsacebimde.com/bilanco#webpage',
      url: 'https://borsacebimde.com/bilanco',
      name: 'Bilanço Analizleri - BIST Çeyreklik Mali Tablo',
      description:
        'BIST şirketlerinin çeyreklik bilanço verileri ve yapay zeka destekli mali tablo analizleri.',
      inLanguage: 'tr-TR',
      isPartOf: { '@id': 'https://borsacebimde.com#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://borsacebimde.com' },
        { '@type': 'ListItem', position: 2, name: 'Bilanço', item: 'https://borsacebimde.com/bilanco' },
      ],
    },
    {
      '@type': 'Service',
      name: 'BIST Bilanço Analizi',
      description: 'Borsa İstanbul şirketlerinin çeyreklik mali tablolarını analiz eden ücretsiz finans hizmeti.',
      provider: { '@type': 'Organization', name: 'Borsa Cebimde' },
      areaServed: { '@type': 'Country', name: 'Türkiye' },
      serviceType: 'Finansal Veri Hizmeti',
    },
  ],
};

export default function BilancoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Bilanço Analizleri - BIST Şirketleri</h1>
          <p>
            BIST 100 ve tüm Borsa İstanbul şirketlerinin güncel çeyreklik bilanço verileri,
            net satış büyüme oranları, FAVÖK (EBITDA), net dönem kârı ve yapay zeka destekli
            mali tablo analizleri ücretsiz olarak sunulmaktadır. Çeyreklik dönemlere göre (Q1,
            Q2, Q3, Q4) en hızlı büyüyen şirketler, YoY karşılaştırmalar ve sektör bazlı
            analizler ile yatırım kararlarınızı destekleyecek finansal veriler.
          </p>
        </div>
      </noscript>
    </>
  );
}
