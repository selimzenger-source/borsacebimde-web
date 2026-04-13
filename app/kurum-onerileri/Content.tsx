'use client';

import { useEffect, useState, useMemo } from 'react';
import { fetchKurumOnerileri, formatDate, type KurumOneri } from '@/lib/api';
import AppStoreBanner from '@/components/AppStoreBanner';

type Period = 'today' | 'week' | 'month' | 'all';

const TABS: { key: Period; label: string }[] = [
  { key: 'today', label: 'Bugün Paylaşılan' },
  { key: 'week', label: 'Bu Hafta' },
  { key: 'month', label: 'Bu Ay' },
  { key: 'all', label: 'Tümü' },
];

function getRecStyle(rec: string | null): { bg: string; text: string; label: string } {
  if (!rec) return { bg: 'rgba(120,144,156,0.15)', text: '#90A4AE', label: 'Belirsiz' };
  const l = rec.toLowerCase();
  if (l.includes('al') || l.includes('üstü') || l.includes('ustu') || l === 'ekle')
    return { bg: 'rgba(102,187,106,0.12)', text: '#66BB6A', label: rec };
  if (l.includes('sat') || l.includes('altı') || l.includes('alti') || l === 'azalt')
    return { bg: 'rgba(239,83,80,0.12)', text: '#EF5350', label: rec };
  if (l.includes('tut') || l.includes('paralel') || l.includes('nötr'))
    return { bg: 'rgba(255,167,38,0.12)', text: '#FFA726', label: rec };
  return { bg: 'rgba(120,144,156,0.15)', text: '#90A4AE', label: rec };
}

function fmtPrice(n: number): string {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDateTR(dateStr: string): string {
  try {
    const d = new Date(dateStr + 'T00:00:00');
    const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
    const months = ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran', 'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'];
    return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
  } catch { return dateStr; }
}

export default function KurumOnerileriContent() {
  const [data, setData] = useState<KurumOneri[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [period, setPeriod] = useState<Period>('today');
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetchKurumOnerileri(period, 500)
      .then(res => { setData(res.items); })
      .catch(e => setError(e.message))
      .finally(() => setLoading(false));
  }, [period]);

  const filtered = useMemo(() => {
    if (!search.trim()) return data;
    const q = search.trim().toUpperCase();
    return data.filter(d =>
      d.ticker.includes(q) ||
      d.institution_name.toUpperCase().includes(q) ||
      (d.company_name?.toUpperCase().includes(q))
    );
  }, [data, search]);

  // Tarih gruplama
  const grouped = useMemo(() => {
    const map = new Map<string, KurumOneri[]>();
    for (const item of filtered) {
      if (!map.has(item.report_date)) map.set(item.report_date, []);
      map.get(item.report_date)!.push(item);
    }
    return [...map.entries()].sort((a, b) => b[0].localeCompare(a[0]));
  }, [filtered]);

  const stats = useMemo(() => ({
    total: filtered.length,
    institutions: new Set(filtered.map(d => d.institution_name)).size,
    tickers: new Set(filtered.map(d => d.ticker)).size,
  }), [filtered]);

  return (
    <div className="max-w-5xl mx-auto px-4 pt-6">
      {/* Başlık */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(38,166,154,0.15)' }}>
          <svg className="w-5 h-5" style={{ color: '#26A69A' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M2 20h.01M7 20v-4M12 20V10M17 20V4" />
          </svg>
        </div>
        <div>
          <h1 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Kurum Önerileri</h1>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Aracı kurum hedef fiyat ve tavsiyeleri</p>
        </div>
      </div>

      {/* Sekmeler */}
      <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => { setPeriod(tab.key); setSearch(''); }}
            className="px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors"
            style={{
              background: period === tab.key ? '#26A69A' : 'var(--bg-surface)',
              color: period === tab.key ? '#fff' : 'var(--text-secondary)',
              border: period === tab.key ? 'none' : '1px solid var(--border-primary)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Arama */}
      <div className="flex items-center gap-2 mb-4 px-3 py-2.5 rounded-xl" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}>
        <svg className="w-4 h-4 shrink-0" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="BIST kodu, şirket veya kurum ara..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="flex-1 bg-transparent text-sm outline-none"
          style={{ color: 'var(--text-primary)' }}
        />
        {search && (
          <button onClick={() => setSearch('')} className="text-xs px-2 py-1 rounded" style={{ color: 'var(--text-muted)' }}>Temizle</button>
        )}
      </div>

      {/* İstatistik */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[
            { val: stats.total, label: 'Öneri' },
            { val: stats.institutions, label: 'Kurum' },
            { val: stats.tickers, label: 'Hisse' },
          ].map(s => (
            <div key={s.label} className="card text-center py-3">
              <div className="text-lg font-bold" style={{ color: '#26A69A' }}>{s.val}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div className="flex flex-col gap-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="card p-4 animate-pulse">
              <div className="h-4 rounded w-1/3 mb-3" style={{ background: 'var(--border-primary)' }} />
              <div className="h-3 rounded w-2/3" style={{ background: 'var(--border-primary)' }} />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="card p-8 text-center">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Veri yüklenirken hata oluştu: {error}</p>
          <button onClick={() => setPeriod(period)} className="mt-3 px-4 py-2 rounded-lg text-sm font-medium" style={{ background: '#26A69A', color: '#fff' }}>Tekrar Dene</button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="card p-8 text-center">
          <p className="text-lg mb-2" style={{ color: 'var(--text-primary)' }}>
            {period === 'today' ? 'Bugün Henüz Öneri Yok' : 'Öneri Bulunamadı'}
          </p>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {search ? `"${search}" ile eşleşen öneri bulunamadı.` : 'Veriler 2 saatte bir güncellenir.'}
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {grouped.map(([dateKey, items], gi) => (
            <div key={dateKey}>
              {/* Tarih başlığı */}
              <div className="flex items-center gap-2 mb-2 mt-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#26A69A' }} />
                <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{fmtDateTR(dateKey)}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>{items.length} öneri</span>
              </div>

              {/* Kartlar */}
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {items.map(item => {
                  const rs = getRecStyle(item.recommendation);
                  const hasReturn = item.potential_return != null;
                  const isPos = hasReturn && item.potential_return! > 0;

                  return (
                    <div key={item.id} className="card p-4 flex flex-col gap-3 hover:scale-[1.01] transition-transform">
                      {/* Üst: Ticker + Öneri */}
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{item.ticker}</span>
                          {item.company_name && (
                            <p className="text-xs truncate max-w-[180px]" style={{ color: 'var(--text-muted)' }}>{item.company_name}</p>
                          )}
                        </div>
                        <span className="text-xs font-semibold px-2.5 py-1 rounded-full" style={{ background: rs.bg, color: rs.text }}>
                          {rs.label}
                        </span>
                      </div>

                      {/* Orta: Fiyatlar */}
                      <div className="flex gap-2">
                        {item.current_price != null && (
                          <div className="flex-1 text-center py-1.5 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Son Fiyat</div>
                            <div className="text-sm font-semibold" style={{ color: 'var(--text-secondary)' }}>{fmtPrice(item.current_price)} ₺</div>
                          </div>
                        )}
                        {item.target_price != null && (
                          <div className="flex-1 text-center py-1.5 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                            <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Hedef Fiyat</div>
                            <div className="text-sm font-semibold" style={{ color: '#26A69A' }}>{fmtPrice(item.target_price)} ₺</div>
                          </div>
                        )}
                        {hasReturn && (
                          <div className="flex-1 text-center py-1.5 rounded-lg" style={{ background: isPos ? 'rgba(102,187,106,0.1)' : 'rgba(239,83,80,0.1)' }}>
                            <div className="text-[10px]" style={{ color: isPos ? '#66BB6A' : '#EF5350' }}>Getiri</div>
                            <div className="text-sm font-bold" style={{ color: isPos ? '#66BB6A' : '#EF5350' }}>
                              {isPos ? '↑' : '↓'} %{Math.abs(item.potential_return!).toFixed(1)}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Alt: Kurum */}
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--text-muted)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                          <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v4M12 14v4M16 14v4" />
                        </svg>
                        <span className="text-xs truncate" style={{ color: 'var(--text-secondary)' }}>{item.institution_name}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Her grup sonrası app banner (ilk 2 gruptan sonra) */}
              {gi === 1 && <div className="mt-4"><AppStoreBanner /></div>}
            </div>
          ))}
        </div>
      )}

      {/* Güncelleme bilgisi */}
      <p className="text-center text-xs mt-6 mb-4" style={{ color: 'var(--text-muted)' }}>
        Kaynak: hedeffiyat.com.tr &middot; 2 saatte bir güncellenir &middot; Yatırım tavsiyesi niteliği taşımaz
      </p>
    </div>
  );
}
