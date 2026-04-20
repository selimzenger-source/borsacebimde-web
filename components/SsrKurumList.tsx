import { SsrKurumOneri, formatDate } from '@/lib/ssr-prefetch';

interface Props {
  items: SsrKurumOneri[];
  heading: string;
  description?: string;
}

export default function SsrKurumList({ items, heading, description }: Props) {
  if (!items || items.length === 0) return null;
  return (
    <section style={{ marginTop: 32, padding: '24px 0' }} aria-label="Kurum Önerileri">
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          {heading}
        </h2>
        {description ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 0 }}>{description}</p>
        ) : null}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {items.slice(0, 30).map((k) => (
          <article
            key={k.id}
            className="card"
            style={{ padding: '12px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {k.ticker}
                {k.company_name ? ` — ${k.company_name}` : ''}
              </h3>
              {k.created_at ? (
                <time style={{ fontSize: 11, color: 'var(--text-muted)' }}>{formatDate(k.created_at)}</time>
              ) : null}
            </header>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              <strong>{k.institution_name}</strong>
              {k.recommendation ? ` · ${k.recommendation}` : ''}
              {k.target_price ? ` · Hedef: ${k.target_price.toFixed(2)} TL` : ''}
              {k.potential_return != null ? ` · Potansiyel: %${k.potential_return.toFixed(1)}` : ''}
            </p>
            {k.ai_comment ? (
              <p
                style={{
                  fontSize: 13,
                  color: 'var(--text-secondary)',
                  margin: '6px 0 0',
                  padding: '10px 12px',
                  background: 'rgba(41,121,255,0.06)',
                  borderLeft: '3px solid #2979FF',
                  borderRadius: 4,
                  lineHeight: 1.6,
                  fontStyle: 'italic',
                }}
              >
                <strong style={{ color: '#2979FF', fontStyle: 'normal' }}>AI Yorum: </strong>
                {k.ai_comment}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}
