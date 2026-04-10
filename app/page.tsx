import type { Metadata } from 'next';
import HomeContent from './HomeContent';

export const metadata: Metadata = {
  title: 'Borsa Cebimde - Halka Arz Takvimi, KAP Haberleri, AI Analiz ve Borsa Takibi',
  description:
    'Halka arz takvimi 2026, yapay zeka destekli KAP haberleri, tavan taban hisseleri, VİOP gece seansı, SPK bülten analizleri ve piyasa haberleri. BIST borsa verilerini anlık takip edin.',
  alternates: { canonical: 'https://borsacebimde.app' },
};

export default function HomePage() {
  return (
    <>
      <HomeContent />

      {/* ── SEO İçerik Bölümü ── */}
      <section className="mt-10 flex flex-col gap-8">

        {/* Borsa Cebimde Nedir */}
        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Borsa Cebimde: T&uuml;rkiye Borsas&inodot; i&ccedil;in &Uuml;cretsiz Finans Bilgi Platformu
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, Borsa İstanbul (BIST) yatırımcıları için geliştirilmiş kapsamlı bir finans
            bilgi platformudur. Halka arz takvimi, yapay zeka destekli KAP haber analizleri,
            günlük tavan ve taban hisseleri, VİOP gece seansı verileri, SPK haftalık bülten özetleri
            ve piyasa haberleri gibi birçok özelliği tek bir platformda birleştirerek sunmaktadır.
            Hem web sitesi hem de mobil uygulama (Android ve iOS) olarak hizmet vermektedir.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Platformumuz, bireysel yatırımcılara doğru ve güncel piyasa bilgisine en hızlı şekilde
            ulaşma imkanı sağlamak amacıyla tasarlanmıştır. Yapay zeka teknolojisini kullanarak
            KAP bildirimlerini analiz eder, haber özetleri oluşturur ve yatırımcıların bilgi
            yoğunluğunda kaybolmamasına yardımcı olur.
          </p>
        </article>

        {/* Özellikler Detay */}
        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Platformumuzun Sunduğu Hizmetler
          </h2>
          <div className="text-sm leading-relaxed flex flex-col gap-3" style={{ color: 'var(--text-secondary)' }}>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Halka Arz Takvimi:</strong> SPK
              tarafından onaylanan halka arzların detaylı takibini yapabilirsiniz. Talep toplama
              tarihleri, dağıtım yöntemi, aracı kurum bilgileri, lot hesaplamaları ve borsada
              işlem görmeye başlama tarihlerini anlık olarak görüntüleyebilirsiniz. Her halka arz
              için ayrıntılı tavan takibi ve getiri hesaplaması sunulmaktadır.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>KAP Haberleri ve Yapay Zeka Analizi:</strong> Kamuyu
              Aydınlatma Platformu (KAP) bildirimlerini yapay zeka teknolojisiyle analiz ediyoruz.
              Her bildirimi olumlu, olumsuz veya nötr olarak sınıflandırıyor ve 1-10 arası etki puanı
              veriyoruz. Böylece günde yüzlerce KAP bildirimini tek tek okumanıza gerek kalmadan
              önemli haberleri hızlıca tespit edebilirsiniz.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Tavan ve Taban Hisseleri:</strong> Borsa
              İstanbul'da günlük fiyat limitine ulaşan hisseleri anlık olarak takip edebilirsiniz.
              Tavan yapan (günlük %10 yükselen) ve taban yapan (günlük %10 düşen) hisselerin
              listesini, ardışık tavan/taban sayıları ve aylık istatistikleri ile birlikte
              görüntüleyebilirsiniz.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>VİOP Gece Seansı:</strong> Vadeli
              İşlem ve Opsiyon Piyasası gece seansı (akşam seansı) verilerini canlı olarak takip
              edebilirsiniz. Açılış, kapanış ve seyir bilgileriyle küresel piyasalardaki gelişmelerin
              BIST üzerindeki etkisini değerlendirebilirsiniz.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>SPK B&uuml;lten Analizleri:</strong> Sermaye
              Piyasası Kurulu&apos;nun haftalık bültenlerini yapay zeka ile özetliyoruz. Yeni
              halka arz onayları, şirketlere verilen cezalar ve düzenleyici değişiklikler
              hakkında hızlıca bilgi sahibi olabilirsiniz.
            </p>
            <p>
              <strong style={{ color: 'var(--text-primary)' }}>Piyasa Haberleri:</strong> Borsa
              ve finans dünyasından güncel haberleri, görsel destekli olarak derleyerek
              sunmaktayız. Bloomberg HT, BigPara ve Uzmanpara gibi güvenilir kaynaklardan
              derlenen haberlerle piyasayı yakından izleyebilirsiniz.
            </p>
          </div>
        </article>

        {/* Nasıl Çalışır */}
        <article className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            Borsa Cebimde Nas&inodot;l &Ccedil;al&inodot;ş&inodot;r?
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, birden fazla güvenilir veri kaynağından bilgi toplayarak bunları
            tek bir platformda birleştirir. Kamuyu Aydınlatma Platformu (KAP), Sermaye Piyasası
            Kurulu (SPK), Bloomberg HT, BigPara ve Uzmanpara gibi kaynaklardan gelen veriler
            gerçek zamanlı olarak işlenir ve kullanıcılara sunulur.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Yapay zeka altyapımız, KAP bildirimlerini ve SPK bültenlerini otomatik olarak analiz
            ederek olumlu/olumsuz/nötr sınıflandırma yapar. Her haber için 1-10 arası etki puanı
            hesaplanır ve yatırımcılara özetlenmiş bilgi sunulur. Bu sayede bilgi yoğunluğunda
            kaybolmadan en önemli gelişmeleri hızlıca takip edebilirsiniz.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Platformumuz 7/24 güncel kalmaktadır. Halka arz süreçleri otomatik olarak
            takip edilir ve statü değişikliklerinde (onay, dağıtım, işlem başlangıcı) anlık
            bildirimler gönderilir. Tüm bu hizmetler hem web sitesi hem de mobil uygulama
            üzerinden erişilebilir durumdadır.
          </p>
        </article>

        {/* Yatırım Uyarısı */}
        <div
          className="flex gap-3 p-4 rounded-xl"
          style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}
        >
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>Yatırım Uyarısı</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              Borsa Cebimde yatırım tavsiyesi vermez. Sunulan tüm veriler, analizler ve içerikler
              yalnızca bilgilendirme amaçlıdır. Yapay zeka tarafından üretilen analizler hata
              içerebilir. Yatırım kararlarınızı almadan önce mutlaka lisanslı bir yatırım
              danışmanına başvurunuz. Geçmiş performans gelecekteki sonuçların garantisi değildir.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
