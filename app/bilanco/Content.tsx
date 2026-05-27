'use client';

import { useEffect, useState } from 'react';
import { api, BilancoTopItem, BilancoPeriod, BilancoCalendarItem, formatDate } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';
import InlineAppBanner from '@/components/InlineAppBanner';
import FAQ from '@/components/FAQ';
import { bilancoFAQ } from '@/lib/faq-data';

// ─── Formatters ──────────────────────────────────────────────────────────────

function fmtNum(n: number | null | undefined): string {
  if (n === null || n === undefined) return '—';
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + ' mr';
  if (abs >= 1_000_000) return (n / 1_000_000).toFixed(1) + ' mn';
  if (abs >= 1_000) return (n / 1_000).toFixed(1) + ' bn';
  return n.toFixed(2);
}

function fmtPeriod(p: string | null | undefined): string {
  if (!p) return '';
  if (p.includes('-Q')) {
    const [y, q] = p.split('-');
    return `${y.slice(-2)} ${q}`;
  }
  if (p.includes('/')) {
    const [y, mon] = p.split('/');
    const map: Record<string, string> = { '3': 'Q1', '6': 'Q2', '9': 'Q3', '12': 'Q4' };
    return `${y.slice(-2)} ${map[mon] || ('M' + mon)}`;
  }
  return p;
}

function sentimentColor(s: string | null): { bg: string; color: string; label: string } {
  const norm = (s || '').toLowerCase();
  if (norm.includes('olumlu') || norm === 'positive')
    return { bg: 'rgba(76,175,80,0.12)', color: '#4CAF50', label: 'Olumlu' };
  if (norm.includes('olumsuz') || norm === 'negative')
    return { bg: 'rgba(255,82,82,0.12)', color: '#FF5252', label: 'Olumsuz' };
  return { bg: 'rgba(158,158,158,0.12)', color: '#9E9E9E', label: 'Nötr' };
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div className="card flex items-center gap-3 px-4 py-3">
      <div className="skeleton h-9 w-16 rounded-md" />
      <div className="flex-1 space-y-2">
        <div className="skeleton h-3 w-32" />
        <div className="skeleton h-3 w-44" />
      </div>
      <div className="skeleton h-5 w-12 rounded-full" />
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function BilancoContent() {
  const [periods, setPeriods] = useState<BilancoPeriod[]>([]);
  const [activePeriod, setActivePeriod] = useState<string>('');
  const [items, setItems] = useState<BilancoTopItem[]>([]);
  const [calendar, setCalendar] = useState<BilancoCalendarItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getBilancoPeriods()
      .then((r) => {
        setPeriods(r.periods.slice(0, 4));
        if (r.periods.length > 0) setActivePeriod(r.periods[0].period);
      })
      .catch(() => {});
    api.getBilancoCalendar(30)
      .then(setCalendar)
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!activePeriod) return;
    setLoading(true);
    api.getBilancoTop(activePeriod, 'ai_score', 20)
      .then((r) => setItems(r.items))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [activePeriod]);

  return (
    <div className="container-page py-6 lg:py-10">
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="mb-8">
        <div className="flex items-center gap-2 text-xs text-muted mb-2">
          <a href="/" className="hover:underline">Ana Sayfa</a>
          <span>›</span>
          <span>Bilanço</span>
        </div>
        <h1 className="text-2xl lg:text-4xl font-bold mb-2">
          Bilanço Analizleri
        </h1>
        <p className="text-muted text-sm lg:text-base max-w-3xl">
          Borsa İstanbul şirketlerinin çeyreklik mali tabloları, net satış ve FAVÖK büyüme oranları,
          net dönem kârı ve yapay zeka destekli bilanço analizleri ücretsiz olarak sunulur.
          Dönem bazında en yüksek skora sahip bilançolar listelenir.
        </p>
      </section>

      <InlineAppBanner
        title="Bilanço Bildirimlerini Anında Al"
        message="Takip listenizdeki şirketlerin yeni bilançosu yayınlandığında uygulamadan anlık push bildirimi gelsin."
      />

      {/* ── Period tabs ─────────────────────────────────────────────────── */}
      {periods.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-3">Dönem Seçin</h2>
          <div className="flex flex-wrap gap-2">
            {periods.map((p) => (
              <button
                key={p.period}
                onClick={() => setActivePeriod(p.period)}
                className={`badge px-4 py-2 transition-all ${
                  activePeriod === p.period ? 'ring-2 ring-blue-500' : ''
                }`}
                style={{
                  background:
                    activePeriod === p.period
                      ? 'rgba(41,121,255,0.18)'
                      : 'rgba(158,158,158,0.10)',
                  color: activePeriod === p.period ? '#2979FF' : 'var(--text-secondary)',
                  border: `1px solid ${
                    activePeriod === p.period ? 'rgba(41,121,255,0.45)' : 'rgba(158,158,158,0.25)'
                  }`,
                }}
              >
                {fmtPeriod(p.period)}{' '}
                <span className="opacity-60 text-xs">({p.count})</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── En İyi AI Puanlı Bilançolar ─────────────────────────────────── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {activePeriod ? fmtPeriod(activePeriod) : ''} Dönemi En Yüksek AI Puanlı Bilançolar
          </h2>
        </div>

        <div className="space-y-2">
          {loading ? (
            <>
              {Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}
            </>
          ) : items.length === 0 ? (
            <div className="card px-5 py-6 text-center text-muted text-sm">
              Bu dönem için bilanço verisi henüz yayınlanmadı.
            </div>
          ) : (
            items.map((it, idx) => {
              const sent = sentimentColor(it.ai_sentiment);
              return (
                <div key={`${it.ticker}-${idx}`} className="card px-4 py-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="font-bold text-base lg:text-lg w-20">{it.ticker}</div>
                    <span
                      className="badge"
                      style={{
                        background: sent.bg,
                        color: sent.color,
                        border: `1px solid ${sent.color}40`,
                      }}
                    >
                      {sent.label}
                    </span>
                    {it.ai_score != null && (
                      <span className="badge" style={{ background: 'rgba(41,121,255,0.12)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.3)' }}>
                        AI {it.ai_score.toFixed(1)}
                      </span>
                    )}
                    <span className="text-xs text-muted ml-auto">{fmtPeriod(it.period)}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 mt-3 text-xs">
                    <div>
                      <div className="text-muted">Net Satış</div>
                      <div className="font-semibold">{fmtNum(it.revenue)}</div>
                    </div>
                    <div>
                      <div className="text-muted">FAVÖK</div>
                      <div className="font-semibold">{fmtNum(it.ebitda)}</div>
                    </div>
                    <div>
                      <div className="text-muted">Net Kâr</div>
                      <div
                        className="font-semibold"
                        style={{ color: (it.net_income || 0) < 0 ? '#FF5252' : '#4CAF50' }}
                      >
                        {fmtNum(it.net_income)}
                      </div>
                    </div>
                  </div>
                  {it.ai_summary && (
                    <p className="text-xs text-muted mt-2 line-clamp-2">{it.ai_summary}</p>
                  )}
                </div>
              );
            })
          )}
        </div>
      </section>

      <AdBanner slot="auto" />

      {/* ── Bilanço Takvimi ─────────────────────────────────────────────── */}
      {calendar.length > 0 && (
        <section className="mb-10 mt-8">
          <h2 className="text-xl font-semibold mb-4">Yaklaşan Bilanço Takvimi</h2>
          <p className="text-muted text-sm mb-4">
            BIST şirketlerinin önümüzdeki günlerde KAP'a yayınlaması beklenen bilanço bildirimleri.
            Q1 için son tarih dönem bitimini takip eden 60 gün, Q4 için 70 gündür.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {calendar.slice(0, 20).map((c, idx) => (
              <div key={`${c.ticker}-${idx}`} className="card px-4 py-2.5 flex items-center gap-3">
                <div className="font-bold text-sm w-16">{c.ticker}</div>
                <div className="flex-1 text-xs text-muted truncate">{c.company_name || '—'}</div>
                <span
                  className="badge text-xs"
                  style={{
                    background: c.is_announced ? 'rgba(76,175,80,0.12)' : 'rgba(255,152,0,0.12)',
                    color: c.is_announced ? '#4CAF50' : '#FF9800',
                    border: '1px solid currentColor',
                  }}
                >
                  {c.is_announced ? 'Yayınlandı' : 'Beklenen'}
                </span>
                <div className="text-xs text-muted whitespace-nowrap">
                  {c.expected_date ? formatDate(c.expected_date) : '—'}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── SEO İçerik ────────────────────────────────────────────────── */}
      <section className="mb-10 mt-8 prose prose-sm lg:prose-base max-w-none">
        <h2 className="text-xl font-semibold mb-3">Bilanço Analizi Nedir, Nasıl Okunur?</h2>
        <p className="text-muted text-sm leading-relaxed">
          Bilanço, bir şirketin belirli bir tarihteki finansal fotoğrafıdır. Borsa İstanbul'da işlem
          gören şirketler her üç ayda bir Kamuyu Aydınlatma Platformu (KAP) üzerinden çeyreklik
          bilançolarını ve yıl sonunda denetimli yıllık bilançolarını yayınlamak zorundadır.
          Yatırımcılar bu bilançolardan şirketin gelir, gider, kâr, varlık ve borç durumunu
          öğrenerek hisse değerleme yapabilir.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Çeyreklik Bilançoda Bakılması Gereken Kalemler</h3>
        <ul className="list-disc list-inside text-sm text-muted space-y-1">
          <li>
            <strong>Net Satışlar (Ciro):</strong> Şirketin ana faaliyetinden elde ettiği gelir.
            YoY (yıllık) büyüme oranı önemli bir göstergedir.
          </li>
          <li>
            <strong>Brüt Kâr ve Marj:</strong> Maliyet kontrolünün ölçüsü. Yüksek ve istikrarlı
            brüt marj rekabet üstünlüğünün işaretidir.
          </li>
          <li>
            <strong>FAVÖK (EBITDA):</strong> Faiz, vergi ve amortismandan arındırılmış operasyonel kâr.
            Sektör karşılaştırmaları için ideal.
          </li>
          <li>
            <strong>Net Dönem Kârı:</strong> Tüm gider ve vergiler düşüldükten sonra kalan net rakam.
            Hisse başına kâr (EPS) hesaplaması için kullanılır.
          </li>
          <li>
            <strong>Net Borç / FAVÖK:</strong> Borç yüküne karşı operasyonel kârın oranı. 2x altı
            sağlıklı, 3x üstü riskli kabul edilir.
          </li>
          <li>
            <strong>Özkaynak Kârlılığı (ROE):</strong> Şirketin ortaklarının parasını ne kadar
            verimli kullandığını gösterir.
          </li>
        </ul>

        <h3 className="text-lg font-semibold mt-6 mb-2">Sektörel Farklılıklar</h3>
        <p className="text-muted text-sm leading-relaxed">
          Bankalar için <strong>Net Faiz Geliri, Komisyon Gelirleri, Krediler ve Mevduatlar</strong>;
          sigorta şirketleri için <strong>Brüt Yazılan Prim ve Teknik Bölüm Dengesi</strong>;
          aracı kurumlar için <strong>Komisyon Gelirleri</strong> kritik kalemlerdir. Borsa Cebimde
          uygulaması her sektör için özelleştirilmiş bilanço kartı sunar.
        </p>

        <h3 className="text-lg font-semibold mt-6 mb-2">Yapay Zeka Bilanço Analizi</h3>
        <p className="text-muted text-sm leading-relaxed">
          Borsa Cebimde, KAP'a düşen her bilanço bildirimini otomatik olarak işler ve önceki çeyrek
          ile karşılaştırarak <strong>1-10 arası AI etki puanı</strong> ve{' '}
          <strong>olumlu/olumsuz/nötr</strong> sınıflandırması üretir. Bu analizler sadece
          bilgilendirme amaçlıdır, yatırım tavsiyesi niteliği taşımaz. Yatırım kararlarınızı
          vermeden önce profesyonel danışmanlık almanız önerilir.
        </p>
      </section>

      <FAQ items={bilancoFAQ} title="Bilanço Hakkında Sıkça Sorulan Sorular" />

      <AppStoreBanner />
    </div>
  );
}
