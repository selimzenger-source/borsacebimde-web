'use client';

import { useEffect, useState, useMemo } from 'react';
import { api, formatDate, type IPO, type IPODetail, type IPOCeilingTrack, type IPOBroker, type IPOAllocation } from '@/lib/api';
import AdBanner from '@/components/AdBanner';
import AppStoreBanner from '@/components/AppStoreBanner';

// ─── Turkish Label Maps ──────────────────────────────────────────────────────

const DISTRIBUTION_LABELS: Record<string, string> = {
  esit: 'Eşit Dağıtım',
  bireysele_esit: 'Bireysele Eşit',
  tamami_esit: 'Tamamı Eşit',
  oransal: 'Oransal',
  karma: 'Karma',
};

const MARKET_LABELS: Record<string, string> = {
  yildiz_pazar: 'Yıldız Pazar',
  ana_pazar: 'Ana Pazar',
  alt_pazar: 'Alt Pazar',
};

const PARTICIPATION_LABELS: Record<string, string> = {
  talep_toplama: 'Halka Arz Bölümünden',
  borsada_satis: 'Borsada Satış',
};

const KATILIM_LABELS: Record<string, string> = {
  uygun: 'Uygun',
  uygun_degil: 'Uygun Değil',
};

const STATUS_LABELS: Record<string, string> = {
  spk_pending: 'SPK Onayı Beklenen',
  newly_approved: 'SPK Onaylı',
  in_distribution: 'Dağıtımda',
  awaiting_trading: 'İşlem Bekliyor',
  trading: 'İşlem Görüyor',
  archived: 'Arşiv',
  completed: 'Tamamlandı',
  cancelled: 'İptal',
};

const DURUM_MAP: Record<string, { label: string; color: string }> = {
  tavan: { label: 'TAVAN', color: '#00E676' },
  alici_kapatti: { label: 'ALICILI', color: '#81C784' },
  aktif: { label: 'ALICILI', color: '#81C784' },
  not_kapatti: { label: 'NÖTR', color: '#90A4AE' },
  satici_kapatti: { label: 'SATICILI', color: '#FF8A65' },
  satici: { label: 'SATICILI', color: '#FF8A65' },
  taban: { label: 'TABAN', color: '#FF5252' },
};

const ALLOCATION_GROUP_LABELS: Record<string, string> = {
  bireysel: 'Yurt İçi Bireysel',
  yuksek_basvurulu: 'Yüksek Başvurulu',
  kurumsal_yurtici: 'Kurumsal Yurt İçi',
  kurumsal_yurtdisi: 'Kurumsal Yurt Dışı',
};

const BROKER_TYPE_LABELS: Record<string, string> = {
  banka: 'Banka',
  araci_kurum: 'Aracı Kurum',
  konsorsiyum: 'Konsorsiyum',
};

function tr(map: Record<string, string>, val: string | null): string {
  if (!val) return '\u2014';
  return map[val] ?? val.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

// ─── Status Section Config ──────────────────────────────────────────────────

interface StatusSection {
  key: string;
  title: string;
  color: string;
  emptyText: string;
}

const STATUS_SECTIONS: StatusSection[] = [
  { key: 'newly_approved', title: 'Yeni Onaylanan', color: '#FFD700', emptyText: 'Yeni onaylanan halka arz yok' },
  { key: 'in_distribution', title: 'Dağıtım Sürecinde', color: '#2979FF', emptyText: 'Aktif dağıtım süreci yok' },
  { key: 'awaiting_trading', title: 'İşlem Günü Beklenen', color: '#FF9800', emptyText: 'İşlem günü beklenen halka arz yok' },
  { key: 'trading', title: 'İşleme Başlayanlar', color: '#4CAF50', emptyText: '' },
  { key: 'completed', title: '25 Gününü Tamamlayanlar', color: '#78909C', emptyText: '' },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatMoney(val: string | null): string {
  if (!val) return '\u2014';
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  return num.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20BA';
}

function formatBigMoney(val: string | null): string {
  if (!val) return '\u2014';
  const num = parseFloat(val);
  if (isNaN(num)) return val;
  if (num >= 1e9) return (num / 1e9).toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Milyar \u20BA';
  if (num >= 1e6) return (num / 1e6).toLocaleString('tr-TR', { maximumFractionDigits: 1 }) + ' Milyon \u20BA';
  return num.toLocaleString('tr-TR') + ' \u20BA';
}

function formatLot(lot: number | null): string {
  if (lot == null) return '\u2014';
  return lot.toLocaleString('tr-TR');
}

function formatPct(pct: number | null | undefined): { text: string; color: string } {
  if (pct == null) return { text: '\u2014', color: 'var(--text-muted)' };
  const sign = pct > 0 ? '+' : '';
  const color = pct > 0 ? '#4CAF50' : pct < 0 ? '#FF5252' : 'var(--text-muted)';
  return { text: `${sign}${pct.toLocaleString('tr-TR', { minimumFractionDigits: 1, maximumFractionDigits: 2 })}%`, color };
}

function formatClosePrice(price: number | null | undefined): string {
  if (price == null) return '\u2014';
  return price.toLocaleString('tr-TR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' \u20BA';
}

function statusColor(status: string): string {
  const map: Record<string, string> = {
    newly_approved: '#FFD700', in_distribution: '#2979FF', awaiting_trading: '#FF9800',
    trading: '#4CAF50', completed: '#78909C', cancelled: '#FF5252', spk_pending: '#94A3B8',
  };
  return map[status] ?? 'var(--text-muted)';
}

// ─── Skeleton ────────────────────────────────────────────────────────────────

function CardSkeleton() {
  return (
    <div className="card p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="skeleton h-6 w-20 rounded" />
        <div className="skeleton h-6 w-24 rounded-lg" />
      </div>
      <div className="skeleton h-4 w-48 rounded" />
      <div className="grid grid-cols-2 gap-2">
        <div className="skeleton h-14 rounded-lg" />
        <div className="skeleton h-14 rounded-lg" />
        <div className="skeleton h-14 rounded-lg" />
        <div className="skeleton h-14 rounded-lg" />
      </div>
    </div>
  );
}

// ─── Data Cell ───────────────────────────────────────────────────────────────

function DataCell({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex flex-col gap-0.5 px-3 py-2.5 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
      <span style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        {label}
      </span>
      <span className="text-sm font-bold" style={{ color: color ?? 'var(--text-primary)' }}>
        {value}
      </span>
    </div>
  );
}

// ─── Progress Bar (dotted style) ─────────────────────────────────────────────

function TradingProgress({ days, total = 25 }: { days: number; total?: number }) {
  const filled = Math.min(days, total);
  const isComplete = days >= total;
  return (
    <div className="flex items-center gap-3 w-full">
      <div className="flex gap-[3px] flex-1 flex-wrap">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: i < filled ? (isComplete ? '#78909C' : '#2979FF') : 'rgba(148,163,184,0.15)',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Ceiling Track Table ─────────────────────────────────────────────────────

function CeilingTrackTable({ tracks }: { tracks: IPOCeilingTrack[] }) {
  const sorted = [...tracks].sort((a, b) => a.trading_day - b.trading_day);

  return (
    <div style={{ overflowX: 'auto' }}>
      {/* Header */}
      <div
        className="grid text-xs font-semibold px-3 py-2"
        style={{
          gridTemplateColumns: '40px 1fr 1fr 1fr',
          color: 'var(--text-muted)',
          borderBottom: '1px solid var(--border-primary)',
        }}
      >
        <span>GÜN</span>
        <span>KAPANIŞ</span>
        <span style={{ textAlign: 'center' }}>% FARK</span>
        <span style={{ textAlign: 'right' }}>DURUM</span>
      </div>

      {/* Rows */}
      {sorted.map((track) => {
        const pct = formatPct(track.pct_change);
        const durum = track.durum ? (DURUM_MAP[track.durum] ?? { label: track.durum, color: 'var(--text-muted)' }) : null;

        return (
          <div
            key={track.trading_day}
            className="grid items-center px-3 py-2.5"
            style={{
              gridTemplateColumns: '40px 1fr 1fr 1fr',
              borderBottom: '1px solid var(--border-primary)',
              background: track.trading_day % 2 === 0 ? 'rgba(148,163,184,0.03)' : 'transparent',
            }}
          >
            <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
              {track.trading_day}
            </span>
            <div className="flex flex-col">
              <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                {formatClosePrice(track.close_price)}
              </span>
              {track.cumulative_edo_pct != null && (
                <span style={{ fontSize: 10, color: '#2979FF' }}>
                  Küm. E.D.O: %{track.cumulative_edo_pct.toLocaleString('tr-TR', { minimumFractionDigits: 2 })}
                </span>
              )}
            </div>
            <span className="text-sm font-bold text-center" style={{ color: pct.color }}>
              {pct.text}
            </span>
            {durum && (
              <span
                className="text-xs font-bold text-right px-2 py-1 rounded inline-flex justify-end"
                style={{ color: durum.color }}
              >
                {durum.label}
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Broker List ─────────────────────────────────────────────────────────────

function BrokerList({ brokers }: { brokers: IPOBroker[] }) {
  // Sadece aktif (reddedilmemiş) bankalar/aracı kurumlar gösterilir
  const activeBrokers = brokers.filter(b => !b.is_rejected);
  if (activeBrokers.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        KATILIMCI BANKALAR / ARACI KURUMLAR
      </span>
      <div className="flex flex-wrap gap-1.5">
        {activeBrokers.map((b) => (
          <span
            key={b.id}
            className="text-xs px-2.5 py-1 rounded-md font-medium"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
            }}
          >
            {b.broker_name}
            {b.broker_type && (
              <span style={{ color: 'var(--text-muted)', fontSize: 10, marginLeft: 4 }}>
                ({tr(BROKER_TYPE_LABELS, b.broker_type)})
              </span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Allocation Table ────────────────────────────────────────────────────────

function AllocationTable({ allocations }: { allocations: IPOAllocation[] }) {
  if (allocations.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5">
      <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
        DAĞITIM SONUÇLARI
      </span>
      <div className="grid gap-1.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {allocations.map((a) => (
          <div key={a.id} className="rounded-lg px-3 py-2" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}>
            <div className="text-xs font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {tr(ALLOCATION_GROUP_LABELS, a.group_name)}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px]" style={{ color: 'var(--text-secondary)' }}>
              {a.avg_lot_per_person != null && <span>Kişi Başı: <b>{a.avg_lot_per_person.toLocaleString('tr-TR')} lot</b></span>}
              {a.participant_count != null && <span>Başvuran: <b>{a.participant_count.toLocaleString('tr-TR')}</b></span>}
              {a.allocation_pct != null && <span>Oran: <b>%{a.allocation_pct}</b></span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── IPO Card (Expandable) ───────────────────────────────────────────────────

function IPOCard({ ipo }: { ipo: IPO }) {
  const [expanded, setExpanded] = useState(false);
  const [detail, setDetail] = useState<IPODetail | null>(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const color = statusColor(ipo.status);
  const isTrading = ipo.status === 'trading' || ipo.status === 'completed';
  const pct = formatPct(ipo.percent_change);

  const handleExpand = () => {
    if (!expanded && !detail) {
      setLoadingDetail(true);
      api.getIPODetail(ipo.id)
        .then(setDetail)
        .catch(() => {})
        .finally(() => setLoadingDetail(false));
    }
    setExpanded(!expanded);
  };

  return (
    <div className="card overflow-hidden" style={{ borderLeft: `3px solid ${color}` }}>
      {/* ── Main Card (always visible) ── */}
      <div
        className="cursor-pointer"
        onClick={handleExpand}
        style={{ transition: 'background 0.15s' }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(148,163,184,0.04)'}
        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 px-5 pt-4 pb-2">
          <div className="flex flex-col gap-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="text-lg font-extrabold tracking-tight" style={{ color: 'var(--text-primary)' }}>
                {ipo.ticker || ipo.company_name.split(' ')[0]}
              </span>
              {isTrading && (
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-lg"
                  style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
                >
                  {Math.min(ipo.trading_day_count, 25)}/25 Gün
                </span>
              )}
              {isTrading && pct.text !== '\u2014' && (
                <span className="text-sm font-extrabold" style={{ color: pct.color }}>
                  {pct.text}
                </span>
              )}
            </div>
            <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {ipo.company_name}
            </span>
          </div>

          <span
            className="shrink-0 text-[11px] font-bold px-2.5 py-1 rounded-lg"
            style={{ background: `${color}15`, color, border: `1px solid ${color}30` }}
          >
            {tr(STATUS_LABELS, ipo.status)}
          </span>
        </div>

        {/* Quick data */}
        <div className="px-5 pb-3">
          <div className="grid grid-cols-2 gap-2">
            {isTrading ? (
              <>
                {ipo.ipo_price && <DataCell label="Halka Arz Fiyatı" value={formatMoney(ipo.ipo_price)} />}
                {ipo.close_price != null && <DataCell label="Son Kapanış" value={formatClosePrice(ipo.close_price)} />}
                {ipo.percent_change != null && <DataCell label="Performans" value={pct.text} color={pct.color} />}
                {ipo.distribution_method && <DataCell label="Dağıtım" value={tr(DISTRIBUTION_LABELS, ipo.distribution_method)} />}
              </>
            ) : (
              <>
                {ipo.ipo_price && <DataCell label="Fiyat" value={formatMoney(ipo.ipo_price)} />}
                {ipo.distribution_method && <DataCell label="Dağıtım" value={tr(DISTRIBUTION_LABELS, ipo.distribution_method)} />}
              </>
            )}
          </div>

          {/* SPK Onay date for newly_approved */}
          {ipo.spk_approval_date && !isTrading && (
            <div className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>
              Onay: {formatDate(ipo.spk_approval_date)}
            </div>
          )}

          {/* Katılım endeksi */}
          {ipo.katilim_endeksi && (
            <div className="mt-1.5">
              <span
                className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-md font-medium"
                style={{
                  background: ipo.katilim_endeksi === 'uygun' ? 'rgba(76,175,80,0.1)' : 'rgba(255,82,82,0.1)',
                  color: ipo.katilim_endeksi === 'uygun' ? '#4CAF50' : '#FF5252',
                  border: `1px solid ${ipo.katilim_endeksi === 'uygun' ? 'rgba(76,175,80,0.2)' : 'rgba(255,82,82,0.2)'}`,
                }}
              >
                {ipo.katilim_endeksi === 'uygun' ? '✓' : '✗'} Katılım Endeksine {tr(KATILIM_LABELS, ipo.katilim_endeksi)}
              </span>
            </div>
          )}

          {/* Progress bar for trading */}
          {isTrading && (
            <div className="mt-3">
              <TradingProgress days={ipo.trading_day_count} />
            </div>
          )}
        </div>

        {/* Expand hint */}
        <div
          className="text-center py-2 text-xs font-medium"
          style={{ color: 'var(--text-muted)', borderTop: '1px solid var(--border-primary)' }}
        >
          {expanded ? '▲ Kapat' : '▼ Detaylar için tıklayınız'}
        </div>
      </div>

      {/* ── Expanded Detail ── */}
      {expanded && (
        <div style={{ borderTop: '1px solid var(--border-primary)' }}>
          {loadingDetail && (
            <div className="p-5 text-center">
              <div className="skeleton h-4 w-40 mx-auto rounded mb-3" />
              <div className="skeleton h-4 w-60 mx-auto rounded" />
            </div>
          )}

          {detail && (
            <div className="flex flex-col gap-4 p-5">
              {/* ARZ BİLGİLERİ */}
              <div className="rounded-xl overflow-hidden" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}>
                <div className="px-4 py-2.5" style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-primary)', letterSpacing: 0.5 }}>
                    ARZ BİLGİLERİ
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-px" style={{ background: 'var(--border-primary)' }}>
                  {detail.total_lots != null && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>TOPLAM LOT</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatLot(detail.total_lots)}</div>
                    </div>
                  )}
                  {detail.market_segment && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>PAZAR</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{tr(MARKET_LABELS, detail.market_segment)}</div>
                    </div>
                  )}
                  {detail.public_float_pct && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>HALKA AÇIKLIK</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>%{detail.public_float_pct}</div>
                    </div>
                  )}
                  {detail.discount_pct && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>İSKONTO</div>
                      <div className="text-sm font-bold" style={{ color: '#4CAF50' }}>%{detail.discount_pct}</div>
                    </div>
                  )}
                  {detail.spk_bulletin_no && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>SPK BÜLTEN</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{detail.spk_bulletin_no}</div>
                    </div>
                  )}
                  {detail.offering_size_tl && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>ARZ BÜYÜKLÜĞÜ</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatBigMoney(detail.offering_size_tl)}</div>
                    </div>
                  )}
                  {detail.participation_method && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>KATILIM YÖNTEMİ</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{tr(PARTICIPATION_LABELS, detail.participation_method)}</div>
                    </div>
                  )}
                  {detail.estimated_lots_per_person != null && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>KİŞİ BAŞI TAHMİNİ LOT</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{formatLot(detail.estimated_lots_per_person)}</div>
                    </div>
                  )}
                  {detail.total_applicants != null && (
                    <div className="px-3 py-2.5" style={{ background: 'var(--bg-card)' }}>
                      <div style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 600 }}>TOPLAM BAŞVURAN</div>
                      <div className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{detail.total_applicants.toLocaleString('tr-TR')}</div>
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs">
                {detail.subscription_start && detail.subscription_end && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    Talep: <b style={{ color: 'var(--text-secondary)' }}>{formatDate(detail.subscription_start)} - {formatDate(detail.subscription_end)}</b>
                  </span>
                )}
                {detail.subscription_hours && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    Saatler: <b style={{ color: 'var(--text-secondary)' }}>{detail.subscription_hours}</b>
                  </span>
                )}
                {detail.trading_start && (
                  <span style={{ color: 'var(--text-muted)' }}>
                    İlk İşlem: <b style={{ color: '#4CAF50' }}>{formatDate(detail.trading_start)}</b>
                  </span>
                )}
              </div>

              {/* Brokers */}
              {detail.brokers && detail.brokers.length > 0 && (
                <BrokerList brokers={detail.brokers} />
              )}

              {/* Allocations */}
              {detail.allocations && detail.allocations.length > 0 && (
                <AllocationTable allocations={detail.allocations} />
              )}

              {/* Ceiling Tracks (daily trading data) */}
              {detail.ceiling_tracks && detail.ceiling_tracks.length > 0 && (
                <div>
                  <div className="mb-2">
                    <span style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                      GÜNLÜK KAPANIŞ VERİLERİ
                    </span>
                  </div>
                  <div className="rounded-xl overflow-hidden" style={{ border: '1px solid var(--border-primary)' }}>
                    <CeilingTrackTable tracks={detail.ceiling_tracks} />
                  </div>
                </div>
              )}

              {/* Links */}
              <div className="flex flex-wrap gap-3">
                {detail.kap_notification_url && (
                  <a
                    href={detail.kap_notification_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: '#2979FF' }}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                    KAP Bildirimi
                  </a>
                )}
                {detail.prospectus_url && (
                  <a
                    href={detail.prospectus_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold"
                    style={{ color: '#FF9800' }}
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                    </svg>
                    İzahname
                  </a>
                )}
              </div>
            </div>
          )}

          {!loadingDetail && !detail && (
            <div className="p-5 text-center text-xs" style={{ color: 'var(--text-muted)' }}>
              Detay bilgisi yüklenemedi.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Section Component ───────────────────────────────────────────────────────

function IPOSection({ section, items, adCounter }: { section: StatusSection; items: IPO[]; adCounter: { current: number } }) {
  const isTrading = section.key === 'trading' || section.key === 'completed';
  const tradingDays = isTrading ? items.reduce((acc, ipo) => acc + ipo.trading_day_count, 0) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      {/* Section Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: `${section.color}15`, border: `1px solid ${section.color}25`, color: section.color }}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              {section.key === 'newly_approved' && <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
              {section.key === 'in_distribution' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
              {section.key === 'awaiting_trading' && <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />}
              {(section.key === 'trading' || section.key === 'completed') && <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />}
            </svg>
          </div>
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            {section.title}
          </h2>
          {isTrading && <span className="pulse-dot" style={{ background: '#4CAF50', width: 8, height: 8, borderRadius: '50%' }} />}
        </div>
        <span
          className="text-xs font-bold px-2.5 py-1 rounded-full"
          style={{ background: `${section.color}15`, color: section.color }}
        >
          {items.length} hisse {isTrading ? `• 25 gün` : ''}
        </span>
      </div>

      {/* Empty state */}
      {items.length === 0 && section.emptyText && (
        <div
          className="text-center py-4 rounded-xl text-sm"
          style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)', border: '1px solid var(--border-primary)' }}
        >
          {section.emptyText}
        </div>
      )}

      {/* Cards */}
      {items.map((ipo) => {
        adCounter.current++;
        const showAd = adCounter.current % 4 === 0;
        return (
          <div key={ipo.id}>
            <IPOCard ipo={ipo} />
            {showAd && (
              <div style={{ marginTop: 12 }}>
                <AdBanner slot="4045086866" format="horizontal" />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function HalkaArzPage() {
  const [ipos, setIpos] = useState<IPO[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api.getIPOs()
      .then((data) => { setIpos(data); setLoading(false); })
      .catch(() => { setError(true); setLoading(false); });
  }, []);

  const grouped = useMemo(() => {
    const map: Record<string, IPO[]> = {};
    for (const s of STATUS_SECTIONS) map[s.key] = [];
    for (const ipo of ipos) {
      // 25 günü tamamlayanlar ayrı gruba
      const key = ipo.trading_day_count >= 25 && (ipo.status === 'trading' || ipo.status === 'completed') ? 'completed' : ipo.status;
      if (map[key]) map[key].push(ipo);
      // Bilinmeyen durumlara düşenler en yakın gruba
    }
    return map;
  }, [ipos]);

  const adCounter = { current: 0 };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

      {/* ── Page Header ── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))', borderColor: 'rgba(41,121,255,0.2)' }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.1) 0%, transparent 70%)' }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)' }}>
            <svg className="w-3.5 h-3.5" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>Halka Arz Merkezi</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Halka Arz Takibi</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>SPK onaylı güncel halka arzlar, dağıtım süreçleri ve işlem verileri</p>
        </div>
      </header>

      {/* ── Error ── */}
      {error && (
        <div className="card p-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Veriler yüklenirken hata oluştu.</p>
          <button
            onClick={() => { setError(false); setLoading(true); api.getIPOs().then(d => { setIpos(d); setLoading(false); }).catch(() => { setError(true); setLoading(false); }); }}
            className="px-4 py-2 rounded-lg text-sm font-semibold"
            style={{ background: 'var(--bg-surface)', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)' }}
          >
            Tekrar Dene
          </button>
        </div>
      )}

      {/* ── Loading ── */}
      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {Array.from({ length: 5 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
      )}

      {/* ── Grouped Sections ── */}
      {!loading && !error && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {STATUS_SECTIONS.map((section) => (
            <IPOSection key={section.key} section={section} items={grouped[section.key] ?? []} adCounter={adCounter} />
          ))}
        </div>
      )}

      {/* ── Disclaimer ── */}
      <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,215,0,0.06)', border: '1px solid rgba(255,215,0,0.15)' }}>
        <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FFD700' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <circle cx="12" cy="12" r="10" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16v-4m0-4h.01" />
        </svg>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Halka arz verileri SPK ve KAP kaynaklarından alınmaktadır. Bu sayfa yalnızca bilgi amaçlıdır;{' '}
          <span className="font-medium" style={{ color: 'var(--text-primary)' }}>yatırım tavsiyesi içermez</span>.
        </p>
      </div>

      <AdBanner slot="4045086866" format="horizontal" />
      <AppStoreBanner />
    </div>
  );
}
