'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchKurumOnerileri, formatDate, type KurumOneri } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';

// ─── Types ───────────────────────────────────────────────────────────────────

type Period = 'today' | 'week' | 'month' | 'all';

interface DayGroup {
  date: string;
  items: KurumOneri[];
}

const TABS: { key: Period; label: string }[] = [
  { key: 'today', label: 'Bugün Paylaşılan' },
  { key: 'week', label: 'Bu Hafta' },
  { key: 'month', label: 'Bu Ay' },
  { key: 'all', label: 'Tümü' },
];

// ─── Recommendation style config ────────────────────────────────────────────

function getRecStyle(rec: string | null): { bg: string; color: string; border: string; label: string } {
  if (!rec) return { bg: 'rgba(120,144,156,0.12)', color: '#90A4AE', border: 'rgba(120,144,156,0.25)', label: 'Belirsiz' };
  const l = rec.toLowerCase().replace(/ı/g, 'i').replace(/ü/g, 'u').replace(/ö/g, 'o');
  if (l.includes('al') || l.includes('ustu') || l.includes('ekle') || l.includes('güçlü') || l.includes('guclu'))
    return { bg: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: 'rgba(76,175,80,0.25)', label: rec };
  if (l.includes('sat') || l.includes('alti') || l.includes('azalt'))
    return { bg: 'rgba(255,82,82,0.12)', color: '#FF5252', border: 'rgba(255,82,82,0.25)', label: rec };
  if (l.includes('tut') || l.includes('paralel') || l.includes('notr') || l.includes('nötr'))
    return { bg: 'rgba(255,152,0,0.12)', color: '#FF9800', border: 'rgba(255,152,0,0.25)', label: rec };
  return { bg: 'rgba(120,144,156,0.12)', color: '#90A4AE', border: 'rgba(120,144,156,0.25)', label: rec };
}

function fmtPrice(n: number): string {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDateTR(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch { return dateStr; }
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonDay() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="skeleton h-4 w-32" />
        <div className="flex gap-2">
          <div className="skeleton h-5 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// ─── Recommendation Table ────────────────────────────────────────────────────

function RecommendationTable({ items }: { items: KurumOneri[] }) {
  return (
    <div className="-mx-1">
      <table className="w-full" style={{ fontSize: 12 }}>
        <thead>
          <tr style={{ borderBottom: '1px solid var(--border-primary)' }}>
            <th className="text-left font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Hisse</th>
            <th className="text-left font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Kurum</th>
            <th className="text-center font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Öneri</th>
            <th className="text-right font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Hedef Fiyat</th>
            <th className="text-right font-semibold pb-2 px-1.5" style={{ color: 'var(--text-muted)', fontSize: 10 }}>Potansiyel</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const rs = getRecStyle(item.recommendation);
            const hasReturn = item.potential_return != null;
            const isPos = hasReturn && item.potential_return! > 0;

            return (
              <tr
                key={item.id}
                className="transition-colors"
                style={{ borderBottom: '1px solid var(--border-primary)' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
              >
                <td className="py-2 px-1.5">
                  <div className="flex flex-col">
                    <span className="font-bold" style={{ color: 'var(--text-primary)', fontSize: 12 }}>{item.ticker}</span>
                    {item.company_name && (
                      <span style={{ fontSize: 10, lineHeight: 1.4, color: 'var(--text-muted)', marginTop: 2 }} className="truncate max-w-[120px]">
                        {item.company_name}
                      </span>
                    )}
                  </div>
                </td>
                <td className="py-2 px-1.5">
                  <span className="truncate block max-w-[100px]" style={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                    {item.institution_name}
                  </span>
                </td>
                <td className="py-2 px-1.5 text-center">
                  <span
                    className="badge"
                    style={{
                      background: rs.bg,
                      color: rs.color,
                      border: `1px solid ${rs.border}`,
                    }}
                  >
                    {rs.label}
                  </span>
                </td>
                <td className="py-2 px-1.5 text-right font-mono" style={{ color: 'var(--text-secondary)', fontSize: 11 }}>
                  {item.target_price != null ? `${fmtPrice(item.target_price)} ₺` : '—'}
                </td>
                <td className="py-2 px-1.5 text-right">
                  {hasReturn ? (
                    <span
                      className="font-bold"
                      style={{
                        color: isPos ? '#4CAF50' : '#FF5252',
                        fontSize: 11,
                      }}
                    >
                      {isPos ? '+' : ''}{item.potential_return!.toFixed(1)}%
                    </span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Day Accordion Item ──────────────────────────────────────────────────────

function DayAccordion({ group, defaultOpen }: { group: DayGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  const buyCount = group.items.filter((i) => {
    const rs = getRecStyle(i.recommendation);
    return rs.color === '#4CAF50';
  }).length;
  const sellCount = group.items.filter((i) => {
    const rs = getRecStyle(i.recommendation);
    return rs.color === '#FF5252';
  }).length;
  const holdCount = group.items.length - buyCount - sellCount;

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
            style={{ background: 'rgba(38,166,154,0.1)', border: '1px solid rgba(38,166,154,0.2)' }}
          >
            <svg className="w-4 h-4" style={{ color: '#26A69A' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {fmtDateTR(group.date)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="badge"
            style={{
              background: 'rgba(38,166,154,0.12)',
              color: '#26A69A',
              border: '1px solid rgba(38,166,154,0.25)',
            }}
          >
            {group.items.length} öneri
          </span>
          {buyCount > 0 && (
            <span
              className="badge hidden sm:inline-flex"
              style={{
                background: 'rgba(76,175,80,0.12)',
                color: '#4CAF50',
                border: '1px solid rgba(76,175,80,0.25)',
              }}
            >
              {buyCount} al
            </span>
          )}
          {sellCount > 0 && (
            <span
              className="badge hidden sm:inline-flex"
              style={{
                background: 'rgba(255,82,82,0.12)',
                color: '#FF5252',
                border: '1px solid rgba(255,82,82,0.25)',
              }}
            >
              {sellCount} sat
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
          className="px-5 py-4"
          style={{ borderTop: '1px solid var(--border-primary)' }}
        >
          <RecommendationTable items={group.items} />
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function KurumOnerileriContent() {
  const [data, setData] = useState<KurumOneri[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('all');
  const [visibleCount, setVisibleCount] = useState(5);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setVisibleCount(5);
    fetchKurumOnerileri(period, 500)
      .then((res) => { setData(res.items); })
      .catch(() => setError('Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => setLoading(false));
  }, [period]);

  // Tarih gruplama
  const groups = useMemo(() => {
    const map = new Map<string, KurumOneri[]>();
    for (const item of data) {
      const dateKey = item.report_date.slice(0, 10);
      if (!map.has(dateKey)) map.set(dateKey, []);
      map.get(dateKey)!.push(item);
    }
    return Array.from(map.entries())
      .sort((a, b) => b[0].localeCompare(a[0]))
      .map(([date, items]): DayGroup => ({ date, items }));
  }, [data]);

  const visibleGroups = groups.slice(0, visibleCount);
  const hasMore = visibleCount < groups.length;

  // Stats
  const totalOneri = data.length;
  const uniqueInstitutions = new Set(data.map((d) => d.institution_name)).size;
  const uniqueTickers = new Set(data.map((d) => d.ticker)).size;

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(38,166,154,0.2)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(38,166,154,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
              style={{ background: 'rgba(38,166,154,0.1)', border: '1px solid rgba(38,166,154,0.2)' }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: '#26A69A' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#26A69A' }}>Kurum Tavsiyeleri</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Kurum Önerileri
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Aracı kurum hedef fiyat tavsiyeleri
            </p>
          </div>

          {/* Stats */}
          {!loading && data.length > 0 && (
            <div className="shrink-0 flex flex-col items-end gap-1.5">
              <div className="flex items-center gap-3">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(38,166,154,0.08)', border: '1px solid rgba(38,166,154,0.2)' }}
                >
                  <span className="text-lg font-bold" style={{ color: '#26A69A' }}>{totalOneri}</span>
                  <span className="text-xs font-medium" style={{ color: '#26A69A' }}>Öneri</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(41,121,255,0.08)', border: '1px solid rgba(41,121,255,0.2)' }}
                >
                  <span className="text-lg font-bold" style={{ color: '#2979FF' }}>{uniqueInstitutions}</span>
                  <span className="text-xs font-medium" style={{ color: '#2979FF' }}>Kurum</span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{ background: 'rgba(255,152,0,0.08)', border: '1px solid rgba(255,152,0,0.2)' }}
                >
                  <span className="text-lg font-bold" style={{ color: '#FF9800' }}>{uniqueTickers}</span>
                  <span className="text-xs font-medium" style={{ color: '#FF9800' }}>Hisse</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* ─── Period Tabs ─── */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setPeriod(tab.key)}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all active:scale-95"
            style={{
              background: period === tab.key ? '#26A69A' : 'var(--bg-surface)',
              color: period === tab.key ? '#fff' : 'var(--text-secondary)',
              border: period === tab.key ? '1px solid #26A69A' : '1px solid var(--border-primary)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              if (period !== tab.key) {
                e.currentTarget.style.background = 'var(--bg-card-hover)';
                e.currentTarget.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (period !== tab.key) {
                e.currentTarget.style.background = 'var(--bg-surface)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <InlineAppBanner
        title="Kurum Önerileri Bildirimi!"
        message="Aracı kurumların yeni hedef fiyat ve tavsiyelerinden anında haberdar olun."
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
        <div className="card p-8 text-center">
          <p className="text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
            {period === 'today' ? 'Bugün Henüz Öneri Yok' : 'Öneri Bulunamadı'}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Veriler 2 saatte bir güncellenir.
          </p>
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
                Daha Fazla Yükle
              </button>
            </div>
          )}
        </>
      )}

      {/* ─── Disclaimer ─── */}
      <div
        className="flex gap-3 p-4 rounded-xl"
        style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.15)' }}
      >
        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
        <p className="text-xs" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Bu sayfadaki bilgiler yatırım tavsiyesi niteliği taşımaz. Yatırım kararlarınızı
          kendi araştırmanıza dayandırmanız önerilir. Kaynak: hedeffiyat.com.tr
        </p>
      </div>

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner message="Kurum önerilerinden anında haberdar olun!" />
    </div>
  );
}
