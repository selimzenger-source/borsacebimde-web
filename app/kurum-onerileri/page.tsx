import type { Metadata } from 'next';
import KurumOnerileriContent from './Content';

export const metadata: Metadata = {
  title: 'Kurum Önerileri - Aracı Kurum Hedef Fiyat ve Hisse Tavsiyeleri',
  description:
    'BIST hisseleri için aracı kurum hedef fiyat tavsiyeleri. Al, Tut, Sat önerileri ve potansiyel getiri.',
  keywords: ['kurum önerileri', 'hedef fiyat', 'aracı kurum tavsiye', 'hisse önerisi', 'BIST tavsiye'],
  openGraph: {
    title: 'Kurum Önerileri - Aracı Kurum Hedef Fiyat Tavsiyeleri',
    description: 'Aracı kurum hedef fiyat ve hisse tavsiyeleri. Güncel al/sat/tut önerileri.',
  },
};

export default function KurumOnerileriPage() {
  return (
    <>
      <KurumOnerileriContent />
      <section className="mt-8 px-4" style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.7 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 8 }}>
          Kurum Önerileri Nedir?
        </h2>
        <p>
          Aracı kurumlar, piyasa analizleri ve şirket değerlemeleri doğrultusunda hisseler için
          hedef fiyat ve alım-satım tavsiyeleri yayınlar. Bu sayfada tüm aracı kurumların güncel
          önerilerini tek ekrandan takip edebilirsiniz.
        </p>
        <p className="mt-2">Veriler saatlik olarak güncellenir. Kaynak: hedeffiyat.com.tr</p>
        <p className="mt-2" style={{ fontSize: 11, fontStyle: 'italic' }}>
          Bu sayfa yatırım tavsiyesi niteliği taşımaz. Tüm yatırım kararlarının sorumluluğu kullanıcıya aittir.
        </p>
      </section>
    </>
  );
}
