import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'VİOP Gece Seansı Rehberi',
  description:
    'VİOP nedir, gece seansı hangi saatlerde yapılır, hangi sözleşmeler işlem görür? Vadeli işlem piyasası hakkında kapsamlı rehber.',
  alternates: { canonical: 'https://borsacebimde.app/blog/viop-gece-seansi-rehberi' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'VİOP Gece Seansı Rehberi',
  description:
    'VİOP nedir, gece seansı hangi saatlerde yapılır, hangi sözleşmeler işlem görür? Vadeli işlem piyasası hakkında kapsamlı rehber.',
  author: { '@type': 'Organization', name: 'Borsa Cebimde' },
  publisher: { '@type': 'Organization', name: 'Borsa Cebimde' },
  datePublished: '2026-04-10',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://borsacebimde.app/blog/viop-gece-seansi-rehberi' },
};

export default function ViopGeceSeansPage() {
  return (
    <article className="flex flex-col gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>VİOP Gece Seansı</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>VİOP</span>
          <span style={{ color: 'var(--text-muted)' }}>28 Şubat 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          VİOP Gece Seansı Rehberi
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Vadeli İşlem ve Opsiyon Piyasası (VİOP), Borsa İstanbul bünyesinde faaliyet gösteren
            türev ürünler piyasasıdır. VİOP&apos;ta yatırımcılar, dayanak varlıkların gelecekteki
            fiyatları üzerine sözleşmeler alıp satabilir. Hisse senedi vadeli işlemleri, endeks
            vadeli işlemleri, döviz vadeli işlemleri ve emtia vadeli işlemleri gibi çeşitli türev
            ürünler bu piyasada işlem görmektedir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            VİOP Nasıl Çalışır?
          </h2>
          <p>
            VİOP&apos;ta işlem gören vadeli işlem sözleşmeleri, belirli bir dayanak varlığın
            gelecekteki bir tarihte, bugün belirlenen bir fiyattan alım veya satım yükümlülüğü
            getiren standart sözleşmelerdir. Örneğin, BIST 30 endeks vadeli işlem sözleşmesi,
            BIST 30 endeksinin vade tarihindeki değerini temel alır.
          </p>
          <p>
            Vadeli işlemlerde &quot;uzun pozisyon&quot; (long) alan yatırımcı, dayanak varlığın
            fiyatının yükselmesini beklerken; &quot;kısa pozisyon&quot; (short) alan yatırımcı
            fiyatın düşmesini bekler. Bu yapı, yatırımcılara hem yükselişten hem de düşüşten
            kazanç elde etme imkanı sağlar.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Kaldıraç Mekanizması
          </h2>
          <p>
            VİOP&apos;un en önemli özelliklerinden biri kaldıraç etkisidir. Vadeli işlemlerde
            sözleşmenin tam değerini yatırmak yerine, sadece belirli bir teminat (başlangıç
            teminatı) yatırmak yeterlidir. Örneğin, 10 katlık kaldıraçla 10.000 TL&apos;lik
            teminatla 100.000 TL değerinde pozisyon açabilirsiniz.
          </p>
          <p>
            Kaldıraç, potansiyel kazançları artırdığı gibi potansiyel kayıpları da aynı oranda
            büyütür. Piyasa beklentilerinizin tersine hareket ettiğinde, kayıplarınız yatırdığınız
            teminattan fazla olabilir. Bu nedenle VİOP işlemleri, risk yönetimi konusunda deneyimli
            yatırımcılar için daha uygundur.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Gece Seansı Nedir?
          </h2>
          <p>
            VİOP gece seansı, normal işlem saatleri dışında gerçekleşen ek bir işlem dönemidir.
            Normal seans sabah 09:30&apos;da başlar ve akşam 18:15&apos;te sona erer. Gece seansı
            ise 19:00&apos;da başlayıp 23:00&apos;da kapanır. Bu seans, özellikle ABD piyasalarının
            açık olduğu saatlere denk gelmesi nedeniyle yatırımcılar için büyük önem taşır.
          </p>
          <p>
            Gece seansında işlem gören başlıca sözleşmeler arasında BIST 30 endeks vadeli işlem
            sözleşmesi, dolar/TL vadeli işlem sözleşmesi ve altın vadeli işlem sözleşmesi yer
            alır. Bu sözleşmeler, global piyasa gelişmelerine anlık tepki verme olanağı sağlar.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Gece Seansı Neden Önemli?
          </h2>
          <p>
            Global finans piyasaları 24 saat işlem görür. ABD borsalarının Türkiye saatiyle akşam
            saatlerinde açılması, piyasalarda önemli hareketlere neden olabilir. Gece seansı
            sayesinde Türk yatırımcılar, ABD piyasa verilerine, Fed kararlarına, ABD istihdam
            verilerine ve diğer önemli makroekonomik gelişmelere anlık olarak pozisyon alabilir.
          </p>
          <p>
            Ayrıca, gece seansındaki fiyat hareketleri ertesi gün normal seansın açılış fiyatını
            doğrudan etkiler. Bu nedenle VİOP gece seansı, ertesi günün borsa yönünü tahmin
            etmek için önemli bir gösterge niteliğindedir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            VİOP&apos;ta İşlem Gören Sözleşme Türleri
          </h2>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Endeks Vadeli İşlemler:</strong> BIST 30
            endeks vadeli işlem sözleşmesi, en yüksek işlem hacmine sahip ürün grubunu oluşturur.
            Endeksin yönüne dair beklentilerle pozisyon alınır.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Döviz Vadeli İşlemler:</strong> Dolar/TL
            ve Euro/TL vadeli işlem sözleşmeleri, kur riskinden korunmak veya kur hareketlerinden
            kazanç sağlamak için kullanılır.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Hisse Vadeli İşlemler:</strong> Belirli
            hisse senetlerinin gelecekteki fiyatları üzerine işlem yapma imkanı sunar.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Emtia Vadeli İşlemler:</strong> Altın
            ve gümüş gibi değerli metallerin vadeli işlem sözleşmeleri bu kategoride yer alır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Risk Yönetimi ve Dikkat Edilmesi Gerekenler
          </h2>
          <p>
            VİOP işlemlerinde zarar kes (stop-loss) emirleri kullanmak, risk yönetiminin temelidir.
            Aşırı kaldıraç kullanımından kaçınmak, teminat seviyelerini yakından takip etmek ve
            pozisyon büyüklüğünü sermayenize göre ayarlamak önemlidir. Gece seansında likiditenin
            normal seansa göre daha düşük olabileceğini de göz önünde bulundurmalısınız.
          </p>
          <p>
            <Link href="/viop" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              VİOP gece seansı verilerini canlı takip edin
            </Link>{' '}
            ve{' '}
            <Link href="/indir" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              Borsa Cebimde uygulamasıyla anlık bildirim alın
            </Link>.
          </p>
        </div>

        <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
          <strong>Yasal Uyarı:</strong> VİOP işlemleri yüksek risk içerir ve tüm yatırımcılar için
          uygun olmayabilir. Kaldıraçlı işlemler nedeniyle yatırdığınız sermayenin tamamını
          kaybedebilirsiniz. Bu içerik yatırım tavsiyesi değildir.
        </div>
      </div>
    </article>
  );
}
