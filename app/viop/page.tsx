'use client';

import { useEffect, useState } from 'react';
import { api, ViopTweet, cleanText, formatDate, formatTime } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';

// ─── Types ───────────────────────────────────────────────────────────────────

type TweetBadgeType = 'acilis' | 'kapanis' | 'seyir';

interface DayGroup {
  date: string;
  tweets: ViopTweet[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function detectTweetType(text: string): TweetBadgeType {
  const upper = text.toUpperCase();
  if (upper.includes('AÇILDI') || upper.includes('ACILDI')) return 'acilis';
  if (upper.includes('KAPANDI')) return 'kapanis';
  return 'seyir';
}

const BADGE_CONFIG: Record<TweetBadgeType, { label: string; color: string; bg: string; border: string }> = {
  acilis: {
    label: 'Açılış',
    color: '#4CAF50',
    bg: 'rgba(76,175,80,0.12)',
    border: 'rgba(76,175,80,0.3)',
  },
  kapanis: {
    label: 'Kapanış',
    color: '#FF5252',
    bg: 'rgba(255,82,82,0.12)',
    border: 'rgba(255,82,82,0.3)',
  },
  seyir: {
    label: 'Seyir',
    color: '#7C4DFF',
    bg: 'rgba(124,77,255,0.12)',
    border: 'rgba(124,77,255,0.3)',
  },
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div
      className="p-4 rounded-xl space-y-3"
      style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
    >
      <div className="flex items-center gap-3">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-4 w-12 rounded ml-auto" />
      </div>
      <div className="skeleton h-3.5 w-full" />
      <div className="skeleton h-3.5 w-4/5" />
      <div className="skeleton h-3.5 w-3/5" />
    </div>
  );
}

function SkeletonDay() {
  return (
    <div className="card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="skeleton h-4 w-32" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
      <div className="px-5 py-4 space-y-3" style={{ borderTop: '1px solid var(--border-primary)' }}>
        {Array.from({ length: 3 }).map((_, j) => (
          <SkeletonCard key={j} />
        ))}
      </div>
    </div>
  );
}

// ─── Tweet Card ──────────────────────────────────────────────────────────────

function TweetCard({ tweet }: { tweet: ViopTweet }) {
  const type = detectTweetType(tweet.text);
  const badge = BADGE_CONFIG[type];
  const time = tweet.sent_at ? formatTime(tweet.sent_at) : null;
  const cleaned = cleanText(tweet.text);

  return (
    <div
      className="p-4 rounded-xl transition-colors space-y-3"
      style={{
        background: 'var(--bg-surface)',
        border: '1px solid var(--border-primary)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--bg-card-hover)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--bg-surface)'; }}
    >
      <div className="flex items-center gap-3">
        <span
          className="badge"
          style={{
            background: badge.bg,
            color: badge.color,
            border: `1px solid ${badge.border}`,
          }}
        >
          {type === 'acilis' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
            </svg>
          )}
          {type === 'kapanis' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3" />
            </svg>
          )}
          {type === 'seyir' && (
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
            </svg>
          )}
          {badge.label}
        </span>

        {time && (
          <span className="ml-auto flex items-center gap-1 text-xs" style={{ color: 'var(--text-muted)' }}>
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {time}
          </span>
        )}
      </div>

      {cleaned && (
        <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: 'var(--text-secondary)' }}>
          {cleaned}
        </p>
      )}
    </div>
  );
}

// ─── Day Accordion ───────────────────────────────────────────────────────────

function DayAccordion({ group, defaultOpen }: { group: DayGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div
      className="card overflow-hidden"
      style={{ borderColor: open ? 'rgba(124,77,255,0.2)' : undefined }}
    >
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
            style={{ background: 'rgba(124,77,255,0.1)', border: '1px solid rgba(124,77,255,0.2)' }}
          >
            <svg className="w-4 h-4" style={{ color: '#7C4DFF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {formatDate(group.date)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="badge"
            style={{
              background: 'rgba(124,77,255,0.12)',
              color: '#7C4DFF',
              border: '1px solid rgba(124,77,255,0.25)',
            }}
          >
            {group.tweets.length} kayıt
          </span>
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

      {open && (
        <div
          className="px-5 py-4 space-y-3"
          style={{ borderTop: '1px solid var(--border-primary)' }}
        >
          {group.tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ViopPage() {
  const [groups, setGroups] = useState<DayGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getViopTweets(5)
      .then((data) => {
        const map = new Map<string, DayGroup>();
        for (const tweet of data) {
          const dateKey = tweet.sent_at ? tweet.sent_at.slice(0, 10) : 'bilinmiyor';
          if (!map.has(dateKey)) {
            map.set(dateKey, { date: dateKey, tweets: [] });
          }
          map.get(dateKey)!.tweets.push(tweet);
        }
        const sorted = Array.from(map.values()).sort((a, b) =>
          b.date.localeCompare(a.date)
        );
        for (const g of sorted) {
          g.tweets.sort((a, b) =>
            (b.sent_at ?? '').localeCompare(a.sent_at ?? '')
          );
        }
        setGroups(sorted);
      })
      .catch(() =>
        setError('Veriler yüklenirken bir hata oluştu. Lütfen sayfayı yenileyin.')
      )
      .finally(() => setLoading(false));
  }, []);

  const totalTweets = groups.reduce((sum, g) => sum + g.tweets.length, 0);

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(124,77,255,0.2)',
        }}
      >
        {/* Decorative glow */}
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(124,77,255,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div
              className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
              style={{ background: 'rgba(124,77,255,0.1)', border: '1px solid rgba(124,77,255,0.2)' }}
            >
              <svg className="w-3.5 h-3.5" style={{ color: '#7C4DFF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
              </svg>
              <span className="text-xs font-semibold" style={{ color: '#7C4DFF' }}>Gece Seansı</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              VIOP Gece Seansı
            </h1>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Son 5 günün gece seansı verileri
            </p>
          </div>

          {/* Stats */}
          {!loading && groups.length > 0 && (
            <div
              className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: 'rgba(124,77,255,0.08)', border: '1px solid rgba(124,77,255,0.2)' }}
            >
              <svg className="w-4 h-4" style={{ color: '#7C4DFF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
              </svg>
              <span className="text-sm font-semibold" style={{ color: '#7C4DFF' }}>
                {totalTweets} kayıt
              </span>
            </div>
          )}
        </div>
      </header>

      <InlineAppBanner
        title="VİOP Seanslarını Anlık Takip Edin!"
        message="Akşam ve gündüz seanslarını anlık takip edin, önemli gelişmelerde bildirim alın."
      />

      {/* ─── Info Box ─── */}
      <div
        className="flex gap-3 p-4 rounded-xl"
        style={{ background: 'rgba(124,77,255,0.06)', border: '1px solid rgba(124,77,255,0.2)' }}
      >
        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#7C4DFF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          VIOP gece seansı <span className="font-medium" style={{ color: 'var(--text-primary)' }}>açılış</span>,{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>kapanış</span> ve{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>saatlik seyir</span> verileri.
        </p>
      </div>

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
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonDay key={i} />
          ))}
        </div>
      )}

      {/* ─── Empty ─── */}
      {!loading && !error && groups.length === 0 && (
        <div className="card p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Son 5 gün içinde VIOP verisi bulunamadı.
        </div>
      )}

      {/* ─── Accordion List ─── */}
      {!loading && !error && groups.length > 0 && (
        <div className="space-y-3">
          {groups.map((group, idx) => (
            <DayAccordion key={group.date} group={group} defaultOpen={idx === 0} />
          ))}
        </div>
      )}

      {/* ─── Ad Banner ─── */}
      {!loading && (
        <AdBanner slot="3567518609" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
      )}

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner message="Akşam ve gündüz seanslarını anlık takip edin!" />
    </div>
  );
}
