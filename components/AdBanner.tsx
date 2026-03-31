'use client';

import { useEffect, useRef } from 'react';

type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle';

interface AdBannerProps {
  slot: string;
  format?: AdFormat;
  className?: string;
}

// Minimum heights per format so the container doesn't collapse
const FORMAT_MIN_HEIGHT: Record<AdFormat, number> = {
  auto: 90,
  horizontal: 90,    // leaderboard 728x90, mobile 320x50
  vertical: 600,     // skyscraper
  rectangle: 250,    // medium rectangle 300x250
};

// Tailwind-friendly wrapper sizing per format
const FORMAT_WRAPPER_CLASS: Record<AdFormat, string> = {
  auto: 'w-full',
  horizontal: 'w-full max-w-[728px] mx-auto',
  vertical: 'w-[160px]',
  rectangle: 'w-[300px]',
};

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== 'undefined') {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch {
      // AdSense not loaded (dev / ad blocker)
    }
  }, []);

  return (
    <div
      className={[
        'ad-container',
        FORMAT_WRAPPER_CLASS[format],
        className,
      ].join(' ')}
      style={{ minHeight: FORMAT_MIN_HEIGHT[format] }}
      aria-label="Reklam alanı"
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: '100%' }}
        data-ad-client="ca-pub-4684027780055868"
        data-ad-slot={slot}
        data-ad-format={format === 'rectangle' ? 'rectangle' : format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive={format === 'horizontal' || format === 'auto' ? 'true' : 'false'}
      />

      {/* Placeholder shown before ad loads (hidden once ad fills) */}
      <noscript>
        <div className="flex flex-col items-center justify-center gap-1 text-text-muted text-xs py-4 px-6 text-center">
          <svg className="w-5 h-5 opacity-40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M13.5 12h.008v.008H13.5V12zm-4.5 4.5h.008v.008H9v-.008zm8.25-6h.008v.008h-.008V10.5z" />
          </svg>
          <span>Reklam alanı</span>
        </div>
      </noscript>
    </div>
  );
}
