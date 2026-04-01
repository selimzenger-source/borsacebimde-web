'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, cleanText, formatTime, sourceLabel, sourceBadgeStyle, type NewsFeedItem, type IPO, type DailyMarketStat } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import { getStoreInfo } from '@/lib/platform';

const API_BASE = 'https://sz-bist-finans-api.onrender.com';

function getImageUrl(url: string | null): string | null {
  if (!url) return null;
  if (url.startsWith('http')) return url;
  return API_BASE + url;
}

// ─── Feature Grid Data ───────────────────────────────────────────────────────

const features = [
  {
    href: '/halka-arz',
    title: 'Halka Arz Takibi',
    desc: 'SPK onaylı halka arzları anlık takip edin, dağıtım ve işlem tarihlerini kaçırmayın.',
    color: '#2979FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
  },
  {
    href: '/kap-ai',
    title: 'KAP Pozitif Haber',
    desc: 'Yapay zeka destekli KAP açıklama özetleri. Uzun metinleri saniyede kavrayın.',
    color: '#FFD700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    href: '/kap-tum-haberler',
    title: 'Tüm KAP Haber',
    desc: 'Yapay zeka analizi ile tüm KAP bildirimlerini takip edin.',
    color: '#FFD700',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    href: '/piyasa-haberleri',
    title: 'Piyasa Haberleri',
    desc: 'Güncel finans haberlerini kapak görselleriyle birlikte takip edin.',
    color: '#26C6DA',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    href: '/tavan-taban',
    title: 'Tavan Taban',
    desc: "BIST'te günlük tavan ve taban yapan hisseleri anlık olarak görüntüleyin.",
    color: '#4CAF50',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    href: '/viop',
    title: 'VİOP Gece Seansı',
    desc: 'Vadeli işlem piyasasını gece seansı verileriyle yakından izleyin.',
    color: '#B388FF',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
      </svg>
    ),
  },
  {
    href: '/spk-bulten',
    title: 'SPK Bülten',
    desc: 'Sermaye Piyasası Kurulu güncel bültenlerini ve kararlarını takip edin.',
    color: '#FF9800',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
];

// ─── Skeleton Components ──────────────────────────────────────────────────────

function StatSkeleton() {
  return (
    <div className="card px-6 py-4 flex flex-col gap-2 min-w-[160px]">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-7 w-16 rounded" />
    </div>
  );
}

function NewsSkeleton() {
  return (
    <div className="card overflow-hidden">
      <div className="skeleton" style={{ width: '100%', height: 140 }} />
      <div className="p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <div className="skeleton h-5 w-14 rounded" />
          <div className="skeleton h-4 w-10 rounded" />
        </div>
        <div className="skeleton h-4 w-full rounded" />
        <div className="skeleton h-4 w-4/5 rounded" />
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [stats, setStats] = useState<DailyMarketStat[]>([]);
  const [news, setNews] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(getStoreInfo());
  useEffect(() => { setStore(getStoreInfo()); }, []);

  useEffect(() => {
    Promise.allSettled([
      api.getIPOs(),
      api.getDailyMarketStats(1),
      api.getNewsFeed(7, 50),
    ]).then(([iposRes, statsRes, newsRes]) => {
      if (iposRes.status === 'fulfilled') setIpos(iposRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (newsRes.status === 'fulfilled') setNews(newsRes.value.filter(n => n.source === 'bot_proxy'));
      setLoading(false);
    });
  }, []);

  // Compute quick stats
  const todaysStats = stats.filter((s) => {
    const today = new Date().toISOString().slice(0, 10);
    return s.date?.slice(0, 10) === today;
  });
  const ceilingCount = todaysStats.filter((s) => s.is_ceiling).length;
  const floorCount = todaysStats.filter((s) => s.is_floor).length;
  const activeIpos = ipos.filter((i) => i.status !== 'awaiting_approval').length;
  const latestNews = news.slice(0, 8);

  return (
    <div className="flex flex-col gap-0">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-2xl mb-8"
        style={{
          background: 'linear-gradient(135deg, #0A1A3E 0%, #0D2451 50%, #061230 100%)',
          minHeight: 320,
        }}
      >
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.15) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16 flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <div
              className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full"
              style={{ background: 'rgba(41,121,255,0.12)', border: '1px solid rgba(41,121,255,0.25)' }}
            >
              <span className="pulse-dot" style={{ background: '#2979FF' }} />
              <span style={{ color: '#5C9AFF', fontSize: 12, fontWeight: 600 }}>Canlı Veri</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 tracking-tight">
              Borsa <span style={{ color: '#2979FF' }}>Cebimde</span>
            </h1>
            <p className="text-base sm:text-lg leading-relaxed mb-8 max-w-lg" style={{ color: '#94A3B8' }}>
              Halka arz, KAP haberleri ve piyasa verileri tek elde
            </p>

            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Link
                href="/halka-arz"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all duration-150 hover:shadow-lg active:scale-95"
                style={{ background: '#2979FF' }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
                </svg>
                Halka Arzları İncele
              </Link>
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm backdrop-blur-sm transition-all duration-150 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}
              >
                {store.isIOS ? (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
                  </svg>
                )}
                {store.label}
              </a>
            </div>
          </div>

          <div className="shrink-0 flex items-center justify-center">
            <div
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: '0 0 40px rgba(41,121,255,0.2)',
              }}
            >
              <Image
                src="/images/icon-192.png"
                alt="Borsa Cebimde logosu"
                fill
                className="object-contain p-3"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar removed - user requested */}

      {/* ── Özellikler ─────────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Özellikler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className="card p-4 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02] group"
              style={{ textDecoration: 'none' }}
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                style={{
                  background: `${f.color}18`,
                  border: `1px solid ${f.color}30`,
                  color: f.color,
                }}
              >
                {f.icon}
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <span className="text-sm font-semibold leading-snug" style={{ color: f.color }}>
                  {f.title}
                </span>
                <span className="text-xs leading-relaxed line-clamp-2" style={{ color: 'var(--text-muted)' }}>
                  {f.desc}
                </span>
              </div>

              <div className="mt-auto flex items-center gap-1" style={{ color: f.color }}>
                <span style={{ fontSize: 11, fontWeight: 500, opacity: 0.7 }}>İncele</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4 4 4-4 4" />
                </svg>
              </div>
            </Link>
          ))}
          {/* Ad card - fills empty spot next to SPK Bülten */}
          <div className="card p-4 flex items-center justify-center" style={{ minHeight: 120 }}>
            <AdBanner slot="3455837962" format="rectangle" />
          </div>
        </div>
      </section>

      {/* ── Son Haberler ──────────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Son Haberler</h2>
            {!loading && (
              <span
                className="badge"
                style={{ background: 'rgba(41,121,255,0.1)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.2)' }}
              >
                <span className="pulse-dot" style={{ background: '#2979FF' }} />
                Canlı
              </span>
            )}
          </div>
          <Link
            href="/piyasa-haberleri"
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: '#2979FF' }}
          >
            Tümünü Gör
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4 4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <NewsSkeleton key={i} />)
          ) : latestNews.length === 0 ? (
            <div className="card p-8 flex flex-col items-center gap-3 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Şu an haber bulunamadı.</p>
            </div>
          ) : (
            latestNews.map((item, idx) => {
              const timeStr = item.sent_at ?? item.created_at;
              const cleaned = cleanText(item.text);
              const lines = cleaned.split('\n').filter(l => l.trim());
              const title = lines[0] || '';
              const body = lines.slice(1).join(' ').trim();
              const imageUrl = getImageUrl(item.image_url);
              const items = [];

              items.push(
                <div
                  key={item.id}
                  className="card overflow-hidden transition-all duration-150"
                >
                  {imageUrl && (
                    <div style={{ width: '100%', height: 160, background: 'var(--bg-surface)', overflow: 'hidden' }}>
                      <img src={imageUrl} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="badge" style={sourceBadgeStyle(item.source)}>
                        {sourceLabel(item.source)}
                      </span>
                      {timeStr && (
                        <span style={{ color: 'var(--text-muted)', fontSize: 11 }}>
                          {formatTime(timeStr)}
                        </span>
                      )}
                    </div>
                    {title && (
                      <h3 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                        {title}
                      </h3>
                    )}
                    {body && (
                      <p className="text-sm leading-relaxed line-clamp-2" style={{ color: 'var(--text-secondary)' }}>
                        {body.slice(0, 150)}
                        {body.length > 150 && <span style={{ color: 'var(--text-muted)' }}>...</span>}
                      </p>
                    )}
                  </div>
                </div>
              );

              // Banner ad after 6th news item
              if (idx === 5) {
                items.push(
                  <div key={`ad-${idx}`}>
                    <AdBanner slot="1823621352" format="horizontal" />
                  </div>
                );
              }

              return items;
            })
          )}
        </div>

        {!loading && latestNews.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Link
              href="/piyasa-haberleri"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 hover:scale-[1.01]"
              style={{
                background: 'rgba(41,121,255,0.08)',
                border: '1px solid rgba(41,121,255,0.2)',
                color: '#2979FF',
              }}
            >
              Tüm Haberleri Gör
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4 4 4-4 4" />
              </svg>
            </Link>
          </div>
        )}
      </section>

      {/* ── Uygulama Banner ───────────────────────────────────────────────── */}
      <AppStoreBanner />
    </div>
  );
}
