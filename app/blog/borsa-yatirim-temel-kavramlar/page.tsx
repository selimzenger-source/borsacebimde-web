import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Borsada Yatırım: Temel Kavramlar Rehberi',
  description:
    'Hisse senedi nedir, lot nedir, endeks nedir? Borsada yatırım yapmaya başlamadan önce bilmeniz gereken temel kavramları anlatan kapsamlı rehber.',
  alternates: { canonical: 'https://borsacebimde.app/blog/borsa-yatirim-temel-kavramlar' },
};

export default function BorsaYatirimTemelKavramlarPage() {
  return (
    <article className="flex flex-col gap-6">
      {/* Breadcrumb */}
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>Temel Kavramlar</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>Eğitim</span>
          <span style={{ color: 'var(--text-muted)' }}>10 Nisan 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          Borsada Yatırım: Temel Kavramlar Rehberi
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Borsa, şirketlerin hisse senetlerinin ve diğer finansal araçların alıcısı ile satıcısını
            buluşturan organize bir piyasadır. Türkiye&apos;de bu piyasa Borsa İstanbul (BIST) çatısı
            altında faaliyet gösterir. Borsada başarılı bir yatırımcı olmak için önce temel kavramları
            anlamak gerekir. Bu rehberde, yeni başlayan yatırımcıların mutlaka bilmesi gereken
            kavramları detaylı şekilde ele alacağız.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Hisse Senedi Nedir?
          </h2>
          <p>
            Hisse senedi, bir şirketin sermayesinin belirli bir oranını temsil eden değerli kağıttır.
            Bir şirketin hisse senedini satın aldığınızda, o şirketin ortaklarından biri olursunuz.
            Hissedar olarak, şirketin kârlarından pay alma (temettü), genel kurul toplantılarında
            oy kullanma ve şirketin değerindeki artıştan faydalanma gibi haklara sahip olursunuz.
            Türkiye&apos;de hisse senetleri Borsa İstanbul&apos;da işlem görür ve MKK (Merkezi Kayıt
            Kuruluşu) tarafından elektronik ortamda saklanır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Lot Nedir? Minimum İşlem Birimi
          </h2>
          <p>
            Lot, borsada işlem yapılabilecek en küçük birimdir. Borsa İstanbul&apos;da 1 lot, 1 adet
            hisse senedine eşittir. Örneğin, 100 TL fiyatlı bir hisseden 10 lot almak isterseniz,
            1.000 TL değerinde işlem yapmış olursunuz. Eskiden 1 lot 100 hisseye eşitti ancak 2012
            yılında yapılan değişiklikle 1 lot 1 hisse olarak güncellendi. Bazı düşük fiyatlı
            hisselerde minimum işlem miktarı uygulanabilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            BIST Endeksleri: BIST 100, BIST 30 ve BIST 50
          </h2>
          <p>
            Endeks, belirli kriterlere göre seçilmiş hisse senetlerinin bir arada izlenmesini sağlayan
            göstergedir. Borsa İstanbul&apos;un en önemli endeksleri şunlardır:
          </p>
          <p>
            <strong>BIST 100:</strong> Borsa İstanbul&apos;daki en yüksek piyasa değerine ve işlem
            hacmine sahip 100 şirketin hisselerinden oluşan ana endekstir. Türk borsasının genel
            performansını ölçmek için referans alınır.
          </p>
          <p>
            <strong>BIST 30:</strong> Piyasa değeri ve likiditesi en yüksek 30 şirketin hisselerinden
            oluşur. Kurumsal yatırımcılar ve vadeli işlem kontratlarında en çok takip edilen endekstir.
          </p>
          <p>
            <strong>BIST 50:</strong> BIST 30&apos;a ek olarak 20 şirket daha içeren, daha geniş kapsamlı
            bir endekstir. Detaylı endeks bilgileri için{' '}
            <Link href="/blog/bist-endeks-rehberi" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              BIST Endeksleri Rehberi
            </Link>{' '}
            sayfamızı inceleyebilirsiniz.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Piyasa Değeri (Market Cap)
          </h2>
          <p>
            Piyasa değeri, bir şirketin toplam hisse senedi sayısının güncel hisse fiyatıyla
            çarpılmasıyla elde edilen değerdir. Örneğin, 100 milyon adet hissesi olan ve hisse
            fiyatı 50 TL olan bir şirketin piyasa değeri 5 milyar TL&apos;dir. Piyasa değeri, bir
            şirketin borsadaki büyüklüğünü gösterir ve yatırımcıların şirketleri karşılaştırması
            için önemli bir metriktir. Büyük piyasa değerli şirketler genellikle daha düşük risk
            taşırken, küçük piyasa değerli şirketler daha yüksek volatiliteye sahip olabilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            F/K Oranı (Fiyat/Kazanç)
          </h2>
          <p>
            Fiyat/Kazanç oranı, bir hissenin fiyatının hisse başına kazanca bölünmesiyle hesaplanır.
            Örneğin, hisse fiyatı 100 TL ve hisse başına yıllık kazanç 10 TL ise F/K oranı 10&apos;dur.
            Bu, yatırımcının ödediği her 1 TL&apos;lik kazanç için 10 TL ödediğini gösterir. Düşük F/K
            oranı hissenin ucuz olduğuna işaret edebilirken, yüksek F/K oranı büyüme beklentisini
            yansıtabilir. Ancak F/K oranını tek başına değil, sektör ortalaması ve şirketin büyüme
            potansiyeliyle birlikte değerlendirmek gerekir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            PD/DD Oranı (Piyasa Değeri / Defter Değeri)
          </h2>
          <p>
            PD/DD oranı, şirketin piyasa değerinin defter değerine (öz kaynak) bölünmesiyle bulunur.
            1&apos;in altındaki PD/DD oranı, şirketin piyasada defter değerinin altında işlem gördüğünü
            gösterir ve genellikle ucuz olarak yorumlanır. Ancak bu durum, şirketin sorunlu olduğuna
            da işaret edebilir. Bankacılık ve imalat sektörü gibi varlık yoğun sektörlerde PD/DD
            oranı daha anlamlıdır. Teknoloji şirketlerinde ise maddi olmayan varlıkların yüksekliği
            nedeniyle PD/DD oranı daha yüksek olabilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Temettü (Kâr Payı) Nedir?
          </h2>
          <p>
            Temettü, şirketlerin elde ettikleri net kârın bir kısmını hissedarlarına dağıtması
            işlemidir. Türkiye&apos;de şirketler genel kurul kararıyla temettü dağıtıp dağıtmamaya karar
            verir. Temettü verimi, dağıtılan temettü tutarının hisse fiyatına oranı olarak hesaplanır
            ve yatırımcıların gelir odaklı strateji izlemesinde önemli bir göstergedir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Emir Tipleri: Limit ve Piyasa Emri
          </h2>
          <p>
            <strong>Limit Emir:</strong> Belirli bir fiyattan veya daha iyi bir fiyattan işlem
            yapmak için verilen emirdir. Örneğin, 50 TL&apos;den limit alış emri verirseniz, hisse
            50 TL veya altına düştüğünde işlem gerçekleşir. Fiyat kontrolü sağladığından en çok
            kullanılan emir tipidir.
          </p>
          <p>
            <strong>Piyasa Emri:</strong> O anki en iyi fiyattan anında işlem yapmak için verilen
            emirdir. Hızlı işlem garantisi sunar ancak özellikle düşük hacimli hisselerde beklediğinden
            farklı fiyattan işlem gerçekleşme riski vardır. Acil alış veya satış gereken durumlarda
            tercih edilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Seans Saatleri
          </h2>
          <p>
            Borsa İstanbul&apos;da pay piyasası iki seans halinde çalışır. Sabah seansı 10:00-12:40
            saatleri arasında, öğle seansı ise 14:00-18:00 saatleri arasında gerçekleşir. Seans
            öncesi açılış ve seans sonrası kapanış işlemleri için de belirli zaman dilimleri ayrılmıştır.
            VİOP (Vadeli İşlem ve Opsiyon Piyasası) için ayrıca{' '}
            <Link href="/viop-gece-seansi" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              gece seansı
            </Link>{' '}
            uygulaması mevcuttur.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Bilanço Okuma Temelleri
          </h2>
          <p>
            Bir şirketin mali durumunu anlamak için üç temel mali tabloyu okuyabilmek gerekir.
            Bilanço, şirketin belirli bir tarihteki varlıklarını, borçlarını ve öz kaynağını gösterir.
            Gelir tablosu, belirli bir dönem içindeki gelirleri, giderleri ve net kârı ortaya koyar.
            Nakit akım tablosu ise şirketin nakit giriş ve çıkışlarını takip eder. Bu tabloları
            okuyarak şirketin finansal sağlığını, borç yükünü ve kârlılığı hakkında fikir edinebilirsiniz.
          </p>

          <p>
            Borsada yatırıma başlamak için bu temel kavramları anlamak büyük önem taşır. Güncel
            piyasa verilerini takip etmek, halka arz fırsatlarını değerlendirmek ve{' '}
            <Link href="/kap-ai" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              KAP haberlerini yapay zeka destekli analiz etmek
            </Link>{' '}
            için{' '}
            <Link href="/indir" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              Borsa Cebimde uygulamasını indirin
            </Link>.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
          <strong>Yasal Uyarı:</strong> Bu içerik yalnızca bilgilendirme amacıyla hazırlanmış olup
          yatırım tavsiyesi değildir. Yatırım kararları kişisel araştırma ve profesyonel
          danışmanlık ile alınmalıdır. Borsa Cebimde, yatırım kararlarınızdan dolayı
          sorumluluk kabul etmez.
        </div>
      </div>
    </article>
  );
}
