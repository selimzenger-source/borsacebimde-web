'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, cleanText, formatTime, type NewsFeedItem, type IPO, type DailyMarketStat } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Feature Grid Data ───────────────────────────────────────────────────────

const features = [
  {
    href: '/halka-arz',
    title: 'Halka Arz Takibi',
    desc: 'SPK onaylı halka arzları anlık takip edin, dağıtım ve işlem tarihlerini kaçırmayın.',
    accent: 'blue' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75" />
      </svg>
    ),
  },
  {
    href: '/kap-ai',
    title: 'KAP AI Haberleri',
    desc: 'Yapay zeka destekli KAP açıklama özetleri. Uzun metinleri saniyede kavrayın.',
    accent: 'gold' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />
      </svg>
    ),
  },
  {
    href: '/kap-haberler',
    title: 'Tüm KAP Haberler',
    desc: 'KAP\'tan gelen tüm şirket açıklamalarını gerçek zamanlı olarak takip edin.',
    accent: 'cyan' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
      </svg>
    ),
  },
  {
    href: '/tavan-taban',
    title: 'Tavan Taban',
    desc: 'BIST\'te günlük tavan ve taban yapan hisseleri anlık olarak görüntüleyin.',
    accent: 'gold' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
  {
    href: '/viop',
    title: 'VIOP Gece Seansı',
    desc: 'Vadeli işlem piyasasını gece seansı verileriyle yakından izleyin.',
    accent: 'purple' as const,
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
    accent: 'orange' as const,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
];

// ─── Accent colour maps ───────────────────────────────────────────────────────

const accentColor: Record<string, string> = {
  blue: '#2979FF',
  gold: '#FFD700',
  cyan: '#26C6DA',
  purple: '#B388FF',
  orange: '#FF9800',
  green: '#4CAF50',
};

const glowClass: Record<string, string> = {
  blue: 'glow-blue',
  gold: 'glow-gold',
  cyan: 'glow-cyan',
  purple: 'glow-purple',
  orange: 'glow-orange',
  green: 'glow-green',
};

// ─── Source label map ─────────────────────────────────────────────────────────

function sourceLabel(source: string): string {
  const map: Record<string, string> = {
    kap: 'KAP',
    kap_ai: 'KAP AI',
    telegram: 'Telegram',
    bloomberg: 'Bloomberg',
    uzmanpara: 'Uzmanpara',
    bigpara: 'BigPara',
  };
  return map[source?.toLowerCase()] ?? source;
}

function sourceBadgeColor(source: string): string {
  const map: Record<string, string> = {
    kap: 'bg-blue-900/40 text-blue-300 border-blue-800/40',
    kap_ai: 'bg-yellow-900/40 text-yellow-300 border-yellow-800/40',
    telegram: 'bg-cyan-900/40 text-cyan-300 border-cyan-800/40',
  };
  return map[source?.toLowerCase()] ?? 'bg-white/5 text-text-secondary border-white/10';
}

// ─── Skeleton Components ──────────────────────────────────────────────────────

function StatSkeleton() {
  return (
    <div className="glass-card px-6 py-4 flex flex-col gap-2 min-w-[160px]">
      <div className="skeleton h-3 w-24 rounded" />
      <div className="skeleton h-7 w-16 rounded" />
    </div>
  );
}

function NewsSkeleton() {
  return (
    <div className="glass-card p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <div className="skeleton h-5 w-14 rounded" />
        <div className="skeleton h-4 w-10 rounded" />
      </div>
      <div className="skeleton h-4 w-full rounded" />
      <div className="skeleton h-4 w-4/5 rounded" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [stats, setStats] = useState<DailyMarketStat[]>([]);
  const [news, setNews] = useState<NewsFeedItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.getIPOs(),
      api.getDailyMarketStats(1),
      api.getNewsFeed(7, 20),
    ]).then(([iposRes, statsRes, newsRes]) => {
      if (iposRes.status === 'fulfilled') setIpos(iposRes.value);
      if (statsRes.status === 'fulfilled') setStats(statsRes.value);
      if (newsRes.status === 'fulfilled') setNews(newsRes.value);
      setLoading(false);
    });
  }, []);

  // Compute quick stats
  const todaysStats = stats.filter((s) => {
    const today = new Date().toISOString().slice(0, 10);
    return s.date?.slice(0, 10) === today;
  });
  const ceilingCount = todaysStats.filter((s) => s.type === 'ceiling').length;
  const floorCount = todaysStats.filter((s) => s.type === 'floor').length;
  const activeIpos = ipos.filter((i) => i.status !== 'awaiting_approval').length;
  const latestNews = news.slice(0, 5);

  return (
    <div className="flex flex-col gap-0">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden rounded-2xl mb-8"
        style={{
          background: 'linear-gradient(135deg, #0D3627 0%, #0A2E1F 50%, #071A14 100%)',
          minHeight: 320,
        }}
      >
        {/* Decorative blobs */}
        <div
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(76,175,80,0.12) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.08) 0%, transparent 70%)' }}
        />
        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative px-6 py-12 sm:px-10 sm:py-16 flex flex-col sm:flex-row items-center gap-8">
          {/* Text */}
          <div className="flex-1 min-w-0 text-center sm:text-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-1.5 mb-4 px-3 py-1 rounded-full bg-accent-green/10 border border-accent-green/20">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot" />
              <span className="text-accent-green text-xs font-semibold">Canlı Veri</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight mb-3 tracking-tight">
              Borsa <span className="text-accent-green">Cebimde</span>
            </h1>
            <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              Halka arz, KAP haberleri ve piyasa verileri tek elde
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
              <Link
                href="/halka-arz"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent-green text-white font-semibold text-sm transition-all duration-150 hover:bg-green-500 hover:shadow-[0_0_24px_rgba(76,175,80,0.5)] active:scale-95"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75" />
                </svg>
                Halka Arzları İncele
              </Link>
              <a
                href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/8 border border-white/15 text-white font-semibold text-sm backdrop-blur-sm transition-all duration-150 hover:bg-white/12 hover:border-white/25 active:scale-95"
                style={{ background: 'rgba(255,255,255,0.06)' }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Uygulamayı İndir
              </a>
            </div>
          </div>

          {/* Logo decorative */}
          <div className="shrink-0 flex items-center justify-center">
            <div
              className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-3xl overflow-hidden border border-white/10"
              style={{ background: 'rgba(255,255,255,0.04)', boxShadow: '0 0 40px rgba(76,175,80,0.2)' }}
            >
              <Image
                src="/images/logo.png"
                alt="Borsa Cebimde logosu"
                fill
                className="object-contain p-3"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Live Stats Bar ────────────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="overflow-x-auto pb-2 -mx-1 px-1">
          <div className="flex gap-3 min-w-max">
            {loading ? (
              <>
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
                <StatSkeleton />
              </>
            ) : (
              <>
                <div className="glass-card px-6 py-4 flex flex-col gap-1 min-w-[150px] glow-green">
                  <span className="text-text-muted text-xs font-medium">Toplam Halka Arz</span>
                  <span className="text-2xl font-bold text-white">{ipos.length}</span>
                  <span className="text-accent-green text-[11px]">{activeIpos} aktif</span>
                </div>
                <div className="glass-card px-6 py-4 flex flex-col gap-1 min-w-[150px] glow-gold">
                  <span className="text-text-muted text-xs font-medium">Bugün Tavan</span>
                  <span className="text-2xl font-bold text-accent-green">
                    {ceilingCount > 0 ? `+${ceilingCount}` : ceilingCount}
                  </span>
                  <span className="text-text-muted text-[11px]">hisse</span>
                </div>
                <div className="glass-card px-6 py-4 flex flex-col gap-1 min-w-[150px] glow-blue">
                  <span className="text-text-muted text-xs font-medium">Bugün Taban</span>
                  <span className="text-2xl font-bold text-accent-red" style={{ color: '#FF5252' }}>
                    {floorCount > 0 ? `-${floorCount}` : floorCount}
                  </span>
                  <span className="text-text-muted text-[11px]">hisse</span>
                </div>
                <div className="glass-card px-6 py-4 flex flex-col gap-1 min-w-[150px] glow-cyan">
                  <span className="text-text-muted text-xs font-medium">Son Haberler</span>
                  <span className="text-2xl font-bold text-white">{news.length}</span>
                  <span className="text-accent-cyan text-[11px]" style={{ color: '#26C6DA' }}>son 7 gün</span>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Feature Grid ─────────────────────────────────────────────────── */}
      <section className="mb-8">
        <h2 className="text-lg font-bold text-white mb-4">Özellikler</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {features.map((f) => (
            <Link
              key={f.href}
              href={f.href}
              className={`glass-card p-4 flex flex-col gap-3 transition-all duration-200 hover:scale-[1.02] hover:border-white/15 group ${glowClass[f.accent]}`}
              style={{ textDecoration: 'none' }}
            >
              {/* Icon circle */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200 group-hover:scale-110"
                style={{
                  background: `${accentColor[f.accent]}18`,
                  border: `1px solid ${accentColor[f.accent]}30`,
                  color: accentColor[f.accent],
                }}
              >
                {f.icon}
              </div>

              <div className="flex flex-col gap-1 min-w-0">
                <span
                  className="text-sm font-semibold leading-snug"
                  style={{ color: accentColor[f.accent] }}
                >
                  {f.title}
                </span>
                <span className="text-text-muted text-xs leading-relaxed line-clamp-2">
                  {f.desc}
                </span>
              </div>

              {/* Arrow */}
              <div className="mt-auto flex items-center gap-1" style={{ color: accentColor[f.accent] }}>
                <span className="text-[11px] font-medium opacity-70">İncele</span>
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={1.8} className="w-3 h-3 opacity-70 group-hover:translate-x-0.5 transition-transform">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4 4 4-4 4" />
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── AdBanner ─────────────────────────────────────────────────────── */}
      <div className="mb-8">
        <AdBanner slot="4045086866" format="horizontal" />
      </div>

      {/* ── Latest News Preview ──────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-white">Son Haberler</h2>
            {!loading && (
              <span
                className="badge"
                style={{ background: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.2)' }}
              >
                <span className="pulse-dot" style={{ background: '#4CAF50' }} />
                Canlı
              </span>
            )}
          </div>
          <Link
            href="/kap-haberler"
            className="flex items-center gap-1 text-sm font-medium transition-colors"
            style={{ color: '#4CAF50' }}
          >
            Tümünü Gör
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4 4 4-4 4" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-col gap-3">
          {loading ? (
            Array.from({ length: 5 }).map((_, i) => <NewsSkeleton key={i} />)
          ) : latestNews.length === 0 ? (
            <div className="glass-card p-8 flex flex-col items-center gap-3 text-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} className="w-10 h-10 text-text-muted opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <p className="text-text-muted text-sm">Şu an haber bulunamadı.</p>
            </div>
          ) : (
            latestNews.map((item) => {
              const timeStr = item.sent_at ?? item.created_at;
              const preview = cleanText(item.text).slice(0, 150);
              return (
                <div
                  key={item.id}
                  className="glass-card p-4 flex flex-col gap-2 transition-all duration-150 hover:border-white/12 hover:bg-white/[0.025]"
                >
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`badge ${sourceBadgeColor(item.source)}`}>
                      {sourceLabel(item.source)}
                    </span>
                    {timeStr && (
                      <span className="text-text-muted text-[11px]">
                        {formatTime(timeStr)}
                      </span>
                    )}
                  </div>
                  <p className="text-text-secondary text-sm leading-relaxed line-clamp-2">
                    {preview}
                    {preview.length >= 150 && (
                      <span className="text-text-muted">...</span>
                    )}
                  </p>
                </div>
              );
            })
          )}
        </div>

        {!loading && latestNews.length > 0 && (
          <div className="mt-4 flex justify-center">
            <Link
              href="/kap-haberler"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-150 border hover:scale-[1.01]"
              style={{
                background: 'rgba(76,175,80,0.08)',
                borderColor: 'rgba(76,175,80,0.2)',
                color: '#4CAF50',
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

      {/* ── AppStoreBanner ───────────────────────────────────────────────── */}
      <AppStoreBanner />
    </div>
  );
}
