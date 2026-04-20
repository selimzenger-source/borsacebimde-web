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
}

export async function fetchIposSSR() {
  // Trailing slash 307 redirect yapiyor — Next.js fetch bazen takip etmiyor
  return safeFetch<SsrIpoItem[]>(`${API_BASE}/api/v1/ipos`, []);
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
