import { SsrNewsItem, parseNewsItem, formatDate } from '@/lib/ssr-prefetch';

// Googlebot icin server-rendered haber listesi. Her haberin tam metni
// HTML'de yer alir — JS render gerekmez. AdSense crawler'in icerigi gormesi icin.

interface Props {
  items: SsrNewsItem[];
  heading: string;
  description?: string;
  emptyText?: string;
  showBody?: boolean;
}

export default function SsrNewsList({ items, heading, description, emptyText }: Props) {
  if (!items || items.length === 0) {
    if (!emptyText) return null;
    return (
      <section style={{ marginTop: 32, padding: '24px' }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 8 }}>
          {heading}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{emptyText}</p>
      </section>
    );
  }

  return (
    <section style={{ marginTop: 32, padding: '24px 0' }} aria-label="Son haberler">
      <div style={{ marginBottom: 16 }}>
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 6,
          }}
        >
          {heading}
        </h2>
        {description ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 0 }}>{description}</p>
        ) : null}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {items.map((item) => {
          const { title, body } = parseNewsItem(item);
          return (
            <article
              key={item.id}
              className="card"
              style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 6 }}
            >
              <header style={{ display: 'flex', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                  {title}
                </h3>
                {item.sent_at ? (
                  <time
                    dateTime={item.sent_at}
                    style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}
                  >
                    {formatDate(item.sent_at)}
                  </time>
                ) : null}
              </header>
              {body ? (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {body}
                </p>
              ) : null}
            </article>
          );
        })}
      </div>
    </section>
  );
}
