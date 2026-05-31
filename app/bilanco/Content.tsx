'use client';

import { useEffect, useState } from 'react';
import { api, BilancoListItem, BilancoCalendarItem, formatDate } from '@/lib/api';
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

// Bilanco AI puanina gore etiket — Notr/Iyi/Guclu/Zayif (score-based, dogru)
function scoreToLabel(score: number | null | undefined): { bg: string; color: string; label: string } {
  if (score == null) return { bg: 'rgba(158,158,158,0.12)', color: '#9E9E9E', label: '—' };
  if (score >= 8.5) return { bg: 'rgba(255,215,0,0.15)', color: '#FFD700', label: 'Çok İyi' };
  if (score >= 7) return { bg: 'rgba(76,175,80,0.15)', color: '#4CAF50', label: 'Güçlü' };
  if (score >= 5.5) return { bg: 'rgba(33,150,243,0.15)', color: '#2196F3', label: 'İyi' };
  if (score >= 4) return { bg: 'rgba(255,152,0,0.15)', color: '#FF9800', label: 'Orta' };
  if (score >= 2.5) return { bg: 'rgba(255,82,82,0.15)', color: '#FF5252', label: 'Zayıf' };
  return { bg: 'rgba(244,67,54,0.18)', color: '#F44336', label: 'Kötü' };
}

// AI metinlerindeki teknik kısaltmaları sadeleştir
function humanizeAi(text?: string | null): string {
  if (!text) return '';
  return text
    .replace(/\bYoY\b/gi, 'yıllık (geçen yılın aynı dönemine göre)')
    .replace(/\bQoQ\b/gi, 'çeyreklik (önceki çeyreğe göre)')
    .replace(/\bTTM\b/g, 'son 12 ay')
    .replace(/\by\/y\b/gi, 'yıllık')
    .replace(/\bg\.y\.g\b/gi, 'geçen yıla göre');
}

// Yüzde değişim (current vs prev)
function pctChange(curr: number | null | undefined, prev: number | null | undefined): { txt: string; color: string } | null {
  if (curr == null || prev == null || prev === 0) return null;
  const pct = ((curr - prev) / Math.abs(prev)) * 100;
  const color = pct >= 0 ? '#4CAF50' : '#FF5252';
  return { txt: `${pct >= 0 ? '+' : ''}${pct.toFixed(0)}%`, color };
}

// ─── Mini Bar Chart (SVG, son 5 ceyrek) ─────────────────────────────────────

function MiniBarChart({
  title,
  data,
  color = '#2979FF',
}: {
  title: string;
  data: { period: string; value: number | null }[];
  color?: string;
}) {
  const valid = data.filter((d) => d.value !== null && !isNaN(d.value as number)) as
    { period: string; value: number }[];
  if (valid.length === 0) return null;
  const maxAbs = Math.max(...valid.map((d) => Math.abs(d.value)));
  if (maxAbs === 0) return null;

  const W = 170;
  const H = 50;     // bar çizim alanı
  const TOP = 16;   // bar üstü değer etiketi payı
  const BOT = 13;   // alt dönem etiketi payı
  const gap = 7;
  const barW = (W - gap * (data.length - 1)) / data.length;

  return (
    <div style={{ flex: 1, minWidth: 130 }}>
      <div style={{ fontSize: 12, color: 'var(--text-primary)', textAlign: 'center', marginBottom: 6, fontWeight: 700 }}>
        {title}
      </div>
      <svg viewBox={`0 0 ${W} ${TOP + H + BOT}`} width="100%" preserveAspectRatio="xMidYMid meet">
        {data.map((d, i) => {
          const x = i * (barW + gap);
          if (d.value === null || isNaN(d.value)) {
            return (
              <text key={i} x={x + barW / 2} y={TOP + H + 10} fontSize="7.5"
                fill="var(--text-muted)" textAnchor="middle">{fmtPeriod(d.period)}</text>
            );
          }
          const h = Math.max((Math.abs(d.value) / maxAbs) * H, 2);
          const y = TOP + (H - h);
          const fill = d.value < 0 ? '#FF5252' : color;
          const isLast = i === data.length - 1;
          return (
            <g key={i}>
              {/* Bar üstü değer etiketi (uygulamadaki gibi) */}
              <text x={x + barW / 2} y={y - 3} fontSize="7.5" fontWeight="700"
                fill={fill} textAnchor="middle">{fmtNum(d.value)}</text>
              <rect x={x} y={y} width={barW} height={h} fill={fill} opacity={isLast ? 1 : 0.55} rx={2} />
              <text x={x + barW / 2} y={TOP + H + 10} fontSize="7.5"
                fill="var(--text-muted)" textAnchor="middle">{fmtPeriod(d.period)}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
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

// ─── Zengin Bilanço Kartı (uygulamadaki BFREN düzeni) ───────────────────────
function FinRow({ label, curr, prev, bold, signed }: { label: string; curr: number | null; prev: number | null; bold?: boolean; signed?: boolean }) {
  const ch = pctChange(curr, prev);
  const valColor = signed ? ((curr || 0) < 0 ? '#FF5252' : '#4CAF50') : 'var(--text-primary)';
  return (
    <div className="grid grid-cols-3 gap-2 items-center py-1.5" style={{ borderTop: '1px solid var(--border-primary)' }}>
      <span className={`text-xs ${bold ? 'font-bold' : ''}`} style={{ color: 'var(--text-secondary)' }}>{label}</span>
      <span className={`text-xs text-right ${bold ? 'font-bold' : 'font-semibold'}`} style={{ color: valColor }}>{fmtNum(curr)}</span>
      <span className="text-xs text-right" style={{ color: ch ? ch.color : 'var(--text-muted)' }}>{ch ? ch.txt : '—'}</span>
    </div>
  );
}

function BilancoCard({ it }: { it: BilancoListItem }) {
  // TTM ROE = son 4 çeyrek net kâr / özkaynak
  const q = it.quarterly || [];
  const niTTM = q.length >= 4 ? q.slice(-4).reduce((s, x) => s + (x.net_income || 0), 0)
    : q.length > 0 ? q.reduce((s, x) => s + (x.net_income || 0), 0) * (4 / q.length) : null;
  const roe = (it.total_equity && niTTM != null && it.total_equity > 0) ? (niTTM / it.total_equity) * 100 : null;
  const ndFavok = (it.net_debt != null && it.ebitda && it.ebitda !== 0) ? it.net_debt / it.ebitda : null;
  // Borç / Özkaynak (uygulamadaki alt kutu için)
  const de = (it.total_equity && it.net_debt != null && it.total_equity > 0) ? it.net_debt / it.total_equity : null;
  const roeColor = roe == null ? 'var(--text-muted)' : roe >= 15 ? '#4CAF50' : roe >= 5 ? '#FFD700' : '#FF5252';
  const deColor = de == null ? 'var(--text-muted)' : de <= 1 ? '#4CAF50' : de <= 2 ? '#FFD700' : '#FF5252';
  const sc = scoreToLabel(it.ai_score);

  const Metric = ({ label, value, color }: { label: string; value: string; color?: string }) => (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wide" style={{ color: 'var(--text-muted)' }}>{label}</div>
      <div className="text-sm font-bold mt-0.5" style={{ color: color || 'var(--text-primary)' }}>{value}</div>
    </div>
  );

  return (
    <div className="card px-4 py-4">
      {/* Header */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span className="font-extrabold text-lg">{it.ticker}</span>
        <span className="badge text-xs" style={{ background: 'rgba(41,121,255,0.12)', color: '#2979FF', border: '1px solid rgba(41,121,255,0.3)' }}>{fmtPeriod(it.period)}</span>
        {it.sector_name && <span className="text-xs" style={{ color: 'var(--text-muted)' }}>{it.sector_name}</span>}
        {it.ai_score != null && (
          <span className="badge ml-auto text-xs" style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.color}55` }}>
            {sc.label} · {it.ai_score.toFixed(1)}
          </span>
        )}
      </div>

      {/* Marj satırı */}
      <div className="grid grid-cols-4 gap-2 mb-4">
        <Metric label="Brüt Marj" value={it.gross_margin_pct != null ? `%${it.gross_margin_pct.toFixed(1)}` : '—'} />
        <Metric label="Net Marj" value={it.net_margin_pct != null ? `%${it.net_margin_pct.toFixed(1)}` : '—'} />
        <Metric label="ROE" value={roe != null ? `%${roe.toFixed(1)}` : '—'} color={roe == null ? undefined : roe >= 15 ? '#4CAF50' : roe >= 5 ? '#FFD700' : '#FF5252'} />
        <Metric label="Net Borç/FAVÖK" value={ndFavok != null ? `${ndFavok.toFixed(2)}x` : '—'} color={(it.net_debt || 0) < 0 ? '#4CAF50' : undefined} />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Özet Gelir Tablosu */}
        <div>
          <div className="flex justify-between text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Özet Gelir Tablosu</span>
            <span>{fmtPeriod(it.period)} · {fmtPeriod(it.prev_period)} · %</span>
          </div>
          <FinRow label="Satışlar" curr={it.revenue} prev={it.revenue_prev} bold />
          <FinRow label="Brüt Kâr" curr={it.gross_profit} prev={it.gross_profit_prev} />
          <FinRow label="FAVÖK" curr={it.ebitda} prev={it.ebitda_prev} />
          <FinRow label="Net Kâr" curr={it.net_income} prev={it.net_income_prev} bold signed />
        </div>
        {/* Özet Bilanço */}
        <div>
          <div className="flex justify-between text-[11px] mb-1" style={{ color: 'var(--text-muted)' }}>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Özet Bilanço</span>
            <span>{fmtPeriod(it.period)} · {fmtPeriod(it.prev_period_balance)} · %</span>
          </div>
          <FinRow label="Dönen Varlık" curr={it.current_assets} prev={it.current_assets_prev} />
          <FinRow label="Duran Varlık" curr={it.non_current_assets} prev={it.non_current_assets_prev} />
          <FinRow label="Toplam Varlık" curr={it.total_assets} prev={it.total_assets_prev} />
          <FinRow label="Net Borç" curr={it.net_debt} prev={it.net_debt_prev} signed />
          <FinRow label="Özkaynaklar" curr={it.total_equity} prev={it.total_equity_prev} bold />
        </div>
      </div>

      {/* Çeyreklik grafikler — uygulamadaki 2 sütunlu düzen (3 grafik + ROE/Borç kutusu) */}
      {q.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-4 pt-3" style={{ borderTop: '1px dashed var(--border-primary)' }}>
          {[
            { title: 'Çeyreklik Satışlar', key: 'revenue' as const, color: '#1565C0' },
            { title: 'Çeyreklik FAVÖK', key: 'ebitda' as const, color: '#2E7D32' },
            { title: 'Çeyreklik Net Kâr', key: 'net_income' as const, color: '#2E7D32' },
          ].map((c) => (
            <div
              key={c.key}
              className="rounded-xl border p-3 flex items-center"
              style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}
            >
              <MiniBarChart
                title={c.title}
                data={q.slice(-5).map((x) => ({ period: x.period, value: x[c.key] }))}
                color={c.color}
              />
            </div>
          ))}

          {/* 4. hücre: ROE + Borç/Özkaynak kutusu (uygulamadaki gibi) */}
          <div
            className="rounded-xl border p-3 flex flex-col items-center justify-center text-center gap-1"
            style={{ borderColor: 'var(--border-primary)', backgroundColor: 'var(--bg-secondary)' }}
          >
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>ROE (Özkaynak Karlılığı)</div>
            <div className="flex items-center gap-1.5">
              <span style={{ width: 9, height: 9, borderRadius: 5, background: roeColor }} />
              <span className="font-extrabold" style={{ fontSize: 19, color: roeColor }}>
                {roe != null ? `%${roe.toFixed(1)}` : '—'}
              </span>
            </div>
            <div style={{ height: 1, width: '70%', background: 'var(--border-primary)', margin: '5px 0' }} />
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>Borç / Özkaynak</div>
            <div className="flex items-center gap-1.5">
              <span style={{ width: 9, height: 9, borderRadius: 5, background: deColor }} />
              <span className="font-extrabold" style={{ fontSize: 19, color: deColor }}>
                {de != null ? `${de.toFixed(2)}x` : '—'}
              </span>
            </div>
            <div style={{ fontSize: 8.5, color: 'var(--text-muted)', marginTop: 3 }}>Güncel bilanço verisiyle hesaplanır</div>
          </div>
        </div>
      )}

      {/* AI yorumu */}
      {it.ai_summary && (
        <div className="mt-3 pt-3 text-xs" style={{ borderTop: '1px dashed var(--border-primary)', color: 'var(--text-secondary)' }}>
          <span className="font-bold" style={{ color: sc.color }}>🤖 AI Bilanço Yorumu: </span>{humanizeAi(it.ai_summary)}
        </div>
      )}
    </div>
  );
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function BilancoContent() {
  const [items, setItems] = useState<BilancoListItem[]>([]);
  const [calendar, setCalendar] = useState<BilancoCalendarItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searched, setSearched] = useState<BilancoListItem[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [visible, setVisible] = useState(40); // "Daha Fazla Yükle" ile artar

  useEffect(() => {
    // Son Bilançolar — açıklama tarihine göre (uygulamadaki feed ile aynı)
    api.getLatestBilancos(150)
      .then((r) => setItems(r.items || []))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
    api.getBilancoCalendar(30)
      .then(setCalendar)
      .catch(() => {});
  }, []);

  // Hisse arama — yazılan ticker'ı backend'den getir (tüm BIST, son 40 ile sınırlı değil)
  useEffect(() => {
    const q = query.trim().toUpperCase();
    if (q.length < 2) { setSearched(null); return; }
    setSearching(true);
    const t = setTimeout(() => {
      api.getLatestBilancos(800, q)
        .then((r) => setSearched(r.items || []))
        .catch(() => setSearched([]))
        .finally(() => setSearching(false));
    }, 400);
    return () => clearTimeout(t);
  }, [query]);

  // Gösterilecek: arama varsa (yüklü 40'tan substring + backend tam-eşleşme), yoksa son 40
  const shown = (() => {
    const q = query.trim().toUpperCase();
    if (q.length < 2) return items;
    const map = new Map<string, BilancoListItem>();
    items.filter((it) => it.ticker.includes(q)).forEach((it) => map.set(it.ticker, it));
    (searched || []).forEach((it) => map.set(it.ticker, it));
    return Array.from(map.values());
  })();

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

      {/* ── Son Bilançolar — uygulamadaki gibi tarih sıralı zengin kartlar ── */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            {query.trim().length >= 2 ? 'Arama Sonuçları' : 'Son Açıklanan Bilançolar'}
          </h2>
        </div>

        {/* Hisse arama */}
        <div className="mb-4 relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
            placeholder="Hisse ara (ör: SASA, TUPRS)"
            maxLength={6}
            className="w-full px-4 py-3 rounded-xl text-sm outline-none"
            style={{ background: 'var(--bg-secondary, rgba(158,158,158,0.08))', border: '1px solid var(--border-primary)', color: 'var(--text-primary)' }}
          />
          {query.length > 0 && (
            <button
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted text-lg"
              aria-label="Temizle"
            >×</button>
          )}
        </div>

        <div className="space-y-4">
          {loading ? (
            <>{Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)}</>
          ) : searching ? (
            <div className="card px-5 py-6 text-center text-muted text-sm">Aranıyor…</div>
          ) : shown.length === 0 ? (
            <div className="card px-5 py-6 text-center text-muted text-sm">
              {query.trim().length >= 2
                ? `"${query}" için bilanço bulunamadı.`
                : 'Bilanço verisi henüz yayınlanmadı.'}
            </div>
          ) : (
            <>
              {shown.slice(0, visible).map((it, idx) => <BilancoCard key={`${it.ticker}-${idx}`} it={it} />)}
              {shown.length > visible && (
                <button
                  onClick={() => setVisible((v) => v + 40)}
                  className="w-full mt-2 py-3 rounded-xl border border-[var(--border-primary)] text-sm font-semibold text-[#2979FF] hover:bg-[#2979FF]/10 transition-colors"
                >
                  Daha Fazla Yükle ({shown.length - visible} bilanço daha)
                </button>
              )}
            </>
          )}
        </div>
      </section>

      <AdBanner slot="auto" />

      {/* ── Bilanço Takvimi — sadece GELECEK tarihler (bugun ve sonrasi) ─── */}
      {(() => {
        const today = new Date(); today.setHours(0, 0, 0, 0);
        const upcoming = calendar.filter((c) => {
          if (!c.expected_date) return false;
          if (c.is_announced) return false; // Yayinlanmis olanlari gosterme
          const d = new Date(c.expected_date);
          return d >= today;
        });
        if (upcoming.length === 0) return null;
        return (
        <section className="mb-10 mt-8">
          <h2 className="text-xl font-semibold mb-4">Yaklaşan Bilanço Takvimi</h2>
          <p className="text-muted text-sm mb-4">
            BIST şirketlerinin önümüzdeki günlerde KAP'a yayınlaması beklenen bilanço bildirimleri.
            Q1 için son tarih dönem bitimini takip eden 60 gün, Q4 için 70 gündür.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {upcoming.slice(0, 20).map((c, idx) => (
              <div key={`${c.ticker}-${idx}`} className="card px-4 py-2.5 flex items-center gap-3">
                <div className="font-bold text-sm w-16">{c.ticker}</div>
                <div className="flex-1 text-xs text-muted truncate">{c.company_name || '—'}</div>
                <span
                  className="badge text-xs"
                  style={{
                    background: 'rgba(255,152,0,0.12)',
                    color: '#FF9800',
                    border: '1px solid currentColor',
                  }}
                >
                  Beklenen
                </span>
                <div className="text-xs text-muted whitespace-nowrap">
                  {c.expected_date ? formatDate(c.expected_date) : '—'}
                </div>
              </div>
            ))}
          </div>
        </section>
        );
      })()}

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
