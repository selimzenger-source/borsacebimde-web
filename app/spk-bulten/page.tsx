import type { Metadata } from 'next';
import SpkBultenContent from './Content';
import SsrNewsList from '@/components/SsrNewsList';
import { fetchNewsFeedSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'SPK Bülten Analizleri - Sermaye Piyasası Kurulu Haftalık Bülten',
  description:
    'SPK haftalık bültenlerinin yapay zeka destekli analizleri. Sermaye Piyasası Kurulu kararları, halka arz onayları, düzenleyici gelişmeler ve yatırımcılar için önemli duyurular.',
  keywords: [
    'SPK bülten',
    'SPK haftalık bülten',
    'Sermaye Piyasası Kurulu',
    'SPK kararları',
    'SPK halka arz onayı',
    'SPK bülten analizi',
    'sermaye piyasası düzenlemeleri',
  ],
};

export default async function SpkBultenPage() {
  const ssrItems = await fetchNewsFeedSSR('tweet_spk_bulletin_analysis', 20, 60);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Dinamik bülten içeriği */}
      <SpkBultenContent />

      <SsrNewsList
        items={ssrItems}
        heading="Son SPK Bülten Analizleri"
        description="Sermaye Piyasası Kurulu haftalık bültenlerinin yapay zeka destekli konu başlığı özetleri."
      />

      {/* Statik SEO İçeriği */}
      <article
        className="card p-6 sm:p-8"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          SPK Haftalık Bülteni Nedir?
        </h2>
        <div
          className="text-sm leading-relaxed flex flex-col gap-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          <p>
            Sermaye Piyasası Kurulu (SPK), Türkiye&apos;deki sermaye piyasalarının düzenlenmesi ve denetlenmesinden sorumlu
            bağımsız idari otoritedir. SPK, yatırımcıların korunması, piyasa şeffaflığının sağlanması ve sermaye piyasalarının
            etkin işleyişinin güvence altına alınması amacıyla çeşitli düzenleyici faaliyetler yürütmektedir. Bu faaliyetlerin
            en önemli çıktılarından biri, her hafta düzenli olarak yayımlanan haftalık bültenlerdir.
          </p>

          <p>
            SPK haftalık bülteni, Kurul&apos;un ilgili hafta içerisinde aldığı tüm kararları, onayladığı izahnameleri, verdiği
            yaptırımları ve gerçekleştirdiği düzenleyici işlemleri kapsayan resmi bir yayındır. Bülten genellikle her haftanın
            son iş gününde veya takip eden haftanın başında SPK&apos;nın resmi internet sitesinde PDF formatında yayımlanır.
            Her bültene bir sıra numarası verilir ve bu numara yıl/sıra şeklinde düzenlenir (örneğin 2025/12 gibi).
          </p>

          <h3
            className="text-lg font-semibold mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            SPK Bülteni Ne İçerir?
          </h3>
          <p>
            SPK haftalık bülteni, sermaye piyasasını yakından ilgilendiren birçok farklı konuyu kapsar. Bunların başında
            halka arz başvurularına ilişkin kararlar gelir. Bir şirketin halka arz izahnamesi onaylandığında veya başvurusu
            reddedildiğinde bu bilgi bültende yer alır. Bunun yanı sıra, mevcut halka açık şirketlerin sermaye artırımı
            kararları, tahvil ve bono ihraç onayları, yatırım fonu kurulması veya tasfiyesine ilişkin kararlar da
            bültende yayımlanır.
          </p>

          <p>
            Bültenin önemli bir bölümünü de idari yaptırımlar ve para cezaları oluşturur. SPK, piyasa manipülasyonu,
            içeriden öğrenenlerin ticareti veya bilgi suistimali gibi sermaye piyasası suçlarına karışan gerçek ve tüzel
            kişilere yönelik aldığı idari tedbirleri ve uyguladığı para cezalarını haftalık bültende kamuoyuyla paylaşır.
            Ayrıca aracı kurum ve portföy yönetim şirketlerinin faaliyet izinleri, lisans değişiklikleri ve kurumsal
            yönetim uyum raporları gibi konular da düzenli olarak bültende yer alır.
          </p>

          <h3
            className="text-lg font-semibold mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Yatırımcılar İçin Önemi
          </h3>
          <p>
            SPK haftalık bültenleri, bireysel ve kurumsal yatırımcılar için kritik bir bilgi kaynağıdır. Halka arz
            izahnamesi onaylanan şirketlerin listesi, yaklaşan halka arzları takip eden yatırımcılar için doğrudan
            yatırım fırsatı anlamına gelir. Sermaye artırımı kararları mevcut hissedarların bedelli veya bedelsiz
            hisse hakkını etkileyebilir. İdari yaptırım kararları ise yatırım yapılan veya yapılması düşünülen
            şirketler hakkında önemli risk sinyalleri verebilir. Bu nedenle, aktif yatırımcıların SPK bültenlerini
            düzenli olarak takip etmesi, bilinçli yatırım kararları alabilmeleri açısından büyük önem taşır.
          </p>

          <h3
            className="text-lg font-semibold mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Yapay Zeka ile Bülten Analizi Nasıl Çalışır?
          </h3>
          <p>
            Borsa Cebimde olarak SPK haftalık bültenlerini yapay zeka teknolojisi kullanarak analiz ediyoruz.
            Her bülten yayımlandığında, içeriği otomatik olarak işlenir ve yatırımcılar için en önemli kararlar
            öne çıkarılır. Yapay zeka modeli, bültendeki teknik ve hukuki dili sadeleştirerek anlaşılır özetler
            hazırlar. Halka arz onayları, sermaye artırımları ve yaptırım kararları gibi farklı kategorilere
            ayrılan bu özetler sayesinde yatırımcılar, saatlerce sürebilecek bülten okuma sürecini birkaç
            dakikaya indirgeyebilir. Ayrıca bildirim sistemi sayesinde yeni bülten yayımlandığında anında
            haberdar olabilirsiniz.
          </p>
        </div>

        {/* Yatırım Uyarısı */}
        <div
          className="mt-6 p-4 rounded-xl text-xs leading-relaxed"
          style={{
            background: 'rgba(148,163,184,0.06)',
            border: '1px solid rgba(148,163,184,0.15)',
            color: 'var(--text-muted)',
          }}
        >
          <strong>Yatırım Uyarısı:</strong> Bu sayfadaki içerikler yalnızca bilgilendirme amaçlıdır ve yatırım tavsiyesi
          niteliği taşımaz. SPK bülten analizleri, yapay zeka tarafından otomatik olarak oluşturulmakta olup hata
          içerebilir. Yatırım kararlarınızı almadan önce mutlaka SPK&apos;nın resmi kaynaklarını kontrol ediniz ve
          lisanslı yatırım danışmanlarından profesyonel destek alınız. Sermaye piyasası araçlarına yapılan
          yatırımlarda sermaye kaybı riski bulunmaktadır.
        </div>
      </article>
    </div>
  );
}
