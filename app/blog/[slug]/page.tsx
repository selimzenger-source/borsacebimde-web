import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchBlogBySlug, blogPosts } from '@/lib/blog-data';

const API_BASE = 'https://sz-bist-finans-api.onrender.com';

// Generate all slugs at build time (required for static export)
export async function generateStaticParams() {
  const params: { slug: string }[] = [];

  // 1. API blog slugs
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/blogs`, { cache: 'force-cache' });
    if (res.ok) {
      const blogs = await res.json();
      for (const b of blogs) {
        params.push({ slug: b.slug });
      }
    }
  } catch {
    // API unreachable at build time
  }

  // 2. Static fallback slugs (in case they don't exist in API)
  for (const post of blogPosts) {
    if (!params.find((p) => p.slug === post.slug)) {
      params.push({ slug: post.slug });
    }
  }

  return params;
}

// SEO metadata
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    // Check static posts
    const staticPost = blogPosts.find((p) => p.slug === slug);
    if (staticPost) {
      return {
        title: staticPost.title,
        description: staticPost.excerpt,
        alternates: { canonical: `https://borsacebimde.app/blog/${staticPost.slug}` },
        openGraph: {
          title: staticPost.title,
          description: staticPost.excerpt,
          url: `https://borsacebimde.app/blog/${staticPost.slug}`,
          type: 'article',
          locale: 'tr_TR',
          siteName: 'Borsa Cebimde',
        },
      };
    }
    return { title: 'Blog Yazısı Bulunamadı | Borsa Cebimde' };
  }

  return {
    title: blog.title,
    description: blog.meta_description || blog.title,
    alternates: { canonical: `https://borsacebimde.app/blog/${blog.slug}` },
    openGraph: {
      title: blog.title,
      description: blog.meta_description || blog.title,
      url: `https://borsacebimde.app/blog/${blog.slug}`,
      type: 'article',
      locale: 'tr_TR',
      siteName: 'Borsa Cebimde',
      ...(blog.cover_image_url
        ? { images: [{ url: blog.cover_image_url, alt: blog.title }] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.title,
      description: blog.meta_description || blog.title,
      ...(blog.cover_image_url ? { images: [blog.cover_image_url] } : {}),
    },
  };
}

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

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-20">
        <h1
          className="text-2xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Blog Yazısı Bulunamadı
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Aradığınız blog yazısı mevcut değil veya kaldırılmış olabilir.
        </p>
        <Link
          href="/blog"
          className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold transition-colors"
          style={{ backgroundColor: '#2979FF', color: '#fff' }}
        >
          Tüm Yazılara Dön
        </Link>
      </div>
    );
  }

  const categoryColor = getCategoryColor(blog.category);
  const publishDate = blog.published_at || blog.created_at;

  // Schema.org BlogPosting JSON-LD
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.meta_description || blog.title,
    datePublished: blog.published_at || blog.created_at,
    dateModified: blog.published_at || blog.created_at,
    author: {
      '@type': 'Person',
      name: blog.author_name || 'Borsa Cebimde',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Borsa Cebimde',
      logo: {
        '@type': 'ImageObject',
        url: 'https://borsacebimde.app/images/icon-512.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://borsacebimde.app/blog/${blog.slug}`,
    },
    ...(blog.cover_image_url ? { image: blog.cover_image_url } : {}),
    inLanguage: 'tr',
    articleSection: blog.category,
  };

  return (
    <article className="flex flex-col gap-6">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link
          href="/"
          className="hover:underline"
          style={{ color: 'var(--text-muted)' }}
        >
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link
          href="/blog"
          className="hover:underline"
          style={{ color: 'var(--text-muted)' }}
        >
          Rehber
        </Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>{blog.title}</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        {/* Category badge + date */}
        <div className="flex items-center gap-2 text-[11px]">
          <span
            className="font-semibold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: categoryColor.bg, color: categoryColor.text }}
          >
            {blog.category}
          </span>
          {publishDate && (
            <span style={{ color: 'var(--text-muted)' }}>
              {formatDisplayDate(publishDate)}
            </span>
          )}
          {blog.author_name && (
            <>
              <span style={{ color: 'var(--text-muted)' }}>|</span>
              <span style={{ color: 'var(--text-muted)' }}>{blog.author_name}</span>
            </>
          )}
        </div>

        {/* Cover image */}
        {blog.cover_image_url && (
          <div className="w-full rounded-lg overflow-hidden">
            <img
              src={blog.cover_image_url}
              alt={blog.title}
              className="w-full h-auto object-cover rounded-lg"
              style={{ maxHeight: '400px' }}
            />
          </div>
        )}

        {/* Title */}
        <h1
          className="text-2xl sm:text-3xl font-bold leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {blog.title}
        </h1>

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* Investment disclaimer */}
        <div
          className="mt-6 p-4 rounded-lg text-sm leading-relaxed"
          style={{
            backgroundColor: 'rgba(255,152,0,0.08)',
            border: '1px solid rgba(255,152,0,0.2)',
            color: 'var(--text-secondary)',
          }}
        >
          <strong style={{ color: '#FF9800' }}>Yasal Uyarı:</strong> Bu yazıda
          yer alan bilgiler genel bilgilendirme amaçlıdır ve yatırım tavsiyesi
          niteliğinde değildir. Yatırım kararları kişisel mali durumunuz ve risk
          toleransınız dikkate alınarak alınmalıdır. Borsa Cebimde, bu bilgilere
          dayanarak yapılan yatırımlardan sorumlu tutulamaz.
        </div>
      </div>

      {/* Back to blog listing */}
      <div className="flex justify-center">
        <Link
          href="/blog"
          className="px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: '#2979FF', color: '#fff' }}
        >
          &larr; Tüm Yazılara Dön
        </Link>
      </div>
    </article>
  );
}
