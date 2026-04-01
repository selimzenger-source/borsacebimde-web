'use client';

import { useEffect, useRef, useState } from 'react';

type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle' | 'in-article' | 'in-feed' | 'multiplex';

interface AdBannerProps {
  slot: string;
  format?: AdFormat;
  layoutKey?: string;
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export default function AdBanner({ slot, format = 'auto', layoutKey, className = '' }: AdBannerProps) {
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

  // Build ad attributes based on format
  const adProps: Record<string, string> = {
    'data-ad-client': 'ca-pub-4684027780055868',
    'data-ad-slot': slot,
  };

  let adStyle: React.CSSProperties = { display: 'block', width: '100%' };

  if (format === 'in-article') {
    adProps['data-ad-layout'] = 'in-article';
    adProps['data-ad-format'] = 'fluid';
    adStyle = { display: 'block', textAlign: 'center' };
  } else if (format === 'in-feed') {
    adProps['data-ad-format'] = 'fluid';
    if (layoutKey) {
      adProps['data-ad-layout-key'] = layoutKey;
    }
  } else if (format === 'multiplex') {
    adProps['data-ad-format'] = 'autorelaxed';
  } else {
    adProps['data-ad-format'] = format === 'rectangle' ? 'rectangle' : format === 'vertical' ? 'vertical' : 'auto';
    adProps['data-full-width-responsive'] = (format === 'horizontal' || format === 'auto') ? 'true' : 'false';
  }

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
        style={adStyle}
        {...adProps}
      />
    </div>
  );
}
