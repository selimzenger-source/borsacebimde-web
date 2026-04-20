import type { Metadata } from 'next';
import TavanTabanContent from './Content';
import SsrNewsList from '@/components/SsrNewsList';
import { fetchNewsFeedSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'Tavan Taban Hisseleri - BIST Günlük Fiyat Limitleri',
  description:
    'Borsa İstanbul günlük tavan ve taban yapan hisseler. Ardışık tavan-taban serileri, fiyat limitleri ve detaylı hisse analizi.',
  keywords: [
    'tavan hisseler',
    'taban hisseler',
    'BIST tavan taban',
    'borsa istanbul fiyat limiti',
    'tavan yapan hisseler',
    'taban yapan hisseler',
    'ardışık tavan',
    'günlük borsa verileri',
  ],
  openGraph: {
    title: 'Tavan Taban Hisseleri - BIST Günlük Fiyat Limitleri',
    description:
      'Borsa İstanbul günlük tavan ve taban yapan hisseler. Ardışık seri takibi ve detaylı analiz.',
  },
};

export default async function TavanTabanPage() {
  const [tavanItems, tabanItems] = await Promise.all([
    fetchNewsFeedSSR('market_close_tavan', 15, 30),
    fetchNewsFeedSSR('market_close_taban', 15, 30),
  ]);

  return (
    <>
      {/* Önce dinamik içerik */}
      <TavanTabanContent />

      <SsrNewsList
        items={tavanItems}
        heading="Son Tavan Yapan Hisseler"
        description="Borsa İstanbul'da gün içinde fiyat limitinin üst sınırına (tavan) ulaşan hisseler ve ardışık tavan serileri."
      />

      <SsrNewsList
        items={tabanItems}
        heading="Son Taban Yapan Hisseler"
        description="Borsa İstanbul'da gün içinde fiyat limitinin alt sınırına (taban) ulaşan hisseler."
      />

      {/* SEO içerik aşağıda */}
      <article className="mt-10 flex flex-col gap-6">
        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Tavan ve Taban Hisseleri Hakkında
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa İstanbul&apos;da işlem gören hisse senetlerinin günlük fiyat değişimi yüzde 10 ile
            sınırlandırılmıştır. Bu üst limite ulaşan hisselere &quot;tavan yapan&quot;, alt limite
            ulaşanlara ise &quot;taban yapan&quot; hisse denir. Tavan genellikle olumlu KAP haberleri,
            güçlü bilanço sonuçları veya sektörel gelişmeler sonrası oluşurken; taban olumsuz
            gelişmelerde, kötü bilanço sonuçlarında veya genel piyasa düşüşlerinde gerçekleşir.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Ardışık tavan veya taban serileri, güçlü bir arz-talep dengesizliğine işaret eder.
            Platformumuz her hissenin ardışık tavan/taban sayısını ve aylık istatistiklerini
            takip ederek yatırımcılara sunmaktadır. Tavan-taban verileri piyasanın genel
            eğilimini anlamak için değerli bir araçtır ancak tek başına yatırım kararı
            için yeterli değildir.
          </p>
        </div>

        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Tavan ve Taban Fiyat Limiti Nedir?
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa İstanbul&apos;da her hisse senedinin günlük fiyat değişimi, bir önceki kapanış
            fiyatının yüzde 10&apos;u ile sınırlandırılmıştır. Üst limite ulaşan hisseye
            &quot;tavan&quot;, alt limite ulaşan hisseye &quot;taban&quot; denir. Bu mekanizma,
            ani ve aşırı fiyat dalgalanmalarından yatırımcıları korumak amacıyla uygulanmaktadır.
            Tavan oluşumu genellikle olumlu KAP bildirimleri, güçlü bilanço sonuçları veya sektörel
            gelişmeler sonucu gerçekleşirken; taban oluşumu olumsuz haberler, kötü mali tablolar
            veya genel piyasa düşüşlerinde gözlemlenir.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Tavan ve taban verileri, yatırımcılar için piyasa eğilimini anlamanın en hızlı
            yollarından biridir. Ardışık tavan yapan bir hisse güçlü talep ve momentum
            sinyali verirken, ardışık taban yapan bir hisse arz baskısı ve risk uyarısı
            olarak değerlendirilebilir. Bu verileri günlük olarak takip etmek, portföy
            yönetiminde erken uyarı sistemi görevi görür ve yatırımcıların bilinçli
            kararlar almasına yardımcı olur.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde&apos;nin tavan-taban analiz sayfası, yapay zeka destekli sebep analizi
            sunarak yatırımcılara ek bir bilgi katmanı sağlar. Her tavan veya taban yapan hissenin
            muhtemel nedeni AI tarafından analiz edilerek gösterilir. Ayrıca ardışık seri
            takibi ve aylık istatistikler sayesinde yatırımcılar, hangi hisselerin sürekli
            momentum kazandığını veya kaybettiğini kolayca tespit edebilir.
          </p>
        </div>

        <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}>
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>Yasal Uyarı</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Tavan ve taban hisse verileri yalnızca bilgilendirme amaçlıdır. Yatırım kararlarınızı
              almadan önce mutlaka lisanslı bir yatırım danışmanına başvurunuz.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
