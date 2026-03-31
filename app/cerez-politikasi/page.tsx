import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '\u00c7erez Politikas\u0131 - Borsa Cebimde',
  description: 'Borsa Cebimde \u00e7erez (cookie) politikas\u0131 hakk\u0131nda bilgi.',
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
          \u00c7erez Politikas\u0131
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Son g\u00fcncelleme: 31 Mart 2026
        </p>
      </header>

      <article className="card p-6 sm:p-8 space-y-8" style={{ lineHeight: 1.8 }}>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. \u00c7erez Nedir?</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            \u00c7erezler (cookies), web sitelerinin taray\u0131c\u0131n\u0131za g\u00f6nderdi\u011fi k\u00fc\u00e7\u00fck metin dosyalar\u0131d\u0131r.
            Bu dosyalar taray\u0131c\u0131n\u0131zda saklan\u0131r ve web sitesinin sizi tan\u0131mas\u0131na, tercihlerinizi
            hat\u0131rlamas\u0131na ve size daha iyi bir deneyim sunmas\u0131na yard\u0131mc\u0131 olur.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Kullan\u0131lan \u00c7erez T\u00fcrleri</h2>

          <div className="space-y-4">
            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: '#4CAF50' }}>Zorunlu \u00c7erezler</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Web sitesinin d\u00fczg\u00fcn \u00e7al\u0131\u015fmas\u0131 i\u00e7in gerekli olan \u00e7erezlerdir. Tema tercihi (a\u00e7\u0131k/koyu mod)
                ve \u00e7erez onay durumu gibi temel i\u015flevleri kapsar. Bu \u00e7erezler devre d\u0131\u015f\u0131 b\u0131rak\u0131lamaz.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li><code>theme</code> &mdash; Tema tercihi (localStorage)</li>
                <li><code>cookie_consent</code> &mdash; \u00c7erez onay durumu (localStorage)</li>
              </ul>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: '#2979FF' }}>Analitik \u00c7erezler</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Ziyaret\u00e7i say\u0131s\u0131, sayfa g\u00f6r\u00fcnt\u00fcleme, oturum s\u00fcresi gibi istatistiksel verileri toplamak i\u00e7in
                kullan\u0131l\u0131r. Bu veriler anonim olarak i\u015flenir ve siteyi iyile\u015ftirmek amac\u0131yla kullan\u0131l\u0131r.
              </p>
            </div>

            <div
              className="p-4 rounded-xl"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-primary)' }}
            >
              <h3 className="text-sm font-bold mb-2" style={{ color: '#FF9800' }}>Reklam \u00c7erezleri</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Google AdSense taraf\u0131ndan kullan\u0131lan \u00e7erezlerdir. Ziyaret\u00e7ilere ilgi alanlar\u0131na uygun
                reklamlar g\u00f6stermek, reklam performans\u0131n\u0131 \u00f6l\u00e7mek ve reklam tekrar\u0131n\u0131 s\u0131n\u0131rlamak
                amac\u0131yla kullan\u0131l\u0131r.
              </p>
              <ul className="list-disc pl-5 mt-2 text-sm space-y-1" style={{ color: 'var(--text-muted)' }}>
                <li>Google AdSense \u00e7erezleri</li>
                <li>DoubleClick \u00e7erezleri</li>
              </ul>
              <p className="text-sm mt-2" style={{ color: 'var(--text-muted)' }}>
                Detayl\u0131 bilgi:{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#2979FF', textDecoration: 'underline' }}
                >
                  Google Reklam Politikas\u0131
                </a>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. \u00dc\u00e7\u00fcnc\u00fc Taraf \u00c7erezleri</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Web sitemizde a\u015fa\u011f\u0131daki \u00fc\u00e7\u00fcnc\u00fc taraf hizmetleri \u00e7erez kullanmaktad\u0131r:
          </p>
          <ul className="list-disc pl-6 mt-2 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Google AdSense:</strong> Ki\u015fiselle\u015ftirilmi\u015f reklam sunumu i\u00e7in
            </li>
            <li>
              <strong style={{ color: 'var(--text-primary)' }}>Cloudflare:</strong> G\u00fcvenlik ve performans optimizasyonu i\u00e7in
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. \u00c7erezleri Y\u00f6netme</h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Taray\u0131c\u0131 ayarlar\u0131n\u0131zdan \u00e7erezleri y\u00f6netebilir, silebilir veya engeller devre d\u0131\u015f\u0131
            b\u0131rakabilirsiniz. Ancak \u00e7erezleri devre d\u0131\u015f\u0131 b\u0131rakmak, web sitesinin baz\u0131 \u00f6zelliklerinin
            d\u00fczg\u00fcn \u00e7al\u0131\u015fmamas\u0131na neden olabilir.
          </p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Google&apos;\u0131n ki\u015fiselle\u015ftirilmi\u015f reklam \u00e7erezlerini devre d\u0131\u015f\u0131 b\u0131rakmak i\u00e7in:{' '}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#2979FF', textDecoration: 'underline' }}
            >
              Google Reklam Ayarlar\u0131
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. De\u011fi\u015fiklikler</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu \u00e7erez politikas\u0131 zaman zaman g\u00fcncellenebilir. G\u00fcncel versiyonu her zaman bu sayfada
            yay\u0131nlan\u0131r.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. \u0130leti\u015fim</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            \u00c7erez politikam\u0131z hakk\u0131nda sorular\u0131n\u0131z i\u00e7in:{' '}
            <strong style={{ color: 'var(--text-primary)' }}>borsacebimde@gmail.com</strong>
          </p>
        </section>

      </article>
    </div>
  );
}
