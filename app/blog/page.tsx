import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchAllBlogs } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Borsa Rehberi - Yatırım Eğitim Yazıları',
  description:
    'Halka arz, KAP haberleri, tavan taban hisseleri, VİOP, SPK ve borsa yatırımı hakkında kapsamlı eğitim yazıları ve rehberler.',
  alternates: { canonical: 'https://borsacebimde.app/blog' },
};

function formatDisplayDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function getCategoryColor(category: string): { bg: string; text: string } {
  const map: Record<string, { bg: string; text: string }> = {
    'Halka Arz': { bg: 'rgba(76,175,80,0.12)', text: '#4CAF50' },
    KAP: { bg: 'rgba(41,121,255,0.12)', text: '#2979FF' },
    'Borsa Rehberi': { bg: 'rgba(38,198,218,0.12)', text: '#26C6DA' },
    Teknoloji: { bg: 'rgba(156,39,176,0.12)', text: '#AB47BC' },
    'Düzenleyici': { bg: 'rgba(255,152,0,0.12)', text: '#FF9800' },
    'VİOP': { bg: 'rgba(179,136,255,0.12)', text: '#B388FF' },
  };
  return map[category] ?? { bg: 'rgba(41,121,255,0.1)', text: '#2979FF' };
}

interface DisplayPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  coverImage?: string | null;
}

export default async function BlogPage() {
  const apiBlogs = await fetchAllBlogs();

  // Sadece admin panelindeki bloglari goster (API) — statik fallback yok
  const allPosts: DisplayPost[] = apiBlogs
    .map((b) => ({
      slug: b.slug,
      title: b.title,
      excerpt: b.meta_description || b.title,
      date: b.published_at || b.created_at || '',
      category: b.category,
      coverImage: b.cover_image_url,
    }))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>Rehber</span>
      </nav>

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--text-primary)' }}>
          Borsa Rehberi
        </h1>
        <p className="text-sm sm:text-base" style={{ color: 'var(--text-secondary)' }}>
          Borsa yatırımı, halka arz, KAP haberleri ve piyasa kavramları hakkında kapsamlı eğitim
          yazıları. Yatırım bilginizi geliştirin.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {allPosts.map((post) => {
          const catColor = getCategoryColor(post.category);
          return (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <article className="card h-full flex flex-col transition-all duration-200 group-hover:shadow-lg overflow-hidden">
                {post.coverImage && (
                  <div className="w-full h-40 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: catColor.bg, color: catColor.text }}
                    >
                      {post.category}
                    </span>
                    {post.date && (
                      <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                        {formatDisplayDate(post.date)}
                      </span>
                    )}
                  </div>
                  <h2
                    className="text-base font-bold leading-snug group-hover:text-[#2979FF] transition-colors"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {post.title}
                  </h2>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: 'var(--text-secondary)' }}>
                    {post.excerpt}
                  </p>
                  <span className="text-xs font-medium" style={{ color: '#2979FF' }}>
                    Devamını oku &rarr;
                  </span>
                </div>
              </article>
            </Link>
          );
        })}
      </div>

      {/* SEO bottom text */}
      <div className="card p-6 mt-4">
        <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
          Borsa Cebimde Yatırım Rehberi
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Borsa Cebimde yatırım rehberi bölümünde, Borsa İstanbul (BIST) ile ilgili temel kavramlardan
          ileri düzey analizlere kadar kapsamlı eğitim içerikleri bulabilirsiniz. Halka arz süreçlerinden
          KAP bildirimlerinin nasıl yorumlanacağına, tavan taban hisselerinin analizinden VİOP gece
          seansı stratejilerine kadar pek çok konuda bilgi edinin.
        </p>
      </div>
    </div>
  );
}
