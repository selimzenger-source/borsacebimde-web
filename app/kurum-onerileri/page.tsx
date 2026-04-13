import type { Metadata } from 'next';
import KurumOnerileriContent from './Content';

export const metadata: Metadata = {
  title: 'Kurum Önerileri - Aracı Kurum Hedef Fiyat ve Tavsiyeleri',
  description: 'Aracı kurum hisse senedi önerileri ve hedef fiyatları. Al, tut, sat tavsiyeleri, potansiyel getiri oranları. hedeffiyat.com.tr kaynaklı, 2 saatte bir güncellenir.',
  alternates: { canonical: 'https://borsacebimde.app/kurum-onerileri' },
  keywords: ['kurum önerileri', 'hedef fiyat', 'aracı kurum', 'hisse tavsiye', 'borsa öneri', 'al sat tut', 'getiri potansiyeli'],
};

export default function KurumOnerileriPage() {
  return (
    <>
      <KurumOnerileriContent />

      {/* SEO Content Section */}
      <section className="mt-10 flex flex-col gap-8 max-w-4xl mx-auto px-4">
        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Kurum Önerileri Nedir?</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Kurum önerileri, SPK lisanslı aracı kurum ve bankaların araştırma departmanları tarafından hazırlanan
            hisse senedi analiz raporlarıdır. Bu raporlarda şirketlerin temel analizi yapılarak hedef fiyat
            belirlenir ve yatırımcılara Al, Tut veya Sat gibi tavsiyeler sunulur. Hedef fiyat, analistin
            şirketin belirli bir dönemde ulaşmasını beklediği fiyat seviyesidir. Potansiyel getiri ise
            mevcut fiyat ile hedef fiyat arasındaki farkın yüzdesel ifadesidir.
          </p>
        </article>

        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Borsa Cebimde ile Kurum Önerilerini Takip Edin</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, 50&apos;den fazla aracı kurumun güncel hisse senedi önerilerini tek bir sayfada
            toplar. Bugün paylaşılan, bu hafta veya bu ay yayınlanan tüm tavsiyeleri tarih bazlı olarak
            görüntüleyebilir, hisse kodu veya kurum adına göre filtreleyebilirsiniz. Veriler 2 saatte bir
            güncellenerek en güncel tavsiyelere erişim sağlanır.
          </p>
        </article>

        {/* Disclaimer */}
        <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}>
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>Yatırım Uyarısı</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Bu sayfadaki bilgiler yatırım tavsiyesi niteliği taşımaz. Aracı kurum raporları bilgilendirme
              amaçlıdır. Yatırım kararlarınızı almadan önce mutlaka lisanslı bir yatırım danışmanına başvurunuz.
              Kaynak: hedeffiyat.com.tr
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
