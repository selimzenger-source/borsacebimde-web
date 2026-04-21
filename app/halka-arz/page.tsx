import type { Metadata } from 'next';
import HalkaArzContent from './Content';
import SsrIpoList from '@/components/SsrIpoList';
import { fetchIposSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'Halka Arz Takvimi 2026 - Güncel SPK Onaylı Halka Arzlar',
  description: 'Güncel halka arz takvimi 2026. SPK onaylı halka arzlar, talep toplama tarihleri, lot dağıtımı, aracı kurum bilgileri ve tavan takibi. BIST halka arz takibi.',
  alternates: { canonical: 'https://borsacebimde.app/halka-arz' },
  keywords: ['halka arz', 'halka arz takvimi', 'halka arz 2026', 'SPK onaylı halka arz', 'borsa halka arz', 'lot dağıtımı', 'tavan takibi'],
};

export default async function HalkaArzPage() {
  const ipos = await fetchIposSSR();

  return (
    <>
      <HalkaArzContent />

      {ipos && ipos.length > 0 ? (
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
          <SsrIpoList
            items={ipos.slice(0, 5)}
            heading="Son 5 Halka Arzın AI Analizi"
            description="En son aktif halka arzlar için izahname analizi, günlük kapanış tablosu, dağıtım sonuçları ve AI değerlendirmesi."
          />

          <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24, marginBottom: 32 }}>
            <a
              href="/indir"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '12px 24px',
                borderRadius: 12,
                background: 'linear-gradient(135deg, #2979FF, #1565C0)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 600,
                textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(41,121,255,0.3)',
              }}
            >
              Daha fazlası uygulamada
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      ) : null}
    </>
  );
}
