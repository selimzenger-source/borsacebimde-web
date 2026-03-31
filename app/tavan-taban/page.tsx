'use client';

import { useEffect, useState } from 'react';
import { api, DailyMarketStat, formatDate } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Types ───────────────────────────────────────────────────────────────────

interface DayGroup {
  date: string;
  ceiling: DailyMarketStat[];
  floor: DailyMarketStat[];
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonDay() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-16 rounded" />
          <div className="skeleton h-5 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

// ─── Tavan/Taban badge ────────────────────────────────────────────────────────

function TavanBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-green/15 text-accent-green border border-accent-green/25">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
      </svg>
      {count} tavan
    </span>
  );
}

function TabanBadge({ count }: { count: number }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-gold/15 text-accent-gold border border-accent-gold/25">
      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
      </svg>
      {count} taban
    </span>
  );
}

// ─── Seri Badge ──────────────────────────────────────────────────────────────

function SeriBadge({ count, type }: { count: number; type: 'ceiling' | 'floor' }) {
  if (count <= 1) return null;
  return (
    <span
      className={[
        'inline-flex items-center px-2 py-0.5 rounded text-xs font-bold',
        type === 'ceiling'
          ? 'bg-accent-green/10 text-accent-green'
          : 'bg-accent-gold/10 text-accent-gold',
      ].join(' ')}
    >
      {count}. Gün
    </span>
  );
}

// ─── Stock Table ──────────────────────────────────────────────────────────────

function StockTable({ stocks, type }: { stocks: DailyMarketStat[]; type: 'ceiling' | 'floor' }) {
  const isCeiling = type === 'ceiling';

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <div
          className={[
            'w-1 h-5 rounded-full',
            isCeiling ? 'bg-accent-green' : 'bg-accent-gold',
          ].join(' ')}
        />
        <h3
          className={[
            'text-sm font-bold',
            isCeiling ? 'text-accent-green' : 'text-accent-gold',
          ].join(' ')}
        >
          {isCeiling ? 'Tavan Hisseleri' : 'Taban Hisseleri'}
        </h3>
        <span
          className={[
            'ml-auto text-xs font-semibold px-2 py-0.5 rounded-full',
            isCeiling
              ? 'bg-accent-green/10 text-accent-green'
              : 'bg-accent-gold/10 text-accent-gold',
          ].join(' ')}
        >
          {stocks.length} hisse
        </span>
      </div>

      {stocks.length === 0 ? (
        <p className="text-text-muted text-sm py-4 text-center">
          {isCeiling ? 'Tavan hissesi yok' : 'Taban hissesi yok'}
        </p>
      ) : (
        <div className="overflow-x-auto -mx-1">
          <table className="w-full text-sm min-w-[500px]">
            <thead>
              <tr className="border-b border-white/5">
                <th className="text-left text-text-muted text-xs font-semibold pb-2 px-1">Hisse</th>
                <th className="text-right text-text-muted text-xs font-semibold pb-2 px-1">Fiyat</th>
                <th className="text-right text-text-muted text-xs font-semibold pb-2 px-1">Değişim</th>
                <th className="text-right text-text-muted text-xs font-semibold pb-2 px-1">Seri</th>
                <th className="text-left text-text-muted text-xs font-semibold pb-2 px-1 pl-3">Neden (AI)</th>
              </tr>
            </thead>
            <tbody>
              {stocks.map((s) => (
                <tr
                  key={s.id}
                  className="border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors"
                >
                  <td className="py-2.5 px-1">
                    <span className="font-bold text-text-primary">{s.ticker}</span>
                  </td>
                  <td className="py-2.5 px-1 text-right font-mono text-text-secondary">
                    {s.close_price.toFixed(2)}
                  </td>
                  <td className="py-2.5 px-1 text-right">
                    <span
                      className={[
                        'font-bold',
                        isCeiling ? 'text-accent-green' : 'text-accent-gold',
                      ].join(' ')}
                    >
                      {s.percent_change > 0 ? '+' : ''}
                      {s.percent_change.toFixed(2)}%
                    </span>
                  </td>
                  <td className="py-2.5 px-1 text-right">
                    <SeriBadge
                      count={isCeiling ? s.consecutive_ceiling_count : s.consecutive_floor_count}
                      type={type}
                    />
                  </td>
                  <td className="py-2.5 px-1 pl-3 text-text-secondary max-w-[200px]">
                    {s.reason ? (
                      <span className="text-xs leading-relaxed">{s.reason}</span>
                    ) : (
                      <span className="text-text-muted text-xs italic">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Day Accordion Item ───────────────────────────────────────────────────────

function DayAccordion({
  group,
  defaultOpen,
}: {
  group: DayGroup;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <span className="font-semibold text-text-primary text-sm">
            {formatDate(group.date)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {group.ceiling.length > 0 && <TavanBadge count={group.ceiling.length} />}
          {group.floor.length > 0 && <TabanBadge count={group.floor.length} />}
          <svg
            className={['w-4 h-4 text-text-muted transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
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
        <div className="border-t border-white/[0.06] px-5 py-4 flex flex-col gap-6">
          {group.ceiling.length > 0 && (
            <StockTable stocks={group.ceiling} type="ceiling" />
          )}
          {group.floor.length > 0 && (
            <StockTable stocks={group.floor} type="floor" />
          )}
          {group.ceiling.length === 0 && group.floor.length === 0 && (
            <p className="text-text-muted text-sm text-center py-4">Bu gün veri yok.</p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function TavanTabanPage() {
  const [groups, setGroups] = useState<DayGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    api
      .getDailyMarketStats(30)
      .then((data) => {
        // Group by date
        const map = new Map<string, DayGroup>();
        for (const stat of data) {
          const dateKey = stat.date.slice(0, 10); // YYYY-MM-DD
          if (!map.has(dateKey)) {
            map.set(dateKey, { date: dateKey, ceiling: [], floor: [] });
          }
          const g = map.get(dateKey)!;
          if (stat.type === 'ceiling') g.ceiling.push(stat);
          else if (stat.type === 'floor') g.floor.push(stat);
        }
        // Sort by date descending
        const sorted = Array.from(map.values()).sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        setGroups(sorted);
      })
      .catch(() => setError('Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => setLoading(false));
  }, []);

  const visibleGroups = groups.slice(0, visibleCount);
  const hasMore = visibleCount < groups.length;

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <div>
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-accent-gold/10 border border-accent-gold/20">
          <svg className="w-3.5 h-3.5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 7h18M3 12h18M3 17h18" />
          </svg>
          <span className="text-accent-gold text-xs font-semibold">Günlük Veriler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          Tavan ve Taban Hisseleri
        </h1>
        <p className="text-text-secondary text-sm">Son 30 günün verileri</p>
      </div>

      {/* ─── Info Box ─── */}
      <div className="flex gap-3 p-4 rounded-xl bg-accent-gold/[0.06] border border-accent-gold/20">
        <svg className="w-5 h-5 text-accent-gold shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <p className="text-text-secondary text-sm leading-relaxed">
          Gün sonunda <span className="text-accent-green font-semibold">%9,75 ve üzeri</span> kapatan
          hisseler tavan, <span className="text-accent-gold font-semibold">%-9,75 ve altı</span> kapatan
          hisseler taban olarak listelenir.
        </p>
      </div>

      {/* ─── Error ─── */}
      {error && (
        <div className="flex gap-3 p-4 rounded-xl bg-accent-red/10 border border-accent-red/25">
          <svg className="w-5 h-5 text-accent-red shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="12" r="10" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" />
          </svg>
          <p className="text-text-secondary text-sm">{error}</p>
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

      {/* ─── Accordion List ─── */}
      {!loading && !error && groups.length === 0 && (
        <div className="glass-card p-8 text-center text-text-muted text-sm">
          Son 30 gün içinde tavan veya taban verisi bulunamadı.
        </div>
      )}

      {!loading && !error && groups.length > 0 && (
        <>
          <div className="space-y-3">
            {visibleGroups.map((group, idx) => (
              <DayAccordion
                key={group.date}
                group={group}
                defaultOpen={idx === 0}
              />
            ))}
          </div>

          {/* Ad after 5 days */}
          {visibleCount >= 5 && (
            <div className="my-4">
              <AdBanner slot="4045086866" format="horizontal" />
            </div>
          )}

          {/* Load more */}
          {hasMore && (
            <div className="text-center">
              <button
                onClick={() => setVisibleCount((v) => v + 5)}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-white/5 border border-white/10 text-text-secondary text-sm font-medium hover:bg-white/10 hover:text-text-primary transition-all active:scale-95"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
                Daha Fazla Yükle
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner />
    </div>
  );
}
