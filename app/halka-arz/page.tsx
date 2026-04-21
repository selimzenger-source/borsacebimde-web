import type { Metadata } from 'next';
import HalkaArzContent from './Content';
import SsrIpoList from '@/components/SsrIpoList';
import { fetchIposSSR } from '@/lib/ssr-prefetch';

export const metadata: Metadata = {
  title: 'Halka Arz Takvimi 2026 - Güncel SPK Onaylı Halka Arzlar',
  description: 'Güncel halka arz takvimi 2026. SPK onaylı halka arzlar, talep toplama tarihleri, lot dağıtımı, aracı kurum bilgileri ve tavan takibi. BIST halka arz takibi.',
  alternates: { canonical: 'https://borsacebimde.app/halka-arz' },
  keywords: ['halka arz', 'halka arz takvimi', 'halka arz 2026', 'SPK onaylı halka arz', 'borsa halka arz', 'lot dağıtımı', 'tavan takibi'],
};

export default async function HalkaArzPage() {
  const ipos = await fetchIposSSR();

  return (
    <>
      <HalkaArzContent />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px' }}>
        <SsrIpoList
          items={ipos}
          heading="Detaylı Halka Arz Verileri"
          description="Her halka arz için izahname analizi, günlük kapanış tablosu, dağıtım sonuçları, aracı kurumlar ve AI değerlendirmesi."
        />
      </div>

      {/* SEO Content Section */}
      <section className="mt-10 flex flex-col gap-8 max-w-4xl mx-auto px-4">
        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Halka Arz Nedir?</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Halka arz, bir şirketin hisselerini ilk kez kamuya açık olarak satışa sunma sürecidir. Türkiye&apos;de halka arz süreci Sermaye Piyasası Kurulu (SPK) denetiminde yürütülür ve şirketler Borsa İstanbul&apos;da (BIST) işlem görmeye başlamadan önce kapsamlı bir onay sürecinden geçer. Şirketler halka arz yoluyla büyüme sermayesi elde ederken, bireysel ve kurumsal yatırımcılara da erken aşamada ortaklık fırsatı sunar. Halka arz sürecinde şirketler izahname hazırlar, bağımsız denetimden geçer ve SPK&apos;ya başvuruda bulunur. SPK onayının ardından talep toplama süreci başlar ve yatırımcılar aracı kurumlar vasıtasıyla başvurularını iletir. Dağıtım yöntemi halka arzdan halka arza farklılık gösterebilir; eşit dağıtım yönteminde her yatırımcıya eşit sayıda lot tahsis edilirken, oransal dağıtımda yatırımcının yatırdığı tutar oranında pay dağıtılır. Karma dağıtım ise bu iki yöntemin birleşimidir. Halka arz sonrasında hisseler belirli bir tarihte BIST&apos;te işlem görmeye başlar ve yatırımcılar bu noktadan itibaren hisselerini serbestçe alıp satabilir.
          </p>
        </article>

        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Halka Arza Nasıl Katılınır?</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Halka arza katılmak için öncelikle SPK lisanslı bir aracı kurumda veya bankada yatırım hesabı açmanız gerekmektedir. Hesap açılışı genellikle e-Devlet doğrulaması ile çevrimiçi olarak birkaç dakika içinde tamamlanabilir. Talep toplama dönemi başladığında, yatırımcılar aracı kurumlarının mobil uygulaması veya internet şubesi üzerinden ilgili halka arza başvuru yapabilir. Başvuru sırasında yatırımcının hesabında yeterli bakiye veya teminat bulunması gerekir. Eşit dağıtım yöntemli halka arzlarda her bireysel yatırımcıya eşit lot dağıtıldığından, minimum tutar kadar yatırım yaparak katılım sağlanabilir. Bu yöntem özellikle küçük yatırımcılar için büyük avantaj sağlar. Talep toplama süresi genellikle iki ila beş iş günü arasında değişir. Süre sonunda başvurular değerlendirilir, talep fazlası oluşursa yatırımcılara iade yapılır ve lot tahsisi gerçekleştirilir. Tahsis edilen hisseler yatırımcının portföyüne aktarılır ve BIST&apos;te işlem görmeye başladığı gün itibarıyla alım-satım yapılabilir hale gelir. Halka arz sürecinde dikkat edilmesi gereken en önemli noktalar arasında şirketin faaliyet alanı, finansal tabloları, halka arz fiyatının makul olup olmadığı ve sektörel büyüme potansiyeli yer alır.
          </p>
        </article>

        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Borsa Cebimde ile Halka Arz Takibi</h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, Türkiye&apos;deki tüm güncel halka arzları tek bir platformda takip etmenizi sağlar. SPK başvuru aşamasından itibaren her halka arzın durumu anlık olarak güncellenir; onay tarihi, talep toplama dönemi, lot dağıtım sonuçları ve işlem başlangıç günü gibi kritik bilgilere anında erişebilirsiniz. Uygulama, halka arz sonrası tavan takibi özelliği ile hissenin kaç gün üst üste tavan yaptığını veya geri çekilme yaşadığını görsel olarak sunar. Aracı kurum bilgileri, dağıtım yöntemleri, halka arz fiyatı ve şirketin sektörel bilgileri detay sayfalarında yer alır. Bildirim sistemi sayesinde yeni SPK onayları, talep toplama başlangıçları ve işlem günü hatırlatmaları otomatik olarak telefonunuza iletilir; böylece hiçbir fırsatı kaçırmazsınız. SPK bülten analizi ve yapay zeka destekli raporlarla halka arz hakkında derinlemesine bilgi edinebilirsiniz.
          </p>
        </article>

        {/* Investment disclaimer */}
        <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}>
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>{"Yat\u0131r\u0131m Uyar\u0131s\u0131"}</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {"Borsa Cebimde yat\u0131r\u0131m tavsiyesi vermez. Halka arz bilgileri yaln\u0131zca bilgilendirme amaçl\u0131d\u0131r. Yat\u0131r\u0131m kararlar\u0131n\u0131z\u0131 almadan önce mutlaka lisansl\u0131 bir yat\u0131r\u0131m dan\u0131\u015Fman\u0131na ba\u015Fvurunuz."}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
