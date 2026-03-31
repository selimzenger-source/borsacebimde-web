import Link from 'next/link';

const quickLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/halka-arz', label: 'Halka Arz' },
  { href: '/kap-ai', label: 'KAP AI' },
  { href: '/haberler', label: 'Haberler' },
  { href: '/tavan-taban', label: 'Tavan Taban' },
  { href: '/viop', label: 'VIOP' },
  { href: '/spk-bulten', label: 'SPK Bülten' },
];

const legalLinks = [
  { href: '/gizlilik-politikasi', label: 'Gizlilik Politikası' },
  { href: '/kullanim-kosullari', label: 'Kullanım Koşulları' },
  { href: '/cerez-politikasi', label: 'Çerez Politikası' },
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Footer() {
  return (
    <footer className="border-t border-glass-border bg-bg-secondary mt-12">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Top grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand / About */}
          <div className="lg:col-span-2">
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-accent-green shadow-[0_0_8px_rgba(76,175,80,0.7)]" />
              <span className="text-lg font-bold text-text-primary">
                Borsa <span className="text-accent-green">Cebimde</span>
              </span>
            </div>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-sm">
              Borsa Cebimde — Türkiye'nin halka arz ve borsa haber platformu. KAP açıklamalarını yapay zeka ile analiz edin, SPK bültenlerini takip edin ve halka arz takvimini kaçırmayın.
            </p>
            {/* Contact */}
            <a
              href="mailto:info@borsacebimde.app"
              className="inline-flex items-center gap-1.5 text-sm text-text-muted hover:text-accent-green transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
              info@borsacebimde.app
            </a>

            {/* App store buttons */}
            <div className="flex flex-wrap gap-3 mt-5">
              <a
                href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
                target="_blank"
                rel="noopener noreferrer"
                className="store-btn bg-bg-surface hover:bg-bg-card"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76a1.5 1.5 0 01-.68-.17C2.19 23.37 2 23 2 22.5V1.5C2 1 2.19.63 2.5.41a1.5 1.5 0 011.54.06l18 10.5a1.5 1.5 0 010 2.56l-18 10.5a1.5 1.5 0 01-.86.23z" />
                </svg>
                <div>
                  <div className="text-[10px] text-text-muted leading-none">Google Play'den</div>
                  <div className="text-sm font-semibold text-text-primary leading-snug">İndir</div>
                </div>
              </a>
              <a
                href="https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446"
                target="_blank"
                rel="noopener noreferrer"
                className="store-btn bg-bg-surface hover:bg-bg-card"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div>
                  <div className="text-[10px] text-text-muted leading-none">App Store'dan</div>
                  <div className="text-sm font-semibold text-text-primary leading-snug">İndir</div>
                </div>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-4">Hızlı Erişim</h3>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-accent-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-text-primary font-semibold text-sm mb-4">Yasal</h3>
            <ul className="flex flex-col gap-2.5">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-text-secondary text-sm hover:text-accent-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-4 mb-8 border-yellow-900/30 bg-yellow-950/10">
          <div className="flex gap-3 items-start">
            <svg className="w-4 h-4 text-accent-gold mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 1.999-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
            <p className="text-text-muted text-xs leading-relaxed">
              <span className="text-text-secondary font-medium">Yasal Uyarı: </span>
              Bu site yatırım tavsiyesi içermez. Tüm veriler yalnızca bilgilendirme amaçlıdır. Yatırım kararlarınızı almadan önce lisanslı bir yatırım danışmanına başvurmanız önerilir. Geçmiş performans gelecekteki sonuçların garantisi değildir.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-glass-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-text-muted text-xs">
          <p>© 2026 Borsa Cebimde. Tüm hakları saklıdır.</p>
          <p>
            BIST verileri bilgilendirme amaçlıdır. Borsa İstanbul verisi değildir.
          </p>
        </div>
      </div>
    </footer>
  );
}
