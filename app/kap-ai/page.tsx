'use client';

import { useEffect, useState } from 'react';
import { api, cleanText, formatDate, formatTime, NewsFeedItem } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function isKapAiPositive(source: string): boolean {
  return source.includes('kap_news') || source.includes('bist30');
}

function groupByDate(items: NewsFeedItem[]): [string, NewsFeedItem[]][] {
  const map = new Map<string, NewsFeedItem[]>();
  for (const item of items) {
    const dateKey = (item.sent_at ?? item.created_at ?? '').split('T')[0];
    if (!dateKey) continue;
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(item);
  }
  // Sort descending by date
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
        <div className="h-6 w-14 rounded-full bg-white/10 shrink-0 mt-0.5" />
        <div className="flex-1 space-y-2">
          <div className="h-3 bg-white/10 rounded w-full" />
          <div className="h-3 bg-white/10 rounded w-5/6" />
          <div className="h-3 bg-white/10 rounded w-3/4" />
        </div>
      </div>
    </div>
  );
}

function SkeletonGroup() {
  return (
    <div className="mb-8">
      <div className="h-4 w-48 bg-white/10 rounded mb-4 animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

// ─── News Card ────────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsFeedItem }) {
  const timeStr = item.sent_at ? formatTime(item.sent_at) : (item.created_at ? formatTime(item.created_at) : '');
  const cleaned = cleanText(item.text);

  return (
    <article className="group relative rounded-xl border border-accent-gold/20 bg-white/3 p-4 transition-all hover:border-accent-gold/40 hover:bg-white/5">
      {/* Gold left accent bar */}
      <div className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-accent-gold/60" />

      <div className="flex items-start gap-3 pl-3">
        {/* Time badge */}
        {timeStr && (
          <span className="shrink-0 mt-0.5 px-2 py-0.5 rounded-full bg-accent-gold/15 border border-accent-gold/25 text-accent-gold text-xs font-semibold tabular-nums">
            {timeStr}
          </span>
        )}

        {/* Text */}
        <p className="flex-1 text-text-secondary text-sm leading-relaxed">
          {cleaned}
        </p>
      </div>

      {/* Source label */}
      <div className="mt-2 pl-3 flex items-center justify-end">
        <span className="text-[11px] text-text-muted">
          {item.source === 'kap_news' ? 'KAP Bildirim' : 'BIST 30'}
        </span>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KapAiPage() {
  const [groups, setGroups] = useState<[string, NewsFeedItem[]][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getNewsFeed(30, 200)
      .then((items) => {
        const filtered = items.filter((it) => isKapAiPositive(it.source));
        setGroups(groupByDate(filtered));
      })
      .catch(() => setError('Haberler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => setLoading(false));
  }, []);

  // Flatten items for ad insertion
  const flatItems: (NewsFeedItem | { __ad: true; key: string })[] = [];
  for (const [, dayItems] of groups) {
    for (const item of dayItems) {
      flatItems.push(item);
    }
  }

  // Build ad slot indices: every 10 real items
  const adSlots = new Set<number>();
  for (let i = 9; i < flatItems.length; i += 10) {
    adSlots.add(i);
  }

  return (
    <div className="space-y-2">
      {/* ── Page Header ── */}
      <header className="mb-8 rounded-2xl border border-accent-gold/20 bg-gradient-to-br from-bg-secondary to-bg-primary p-6 sm:p-8 relative overflow-hidden">
        {/* Decorative glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,215,0,0.12) 0%, transparent 70%)' }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            {/* AI badge */}
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-accent-gold/15 border border-accent-gold/30">
              {/* Spark icon */}
              <svg className="w-3.5 h-3.5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
              <span className="text-accent-gold text-xs font-bold tracking-wide">AI</span>
            </div>

            <h1 className="text-text-primary text-2xl sm:text-3xl font-bold mb-2">
              KAP AI Pozitif Haberler
            </h1>
            <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
              Yapay zeka ile filtrelenmiş pozitif KAP bildirimleri
            </p>
          </div>

          {/* Stats chip */}
          {!loading && (
            <div className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-gold/10 border border-accent-gold/20">
              <svg className="w-4 h-4 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span className="text-accent-gold text-sm font-semibold">
                {flatItems.length} haber
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Free Tier Info Card ── */}
      <div className="mb-6 rounded-xl border border-accent-gold/25 bg-gradient-to-r from-accent-gold/8 to-transparent p-4 flex items-start gap-3">
        {/* Info icon */}
        <div className="shrink-0 w-8 h-8 rounded-full bg-accent-gold/15 border border-accent-gold/30 flex items-center justify-center mt-0.5">
          <svg className="w-4 h-4 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-text-primary text-sm font-semibold mb-1">
            BIST 50 hisseleri ücretsiz!
          </p>
          <p className="text-text-secondary text-sm leading-relaxed">
            Tüm BIST hisselerinin AI haberlerini almak ve anlık bildirimler için uygulamayı indirin.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-2 text-accent-gold text-sm font-semibold hover:underline"
          >
            Uygulamayı İndir
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── Error ── */}
      {error && (
        <div className="rounded-xl border border-accent-red/30 bg-accent-red/10 p-4 text-center text-text-secondary text-sm">
          {error}
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div className="space-y-8">
          {Array.from({ length: 3 }).map((_, i) => <SkeletonGroup key={i} />)}
        </div>
      )}

      {/* ── News feed grouped by date ── */}
      {!loading && !error && (() => {
        let globalIndex = 0;
        return groups.map(([dateKey, dayItems]) => (
          <section key={dateKey} className="mb-8">
            {/* Day header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-accent-gold/15" />
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-bg-secondary border border-accent-gold/20">
                <svg className="w-3.5 h-3.5 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
                <span className="text-accent-gold text-xs font-semibold">
                  {formatDayLabel(dateKey)}
                </span>
                <span className="text-text-muted text-xs">
                  ({dayItems.length})
                </span>
              </div>
              <div className="h-px flex-1 bg-accent-gold/15" />
            </div>

            {/* Cards with inline ads */}
            <div className="space-y-3">
              {dayItems.map((item) => {
                const idx = globalIndex++;
                const showAd = adSlots.has(idx);
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
        ));
      })()}

      {/* ── Empty state ── */}
      {!loading && !error && groups.length === 0 && (
        <div className="text-center py-16">
          <div className="w-12 h-12 rounded-full bg-accent-gold/10 border border-accent-gold/20 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-accent-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p className="text-text-muted text-sm">Son 30 günde AI pozitif haber bulunamadı.</p>
        </div>
      )}

      {/* ── App Store Banner ── */}
      <div className="mt-10">
        <AppStoreBanner />
      </div>
    </div>
  );
}
