import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KAP Haberleri Neden Önemli? Yatırımcı Rehberi',
  description:
    'KAP (Kamuyu Aydınlatma Platformu) nedir, hangi bildirimler önemlidir, bilanço ve temettü duyuruları nasıl yorumlanır? Yatırımcılar için KAP rehberi.',
  alternates: { canonical: 'https://borsacebimde.app/blog/kap-haberleri-rehberi' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'KAP Haberleri Neden Önemli? Yatırımcı Rehberi',
  description:
    'KAP (Kamuyu Aydınlatma Platformu) nedir, hangi bildirimler önemlidir, bilanço ve temettü duyuruları nasıl yorumlanır? Yatırımcılar için KAP rehberi.',
  author: { '@type': 'Organization', name: 'Borsa Cebimde' },
  publisher: { '@type': 'Organization', name: 'Borsa Cebimde' },
  datePublished: '2026-04-10',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://borsacebimde.app/blog/kap-haberleri-rehberi' },
};

export default function KapHaberleriRehberiPage() {
  return (
    <article className="flex flex-col gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>KAP Haberleri Rehberi</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>KAP</span>
          <span style={{ color: 'var(--text-muted)' }}>10 Mart 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          KAP Haberleri Neden Önemli? Yatırımcı Rehberi
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Kamuyu Aydınlatma Platformu (KAP), Borsa İstanbul&apos;da işlem gören şirketlerin
            yatırımcılara yönelik önemli bildirimlerini yayınladıkları resmi platformdur. SPK
            mevzuatı gereği, halka açık şirketler önemli gelişmeleri belirli süre içinde KAP
            üzerinden kamuoyuyla paylaşmak zorundadır. Bu bildirimler, yatırımcıların doğru ve
            zamanında bilgilendirilmesini sağlayarak piyasaların şeffaf işleyişine katkı sunar.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            KAP Nedir ve Neden Oluşturuldu?
          </h2>
          <p>
            KAP, 2009 yılında Merkezi Kayıt Kuruluşu (MKK) tarafından hizmete sunulmuştur.
            Amacı, sermaye piyasalarında faaliyet gösteren kurumların kamuyu aydınlatma
            yükümlülüklerini yerine getirmelerini kolaylaştırmak ve yatırımcıların tüm önemli
            bilgilere eşit zamanda erişimini sağlamaktır.
          </p>
          <p>
            KAP öncesinde, şirket bildirimleri farklı kanallarda dağıtık şekilde yayınlanıyordu
            ve bu durum bilgi asimetrisine yol açıyordu. KAP ile birlikte tüm bildirimler tek
            bir merkezde toplanarak yatırımcı erişimi standardize edilmiştir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            KAP Bildirim Türleri
          </h2>
          <p>
            KAP&apos;ta yayınlanan bildirimler çeşitli kategorilere ayrılır. En önemli bildirim
            türleri şunlardır:
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Mali Tablo Açıklamaları:</strong> Şirketlerin
            üçerlik, altı aylık ve yıllık mali tabloları (bilanço, gelir tablosu, nakit akım tablosu)
            KAP üzerinden yayınlanır. Bu tablolar, şirketin mali sağlığını değerlendirmek için
            en temel kaynaklardır. Ciro, net kâr, FAVÖK, borçluluk oranları gibi veriler burada yer alır.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Temettü Dağıtım Kararları:</strong> Şirket
            yönetim kurulunun veya genel kurulun temettü dağıtım kararları KAP&apos;ta duyurulur.
            Hisse başına dağıtılacak brüt ve net temettü tutarları, dağıtım tarihi ve ödeme
            planı bu bildirimlerde yer alır.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Sermaye Artırımı:</strong> Bedelli ve
            bedelsiz sermaye artırım kararları, yatırımcıları doğrudan etkileyen önemli gelişmelerdir.
            Bedelsiz sermaye artırımında mevcut ortaklara ücretsiz yeni hisse dağıtılırken, bedelli
            artırımda ortaklardan ek sermaye talebi söz konusudur.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Ortaklık Yapısı Değişiklikleri:</strong> Büyük
            ortakların hisse alım-satımları, yönetim kurulundaki değişiklikler ve imtiyazlı
            hisselerle ilgili gelişmeler bu kapsamda yayınlanır.
          </p>
          <p>
            <strong style={{ color: 'var(--text-primary)' }}>Özel Durum Açıklamaları:</strong> Şirketin
            olağan faaliyetleri dışında gelişen ve hisse fiyatını etkileyebilecek önemli olaylar
            (sözleşme imzaları, dava sonuçları, üretim durmaları, regülasyon değişiklikleri) bu
            kapsamda bildirilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Hangi KAP Bildirimleri Hisse Fiyatını Etkiler?
          </h2>
          <p>
            Tüm KAP bildirimleri eşit öneme sahip değildir. Yatırımcıların en çok dikkat etmesi
            gereken bildirimler şunlardır: Beklentilerin üzerinde veya altında gelen mali tablo
            sonuçları, beklenmeyen temettü kararları, büyük hacimli ortaklık değişiklikleri,
            stratejik iş birlikleri veya satın almalar ve şirketin faaliyet alanını doğrudan
            etkileyen regülasyon değişiklikleri.
          </p>
          <p>
            Özellikle bilanço dönemlerinde (Nisan, Ağustos ve Kasım ayları) KAP bildirimleri
            yoğunlaşır ve piyasa hareketliliği artar. Bu dönemlerde KAP bildirimlerini yakından
            takip etmek büyük önem taşır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Bilanço Nasıl Okunur?
          </h2>
          <p>
            Bilanço okumak yatırım sürecinin en kritik becerilerinden biridir. Gelir tablosunda
            şirketin cirosuna, brüt kârında ise üretim maliyetlerini çıkarır kâr marjını görürsünüz.
            Faaliyet kârı, şirketin ana işinden elde ettiği kârı gösterirken, net kâr tüm gelir ve
            giderlerin sonucudur.
          </p>
          <p>
            FAVÖK (Faiz, Amortisman ve Vergi Öncesi Kâr), şirketin operasyonel performansını
            değerlendirmek için sık kullanılan bir metriktir. Net borç/FAVÖK oranı ise şirketin
            borçluluk seviyesini ölçmeye yarar. Bu oran ne kadar düşükse, şirketin finansal
            sağlığı o kadar iyidir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            KAP Bildirimlerini Takip Etmenin Yolları
          </h2>
          <p>
            KAP&apos;ın resmi web sitesi üzerinden bildirimleri takip edebilirsiniz, ancak
            günde yüzlerce bildirim yayınlanması takip sürecini zorlaştırmaktadır.
            Borsa Cebimde uygulaması, yapay zeka destekli KAP haber analizi özelliği sayesinde
            önemli bildirimleri filtreleyerek yatırımcılara özetlemektedir.
          </p>
          <p>
            <Link href="/kap-ai" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              AI destekli KAP haber analizlerini inceleyin
            </Link>{' '}
            veya{' '}
            <Link href="/kap-tum-haberler" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              tüm KAP bildirimlerini görüntüleyin
            </Link>.
            Favori hisselerinize ait bildirimleri anlık olarak takip etmek için{' '}
            <Link href="/indir" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              Borsa Cebimde uygulamasını indirin
            </Link>.
          </p>
        </div>

        <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
          <strong>Yasal Uyarı:</strong> Bu içerik yalnızca bilgilendirme amacıyla hazırlanmış olup
          yatırım tavsiyesi değildir. Yatırım kararları kişisel araştırma ve profesyonel
          danışmanlık ile alınmalıdır.
        </div>
      </div>
    </article>
  );
}
