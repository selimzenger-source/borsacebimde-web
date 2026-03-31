'use client';

import { useEffect, useRef, useState } from 'react';

type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle';

interface AdBannerProps {
  slot: string;
  format?: AdFormat;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ slot, format = 'auto', className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    if (pushed.current) return;
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
        // Check if ad actually rendered after a short delay
        setTimeout(() => {
          if (adRef.current) {
            const ins = adRef.current;
            const hasContent = ins.offsetHeight > 0 && ins.innerHTML.trim().length > 0;
            setAdLoaded(hasContent);
          }
        }, 2000);
      }
    } catch {
      // AdSense not loaded
    }
  }, []);

  // Don't render anything visible if ad hasn't loaded
  // The ins tag is always present for AdSense to fill, but wrapper is invisible until filled
  return (
    <div
      className={className}
      style={{
        display: adLoaded ? 'block' : 'none',
        overflow: 'hidden',
      }}
    >
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: 'block', width: '100%' }}
        data-ad-client="ca-pub-4684027780055868"
        data-ad-slot={slot}
        data-ad-format={format === 'rectangle' ? 'rectangle' : format === 'vertical' ? 'vertical' : 'auto'}
        data-full-width-responsive={format === 'horizontal' || format === 'auto' ? 'true' : 'false'}
      />
    </div>
  );
}
