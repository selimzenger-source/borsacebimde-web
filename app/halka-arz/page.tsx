'use client';

import { useEffect, useState, useMemo } from 'react';
import { api, formatDate, type IPO } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Status helpers ───────────────────────────────────────────────────────────

type StatusKey = 'in_distribution' | 'trading' | 'newly_approved' | 'awaiting_trading' | string;

const STATUS_LABEL: Record<string, string> = {
  in_distribution: 'Dağıtımda',
  trading: 'İşlem Görüyor',
  newly_approved: 'Onaylandı',
  awaiting_trading: 'İşlem Bekliyor',
  awaiting_approval: 'Onay Bekliyor',
  cancelled: 'İptal',
  completed: 'Tamamlandı',
};

const STATUS_STYLE: Record<string, string> = {
  in_distribution: 'bg-blue-900/40 text-blue-300 border-blue-700/40',
  trading: 'bg-green-900/40 text-green-300 border-green-700/40',
  newly_approved: 'bg-orange-900/40 text-orange-300 border-orange-700/40',
  awaiting_trading: 'bg-yellow-900/40 text-yellow-300 border-yellow-700/40',
  awaiting_approval: 'bg-gray-800/60 text-gray-400 border-gray-600/40',
  cancelled: 'bg-red-900/40 text-red-400 border-red-700/40',
  completed: 'bg-gray-800/40 text-gray-400 border-gray-600/40',
};

function statusLabel(s: StatusKey): string {
  return STATUS_LABEL[s] ?? s;
}

function statusStyle(s: StatusKey): string {
  return STATUS_STYLE[s] ?? 'bg-white/5 text-text-secondary border-white/10';
}

// ─── Filter tabs ──────────────────────────────────────────────────────────────

type FilterKey = 'all' | 'in_distribution' | 'trading' | 'newly_approved';

const FILTERS: { key: FilterKey; label: string }[] = [
  { key: 'all', label: 'Tümü' },
  { key: 'in_distribution', label: 'Dağıtımda' },
  { key: 'trading', label: 'İşlem Görüyor' },
  { key: 'newly_approved', label: 'Onaylandı' },
];

// ─── Format helpers ───────────────────────────────────────────────────────────

function formatPrice(price: number | null): string {
  if (price == null) return '—';
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' ₺';
}

function formatLot(lot: number | null): string {
  if (lot == null) return '—';
  if (lot >= 1_000_000) return (lot / 1_000_000).toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + 'M';
  if (lot >= 1_000) return (lot / 1_000).toLocaleString('tr-TR', { maximumFractionDigits: 0 }) + 'K';
  return lot.toLocaleString('tr-TR');
}

function sortByDate(a: IPO, b: IPO): number {
  const da = a.start_date ?? a.created_at ?? '';
  const db = b.start_date ?? b.created_at ?? '';
  return db.localeCompare(da);
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function TableRowSkeleton() {
  return (
    <tr className="border-b border-white/5">
      {[1, 2, 3, 4, 5, 6, 7].map((i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded" style={{ width: `${55 + (i * 13) % 45}%` }} />
        </td>
      ))}
    </tr>
  );
}

function CardSkeleton() {
  return (
    <div className="glass-card p-4 flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="skeleton h-5 w-32 rounded" />
        <div className="skeleton h-5 w-16 rounded" />
      </div>
      <div className="flex gap-4">
        <div className="skeleton h-4 w-20 rounded" />
        <div className="skeleton h-4 w-20 rounded" />
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

  return (
    <div className="flex flex-col gap-0">

      {/* ── Page Header ──────────────────────────────────────────────────── */}
      <div
        className="glass-card px-6 py-6 mb-6 flex items-start gap-4"
        style={{ background: 'linear-gradient(135deg, rgba(13,54,39,0.6) 0%, rgba(10,46,31,0.4) 100%)' }}
      >
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: 'rgba(76,175,80,0.15)', border: '1px solid rgba(76,175,80,0.25)', color: '#4CAF50' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Halka Arz Takibi</h1>
          <p className="text-text-secondary text-sm mt-0.5">SPK onaylı güncel halka arzlar</p>
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
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-150 border"
                style={
                  active
                    ? {
                        background: 'rgba(76,175,80,0.15)',
                        borderColor: 'rgba(76,175,80,0.35)',
                        color: '#4CAF50',
                      }
                    : {
                        background: 'rgba(255,255,255,0.03)',
                        borderColor: 'rgba(255,255,255,0.08)',
                        color: '#B0BEC5',
                      }
                }
              >
                {f.label}
                {!loading && (
                  <span
                    className="text-[10px] px-1.5 py-0.5 rounded-full font-bold"
                    style={
                      active
                        ? { background: 'rgba(76,175,80,0.25)', color: '#4CAF50' }
                        : { background: 'rgba(255,255,255,0.08)', color: '#78909C' }
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
        <div className="glass-card p-8 flex flex-col items-center gap-3 text-center mb-6">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,82,82,0.1)', color: '#FF5252' }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.008v.008H12v-.008z" />
            </svg>
          </div>
          <p className="text-text-secondary text-sm">Veriler yüklenirken hata oluştu. Lütfen sayfayı yenileyin.</p>
          <button
            onClick={() => { setError(false); setLoading(true); api.getIPOs().then((d) => { setIpos([...d].sort(sortByDate)); setLoading(false); }).catch(() => { setError(true); setLoading(false); }); }}
            className="px-4 py-2 rounded-lg text-sm font-semibold transition-all"
            style={{ background: 'rgba(255,255,255,0.06)', color: '#B0BEC5', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* ── Desktop Table ─────────────────────────────────────────────────── */}
      {!error && (
        <div className="hidden md:block mb-6">
          <div className="glass-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr
                    className="border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}
                  >
                    {['Şirket', 'Hisse Kodu', 'Fiyat', 'Lot', 'Durum', 'Tarih', 'Performans'].map((col) => (
                      <th
                        key={col}
                        className="px-4 py-3 text-left text-xs font-semibold"
                        style={{ color: '#78909C' }}
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
                      <td colSpan={7} className="px-4 py-12 text-center">
                        <div className="flex flex-col items-center gap-2">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8 opacity-30">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75" />
                          </svg>
                          <p className="text-text-muted text-sm">Bu filtre için halka arz bulunamadı.</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filtered.map((ipo) => {
                      const pct = ipo.percent_change;
                      const pctColor = pct == null ? '#78909C' : pct > 0 ? '#4CAF50' : pct < 0 ? '#FF5252' : '#78909C';
                      const dateStr = ipo.first_trading_date ?? ipo.start_date;
                      return (
                        <tr
                          key={ipo.id}
                          className="border-b transition-colors"
                          style={{ borderColor: 'rgba(255,255,255,0.04)' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.018)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td className="px-4 py-3 font-medium text-white max-w-[180px]">
                            <span className="line-clamp-1">{ipo.company_name}</span>
                          </td>
                          <td className="px-4 py-3">
                            {ipo.ticker ? (
                              <span
                                className="font-bold text-xs px-2 py-1 rounded-lg"
                                style={{ background: 'rgba(41,121,255,0.12)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.2)' }}
                              >
                                {ipo.ticker}
                              </span>
                            ) : (
                              <span className="text-text-muted">—</span>
                            )}
                          </td>
                          <td className="px-4 py-3 text-text-secondary font-medium">
                            {formatPrice(ipo.share_price)}
                          </td>
                          <td className="px-4 py-3 text-text-secondary">
                            {formatLot(ipo.lot_count)}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`badge ${statusStyle(ipo.status)}`}>
                              {statusLabel(ipo.status)}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-text-muted text-xs">
                            {dateStr ? formatDate(dateStr) : '—'}
                          </td>
                          <td className="px-4 py-3">
                            {pct != null ? (
                              <span className="font-bold text-sm" style={{ color: pctColor }}>
                                {pct > 0 ? '+' : ''}{pct.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%
                              </span>
                            ) : (
                              <span className="text-text-muted">—</span>
                            )}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            {!loading && filtered.length > 0 && (
              <div
                className="px-4 py-3 flex items-center justify-between border-t"
                style={{ borderColor: 'rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}
              >
                <span className="text-text-muted text-xs">{filtered.length} halka arz listeleniyor</span>
                <span className="text-text-muted text-xs">Tarihe göre sıralandı</span>
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
            <div className="glass-card p-8 flex flex-col items-center gap-3 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-8 h-8 opacity-30">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75" />
              </svg>
              <p className="text-text-muted text-sm">Bu filtre için halka arz bulunamadı.</p>
            </div>
          ) : (
            filtered.map((ipo) => {
              const pct = ipo.percent_change;
              const pctColor = pct == null ? '#78909C' : pct > 0 ? '#4CAF50' : pct < 0 ? '#FF5252' : '#78909C';
              const dateStr = ipo.first_trading_date ?? ipo.start_date;
              return (
                <div key={ipo.id} className="glass-card p-4 flex flex-col gap-3">
                  {/* Header row */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex flex-col gap-1 min-w-0">
                      <span className="font-semibold text-white text-sm leading-snug">{ipo.company_name}</span>
                      {ipo.ticker && (
                        <span
                          className="inline-block w-fit font-bold text-[11px] px-1.5 py-0.5 rounded"
                          style={{ background: 'rgba(41,121,255,0.12)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.2)' }}
                        >
                          {ipo.ticker}
                        </span>
                      )}
                    </div>
                    <span className={`badge shrink-0 ${statusStyle(ipo.status)}`}>
                      {statusLabel(ipo.status)}
                    </span>
                  </div>

                  {/* Data row */}
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-text-muted">Fiyat</span>
                      <span className="text-xs font-semibold text-text-secondary">{formatPrice(ipo.share_price)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-text-muted">Lot</span>
                      <span className="text-xs font-semibold text-text-secondary">{formatLot(ipo.lot_count)}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-text-muted">Performans</span>
                      <span className="text-xs font-bold" style={{ color: pctColor }}>
                        {pct != null ? `${pct > 0 ? '+' : ''}${pct.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%` : '—'}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  {dateStr && (
                    <div className="flex items-center gap-1.5 pt-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-3 h-3 text-text-muted">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 1v2M11 1v2M1.5 5.5h13M2 3h12a.5.5 0 01.5.5v10a.5.5 0 01-.5.5H2a.5.5 0 01-.5-.5V3.5A.5.5 0 012 3z" />
                      </svg>
                      <span className="text-text-muted text-[11px]">{formatDate(dateStr)}</span>
                    </div>
                  )}
                </div>
              );
            })
          )}

          {!loading && filtered.length > 0 && (
            <p className="text-center text-text-muted text-xs pt-1">{filtered.length} halka arz listeleniyor</p>
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
        <p className="text-text-secondary leading-relaxed">
          Halka arz verileri SPK ve KAP kaynaklarından alınmaktadır. Bu sayfa yalnızca bilgi amaçlıdır; yatırım tavsiyesi değildir.
        </p>
      </div>

      {/* ── AdBanner ─────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <AdBanner slot="4045086866" format="horizontal" />
      </div>

      {/* ── AppStoreBanner ───────────────────────────────────────────────── */}
      <div className="relative">
        {/* Custom heading overlay */}
        <div
          className="absolute top-0 left-0 right-0 z-10 pointer-events-none flex items-center gap-2 px-6 pt-6 sm:px-8 sm:pt-8"
        >
          <span
            className="badge"
            style={{ background: 'rgba(76,175,80,0.15)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' }}
          >
            <span className="pulse-dot" style={{ background: '#4CAF50' }} />
            Bildirimler
          </span>
        </div>
        <AppStoreBanner />
      </div>
    </div>
  );
}
