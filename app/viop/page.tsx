import type { Metadata } from 'next';
import ViopContent from './Content';
import SsrNewsList from '@/components/SsrNewsList';
import { fetchNewsFeedSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'VİOP Gece Seansı - Vadeli İşlem ve Opsiyon Piyasası',
  description:
    'VİOP gece seansı verileri, açılış-kapanış bilgileri ve saatlik seyir takibi. BIST 30, dolar, euro ve altın vadeli işlem sözleşmeleri.',
  keywords: [
    'VİOP',
    'vadeli işlem',
    'opsiyon piyasası',
    'gece seansı',
    'BIST 30 vadeli',
    'dolar vadeli',
    'altın vadeli',
    'VİOP akşam seansı',
    'türev piyasa',
  ],
  openGraph: {
    title: 'VİOP Gece Seansı - Vadeli İşlem ve Opsiyon Piyasası',
    description:
      'VİOP gece seansı verileri ve anlık takip. Vadeli işlem sözleşmelerinin açılış, kapanış ve seyir bilgileri.',
  },
};

export default async function ViopPage() {
  // VIOP tweetler bot_proxy source'unda; keyword filter client tarafinda — SSR icin tumunu al
  const ssrItems = await fetchNewsFeedSSR('bot_proxy', 60, 30);
  const viopItems = ssrItems.filter((it) =>
    /viop|x30vade|x30y|endeks|vadeli|gündüz seans|gece seans/i.test(it.text || it.title || ''),
  );

  return (
    <>
      {/* Önce dinamik içerik */}
      <ViopContent />

      <SsrNewsList
        items={viopItems.slice(0, 20)}
        heading="Son VİOP Seansı Verileri"
        description="BIST 30 endeks vadeli işlem sözleşmesi, açılış, kapanış, gece seansı özeti ve saatlik seyir güncellemeleri."
      />

      {/* SEO içerik aşağıda */}
      <article className="mt-10 flex flex-col gap-6">
        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            VİOP Gece Seansı Hakkında
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Vadeli İşlem ve Opsiyon Piyasası (VİOP), Borsa İstanbul bünyesinde faaliyet gösteren türev
            ürünler piyasasıdır. VİOP gece seansı, 19:00-23:00 saatleri arasında gerçekleşen özel bir
            işlem dönemidir. Bu seansta yatırımcılar, küresel piyasalardaki gelişmelere anında tepki
            verebilmektedir. ABD borsalarının kapanış saatlerindeki hareketler ve küresel gelişmeler
            gece seansında fiyatlanır.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            VİOP&apos;ta BIST 30 endeks vadeli, döviz (dolar, euro) vadeli ve altın vadeli işlem
            sözleşmeleri işlem görmektedir. Gece seansındaki fiyat hareketleri, ertesi günkü
            BIST açılışı hakkında önemli ipuçları vermektedir. Platformumuz açılış, kapanış ve
            saatlik seyir verilerini anlık olarak takip eder.
          </p>
        </div>

        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            VİOP Nedir?
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Vadeli İşlem ve Opsiyon Piyasası (VİOP), Borsa İstanbul bünyesinde faaliyet gösteren
            türev ürünler piyasasıdır. VİOP&apos;ta yatırımcılar, dayanak varlığın gelecekteki
            fiyatı üzerinden sözleşme alıp satabilir. BIST 30 endeks vadeli, dolar/TL, euro/TL
            ve altın vadeli işlem sözleşmeleri en çok işlem gören kontratlar arasındadır. Türev
            piyasalar, hem riskten korunma (hedging) hem de spekülatif amaçlarla kullanılır ve
            spot piyasaya göre daha düşük sermaye ile pozisyon açma imkanı sunar.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            VİOP gece seansı, 19:00-23:00 saatleri arasında gerçekleşen özel bir işlem dönemidir
            ve yatırımcılar için kritik bir takip aracıdır. Normal seans kapandıktan sonra ABD
            borsalarındaki hareketler, küresel ekonomik veriler ve jeopolitik gelişmeler gece
            seansında fiyatlanır. Bu nedenle gece seansındaki fiyat değişimleri, ertesi günkü
            BIST açılışının yönü hakkında güçlü ipuçları verir. Özellikle ABD merkez bankası
            (Fed) kararları ve ABD istihdam verileri gibi kritik açıklamalar gece saatlerinde
            gerçekleştiğinden, gece seansı takibi yatırımcılar için vazgeçilmezdir.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde&apos;nin VİOP gece seansı sayfası, tüm aktif sözleşmelerin açılış, kapanış
            ve saatlik seyir verilerini anlık olarak sunar. Yatırımcılar, BIST 30 endeks vadeli
            kontratının gece seansındaki hareketini takip ederek ertesi günkü piyasa yönü
            hakkında fikir edinebilir. Dolar, euro ve altın vadeli kontratları da aynı sayfadan
            izlenebilir, böylece döviz ve emtia piyasalarındaki gelişmeler de tek noktadan
            takip edilebilir.
          </p>
        </div>

        <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}>
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>Yasal Uyarı</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              VİOP&apos;ta kaldıraçlı işlem yapılmaktadır ve yatırdığınız teminattan fazlasını
              kaybedebilirsiniz. Bu sayfadaki bilgiler yatırım tavsiyesi değildir.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
