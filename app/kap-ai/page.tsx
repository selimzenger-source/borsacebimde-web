'use client';

import { useEffect, useState } from 'react';
import { api, KapDisclosure, formatTime } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Helpers ──────────────────────────────────────────────────────────────────

interface ParsedDisclosure {
  item: KapDisclosure;
  sentiment: 'olumlu' | 'notr' | 'olumsuz';
}

function parseDisclosure(item: KapDisclosure): ParsedDisclosure {
  let sentiment: 'olumlu' | 'notr' | 'olumsuz' = 'notr';
  if (item.ai_sentiment) {
    const s = item.ai_sentiment.toLowerCase();
    if (s === 'olumlu' || s === 'pozitif' || s === 'positive') sentiment = 'olumlu';
    else if (s === 'olumsuz' || s === 'negatif' || s === 'negative') sentiment = 'olumsuz';
  }
  // Infer from score if sentiment is still notr
  if (sentiment === 'notr' && item.ai_impact_score !== null) {
    if (item.ai_impact_score >= 6) sentiment = 'olumlu';
    else if (item.ai_impact_score <= 4) sentiment = 'olumsuz';
  }
  return { item, sentiment };
}

function groupByDate(items: ParsedDisclosure[]): [string, ParsedDisclosure[]][] {
  const map = new Map<string, ParsedDisclosure[]>();
  for (const parsed of items) {
    const dateKey = (parsed.item.published_at ?? parsed.item.created_at ?? '').split('T')[0];
    if (!dateKey) continue;
    if (!map.has(dateKey)) map.set(dateKey, []);
    map.get(dateKey)!.push(parsed);
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

// ─── Sentiment helpers ───────────────────────────────────────────────────────

function sentimentLabel(s: 'olumlu' | 'notr' | 'olumsuz'): string {
  if (s === 'olumlu') return 'Olumlu';
  if (s === 'olumsuz') return 'Olumsuz';
  return 'Nötr';
}

function sentimentColor(s: 'olumlu' | 'notr' | 'olumsuz'): string {
  if (s === 'olumlu') return '#4CAF50';
  if (s === 'olumsuz') return '#FF5252';
  return 'var(--text-muted)';
}

function sentimentBg(s: 'olumlu' | 'notr' | 'olumsuz'): string {
  if (s === 'olumlu') return 'rgba(76,175,80,0.12)';
  if (s === 'olumsuz') return 'rgba(255,82,82,0.12)';
  return 'rgba(148,163,184,0.12)';
}

function sentimentBorder(s: 'olumlu' | 'notr' | 'olumsuz'): string {
  if (s === 'olumlu') return 'rgba(76,175,80,0.25)';
  if (s === 'olumsuz') return 'rgba(255,82,82,0.25)';
  return 'rgba(148,163,184,0.20)';
}

function scoreColor(score: number): string {
  if (score >= 7) return '#4CAF50';
  if (score >= 5) return '#FFD700';
  return '#FF5252';
}

// ─── SVG Icons ───────────────────────────────────────────────────────────────

function SparkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
    </svg>
  );
}

function CalendarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
    </svg>
  );
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );
}

function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
    </svg>
  );
}

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
    </svg>
  );
}

function ChartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
    </svg>
  );
}

function KapLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.86-2.005a4.5 4.5 0 00-1.242-7.244l4.5-4.5a4.5 4.5 0 016.364 6.364l-1.757 1.757" />
    </svg>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="card p-4" style={{ opacity: 0.7 }}>
      <div className="flex items-start gap-3">
        <div className="skeleton" style={{ width: 56, height: 24, borderRadius: 6 }} />
        <div className="flex-1" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div className="skeleton" style={{ width: '80%', height: 14 }} />
          <div className="skeleton" style={{ width: '60%', height: 12 }} />
          <div style={{ display: 'flex', gap: 8 }}>
            <div className="skeleton" style={{ width: 60, height: 20, borderRadius: 10 }} />
            <div className="skeleton" style={{ width: 50, height: 20, borderRadius: 10 }} />
          </div>
          <div className="skeleton" style={{ width: '100%', height: 10 }} />
          <div className="skeleton" style={{ width: '90%', height: 10 }} />
        </div>
      </div>
    </div>
  );
}

function SkeletonGroup() {
  return (
    <div style={{ marginBottom: 32 }}>
      <div className="skeleton" style={{ width: 200, height: 16, marginBottom: 16, borderRadius: 8 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    </div>
  );
}

// ─── Disclosure Card ─────────────────────────────────────────────────────────

function DisclosureCard({ parsed }: { parsed: ParsedDisclosure }) {
  const { item, sentiment } = parsed;
  const timeStr = item.published_at ? formatTime(item.published_at) : (item.created_at ? formatTime(item.created_at) : '');

  return (
    <article
      className="card"
      style={{
        padding: '16px 20px',
        borderLeft: `3px solid ${sentimentColor(sentiment)}`,
        transition: 'box-shadow 0.2s ease, border-color 0.2s ease',
      }}
    >
      {/* Top row: ticker + time + sentiment + score + KAP link */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        {/* Ticker badge */}
        {item.company_code && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '2px 10px',
              borderRadius: 6,
              background: 'rgba(41,121,255,0.12)',
              border: '1px solid rgba(41,121,255,0.25)',
              color: '#2979FF',
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.5px',
            }}
          >
            {item.company_code}
          </span>
        )}

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
            <ClockIcon className="w-3 h-3" />
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
            background: sentimentBg(sentiment),
            border: `1px solid ${sentimentBorder(sentiment)}`,
            color: sentimentColor(sentiment),
            fontSize: 11,
            fontWeight: 600,
          }}
        >
          {sentiment === 'olumlu' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          )}
          {sentiment === 'olumsuz' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          )}
          {sentiment === 'notr' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
            </svg>
          )}
          {sentimentLabel(sentiment)}
        </span>

        {/* AI Score */}
        {item.ai_impact_score !== null && item.ai_impact_score !== undefined && (
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
            <ChartIcon className="w-3 h-3" />
            {item.ai_impact_score.toFixed(1)}/10
          </span>
        )}

        {/* KAP Link */}
        {item.kap_url && (
          <a
            href={item.kap_url}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              padding: '2px 8px',
              borderRadius: 6,
              background: 'rgba(255,215,0,0.10)',
              border: '1px solid rgba(255,215,0,0.25)',
              color: '#FFD700',
              fontSize: 11,
              fontWeight: 600,
              textDecoration: 'none',
              marginLeft: 'auto',
              transition: 'background 0.15s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,215,0,0.20)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,215,0,0.10)'; }}
          >
            KAP
            <ExternalLinkIcon className="w-3 h-3" />
          </a>
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

      {/* AI Analysis section */}
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
            <SparkIcon className="w-3 h-3" />
            <span style={{ fontSize: 10, fontWeight: 700, color: '#2979FF', letterSpacing: '0.3px' }}>
              AI Analiz
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

      {/* Bottom: source + category */}
      <div style={{ marginTop: 8, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {item.category && (
          <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500 }}>
            {item.category}
          </span>
        )}
        <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 500, marginLeft: 'auto' }}>
          KAP Bildirim
        </span>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function KapAiPage() {
  const [groups, setGroups] = useState<[string, ParsedDisclosure[]][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    api.getKapDisclosures({ hours: 720, limit: 200 })
      .then((items) => {
        // Only show items that have AI analysis
        const withAi = items.filter((it) => it.ai_summary || it.ai_impact_score !== null);
        const parsed = withAi.map(parseDisclosure);
        setTotalCount(parsed.length);
        setGroups(groupByDate(parsed));
      })
      .catch(() => setError('Haberler yüklenirken bir sorun oluştu. Lütfen sayfayı yenileyin.'))
      .finally(() => setLoading(false));
  }, []);

  // Track global index for ad placement
  let globalIndex = 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* ── Page Header ── */}
      <header
        className="card"
        style={{
          padding: '24px 28px',
          marginBottom: 24,
          background: 'linear-gradient(135deg, rgba(41,121,255,0.06), var(--bg-card))',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative glow */}
        <div
          style={{
            position: 'absolute',
            top: -60,
            right: -60,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(41,121,255,0.10) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* AI badge */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 12,
                padding: '4px 12px',
                borderRadius: 20,
                background: 'rgba(41,121,255,0.12)',
                border: '1px solid rgba(41,121,255,0.25)',
              }}
            >
              <SparkIcon className="w-3.5 h-3.5" />
              <span style={{ color: '#2979FF', fontSize: 12, fontWeight: 700, letterSpacing: '0.3px' }}>
                AI Analiz
              </span>
            </div>

            <h1
              style={{
                color: 'var(--text-primary)',
                fontSize: 'clamp(22px, 4vw, 30px)',
                fontWeight: 800,
                marginBottom: 6,
              }}
            >
              KAP AI Haberler
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.5 }}>
              Yapay zeka ile analiz edilmiş KAP bildirimleri
            </p>
          </div>

          {/* Stats chip */}
          {!loading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '8px 16px',
                borderRadius: 12,
                background: 'rgba(41,121,255,0.08)',
                border: '1px solid rgba(41,121,255,0.18)',
                flexShrink: 0,
              }}
            >
              <DocumentIcon className="w-4 h-4" />
              <span style={{ color: '#2979FF', fontSize: 14, fontWeight: 600 }}>
                {totalCount} haber
              </span>
            </div>
          )}
        </div>
      </header>

      {/* ── Free Tier Info Card ── */}
      <div
        className="card"
        style={{
          marginBottom: 20,
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
          <InfoIcon className="w-4 h-4" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ color: 'var(--text-primary)', fontSize: 14, fontWeight: 600, marginBottom: 4 }}>
            Anlık bildirimler ve detaylı analiz
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.5 }}>
            KAP bildirimlerini anlık push bildirim olarak almak ve tüm BIST hisselerini takip etmek için uygulamayı indirin.
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
            <ExternalLinkIcon className="w-3.5 h-3.5" />
          </a>
        </div>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {Array.from({ length: 3 }).map((_, i) => <SkeletonGroup key={i} />)}
        </div>
      )}

      {/* ── Disclosures grouped by date ── */}
      {!loading && !error && groups.map(([dateKey, dayItems]) => (
        <section key={dateKey} style={{ marginBottom: 32 }}>
          {/* Day header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
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
              <CalendarIcon className="w-3.5 h-3.5" />
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
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {dayItems.map((parsed) => {
              const idx = globalIndex++;
              const showAd = idx > 0 && idx % 5 === 0;
              return (
                <div key={parsed.item.id}>
                  {showAd && (
                    <div style={{ margin: '16px 0' }}>
                      <AdBanner slot="3567518609" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
                    </div>
                  )}
                  <DisclosureCard parsed={parsed} />
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* ── Empty state ── */}
      {!loading && !error && groups.length === 0 && (
        <div style={{ textAlign: 'center', padding: '64px 0' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: '50%',
              background: 'rgba(41,121,255,0.08)',
              border: '1px solid rgba(41,121,255,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px',
            }}
          >
            <DocumentIcon className="w-6 h-6" />
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>
            AI analizi bulunan KAP haberi bulunamadı.
          </p>
        </div>
      )}

      {/* ── App Store Banner ── */}
      <div style={{ marginTop: 40 }}>
        <AppStoreBanner />
      </div>
    </div>
  );
}
