'use client';

import { useEffect, useState } from 'react';
import { api, type SPKApplication } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '\u2014';
  const d = new Date(dateStr);
  return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
}

function formatMoney(val: string | null): string {
  if (!val) return '\u2014';
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  if (num >= 1e9) return (num / 1e9).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Milyar \u20BA';
  if (num >= 1e6) return (num / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + ' Milyon \u20BA';
  return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20BA';
}

function CardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-3">
      <div className="skeleton h-5 w-3/4 rounded" />
      <div className="skeleton h-4 w-1/2 rounded" />
      <div className="skeleton h-4 w-2/3 rounded" />
    </div>
  );
}

export default function SPKBasvurularPage() {
  const [apps, setApps] = useState<SPKApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getSPKApplications()
      .then(setApps)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="card p-6" style={{ background: 'linear-gradient(135deg, rgba(148,163,184,0.08), rgba(148,163,184,0.02))', border: '1px solid rgba(148,163,184,0.15)' }}>
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(148,163,184,0.15)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#94A3B8" strokeWidth={1.8} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>SPK Onay Bekleyen Ba\u015fvurular</h1>
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Sermaye Piyasas\u0131 Kurulu&apos;na yap\u0131lan halka arz ba\u015fvurular\u0131</p>
          </div>
        </div>
        {!loading && (
          <div className="mt-3 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-semibold" style={{ background: 'rgba(148,163,184,0.15)', color: '#94A3B8' }}>
              {apps.length} Ba\u015fvuru
            </span>
          </div>
        )}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex flex-col gap-3">
          {[1, 2, 3, 4, 5].map(i => <CardSkeleton key={i} />)}
        </div>
      )}

      {/* Empty */}
      {!loading && apps.length === 0 && (
        <div className="card p-8 text-center">
          <p style={{ color: 'var(--text-muted)' }}>SPK onay\u0131 bekleyen ba\u015fvuru bulunmuyor.</p>
        </div>
      )}

      {/* Cards with ads every 12 items */}
      {!loading && apps.map((app, idx) => (
        <div key={app.id}>
          {/* Ad every 12 items */}
          {idx > 0 && idx % 12 === 0 && (
            <div className="mb-4">
              <AdBanner slot="6884376342" format="rectangle" />
            </div>
          )}

          <div
            className="card p-5 transition-all duration-200 hover:scale-[1.01]"
            style={{ border: '1px solid rgba(148,163,184,0.1)' }}
          >
            {/* Company name */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-base font-bold leading-snug" style={{ color: 'var(--text-primary)' }}>
                {app.company_name}
              </h3>
              <span
                className="shrink-0 px-2.5 py-1 rounded-lg text-xs font-semibold"
                style={{ background: 'rgba(255,152,0,0.12)', color: '#FF9800' }}
              >
                Onay Bekliyor
              </span>
            </div>

            {/* Details grid */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              {app.application_date && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Ba\u015fvuru Tarihi</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatDate(app.application_date)}</p>
                </div>
              )}
              {app.sale_price && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Sat\u0131\u015f Fiyat\u0131</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatMoney(app.sale_price)}</p>
                </div>
              )}
              {app.existing_capital && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Mevcut Sermaye</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatMoney(app.existing_capital)}</p>
                </div>
              )}
              {app.new_capital && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Yeni Sermaye</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatMoney(app.new_capital)}</p>
                </div>
              )}
              {app.capital_increase_paid && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Bedelli Art\u0131r\u0131m</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatMoney(app.capital_increase_paid)}</p>
                </div>
              )}
              {app.capital_increase_free && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Bedelsiz Art\u0131r\u0131m</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatMoney(app.capital_increase_free)}</p>
                </div>
              )}
              {app.existing_share_sale && (
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Mevcut Pay Sat\u0131\u015f\u0131</span>
                  <p className="font-medium" style={{ color: 'var(--text-primary)' }}>{formatMoney(app.existing_share_sale)}</p>
                </div>
              )}
            </div>

            {/* Notes */}
            {app.notes && (
              <p className="mt-3 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                {app.notes}
              </p>
            )}
          </div>
        </div>
      ))}

      {/* Bottom ad + store banner */}
      {!loading && apps.length > 0 && (
        <>
          <AdBanner slot="6884376342" format="rectangle" />
          <AppStoreBanner />
        </>
      )}
    </div>
  );
}
