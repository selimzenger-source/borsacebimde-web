'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getStoreInfo, PLAY_STORE_URL, APP_STORE_URL } from '@/lib/platform';

type PlatformKind = 'ios' | 'android' | 'desktop';

function detectPlatform(): PlatformKind {
  if (typeof window === 'undefined') return 'desktop';
  const ua = (navigator.userAgent || navigator.vendor || '').toLowerCase();
  if (/android/.test(ua)) return 'android';
  if (/iphone|ipad|ipod/.test(ua)) return 'ios';
  if (/mac/.test(ua) && (navigator as any).maxTouchPoints > 1) return 'ios';
  return 'desktop';
}

// Resmi Apple logosu
const AppleIcon = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" className="w-7 h-8">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
  </svg>
);

// Resmi Google Play üçgeni (4 renkli)
const GooglePlayIcon = () => (
  <svg viewBox="0 0 512 512" className="w-7 h-8" aria-hidden="true">
    <defs>
      <linearGradient id="asb-gp1" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00D4FF" />
        <stop offset="100%" stopColor="#0085FF" />
      </linearGradient>
      <linearGradient id="asb-gp2" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FFCE00" />
        <stop offset="100%" stopColor="#FFB700" />
      </linearGradient>
      <linearGradient id="asb-gp3" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#FF3A44" />
        <stop offset="100%" stopColor="#C70039" />
      </linearGradient>
      <linearGradient id="asb-gp4" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#00F076" />
        <stop offset="100%" stopColor="#00B956" />
      </linearGradient>
    </defs>
    <path fill="url(#asb-gp1)" d="M48 60v392c0 8 4 12 9 15l228-211L57 47c-5 3-9 8-9 13z" />
    <path fill="url(#asb-gp4)" d="M353 187l-49-28L75 50c-3-2-7-3-10-2l225 209 63-70z" />
    <path fill="url(#asb-gp3)" d="M65 464c4 1 8 0 10-2l229-110 49-28-63-70-225 210z" />
    <path fill="url(#asb-gp2)" d="M442 240l-89-52-63 70 63 70 89-52c25-14 25-22 0-36z" />
  </svg>
);

interface AppStoreBannerProps {
  message?: string;
}

const APP_STORE_BTN = (
  <a
    href={APP_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="App Store'dan indir"
    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-white transition-all hover:shadow-lg active:scale-95"
    style={{ background: '#000', border: '1px solid rgba(255,255,255,0.15)' }}
  >
    <AppleIcon />
    <div className="flex flex-col items-start leading-tight">
      <span className="text-[10px] opacity-85 tracking-wide">{'İ'}ndir</span>
      <span className="text-base font-semibold tracking-tight">App Store</span>
    </div>
  </a>
);

const PLAY_STORE_BTN = (
  <a
    href={PLAY_STORE_URL}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Google Play'den indir"
    className="inline-flex items-center gap-3 px-5 py-3 rounded-xl text-white transition-all hover:shadow-lg active:scale-95"
    style={{ background: '#000', border: '1px solid rgba(255,255,255,0.15)' }}
  >
    <GooglePlayIcon />
    <div className="flex flex-col items-start leading-tight">
      <span className="text-[10px] opacity-85 tracking-wide">{'İ'}ndir</span>
      <span className="text-base font-semibold tracking-tight">Google Play</span>
    </div>
  </a>
);

export default function AppStoreBanner({ message }: AppStoreBannerProps) {
  const [platform, setPlatform] = useState<PlatformKind>('desktop');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  return (
    <div
      className="card my-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(41,121,255,0.12) 0%, rgba(41,121,255,0.03) 50%, rgba(124,77,255,0.06) 100%)',
        borderColor: 'rgba(41,121,255,0.2)',
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-8">
        <div
          className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative"
          style={{
            boxShadow: '0 8px 32px rgba(41,121,255,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Image src="/images/icon-192.png" alt="Borsa Cebimde" fill className="object-contain p-1" />
        </div>

        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Daha fazlası için uygulamayı indirin
          </h3>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            {message || 'Anlık bildirimler, VIP içerikler ve hisse takibi - hepsi cebinizde.'}
          </p>

          {/* Sadece kullanicinin cihazina uygun butonu goster; masaustunde her ikisi */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            {platform === 'ios' && APP_STORE_BTN}
            {platform === 'android' && PLAY_STORE_BTN}
            {platform === 'desktop' && (
              <>
                {APP_STORE_BTN}
                {PLAY_STORE_BTN}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
