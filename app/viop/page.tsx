'use client';

import { useEffect, useState } from 'react';
import { api, ViopTweet, cleanText, formatDate, formatTime } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

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

const BADGE_CONFIG: Record<TweetBadgeType, { label: string; classes: string }> = {
  acilis: {
    label: 'Açılış',
    classes: 'bg-accent-green/15 text-accent-green border-accent-green/25',
  },
  kapanis: {
    label: 'Kapanış',
    classes: 'bg-accent-red/15 text-accent-red border-accent-red/25',
  },
  seyir: {
    label: 'Seyir',
    classes: 'bg-accent-purple/15 text-accent-purple border-accent-purple/25',
  },
};

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] space-y-3">
      <div className="flex items-center gap-3">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-4 w-12 rounded ml-auto" />
      </div>
      <div className="skeleton h-3.5 w-full rounded" />
      <div className="skeleton h-3.5 w-4/5 rounded" />
      <div className="skeleton h-3.5 w-3/5 rounded" />
    </div>
  );
}

function SkeletonDay() {
  return (
    <div className="glass-card overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <div className="skeleton h-4 w-32 rounded" />
        <div className="skeleton h-5 w-16 rounded-full" />
      </div>
    </div>
  );
}

// ─── Tweet Card ───────────────────────────────────────────────────────────────

function TweetCard({ tweet }: { tweet: ViopTweet }) {
  const type = detectTweetType(tweet.text);
  const badge = BADGE_CONFIG[type];
  const time = tweet.sent_at ? formatTime(tweet.sent_at) : null;
  const cleaned = cleanText(tweet.text);

  return (
    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors space-y-3">
      <div className="flex items-center gap-3">
        <span
          className={[
            'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold border',
            badge.classes,
          ].join(' ')}
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
          <span className="ml-auto flex items-center gap-1 text-text-muted text-xs">
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" />
            </svg>
            {time}
          </span>
        )}
      </div>

      {cleaned && (
        <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
          {cleaned}
        </p>
      )}
    </div>
  );
}

// ─── Day Accordion ────────────────────────────────────────────────────────────

function DayAccordion({ group, defaultOpen }: { group: DayGroup; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="glass-card glow-purple overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors text-left"
        aria-expanded={open}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-purple/10 border border-accent-purple/20 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
            </svg>
          </div>
          <span className="font-semibold text-text-primary text-sm">
            {formatDate(group.date)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent-purple/15 text-accent-purple border border-accent-purple/25">
            {group.tweets.length} kayıt
          </span>
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

      {open && (
        <div className="border-t border-white/[0.06] px-5 py-4 space-y-3">
          {group.tweets.map((tweet) => (
            <TweetCard key={tweet.id} tweet={tweet} />
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

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
        // Sort by date descending, tweets within each day by time
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

  return (
    <div className="space-y-6">
      {/* ─── Page Header ─── */}
      <div>
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-accent-purple/10 border border-accent-purple/20">
          <svg className="w-3.5 h-3.5 text-accent-purple" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
          </svg>
          <span className="text-accent-purple text-xs font-semibold">Gece Seansı</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          VIOP Gece Seansı
        </h1>
        <p className="text-text-secondary text-sm">Son 5 günün verileri</p>
      </div>

      {/* ─── Info Box ─── */}
      <div className="flex gap-3 p-4 rounded-xl bg-accent-purple/[0.06] border border-accent-purple/20">
        <svg className="w-5 h-5 text-accent-purple shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <p className="text-text-secondary text-sm leading-relaxed">
          VIOP gece seansı <span className="text-text-primary font-medium">açılış</span>,{' '}
          <span className="text-text-primary font-medium">kapanış</span> ve{' '}
          <span className="text-text-primary font-medium">saatlik seyir</span> verileri.
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
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="glass-card overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4">
                <SkeletonDay key={i} />
              </div>
              <div className="border-t border-white/[0.06] px-5 py-4 space-y-3">
                {Array.from({ length: 3 }).map((_, j) => (
                  <SkeletonCard key={j} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── Empty ─── */}
      {!loading && !error && groups.length === 0 && (
        <div className="glass-card p-8 text-center text-text-muted text-sm">
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
        <AdBanner slot="4045086866" format="horizontal" />
      )}

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner />
    </div>
  );
}
