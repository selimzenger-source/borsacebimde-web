'use client';

import { useEffect, useState } from 'react';
import { getStoreInfo, PLAY_STORE_URL, APP_STORE_URL } from '@/lib/platform';

interface InlineAppBannerProps {
  title: string;
  message: string;
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] shrink-0">
    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
  </svg>
);

const AppleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px] shrink-0">
    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

export default function InlineAppBanner({ title, message }: InlineAppBannerProps) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(getStoreInfo().isIOS);
  }, []);

  const storeUrl = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
  const storeLabel = isIOS ? "App Store'dan Ücretsiz İndir" : "Google Play'den Ücretsiz İndir";
  const StoreIcon = isIOS ? AppleIcon : PlayIcon;

  return (
    <a
      href={storeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block no-underline my-5 p-4 sm:px-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_20px_rgba(41,121,255,0.15)]"
      style={{
        background: 'linear-gradient(135deg, rgba(41,121,255,0.15) 0%, rgba(124,77,255,0.10) 50%, rgba(41,121,255,0.08) 100%)',
        border: '1px solid rgba(41,121,255,0.25)',
      }}
    >
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Bell icon */}
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-white"
          style={{
            background: 'linear-gradient(135deg, #2979FF, #7C4DFF)',
            boxShadow: '0 4px 12px rgba(41,121,255,0.3)',
          }}
        >
          <BellIcon />
        </div>

        {/* Text */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold m-0 mb-0.5" style={{ color: 'var(--text-primary)' }}>
            {title}
          </p>
          <p className="text-xs m-0 leading-snug hidden sm:block" style={{ color: 'var(--text-secondary)' }}>
            {message}
          </p>
        </div>

        {/* Store button */}
        <div
          className="shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl text-white text-xs font-semibold whitespace-nowrap group-hover:brightness-110"
          style={{ background: '#2979FF' }}
        >
          <StoreIcon />
          <span className="hidden sm:inline">{storeLabel}</span>
          <span className="sm:hidden">İndir</span>
        </div>
      </div>
    </a>
  );
}
