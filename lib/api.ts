const API_BASE = 'https://sz-bist-finans-api.onrender.com';

async function fetchAPI<T>(path: string, params?: Record<string, string | number>): Promise<T> {
  const url = new URL(path, API_BASE);
  if (params) {
    Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  }
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export interface NewsFeedItem {
  id: number;
  text: string;
  image_url: string | null;
  source: string;
  sent_at: string | null;
  created_at: string | null;
}

export interface IPO {
  id: number;
  company_name: string;
  ticker: string | null;
  share_price: number | null;
  lot_count: number | null;
  start_date: string | null;
  end_date: string | null;
  valuation_tl: number | null;
  status: string;
  spk_status: string | null;
  first_trading_date: string | null;
  close_price: number | null;
  percent_change: number | null;
  created_at: string | null;
}

export interface DailyMarketStat {
  id: number;
  ticker: string;
  date: string;
  close_price: number;
  percent_change: number;
  type: string;
  consecutive_ceiling_count: number;
  consecutive_floor_count: number;
  reason: string | null;
}

export interface ViopTweet {
  id: number;
  text: string;
  image_url: string | null;
  source: string;
  sent_at: string | null;
}

export interface SpkBulletinAnalysis {
  id: number;
  text: string;
  bulletin_no: string;
  image_url: string | null;
  source: string;
  sent_at: string | null;
}

export const api = {
  getNewsFeed: (days = 30, limit = 100) =>
    fetchAPI<NewsFeedItem[]>('/api/v1/public/news-feed', { days, limit }),

  getIPOs: () =>
    fetchAPI<IPO[]>('/api/v1/ipos/'),

  getDailyMarketStats: (days = 30) =>
    fetchAPI<DailyMarketStat[]>('/api/v1/public/daily-market-stats', { days }),

  getViopTweets: (days = 5) =>
    fetchAPI<ViopTweet[]>('/api/v1/public/viop-night-session', { days }),

  getSpkBulletins: (limit = 30) =>
    fetchAPI<SpkBulletinAnalysis[]>('/api/v1/public/spk-bulletin-analyses', { limit }),
};

/** Tweet text temizle */
export function cleanText(text: string): string {
  return text
    .replace(/https?:\/\/\S+/g, '')
    .replace(/#\w+/g, '')
    .replace(/@\w+/g, '')
    .replace(/📲?\s*(Detaylar\s*görselde|Android|szalgo)[^\n]*/gi, '')
    .replace(/🍏?\s*iOS:?[^\n]*/gi, '')
    .replace(/szalgo\.net\.tr/gi, '')
    .replace(/👇/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('tr-TR', {
    day: 'numeric', month: 'long', year: 'numeric',
  });
}

export function formatDateTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) +
    ' ' + d.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}

export function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
}
