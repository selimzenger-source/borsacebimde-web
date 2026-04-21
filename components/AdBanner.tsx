'use client';

type AdFormat = 'auto' | 'horizontal' | 'vertical' | 'rectangle' | 'in-article' | 'in-feed' | 'multiplex';

interface AdBannerProps {
  slot: string;
  format?: AdFormat;
  layoutKey?: string;
  className?: string;
}

// AUTO ADS MODE: Manuel slot'lar devre disi birakildi.
// AdSense basvuru/onay sureci icin: sayfalarda `<ins class="adsbygoogle">` slot kodu
// birakmiyoruz. Google Auto Ads kendi yerlesimi yapacak (head'deki adsbygoogle.js
// scripti global olarak yuklu, AdSense panelinden "Auto ads: ON" yapilinca aktif).
//
// Onay gelince/ek kontrol istenirse burayi eski haline cevir, JSX yerinde.
export default function AdBanner(_props: AdBannerProps) {
  return null;
}
