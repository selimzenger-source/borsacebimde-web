'use client';

/**
 * IPOPollWidget — Halka Arz 2 Fazlı Anket (Web)
 *
 * Mobil uygulamadaki widget ile aynı mantık, aynı endpoint'ler.
 * Web'de device_id yerine IP adresi ile tek oy kuralı (backend IP'den otomatik alıyor).
 *
 * FAZ 1 — Hype: 3 buton + stacked progress bar
 * FAZ 2 — Ceiling: 1-15 sayı chip'leri + Tahmin Et → "Ort. X Tavan 🚀"
 *
 * Anket kapalı (phase=null) ise hiçbir şey render etmez.
 */

import { useEffect, useState, useCallback } from 'react';

const GREEN = '#00C853';
const GREY = '#90A4AE';
const RED = '#EF5350';
const GOLD = '#FFB300';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://sz-bist-finans-api.onrender.com';

interface HypeStats {
  total: number;
  participate: number; participate_pct: number;
  undecided: number;   undecided_pct: number;
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
  hype: { total: 0, participate: 0, participate_pct: 0, undecided: 0, undecided_pct: 0, skip: 0, skip_pct: 0 },
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

  if (state.loading || !state.phase) return null;

  // ── FAZ 1: HYPE ──
  if (state.phase === 'hype') {
    const voted = !!state.myHype;
    const h = state.hype;

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
            <HypeBtn color={GREEN} label="Katılacağım" onClick={() => submit('hype', 'participate')} disabled={submitting} />
            <HypeBtn color={GREY}  label="Kararsızım"  onClick={() => submit('hype', 'undecided')}   disabled={submitting} />
            <HypeBtn color={RED}   label="Katılmayacağım" onClick={() => submit('hype', 'skip')}      disabled={submitting} />
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
          {'\u2019'}i bu arza katılıyor • {h.total} oy
        </div>
        <div className="flex h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-surface)' }}>
          <div style={{ width: `${h.participate_pct}%`, background: GREEN }} />
          <div style={{ width: `${h.undecided_pct}%`, background: GREY }} />
          <div style={{ width: `${h.skip_pct}%`, background: RED }} />
        </div>
      </div>
    );
  }

  // ── FAZ 2: CEILING ──
  const cVoted = !!state.myCeiling;
  const c = state.ceiling;

  if (!cVoted) {
    return (
      <div
        className="rounded-lg px-3 py-2.5 flex flex-col gap-2"
        style={{ background: 'rgba(255,179,0,0.06)', border: '1px solid rgba(255,179,0,0.25)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>
          Sence bu hisse kaç tavan yapar?
        </div>
        <div className="flex items-center gap-1.5">
          <div className="flex gap-1 overflow-x-auto scrollbar-thin" style={{ flex: 1 }}>
            {Array.from({ length: 15 }, (_, i) => i + 1).map(n => (
              <button
                key={n}
                onClick={(e) => { e.stopPropagation(); setCeilingSel(n); }}
                className="shrink-0 flex items-center justify-center rounded-full text-xs font-bold transition"
                style={{
                  width: 26,
                  height: 26,
                  background: ceilingSel === n ? GOLD : 'var(--bg-surface)',
                  color: ceilingSel === n ? '#000' : 'var(--text-primary)',
                  border: `1px solid ${ceilingSel === n ? GOLD : 'var(--border-primary)'}`,
                }}
              >
                {n}
              </button>
            ))}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); submit('ceiling', String(ceilingSel)); }}
            disabled={submitting}
            className="shrink-0 rounded-md px-2.5 py-1 text-xs font-extrabold flex items-center gap-1"
            style={{ background: GOLD, color: '#000', opacity: submitting ? 0.5 : 1 }}
          >
            🚀 Tahmin Et
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg px-3 py-2 flex items-center gap-2"
      style={{ background: 'rgba(255,179,0,0.08)', border: '1px solid rgba(255,179,0,0.3)' }}
    >
      <span style={{ fontSize: 14 }}>🚀</span>
      <span style={{ fontSize: 12, color: 'var(--text-primary)', fontWeight: 600 }}>
        KY Beklentisi: <span style={{ color: GOLD, fontWeight: 800 }}>Ort. {c.average ?? '—'} Tavan</span>
        <span style={{ color: 'var(--text-muted)', fontSize: 10, marginLeft: 4 }}>• {c.total} tahmin</span>
      </span>
    </div>
  );
}

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
