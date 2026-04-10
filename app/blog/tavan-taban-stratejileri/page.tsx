import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tavan Taban Hisseleri: Ne Anlama Gelir?',
  description:
    'Borsada tavan ve taban fiyat limitleri nedir, neden oluşur? Ardışık tavan analizi, tavan taban hisselerinde dikkat edilmesi gerekenler.',
  alternates: { canonical: 'https://borsacebimde.app/blog/tavan-taban-stratejileri' },
};

export default function TavanTabanStratejileriPage() {
  return (
    <article className="flex flex-col gap-6">
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>Tavan Taban Hisseleri</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>Borsa Rehberi</span>
          <span style={{ color: 'var(--text-muted)' }}>5 Mart 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          Tavan Taban Hisseleri: Ne Anlama Gelir?
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Borsa İstanbul&apos;da işlem gören hisse senetleri, bir gün içinde belirli fiyat
            limitlerinin ötesine geçemez. Bu limitler &quot;tavan&quot; ve &quot;taban&quot; olarak
            adlandırılır. Tavan fiyat, bir hissenin gün içinde ulaşabilceği en yüksek fiyatı;
            taban fiyat ise en düşük fiyatı ifade eder. Bu sistem, ani ve aşırı fiyat
            hareketlerinin önlenerek yatırımcıların korunmasını amaçlar.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Tavan ve Taban Fiyat Nasıl Belirlenir?
          </h2>
          <p>
            Borsa İstanbul&apos;da günlük fiyat değişim limiti, hissenin bulunduğu pazara ve
            fiyat adımına göre değişir. Genel olarak Yıldız Pazar ve Ana Pazar&apos;daki hisseler
            için bu limit yüzde 10 olarak uygulanır. Yani bir önceki gün kapanış fiyatı 100 TL
            olan bir hisse, sonraki gün en fazla 110 TL&apos;ye (tavan) çıkabilir veya en düşük
            90 TL&apos;ye (taban) inebilir.
          </p>
          <p>
            Halka arz sonrası borsada ilk işlem günü için ise farklı limitler uygulanabilir.
            Bazı özel durumlarda (örneğin uzun süreli işlem durdurma sonrası) Borsa İstanbul
            fiyat limitlerini genişletebilir veya daraltabilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Bir Hisse Neden Tavan Yapar?
          </h2>
          <p>
            Hisse senedinin tavan fiyata ulaşması, o hisseye olan talebin arzdan çok daha fazla
            olduğu anlamına gelir. Bu duruma neden olan bazı faktörler şunlardır:
          </p>
          <p>
            Şirketin beklentilerin çok üzerinde bilanço açıklaması, önemli bir sözleşme veya
            iş birliği duyurusu, beklenmeyen yüksek temettü kararı, sektörde olumlu regülasyon
            değişiklikleri ve halka arz sonrası güçlü talep bu faktörler arasındadır.
          </p>
          <p>
            Tavan fiyatta işlem gören bir hissede genellikle &quot;tavan kuyruğu&quot; oluşur.
            Yani satın almak isteyen çok sayıda yatırımcı sıra beklerken, satıcı bulmak
            zorlaşır. Bu durum, arz-talep dengesizliğinin açık bir göstergesidir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Ardışık Tavan Analizi
          </h2>
          <p>
            Bir hissenin üst üste birden fazla gün tavan yapmasına &quot;ardışık tavan&quot; denir.
            Özellikle halka arz sonrası hisselerde ardışık tavan serisi sıkça görülür. Bazı
            halka arzlar 10, 15 hatta 20 gün üst üste tavan yaparak yatırımcılarına yüksek
            getiriler sağlamıştır.
          </p>
          <p>
            Ancak ardışık tavan serisi ne kadar uzun sürerse, tavanda birikmiş kârlı yatırımcıların
            satış baskısı da o kadar artar. Tavan serisinin kırılması genellikle yüksek işlem
            hacmi ve sert düşüşlerle gerçekleşir. Bu nedenle ardışık tavan yapan hisselere geç
            girmek ciddi risk taşır.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Bir Hisse Neden Taban Yapar?
          </h2>
          <p>
            Taban, tavan fiyatın tam tersidir. Hissenin gün içinde düşebileceği en alt sınıra
            ulaşması demektir. Taban yapmasının başlıca nedenleri arasında beklentilerin altında
            gelen mali sonuçlar, şirket hakkında olumsuz haberler, sektör genelinde yaşanan
            sorunlar, makroekonomik belirsizlikler ve büyük ortakların hisse satışları yer alır.
          </p>
          <p>
            Taban fiyatta işlem gören bir hissede ise &quot;taban kuyruğu&quot; oluşur.
            Satmak isteyen yatırımcılar sıra beklerken alıcı bulmak zorlaşır. Ardışık taban
            yapan hisselerde kayıplar hızla büyüyebilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Tavan Taban Hisselerinde Dikkat Edilmesi Gerekenler
          </h2>
          <p>
            Tavan yapan bir hisseyi satın almak, hissenin zaten günlük limitine ulaşmış olduğu
            için ekstra risk içerir. Ertesi gün açılış fiyatının nerede olacağı belirsizdir.
            Tavan kuyruğuna giren yatırımcılar, alım emirlerinin gerçekleşip gerçekleşmeyeceğini
            bile bilemezler.
          </p>
          <p>
            Taban yapan bir hissede ise panik satış yapmak yerine, taban nedenini araştırmak
            daha akıllıca bir yaklaşımdır. Geçici bir sorundan mı yoksa yapısal bir problemden
            mi kaynaklandığını anlamak önemlidir.
          </p>
          <p>
            Borsa Cebimde uygulaması, günlük tavan ve taban yapan hisselerin listesini anlık
            olarak sunar. Ardışık tavan/taban serileri, işlem hacimleri ve hisse detayları
            kolayca takip edilebilir.
          </p>
          <p>
            <Link href="/tavan-taban" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              Günlük tavan taban hisselerini inceleyin
            </Link>{' '}
            ve anlık bildirimler için{' '}
            <Link href="/indir" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              uygulamayı indirin
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
