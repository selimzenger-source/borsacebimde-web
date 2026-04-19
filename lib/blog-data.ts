export interface StaticBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export interface ApiBlogPost {
  id: number;
  slug: string;
  title: string;
  content: string;
  meta_description: string | null;
  cover_image_url: string | null;
  category: string;
  author_name: string;
  published_at: string | null;
  created_at: string | null;
}


const API_BASE = 'https://sz-bist-finans-api.onrender.com';

export async function fetchAllBlogs(): Promise<ApiBlogPost[]> {
  // Render build container'da API cold start olabilir — retry + uzun timeout.
  const MAX_ATTEMPTS = 3;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 45000); // 45s timeout
      const res = await fetch(`${API_BASE}/api/v1/public/blogs`, {
        cache: 'force-cache',
        signal: controller.signal,
        headers: {
          'User-Agent': 'borsacebimde-web-build/1.0',
          'Accept': 'application/json',
        },
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const count = Array.isArray(data) ? data.length : 0;
        console.log(`[blog-data] fetchAllBlogs (attempt ${attempt}): ${count} blog`);
        if (count > 0) return data;
        // 0 bloglu cevap — retry
        console.warn(`[blog-data] Bos response, retry ${attempt}/${MAX_ATTEMPTS}`);
      } else {
        console.warn(`[blog-data] fetchAllBlogs HTTP ${res.status} (attempt ${attempt})`);
      }
    } catch (e: any) {
      console.error(`[blog-data] fetchAllBlogs hata (attempt ${attempt}):`, e?.message || e);
    }
    // Retry'dan once bekle (cold start icin)
    if (attempt < MAX_ATTEMPTS) {
      await new Promise((r) => setTimeout(r, 5000));
    }
  }
  return [];
}

export async function fetchBlogBySlug(slug: string): Promise<ApiBlogPost | null> {
  try {
    const res = await fetch(`${API_BASE}/api/v1/public/blogs/${slug}`, {
      cache: 'force-cache',
    });
    if (res.ok) return await res.json();
  } catch {
    // API unreachable
  }
  return null;
}
