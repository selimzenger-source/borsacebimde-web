'use client';

import { useEffect, useState } from 'react';
import { api, cleanText, formatDate, formatTime, NewsFeedItem } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const API_BASE = 'https://sz-bist-finans-api.onrender.com';

function getImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return API_BASE + url;
}

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
    <div className="card overflow-hidden" style={{ opacity: 0.7 }}>
      <div className="skeleton" style={{ width: '100%', height: 180 }} />
      <div style={{ padding: 16, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="flex items-center gap-2">
          <div className="skeleton" style={{ height: 20, width: 56, borderRadius: 10 }} />
          <div className="skeleton" style={{ height: 16, width: 40, borderRadius: 8 }} />
        </div>
        <div className="skeleton" style={{ height: 14, width: '100%' }} />
        <div className="skeleton" style={{ height: 14, width: '85%' }} />
        <div className="skeleton" style={{ height: 14, width: '65%' }} />
      </div>
    </div>
  );
}

// ─── News Card ────────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: NewsFeedItem }) {
  const timeStr = item.sent_at ? formatTime(item.sent_at) : (item.created_at ? formatTime(item.created_at) : '');
  const cleaned = cleanText(item.text);
  const imageUrl = getImageUrl(item.image_url);
  const [imgError, setImgError] = useState(false);

  // Extract title (first paragraph) and body (rest with paragraph breaks preserved)
  const paragraphs = cleaned.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  let title = paragraphs[0] || '';
  let body = paragraphs.slice(1).join('\n\n').trim();

  // If title is too long, split at first period
  if (title.length > 120 && !body) {
    const dotIdx = title.indexOf('. ', 30);
    if (dotIdx > 0 && dotIdx < 140) {
      body = title.slice(dotIdx + 2).trim();
      title = title.slice(0, dotIdx + 1);
    }
  }

  // SPK Bülten analizi görseli kesik/yarım gözükebiliyor — uygulama gibi sadece metin
  const isSpkBulletin = item.source === 'tweet_spk_bulletin_analysis';

  return (
    <article className="card overflow-hidden transition-all">
      {/* Cover image */}
      {imageUrl && !imgError && !isSpkBulletin && (
        <div
          style={{
            width: '100%',
            height: 200,
            background: 'var(--bg-surface)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            src={imageUrl}
            alt=""
            loading="lazy"
            onError={() => setImgError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      <div style={{ padding: '14px 16px' }}>
        {/* Badge row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className="badge"
            style={{
              background: 'rgba(38,198,218,0.1)',
              color: '#26C6DA',
              border: '1px solid rgba(38,198,218,0.25)',
            }}
          >
            Haber
          </span>
          {timeStr && (
            <span
              className="badge"
              style={{
                background: 'var(--bg-surface)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-primary)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {timeStr}
            </span>
          )}
        </div>

        {/* Title */}
        {title && (
          <h3
            style={{
              fontSize: 15,
              fontWeight: 700,
              color: 'var(--text-primary)',
              lineHeight: 1.5,
              marginBottom: body ? 8 : 0,
            }}
          >
            {title}
          </h3>
        )}

        {/* Body text */}
        {body && (
          <p
            className="text-sm leading-relaxed"
            style={{
              color: 'var(--text-secondary)',
              whiteSpace: 'pre-line',
            }}
          >
            {body}
          </p>
        )}
      </div>
    </article>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;

export default function PiyasaHaberleriContent() {
  const [allItems, setAllItems] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  useEffect(() => {
    const KURUM_RE = /kurum önerisi|hedef.*TL.*\(AL\)|hedef.*TL.*\(TUT\)|hedef.*TL.*\(SAT\)|Yeni Kurum Önerisi/i;
    api.getNewsFeed(30, 200, 'news_scanner')
      .then((items) => setAllItems(items.filter((it: any) => !KURUM_RE.test((it.text || '') + (it.title || '')))))
      .catch(() => setError('Haberler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => setLoading(false));
  }, []);

  const visibleItems = allItems.slice(0, visibleCount);
  const hasMore = visibleCount < allItems.length;
  const groups = groupByDate(visibleItems);

  let globalIndex = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* ── Sayfa Başlığı ── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8 mb-6"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(38,198,218,0.2)',
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(38,198,218,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
              style={{ background: 'rgba(38,198,218,0.12)', border: '1px solid rgba(38,198,218,0.25)' }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: '#26C6DA' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <span className="text-xs font-bold" style={{ color: '#26C6DA', letterSpacing: '0.3px' }}>Gundem</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Piyasa Haberleri
            </h1>
            <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Yapay zeka destekli guncel finans haberleri
            </p>
          </div>

          {!loading && (
            <div
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: 'rgba(38,198,218,0.1)', border: '1px solid rgba(38,198,218,0.2)' }}
            >
              <svg className="w-4 h-4" style={{ color: '#26C6DA' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#26C6DA' }}>
                {allItems.length} haber
              </span>
            </div>
          )}
        </div>
      </header>

      <InlineAppBanner
        title="Piyasa Haberlerini Aninda Takip Edin!"
        message="Guncel finans haberlerini ve piyasa analizlerini bildirim olarak alin."
      />

      {/* ── Hata ── */}
      {error && (
        <div
          className="card p-4 text-center text-sm mb-4"
          style={{
            color: 'var(--text-secondary)',
            borderColor: 'rgba(255,82,82,0.3)',
            background: 'rgba(255,82,82,0.06)',
          }}
        >
          {error}
        </div>
      )}

      {/* ── Yukleniyor ── */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* ── Tarihe gore gruplu haber akisi ── */}
      {!loading && !error && groups.map(([dateKey, dayItems]) => (
        <section key={dateKey} style={{ marginBottom: 24 }}>
          {/* Gun ayirici */}
          <div className="flex items-center gap-3 mb-4">
            <div style={{ height: 1, flex: 1, background: 'var(--border-primary)' }} />
            <div
              className="flex items-center gap-2 px-3 py-1 rounded-full"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-primary)',
              }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                {formatDayLabel(dateKey)}
              </span>
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                ({dayItems.length})
              </span>
            </div>
            <div style={{ height: 1, flex: 1, background: 'var(--border-primary)' }} />
          </div>

          {/* Kartlar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dayItems.map((item) => {
              const idx = globalIndex++;
              const showAd = idx > 0 && idx % 5 === 0;
              return (
                <div key={item.id}>
                  {showAd && (
                    <div style={{ margin: '12px 0' }}>
                      <AdBanner slot="3567518609" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
                    </div>
                  )}
                  <NewsCard item={item} />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── Bos durum ── */}
      {!loading && !error && allItems.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(38,198,218,0.1)',
              border: '1px solid rgba(38,198,218,0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#26C6DA' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
            </svg>
          </div>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Su an haber bulunamadi.
          </p>
        </div>
      )}

      {/* ── Sayfalama ── */}
      {!loading && !error && hasMore && (
        <div className="flex justify-center" style={{ marginTop: 24 }}>
          <button
            onClick={() => setVisibleCount((prev) => prev + PAGE_SIZE)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold transition-all active:scale-95"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
            }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
            Daha Fazla Yukle
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              ({allItems.length - visibleCount} haber daha)
            </span>
          </button>
        </div>
      )}

      {/* ── Uygulama Banner ── */}
      <div style={{ marginTop: 40 }}>
        <AppStoreBanner />
      </div>
    </div>
  );
}
