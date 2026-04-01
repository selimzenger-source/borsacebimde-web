const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bistfinans.app';
const APP_STORE_URL = 'https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446?l=tr';

export function getStoreInfo(): { url: string; label: string; isIOS: boolean } {
  if (typeof navigator === 'undefined') {
    return { url: PLAY_STORE_URL, label: 'Google Play', isIOS: false };
  }
  const ua = navigator.userAgent || '';
  const isIOS = /iPad|iPhone|iPod|Macintosh/.test(ua) && 'ontouchend' in document;
  return isIOS
    ? { url: APP_STORE_URL, label: 'App Store', isIOS: true }
    : { url: PLAY_STORE_URL, label: 'Google Play', isIOS: false };
}

export { PLAY_STORE_URL, APP_STORE_URL };
