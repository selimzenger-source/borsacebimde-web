import { SsrIpoItem, formatDate } from '@/lib/ssr-prefetch';

interface Props {
  items: SsrIpoItem[];
  heading: string;
  description?: string;
}

const statusLabel: Record<string, string> = {
  newly_approved: 'Yeni Onay Aldı',
  in_distribution: 'Talep Toplama',
  awaiting_trading: 'İşlem Bekleniyor',
  trading: 'İşlem Gördüğü',
  completed: 'Tamamlandı',
};

export default function SsrIpoList({ items, heading, description }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section style={{ marginTop: 32, padding: '24px 0' }} aria-label="Halka arz listesi">
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          {heading}
        </h2>
        {description ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 0 }}>{description}</p>
        ) : null}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {items.slice(0, 30).map((ipo) => (
          <article
            key={ipo.id || ipo.ticker}
            className="card"
            style={{ padding: '14px 16px', display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                {ipo.ticker ? `${ipo.ticker} — ` : ''}
                {ipo.company_name || 'Halka Arz'}
              </h3>
              {ipo.status ? (
                <span style={{ fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
                  {statusLabel[ipo.status] || ipo.status}
                </span>
              ) : null}
            </header>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
              {ipo.price != null ? `Fiyat: ${ipo.price} TL` : ''}
              {ipo.lot != null ? ` · Lot: ${ipo.lot}` : ''}
              {ipo.start_date ? ` · Talep: ${formatDate(ipo.start_date)}` : ''}
              {ipo.end_date ? ` — ${formatDate(ipo.end_date)}` : ''}
              {ipo.trading_date ? ` · İşlem Günü: ${formatDate(ipo.trading_date)}` : ''}
              {ipo.broker ? ` · Aracı: ${ipo.broker}` : ''}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
