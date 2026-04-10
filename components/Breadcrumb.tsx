import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Ana Sayfa', item: 'https://borsacebimde.app' },
      ...items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 2,
        name: item.label,
        ...(item.href ? { item: `https://borsacebimde.app${item.href}` } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-1.5 text-xs mb-4 flex-wrap"
        style={{ color: 'var(--text-muted)' }}
      >
        <Link href="/" className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>
          Ana Sayfa
        </Link>
        {items.map((item, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <svg className="w-3 h-3 opacity-50" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 3l5 5-5 5" />
            </svg>
            {item.href ? (
              <Link href={item.href} className="hover:underline transition-colors" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--text-secondary)' }}>{item.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
