import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Hakkımızda',
  description:
    'Borsa Cebimde hakkında bilgi, iletişim ve ekip tanıtımı. Halka arz takvimi, KAP haberleri ve borsa takibi uygulaması.',
  alternates: { canonical: 'https://borsacebimde.app/hakkimizda' },
};

export default function HakkimizdaPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* ─── Page Header ─── */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(41,121,255,0.2)',
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.1) 0%, transparent 70%)' }}
        />
        <div className="relative">
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
            style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)' }}
          >
            <svg className="w-3.5 h-3.5" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>Kurumsal</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            Hakkımızda
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde nedir, ne yapar, arkasında kim var?
          </p>
        </div>
      </header>

      {/* ─── About ─── */}
      <section className="card p-6 sm:p-8" style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          Borsa Cebimde Nedir?
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Borsa Cebimde, Türkiye borsasını (BIST) yakından takip etmek isteyen bireysel yatırımcılar
          için geliştirilen bir finans bilgi platformudur. Halka arz takvimi, yapay zeka destekli KAP
          haber analizleri, tavan-taban hisseleri, VİOP gece seansı verileri, SPK haftalık bülten
          özetleri ve piyasa haberleri gibi içerikleri tek bir çatı altında sunar.
        </p>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Platformumuz hem mobil uygulama (Android ve iOS) hem de web sitesi olarak hizmet
          vermektedir. Amacımız, yatırımcılara güncel ve doğru piyasa bilgisine en hızlı şekilde
          ulaşma imkanı sağlamaktır.
        </p>
      </section>

      {/* ─── Features ─── */}
      <section className="card p-6 sm:p-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          Neler Sunuyoruz?
        </h2>
        <ul className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: 10 }}>
          <li className="flex gap-2">
            <span style={{ color: '#10b981' }}>&#x2022;</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>Halka Arz Takvimi:</strong> Onaylanan, dağıtımda olan ve işleme başlayan halka arzların detaylı takibi.</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#10b981' }}>&#x2022;</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>KAP Haberleri (AI Analiz):</strong> Kamuyu Aydınlatma Platformu bildirimlerinin yapay zeka ile özetlenmesi ve pozitif/negatif sınıflandırması.</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#10b981' }}>&#x2022;</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>Tavan &amp; Taban Hisseleri:</strong> Günlük tavan ve taban yapan hisselerin anlık listesi.</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#10b981' }}>&#x2022;</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>VİOP Gece Seansı:</strong> VİOP gece seansı verilerinin canlı takibi.</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#10b981' }}>&#x2022;</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>SPK Bülten Analizleri:</strong> SPK haftalık bültenlerinin yapay zeka destekli özetleri.</span>
          </li>
          <li className="flex gap-2">
            <span style={{ color: '#10b981' }}>&#x2022;</span>
            <span><strong style={{ color: 'var(--text-primary)' }}>Piyasa Haberleri:</strong> Borsa ve finans dünyasından güncel haberler.</span>
          </li>
        </ul>
      </section>

      {/* ─── Disclaimer ─── */}
      <section
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
            yalnızca bilgilendirme amaçlıdır. Yatırım kararlarınızı almadan önce mutlaka lisanslı
            bir yatırım danışmanına başvurunuz. Geçmiş performans gelecekteki sonuçların
            garantisi değildir.
          </p>
        </div>
      </section>

      {/* ─── Contact ─── */}
      <section className="card p-6 sm:p-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          İletişim
        </h2>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          Sorularınız, önerileriniz veya geri bildirimleriniz için aşağıdaki e-posta adresi
          üzerinden bize ulaşabilirsiniz:
        </p>
        <a
          href="mailto:borsacebimde@gmail.com"
          className="inline-flex items-center gap-2 text-sm font-medium"
          style={{ color: '#2979FF' }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          borsacebimde@gmail.com
        </a>

        <div className="flex flex-wrap gap-3 pt-2">
          <a
            href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
            }}
          >
            Google Play
          </a>
          <a
            href="https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446?l=tr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
            }}
          >
            App Store
          </a>
        </div>
      </section>

      {/* ─── Legal links ─── */}
      <div className="flex flex-wrap gap-4 text-xs" style={{ color: 'var(--text-muted)' }}>
        <Link href="/gizlilik-politikasi" className="hover:text-brand transition-colors">Gizlilik Politikası</Link>
        <Link href="/cerez-politikasi" className="hover:text-brand transition-colors">Çerez Politikası</Link>
      </div>
    </div>
  );
}
