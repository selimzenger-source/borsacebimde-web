'use client';

import { useEffect, useRef, useState } from 'react';
import { api, cleanText, formatDate, formatTime, NewsFeedItem } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Source metadata ───────────────────────────────────────────────────────────

type SourceKey =
  | 'tweet_daily_tracking'
  | 'tweet_market_snapshot'
  | 'tweet_kap_news'
  | 'bot_proxy'
  | 'morning_market_report'
  | 'evening_market_report'
  | 'market_close_tavan'
  | 'market_close_taban'
  | 'kap_news'
  | 'bist30'
  | '__all__';

interface SourceMeta {
  label: string;
  color: string;       // Tailwind text color class
  bgClass: string;     // Tailwind bg color class (badge background)
  borderClass: string; // Tailwind border class
}

const SOURCE_META: Record<string, SourceMeta> = {
  tweet_daily_tracking:  { label: 'Günlük Takip',   color: 'text-accent-green', bgClass: 'bg-accent-green/15', borderClass: 'border-accent-green/30' },
  tweet_market_snapshot: { label: 'Piyasa Özeti',   color: 'text-accent-cyan',  bgClass: 'bg-accent-cyan/15',  borderClass: 'border-accent-cyan/30'  },
  tweet_kap_news:        { label: 'KAP Bildirim',   color: 'text-accent-gold',  bgClass: 'bg-accent-gold/15',  borderClass: 'border-accent-gold/30'  },
  kap_news:              { label: 'KAP Bildirim',   color: 'text-accent-gold',  bgClass: 'bg-accent-gold/15',  borderClass: 'border-accent-gold/30'  },
  bist30:                { label: 'BIST 30',         color: 'text-accent-gold',  bgClass: 'bg-accent-gold/15',  borderClass: 'border-accent-gold/30'  },
  bot_proxy:             { label: 'Haber',           color: 'text-accent-cyan',  bgClass: 'bg-accent-cyan/15',  borderClass: 'border-accent-cyan/30'  },
  morning_market_report: { label: 'Sabah Raporu',   color: 'text-accent-blue',  bgClass: 'bg-accent-blue/15',  borderClass: 'border-accent-blue/30'  },
  evening_market_report: { label: 'Akşam Raporu',   color: 'text-accent-blue',  bgClass: 'bg-accent-blue/15',  borderClass: 'border-accent-blue/30'  },
  market_close_tavan:    { label: 'Tavan Kapanış',  color: 'text-accent-green', bgClass: 'bg-accent-green/15', borderClass: 'border-accent-green/30' },
  market_close_taban:    { label: 'Taban Kapanış',  color: 'text-accent-gold',  bgClass: 'bg-accent-gold/15',  borderClass: 'border-accent-gold/30'  },
};

const DEFAULT_META: SourceMeta = {
  label: 'Diğer',
  color: 'text-text-muted',
  bgClass: 'bg-white/10',
  borderClass: 'border-white/15',
};

function getSourceMeta(source: string): SourceMeta {
  if (SOURCE_META[source]) return SOURCE_META[source];
  // Partial match
  for (const [key, meta] of Object.entries(SOURCE_META)) {
    if (source.includes(key)) return meta;
  }
  return DEFAULT_META;
}

// ─── Filter helpers ────────────────────────────────────────────────────────────

const FILTER_ORDER: SourceKey[] = [
  '__all__',
  'tweet_kap_news',
  'kap_news',
  'bist30',
  'tweet_daily_tracking',
  'tweet_market_snapshot',
  'bot_proxy',
  'morning_market_report',
  'evening_market_report',
  'market_close_tavan',
  'market_close_taban',
];

const FILTER_LABELS: Record<SourceKey, string> = {
  __all__:               'Tümü',
  tweet_kap_news:        'KAP Bildirim',
  kap_news:              'KAP Bildirim',
  bist30:                'BIST 30',
  tweet_daily_tracking:  'Günlük Takip',
  tweet_market_snapshot: 'Piyasa Özeti',
  bot_proxy:             'Haber',
  morning_market_report: 'Sabah Raporu',
  evening_market_report: 'Akşam Raporu',
  market_close_tavan:    'Tavan Kapanış',
  market_close_taban:    'Taban Kapanış',
};

function itemMatchesFilter(item: NewsFeedItem, filter: SourceKey): boolean {
  if (filter === '__all__') return true;
  return item.source === filter || item.source.includes(filter);
}

// ─── Grouping ─────────────────────────────────────────────────────────────────

function groupByDate(items: NewsFeedItem[]): [string, NewsFeedItem[]][] {
  const map = new Map<string, NewsFeedItem[]>();
  for (const item of items) {
    const dateKey = (item.sent_at ?? item.created_at ?? '').split('T')[0];
    if (!dateKey) continue;
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(item);
  }
  return Array.from(map.entries()).sort((a, b) => b[0].localeCompare(a[0]));
}

function formatDayLabel(dateKey: string): string {
  try {
    return new Date(dateKey).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  } catch {
    return dateKey;
  }
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="rounded-xl border border-white/8 bg-white/3 p-4 animate-pulse">
      <div className="flex items-start gap-3">
        <div className="h-6 w-20 rounded-full bg-white/10 shrink-0 mt-0.5" />
        <div className="h-5 w-14 rounded-full bg-white/10 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-4/5" />
          <div className="h-3 bg-white/10 rounded w-3/5" />
        </div>
      </div>
    </div>
  );
}

function SkeletonGroup() {
  return (
    <div className="mb-8">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px flex-1 bg-white/8" />
        <div className="h-6 w-52 bg-white/10 rounded-full animate-pulse" />
        <div className="h-px flex-1 bg-white/8" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

// ─── News Card ─────────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsFeedItem }) {
  const timeStr = item.sent_at ? formatTime(item.sent_at) : (item.created_at ? formatTime(item.created_at) : '');
  const cleaned = cleanText(item.text);
  const meta = getSourceMeta(item.source);

  return (
    <article className="group rounded-xl border border-white/8 bg-white/3 p-4 transition-all hover:border-white/15 hover:bg-white/5">
      <div className="flex flex-wrap items-start gap-2 mb-2">
        {/* Source badge */}
        <span
          className={[
            'shrink-0 px-2 py-0.5 rounded-full border text-xs font-semibold',
            meta.color,
            meta.bgClass,
            meta.borderClass,
          ].join(' ')}
        >
          {meta.label}
        </span>

        {/* Time badge */}
        {timeStr && (
          <span className="shrink-0 px-2 py-0.5 rounded-full bg-white/8 border border-white/10 text-text-muted text-xs tabular-nums">
            {timeStr}
          </span>
        )}
      </div>

      {/* News text */}
      <p className="text-text-secondary text-sm leading-relaxed">
        {cleaned}
      </p>
    </article>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

export default function KapHaberlerPage() {
  const [allItems, setAllItems] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<SourceKey>('__all__');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const filterBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    api.getNewsFeed(30, 200)
      .then(setAllItems)
      .catch(() => setError('Haberler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => setLoading(false));
  }, []);

  // Reset visible count when filter changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [activeFilter]);

  // Filtered items
  const filteredItems = allItems.filter((it) => itemMatchesFilter(it, activeFilter));

  // Count per source key (for chips)
  const sourceCounts = new Map<SourceKey, number>();
  sourceCounts.set('__all__', allItems.length);
  for (const item of allItems) {
    const key = (item.source as SourceKey);
    sourceCounts.set(key, (sourceCounts.get(key) ?? 0) + 1);
  }

  // Available filter keys (only those with items)
  const availableFilters = FILTER_ORDER.filter((key) => {
    if (key === '__all__') return true;
    return allItems.some((it) => itemMatchesFilter(it, key));
  });

  // Visible items for pagination
  const visibleItems = filteredItems.slice(0, visibleCount);
  const hasMore = visibleCount < filteredItems.length;

  // Group visible items
  const groups = groupByDate(visibleItems);

  // Track global index for ad placement
  let globalIndex = 0;

  return (
    <div className="space-y-2">
      {/* ── Page Header ── */}
      <header className="mb-6 rounded-2xl border border-accent-cyan/20 bg-gradient-to-br from-bg-secondary to-bg-primary p-6 sm:p-8 relative overflow-hidden">
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(38,198,218,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-accent-cyan/15 border border-accent-cyan/25">
              <svg className="w-3.5 h-3.5 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <span className="text-accent-cyan text-xs font-bold tracking-wide">Piyasa</span>
            </div>
            <h1 className="text-text-primary text-2xl sm:text-3xl font-bold mb-2">
              Piyasa Haberleri
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Son 30 günün tüm haberleri
            </p>
          </div>

          {!loading && (
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-cyan/10 border border-accent-cyan/20">
              <svg className="w-4 h-4 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
              <span className="text-accent-cyan text-sm font-semibold">
                {allItems.length} haber
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Error ── */}
      {error && (
        <div className="rounded-xl border border-accent-red/30 bg-accent-red/10 p-4 text-center text-text-secondary text-sm">
          {error}
        </div>
      )}

      {/* ── Source Filter Chips ── */}
      {!loading && !error && (
        <div className="mb-6">
          <div
            ref={filterBarRef}
            className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: 'none' }}
          >
            {availableFilters.map((key) => {
              const isActive = activeFilter === key;
              const label = FILTER_LABELS[key] ?? key;
              const count = key === '__all__'
                ? allItems.length
                : allItems.filter((it) => itemMatchesFilter(it, key)).length;

              return (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={[
                    'shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-semibold transition-all whitespace-nowrap',
                    isActive
                      ? 'bg-accent-cyan/20 border-accent-cyan/50 text-accent-cyan'
                      : 'bg-white/5 border-white/10 text-text-secondary hover:bg-white/8 hover:border-white/20 hover:text-text-primary',
                  ].join(' ')}
                >
                  {label}
                  <span
                    className={[
                      'px-1.5 py-0.5 rounded-full text-[10px] font-bold',
                      isActive ? 'bg-accent-cyan/25 text-accent-cyan' : 'bg-white/10 text-text-muted',
                    ].join(' ')}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonGroup key={i} />)}
        </div>
      )}

      {/* ── News feed grouped by date ── */}
      {!loading && !error && groups.map(([dateKey, dayItems]) => (
        <section key={dateKey} className="mb-8">
          {/* Day separator */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 bg-white/8" />
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-white/10">
              <svg className="w-3.5 h-3.5 text-text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span className="text-text-secondary text-xs font-semibold">
                {formatDayLabel(dateKey)}
              </span>
              <span className="text-text-muted text-xs">({dayItems.length})</span>
            </div>
            <div className="h-px flex-1 bg-white/8" />
          </div>

          {/* Cards */}
          <div className="space-y-3">
            {dayItems.map((item) => {
              const idx = globalIndex++;
              const showAd = idx > 0 && idx % 15 === 0;
              return (
                <div key={item.id}>
                  {showAd && (
                    <div className="my-4">
                      <AdBanner slot="4045086866" format="horizontal" />
                    </div>
                  )}
                  <NewsCard item={item} />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── Empty state ── */}
      {!loading && !error && filteredItems.length === 0 && (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-accent-cyan/10 border border-accent-cyan/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-accent-cyan" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <p className="text-text-muted text-sm">Bu kategoride haber bulunamadı.</p>
        </div>
      )}

      {/* ── Pagination ── */}
      {!loading && !error && hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-bg-secondary border border-white/10 text-text-secondary text-sm font-semibold transition-all hover:bg-white/8 hover:border-white/20 hover:text-text-primary active:scale-95"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            Daha Fazla Yükle
            <span className="text-text-muted text-xs">
              ({filteredItems.length - visibleCount} haber daha)
            </span>
          </button>
        </div>
      )}

      {/* ── App Store Banner ── */}
      <div className="mt-10">
        <AppStoreBanner />
      </div>
    </div>
  );
}
