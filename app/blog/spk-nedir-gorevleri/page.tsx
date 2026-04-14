import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SPK Nedir? Görevleri ve Yatırımcıya Etkisi',
  description:
    'SPK nedir, görevleri nelerdir? Sermaye Piyasası Kurulunun yatırımcı koruma, halka arz onay süreci, haftalık bültenler ve piyasa denetimi hakkında kapsamlı rehber.',
  alternates: { canonical: 'https://borsacebimde.app/blog/spk-nedir-gorevleri' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'SPK Nedir? Görevleri ve Yatırımcıya Etkisi',
  description:
    'SPK nedir, görevleri nelerdir? Sermaye Piyasası Kurulunun yatırımcı koruma, halka arz onay süreci, haftalık bültenler ve piyasa denetimi hakkında kapsamlı rehber.',
  author: { '@type': 'Organization', name: 'Borsa Cebimde' },
  publisher: { '@type': 'Organization', name: 'Borsa Cebimde' },
  datePublished: '2026-04-10',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://borsacebimde.app/blog/spk-nedir-gorevleri' },
};

export default function SpkNedirGorevleriPage() {
  return (
    <article className="flex flex-col gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>SPK Nedir?</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>Regülasyon</span>
          <span style={{ color: 'var(--text-muted)' }}>10 Nisan 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          SPK Nedir? Görevleri ve Yatırımcıya Etkisi
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Sermaye Piyasası Kurulu (SPK), Türkiye&apos;deki sermaye piyasalarının düzenleyici ve
            denetleyici otoritesidir. 1981 yılında 2499 sayılı Sermaye Piyasası Kanunu ile kurulan
            SPK, yatırımcıların haklarını korumak, piyasaların şeffaf ve adil işlemesini sağlamak ve
            sermaye piyasalarının gelişmesine katkı sunmak amacıyla faaliyet gösterir. İdari ve mali
            özerkliğe sahip olan kurul, doğrudan Cumhurbaşkanlığı&apos;na bağlı olarak çalışır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            SPK&apos;nın Kuruluşu ve Tarihçesi
          </h2>
          <p>
            Türkiye&apos;de sermaye piyasalarının düzenlenmesi ihtiyacı, 1980&apos;li yıllarda ekonominin
            liberalleşmesiyle birlikte ortaya çıkmıştır. Borsa İstanbul&apos;un (o dönemki adıyla İMKB)
            faaliyete geçmesiyle birlikte piyasaların düzenli işlemesini sağlamak için bağımsız bir
            otorite gerekliliği doğmuştur. SPK, bu ihtiyacı karşılamak üzere kurulmuş ve Türkiye&apos;nin
            sermaye piyasası altyapısının şekillendirilmesinde merkezi rol üstlenmiştir.
          </p>
          <p>
            2012 yılında yürürlüğe giren 6362 sayılı yeni Sermaye Piyasası Kanunu ile SPK&apos;nın
            yetkileri genişletilmiş, yatırımcı koruma mekanizmaları güçlendirilmiş ve uluslararası
            standartlara uyum sağlama adına önemli düzenlemeler yapılmıştır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            SPK&apos;nın Temel Görevleri
          </h2>
          <p>
            SPK&apos;nın görevleri geniş bir yelpazede yer alır. Bunların başında sermaye piyasası
            araçlarının ihracına (halka arz dahil) onay vermek, piyasa katılımcılarını lisanslamak,
            piyasa manipülasyonu ve içerideki bilgi kullanımını engellemek, yatırım fonları ve
            portföy yönetim şirketlerini denetlemek gelir.
          </p>
          <p>
            Ayrıca SPK, aracı kurumlar, yatırım ortaklıkları, bağımsız denetim kuruluşları ve
            derecelendirme kuruluşları gibi sermaye piyasası kurumlarının faaliyetlerini
            düzenler. Piyasada haksız rekabeti önlemek ve yatırımcı şeffaflığını sağlamak
            SPK&apos;nın öncelikli hedefleri arasındadır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Halka Arz Onay Süreci
          </h2>
          <p>
            Bir şirketin halka arz olabilmesi için SPK&apos;dan onay alması zorunludur. Şirket, aracı
            kurumuyla birlikte hazırlanan izahnameyi SPK&apos;ya sunar. SPK, izahnamedeki finansal
            bilgilerin doğruluğunu, risk faktörlerinin yeterince açıklanıp açıklanmadığını ve
            yatırımcıların bilgilendirilme düzeyini değerlendirir.
          </p>
          <p>
            SPK, izahnameyi uygun bulursa onay verir ve şirket talep toplama sürecine başlar.
            İzahname onay süreci genellikle birkaç haftadan birkaç aya kadar değişebilir. SPK,
            gerekli gördüğü durumlarda ek bilgi veya belge talep edebilir, hatta başvuruyu
            reddedebilir. Bu sürecin detayları hakkında bilgi almak için{' '}
            <Link href="/halka-arz" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              halka arz takvimi
            </Link>{' '}
            sayfamızı ziyaret edebilirsiniz.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Yatırımcı Koruma Mekanizmaları
          </h2>
          <p>
            SPK, yatırımcıların haklarını korumak için çeşitli mekanizmalar oluşturmuştur. Yatırımcı
            Tazmin Merkezi (YTM), aracı kurumların iflas etmesi durumunda yatırımcıların kayıplarını
            belirli limitler dahilinde tazmin eder. Kamuyu aydınlatma yükümlülükleri kapsamında
            şirketler, finansal tablolarını, önemli gelişmeleri ve içerideki bilgileri zamanında
            kamuoyuyla paylaşmak zorundadır.
          </p>
          <p>
            Ayrıca SPK, yatırımcı şikayetlerini değerlendiren bir mekanizmaya sahiptir. Yatırımcılar,
            aracı kurumların veya borsaya kote şirketlerin uygunsuz davranışlarını SPK&apos;ya
            bildirebilir. SPK, inceleme sonucunda gerekli idari yaptırımlar uygulayabilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Haftalık Bültenler ve Kararlar
          </h2>
          <p>
            SPK, her hafta yayımladığı bültenlerle piyasa katılımcılarını bilgilendirir. Bu
            bültenlerde halka arz başvuruları, onaylanan izahnameler, idari para cezaları, işlem
            yasakları, lisans iptalleri ve diğer önemli kararlar yer alır. Yatırımcılar bu
            bültenleri takip ederek piyasadaki son düzenleyici gelişmeleri öğrenebilir.
          </p>
          <p>
            SPK bültenlerini yakından takip etmek, özellikle halka arz yatırımcıları için büyük
            önem taşır. Yeni onaylanan halka arzlar, reddedilen başvurular ve değişiklik talep
            edilen izahnameler bu bültenler aracılığıyla duyurulur. Borsa Cebimde uygulamasında{' '}
            <Link href="/spk-bulten" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              SPK bülten analizi
            </Link>{' '}
            sayfasından bu bültenlere erişebilirsiniz.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Yaptırımlar ve İdari Cezalar
          </h2>
          <p>
            SPK, sermaye piyasası mevzuatına aykırı davranan kişi ve kurumlara çeşitli yaptırımlar
            uygulayabilir. İdari para cezaları, işlem yasakları, faaliyet izni iptalleri ve
            suç duyurusu bu yaptırımlar arasındadır. Özellikle piyasa manipülasyonu, içerideki
            bilginin kullanılması ve kamuyu yanıltıcı açıklamalar SPK&apos;nın en ağır şekilde
            cezalandırdığı ihlaller arasındadır.
          </p>
          <p>
            Son yıllarda SPK, sosyal medya üzerinden yapılan manipülatif paylaşımlar konusunda da
            denetimlerini artırmıştır. Yatırımcıları belirli hisselere yönlendirmek amacıyla yapılan
            aşırı iddialı paylaşımlara karşı idari işlemler başlatılmaktadır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Lisanslama Sistemi
          </h2>
          <p>
            SPK, sermaye piyasasında faaliyet gösteren profesyonellerin yeterliliğini lisanslama
            sınavları aracılığıyla denetler. Sermaye Piyasası Faaliyetleri Düzey 1, Düzey 2 ve
            Düzey 3 lisansları, türev araçlar lisansı, gayrimenkul değerleme lisansı ve kredi
            derecelendirme lisansı gibi çeşitli lisans türleri mevcuttur. Bu lisanslar, piyasa
            profesyonellerinin belirli standartlarda bilgi ve yetkinliğe sahip olmalarını garanti
            altına alır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Piyasa Denetimi ve Gözetim
          </h2>
          <p>
            SPK, gerçek zamanlı piyasa gözetim sistemleri aracılığıyla olağan dışı işlem
            hareketlerini tespit eder. Ani fiyat değişimleri, normalin üzerinde işlem hacimleri
            ve şüpheli emir paternleri otomatik olarak izlenir. Bu sistemler sayesinde manipülatif
            işlemler erken aşamada tespit edilebilir ve gerekli önlemler alınabilir.
          </p>
          <p>
            Yatırımcılar için SPK&apos;nın varlığını anlamak, borsanın düzenli ve güvenilir bir
            ortamda işletildiğinin güvencesidir. Güncel halka arz ve{' '}
            <Link href="/kap-ai" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              KAP haber analizleri
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
