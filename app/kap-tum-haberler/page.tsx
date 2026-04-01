'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { api, formatDate, type KapDisclosure } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Types & Config ──────────────────────────────────────────────────────────

type SentimentFilter = 'all' | 'positive' | 'negative';
type TimeFilter = 720 | 168 | 24 | 1;

const TIME_FILTERS: { key: TimeFilter; label: string }[] = [
  { key: 720, label: '1 Ay' },
  { key: 168, label: '1 Hafta' },
  { key: 24, label: '1 Gün' },
  { key: 1, label: '1 Saat' },
];

const SENTIMENT_FILTERS: { key: SentimentFilter; label: string; icon: React.ReactNode; color: string }[] = [
  {
    key: 'all',
    label: 'Tümü',
    color: '#2979FF',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    ),
  },
  {
    key: 'positive',
    label: 'Pozitif',
    color: '#4CAF50',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
      </svg>
    ),
  },
  {
    key: 'negative',
    label: 'Negatif',
    color: '#FF5252',
    icon: (
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6L9 12.75l4.306-4.307a11.95 11.95 0 015.814 5.519l2.74 1.22" />
      </svg>
    ),
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function sentimentColor(s: string | null): string {
  if (s === 'Olumlu') return '#4CAF50';
  if (s === 'Olumsuz') return '#FF5252';
  return '#94A3B8';
}

function sentimentBg(s: string | null): string {
  if (s === 'Olumlu') return 'rgba(76,175,80,0.12)';
  if (s === 'Olumsuz') return 'rgba(255,82,82,0.12)';
  return 'rgba(148,163,184,0.12)';
}

function sentimentBorder(s: string | null): string {
  if (s === 'Olumlu') return 'rgba(76,175,80,0.25)';
  if (s === 'Olumsuz') return 'rgba(255,82,82,0.25)';
  return 'rgba(148,163,184,0.20)';
}

function sentimentLabel(s: string | null): string {
  if (s === 'Olumlu') return 'Olumlu';
  if (s === 'Olumsuz') return 'Olumsuz';
  return 'Nötr';
}

function scoreColor(score: number): string {
  if (score >= 7) return '#4CAF50';
  if (score >= 5) return '#FFD700';
  return '#FF5252';
}

function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' }) +
    ' ' + d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

function groupByDate(items: KapDisclosure[]): [string, KapDisclosure[]][] {
  const map = new Map<string, KapDisclosure[]>();
  for (const item of items) {
    const dateKey = (item.published_at ?? item.created_at ?? '').split('T')[0];
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

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="card p-4" style={{ opacity: 0.7 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <div className="skeleton" style={{ width: 56, height: 24, borderRadius: 6 }} />
          <div className="skeleton" style={{ width: 100, height: 24, borderRadius: 6 }} />
          <div className="skeleton" style={{ width: 60, height: 24, borderRadius: 6 }} />
        </div>
        <div className="skeleton" style={{ width: '85%', height: 16 }} />
        <div className="skeleton" style={{ width: '100%', height: 60, borderRadius: 8 }} />
      </div>
    </div>
  );
}

// ─── Disclosure Card ─────────────────────────────────────────────────────────

function DisclosureCard({ item }: { item: KapDisclosure }) {
  const color = sentimentColor(item.ai_sentiment);
  const timeStr = item.published_at ? formatTime(item.published_at) : (item.created_at ? formatTime(item.created_at) : '');

  return (
    <article
      className="card"
      style={{
        padding: '16px 20px',
        borderLeft: `3px solid ${color}`,
      }}
    >
      {/* Top row: ticker + time + sentiment + score */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {/* Ticker badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '2px 10px',
            borderRadius: 6,
            background: 'rgba(41,121,255,0.12)',
            border: '1px solid rgba(41,121,255,0.25)',
            color: '#2979FF',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.3px',
          }}
        >
          {item.company_code}
        </span>

        {/* Time */}
        {timeStr && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'var(--bg-surface)',
              color: 'var(--text-muted)',
              fontSize: 11,
              fontWeight: 500,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {timeStr}
          </span>
        )}

        {/* Sentiment badge */}
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 4,
            padding: '2px 8px',
            borderRadius: 6,
            background: sentimentBg(item.ai_sentiment),
            border: `1px solid ${sentimentBorder(item.ai_sentiment)}`,
            color,
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {item.ai_sentiment === 'Olumlu' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          )}
          {item.ai_sentiment === 'Olumsuz' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          )}
          {(!item.ai_sentiment || item.ai_sentiment === 'Notr') && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          )}
          {sentimentLabel(item.ai_sentiment)}
        </span>

        {/* AI Score */}
        {item.ai_impact_score != null && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              fontSize: 11,
              fontWeight: 700,
              color: scoreColor(item.ai_impact_score),
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {item.ai_impact_score.toFixed(1)}
          </span>
        )}

        {/* Category */}
        {item.category && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 8px',
              borderRadius: 6,
              background: 'var(--bg-surface)',
              color: 'var(--text-muted)',
              fontSize: 10,
              fontWeight: 500,
            }}
          >
            {item.category}
          </span>
        )}
      </div>

      {/* Title */}
      <h3
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.5,
          marginBottom: item.ai_summary ? 8 : 0,
        }}
      >
        {item.title}
      </h3>

      {/* AI Summary */}
      {item.ai_summary && (
        <div
          style={{
            marginTop: 4,
            padding: '10px 12px',
            borderRadius: 8,
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-primary)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 6,
              padding: '1px 6px',
              borderRadius: 4,
              background: 'rgba(41,121,255,0.10)',
              border: '1px solid rgba(41,121,255,0.20)',
            }}
          >
            <svg className="w-3 h-3" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
            </svg>
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2979FF', letterSpacing: '0.3px' }}>
              AI ANALİZ
            </span>
          </div>
          <p
            style={{
              fontSize: 13,
              color: 'var(--text-secondary)',
              lineHeight: 1.6,
              whiteSpace: 'pre-line',
            }}
          >
            {item.ai_summary}
          </p>
        </div>
      )}

      {/* KAP Link */}
      {item.kap_url && (
        <div style={{ marginTop: 10 }}>
          <a
            href={item.kap_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              color: '#2979FF',
              fontSize: 12,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            KAP Linki Aç
          </a>
        </div>
      )}
    </article>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function KapTumHaberlerPage() {
  const [items, setItems] = useState<KapDisclosure[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tickerFilter, setTickerFilter] = useState('');
  const [timeFilter, setTimeFilter] = useState<TimeFilter>(720);
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>('all');
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchData = useCallback((reset = true) => {
    if (reset) {
      setLoading(true);
      setItems([]);
    } else {
      setLoadingMore(true);
    }

    const params: Record<string, string | number> = {
      hours: timeFilter,
      limit: 50,
      offset: reset ? 0 : items.length,
    };

    if (tickerFilter.trim()) {
      params.ticker = tickerFilter.trim().toUpperCase();
    }
    if (sentimentFilter === 'positive') {
      params.min_score = 6.0;
    } else if (sentimentFilter === 'negative') {
      params.max_score = 5.0;
    }

    api.getKapDisclosures(params as Parameters<typeof api.getKapDisclosures>[0])
      .then((data) => {
        if (reset) {
          setItems(data);
        } else {
          setItems(prev => [...prev, ...data]);
        }
        setHasMore(data.length >= 50);
      })
      .catch(() => setError('Veriler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }, [timeFilter, tickerFilter, sentimentFilter, items.length]);

  // Initial load + filter changes
  useEffect(() => {
    fetchData(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeFilter, sentimentFilter]);

  const handleTickerSearch = () => {
    fetchData(true);
  };

  const groups = useMemo(() => groupByDate(items), [items]);

  let globalIndex = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>

      {/* ── Page Header ── */}
      <header
        className="card"
        style={{
          padding: '24px 28px',
          marginBottom: 16,
          background: 'linear-gradient(135deg, rgba(255,215,0,0.06), var(--bg-card))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,215,0,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />
        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 12,
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(255,215,0,0.12)',
                border: '1px solid rgba(255,215,0,0.25)',
              }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: '#FFD700' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span style={{ color: '#D4A800', fontSize: 12, fontWeight: 700, letterSpacing: '0.3px' }}>
                Tüm Bildirimler
              </span>
            </div>
            <h1 style={{ color: 'var(--text-primary)', fontSize: 'clamp(22px, 4vw, 30px)', fontWeight: 800, marginBottom: 6 }}>
              Tüm KAP Haberleri
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5 }}>
              Yapay zeka analizi ile tüm KAP bildirimleri
            </p>
          </div>
          {!loading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 12,
                background: 'rgba(255,215,0,0.08)',
                border: '1px solid rgba(255,215,0,0.18)',
                flexShrink: 0,
              }}
            >
              <svg className="w-4 h-4" style={{ color: '#D4A800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <span style={{ color: '#D4A800', fontSize: 14, fontWeight: 600 }}>
                {items.length} bildirim
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Ticker Search ── */}
      <div
        className="card"
        style={{ padding: '12px 16px', marginBottom: 8 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            placeholder="Hisse kodu (ör: THYAO)"
            value={tickerFilter}
            onChange={(e) => setTickerFilter(e.target.value.toUpperCase())}
            onKeyDown={(e) => e.key === 'Enter' && handleTickerSearch()}
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: 14,
              fontWeight: 500,
              fontFamily: 'monospace',
              letterSpacing: '0.5px',
            }}
          />
          {tickerFilter && (
            <button
              onClick={() => { setTickerFilter(''); setTimeout(() => fetchData(true), 0); }}
              style={{
                padding: '4px 8px',
                borderRadius: 6,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-muted)',
                fontSize: 11,
                cursor: 'pointer',
              }}
            >
              Temizle
            </button>
          )}
          <button
            onClick={handleTickerSearch}
            style={{
              padding: '6px 14px',
              borderRadius: 8,
              background: '#2979FF',
              border: 'none',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Ara
          </button>
        </div>
      </div>

      {/* ── Time Filters ── */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 4, padding: '0 2px' }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {TIME_FILTERS.map((f) => {
            const active = timeFilter === f.key;
            return (
              <button
                key={f.key}
                onClick={() => setTimeFilter(f.key)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                  border: active ? '1px solid rgba(41,121,255,0.4)' : '1px solid var(--border-primary)',
                  background: active ? 'rgba(41,121,255,0.12)' : 'var(--bg-surface)',
                  color: active ? '#2979FF' : 'var(--text-secondary)',
                  transition: 'all 0.15s ease',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Sentiment Filters ── */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16, padding: '0 2px' }}>
        {SENTIMENT_FILTERS.map((f) => {
          const active = sentimentFilter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setSentimentFilter(f.key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                padding: '5px 14px',
                borderRadius: 20,
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                border: active ? `1px solid ${f.color}60` : '1px solid var(--border-primary)',
                background: active ? `${f.color}15` : 'var(--bg-surface)',
                color: active ? f.color : 'var(--text-secondary)',
                transition: 'all 0.15s ease',
              }}
            >
              {f.icon}
              {f.label}
            </button>
          );
        })}
      </div>

      {/* ── Error ── */}
      {error && (
        <div
          className="card"
          style={{
            padding: 16,
            textAlign: 'center',
            color: 'var(--text-secondary)',
            fontSize: 14,
            borderColor: 'rgba(255,82,82,0.3)',
            background: 'rgba(255,82,82,0.06)',
          }}
        >
          {error}
        </div>
      )}

      {/* ── Loading skeleton ── */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      )}

      {/* ── News feed grouped by date ── */}
      {!loading && !error && groups.map(([dateKey, dayItems]) => (
        <section key={dateKey} style={{ marginBottom: 24 }}>
          {/* Day header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ height: 1, flex: 1, background: 'var(--border-primary)' }} />
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 14px',
                borderRadius: 20,
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-primary)',
              }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
              </svg>
              <span style={{ color: 'var(--text-primary)', fontSize: 12, fontWeight: 600 }}>
                {formatDayLabel(dateKey)}
              </span>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>
                ({dayItems.length})
              </span>
            </div>
            <div style={{ height: 1, flex: 1, background: 'var(--border-primary)' }} />
          </div>

          {/* Cards with inline ads */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {dayItems.map((item) => {
              const idx = globalIndex++;
              const showAd = idx > 0 && idx % 5 === 0;
              return (
                <div key={item.id}>
                  {showAd && (
                    <div style={{ margin: '8px 0' }}>
                      <AdBanner slot="3567518609" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
                    </div>
                  )}
                  <DisclosureCard item={item} />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── Empty state ── */}
      {!loading && !error && items.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(255,215,0,0.08)',
              border: '1px solid rgba(255,215,0,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <svg className="w-6 h-6" style={{ color: '#D4A800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            {tickerFilter
              ? `"${tickerFilter}" için bildirim bulunamadı.`
              : 'Seçilen filtreler için bildirim bulunamadı.'
            }
          </p>
        </div>
      )}

      {/* ── Load More ── */}
      {!loading && !error && hasMore && items.length > 0 && (
        <div style={{ textAlign: 'center', padding: '8px 0 16px' }}>
          <button
            onClick={() => fetchData(false)}
            disabled={loadingMore}
            style={{
              padding: '10px 24px',
              borderRadius: 12,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: 600,
              cursor: loadingMore ? 'wait' : 'pointer',
              opacity: loadingMore ? 0.6 : 1,
            }}
          >
            {loadingMore ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
          </button>
        </div>
      )}

      {/* ── Info Box ── */}
      <div
        className="card"
        style={{
          marginTop: 8,
          padding: 16,
          background: 'linear-gradient(135deg, rgba(41,121,255,0.06), var(--bg-card))',
          display: 'flex',
          alignItems: 'flex-start',
          gap: 12,
        }}
      >
        <div
          style={{
            flexShrink: 0,
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(41,121,255,0.12)',
            border: '1px solid rgba(41,121,255,0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <svg className="w-4 h-4" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            Tüm hisseler için bildirim almak ister misiniz?
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>
            Anlık KAP bildirimleri ve favori hisse takibi için uygulamayı indirin.
          </p>
          <a
            href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 8,
              color: '#2979FF',
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            Uygulamayı İndir
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
        </div>
      </div>

      {/* ── AppStore Banner ── */}
      <div style={{ marginTop: 24 }}>
        <AppStoreBanner />
      </div>
    </div>
  );
}
