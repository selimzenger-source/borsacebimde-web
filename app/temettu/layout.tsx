import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Temettü Şampiyonları & Takvimi - BIST 2026',
  description:
    'BIST temettü dağıtan hisseler, temettü şampiyonları, yıllık temettü verimi, brüt-net temettü, payout oranı, üst üste temettü dağıtımı, ex-dividend tarihleri ve yaklaşan temettü takvimi.',
  keywords: [
    'temettü hisseleri',
    'temettü şampiyonu',
    'BIST temettü 2026',
    'temettü takvimi',
    'temettü verimi',
    'yüksek temettü hissesi',
    'brüt temettü',
    'net temettü',
    'payout oranı',
    'ex-dividend',
    'üst üste temettü',
    'temettü dağıtım tarihi',
  ],
  alternates: { canonical: 'https://borsacebimde.com/temettu' },
  openGraph: {
    title: 'Temettü Şampiyonları | Borsa Cebimde',
    description:
      'BIST temettü dağıtan hisseler, temettü şampiyonları ve yaklaşan temettü takvimi.',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://borsacebimde.com/temettu#webpage',
      url: 'https://borsacebimde.com/temettu',
      name: 'Temettü Şampiyonları & Takvimi',
      description:
        'BIST temettü hisseleri, şampiyonlar, yaklaşan temettü takvimi.',
      inLanguage: 'tr-TR',
      isPartOf: { '@id': 'https://borsacebimde.com#website' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://borsacebimde.com' },
        { '@type': 'ListItem', position: 2, name: 'Temettü', item: 'https://borsacebimde.com/temettu' },
      ],
    },
    {
      '@type': 'Service',
      name: 'BIST Temettü Takvimi',
      description:
        'BIST şirketlerinin temettü dağıtım kararlarını, brüt-net verimi ve ex-dividend tarihlerini takip eden ücretsiz finans hizmeti.',
      provider: { '@type': 'Organization', name: 'Borsa Cebimde' },
      areaServed: { '@type': 'Country', name: 'Türkiye' },
      serviceType: 'Finansal Veri Hizmeti',
    },
  ],
};

export default function TemettuLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Temettü Şampiyonları - BIST Temettü Hisseleri</h1>
          <p>
            BIST'te en yüksek temettü verimi sunan şirketler, üst üste temettü dağıtan
            şampiyonlar, yıllık temettü takvimi ve yaklaşan ex-dividend tarihleri ücretsiz
            olarak listelenir. Brüt-net temettü farkı, payout oranı ve uzun vadeli temettü
            stratejileri için kapsamlı veriler.
          </p>
        </div>
      </noscript>
    </>
  );
}
