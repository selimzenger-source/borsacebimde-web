import type { Metadata } from 'next';
import KapAIContent from './Content';

export const metadata: Metadata = {
  title: 'KAP Pozitif Haberler - Yapay Zeka Destekli KAP Analizi',
  description:
    'Yapay zeka ile filtrelenmiş pozitif KAP haberleri. BIST şirketlerinin olumlu bildirimleri, AI etki puanı ve duygu analizi ile anlık takip. Borsa yatırımcıları için akıllı KAP haber takibi.',
  openGraph: {
    title: 'KAP Pozitif Haberler - Yapay Zeka Destekli KAP Analizi',
    description:
      'Yapay zeka ile filtrelenmiş pozitif KAP haberleri. BIST şirketlerinin olumlu bildirimleri, AI etki puanı ve duygu analizi ile anlık takip.',
  },
};

export default function KapAiPage() {
  return (
    <>
      <KapAIContent />

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
          KAP Nedir ve Neden Yatırımcılar İçin Kritik Bir Kaynaktır?
        </h2>
        <p>
          KAP (Kamuyu Aydınlatma Platformu), Borsa İstanbul bünyesinde faaliyet gösteren ve sermaye piyasası
          araçlarının ihraççıları tarafından kamuya açıklanması gereken bilgilerin elektronik ortamda
          yayımlandığı resmi platformdur. Sermaye Piyasası Kurulu (SPK) düzenlemeleri gereğince, BIST&apos;te
          işlem gören tüm şirketler, yatırımcı kararlarını etkileyebilecek her türlü gelişmeyi KAP
          aracılığıyla kamuoyuyla paylaşmak zorundadır. Bu bildirimler arasında bilanço açıklamaları,
          sermaye artırım kararları, temettü dağıtım planları, ortaklık yapısı değişiklikleri, önemli
          sözleşmeler ve yönetim kurulu kararları gibi kritik bilgiler yer alır.
        </p>
        <p style={{ marginTop: 12 }}>
          Yatırımcılar için KAP bildirimleri, doğru ve zamanında bilgiye ulaşmanın en güvenilir yoludur.
          Ancak her gün yüzlerce bildirim yayımlanması, bireysel yatırımcıların tüm haberleri takip
          etmesini zorlaştırmaktadır. İşte tam bu noktada yapay zeka destekli haber analizi devreye girer
          ve yatırımcıya gerçekten önemli olan haberleri ön plana çıkarır.
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
          Yapay Zeka ile KAP Haber Analizi Nasıl Çalışır?
        </h2>
        <p>
          Platformumuz, KAP üzerinden yayımlanan tüm bildirimleri gerçek zamanlı olarak toplar ve
          gelişmiş doğal dil işleme (NLP) modelleri aracılığıyla analiz eder. Bu analiz süreci birkaç
          temel aşamadan oluşur:
        </p>
        <p style={{ marginTop: 12 }}>
          İlk aşamada her bildirim, içeriğine göre otomatik olarak kategorize edilir. Bilanço
          açıklamaları, temettü kararları, sermaye artırımları, ortaklık değişiklikleri ve diğer
          bildirim türleri ayrı ayrı sınıflandırılır. Ardından yapay zeka modeli, bildirimin yatırımcı
          üzerindeki olası etkisini değerlendirerek olumlu, olumsuz veya nötr şeklinde bir duygu
          sınıflandırması yapar. Bu sınıflandırma, haberin içeriğindeki anahtar kelimeleri, finansal
          verileri ve bağlamsal ipuçlarını birlikte değerlendirerek gerçekleştirilir.
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
          Etki Puanı Sistemi: Haberin Önemini Ölçmek
        </h2>
        <p>
          Duygu sınıflandırmasının yanı sıra, her bildirime 1 ile 10 arasında bir etki puanı atanır.
          Bu puan, haberin hisse senedi fiyatı üzerindeki potansiyel etkisinin büyüklüğünü yansıtır.
          Örneğin, bir şirketin beklentilerin çok üzerinde kar açıklaması 8-9 gibi yüksek bir puan
          alırken, rutin bir yönetim kurulu değişikliği 3-4 civarında daha düşük bir puan alabilir.
          Etki puanı sistemi sayesinde yatırımcılar, yüzlerce bildirim arasından gerçekten dikkat
          edilmesi gereken haberleri hızla ayırt edebilir.
        </p>
        <p style={{ marginTop: 12 }}>
          Puanlama algoritması; bildirimin türünü, ilgili şirketin piyasa değerini, haberin
          beklenmediklik derecesini ve tarihsel benzer haberlerin piyasa üzerindeki etkilerini
          birlikte değerlendirerek sonuç üretir. Böylece yatırımcılar, portföylerini etkileyen
          en kritik gelişmelere odaklanabilir.
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
          KAP Pozitif Haber Takibinin Avantajları
        </h2>
        <p>
          Bu sayfa özellikle yapay zeka tarafından olumlu olarak değerlendirilen KAP bildirimlerini
          bir araya getirir. Pozitif haberleri filtreleyerek takip etmenin yatırımcılara sağladığı
          başlıca avantajlar şunlardır:
        </p>
        <ul style={{ marginTop: 12, paddingLeft: 20 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Fırsat Tespiti:</strong> Olumlu bilanço sonuçları, yeni iş sözleşmeleri, temettü
            kararları gibi hisse fiyatını yukarı yönlü etkileyebilecek gelişmeleri anında görürsünüz.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Zaman Tasarrufu:</strong> Günde yüzlerce KAP bildirimi arasından sadece olumlu
            olanları görerek, araştırma sürenizi önemli ölçüde kısaltırsınız.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Objektif Değerlendirme:</strong> Yapay zeka, duygusal önyargılardan bağımsız
            olarak haberleri analiz eder ve tutarlı bir değerlendirme sunar.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Anlık Bildirim:</strong> Mobil uygulamamız aracılığıyla, takip listenizdeki
            hisselere ait pozitif KAP haberleri düştüğünde anında bildirim alabilirsiniz.
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
          Güvenilir ve Şeffaf Bilgi Kaynağı
        </h2>
        <p>
          Platformumuzda yer alan tüm haberler doğrudan KAP resmi kaynaklarından alınmaktadır.
          Yapay zeka analizi yalnızca bu resmi verilere dayalı olarak yapılır ve herhangi bir
          spekülasyon veya söylenti içermez. Her bildirimin orijinal KAP bağlantısına erişim
          sağlanarak, kullanıcıların haberleri birincil kaynaktan doğrulaması mümkündür.
        </p>
        <p style={{ marginTop: 12 }}>
          Tarih bazlı gruplama sayesinde haberleri kronolojik sırayla takip edebilir, belirli
          bir günde hangi pozitif gelişmelerin yaşandığını kolayca görebilirsiniz. Ayrıca her
          haberin yanında yer alan duygu etiketi ve etki puanı, haberin önemini hızla
          kavramanıza yardımcı olur.
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
          taşımaz. Yapay zeka tarafından yapılan analizler, haberlerin olası etkisine dair bir
          tahmin sunmakta olup kesinlik garantisi vermez. Yatırım kararlarınızı almadan önce
          mutlaka kendi araştırmanızı yapın ve gerektiğinde lisanslı bir yatırım danışmanına
          başvurun. Geçmiş performans gelecekteki sonuçların göstergesi değildir.
        </div>
      </article>
    </>
  );
}
