const API_BASE = 'https://sz-bist-finans-api.onrender.com';

export async function fetchServer<T>(path: string, params?: Record<string, string | number>, revalidate = 300): Promise<T | null> {
  try {
    const url = new URL(path, API_BASE);
    if (params) {
      Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
    }
    const res = await fetch(url.toString(), { next: { revalidate } });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export const serverApi = {
  getIPOs: () => fetchServer<any[]>('/api/v1/ipos/', undefined, 300),
  getNewsFeed: (days = 7, limit = 20) => fetchServer<any[]>('/api/v1/public/news-feed', { days, limit }, 180),
  getDailyMarketStats: (days = 1) => fetchServer<any[]>('/api/v1/public/daily-market-stats', { days }, 120),
  getViopTweets: (days = 3) => fetchServer<any[]>('/api/v1/public/viop-night-session', { days }, 180),
  getSpkBulletins: (limit = 20) => fetchServer<any[]>('/api/v1/public/spk-bulletin-analyses', { limit }, 600),
  getKapDisclosures: (hours = 168, limit = 30) => fetchServer<any[]>('/api/v1/kap-all-disclosures', { hours, limit }, 180),
  getSPKApplications: () => fetchServer<any[]>('/api/v1/ipos/spk-applications', undefined, 600),
};
