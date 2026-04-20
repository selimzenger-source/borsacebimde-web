import type { Metadata } from 'next';
import PiyasaHaberleriContent from './Content';
import SsrNewsList from '@/components/SsrNewsList';
import { fetchNewsFeedSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'Piyasa Haberleri - Güncel Borsa ve Finans Haberleri',
  description:
    'Borsa İstanbul ve küresel piyasalardan güncel finans haberleri. Bloomberg HT, BigPara ve Uzmanpara kaynaklı yapay zeka destekli haber akışı.',
  keywords: [
    'borsa haberleri',
    'finans haberleri',
    'piyasa haberleri',
    'BIST haberleri',
    'borsa istanbul haberleri',
    'güncel ekonomi haberleri',
    'hisse senedi haberleri',
  ],
  openGraph: {
    title: 'Piyasa Haberleri - Güncel Borsa ve Finans Haberleri',
    description:
      'Borsa İstanbul ve küresel piyasalardan güncel finans haberleri. Yapay zeka destekli haber akışı ile piyasaları anlık takip edin.',
  },
};

export default async function PiyasaHaberleriPage() {
  const ssrItems = await fetchNewsFeedSSR('news_scanner', 60, 60);

  return (
    <>
      {/* Önce dinamik içerik */}
      <PiyasaHaberleriContent />

      <SsrNewsList
        items={ssrItems}
        heading="Son Piyasa Haberleri"
        description="Borsa İstanbul ve küresel piyasalardan güncel finans haberleri, yapay zeka ile özetlendi."
      />

      {/* SEO içerik aşağıda */}
      <article className="mt-10 flex flex-col gap-6">
        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Piyasa Haberlerini Neden Takip Etmelisiniz?
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Finansal piyasalarda doğru ve zamanında bilgiye ulaşmak, başarılı yatırım kararlarının temelini
            oluşturur. Borsa İstanbul&apos;da işlem gören yüzlerce hisse senedi, tahvil ve diğer finansal
            enstrümanlar sürekli olarak değişen ekonomik koşullardan, şirket haberlerinden ve küresel
            gelişmelerden etkilenir. Güncel haberler sayesinde yatırımcılar, portföylerini etkileyen
            gelişmeleri anında öğrenebilir ve pozisyonlarını buna göre şekillendirebilir.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Platformumuz Bloomberg HT, BigPara ve Uzmanpara gibi güvenilir kaynaklardan haberleri
            derleyerek tek bir noktada sunmaktadır. Her haber görsel destekli olarak sergilenir
            ve kaynak bilgisiyle birlikte gösterilir. Merkez bankası faiz kararları, enflasyon verileri,
            şirket bilançoları ve küresel piyasa gelişmeleri anlık olarak takip edilmektedir.
          </p>
        </div>

        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Piyasa Haberleri Nedir?
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Piyasa haberleri, finansal piyasaları doğrudan veya dolaylı olarak etkileyen ekonomik, siyasi
            ve şirket bazlı gelişmeleri kapsayan haber akışıdır. Merkez bankası faiz kararları, enflasyon
            ve istihdam verileri, şirket bilançoları, temettü duyuruları, birleşme-devralma haberleri
            ve küresel ekonomik göstergeler piyasa haberlerinin başlıca kaynakları arasında yer alır.
            Borsa İstanbul&apos;da işlem yapan yatırımcılar için bu haberleri zamanında takip etmek,
            doğru alım-satım kararları vermenin ön koşuludur.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Piyasa haberlerinin önemi, fiyatların bilgiye göre şekillenmesinden kaynaklanır. Bir şirketin
            beklentilerin üzerinde bilanço açıklaması hisse fiyatını yukarı taşırken, beklenenden yüksek
            enflasyon verisi genel piyasada satış baskısı yaratabilir. Haberlere geç kalan yatırımcılar,
            fiyat hareketlerinin gerisinde kalarak fırsat maliyetine maruz kalır. Bu nedenle güncel
            ve güvenilir haber kaynaklarına erişim, her yatırımcının temel ihtiyacıdır.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, Bloomberg HT, BigPara ve Uzmanpara gibi Türkiye&apos;nin en güvenilir finans
            haber kaynaklarını tek bir platformda birleştirerek yatırımcılara zaman kazandırır. Haberler
            görsel destekli olarak sunulur ve kaynak bilgisiyle birlikte gösterilir. Ayrıca yapay zeka
            destekli filtreleme sayesinde yatırımcılar, ilgi alanlarına göre haberleri
            önceliklendirebilir ve bilgi kirliliğinden korunabilir.
          </p>
        </div>

        <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}>
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>Yasal Uyarı</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Piyasa haberleri yalnızca bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği taşımaz.
              Yatırım kararlarınızı vermeden önce mutlaka kendi araştırmanızı yapın ve gerektiğinde
              profesyonel danışmanlık alın.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
