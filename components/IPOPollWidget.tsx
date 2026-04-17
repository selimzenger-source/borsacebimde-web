'use client';

/**
 * IPOPollWidget — Halka Arz 2 Fazlı Anket (Web)
 *
 * FAZ 1 — Hype: 3 buton + stacked progress bar
 * FAZ 2 — Ceiling: range slider (1-25) + canlı ortalama + Gönder
 *         Sonuç: ortalama + mini histogram (1-25 dağılımı) + en çok tahmin
 *
 * ARŞİV MODU — Anket kapalı (phase=null) ama stats var → read-only özet
 *
 * Tek oy: Backend IP'den (X-Forwarded-For) alıyor, (ipo_id, phase, ip) UNIQUE
 */

import { useEffect, useState, useCallback, useMemo } from 'react';

const GREEN = '#00C853';
const GREY = '#90A4AE';
const RED = '#EF5350';
const GOLD = '#FFB300';

const MIN_CEILING = 1;
const MAX_CEILING = 25;

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sz-bist-finans-api.onrender.com';

interface HypeStats {
  total: number;
  participate: number; participate_pct: number;
  skip: number;        skip_pct: number;
}

interface CeilingStats {
  total: number;
  average: number | null;
  distribution: Record<string, number>;
}

interface PollState {
  phase: 'hype' | 'ceiling' | null;
  hype: HypeStats;
  ceiling: CeilingStats;
  myHype: string | null;
  myCeiling: string | null;
  loading: boolean;
}

const EMPTY: PollState = {
  phase: null,
  hype: { total: 0, participate: 0, participate_pct: 0, skip: 0, skip_pct: 0 },
  ceiling: { total: 0, average: null, distribution: {} },
  myHype: null,
  myCeiling: null,
  loading: true,
};

export default function IPOPollWidget({ ipoId }: { ipoId: number }) {
  const [state, setState] = useState<PollState>(EMPTY);
  const [submitting, setSubmitting] = useState(false);
  const [ceilingSel, setCeilingSel] = useState(5);

  const refresh = useCallback(async () => {
    try {
      const [phaseR, statsR, myR] = await Promise.all([
        fetch(`${API_URL}/api/v1/ipos/${ipoId}/poll-phase`),
        fetch(`${API_URL}/api/v1/ipos/${ipoId}/poll-stats`),
        fetch(`${API_URL}/api/v1/ipos/${ipoId}/poll-my-vote`),
      ]);
      const [p, s, m] = await Promise.all([
        phaseR.ok ? phaseR.json() : null,
        statsR.ok ? statsR.json() : null,
        myR.ok ? myR.json() : null,
      ]);
      setState({
        phase: p?.phase ?? null,
        hype: s?.hype ?? EMPTY.hype,
        ceiling: s?.ceiling ?? EMPTY.ceiling,
        myHype: m?.hype ?? null,
        myCeiling: m?.ceiling ?? null,
        loading: false,
      });
    } catch {
      setState(prev => ({ ...prev, loading: false }));
    }
  }, [ipoId]);

  useEffect(() => { refresh(); }, [refresh]);

  const submit = async (phase: 'hype' | 'ceiling', choice: string) => {
    setSubmitting(true);
    try {
      await fetch(`${API_URL}/api/v1/ipos/${ipoId}/poll-vote`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phase, choice }),
      });
      await refresh();
    } finally {
      setSubmitting(false);
    }
  };

  if (state.loading) return null;

  const { phase, hype: h, ceiling: c, myHype, myCeiling } = state;
  const hypeHasData = h.total > 0;
  const ceilingHasData = c.total > 0;
  const anyData = hypeHasData || ceilingHasData;

  // Widget hiç render edilmez: anket kapalı + hiç veri yok
  if (!phase && !anyData) return null;

  // ═══════════════════════════════════════
  // ARŞİV MODU
  // ═══════════════════════════════════════
  if (!phase) {
    return (
      <div
        className="rounded-lg px-3 py-2.5 flex flex-col gap-2"
        style={{ background: 'rgba(148,163,184,0.06)', border: '1px solid rgba(148,163,184,0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-1.5" style={{ fontSize: 10, color: 'var(--text-muted)', fontWeight: 700, letterSpacing: 0.3 }}>
          📊 Anket Sonuçları (Kapandı)
        </div>
        {hypeHasData && (
          <>
            <div style={{ fontSize: 10, color: 'var(--text-secondary)' }}>
              <span style={{ color: GREEN, fontWeight: 700 }}>%{Math.round(h.participate_pct)}</span> katılacağım ·{' '}
              <span style={{ color: RED, fontWeight: 700 }}>%{Math.round(h.skip_pct)}</span> hayır
              <span style={{ color: 'var(--text-muted)', fontSize: 9, marginLeft: 4 }}>({h.total} oy)</span>
            </div>
            <StackedBar p={h.participate_pct} s={h.skip_pct} />
          </>
        )}
        {ceilingHasData && (
          <CeilingResult c={c} />
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════
  // FAZ 1 — HYPE
  // ═══════════════════════════════════════
  if (phase === 'hype') {
    const voted = !!myHype;

    if (!voted) {
      return (
        <div
          className="rounded-lg px-3 py-2.5 flex flex-col gap-2"
          style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
            Bu halka arza katılacak mısın?
          </div>
          <div className="flex gap-1.5">
            <HypeBtn color={GREEN} label="Evet, Katılacağım"      onClick={() => submit('hype', 'participate')} disabled={submitting} />
            <HypeBtn color={RED}   label="Hayır, Katılmayacağım"  onClick={() => submit('hype', 'skip')}        disabled={submitting} />
          </div>
        </div>
      );
    }

    return (
      <div
        className="rounded-lg px-3 py-2 flex flex-col gap-1.5"
        style={{ background: 'rgba(255,152,0,0.04)', border: '1px solid rgba(255,152,0,0.15)' }}
      >
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
          👥 Topluluğun <span style={{ color: GREEN, fontWeight: 700 }}>%{Math.round(h.participate_pct)}</span>
          {'\u2019'}i bu arza katılıyor · {h.total} oy
        </div>
        <StackedBar p={h.participate_pct} s={h.skip_pct} />
      </div>
    );
  }

  // ═══════════════════════════════════════
  // FAZ 2 — CEILING
  // ═══════════════════════════════════════
  const cVoted = !!myCeiling;

  if (cVoted) {
    return (
      <div
        className="rounded-lg px-3 py-2.5 flex flex-col gap-2"
        style={{ background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.25)' }}
      >
        <CeilingResult c={c} myVote={myCeiling} />
      </div>
    );
  }

  // Oy öncesi — slider + canlı ortalama
  return (
    <div
      className="rounded-lg px-3 py-2.5 flex flex-col gap-2"
      style={{ background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.25)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
        Sence bu hisse kaç tavan yapar?
      </div>

      <div className="flex items-center gap-2.5">
        <div style={{ fontSize: 22, fontWeight: 800, color: GOLD, minWidth: 36, textAlign: 'center' }}>
          {ceilingSel}
        </div>
        <input
          type="range"
          min={MIN_CEILING}
          max={MAX_CEILING}
          value={ceilingSel}
          onChange={(e) => setCeilingSel(Number(e.target.value))}
          onClick={(e) => e.stopPropagation()}
          style={{
            flex: 1,
            accentColor: GOLD,
            cursor: 'pointer',
          }}
        />
        <button
          onClick={(e) => { e.stopPropagation(); submit('ceiling', String(ceilingSel)); }}
          disabled={submitting}
          className="shrink-0 rounded-md px-2.5 py-1 text-xs font-extrabold flex items-center gap-1 transition"
          style={{ background: GOLD, color: '#000', opacity: submitting ? 0.5 : 1 }}
        >
          🚀 Gönder
        </button>
      </div>

      {/* Ekseni */}
      <div className="flex justify-between px-1" style={{ fontSize: 9, color: 'var(--text-muted)' }}>
        <span>1</span><span>13</span><span>25</span>
      </div>

      {/* Canlı topluluk ortalaması */}
      {c.total > 0 && c.average != null && (
        <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
          🎯 Topluluk ortalaması: <span style={{ color: GOLD, fontWeight: 700 }}>{c.average}</span>
          <span style={{ fontSize: 9, marginLeft: 4 }}>({c.total} tahmin)</span>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════
// SUB COMPONENTS
// ═══════════════════════════════════════

function HypeBtn({ color, label, onClick, disabled }: {
  color: string; label: string; onClick: () => void; disabled: boolean;
}) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(); }}
      disabled={disabled}
      className="flex-1 rounded-md text-[10px] font-bold py-1.5 px-1 transition"
      style={{
        background: color + '1A',
        color,
        border: `1px solid ${color}55`,
        opacity: disabled ? 0.5 : 1,
      }}
    >
      {label}
    </button>
  );
}

function StackedBar({ p, s }: { p: number; s: number }) {
  return (
    <div className="flex h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
      <div style={{ width: `${p}%`, background: GREEN }} />
      <div style={{ width: `${s}%`, background: RED }} />
    </div>
  );
}

function CeilingResult({ c, myVote }: {
  c: CeilingStats;
  myVote?: string | null;
}) {
  const topEntry = useMemo(() => {
    let best: [string, number] | null = null;
    for (const [k, v] of Object.entries(c.distribution)) {
      const n = Number(v);
      if (!best || n > best[1]) best = [k, n];
    }
    if (!best || c.total === 0) return null;
    return { value: best[0], count: best[1], pct: Math.round((best[1] / c.total) * 100) };
  }, [c.distribution, c.total]);

  const maxCount = useMemo(
    () => Math.max(1, ...Object.values(c.distribution).map(Number)),
    [c.distribution],
  );

  return (
    <>
      <div style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>
        🚀 Ort. <span style={{ color: GOLD, fontWeight: 800 }}>{c.average ?? '—'} Tavan</span>
        {topEntry && (
          <span style={{ color: 'var(--text-muted)', fontSize: 10, marginLeft: 6 }}>
            · En çok <span style={{ color: GOLD, fontWeight: 700 }}>{topEntry.value}</span> (%{topEntry.pct})
          </span>
        )}
      </div>

      {/* Mini histogram — daha geniş, 40px yüksek */}
      <div className="flex items-end" style={{ height: 40, padding: '0 2px', gap: 2 }}>
        {Array.from({ length: MAX_CEILING }, (_, i) => i + 1).map(n => {
          const cnt = Number(c.distribution[String(n)] || 0);
          const h = cnt === 0 ? 3 : Math.max(6, Math.round((cnt / maxCount) * 36));
          return (
            <div
              key={n}
              style={{
                flex: 1,
                height: h,
                background: cnt > 0 ? GOLD : 'rgba(148,163,184,0.22)',
                borderRadius: 2,
                minHeight: 3,
              }}
              title={`${n} tavan: ${cnt} tahmin`}
            />
          );
        })}
      </div>
      <div className="flex justify-between px-1" style={{ fontSize: 9, color: 'var(--text-muted)' }}>
        <span>1</span><span>13</span><span>25</span>
      </div>

      <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
        {myVote ? (
          <>Senin tahminin: <span style={{ color: GOLD, fontWeight: 700 }}>{myVote} tavan</span> · {c.total} kişi katıldı</>
        ) : (
          <>{c.total} kişi tahmin verdi</>
        )}
      </div>
    </>
  );
}
