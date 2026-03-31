'use client';

import { useEffect, useState } from 'react';
import { api, SpkBulletinAnalysis, cleanText, formatDate } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Types ───────────────────────────────────────────────────────────────────

interface BulletinGroup {
  bulletin_no: string;
  items: SpkBulletinAnalysis[];
  latestDate: string | null;
  sortKey: number; // parsed year*1000 + number for sorting
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Parse "2026/19" → 2026019 for numeric sorting (newest first).
 * Falls back to 0 for unknown formats.
 */
function parseBulletinSortKey(bulletin_no: string): number {
  const match = bulletin_no.match(/(\d{4})[\/\-](\d+)/);
  if (!match) return 0;
  return parseInt(match[1]) * 10000 + parseInt(match[2]);
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonBulletin() {
  return (
    <div className="glass-card overflow-hidden space-y-0">
      {/* header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <div className="skeleton h-7 w-28 rounded-lg" />
          <div className="skeleton h-4 w-24 rounded" />
        </div>
      </div>
      {/* body */}
      <div className="px-5 py-5 space-y-2">
        <div className="skeleton h-3.5 w-full rounded" />
        <div className="skeleton h-3.5 w-11/12 rounded" />
        <div className="skeleton h-3.5 w-4/5 rounded" />
        <div className="skeleton h-3.5 w-full rounded mt-4" />
        <div className="skeleton h-3.5 w-3/4 rounded" />
      </div>
    </div>
  );
}

// ─── Bulletin Card ────────────────────────────────────────────────────────────

function BulletinCard({ group }: { group: BulletinGroup }) {
  const combinedText = group.items
    .map((item) => cleanText(item.text))
    .filter(Boolean)
    .join('\n\n');

  const dateStr = group.latestDate ? formatDate(group.latestDate) : null;

  return (
    <div className="glass-card glow-orange overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent-orange/10 border border-accent-orange/20 flex items-center justify-center shrink-0">
            <svg className="w-4 h-4 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <span
            className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-bold border"
            style={{
              background: 'rgba(255,152,0,0.12)',
              borderColor: 'rgba(255,152,0,0.3)',
              color: '#FF9800',
            }}
          >
            Bülten {group.bulletin_no}
          </span>
        </div>

        {dateStr && (
          <span className="flex items-center gap-1.5 text-text-muted text-xs ml-auto">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path strokeLinecap="round" d="M16 2v4M8 2v4M3 10h18" />
            </svg>
            {dateStr}
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 py-5">
        {combinedText ? (
          <p className="text-text-secondary text-sm leading-relaxed whitespace-pre-line">
            {combinedText}
          </p>
        ) : (
          <p className="text-text-muted text-sm italic">İçerik bulunamadı.</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function SpkBultenPage() {
  const [bulletins, setBulletins] = useState<BulletinGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .getSpkBulletins(30)
      .then((data) => {
        const map = new Map<string, BulletinGroup>();

        for (const item of data) {
          const key = item.bulletin_no;
          if (!map.has(key)) {
            map.set(key, {
              bulletin_no: key,
              items: [],
              latestDate: null,
              sortKey: parseBulletinSortKey(key),
            });
          }
          const g = map.get(key)!;
          g.items.push(item);

          // Track latest date within the group
          if (item.sent_at) {
            if (!g.latestDate || item.sent_at > g.latestDate) {
              g.latestDate = item.sent_at;
            }
          }
        }

        // Sort newest bulletin first
        const sorted = Array.from(map.values()).sort(
          (a, b) => b.sortKey - a.sortKey
        );

        setBulletins(sorted);
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
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full bg-accent-orange/10 border border-accent-orange/20">
          <svg className="w-3.5 h-3.5 text-accent-orange" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          <span className="text-accent-orange text-xs font-semibold">Haftalık Bültenler</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-2">
          SPK Bülten Analizleri
        </h1>
        <p className="text-text-secondary text-sm">Haftalık bülten özetleri</p>
      </div>

      {/* ─── Info Box ─── */}
      <div className="flex gap-3 p-4 rounded-xl bg-accent-orange/[0.06] border border-accent-orange/20">
        <svg className="w-5 h-5 text-accent-orange shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <p className="text-text-secondary text-sm leading-relaxed">
          SPK haftalık bültenlerindeki{' '}
          <span className="text-text-primary font-medium">halka arz kararları</span> ve{' '}
          <span className="text-text-primary font-medium">düzenleyici gelişmelerin</span> yapay zeka analizi.
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
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBulletin key={i} />
          ))}
        </div>
      )}

      {/* ─── Empty ─── */}
      {!loading && !error && bulletins.length === 0 && (
        <div className="glass-card p-8 text-center text-text-muted text-sm">
          Henüz SPK bülten analizi bulunmamaktadır.
        </div>
      )}

      {/* ─── Bulletin List ─── */}
      {!loading && !error && bulletins.length > 0 && (
        <div className="space-y-4">
          {bulletins.map((group, idx) => (
            <div key={group.bulletin_no}>
              <BulletinCard group={group} />

              {/* Ad every 3 bulletins */}
              {(idx + 1) % 3 === 0 && idx < bulletins.length - 1 && (
                <div className="my-4">
                  <AdBanner slot="4045086866" format="horizontal" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner />
    </div>
  );
}
