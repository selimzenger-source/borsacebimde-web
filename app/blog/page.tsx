import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/blog-data';

export const metadata: Metadata = {
  title: 'Borsa Rehberi - Yatırım Eğitim Yazıları | Borsa Cebimde',
  description:
    'Halka arz, KAP haberleri, tavan taban hisseleri, VİOP, SPK ve borsa yatırımı hakkında kapsamlı eğitim yazıları ve rehberler.',
  alternates: { canonical: 'https://borsacebimde.app/blog' },
};

function formatDisplayDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogPage() {
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
        {blogPosts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <article className="card p-6 h-full flex flex-col gap-3 transition-all duration-200 group-hover:shadow-lg">
              <div className="flex items-center gap-2">
                <span
                  className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: 'rgba(41,121,255,0.1)',
                    color: '#2979FF',
                  }}
                >
                  {post.category}
                </span>
                <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {formatDisplayDate(post.date)}
                </span>
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
            </article>
          </Link>
        ))}
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
