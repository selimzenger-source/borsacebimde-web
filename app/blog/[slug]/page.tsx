import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchAllBlogs, fetchBlogBySlug } from '@/lib/blog-data';

export async function generateStaticParams() {
  const blogs = await fetchAllBlogs();
  const params = blogs
    .filter((b) => !!b.slug)
    .map((b) => ({ slug: b.slug }));
  // API 0 donerse en azindan bir placeholder koy ki build patlamasin
  if (params.length === 0) {
    return [{ slug: '__placeholder__' }];
  }
  return params;
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (slug === '__placeholder__') return { title: 'Yazi' };
  const blog = await fetchBlogBySlug(slug);
  if (!blog) return { title: 'Yazi Bulunamadi' };
  const url = `https://borsacebimde.app/blog/${slug}`;
  return {
    title: blog.title,
    description: blog.meta_description || blog.title,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: blog.title,
      description: blog.meta_description || blog.title,
      images: blog.cover_image_url ? [blog.cover_image_url] : undefined,
    },
  };
}

function formatDate(iso: string | null): string {
  if (!iso) return '';
  try {
    return new Date(iso).toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (slug === '__placeholder__') notFound();
  const blog = await fetchBlogBySlug(slug);
  if (!blog) notFound();

  const url = `https://borsacebimde.app/blog/${slug}`;
  const published = blog.published_at || blog.created_at || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    description: blog.meta_description || blog.title,
    image: blog.cover_image_url || undefined,
    author: { '@type': 'Organization', name: 'Borsa Cebimde' },
    publisher: {
      '@type': 'Organization',
      name: 'Borsa Cebimde',
      logo: {
        '@type': 'ImageObject',
        url: 'https://borsacebimde.app/images/icon-512.png',
      },
    },
    datePublished: published,
    dateModified: published,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
  };

  return (
    <article className="flex flex-col gap-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
          Ana Sayfa
        </Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>
          Rehber
        </Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>{blog.title}</span>
      </nav>

      {blog.cover_image_url && (
        <div className="w-full rounded-lg overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={blog.cover_image_url}
            alt={blog.title}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      )}

      <header className="flex flex-col gap-2">
        <h1
          className="text-3xl sm:text-4xl font-bold leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {blog.title}
        </h1>
        <div className="text-sm" style={{ color: 'var(--text-muted)' }}>
          {formatDate(published)}
          {blog.category && (
            <span
              className="ml-2 px-2 py-0.5 rounded text-xs"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              {blog.category}
            </span>
          )}
        </div>
      </header>

      <div
        className="blog-content max-w-none"
        style={{ color: 'var(--text-primary)' }}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      <aside
        className="mt-8 p-4 rounded-lg text-sm border"
        style={{
          backgroundColor: 'var(--bg-secondary)',
          borderColor: 'var(--border)',
          color: 'var(--text-muted)',
        }}
      >
        <strong>Yatırım Uyarısı:</strong> Bu yazı yatırım tavsiyesi değildir. İçerik
        yalnızca bilgilendirme amaçlıdır. Yatırım kararları için SPK lisanslı danışman
        veya aracılık kurumuna başvurunuz.
      </aside>

      <div className="mt-4">
        <Link
          href="/blog"
          className="text-sm hover:underline"
          style={{ color: '#2979FF' }}
        >
          ← Tüm rehber yazıları
        </Link>
      </div>
    </article>
  );
}
