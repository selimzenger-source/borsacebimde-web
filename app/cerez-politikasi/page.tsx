import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Çerez Politikası - Borsa Cebimde',
  description: 'Borsa Cebimde çerez (cookie) politikası hakkında bilgi.',
};

export default function CerezPolitikasiPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <header
        className="card relative overflow-hidden p-6 sm:p-8 mb-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(41,121,255,0.2)',
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Çerez Politikası
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Son güncelleme: 31 Mart 2026
        </p>
      </header>

      <article className="card p-6 sm:p-8 space-y-8" style={{ lineHeight: 1.8 }}>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Çerez Nedir?</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Çerezler (cookies), web sitelerinin tarayıcınıza gönderdiği küçük metin dosyalarıdır.
            Bu dosyalar tarayıcınızda saklanır ve web sitesinin sizi tanımasına, tercihlerinizi
            hatırlamasına ve size daha iyi bir deneyim sunmasına yardımcı olur.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Kullanılan Çerez Türleri</h2>

          <div className="space-y-4">
            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: '#4CAF50' }}>Zorunlu Çerezler</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Web sitesinin düzgün çalışması için gerekli olan çerezlerdir. Tema tercihi (açık/koyu mod)
                ve çerez onay durumu gibi temel işlevleri kapsar. Bu çerezler devre dışı bırakılamaz.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li><code>theme</code> &mdash; Tema tercihi (localStorage)</li>
                <li><code>cookie_consent</code> &mdash; Çerez onay durumu (localStorage)</li>
              </ul>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: '#2979FF' }}>Analitik Çerezler</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Ziyaretçi sayısı, sayfa görüntüleme, oturum süresi gibi istatistiksel verileri toplamak için
                kullanılır. Bu veriler anonim olarak işlenir ve siteyi iyileştirmek amacıyla kullanılır.
              </p>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: '#FF9800' }}>Reklam Çerezleri</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Google AdSense tarafından kullanılan çerezlerdir. Ziyaretçilere ilgi alanlarına uygun
                reklamlar göstermek, reklam performansını ölçmek ve reklam tekrarını sınırlamak
                amacıyla kullanılır.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li>Google AdSense çerezleri</li>
                <li>DoubleClick çerezleri</li>
              </ul>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                Detaylı bilgi:{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2979FF', textDecoration: 'underline' }}
                >
                  Google Reklam Politikası
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Üçüncü Taraf Çerezleri</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Web sitemizde aşağıdaki üçüncü taraf hizmetleri çerez kullanmaktadır:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Google AdSense:</strong> Kişiselleştirilmiş reklam sunumu için
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Cloudflare:</strong> Güvenlik ve performans optimizasyonu için
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Çerezleri Yönetme</h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Tarayıcı ayarlarınızdan çerezleri yönetebilir, silebilir veya engeller devre dışı
            bırakabilirsiniz. Ancak çerezleri devre dışı bırakmak, web sitesinin bazı özelliklerinin
            düzgün çalışmamasına neden olabilir.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Google&apos;ın kişiselleştirilmiş reklam çerezlerini devre dışı bırakmak için:{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2979FF', textDecoration: 'underline' }}
            >
              Google Reklam Ayarları
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Değişiklikler</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu çerez politikası zaman zaman güncellenebilir. Güncel versiyonu her zaman bu sayfada
            yayınlanır.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. İletişim</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Çerez politikamız hakkında sorularınız için:{' '}
            <strong style={{ color: 'var(--text-primary)' }}>borsacebimde@gmail.com</strong>
          </p>
        </section>

      </article>
    </div>
  );
}
