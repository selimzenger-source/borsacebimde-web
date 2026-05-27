'use client';

import { useEffect, useState } from 'react';
import { api, TemettuSampiyon, TemettuCalendarItem, formatDate } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';
import FAQ from '@/components/FAQ';
import { temettuFAQ } from '@/lib/faq-data';

type Period = '1y' | '3y' | '5y';

const PERIOD_LABELS: Record<Period, string> = {
  '1y': '1 Yıllık',
  '3y': '3 Yıllık',
  '5y': '5 Yıllık',
};

// ─── Formatters ──────────────────────────────────────────────────────────────

function fmtPct(n: number | null | undefined, decimals = 2): string {
  if (n === null || n === undefined) return '—';
  return n.toFixed(decimals) + '%';
}

function fmtTL(n: number | null | undefined, decimals = 2): string {
  if (n === null || n === undefined) return '—';
  return n.toLocaleString('tr-TR', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + ' TL';
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="card flex items-center gap-3 px-4 py-3">
      <div className="skeleton h-9 w-12 rounded-md" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-32" />
        <div className="skeleton h-3 w-44" />
      </div>
      <div className="skeleton h-5 w-16 rounded-full" />
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function TemettuContent() {
  const [period, setPeriod] = useState<Period>('5y');
  const [items, setItems] = useState<TemettuSampiyon[]>([]);
  const [loading, setLoading] = useState(true);

  const [calendar, setCalendar] = useState<TemettuCalendarItem[]>([]);
  const [stats, setStats] = useState({ toplam: 0, yaklasan: 0, odenen: 0 });
  const [calStatus, setCalStatus] = useState<'all' | 'yaklasan' | 'odenen'>('yaklasan');
  // Ana sekme: takvim mi sampiyonlar mi
  const [mainTab, setMainTab] = useState<'takvim' | 'sampiyonlar'>('takvim');

  useEffect(() => {
    setLoading(true);
    api.getTemettuSampiyonlar(period, 25)
      .then((r) => setItems(r.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [period]);

  useEffect(() => {
    api.getTemettuCalendar(60)
      .then((r) => {
        setCalendar(r.items);
        setStats(r.stats);
      })
      .catch(() => {});
  }, []);

  const filteredCal = calStatus === 'all' ? calendar : calendar.filter((c) => c.status === calStatus);

  return (
    <div className="container-page py-6 lg:py-10">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <a href="/" className="hover:underline">Ana Sayfa</a>
          <span>›</span>
          <span>Temettü</span>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-2">
          Temettü Takvimi ve Şampiyonları
        </h1>
        <p className="text-muted text-sm lg:text-base max-w-3xl">
          BIST temettü dağıtan hisseler, yıllık temettü verimi, kâr dağıtım oranı, üst üste temettü
          dağıtan şampiyonlar ve yaklaşan ödeme takvimi. Pasif gelir stratejisi geliştirmek isteyen
          yatırımcılar için kapsamlı, ücretsiz veri.
        </p>
      </section>

      <InlineAppBanner
        title="Temettü Tarihlerini Kaçırma"
        message="Takip listenizdeki hisselerin ex-dividend ve ödeme tarihleri yaklaştığında anlık bildirim alın."
      />

      {/* ── Yıllık İstatistik ─────────────────────────────────────────── */}
      {stats.toplam > 0 && (
        <section className="mb-6 grid grid-cols-3 gap-3">
          <div className="card px-4 py-3 text-center">
            <div className="text-xs text-muted">Bu Yıl Toplam</div>
            <div className="text-xl font-bold mt-1">{stats.toplam}</div>
          </div>
          <div className="card px-4 py-3 text-center">
            <div className="text-xs text-muted">Yaklaşan</div>
            <div className="text-xl font-bold mt-1" style={{ color: '#FF9800' }}>
              {stats.yaklasan}
            </div>
          </div>
          <div className="card px-4 py-3 text-center">
            <div className="text-xs text-muted">Ödenen</div>
            <div className="text-xl font-bold mt-1" style={{ color: '#4CAF50' }}>
              {stats.odenen}
            </div>
          </div>
        </section>
      )}

      {/* ── Ana Tablar: Takvim | Şampiyonlar ─────────────────────────────── */}
      <div className="flex gap-2 mb-6 border-b" style={{ borderColor: 'var(--border-primary)' }}>
        <button
          onClick={() => setMainTab('takvim')}
          className="px-5 py-3 text-sm font-semibold transition-colors border-b-2"
          style={{
            color: mainTab === 'takvim' ? '#2979FF' : 'var(--text-secondary)',
            borderBottomColor: mainTab === 'takvim' ? '#2979FF' : 'transparent',
          }}
        >
          📅 Temettü Takvimi
        </button>
        <button
          onClick={() => setMainTab('sampiyonlar')}
          className="px-5 py-3 text-sm font-semibold transition-colors border-b-2"
          style={{
            color: mainTab === 'sampiyonlar' ? '#4CAF50' : 'var(--text-secondary)',
            borderBottomColor: mainTab === 'sampiyonlar' ? '#4CAF50' : 'transparent',
          }}
        >
          🏆 Şampiyonlar
        </button>
      </div>

      {/* ── Şampiyonlar period tabs ─────────────────────────────────────── */}
      {mainTab === 'sampiyonlar' && (
      <section className="mb-10">
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Temettü Şampiyonları</h2>
          <div className="flex gap-2">
            {(Object.keys(PERIOD_LABELS) as Period[]).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className="badge px-3 py-1.5 transition-all"
                style={{
                  background:
                    period === p ? 'rgba(76,175,80,0.18)' : 'rgba(158,158,158,0.10)',
                  color: period === p ? '#4CAF50' : 'var(--text-secondary)',
                  border: `1px solid ${
                    period === p ? 'rgba(76,175,80,0.45)' : 'rgba(158,158,158,0.25)'
                  }`,
                }}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        <p className="text-xs text-muted mb-3">
          {PERIOD_LABELS[period]} dönemde en istikrarlı temettü dağıtan, en yüksek verimli ve
          en yüksek üst üste yıl sayısına sahip hisseler.
        </p>

        <div className="space-y-2">
          {loading ? (
            <>{Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}</>
          ) : items.length === 0 ? (
            <div className="card px-5 py-6 text-center text-muted text-sm">
              Veri bulunamadı.
            </div>
          ) : (
            items.map((it, idx) => (
              <div key={`${it.ticker}-${idx}`} className="card px-4 py-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="font-bold text-base lg:text-lg w-20">{it.ticker}</div>
                  {it.yieldPct != null && (
                    <span
                      className="badge"
                      style={{
                        background: 'rgba(76,175,80,0.15)',
                        color: '#4CAF50',
                        border: '1px solid rgba(76,175,80,0.35)',
                      }}
                    >
                      Verim {fmtPct(it.yieldPct)}
                    </span>
                  )}
                  {it.consecutiveYears != null && it.consecutiveYears >= 3 && (
                    <span
                      className="badge"
                      style={{
                        background: 'rgba(255,215,0,0.15)',
                        color: '#E6B800',
                        border: '1px solid rgba(255,215,0,0.35)',
                      }}
                    >
                      {it.consecutiveYears} Yıl Üst Üste
                    </span>
                  )}
                  {it.aiScore != null && (
                    <span
                      className="badge"
                      style={{
                        background: 'rgba(41,121,255,0.12)',
                        color: '#2979FF',
                        border: '1px solid rgba(41,121,255,0.3)',
                      }}
                    >
                      AI {it.aiScore.toFixed(1)}
                    </span>
                  )}
                </div>
                <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                  <div>
                    <div className="text-muted">Hisse Başına (Brüt)</div>
                    <div className="font-semibold">
                      {it.grossPerShare != null
                        ? it.grossPerShare.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) + ' TL'
                        : '—'}
                    </div>
                  </div>
                  <div>
                    <div className="text-muted">Kâr Dağıtım Oranı</div>
                    <div className="font-semibold">{fmtPct(it.payoutPct)}</div>
                  </div>
                  <div>
                    <div className="text-muted">Ödeme Yapılan Yıl</div>
                    <div className="font-semibold">
                      {it.periodPaymentYears ?? '—'} yıl
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
      )}

      <AdBanner slot="auto" />

      {/* ── Takvim ────────────────────────────────────────────────────── */}
      {mainTab === 'takvim' && (
      <section className="mb-10 mt-8">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <h2 className="text-xl font-semibold">Temettü Takvimi</h2>
          <div className="flex gap-2">
            {(['yaklasan', 'odenen', 'all'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setCalStatus(s)}
                className="badge px-3 py-1.5 transition-all"
                style={{
                  background:
                    calStatus === s ? 'rgba(41,121,255,0.18)' : 'rgba(158,158,158,0.10)',
                  color: calStatus === s ? '#2979FF' : 'var(--text-secondary)',
                  border: `1px solid ${
                    calStatus === s ? 'rgba(41,121,255,0.45)' : 'rgba(158,158,158,0.25)'
                  }`,
                }}
              >
                {s === 'yaklasan' ? 'Yaklaşan' : s === 'odenen' ? 'Ödenen' : 'Tümü'}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          {filteredCal.length === 0 ? (
            <div className="card px-5 py-6 text-center text-muted text-sm">
              Kayıt bulunamadı.
            </div>
          ) : (
            filteredCal.slice(0, 30).map((c, idx) => (
              <div key={`${c.ticker}-${idx}`} className="card px-4 py-3 flex items-center gap-3 flex-wrap">
                <div className="font-bold w-20">{c.ticker}</div>
                <span
                  className="badge"
                  style={{
                    background:
                      c.status === 'odenen'
                        ? 'rgba(76,175,80,0.12)'
                        : 'rgba(255,152,0,0.12)',
                    color: c.status === 'odenen' ? '#4CAF50' : '#FF9800',
                    border: '1px solid currentColor',
                  }}
                >
                  {c.status === 'odenen' ? 'Ödendi' : 'Yaklaşıyor'}
                </span>
                <div className="text-xs text-muted">
                  Brüt {c.gross_per_share != null ? c.gross_per_share.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) + ' TL' : '—'}
                </div>
                <div className="text-xs text-muted">
                  Net {c.net_per_share != null ? c.net_per_share.toLocaleString('tr-TR', { maximumFractionDigits: 4 }) + ' TL' : '—'}
                </div>
                {c.yield_pct != null && (
                  <span
                    className="badge"
                    style={{
                      background: 'rgba(76,175,80,0.12)',
                      color: '#4CAF50',
                      border: '1px solid rgba(76,175,80,0.3)',
                    }}
                  >
                    %{c.yield_pct.toFixed(2)}
                  </span>
                )}
                {c.payment_date && (
                  <div className="text-xs text-muted ml-auto whitespace-nowrap">
                    {formatDate(c.payment_date)}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </section>
      )}

      {/* ── SEO İçerik ────────────────────────────────────────────────── */}
      <section className="mb-10 mt-8 prose prose-sm lg:prose-base max-w-none">
        <h2 className="text-xl font-semibold mb-3">Temettü Yatırımı Rehberi</h2>
        <p className="text-muted text-sm leading-relaxed">
          Temettü, anonim şirketlerin yıllık net dönem kârından pay sahiplerine dağıttığı kâr
          payıdır. Borsa İstanbul'da uzun vadeli yatırım yapan kişiler için temettü, hisse fiyat
          değişiminden bağımsız <strong>düzenli pasif gelir</strong> kaynağı oluşturur. BIST
          şirketleri yıllık Genel Kurul'da temettü dağıtım kararı alır ve ilan ettiği ödeme tarihinde
          tutarı otomatik olarak yatırımcının hesabına işler.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Temettü Veriminin Hesaplanması</h3>
        <p className="text-muted text-sm leading-relaxed">
          <strong>Temettü Verimi = (Brüt Hisse Başına Temettü × 100) / Hisse Fiyatı</strong>. Bu
          rakam yıllık olarak ölçülür. Örnek: bir hissenin fiyatı 10 TL ve brüt temettü 1 TL ise
          verim %10'dur. Ancak sadece son yılın verimi yanıltıcı olabilir; sürdürülebilirliği
          değerlendirmek için son 3 ve 5 yıllık ortalama verim daha sağlıklıdır.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Brüt vs. Net Temettü</h3>
        <p className="text-muted text-sm leading-relaxed">
          Şirketin açıkladığı tutar <strong>brüt temettüdür</strong>. Türkiye'de bireysel yatırımcı
          için %15 stopaj kesintisi uygulanır ve hesabınıza <strong>net</strong> tutar yatar.
          Örnek: 1 TL brüt temettüden 0,15 TL stopaj düşülür, net 0,85 TL ödenir. Yatırım fonu
          ve kurumsal hesaplarda stopaj farklı olabilir.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Ex-Dividend (Eski Tarih)</h3>
        <p className="text-muted text-sm leading-relaxed">
          Temettü ödeme hakkı belirleme tarihinden önceki son işlem günüdür. Bu tarihten itibaren
          hisseyi alan kişiye o dönemin temettüsü <strong>ödenmez</strong>. Hisse fiyatı genellikle
          ex-dividend günü, dağıtılan temettü tutarı kadar düşer. Borsa Cebimde takip listenizdeki
          hisselerin ex-dividend tarihlerini önceden hatırlatır.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Sürdürülebilir Temettü Hisseleri</h3>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>
            <strong>Üst üste temettü dağıtan yıl sayısı:</strong> 5+ yıl üst üste temettü dağıtan
            şirketler tarihsel olarak daha güvenilir kabul edilir.
          </li>
          <li>
            <strong>Kâr dağıtım oranı %30-70:</strong> Dağıtım oranının çok düşük olması büyüme
            yatırımına işaret eder, çok yüksek olması ise sürdürülebilirlik riskidir.
          </li>
          <li>
            <strong>Pozitif net kâr trendi:</strong> Sürekli kâr eden, FAVÖK büyümesi yüksek
            şirketler temettüyü kesintisiz dağıtabilir.
          </li>
          <li>
            <strong>Düşük borçluluk:</strong> Net Borç / FAVÖK oranı 2x altında olan şirketler
            kriz dönemlerinde de temettü dağıtmaya devam eder.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">Borsa Cebimde Temettü Modülü</h3>
        <p className="text-muted text-sm leading-relaxed">
          Borsa Cebimde uygulamasında temettü modülü; <strong>1, 3 ve 5 yıllık şampiyonlar</strong>,
          yıllık takvim, KAP üzerinden gelen anlık temettü kararı bildirimleri ve takip listenizdeki
          hisselerin ödeme tarihi hatırlatıcılarını sunar. Tüm temel veriler ücretsizdir. Bu
          rehber yatırım tavsiyesi niteliği taşımaz, yalnızca bilgilendirme amaçlıdır.
        </p>
      </section>

      <FAQ items={temettuFAQ} title="Temettü Hakkında Sıkça Sorulan Sorular" />

      <AppStoreBanner />
    </div>
  );
}
