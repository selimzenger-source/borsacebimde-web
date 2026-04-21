'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { api, type SPKApplication } from '@/lib/api';
import AdBanner from '@/components/AdBanner';

interface Props {
  initialApps?: SPKApplication[];
}

// Türkçe karakter normalizasyonu — "özova" ↔ "ozova" aramasını eşit yapsın
const normalize = (s: string) =>
  s
    .toLocaleLowerCase('tr-TR')
    .replace(/ı/g, 'i').replace(/ş/g, 's').replace(/ğ/g, 'g')
    .replace(/ü/g, 'u').replace(/ö/g, 'o').replace(/ç/g, 'c')
    .trim();

export default function SpkBasvurularContent({ initialApps }: Props = {}) {
  const [apps, setApps] = useState<SPKApplication[]>(initialApps || []);
  const [loading, setLoading] = useState(!initialApps || initialApps.length === 0);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (initialApps && initialApps.length > 0) return;
    api.getSPKApplications()
      .then(setApps)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [initialApps]);

  const q = normalize(query);
  const filteredApps = q
    ? apps.filter((a) =>
        normalize(a.company_name || '').includes(q) ||
        normalize(a.company_description || '').includes(q),
      )
    : apps;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* -- Header -- */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, rgba(255,152,0,0.08), var(--bg-primary))', borderColor: 'rgba(255,152,0,0.2)' }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(255,152,0,0.1) 0%, transparent 70%)' }} />
        <div className="relative">
          <Link
            href="/halka-arz"
            className="inline-flex items-center gap-1.5 mb-4 text-xs font-semibold transition-colors"
            style={{ color: '#FF9800' }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Halka Arz Merkezi
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
              style={{ background: 'rgba(255,152,0,0.15)', border: '1px solid rgba(255,152,0,0.3)' }}
            >
              <svg className="w-5 h-5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                SPK Onayı Beklenen Halka Arzlar
              </h1>
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                {loading
                  ? 'Yükleniyor...'
                  : q
                    ? `${filteredApps.length} / ${apps.length} sonuç`
                    : `${apps.length} başvuru bekliyor`}
              </p>
            </div>
          </div>

          {/* Arama */}
          <div className="relative mt-4">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
              style={{ color: 'var(--text-muted)' }}
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 10.5a7.5 7.5 0 0012.15 6.15z" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Şirket ara (örn. Özova, Golda, Kırlıoğlu...)"
              style={{
                width: '100%',
                padding: '10px 36px 10px 38px',
                borderRadius: 10,
                background: 'var(--bg-surface, rgba(15,23,42,0.4))',
                border: '1px solid rgba(255,152,0,0.25)',
                color: 'var(--text-primary)',
                fontSize: 14,
                outline: 'none',
              }}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Temizle"
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', cursor: 'pointer', padding: 4,
                  color: 'var(--text-muted)',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* -- Loading -- */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="card p-4 flex flex-col gap-3">
              <div className="skeleton h-5 w-48 rounded" />
              <div className="skeleton h-4 w-32 rounded" />
            </div>
          ))}
        </div>
      )}

      {/* -- List -- */}
      {!loading && filteredApps.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {filteredApps.map((app, idx) => (
            <div key={app.id}>
              {idx > 0 && idx % 10 === 0 && (
                <div style={{ marginBottom: 8 }}>
                  <AdBanner slot="6884376342" format="in-feed" layoutKey="-ef+6k-30-ac+ty" />
                </div>
              )}
              <div
                className="card p-4"
                style={{ border: '1px solid rgba(148,163,184,0.1)', borderLeft: '3px solid #FF9800' }}
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h4 className="text-sm font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                    {app.company_name}
                  </h4>
                  <span
                    className="shrink-0 px-2 py-0.5 rounded-md text-[11px] font-semibold"
                    style={{ background: 'rgba(255,152,0,0.12)', color: '#FF9800' }}
                  >
                    Onay Bekliyor
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                  {app.application_date && (
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Başvuru Tarihi</span>
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {new Date(app.application_date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </p>
                    </div>
                  )}
                  {app.sale_price && (
                    <div>
                      <span style={{ color: 'var(--text-muted)' }}>Satış Fiyatı</span>
                      <p className="font-medium" style={{ color: 'var(--text-primary)' }}>
                        {parseFloat(app.sale_price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                      </p>
                    </div>
                  )}
                </div>
                {app.notes && (
                  <p className="mt-2 text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {app.notes}
                  </p>
                )}

                {/* Şirket Hakkında — SEO için her zaman görünür */}
                {app.company_description && (
                  <div className="mt-3" style={{ borderTop: '1px solid var(--border-primary)', paddingTop: 10 }}>
                    <h5 className="flex items-center gap-1.5 text-xs font-semibold mb-2" style={{ color: '#FF9800' }}>
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Şirket Hakkında
                    </h5>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ color: 'var(--text-secondary)', whiteSpace: 'pre-line' }}
                    >
                      {app.company_description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
          <AdBanner slot="6884376342" format="rectangle" />
        </div>
      )}

      {/* -- Empty State -- */}
      {!loading && filteredApps.length === 0 && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            {q ? `"${query}" için sonuç bulunamadı.` : 'Henüz bekleyen SPK başvurusu yok.'}
          </p>
        </div>
      )}
    </div>
  );
}
