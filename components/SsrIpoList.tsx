import { SsrIpoItem, formatDate } from '@/lib/ssr-prefetch';

interface Props {
  items: SsrIpoItem[];
  heading: string;
  description?: string;
}

const statusLabel: Record<string, string> = {
  newly_approved: 'Yeni Onay Aldı',
  in_distribution: 'Talep Toplama',
  awaiting_trading: 'İşlem Bekleniyor',
  trading: 'İşlem Görüyor',
  completed: 'Tamamlandı',
};

function parseJson(val: any): any {
  if (!val) return null;
  if (typeof val === 'object') return val;
  try {
    return JSON.parse(val);
  } catch {
    return null;
  }
}

function fmtTL(n: number | null | undefined): string {
  if (n == null) return '';
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)} milyar TL`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)} milyon TL`;
  return `${n.toLocaleString('tr-TR')} TL`;
}

function riskBadge(risk?: string | null): { bg: string; color: string; label: string } {
  const r = (risk || '').toLowerCase();
  if (r.includes('düşük') || r.includes('dusuk')) return { bg: 'rgba(76,175,80,0.12)', color: '#4CAF50', label: 'Düşük Risk' };
  if (r.includes('yüksek') || r.includes('yuksek')) return { bg: 'rgba(255,82,82,0.12)', color: '#FF5252', label: 'Yüksek Risk' };
  if (r.includes('orta')) return { bg: 'rgba(255,152,0,0.12)', color: '#FF9800', label: 'Orta Risk' };
  return { bg: 'var(--bg-surface)', color: 'var(--text-muted)', label: risk || 'Risk Belirtilmemiş' };
}

function scoreColor(score?: number | null): string {
  if (score == null) return '#90A4AE';
  if (score >= 7.5) return '#4CAF50';
  if (score >= 6) return '#8BC34A';
  if (score >= 5) return '#FFC107';
  return '#FF9800';
}

export default function SsrIpoList({ items, heading, description }: Props) {
  if (!items || items.length === 0) return null;

  return (
    <section style={{ marginTop: 32, padding: '24px 0' }} aria-label="Halka arz listesi">
      <header style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6 }}>
          {heading}
        </h2>
        {description ? (
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 0 }}>{description}</p>
        ) : null}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {items.slice(0, 30).map((ipo) => {
          const ai = parseJson(ipo.ai_report);
          const pa = parseJson(ipo.prospectus_analysis);
          const score = ai?.overall_score;
          const risk = ai?.risk_level || pa?.risk_level;
          const rb = riskBadge(risk);
          const positives: string[] = Array.isArray(pa?.positives) ? pa.positives : [];
          const negatives: string[] = Array.isArray(pa?.negatives) ? pa.negatives : [];
          const tracks = Array.isArray(ipo.ceiling_tracks) ? ipo.ceiling_tracks : [];
          const allocs = Array.isArray(ipo.allocations) ? ipo.allocations : [];
          const brokers = Array.isArray(ipo.brokers) ? ipo.brokers : [];
          let fundUsage: string[] = [];
          if (ipo.fund_usage) {
            try {
              const fu = typeof ipo.fund_usage === 'string' ? JSON.parse(ipo.fund_usage) : ipo.fund_usage;
              if (Array.isArray(fu)) fundUsage = fu.map((x) => String(x));
            } catch {}
          }
          const allocLabel: Record<string, string> = {
            bireysel: 'Yurt İçi Bireysel',
            yurtici_bireysel: 'Yurt İçi Bireysel',
            kurumsal: 'Kurumsal',
            yurtici_kurumsal: 'Yurt İçi Kurumsal',
            yurtdisi_kurumsal: 'Kurumsal Yurt Dışı',
            yurtdisi: 'Yurt Dışı',
          };
          const statusDayLabel: Record<string, { label: string; color: string }> = {
            tavan: { label: 'TAVAN', color: '#4CAF50' },
            taban: { label: 'TABAN', color: '#FF5252' },
            satici: { label: 'SATICILI', color: '#FF9800' },
            saticili: { label: 'SATICILI', color: '#FF9800' },
            alici: { label: 'ALICILI', color: '#4CAF50' },
            normal: { label: 'NORMAL', color: 'var(--text-muted)' },
          };

          const subscriptionStart = ipo.subscription_start || ipo.start_date;
          const subscriptionEnd = ipo.subscription_end || ipo.end_date;
          const tradingDate = ipo.trading_start || ipo.trading_date;
          const price = ipo.ipo_price ?? ipo.price;
          const totalLots = ipo.total_lots ?? ipo.lot;

          return (
            <article
              key={ipo.id || ipo.ticker}
              className="card"
              style={{ padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}
            >
              {/* Başlık + ticker + skor */}
              <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)', margin: 0, lineHeight: 1.35 }}>
                    {ipo.ticker ? (
                      <span style={{ color: '#2979FF', marginRight: 8 }}>{ipo.ticker}</span>
                    ) : null}
                    {ipo.company_name || 'Halka Arz'}
                  </h3>
                  <div style={{ marginTop: 4, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {ipo.status ? (
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        padding: '2px 8px', borderRadius: 999,
                        background: 'rgba(41,121,255,0.1)', color: '#2979FF',
                        border: '1px solid rgba(41,121,255,0.2)',
                      }}>
                        {statusLabel[ipo.status] || ipo.status}
                      </span>
                    ) : null}
                    <span style={{
                      fontSize: 11, fontWeight: 600,
                      padding: '2px 8px', borderRadius: 999,
                      background: rb.bg, color: rb.color,
                      border: `1px solid ${rb.color}30`,
                    }}>
                      {rb.label}
                    </span>
                    {ipo.katilim_endeksi === 'uygun' ? (
                      <span style={{
                        fontSize: 11, fontWeight: 600,
                        padding: '2px 8px', borderRadius: 999,
                        background: 'rgba(46,125,50,0.12)', color: '#2E7D32',
                        border: '1px solid rgba(46,125,50,0.25)',
                      }}>
                        Katılım Endeksi ✓
                      </span>
                    ) : null}
                  </div>
                </div>
                {score != null ? (
                  <div style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    minWidth: 60, padding: '6px 10px', borderRadius: 8,
                    background: `${scoreColor(score)}15`, border: `1px solid ${scoreColor(score)}40`,
                  }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: scoreColor(score), lineHeight: 1 }}>
                      {score.toFixed(1)}
                    </span>
                    <span style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>AI Skor</span>
                  </div>
                ) : null}
              </header>

              {/* Özet */}
              {pa?.summary ? (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {pa.summary}
                </p>
              ) : pa?.company_brief ? (
                <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                  {pa.company_brief.length > 280 ? pa.company_brief.slice(0, 280) + '...' : pa.company_brief}
                </p>
              ) : null}

              {/* Temel veriler grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 8, fontSize: 12 }}>
                {price ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Halka Arz Fiyatı</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{Number(price).toFixed(2)} TL</div>
                  </div>
                ) : null}
                {totalLots ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Toplam Lot</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{Number(totalLots).toLocaleString('tr-TR')}</div>
                  </div>
                ) : null}
                {ipo.offering_size_tl ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Halka Arz Tutarı</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{fmtTL(Number(ipo.offering_size_tl))}</div>
                  </div>
                ) : null}
                {ipo.public_float_pct ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Halka Açıklık</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>%{Number(ipo.public_float_pct).toFixed(1)}</div>
                  </div>
                ) : null}
                {subscriptionStart ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Talep Toplama</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>
                      {formatDate(subscriptionStart)}{subscriptionEnd ? ` — ${formatDate(subscriptionEnd)}` : ''}
                    </div>
                  </div>
                ) : null}
                {tradingDate ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>İşlem Günü</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{formatDate(tradingDate)}</div>
                  </div>
                ) : null}
                {ipo.total_applicants ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Başvuran Sayısı</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ipo.total_applicants.toLocaleString('tr-TR')}</div>
                  </div>
                ) : null}
                {ipo.estimated_lots_per_person ? (
                  <div>
                    <div style={{ color: 'var(--text-muted)', fontSize: 11 }}>Kişi Başı Lot</div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{ipo.estimated_lots_per_person}</div>
                  </div>
                ) : null}
              </div>

              {/* Olumlu / Olumsuz dipnot */}
              {(positives.length > 0 || negatives.length > 0) ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 10, marginTop: 6 }}>
                  {positives.length > 0 ? (
                    <div style={{
                      padding: '10px 12px', borderRadius: 6,
                      background: 'rgba(76,175,80,0.06)', borderLeft: '3px solid #4CAF50',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#4CAF50', marginBottom: 6, letterSpacing: 0.5 }}>
                        ↑ İZAHNAMEDEN OLUMLU DİPNOTLAR
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {positives.slice(0, 4).map((p, i) => (
                          <li key={i} style={{ marginBottom: 3 }}>{String(p)}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {negatives.length > 0 ? (
                    <div style={{
                      padding: '10px 12px', borderRadius: 6,
                      background: 'rgba(255,82,82,0.06)', borderLeft: '3px solid #FF5252',
                    }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#FF5252', marginBottom: 6, letterSpacing: 0.5 }}>
                        ↓ İZAHNAMEDEN OLUMSUZ DİPNOTLAR
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                        {negatives.slice(0, 4).map((n, i) => (
                          <li key={i} style={{ marginBottom: 3 }}>{String(n)}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {/* AI tavsiyesinin ilk paragrafi — tam raporun bir kismi */}
              {ai?.recommendation || ai?.analysis ? (() => {
                const raw = String(ai.recommendation || ai.analysis || '');
                // Ilk anlamli cumleyi al, 250 karaktere kadar
                let snippet = raw.slice(0, 280);
                const lastDot = snippet.lastIndexOf('.');
                if (lastDot > 150) snippet = snippet.slice(0, lastDot + 1);
                return (
                  <div style={{
                    marginTop: 6, padding: '10px 12px',
                    background: 'rgba(41,121,255,0.06)', borderLeft: '3px solid #2979FF',
                    borderRadius: 6,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2979FF', marginBottom: 6, letterSpacing: 0.5 }}>
                      🤖 AI DEĞERLENDİRME (ÖZET)
                    </div>
                    <p style={{ fontSize: 13, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.6 }}>
                      {snippet}{raw.length > snippet.length ? ' Uygulamada tam rapor...' : ''}
                    </p>
                  </div>
                );
              })() : null}

              {/* Günlük Kapanış Verileri */}
              {tracks.length > 0 ? (
                <div style={{ marginTop: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: 0.5 }}>
                    📈 GÜNLÜK KAPANIŞ VERİLERİ
                  </div>
                  <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                      <thead>
                        <tr style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                          <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600 }}>Gün</th>
                          <th style={{ padding: '6px 8px', textAlign: 'left', fontWeight: 600 }}>Tarih</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>Kapanış</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>% Fark</th>
                          <th style={{ padding: '6px 8px', textAlign: 'right', fontWeight: 600 }}>Küm. E.D.O</th>
                          <th style={{ padding: '6px 8px', textAlign: 'center', fontWeight: 600 }}>Durum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tracks.slice(0, 25).map((t, i) => {
                          const st = statusDayLabel[(t.status || '').toLowerCase()] || { label: t.status || '-', color: 'var(--text-muted)' };
                          const chg = t.change_pct != null ? Number(t.change_pct) : null;
                          const chgColor = chg == null ? 'var(--text-muted)' : chg > 0 ? '#4CAF50' : chg < 0 ? '#FF5252' : 'var(--text-muted)';
                          return (
                            <tr key={i} style={{ borderTop: '1px solid var(--border-subtle, rgba(255,255,255,0.05))' }}>
                              <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{t.trading_day ?? i + 1}</td>
                              <td style={{ padding: '6px 8px', color: 'var(--text-secondary)' }}>{t.trade_date ? formatDate(t.trade_date) : '-'}</td>
                              <td style={{ padding: '6px 8px', textAlign: 'right', color: 'var(--text-primary)', fontWeight: 600 }}>
                                {t.close_price ? `${Number(t.close_price).toFixed(2)} ₺` : '-'}
                              </td>
                              <td style={{ padding: '6px 8px', textAlign: 'right', color: chgColor, fontWeight: 600 }}>
                                {chg != null ? `${chg > 0 ? '+' : ''}${chg.toFixed(2)}%` : '-'}
                              </td>
                              <td style={{ padding: '6px 8px', textAlign: 'right', color: 'var(--text-muted)' }}>
                                {t.cumulative_return_pct != null ? `%${Number(t.cumulative_return_pct).toFixed(2)}` : '-'}
                              </td>
                              <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                                <span style={{ color: st.color, fontWeight: 700, fontSize: 11 }}>{st.label}</span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {/* Dağıtım Sonuçları */}
              {allocs.length > 0 ? (
                <div style={{ marginTop: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: 0.5 }}>
                    📊 DAĞITIM SONUÇLARI
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 8 }}>
                    {allocs.map((a, i) => (
                      <div key={i} style={{ padding: '10px 12px', background: 'var(--bg-surface)', borderRadius: 6, border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))' }}>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                          {allocLabel[a.group_name || ''] || a.group_name}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                          {a.allocation_pct != null ? <div>Oran: <b>%{Number(a.allocation_pct).toFixed(2)}</b></div> : null}
                          {a.allocated_lots != null ? <div>Tahsis: <b>{Number(a.allocated_lots).toLocaleString('tr-TR')} lot</b></div> : null}
                          {a.participants != null ? <div>Başvuran: <b>{Number(a.participants).toLocaleString('tr-TR')}</b></div> : null}
                          {a.lots_per_person != null ? <div>Kişi Başı: <b>{Number(a.lots_per_person).toFixed(2)} lot</b></div> : null}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Fon Kullanımı */}
              {fundUsage.length > 0 ? (
                <div style={{ marginTop: 6, padding: '10px 12px', background: 'rgba(138,43,226,0.06)', borderLeft: '3px solid #8A2BE2', borderRadius: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#8A2BE2', marginBottom: 6, letterSpacing: 0.5 }}>
                    💼 FON KULLANIM PLANI
                  </div>
                  <ul style={{ margin: 0, paddingLeft: 18, fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                    {fundUsage.map((f, i) => (<li key={i}>{f}</li>))}
                  </ul>
                </div>
              ) : null}

              {/* Aracı Kurumlar */}
              {brokers.length > 0 ? (
                <div style={{ marginTop: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: 0.5 }}>
                    🏦 HALKA ARZA ARACILIK EDEN KURUMLAR ({brokers.length})
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {brokers.slice(0, 40).map((b, i) => (
                      <span key={i} style={{
                        fontSize: 11, padding: '3px 8px', borderRadius: 4,
                        background: 'var(--bg-surface)', color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle, rgba(255,255,255,0.06))',
                      }}>
                        {(b.broker_name || '').replace(/A\.\u015E\./g, 'A.Ş.').replace(/\uDC9E/g, '')}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Şirket Açıklaması (uzun metin — SEO icerik) */}
              {ipo.company_description ? (
                <div style={{ marginTop: 6, padding: '10px 12px', background: 'var(--bg-surface)', borderRadius: 6 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 6, letterSpacing: 0.5 }}>
                    🏢 ŞİRKET HAKKINDA
                  </div>
                  <p style={{ fontSize: 12, color: 'var(--text-secondary)', margin: 0, lineHeight: 1.7, whiteSpace: 'pre-wrap' }}>
                    {ipo.company_description.length > 1200
                      ? ipo.company_description.slice(0, 1200) + '...'
                      : ipo.company_description}
                  </p>
                </div>
              ) : null}

              {/* Tavan durumu özet rozeti */}
              {ipo.first_day_close_price || ipo.ceiling_broken != null ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 11 }}>
                  {ipo.first_day_close_price ? (
                    <span style={{ padding: '4px 8px', borderRadius: 4, background: 'rgba(76,175,80,0.08)', color: '#4CAF50', fontWeight: 600 }}>
                      1. Gün Kapanış: {Number(ipo.first_day_close_price).toFixed(2)} ₺
                    </span>
                  ) : null}
                  {ipo.ceiling_broken ? (
                    <span style={{ padding: '4px 8px', borderRadius: 4, background: 'rgba(255,82,82,0.08)', color: '#FF5252', fontWeight: 600 }}>
                      Tavan Kırıldı{ipo.ceiling_broken_at ? ` — ${formatDate(ipo.ceiling_broken_at)}` : ''}
                    </span>
                  ) : ipo.ceiling_broken === false && (ipo.trading_day_count ?? 0) > 0 ? (
                    <span style={{ padding: '4px 8px', borderRadius: 4, background: 'rgba(76,175,80,0.08)', color: '#4CAF50', fontWeight: 600 }}>
                      {ipo.trading_day_count} Gün Üst Üste Tavan ✓
                    </span>
                  ) : null}
                  {ipo.lock_up_period_days ? (
                    <span style={{ padding: '4px 8px', borderRadius: 4, background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                      Lock-up: {ipo.lock_up_period_days} gün
                    </span>
                  ) : null}
                </div>
              ) : null}

              {/* Kaynaklar */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                {ipo.spk_approval_date ? <span>SPK Onay: {formatDate(ipo.spk_approval_date)}</span> : null}
                {ipo.spk_bulletin_no ? <span>Bülten: {ipo.spk_bulletin_no}</span> : null}
                {ipo.distribution_method ? <span>Dağıtım: {ipo.distribution_method === 'esit' ? 'Eşit' : ipo.distribution_method === 'oransal' ? 'Oransal' : ipo.distribution_method}</span> : null}
                {ipo.market_segment ? <span>Pazar: {ipo.market_segment.replace(/_/g, ' ')}</span> : null}
                {ipo.lead_broker ? <span>Konsorsiyum Lideri: {ipo.lead_broker.replace(/A\.\u015E\./g, 'A.Ş.').slice(0, 80)}</span> : null}
                {ipo.prospectus_url ? (
                  <a href={ipo.prospectus_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2979FF' }}>
                    İzahname (PDF) →
                  </a>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
