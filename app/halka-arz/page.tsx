'use client';

import { useEffect, useState, useMemo } from 'react';
import { api, formatDate, type IPO } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Status helpers ───────────────────────────────────────────────────────────

type StatusKey = 'in_distribution' | 'trading' | 'newly_approved' | 'awaiting_trading' | string;

const STATUS_LABEL: Record<string, string> = {
  in_distribution: 'Dagitimda',
  trading: 'Islem Goruyor',
  newly_approved: 'Onayli',
  awaiting_trading: 'Islem Bekliyor',
  awaiting_approval: 'Onay Bekliyor',
  cancelled: 'Iptal',
  completed: 'Tamamlandi',
};

function statusLabel(s: StatusKey): string {
  return STATUS_LABEL[s] ?? s;
}

function statusBadgeStyle(s: StatusKey): React.CSSProperties {
  const styles: Record<string, React.CSSProperties> = {
    in_distribution: { background: 'rgba(41,121,255,0.1)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.25)' },
    trading: { background: 'rgba(76,175,80,0.1)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' },
    newly_approved: { background: 'rgba(255,215,0,0.1)', color: '#D4A800', border: '1px solid rgba(255,215,0,0.25)' },
    awaiting_trading: { background: 'rgba(255,152,0,0.1)', color: '#FF9800', border: '1px solid rgba(255,152,0,0.25)' },
    awaiting_approval: { background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-primary)' },
    cancelled: { background: 'rgba(255,82,82,0.1)', color: '#FF5252', border: '1px solid rgba(255,82,82,0.25)' },
    completed: { background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-primary)' },
  };
  return styles[s] ?? { background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' };
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type FilterKey = 'all' | 'in_distribution' | 'trading' | 'newly_approved';

const FILTERS: { key: FilterKey; label: string; color: string }[] = [
  { key: 'all', label: 'Tumu', color: '#2979FF' },
  { key: 'in_distribution', label: 'Dagitimda', color: '#2979FF' },
  { key: 'trading', label: 'Islem Goruyor', color: '#4CAF50' },
  { key: 'newly_approved', label: 'Onayli', color: '#FFD700' },
];

// ─── Format helpers ───────────────────────────────────────────────────────────

function formatPrice(price: number | null): string {
  if (price == null) return '\u2014';
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' TL';
}

function formatLot(lot: number | null): string {
  if (lot == null) return '\u2014';
  if (lot >= 1_000_000) return (lot / 1_000_000).toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + 'M';
  if (lot >= 1_000) return (lot / 1_000).toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + 'K';
  return lot.toLocaleString('tr-TR');
}

function formatValuation(val: number | null): string {
  if (val == null) return '\u2014';
  if (val >= 1_000_000_000) return (val / 1_000_000_000).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Milyar TL';
  if (val >= 1_000_000) return (val / 1_000_000).toLocaleString('tr-TR', { minimumFractionDigits: 0, maximumFractionDigits: 1 }) + ' Milyon TL';
  return val.toLocaleString('tr-TR') + ' TL';
}

function formatPct(pct: number | null): { text: string; color: string } {
  if (pct == null) return { text: '\u2014', color: 'var(--text-muted)' };
  const sign = pct > 0 ? '+' : '';
  const color = pct > 0 ? '#4CAF50' : pct < 0 ? '#FF5252' : 'var(--text-muted)';
  return {
    text: `${sign}${pct.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`,
    color,
  };
}

function formatDateRange(start: string | null, end: string | null): string {
  if (!start && !end) return '\u2014';
  if (start && end) return `${formatDate(start)} - ${formatDate(end)}`;
  return formatDate(start ?? end ?? '');
}

function sortByDate(a: IPO, b: IPO): number {
  const da = a.start_date ?? a.created_at ?? '';
  const db = b.start_date ?? b.created_at ?? '';
  return db.localeCompare(da);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableRowSkeleton() {
  return (
    <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded" style={{ width: `${55 + (i * 13) % 45}%` }} />
        </td>
      ))}
    </tr>
  );
}

function CardSkeleton() {
  return (
    <div className="card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="skeleton h-5 w-32 rounded" />
        <div className="skeleton h-5 w-16 rounded" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-full rounded" />
      </div>
      <div className="flex items-center justify-between">
        <div className="skeleton h-4 w-24 rounded" />
        <div className="skeleton h-4 w-16 rounded" />
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HalkaArzPage() {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterKey>('all');

  useEffect(() => {
    api.getIPOs()
      .then((data) => {
        setIpos([...data].sort(sortByDate));
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const filtered = useMemo(() => {
    if (activeFilter === 'all') return ipos;
    return ipos.filter((i) => i.status === activeFilter);
  }, [ipos, activeFilter]);

  // Count per filter for badges
  const counts = useMemo(() => {
    const c: Record<FilterKey, number> = { all: ipos.length, in_distribution: 0, trading: 0, newly_approved: 0 };
    ipos.forEach((i) => {
      if (i.status === 'in_distribution') c.in_distribution++;
      else if (i.status === 'trading') c.trading++;
      else if (i.status === 'newly_approved') c.newly_approved++;
    });
    return c;
  }, [ipos]);

  // Insert ad banners after every 10 items
  const insertAdAfter = 10;

  return (
    <div className="flex flex-col gap-0">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div
        className="card px-6 py-6 mb-6 flex items-start gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(41,121,255,0.06), rgba(41,121,255,0.02))' }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(41,121,255,0.12)', border: '1px solid rgba(41,121,255,0.2)', color: '#2979FF' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Halka Arz Takibi</h1>
          <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>SPK onayli guncel halka arzlar</p>
        </div>
      </div>

      {/* ── Filter Tabs ──────────────────────────────────────────────────── */}
      <div className="overflow-x-auto pb-1 mb-5 -mx-1 px-1">
        <div className="flex gap-2 min-w-max">
          {FILTERS.map((f) => {
            const active = activeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150"
                style={
                  active
                    ? {
                        background: `${f.color}15`,
                        border: `1px solid ${f.color}40`,
                        color: f.color,
                      }
                    : {
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-primary)',
                        color: 'var(--text-secondary)',
                      }
                }
              >
                {f.label}
                {!loading && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={
                      active
                        ? { background: `${f.color}25`, color: f.color }
                        : { background: 'var(--bg-card)', color: 'var(--text-muted)' }
                    }
                  >
                    {counts[f.key]}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Error state ──────────────────────────────────────────────────── */}
      {error && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,82,82,0.1)', color: '#FF5252' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Veriler yuklenirken hata olustu. Lutfen sayfayi yenileyin.</p>
          <button
            onClick={() => {
              setError(false);
              setLoading(true);
              api.getIPOs()
                .then((d) => { setIpos([...d].sort(sortByDate)); setLoading(false); })
                .catch(() => { setError(true); setLoading(false); });
            }}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' }}
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* ── Desktop Table ─────────────────────────────────────────────────── */}
      {!error && (
        <div className="hidden md:block mb-6">
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--border-primary)', background: 'var(--bg-surface)' }}>
                    {['Sirket', 'Hisse Kodu', 'Fiyat', 'Lot', 'Degerleme', 'Durum', 'Tarih Araligi', 'Performans'].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold"
                        style={{ color: 'var(--text-muted)' }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 8 }).map((_, i) => <TableRowSkeleton key={i} />)
                  ) : filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8" style={{ opacity: 0.3, color: 'var(--text-muted)' }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75" />
                          </svg>
                          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Bu filtre icin halka arz bulunamadi.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((ipo, idx) => {
                      const pct = formatPct(ipo.percent_change);
                      const rows = [];

                      rows.push(
                        <tr
                          key={ipo.id}
                          className="transition-colors"
                          style={{ borderBottom: '1px solid var(--border-primary)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg-card-hover)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td className="px-4 py-3 max-w-[200px]">
                            <span className="font-medium line-clamp-1" style={{ color: 'var(--text-primary)' }}>
                              {ipo.company_name}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            {ipo.ticker ? (
                              <span
                                className="font-bold text-xs px-2 py-1 rounded-lg"
                                style={{ background: 'rgba(41,121,255,0.1)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.2)' }}
                              >
                                {ipo.ticker}
                              </span>
                            ) : (
                              <span style={{ color: 'var(--text-muted)' }}>{'\u2014'}</span>
                            )}
                          </td>
                          <td className="px-4 py-3 font-medium" style={{ color: 'var(--text-secondary)' }}>
                            {formatPrice(ipo.share_price)}
                          </td>
                          <td className="px-4 py-3" style={{ color: 'var(--text-secondary)' }}>
                            {formatLot(ipo.lot_count)}
                          </td>
                          <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-secondary)' }}>
                            {formatValuation(ipo.valuation_tl)}
                          </td>
                          <td className="px-4 py-3">
                            <span className="badge" style={statusBadgeStyle(ipo.status)}>
                              {statusLabel(ipo.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs whitespace-nowrap" style={{ color: 'var(--text-muted)' }}>
                            <div className="flex flex-col gap-0.5">
                              <span>{formatDateRange(ipo.start_date, ipo.end_date)}</span>
                              {ipo.first_trading_date && (
                                <span style={{ color: '#2979FF', fontSize: 11 }}>
                                  Islem: {formatDate(ipo.first_trading_date)}
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-bold text-sm" style={{ color: pct.color }}>
                              {pct.text}
                            </span>
                          </td>
                        </tr>
                      );

                      // Insert ad after every N items
                      if ((idx + 1) % insertAdAfter === 0 && idx + 1 < filtered.length) {
                        rows.push(
                          <tr key={`ad-${idx}`}>
                            <td colSpan={8} className="p-3">
                              <AdBanner slot="4045086866" format="horizontal" />
                            </td>
                          </tr>
                        );
                      }

                      return rows;
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            {!loading && filtered.length > 0 && (
              <div
                className="px-4 py-3 flex items-center justify-between"
                style={{ borderTop: '1px solid var(--border-primary)', background: 'var(--bg-surface)' }}
              >
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{filtered.length} halka arz listeleniyor</span>
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Tarihe gore siralandi</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Mobile Card Layout ────────────────────────────────────────────── */}
      {!error && (
        <div className="md:hidden flex flex-col gap-3 mb-6">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)
          ) : filtered.length === 0 ? (
            <div className="card p-8 flex flex-col items-center gap-3 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8" style={{ opacity: 0.3, color: 'var(--text-muted)' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75" />
              </svg>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Bu filtre icin halka arz bulunamadi.</p>
            </div>
          ) : (
            filtered.map((ipo, idx) => {
              const pct = formatPct(ipo.percent_change);
              const items = [];

              items.push(
                <div key={ipo.id} className="card p-4 flex flex-col gap-3">
                  {/* Header: company name + status */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1.5 min-w-0">
                      <span className="font-semibold text-sm leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {ipo.company_name}
                      </span>
                      {ipo.ticker && (
                        <span
                          className="inline-block w-fit font-bold text-[11px] px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(41,121,255,0.1)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.2)' }}
                        >
                          {ipo.ticker}
                        </span>
                      )}
                    </div>
                    <span className="badge shrink-0" style={statusBadgeStyle(ipo.status)}>
                      {statusLabel(ipo.status)}
                    </span>
                  </div>

                  {/* Data grid */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2" style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 10 }}>
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Fiyat</span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{formatPrice(ipo.share_price)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Lot</span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{formatLot(ipo.lot_count)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Degerleme</span>
                      <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>{formatValuation(ipo.valuation_tl)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>Performans</span>
                      <span className="text-xs font-bold" style={{ color: pct.color }}>
                        {pct.text}
                      </span>
                    </div>
                  </div>

                  {/* Date section */}
                  <div className="flex flex-col gap-1" style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 8 }}>
                    {(ipo.start_date || ipo.end_date) && (
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3" style={{ color: 'var(--text-muted)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 1v2M11 1v2M1.5 5.5h13M2 3h12a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V3.5A.5.5 0 012 3z" />
                        </svg>
                        <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                          {formatDateRange(ipo.start_date, ipo.end_date)}
                        </span>
                      </div>
                    )}
                    {ipo.first_trading_date && (
                      <div className="flex items-center gap-1.5">
                        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3" style={{ color: '#2979FF' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
                        </svg>
                        <span style={{ color: '#2979FF', fontSize: 11, fontWeight: 500 }}>
                          Islem baslangici: {formatDate(ipo.first_trading_date)}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );

              // Insert ad after every N items
              if ((idx + 1) % insertAdAfter === 0 && idx + 1 < filtered.length) {
                items.push(
                  <div key={`ad-${idx}`}>
                    <AdBanner slot="4045086866" format="horizontal" />
                  </div>
                );
              }

              return items;
            })
          )}

          {!loading && filtered.length > 0 && (
            <p className="text-center text-xs pt-1" style={{ color: 'var(--text-muted)' }}>
              {filtered.length} halka arz listeleniyor
            </p>
          )}
        </div>
      )}

      {/* ── Info Box ─────────────────────────────────────────────────────── */}
      <div
        className="rounded-xl px-4 py-3 flex gap-3 items-start mb-6 text-sm"
        style={{
          background: 'rgba(255,215,0,0.05)',
          border: '1px solid rgba(255,215,0,0.15)',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.8}
          className="w-4 h-4 shrink-0 mt-0.5"
          style={{ color: '#FFD700' }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
        </svg>
        <p className="leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Halka arz verileri SPK ve KAP kaynaklarindan alinmaktadir. Bu sayfa yalnizca bilgi amaclidir; yatirim tavsiyesi degildir.
        </p>
      </div>

      {/* ── AdBanner ─────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <AdBanner slot="4045086866" format="horizontal" />
      </div>

      {/* ── AppStoreBanner ───────────────────────────────────────────────── */}
      <AppStoreBanner />
    </div>
  );
}
