'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { api, cleanText, formatTime, sourceLabel, sourceBadgeStyle, type NewsFeedItem, type DailyMarketStat, type ViopTweet, type SpkBulletinAnalysis, type KapDisclosure } from '@/lib/api';
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
  {
    href: '/spk-basvurular',
    title: 'SPK Başvurular',
    desc: 'SPK onayı bekleyen halka arz başvurularını görüntüleyin.',
    color: '#94A3B8',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

// ─── Skeleton Components ──────────────────────────────────────────────────────

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

// ─── Feed Section Component ─────────────────────────────────────────────────

function FeedSection<T>({
  title, href, color, icon, items, renderItem,
}: {
  title: string;
  href: string;
  color: string;
  icon: React.ReactNode;
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <Link
        href={href}
        className="flex items-center gap-2.5 mb-3 group"
        style={{ textDecoration: 'none' }}
      >
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: `${color}15`, border: `1px solid ${color}25`, color }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
            {icon}
          </svg>
        </div>
        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{title}</h2>
        <svg
          className="w-4 h-4 opacity-50 group-hover:translate-x-0.5 transition-transform"
          style={{ color }}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8h10m-4-4 4 4-4 4" />
        </svg>
      </Link>
      <div className="flex flex-col gap-2">
        {items.map((item, idx) => (
          <Link
            key={idx}
            href={href}
            className="card p-3 transition-all duration-150 hover:scale-[1.005]"
            style={{ textDecoration: 'none', borderLeft: `3px solid ${color}` }}
          >
            {renderItem(item)}
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [store, setStore] = useState(getStoreInfo());
  useEffect(() => { setStore(getStoreInfo()); }, []);

  // Section data
  const [viopTweets, setViopTweets] = useState<ViopTweet[]>([]);
  const [spkBulletins, setSpkBulletins] = useState<SpkBulletinAnalysis[]>([]);
  const [tavanTaban, setTavanTaban] = useState<DailyMarketStat[]>([]);
  const [piyasaNews, setPiyasaNews] = useState<NewsFeedItem[]>([]);
  const [kapAiNews, setKapAiNews] = useState<NewsFeedItem[]>([]);
  const [kapDisclosures, setKapDisclosures] = useState<KapDisclosure[]>([]);

  useEffect(() => {
    Promise.allSettled([
      api.getViopTweets(3),
      api.getSpkBulletins(20),
      api.getDailyMarketStats(3),
      api.getNewsFeed(7, 20, 'news_scanner'),
      api.getNewsFeed(7, 50),
      api.getKapDisclosures({ hours: 72, limit: 20 }),
    ]).then(([viopRes, spkRes, ttRes, piyasaRes, allNewsRes, kapRes]) => {
      if (viopRes.status === 'fulfilled') setViopTweets(viopRes.value.slice(0, 20));
      if (spkRes.status === 'fulfilled') setSpkBulletins(spkRes.value.slice(0, 20));
      if (ttRes.status === 'fulfilled') setTavanTaban(ttRes.value.slice(0, 20));
      if (piyasaRes.status === 'fulfilled') setPiyasaNews(piyasaRes.value.slice(0, 20));
      if (allNewsRes.status === 'fulfilled') {
        const kapItems = allNewsRes.value.filter(n => ['kap_news', 'bist30', 'tweet_kap_news'].includes(n.source));
        setKapAiNews(kapItems.slice(0, 20));
      }
      if (kapRes.status === 'fulfilled') setKapDisclosures(kapRes.value.slice(0, 20));
      setLoading(false);
    });
  }, []);

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

      {/* ── Son Güncellemeler — Bölüm Bölüm ────────────────────────────── */}
      {!loading && (
        <section className="mb-8 flex flex-col gap-8">

          {/* Piyasa Haberleri */}
          <FeedSection
            title="Piyasa Haberleri"
            href="/piyasa-haberleri"
            color="#26C6DA"
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />}
            items={piyasaNews}
            renderItem={(item) => {
              const cleaned = cleanText(item.text);
              const title = cleaned.split(/\n\n+/)[0] || '';
              return (
                <div className="flex items-start gap-3">
                  {item.image_url && (
                    <div className="shrink-0 w-16 h-12 rounded-lg overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
                      <img src={getImageUrl(item.image_url)!} alt="" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{title}</p>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{formatTime(item.sent_at ?? item.created_at ?? '')}</span>
                  </div>
                </div>
              );
            }}
          />

          {/* KAP AI Pozitif Haberler */}
          <FeedSection
            title="KAP Pozitif Haberler"
            href="/kap-ai"
            color="#FFD700"
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z" />}
            items={kapAiNews}
            renderItem={(item) => {
              const cleaned = cleanText(item.text);
              const title = cleaned.split(/\n\n+/)[0] || '';
              return (
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="badge" style={sourceBadgeStyle(item.source)}>{sourceLabel(item.source)}</span>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{formatTime(item.sent_at ?? item.created_at ?? '')}</span>
                  </div>
                  <p className="text-sm font-medium leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{title}</p>
                </div>
              );
            }}
          />

          <AdBanner slot="1823621352" format="horizontal" />

          {/* Tüm KAP Haber Merkezi */}
          <FeedSection
            title="Tüm KAP Bildirimler"
            href="/kap-tum-haberler"
            color="#FFD700"
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />}
            items={kapDisclosures}
            renderItem={(item) => {
              const sentimentColor = item.ai_sentiment === 'Olumlu' ? '#4CAF50' : item.ai_sentiment === 'Olumsuz' ? '#FF5252' : 'var(--text-muted)';
              return (
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-xs font-bold" style={{ color: '#FFD700' }}>{item.company_code}</span>
                    {item.ai_impact_score != null && (
                      <span className="text-[11px] font-semibold" style={{ color: item.ai_impact_score >= 7 ? '#4CAF50' : item.ai_impact_score >= 5 ? '#FFD700' : '#FF5252' }}>
                        {item.ai_impact_score.toFixed(1)}/10
                      </span>
                    )}
                    {item.ai_sentiment && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded font-semibold" style={{ background: `${sentimentColor}18`, color: sentimentColor }}>
                        {item.ai_sentiment}
                      </span>
                    )}
                  </div>
                  <p className="text-sm leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{item.title}</p>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{formatTime(item.published_at ?? item.created_at ?? '')}</span>
                </div>
              );
            }}
          />

          {/* Tavan Taban */}
          <FeedSection
            title="Tavan Taban"
            href="/tavan-taban"
            color="#4CAF50"
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />}
            items={tavanTaban}
            renderItem={(item) => (
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.ticker}</span>
                  {item.is_ceiling && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(76,175,80,0.15)', color: '#4CAF50' }}>TAVAN</span>}
                  {item.is_floor && <span className="text-[10px] px-1.5 py-0.5 rounded font-bold" style={{ background: 'rgba(255,82,82,0.15)', color: '#FF5252' }}>TABAN</span>}
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium" style={{ color: item.percent_change >= 0 ? '#4CAF50' : '#FF5252' }}>
                    {item.percent_change > 0 ? '+' : ''}{item.percent_change.toFixed(2)}%
                  </span>
                </div>
              </div>
            )}
          />

          {/* VİOP Gece Seansı */}
          <FeedSection
            title="VİOP Gece Seansı"
            href="/viop"
            color="#B388FF"
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />}
            items={viopTweets}
            renderItem={(item) => {
              const cleaned = cleanText(item.text);
              const title = cleaned.split(/\n\n+/)[0] || '';
              return (
                <div className="min-w-0">
                  <p className="text-sm leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{title}</p>
                  <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{formatTime(item.sent_at ?? '')}</span>
                </div>
              );
            }}
          />

          {/* SPK Bülten */}
          <FeedSection
            title="SPK Bülten Analizleri"
            href="/spk-bulten"
            color="#FF9800"
            icon={<path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />}
            items={spkBulletins}
            renderItem={(item) => {
              const cleaned = cleanText(item.text);
              const title = cleaned.split(/\n\n+/)[0] || '';
              return (
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-semibold" style={{ color: '#FF9800' }}>Bülten #{item.bulletin_no}</span>
                    <span className="text-[11px]" style={{ color: 'var(--text-muted)' }}>{formatTime(item.sent_at ?? '')}</span>
                  </div>
                  <p className="text-sm leading-snug line-clamp-2" style={{ color: 'var(--text-primary)' }}>{title}</p>
                </div>
              );
            }}
          />

        </section>
      )}

      {loading && (
        <section className="mb-8 flex flex-col gap-3">
          {Array.from({ length: 4 }).map((_, i) => <NewsSkeleton key={i} />)}
        </section>
      )}

      {/* ── Uygulama Banner ───────────────────────────────────────────────── */}
      <AppStoreBanner />
    </div>
  );
}
