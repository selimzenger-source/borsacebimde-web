'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

const STORE_LINKS = {
  android: 'https://play.google.com/store/apps/details?id=com.bistfinans.app',
  ios: 'https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446?l=tr',
};

const FEATURES = [
  { emoji: '🔔', text: 'Anlık KAP Bildirimleri' },
  { emoji: '📊', text: 'Halka Arz Takibi' },
  { emoji: '🤖', text: 'AI Haber Analizi' },
  { emoji: '📈', text: 'Tavan / Taban' },
  { text: 'Tamamen Ücretsiz' },
];

const BANNERS = [
  {
    title: 'AI Destekli KAP Haberleri',
    desc: 'Yapay zekâ ile analiz edilmiş KAP bildirimleri anında cebinizde',
    color: 'rgba(16,185,129,0.12)',
    border: 'rgba(16,185,129,0.25)',
    icon: '\u{1F916}',
  },
  {
    title: 'Halka Arz Takvimi',
    desc: 'Tüm halka arzları takip edin, bildirim alın, fırsat kaçırmayın',
    color: 'rgba(59,130,246,0.12)',
    border: 'rgba(59,130,246,0.25)',
    icon: '\u{1F4CA}',
  },
  {
    title: 'Tavan & Taban Hisseleri',
    desc: 'Günün tavan ve taban hisseleri ve sebepleri',
    color: 'rgba(245,158,11,0.12)',
    border: 'rgba(245,158,11,0.25)',
    icon: '\u{1F680}',
  },
  {
    title: 'Piyasa Haberleri',
    desc: 'Güncel ekonomi ve borsa haberleri, SPK bülten analizleri',
    color: 'rgba(168,85,247,0.12)',
    border: 'rgba(168,85,247,0.25)',
    icon: '\u{1F4F0}',
  },
];

export default function IndirPage() {
  const [activeBanner, setActiveBanner] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Banner otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveBanner((prev) => (prev + 1) % BANNERS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  // Header/Footer/AdBanner gizle
  useEffect(() => {
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const wrapper = document.querySelector('.max-w-6xl');
    if (header) (header as HTMLElement).style.display = 'none';
    if (footer) (footer as HTMLElement).style.display = 'none';
    if (wrapper) {
      (wrapper as HTMLElement).style.maxWidth = 'none';
      (wrapper as HTMLElement).style.padding = '0';
      (wrapper as HTMLElement).style.paddingTop = '0';
    }
    document.querySelectorAll('.ad-sidebar, ins.adsbygoogle, [class*="cookie"], [class*="Cookie"]').forEach((el) => {
      (el as HTMLElement).style.display = 'none';
    });
    return () => {
      if (header) (header as HTMLElement).style.display = '';
      if (footer) (footer as HTMLElement).style.display = '';
      if (wrapper) {
        (wrapper as HTMLElement).style.maxWidth = '';
        (wrapper as HTMLElement).style.padding = '';
        (wrapper as HTMLElement).style.paddingTop = '';
      }
    };
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'linear-gradient(165deg, #040d1a 0%, #0B1120 40%, #0f1d2e 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 20px',
        overflowY: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
        {/* Ambient glow */}
        <div
          style={{
            position: 'absolute',
            top: -120,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 400,
            height: 400,
            background: 'radial-gradient(circle, rgba(34,197,94,0.12) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
        />

        {/* Web sitesine git */}
        <a
          href="https://borsacebimde.app"
          style={{
            marginTop: 14,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 999,
            background: 'rgba(34,197,94,0.08)',
            border: '1px solid rgba(34,197,94,0.25)',
            color: '#4ade80',
            fontSize: 12,
            fontWeight: 500,
            textDecoration: 'none',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
            transition: 'all 0.3s',
          }}
        >
          <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5a17.92 17.92 0 01-8.716-2.247m0 0A9 9 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
          borsacebimde.app
          <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </a>

        {/* Logo */}
        <div
          style={{
            marginTop: 14,
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.1s',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: -10,
              background: 'radial-gradient(circle, rgba(34,197,94,0.2) 0%, transparent 70%)',
              borderRadius: '50%',
              filter: 'blur(18px)',
            }}
          />
          <Image
            src="/images/icon-512.png"
            alt="Borsa Cebimde"
            width={80}
            height={80}
            style={{
              borderRadius: 22,
              position: 'relative',
              boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 60px rgba(34,197,94,0.1)',
            }}
            priority
          />
        </div>

        {/* App name */}
        <h1
          style={{
            marginTop: 10,
            fontSize: 24,
            fontWeight: 700,
            background: 'linear-gradient(135deg, #4ade80, #22d3ee)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}
        >
          Borsa Cebimde
        </h1>

        <p
          style={{
            marginTop: 3,
            fontSize: 12,
            color: '#94A3B8',
            textAlign: 'center',
            maxWidth: 280,
            lineHeight: 1.4,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s 0.3s',
          }}
        >
          Halka Arz, KAP Haberleri, AI Analiz ve Borsa Takibi
        </p>

        {/* Feature pills */}
        <div
          style={{
            marginTop: 12,
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: 5,
            maxWidth: 340,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s 0.35s',
          }}
        >
          {FEATURES.map((f, i) => (
            <span
              key={i}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 3,
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontSize: 11,
                color: '#CBD5E1',
                whiteSpace: 'nowrap',
              }}
            >
              {f.emoji && <span>{f.emoji}</span>} {f.text}
            </span>
          ))}
        </div>

        {/* Animated banners */}
        <div
          style={{
            marginTop: 14,
            width: '100%',
            maxWidth: 340,
            height: 76,
            position: 'relative',
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s 0.4s',
          }}
        >
          {BANNERS.map((b, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                padding: '12px 16px',
                borderRadius: 14,
                background: `linear-gradient(135deg, ${b.color}, rgba(0,0,0,0.05))`,
                border: `1px solid ${b.border}`,
                opacity: activeBanner === i ? 1 : 0,
                transform: activeBanner === i ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.97)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
                pointerEvents: activeBanner === i ? 'auto' : 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 18 }}>{b.icon}</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#F1F5F9' }}>{b.title}</span>
              </div>
              <p style={{ fontSize: 11, color: '#94A3B8', lineHeight: 1.4, margin: 0 }}>{b.desc}</p>
            </div>
          ))}

          {/* Dots */}
          <div
            style={{
              position: 'absolute',
              bottom: -14,
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: 5,
            }}
          >
            {BANNERS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveBanner(i)}
                style={{
                  width: activeBanner === i ? 16 : 5,
                  height: 5,
                  borderRadius: 3,
                  background: activeBanner === i ? '#4ade80' : 'rgba(255,255,255,0.15)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </div>

        {/* Download buttons */}
        <div
          style={{
            marginTop: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            width: '100%',
            maxWidth: 300,
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s',
          }}
        >
          {/* Android */}
          <a
            href={STORE_LINKS.android}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '14px 20px',
              borderRadius: 14,
              background: 'linear-gradient(135deg, #16a34a, #22c55e)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(34,197,94,0.3), 0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.2s',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.523 2.237a.625.625 0 00-.855.216L15.2 4.88C14.207 4.414 13.124 4.15 12 4.15c-1.124 0-2.207.264-3.2.73L7.332 2.453a.625.625 0 10-1.071.645L7.67 5.392A7.95 7.95 0 004 12h16a7.95 7.95 0 00-3.67-6.608l1.409-2.294a.625.625 0 00-.216-.861zM9 9.5a1 1 0 110-2 1 1 0 010 2zm6 0a1 1 0 110-2 1 1 0 010 2zM4 13v7a2 2 0 002 2h12a2 2 0 002-2v-7H4z" />
            </svg>
            Google Play&apos;den İndir
          </a>

          {/* iOS */}
          <a
            href={STORE_LINKS.ios}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              padding: '14px 20px',
              borderRadius: 14,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#F1F5F9',
              fontSize: 15,
              fontWeight: 600,
              textDecoration: 'none',
              backdropFilter: 'blur(12px)',
              transition: 'all 0.2s',
            }}
          >
            <svg width="18" height="20" viewBox="0 0 384 512" fill="currentColor">
              <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
            </svg>
            App Store&apos;dan İndir
          </a>
        </div>

        {/* Rating */}
        <div
          style={{
            marginTop: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            opacity: isVisible ? 1 : 0,
            transition: 'opacity 0.5s 0.6s',
          }}
        >
          <div style={{ display: 'flex', gap: 2 }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill="#FBBF24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <span style={{ fontSize: 11, color: '#64748B' }}>Ücretsiz & Reklamsız Deneyim</span>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          paddingTop: 12,
          paddingBottom: 14,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.5s 0.7s',
        }}
      >
        <span style={{ fontSize: 10, color: '#475569' }}>
          Borsa Cebimde &copy; {new Date().getFullYear()}
        </span>
        <span style={{ fontSize: 9, color: '#334155', textAlign: 'center', maxWidth: 260, lineHeight: 1.4 }}>
          Bu uygulama yatırım tavsiyesi içermez. Yatırım kararları tamamen kullanıcının sorumluluğundadır.
        </span>
      </div>

      <style jsx>{`
        a:hover {
          transform: scale(1.02);
        }
        a:active {
          transform: scale(0.98);
        }
      `}</style>
    </div>
  );
}
