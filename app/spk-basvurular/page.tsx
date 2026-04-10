import type { Metadata } from 'next';
import SpkBasvurularContent from './Content';

export const metadata: Metadata = {
  title: 'SPK Başvuruları - Onay Bekleyen Halka Arz Başvuruları',
  description:
    'SPK onayı bekleyen halka arz başvurularının güncel listesi. Sermaye Piyasası Kurulu\'na yapılan halka arz başvuruları, onay süreci ve yatırımcılar için önemli bilgiler.',
  keywords: [
    'SPK başvuruları',
    'halka arz başvurusu',
    'SPK onayı bekleyen',
    'halka arz onay süreci',
    'SPK izahname onayı',
    'Borsa İstanbul halka arz',
  ],
};

export default function SpkBasvurularPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Dinamik başvuru listesi */}
      <SpkBasvurularContent />

      {/* Statik SEO İçeriği */}
      <article
        className="card p-6 sm:p-8"
        style={{ borderColor: 'var(--border-primary)' }}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: 'var(--text-primary)' }}
        >
          Halka Arz Başvuru Süreci Nasıl İşler?
        </h2>
        <div
          className="text-sm leading-relaxed flex flex-col gap-4"
          style={{ color: 'var(--text-secondary)' }}
        >
          <p>
            Türkiye&apos;de bir şirketin hisselerini halka arz edebilmesi için Sermaye Piyasası Kurulu&apos;na (SPK)
            resmi bir başvuru yapması gerekmektedir. Bu süreç, şirketin mali tablolarının bağımsız denetimden
            geçmesiyle başlar. Ardından şirket, bir aracı kurum ile anlaşarak izahname hazırlar. İzahname,
            şirketin mali durumunu, faaliyet alanını, risk faktörlerini, halka arz edilecek pay miktarını ve
            fiyat aralığını detaylı şekilde açıklayan kapsamlı bir belgedir.
          </p>

          <p>
            SPK&apos;ya yapılan başvuru sonrasında Kurul, izahnameyi ve şirketin tüm belgelerini titizlikle
            inceler. Bu inceleme süreci genellikle 4 ila 8 hafta arasında sürmektedir; ancak eksik belge
            veya ek bilgi talebi durumunda süre uzayabilir. SPK, yatırımcıların korunması ilkesi
            çerçevesinde izahnamedeki bilgilerin doğruluğunu, tutarlılığını ve yeterliliğini değerlendirir.
            Gerekli görüldüğünde şirketten ek açıklama veya düzeltme talep edebilir.
          </p>

          <h3
            className="text-lg font-semibold mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Onay Sonrası Süreç
          </h3>
          <p>
            SPK izahnameyi onayladığında, şirket belirlenen takvim dahilinde halka arz sürecini başlatır.
            Talep toplama dönemi genellikle 2-3 iş günü sürer. Bu sürede yatırımcılar, aracı kurumlar
            üzerinden halka arza katılım talebinde bulunabilir. Talep toplama sonrasında pay dağıtımı
            gerçekleştirilir ve hisseler Borsa İstanbul&apos;da işlem görmeye başlar. İlk işlem günü
            genellikle talep toplama döneminin tamamlanmasından 2-3 iş günü sonrasına denk gelir.
          </p>

          <h3
            className="text-lg font-semibold mt-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Yatırımcılar Nelere Dikkat Etmeli?
          </h3>
          <p>
            SPK onayı bekleyen halka arz başvurularını takip etmek, yatırımcılara önceden hazırlık yapma
            imkanı tanır. Başvuru tarihi, şirketin sektörü, planlanan halka arz büyüklüğü ve satış fiyatı
            gibi bilgiler, yatırım kararı öncesinde değerlendirilmesi gereken temel unsurlardır. Ancak
            unutulmamalıdır ki SPK başvurusu yapılmış olması, halka arzın kesinleştiği anlamına gelmez.
            Başvurular reddedilebilir veya şirket tarafından geri çekilebilir. Bu nedenle yatırım
            kararlarını yalnızca başvuru bilgisine dayandırmamak önemlidir.
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
          <strong>Yatırım Uyarısı:</strong> Bu sayfadaki bilgiler yalnızca bilgilendirme amaçlıdır ve yatırım tavsiyesi
          niteliği taşımaz. Halka arz başvuruları SPK tarafından reddedilebilir veya şirket tarafından geri çekilebilir.
          Yatırım kararlarınızı almadan önce mutlaka izahnameyi okuyunuz ve lisanslı yatırım danışmanlarından
          profesyonel destek alınız.
        </div>
      </article>
    </div>
  );
}
