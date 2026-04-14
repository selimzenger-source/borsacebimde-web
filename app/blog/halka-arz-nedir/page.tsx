import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Halka Arz Nedir? Başlangıç Rehberi',
  description:
    'Halka arz nedir, nasıl katılır, lot dağıtımı nasıl yapılır? Türkiye borsasında halka arz sürecini baştan sona anlatan kapsamlı başlangıç rehberi.',
  alternates: { canonical: 'https://borsacebimde.app/blog/halka-arz-nedir' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'Halka Arz Nedir? Başlangıç Rehberi',
  description:
    'Halka arz nedir, nasıl katılır, lot dağıtımı nasıl yapılır? Türkiye borsasında halka arz sürecini baştan sona anlatan kapsamlı başlangıç rehberi.',
  author: { '@type': 'Organization', name: 'Borsa Cebimde' },
  publisher: { '@type': 'Organization', name: 'Borsa Cebimde' },
  datePublished: '2026-03-15',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://borsacebimde.app/blog/halka-arz-nedir' },
};

export default function HalkaArzNedirPage() {
  return (
    <article className="flex flex-col gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>Halka Arz Nedir?</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>Halka Arz</span>
          <span style={{ color: 'var(--text-muted)' }}>15 Mart 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          Halka Arz Nedir? Başlangıç Rehberi
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Halka arz, bir şirketin hisse senetlerini ilk kez kamuya açık şekilde satışa sunma
            süreci olarak tanımlanır. İngilizce karşılığı &quot;Initial Public Offering&quot; yani
            kısaca IPO olan bu işlem, Türkiye&apos;de Sermaye Piyasası Kurulu (SPK) denetiminde
            gerçekleştirilir. Şirketler halka arz yoluyla sermaye piyasalarından kaynak toplayarak
            büyüme hedeflerini finanse ederken, bireysel yatırımcılar da bu şirketlerin ortağı olma
            fırsatı yakalar.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Halka Arz Süreci Nasıl İşler?
          </h2>
          <p>
            Halka arz süreci birden fazla aşamadan oluşur. Öncelikle şirket, halka arz kararı alır
            ve bir aracı kurum ile anlaşma imzalar. Aracı kurum, şirketin mali durumunu
            değerlendiren bir izahname hazırlar. Bu izahname, şirketin mali tablolarını,
            faaliyetlerini, risk faktörlerini ve halka arz koşullarını içerir.
          </p>
          <p>
            İzahname hazırlanan şirket, SPK&apos;ya başvuruda bulunur. SPK, izahnameyi inceleyerek
            yatırımcıların korunması açısından uygun görüp görmediğine karar verir. SPK onayı alındıktan
            sonra, Borsa İstanbul&apos;a da borsa kotu başvurusu yapılır. Tüm onaylar tamamlandıktan
            sonra talep toplama süreci başlar.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            SPK Onay Süreci
          </h2>
          <p>
            SPK, Türkiye&apos;deki sermaye piyasalarının düzenleyici ve denetleyici kurumudur.
            Halka arz başvurularını inceleyerek yatırımcıların çıkarlarına aykırı durumlar olup
            olmadığını denetler. SPK onay sürecinde genellikle izahnamedeki bilgilerin eksiksiz
            ve doğru olması, şirketin bağımsız denetimden geçmiş mali tablolarının bulunması ve
            yatırımcıların yeterli bilgilendirilmesi gibi kriterler aranır.
          </p>
          <p>
            SPK başvurusunun sonuçlanma süresi genellikle birkaç haftadan birkaç aya kadar
            değişebilir. Onay aldıktan sonra şirket, izahname ve fiyat tespit raporunu
            kamuoyuyla paylaşmak zorundadır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Halka Arza Nasıl Katılır?
          </h2>
          <p>
            Halka arza katılmak için öncelikle bir aracı kurumda yatırım hesabınızın olması gerekir.
            Türkiye&apos;deki çoğu banka ve aracı kurum, online olarak hesap açma imkanı sunmaktadır.
            Hesabınız açtıktan sonra talep toplama döneminde ilgili halka arza başvuru yapabilirsiniz.
          </p>
          <p>
            Talep toplama sürecinde, hangi aracı kurumların o halka arzda yetkili olduğunu kontrol
            etmeniz gerekir. Her halka arzda tüm aracı kurumlar yetkili olmayabilir. Başvurunuzu
            yaparken hesabınızda yeterli bakiye bulunmalıdır. Başvuru tutarınız bloke edilir ve
            dağıtım sonrasında size lot düşmezse bakiyeniz iade edilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Lot Dağıtımı: Eşit ve Oransal Yöntemler
          </h2>
          <p>
            Halka arzda lot dağıtımı genellikle iki temel yöntemle gerçekleştirilir: eşit dağıtım
            ve oransal dağıtım. Eşit dağıtım yönteminde, başvuran tüm yatırımcılara aynı miktarda
            lot verilir. Örneğin, toplam 100.000 lot dağıtılacak ve 50.000 yatırımcı başvurduysa,
            her yatırımcıya 2 lot düşer. Kalan küsurat lotlar kura yöntemiyle dağıtılır.
          </p>
          <p>
            Oransal dağıtımda ise yatırımcıların başvuru tutarlarına göre dağıtım yapılır.
            Daha yüksek tutarla başvuran yatırımcı, oransal olarak daha fazla lot alır. Bu yöntem,
            büyük tutarlı başvuruları olan yatırımcılara avantaj sağlar.
          </p>
          <p>
            &quot;Bireysele eşit&quot; dağıtım ise özellikle bireysel yatırımcılara ayrılan dilimin
            eşit şekilde dağıtılmasını ifade eder. Kurumsal ve bireysel yatırımcı havuzları ayrı
            ayrı değerlendirilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Halka Arz Riskleri
          </h2>
          <p>
            Halka arz yatırımı, diğer tüm yatırım araçları gibi risk içerir. En önemli risklerden
            biri, hissenin borsada işlem görmeye başladıktan sonra halka arz fiyatının altına
            düşme ihtimalidir. Şirketin mali durumu, sektör koşulları ve genel piyasa ortamı
            hissenin performansını doğrudan etkiler.
          </p>
          <p>
            Diğer bir risk ise likidite riskidir. Özellikle küçük ölçekli şirketlerin halka
            arzlarında, hisse senedinin borsada yeterli işlem hacmine ulaşamama ihtimali vardır.
            Bu durumda yatırımcı, istediği anda hissesini satamayabilir. Ayrıca, halka arz
            izahnamelerindeki büyüme hedeflerinin gerçekleşmemesi de önemli bir risk faktörüdür.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Yeni Başlayanlar İçin İpuçları
          </h2>
          <p>
            Halka arza katılmadan önce mutlaka izahnameyi okuyun. Şirketin ne iş yaptığını, hangi
            sektörde faaliyet gösterdiğini ve mali durumunu anlayın. Fiyat tespit raporundaki
            değerleme yöntemlerini inceleyin. Benzer sektördeki şirketlerle karşılaştırma yapın.
          </p>
          <p>
            Tüm sermayenizi tek bir halka arza yatırmaktan kaçının. Portföy çeşitlendirmesi,
            riskinizi azaltmanın en temel yoludur. Halka arz fiyatının altına düşme ihtimaline
            karşı zarar kes seviyenizi önceden belirleyin. Uzun vadeli düşünün ve piyasa
            dalgalanmalarına karşı sabır gösterin.
          </p>
          <p>
            Borsa Cebimde uygulamasını kullanarak güncel halka arz takvimini takip edebilir,
            SPK onaylı halka arzların detaylarını inceleyebilir ve talep toplama tarihlerinden
            haberdar olabilirsiniz.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Tavan Takibi ve Getiri Hesaplaması
          </h2>
          <p>
            Halka arz sonrası hisseler borsada işlem görmeye başladığında, yatırımcılar tavan
            fiyat hareketlerini yakından takip eder. Ardışık tavan yapan hisseler yüksek getiri
            potansiyeli sunarken, ilk gün taban yapan hisseler de görülebilir. Tavan takibi,
            halka arz yatırımında önemli bir strateji aracıdır.
          </p>
          <p>
            <Link href="/halka-arz" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              Güncel halka arz takvimini inceleyin
            </Link>{' '}
            ve yeni halka arzlardan anında haberdar olmak için{' '}
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
