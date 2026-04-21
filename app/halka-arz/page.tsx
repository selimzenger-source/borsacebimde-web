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
            items={ipos}
            heading="Detaylı Halka Arz Verileri"
            description="Aktif halka arzlar için izahname analizi, günlük kapanış tablosu, dağıtım sonuçları, aracı kurumlar ve AI değerlendirmesi."
          />
        </div>
      ) : null}
    </>
  );
}
