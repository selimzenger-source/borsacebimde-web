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
  ipo_price: string | null;
  total_lots: number | null;
  offering_size_tl: string | null;
  discount_pct: string | null;
  distribution_method: string | null;
  market_segment: string | null;
  public_float_pct: string | null;
  spk_bulletin_no: string | null;
  spk_approval_date: string | null;
  subscription_start: string | null;
  subscription_end: string | null;
  subscription_hours: string | null;
  trading_start: string | null;
  trading_day_count: number;
  status: string;
  close_price?: number | null;
  percent_change?: number | null;
  estimated_lots_per_person: number | null;
  total_applicants: number | null;
  katilim_endeksi: string | null;
  participation_method: string | null;
  created_at: string | null;
}

export interface SPKApplication {
  id: number;
  company_name: string;
  existing_capital: string | null;
  new_capital: string | null;
  capital_increase_paid: string | null;
  capital_increase_free: string | null;
  existing_share_sale: string | null;
  additional_share_sale: string | null;
  sale_price: string | null;
  application_date: string | null;
  notes: string | null;
  status: string;
  created_at: string | null;
}

export interface DailyMarketStat {
  id: number;
  ticker: string;
  date: string;
  close_price: number;
  percent_change: number;
  is_ceiling: boolean;
  is_floor: boolean;
  consecutive_ceiling_count: number;
  consecutive_floor_count: number;
  monthly_ceiling_count: number;
  monthly_floor_count: number;
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

export interface KapDisclosure {
  id: number;
  company_code: string;
  title: string;
  category: string | null;
  is_bilanco: boolean;
  kap_url: string | null;
  published_at: string | null;
  ai_sentiment: 'Olumlu' | 'Olumsuz' | 'Notr' | null;
  ai_impact_score: number | null;
  ai_summary: string | null;
  created_at: string | null;
}

// ─── IPO Detail types ────────────────────────────────────────────────────────

export interface IPOCeilingTrack {
  id: number;
  trading_day: number;
  trade_date: string | null;
  open_price: number | null;
  close_price: number | null;
  high_price: number | null;
  low_price: number | null;
  hit_ceiling: boolean;
  hit_floor: boolean;
  durum: string | null;
  pct_change: number | null;
  cumulative_edo_pct: number | null;
  gunluk_adet: number | null;
  senet_sayisi: number | null;
  alis_lot: number | null;
  satis_lot: number | null;
}

export interface IPOBroker {
  id: number;
  broker_name: string;
  broker_type: string | null;
  is_rejected: boolean;
  application_url: string | null;
  phone: string | null;
}

export interface IPOAllocation {
  id: number;
  group_name: string;
  allocation_pct: number | null;
  allocated_lots: number | null;
  participant_count: number | null;
  avg_lot_per_person: number | null;
}

export interface IPODetail extends IPO {
  logo_url: string | null;
  lead_broker: string | null;
  participation_description: string | null;
  kap_notification_url: string | null;
  prospectus_url: string | null;
  spk_bulletin_url: string | null;
  ceiling_tracking_active: boolean;
  first_day_close_price: number | null;
  ceiling_broken: boolean;
  ceiling_broken_at: string | null;
  ai_report: string | null;
  capital_increase_lots: number | null;
  partner_sale_lots: number | null;
  expected_trading_date: string | null;
  allocation_announced: boolean;
  ceiling_tracks: IPOCeilingTrack[];
  brokers: IPOBroker[];
  allocations: IPOAllocation[];
}

export const api = {
  getNewsFeed: (days = 30, limit = 100, source?: string) =>
    fetchAPI<NewsFeedItem[]>('/api/v1/public/news-feed', { days, limit, ...(source ? { source } : {}) }),

  getIPOs: () =>
    fetchAPI<IPO[]>('/api/v1/ipos/'),

  getDailyMarketStats: (days = 30) =>
    fetchAPI<DailyMarketStat[]>('/api/v1/public/daily-market-stats', { days }),

  getViopTweets: (days = 5) =>
    fetchAPI<ViopTweet[]>('/api/v1/public/viop-night-session', { days }),

  getSpkBulletins: (limit = 30) =>
    fetchAPI<SpkBulletinAnalysis[]>('/api/v1/public/spk-bulletin-analyses', { limit }),

  getKapDisclosures: (params?: { hours?: number; ticker?: string; min_score?: number; max_score?: number; limit?: number; offset?: number }) =>
    fetchAPI<KapDisclosure[]>('/api/v1/kap-all-disclosures', params as Record<string, string | number>),

  getIPODetail: (id: number) =>
    fetchAPI<IPODetail>(`/api/v1/ipos/${id}`),

  getSPKApplications: () =>
    fetchAPI<SPKApplication[]>('/api/v1/ipos/spk-applications'),
};

/** Tweet text temizle */
export function cleanText(text: string): string {
  return text
    // KAP linkleri hariç URL'leri sil
    .replace(/https?:\/\/(?!(?:www\.)?kap\.org\.tr)\S+/g, '')
    // # işaretini kaldır ama ticker kodunu koru (#THYAO → THYAO)
    .replace(/#(\w+)/g, '$1')
    .replace(/@\w+/g, '')
    .replace(/📲?\s*(Detaylar\s*görselde|Android|szalgo)[^\n]*/gi, '')
    .replace(/🍏?\s*iOS:?[^\n]*/gi, '')
    .replace(/szalgo\.net\.tr/gi, '')
    .replace(/T[üu]m bildirim[^\n]*/gi, '')
    .replace(/uygulamamız[ıi][^\n]*/gi, '')
    // Disclaimer satırları
    .replace(/Her \d+ haberden[^\n]*/gi, '')
    .replace(/YT de[ğg]ildir[^\n]*/gi, '')
    .replace(/yat[ıi]r[ıi]m tavsiyesi[^\n]*/gi, '')
    // Boş KAP: satırını sil (URL olmadan kalan)
    .replace(/📎?\s*KAP\s*:\s*$/gm, '')
    .replace(/\bKAP\s*:\s*$/gm, '')
    .replace(/[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F000}-\u{1F02F}\u{1F0A0}-\u{1F0FF}\u{200D}\u{20E3}\u{FE0F}]/gu, '')
    .replace(/\n{3,}/g, '\n\n')
    .replace(/[ \t]+/g, ' ')
    .trim();
}

/** Kaynak etiketleri */
export function sourceLabel(source: string): string {
  const map: Record<string, string> = {
    kap_news: 'KAP Pozitif Haber',
    bist30: 'KAP Pozitif Haber',
    tweet_kap_news: 'KAP Pozitif Haber',
    tweet_daily_tracking: 'Günlük Takip',
    tweet_market_snapshot: 'Piyasa Özeti',
    bot_proxy: 'Haber',
    morning_market_report: 'Sabah Raporu',
    evening_market_report: 'Akşam Raporu',
    market_close_tavan: 'Tavan Kapanış',
    market_close_taban: 'Taban Kapanış',
    reply_disclaimer: 'Uyarı',
    kap: 'KAP',
    kap_ai: 'KAP AI',
    telegram: 'Telegram',
    bloomberg: 'Bloomberg',
    uzmanpara: 'Uzmanpara',
    bigpara: 'BigPara',
    news_scanner: 'Haber',
    tweet_bist30_news: 'Haber',
    tweet_spk_application: 'SPK Başvuru',
    tweet_spk_bulletin: 'SPK Bülten',
  };
  return map[source] ?? source;
}

/** Kaynak badge stili */
export function sourceBadgeStyle(source: string): React.CSSProperties {
  const map: Record<string, React.CSSProperties> = {
    kap_news: { background: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' },
    bist30: { background: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' },
    tweet_kap_news: { background: 'rgba(76,175,80,0.12)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' },
    tweet_daily_tracking: { background: 'rgba(76,175,80,0.1)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' },
    tweet_market_snapshot: { background: 'rgba(38,198,218,0.1)', color: '#26C6DA', border: '1px solid rgba(38,198,218,0.25)' },
    bot_proxy: { background: 'rgba(38,198,218,0.1)', color: '#26C6DA', border: '1px solid rgba(38,198,218,0.25)' },
    morning_market_report: { background: 'rgba(41,121,255,0.1)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.25)' },
    evening_market_report: { background: 'rgba(41,121,255,0.1)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.25)' },
    market_close_tavan: { background: 'rgba(76,175,80,0.1)', color: '#4CAF50', border: '1px solid rgba(76,175,80,0.25)' },
    market_close_taban: { background: 'rgba(255,82,82,0.1)', color: '#FF5252', border: '1px solid rgba(255,82,82,0.25)' },
    news_scanner: { background: 'rgba(38,198,218,0.1)', color: '#26C6DA', border: '1px solid rgba(38,198,218,0.25)' },
    tweet_bist30_news: { background: 'rgba(38,198,218,0.1)', color: '#26C6DA', border: '1px solid rgba(38,198,218,0.25)' },
    tweet_spk_application: { background: 'rgba(255,152,0,0.12)', color: '#FF9800', border: '1px solid rgba(255,152,0,0.25)' },
    tweet_spk_bulletin: { background: 'rgba(156,39,176,0.12)', color: '#AB47BC', border: '1px solid rgba(156,39,176,0.25)' },
  };
  return map[source] ?? { background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' };
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
