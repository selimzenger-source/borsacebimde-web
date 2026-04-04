'use client';

import { useEffect, useState } from 'react';
import { api, SpkBulletinAnalysis, cleanText, formatDate } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';
import FAQ from '@/components/FAQ';
import { spkBultenFAQ } from '@/lib/faq-data';

// ─── Types ───────────────────────────────────────────────────────────────────

interface BulletinGroup {
  bulletin_no: string;
  items: SpkBulletinAnalysis[];
  latestDate: string | null;
  sortKey: number;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function parseBulletinSortKey(bulletin_no: string): number {
  const match = bulletin_no.match(/(\d{4})[\/\-](\d+)/);
  if (!match) return 0;
  return parseInt(match[1]) * 10000 + parseInt(match[2]);
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonBulletin() {
  return (
    <div className="card overflow-hidden">
      <div
        className="flex items-center justify-between px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-primary)' }}
      >
        <div className="flex items-center gap-3">
          <div className="skeleton" style={{ height: 28, width: 112, borderRadius: 8 }} />
          <div className="skeleton" style={{ height: 16, width: 96, borderRadius: 4 }} />
        </div>
      </div>
      <div className="px-5 py-5" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ height: 14, width: '100%' }} />
        <div className="skeleton" style={{ height: 14, width: '92%' }} />
        <div className="skeleton" style={{ height: 14, width: '80%' }} />
        <div className="skeleton" style={{ height: 14, width: '100%', marginTop: 16 }} />
        <div className="skeleton" style={{ height: 14, width: '75%' }} />
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
    <div className="card overflow-hidden">
      {/* Header */}
      <div
        className="flex flex-wrap items-center gap-3 px-5 py-4"
        style={{ borderBottom: '1px solid var(--border-primary)' }}
      >
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: 'rgba(255,152,0,0.1)',
              border: '1px solid rgba(255,152,0,0.2)',
            }}
          >
            <svg className="w-4 h-4" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <span
            className="badge"
            style={{
              background: 'rgba(255,152,0,0.12)',
              border: '1px solid rgba(255,152,0,0.3)',
              color: '#FF9800',
              fontSize: 13,
              fontWeight: 700,
              padding: '4px 12px',
              borderRadius: 8,
            }}
          >
            Bülten {group.bulletin_no}
          </span>
        </div>

        {dateStr && (
          <span
            className="flex items-center gap-1.5 text-xs ml-auto"
            style={{ color: 'var(--text-muted)' }}
          >
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
          <p
            className="text-sm leading-relaxed whitespace-pre-line"
            style={{ color: 'var(--text-secondary)' }}
          >
            {combinedText}
          </p>
        ) : (
          <p className="text-sm italic" style={{ color: 'var(--text-muted)' }}>
            İçerik bulunamadı.
          </p>
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

          if (item.sent_at) {
            if (!g.latestDate || item.sent_at > g.latestDate) {
              g.latestDate = item.sent_at;
            }
          }
        }

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
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ─── Page Header ─── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(255,152,0,0.2)',
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%)' }}
        />

        <div className="relative">
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
            style={{ background: 'rgba(255,152,0,0.1)', border: '1px solid rgba(255,152,0,0.2)' }}
          >
            <svg className="w-3.5 h-3.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#FF9800' }}>Haftalık Bültenler</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            SPK Bülten Analizleri
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Haftalık bülten özetleri
          </p>
        </div>
      </header>

      <InlineAppBanner
        title="SPK Bülten Bildirimleri!"
        message="SPK bülten yayınladığında AI analizi ile en hızlı bildirimleri alın."
      />

      {/* ─── Info Box ─── */}
      <div
        className="flex gap-3 p-4 rounded-xl"
        style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}
      >
        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          SPK haftalık bültenlerindeki{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>halka arz kararları</span> ve{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>düzenleyici gelişmelerin</span> yapay zeka analizi.
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonBulletin key={i} />
          ))}
        </div>
      )}

      {/* ─── Empty ─── */}
      {!loading && !error && bulletins.length === 0 && (
        <div className="card p-8 text-center text-sm" style={{ color: 'var(--text-muted)' }}>
          Henüz SPK bülten analizi bulunmamaktadır.
        </div>
      )}

      {/* ─── Bulletin List ─── */}
      {!loading && !error && bulletins.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {bulletins.map((group, idx) => (
            <div key={group.bulletin_no}>
              <BulletinCard group={group} />

              {(idx + 1) % 3 === 0 && idx < bulletins.length - 1 && (
                <div style={{ margin: '16px 0' }}>
                  <AdBanner slot="3567518609" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <FAQ items={spkBultenFAQ} title="SPK Bülten Hakkında Sıkça Sorulan Sorular" />

      {/* ─── AppStore Banner ─── */}
      <AppStoreBanner message="AI analizi ile en hızlı bildirimleri alın!" />
    </div>
  );
}
