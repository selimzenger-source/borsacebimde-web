import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/halka-arz', label: 'Halka Arz' },
  { href: '/kap-ai', label: 'KAP Pozitif Haber' },
  { href: '/kap-tum-haberler', label: 'Tüm KAP Haber' },
  { href: '/piyasa-haberleri', label: 'Piyasa Haberleri' },
  { href: '/tavan-taban', label: 'Tavan Taban' },
  { href: '/viop', label: 'VİOP' },
  { href: '/spk-bulten', label: 'SPK Bülten' },
];

export default function Footer() {
  return (
    <footer
      className="border-t mt-12 transition-colors duration-200"
      style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-primary)' }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 rounded-md bg-brand flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.2} className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22" />
                </svg>
              </div>
              <span className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                Borsa Cebimde
              </span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'var(--text-muted)' }}>
              Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban hisseleri ve piyasa verileri.
            </p>
            {/* Store buttons */}
            <div className="flex flex-wrap gap-2">
              <a
                href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
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
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  border: '1px solid var(--border-primary)',
                  color: 'var(--text-secondary)',
                }}
              >
                App Store
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Sayfalar
            </h3>
            <ul className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-xs transition-colors hover:text-brand"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-xs font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
              Yasal
            </h3>
            <ul className="flex flex-col gap-2 mb-3">
              <li>
                <Link
                  href="/sss"
                  className="text-xs transition-colors hover:text-brand"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Sıkça Sorulan Sorular
                </Link>
              </li>
              <li>
                <Link
                  href="/hakkimizda"
                  className="text-xs transition-colors hover:text-brand"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link
                  href="/kullanim-kosullari"
                  className="text-xs transition-colors hover:text-brand"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link
                  href="/gizlilik-politikasi"
                  className="text-xs transition-colors hover:text-brand"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link
                  href="/cerez-politikasi"
                  className="text-xs transition-colors hover:text-brand"
                  style={{ color: 'var(--text-muted)' }}
                >
                  Çerez Politikası
                </Link>
              </li>
            </ul>
            <a
              href="mailto:borsacebimde@gmail.com"
              className="text-xs transition-colors hover:text-brand flex items-center gap-1 mb-3"
              style={{ color: 'var(--text-muted)' }}
            >
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              borsacebimde@gmail.com
            </a>
            <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Bu site yatırım tavsiyesi içermez. Tüm veriler yalnızca bilgilendirme amaçlıdır.
              Yatırım kararlarınızı almadan önce lisanslı bir yatırım danışmanına başvurmanız önerilir.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="border-t pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px]"
          style={{ borderColor: 'var(--border-primary)', color: 'var(--text-muted)' }}
        >
          <p>2026 Borsa Cebimde. Tüm hakları saklıdır.</p>
          <p>BIST verileri bilgilendirme amaçlıdır.</p>
        </div>
      </div>
    </footer>
  );
}
