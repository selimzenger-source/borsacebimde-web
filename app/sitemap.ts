import type { MetadataRoute } from 'next';

// Build aninda uretilir — her deploy'da lastmod guncellenir.
// Onceki statik sitemap.xml'deki 27 URL'i dinamik halde.

const BASE = 'https://borsacebimde.app';

// Build anindaki tarih. Her deploy'da yenilenir.
const NOW = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: Array<{
    path: string;
    changefreq: MetadataRoute.Sitemap[number]['changeFrequency'];
    priority: number;
  }> = [
    // Ana sayfa
    { path: '/', changefreq: 'daily', priority: 1.0 },

    // Ana servisler (yuksek oncelik)
    { path: '/halka-arz', changefreq: 'daily', priority: 0.9 },
    { path: '/kap-ai', changefreq: 'daily', priority: 0.9 },
    { path: '/kap-tum-haberler', changefreq: 'hourly', priority: 0.9 },
    { path: '/piyasa-haberleri', changefreq: 'hourly', priority: 0.9 },
    { path: '/kurum-onerileri', changefreq: 'daily', priority: 0.8 },
    { path: '/tavan-taban', changefreq: 'daily', priority: 0.8 },
    { path: '/viop', changefreq: 'daily', priority: 0.8 },
    { path: '/spk-bulten', changefreq: 'weekly', priority: 0.8 },
    { path: '/spk-basvurular', changefreq: 'daily', priority: 0.8 },

    // Indirme & bilgi
    { path: '/indir', changefreq: 'monthly', priority: 0.7 },
    { path: '/sss', changefreq: 'monthly', priority: 0.7 },
    { path: '/hakkimizda', changefreq: 'monthly', priority: 0.6 },
    { path: '/androidindir', changefreq: 'monthly', priority: 0.6 },
    { path: '/appstoreindir', changefreq: 'monthly', priority: 0.6 },

    // Yasal
    { path: '/gizlilik-politikasi', changefreq: 'yearly', priority: 0.3 },
    { path: '/cerez-politikasi', changefreq: 'yearly', priority: 0.3 },
    { path: '/kullanim-kosullari', changefreq: 'yearly', priority: 0.3 },

    // Blog ana
    { path: '/blog', changefreq: 'weekly', priority: 0.8 },

    // Blog yazilari
    { path: '/blog/halka-arz-nedir', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/kap-haberleri-rehberi', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/bist-endeks-rehberi', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/borsa-yatirim-temel-kavramlar', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/spk-nedir-gorevleri', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/tavan-taban-stratejileri', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/viop-gece-seansi-rehberi', changefreq: 'monthly', priority: 0.7 },
    { path: '/blog/yapay-zeka-borsa-analizi', changefreq: 'monthly', priority: 0.7 },
  ];

  return pages.map((p) => ({
    url: `${BASE}${p.path}`,
    lastModified: NOW,
    changeFrequency: p.changefreq,
    priority: p.priority,
  }));
}
