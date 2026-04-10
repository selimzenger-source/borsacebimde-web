'use client';

import { useEffect, useState } from 'react';
import { api, DailyMarketStat, formatDate } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';
import FAQ from '@/components/FAQ';
import { tavanTabanFAQ } from '@/lib/faq-data';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DayGroup {
  date: string;
  ceiling: DailyMarketStat[];
  floor: DailyMarketStat[];
}

// ─── Status badge config ─────────────────────────────────────────────────────

type StockStatus = 'TAVAN' | 'TABAN' | 'ALICILI' | 'SATICILI';

function getStatusFromStat(stat: DailyMarketStat): StockStatus {
  if (stat.is_ceiling) {
    return stat.percent_change >= 9.75 ? 'TAVAN' : 'ALICILI';
  }
  return stat.percent_change <= -9.75 ? 'TABAN' : 'SATICILI';
}

const STATUS_STYLES: Record<StockStatus, { bg: string; color: string; border: string }> = {
  TAVAN: { bg: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: 'rgba(76,175,80,0.3)' },
  TABAN: { bg: 'rgba(255,82,82,0.12)', color: '#FF5252', border: 'rgba(255,82,82,0.3)' },
  ALICILI: { bg: 'rgba(41,121,255,0.12)', color: '#2979FF', border: 'rgba(41,121,255,0.3)' },
  SATICILI: { bg: 'rgba(255,152,0,0.12)', color: '#FF9800', border: 'rgba(255,152,0,0.3)' },
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonDay() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="skeleton h-4 w-32" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded-full" />
          <div className="skeleton h-5 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Seri Badge ──────────────────────────────────────────────────────────────

function SeriBadge({ count, type }: { count: number; type: 'ceiling' | 'floor' }) {
  if (count <= 1) return null;
  const color = type === 'ceiling' ? '#4CAF50' : '#FF5252';
  return (
    <span
      className="badge"
      style={{
        background: type === 'ceiling' ? 'rgba(76,175,80,0.1)' : 'rgba(255,82,82,0.1)',
        color,
        border: `1px solid ${type === 'ceiling' ? 'rgba(76,175,80,0.25)' : 'rgba(255,82,82,0.25)'}`,
      }}
    >
      {count}. Gun
    </span>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: StockStatus }) {
  const style = STATUS_STYLES[status];
  return (
    <span
      className="badge"
      style={{
        background: style.bg,
        color: style.color,
        border: `1px solid ${style.border}`,
      }}
    >
      {status}
    </span>
  );
}

// ─── Stock Table ─────────────────────────────────────────────────────────────

function StockTable({ stocks, type }: { stocks: DailyMarketStat[]; type: 'ceiling' | 'floor' }) {
  const isCeiling = type === 'ceiling';
  const accentColor = isCeiling ? '#4CAF50' : '#FF5252';
  const accentBg = isCeiling ? 'rgba(76,175,80,0.08)' : 'rgba(255,82,82,0.08)';

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div
          className="w-1 h-5 rounded-full"
          style={{ background: accentColor }}
        />
        <h3 className="text-sm font-bold" style={{ color: accentColor }}>
          {isCeiling ? 'Tavan Hisseleri' : 'Taban Hisseleri'}
        </h3>
        <span
          className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: accentBg, color: accentColor }}
        >
          {stocks.length} hisse
        </span>
      </div>

      {stocks.length === 0 ? (
        <p className="text-sm py-4 text-center" style={{ color: 'var(--text-muted)' }}>
          {isCeiling ? 'Tavan hissesi yok' : 'Taban hissesi yok'}
        </p>
      ) : (
        <div className="-mx-1">
          <table className="w-full" style={{ fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
                <th className="text-left font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Hisse</th>
                <th className="text-right font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Fiyat</th>
                <th className="text-right font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Degisim</th>
                <th className="text-center font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Seri</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => {
                const seriCount = isCeiling ? s.consecutive_ceiling_count : s.consecutive_floor_count;
                return (
                  <tr
                    key={s.id}
                    className="transition-colors"
                    style={{ borderBottom: '1px solid var(--border-primary)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                  >
                    <td className="py-2 px-1.5">
                      <div className="flex flex-col">
                        <span className="font-bold" style={{ color: 'var(--text-primary)', fontSize: 12 }}>{s.ticker}</span>
                        {s.reason && (
                          <span style={{ fontSize: 10, lineHeight: 1.4, color: 'var(--text-muted)', marginTop: 2 }}>{s.reason}</span>
                        )}
                      </div>
                    </td>
                    <td className="py-2 px-1.5 text-right font-mono" style={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                      {s.close_price.toFixed(2)}
                    </td>
                    <td className="py-2 px-1.5 text-right">
                      <span className="font-bold" style={{ color: accentColor, fontSize: 11 }}>
                        {s.percent_change > 0 ? '+' : ''}
                        {s.percent_change.toFixed(2)}%
                      </span>
                    </td>
                    <td className="py-2 px-1.5 text-center">
                      <SeriBadge count={seriCount} type={type} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Day Accordion Item ──────────────────────────────────────────────────────

function DayAccordion({ group, defaultOpen }: { group: DayGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 transition-colors text-left"
        style={{ cursor: 'pointer' }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)' }}
          >
            <svg className="w-4 h-4" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {formatDate(group.date)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {group.ceiling.length > 0 && (
            <span
              className="badge"
              style={{
                background: 'rgba(76,175,80,0.12)',
                color: '#4CAF50',
                border: '1px solid rgba(76,175,80,0.25)',
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
              </svg>
              {group.ceiling.length} tavan
            </span>
          )}
          {group.floor.length > 0 && (
            <span
              className="badge"
              style={{
                background: 'rgba(255,82,82,0.12)',
                color: '#FF5252',
                border: '1px solid rgba(255,82,82,0.25)',
              }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
              </svg>
              {group.floor.length} taban
            </span>
          )}
          <svg
            className="w-4 h-4 transition-transform duration-200"
            style={{
              color: 'var(--text-muted)',
              transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Body */}
      {open && (
        <div
          className="px-5 py-4 flex flex-col gap-6"
          style={{ borderTop: '1px solid var(--border-primary)' }}
        >
          {group.ceiling.length > 0 && (
            <StockTable stocks={group.ceiling} type="ceiling" />
          )}
          {group.floor.length > 0 && (
            <StockTable stocks={group.floor} type="floor" />
          )}
          {group.ceiling.length === 0 && group.floor.length === 0 && (
            <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>
              Bu gun veri yok.
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function TavanTabanContent() {
  const [groups, setGroups] = useState<DayGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    api
      .getDailyMarketStats(30)
      .then((data) => {
        const map = new Map<string, DayGroup>();
        for (const stat of data) {
          const dateKey = stat.date.slice(0, 10);
          if (!map.has(dateKey)) {
            map.set(dateKey, { date: dateKey, ceiling: [], floor: [] });
          }
          const g = map.get(dateKey)!;
          if (stat.is_ceiling) g.ceiling.push(stat);
          else if (stat.is_floor) g.floor.push(stat);
        }
        const sorted = Array.from(map.values()).sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setGroups(sorted);
      })
      .catch(() => setError('Veriler yuklenirken bir hata olustu. Lutfen sayfayi yenileyin.'))
      .finally(() => setLoading(false));
  }, []);

  const visibleGroups = groups.slice(0, visibleCount);
  const hasMore = visibleCount < groups.length;

  // Compute daily averages for header stats
  const totalCeiling = groups.reduce((sum, g) => sum + g.ceiling.length, 0);
  const totalFloor = groups.reduce((sum, g) => sum + g.floor.length, 0);
  const dayCount = groups.length || 1;
  const avgCeiling = (totalCeiling / dayCount).toFixed(1);
  const avgFloor = (totalFloor / dayCount).toFixed(1);

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(41,121,255,0.2)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
              style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)' }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-6L16.5 15m0 0L12 10.5m4.5 4.5V1.5" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>Gunluk Veriler</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Tavan ve Taban Hisseleri
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Son 30 gunun tavan ve taban verileri
            </p>
          </div>

          {/* Stats - gunluk ortalama */}
          {!loading && groups.length > 0 && (
            <div className="shrink-0 flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.2)' }}
                >
                  <svg className="w-4 h-4" style={{ color: '#4CAF50' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: '#4CAF50' }}>
                    {avgCeiling} tavan
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,82,82,0.08)', border: '1px solid rgba(255,82,82,0.2)' }}
                >
                  <svg className="w-4 h-4" style={{ color: '#FF5252' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
                  </svg>
                  <span className="text-sm font-semibold" style={{ color: '#FF5252' }}>
                    {avgFloor} taban
                  </span>
                </div>
              </div>
              <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>
                gunluk ort. ({dayCount} gun)
              </span>
            </div>
          )}
        </div>
      </header>

      <InlineAppBanner
        title="Tavan & Taban Bildirimleri!"
        message="Gunun tavan taban hisselerini her aksam seans kapandiktan sonra bildirim olarak alin."
      />

      {/* ─── Error ─── */}
      {error && (
        <div
          className="flex gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(255,82,82,0.1)', border: '1px solid rgba(255,82,82,0.25)' }}
        >
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF5252' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{error}</p>
        </div>
      )}

      {/* ─── Skeleton ─── */}
      {loading && (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonDay key={i} />
          ))}
        </div>
      )}

      {/* ─── Empty ─── */}
      {!loading && !error && groups.length === 0 && (
        <div className="card p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Son 30 gun icinde tavan veya taban verisi bulunamadi.
        </div>
      )}

      {/* ─── Accordion List ─── */}
      {!loading && !error && groups.length > 0 && (
        <>
          <div className="space-y-3">
            {visibleGroups.map((group, idx) => (
              <div key={group.date}>
                <DayAccordion
                  group={group}
                  defaultOpen={idx === 0}
                />
                {/* Ad every 7 day groups */}
                {(idx + 1) % 7 === 0 && idx + 1 < visibleGroups.length && (
                  <div className="my-4">
                    <AdBanner slot="3567518609" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount((v) => v + 5)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all active:scale-95"
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-secondary)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--bg-card-hover)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-surface)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                Daha Fazla Yukle
              </button>
            </div>
          )}
        </>
      )}

      <FAQ items={tavanTabanFAQ} title="Tavan Taban Hakkinda Sikca Sorulan Sorular" />

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner message="Her aksam seans kapandiktan sonra bildirim alin!" />
    </div>
  );
}
