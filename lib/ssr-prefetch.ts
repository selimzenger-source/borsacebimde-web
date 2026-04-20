// Build-time pre-fetch helpers — server-side rendering for Googlebot/AdSense.
// Tum sayfalar client-side fetch ediyor → Google bos shell goruyor.
// Bu dosya build aninda API'den veri ceker, sayfalar bu veriyi HTML'de
// server-side render eder. Boylece Google ham icerigi gorur.

const API_BASE = 'https://sz-bist-finans-api.onrender.com';
const DEFAULT_TIMEOUT = 30_000;

async function safeFetch<T>(url: string, fallback: T): Promise<T> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT);
    const res = await fetch(url, {
      cache: 'force-cache',
      signal: controller.signal,
      headers: { 'User-Agent': 'borsacebimde-build' },
    });
    clearTimeout(timer);
    if (!res.ok) return fallback;
    return (await res.json()) as T;
  } catch {
    return fallback;
  }
}

export interface SsrNewsItem {
  id: number;
  text?: string | null;
  title?: string | null;
  sent_at?: string | null;
  created_at?: string | null;
  source?: string | null;
  image_url?: string | null;
}

export async function fetchNewsFeedSSR(source?: string, limit = 60, days = 60) {
  const params = new URLSearchParams({ days: String(days), limit: String(limit) });
  if (source) params.set('source', source);
  return safeFetch<SsrNewsItem[]>(`${API_BASE}/api/v1/public/news-feed?${params}`, []);
}

export interface SsrIpoItem {
  id?: number;
  ticker?: string | null;
  company_name?: string | null;
  price?: number | null;
  ipo_price?: number | null;
  lot?: number | null;
  total_lots?: number | null;
  min_lot?: number | null;
  max_lot?: number | null;
  offering_size_tl?: number | null;
  public_float_pct?: number | null;
  discount_pct?: number | null;
  start_date?: string | null;
  end_date?: string | null;
  subscription_start?: string | null;
  subscription_end?: string | null;
  trading_date?: string | null;
  trading_start?: string | null;
  status?: string | null;
  broker?: string | null;
  distribution_method?: string | null;
  market_segment?: string | null;
  katilim_endeksi?: string | null;
  spk_approval_date?: string | null;
  spk_bulletin_no?: string | null;
  prospectus_url?: string | null;
  total_applicants?: number | null;
  estimated_lots_per_person?: number | null;
  ai_report?: any;
  prospectus_analysis?: any;
  // Detay endpoint ek alanlari
  company_description?: string | null;
  fund_usage?: any;
  lead_broker?: string | null;
  first_day_close_price?: string | number | null;
  ceiling_broken?: boolean | null;
  ceiling_broken_at?: string | null;
  lock_up_period_days?: number | null;
  capital_increase_lots?: number | null;
  partner_sale_lots?: number | null;
  trading_day_count?: number | null;
  high_from_start?: number | null;
  allocations?: Array<{
    group_name?: string;
    allocation_pct?: string | number;
    allocated_lots?: number;
    participants?: number;
    lots_per_person?: number | string;
  }>;
  ceiling_tracks?: Array<{
    trading_day?: number;
    trade_date?: string;
    close_price?: string | number;
    pct_change?: string | number;
    durum?: string;
    cumulative_edo_pct?: string | number;
    hit_ceiling?: boolean;
    hit_floor?: boolean;
  }>;
  brokers?: Array<{
    broker_name?: string;
    broker_type?: string;
  }>;
}

export async function fetchIposSSR() {
  const list = await safeFetch<SsrIpoItem[]>(`${API_BASE}/api/v1/ipos`, []);
  if (!list || list.length === 0) return list;

  // Aktif IPO'lar (trading/in_distribution/awaiting_trading) icin detay cek — paralel.
  // Pasif (completed/archived) icin detay cekmeye gerek yok, liste alani zaten yeter.
  const active = list.filter((i) =>
    ['trading', 'in_distribution', 'awaiting_trading', 'newly_approved'].includes(i.status || ''),
  );
  const details = await Promise.all(
    active.map((i) =>
      i.id
        ? safeFetch<SsrIpoItem | null>(`${API_BASE}/api/v1/ipos/${i.id}`, null)
        : Promise.resolve(null),
    ),
  );
  const byId = new Map<number, SsrIpoItem>();
  details.forEach((d) => {
    if (d && d.id) byId.set(d.id, d);
  });
  return list.map((i) => (i.id && byId.has(i.id) ? { ...i, ...byId.get(i.id)! } : i));
}

export interface SsrKurumOneri {
  id: number;
  ticker: string;
  company_name?: string | null;
  institution_name: string;
  recommendation?: string | null;
  target_price?: number | null;
  current_price?: number | null;
  potential_return?: number | null;
  created_at?: string | null;
  ai_comment?: string | null;
}

export async function fetchKurumOnerileriSSR(limit = 30) {
  // period=month: daha zengin icerik (today/week cok az)
  const data = await safeFetch<{ items?: SsrKurumOneri[] } | SsrKurumOneri[]>(
    `${API_BASE}/api/v1/kurum-onerileri?period=month&limit=${limit}`,
    [],
  );
  if (Array.isArray(data)) return data;
  return data.items ?? [];
}

/** Haberlerden ilk paragraflari cikarip SEO-friendly blok ret.
 *  `title\n\nbody` formatini parse eder. */
export function parseNewsItem(item: SsrNewsItem): { title: string; body: string } {
  const text = (item.text || '').trim();
  const firstLine = text.split('\n')[0] || '';
  const rest = text.split('\n').slice(1).join('\n').trim();
  return {
    title: (item.title || firstLine).slice(0, 180),
    body: rest.slice(0, 600) || text.slice(0, 600),
  };
}

export function formatDate(iso?: string | null): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('tr-TR', { day: '2-digit', month: 'long', year: 'numeric' });
  } catch {
    return '';
  }
}
