import type { Metadata } from 'next';
import KapTumContent from './Content';
import SsrNewsList from '@/components/SsrNewsList';
import { fetchNewsFeedSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'Tüm KAP Haberleri - BIST Şirket Bildirimleri ve AI Analiz',
  description:
    'BIST şirketlerinin tüm KAP bildirimlerini yapay zeka analizi ile takip edin. Bilanço, temettü, sermaye artırımı, sözleşme ve ortaklık bildirimleri. Hisse bazlı filtreleme ve AI duygu analizi.',
  openGraph: {
    title: 'Tüm KAP Haberleri - BIST Şirket Bildirimleri ve AI Analiz',
    description:
      'BIST şirketlerinin tüm KAP bildirimlerini yapay zeka analizi ile takip edin. Bilanço, temettü, sermaye artırımı ve daha fazlası.',
  },
};

export default async function KapTumHaberlerPage() {
  const ssrItems = await fetchNewsFeedSSR('kap_news', 30, 30);

  return (
    <>
      <KapTumContent />

      <SsrNewsList
        items={ssrItems}
        heading="Son KAP Bildirimleri (Tam Liste)"
        description="BIST şirketlerinin son yayınlanan KAP özel durum açıklamaları — bilanço, temettü, sermaye artırımı, sözleşme, ortaklık ve daha fazlası."
      />

      {/* ── Static SEO Content ── */}
      <article
        style={{
          marginTop: 48,
          padding: '32px 24px',
          maxWidth: 800,
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'var(--text-secondary)',
          fontSize: 15,
          lineHeight: 1.8,
        }}
      >
        <h2
          style={{
            fontSize: 24,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 16,
          }}
        >
          KAP Bildirimleri: Türleri ve Yatırımcılar İçin Önemi
        </h2>
        <p>
          Kamuyu Aydınlatma Platformu (KAP) üzerinden yayımlanan bildirimler, Borsa İstanbul&apos;da
          işlem gören şirketlerin yatırımcılara ve kamuoyuna iletmekle yükümlü olduğu resmi
          açıklamalardır. Bu bildirimler, sermaye piyasalarının şeffaflığını ve adil işleyişini
          sağlamak amacıyla Sermaye Piyasası Kurulu (SPK) düzenlemeleri çerçevesinde zorunlu olarak
          yapılmaktadır. Her yatırımcının portföyündeki veya ilgilendiği şirketlere ait KAP
          bildirimlerini düzenli takip etmesi, bilinçli yatırım kararları almanın temelini oluşturur.
        </p>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          KAP Bildirim Türleri
        </h2>
        <p>
          KAP üzerinde yayımlanan bildirimler birçok farklı kategoriye ayrılır ve her biri
          yatırımcı için farklı düzeyde önem taşır:
        </p>
        <ul style={{ marginTop: 12, paddingLeft: 20 }}>
          <li style={{ marginBottom: 10 }}>
            <strong>Finansal Raporlar ve Bilanço Açıklamaları:</strong> Şirketlerin üç aylık,
            altı aylık ve yıllık finansal sonuçlarını içerir. Gelir tablosu, bilanço ve nakit
            akış tablosu verileri, şirketin mali durumunu ve karlılığını doğrudan yansıtır.
            Beklentilerin üzerinde veya altında gelen sonuçlar, hisse fiyatında önemli
            hareketlere yol açabilir.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Sermaye Artırım Kararları:</strong> Bedelli veya bedelsiz sermaye artırımı
            duyuruları, mevcut ortakların haklarını doğrudan etkiler. Bedelsiz sermaye artırımı
            genellikle olumlu karşılanırken, bedelli sermaye artırımı kararları yatırımcılar
            tarafından daha dikkatli değerlendirilir.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Temettü Dağıtım Kararları:</strong> Şirketlerin kar payı dağıtım planları
            ve tarihleri, özellikle uzun vadeli yatırımcılar için kritik öneme sahiptir. Temettü
            verimi ve dağıtım oranı, hisse seçiminde belirleyici faktörler arasındadır.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Önemli Sözleşmeler ve İş Geliştirme:</strong> Büyük ihale kazanımları, yeni
            müşteri anlaşmaları, stratejik ortaklıklar ve lisans anlaşmaları gibi bildirimler,
            şirketin gelecekteki büyüme potansiyelini yansıtır.
          </li>
          <li style={{ marginBottom: 10 }}>
            <strong>Ortaklık Yapısı Değişiklikleri:</strong> Büyük hissedar alım-satımları,
            yönetim kurulu üyelerinin hisse işlemleri ve şirket birleşme-devralma süreçleri
            bu kategoride yer alır.
          </li>
        </ul>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          KAP Bildirimlerini Filtreleme ve Takip Yöntemleri
        </h2>
        <p>
          Platformumuz, KAP bildirimlerini etkili bir şekilde filtrelemeniz için çeşitli
          araçlar sunar. Hisse kodu arama özelliği sayesinde belirli bir şirketin tüm
          bildirimlerine anında erişebilirsiniz. Zaman filtresi ile son bir saat, bir gün,
          bir hafta veya bir aylık bildirimleri görüntüleyebilirsiniz.
        </p>
        <p style={{ marginTop: 12 }}>
          Duygu analizi filtresi ise bildirimleri olumlu ve olumsuz olarak ayırarak, yalnızca
          ilgilendiğiniz türdeki haberlere odaklanmanızı sağlar. Bu filtrelerin birlikte
          kullanılması, örneğin belirli bir hissenin son bir haftadaki pozitif gelişmelerini
          tek tıkla görmenize olanak tanır.
        </p>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          Yapay Zeka Analizi ile Önemli Bildirimleri Tespit Etme
        </h2>
        <p>
          Her gün KAP üzerinden yüzlerce bildirim yayımlanmaktadır. Bireysel bir yatırımcının
          tüm bu bildirimleri tek tek okuyup değerlendirmesi pratik olarak mümkün değildir.
          Platformumuzun yapay zeka altyapısı, her bildirimi otomatik olarak analiz ederek
          üç temel çıktı üretir: duygu sınıflandırması (olumlu, olumsuz veya nötr), etki
          puanı (1-10 arası) ve kısa AI özeti.
        </p>
        <p style={{ marginTop: 12 }}>
          Yapay zeka özeti, uzun ve teknik dille yazılmış KAP bildirimlerini birkaç cümleye
          indirgeyerek yatırımcının haberi hızla kavramasını sağlar. Bu özet, bildirimin asıl
          metninin yerine geçmez; ancak haberin özünü ve potansiyel etkisini anlamak için
          etkili bir başlangıç noktası sunar. Detaylı inceleme yapmak isteyen kullanıcılar,
          her bildirimin altındaki KAP bağlantısı aracılığıyla orijinal metne ulaşabilir.
        </p>

        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          BIST Şirketlerinin Zorunlu Açıklama Yükümlülükleri
        </h2>
        <p>
          SPK mevzuatı gereğince, halka açık şirketler belirli durumları derhal kamuoyuyla
          paylaşmak zorundadır. Özel durum açıklamaları olarak da bilinen bu bildirimler;
          şirketin mali yapısını, faaliyetlerini veya menkul kıymetlerinin fiyatını
          etkileyebilecek her türlü bilgiyi kapsar. Açıklama yükümlülüğünün zamanında ve
          eksiksiz yerine getirilmesi, piyasanın adil ve düzenli işleyişi için zorunludur.
        </p>
        <p style={{ marginTop: 12 }}>
          Şirketler, içsel bilgileri kamuya açıklamadan önce bu bilgiyi kullanarak işlem
          yapmaktan kaçınmakla yükümlüdür. Bu düzenleme, tüm yatırımcıların aynı bilgiye
          eşit koşullarda erişmesini güvence altına alır. Platformumuz, bu resmi bildirimleri
          anlık olarak toplayıp yapay zeka ile zenginleştirerek tüm yatırımcılara eşit ve
          hızlı erişim imkanı sunar.
        </p>

        {/* Investment Disclaimer */}
        <div
          style={{
            marginTop: 40,
            padding: '16px 20px',
            borderRadius: 12,
            background: 'rgba(255,152,0,0.06)',
            border: '1px solid rgba(255,152,0,0.20)',
            fontSize: 13,
            lineHeight: 1.7,
            color: 'var(--text-muted)',
          }}
        >
          <strong style={{ color: 'var(--text-secondary)' }}>Yasal Uyarı:</strong>{' '}
          Bu sayfadaki bilgiler yalnızca bilgilendirme amaçlıdır ve yatırım tavsiyesi niteliği
          taşımaz. Yapay zeka tarafından yapılan analizler ve duygu sınıflandırmaları, haberlerin
          olası etkisine dair otomatik bir değerlendirme sunmakta olup kesinlik garantisi vermez.
          KAP bildirimlerinin tam metni için her zaman resmi KAP kaynağını kontrol edin. Yatırım
          kararlarınızı almadan önce mutlaka kendi araştırmanızı yapın ve gerektiğinde lisanslı
          bir yatırım danışmanına başvurun. Geçmiş performans gelecekteki sonuçların göstergesi
          değildir.
        </div>
      </article>
    </>
  );
}
