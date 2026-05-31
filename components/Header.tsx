'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { getStoreInfo } from '@/lib/platform';

// 5 ana link + 2 dropdown grup (Haberler, Araclar)
const navLinks: { href: string; label: string }[] = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/halka-arz', label: 'Halka Arz' },
  { href: '/bilanco', label: 'Bilanço' },
  { href: '/temettu', label: 'Temettü' },
];

const haberlerLinks = [
  { href: '/kap-ai', label: 'KAP Pozitif Haberler' },
  { href: '/kap-tum-haberler', label: 'Tüm KAP Bildirimleri' },
  { href: '/piyasa-haberleri', label: 'Piyasa Haberleri' },
];

const araclarLinks = [
  { href: '/tavan-taban', label: 'Tavan & Taban' },
  { href: '/viop', label: 'VİOP Gece Seansı' },
  { href: '/spk-bulten', label: 'SPK Bülten' },
  { href: '/kurum-onerileri', label: 'Kurum Önerileri' },
  { href: '/blog', label: 'Rehber & Blog' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [haberlerOpen, setHaberlerOpen] = useState(false);
  const [araclarOpen, setAraclarOpen] = useState(false);

  // Dropdown hover — kapanışta küçük gecikme (trigger→menü geçişinde kaybolmasın)
  const haberlerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const araclarTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openHaberler = () => { if (haberlerTimer.current) clearTimeout(haberlerTimer.current); setHaberlerOpen(true); };
  const closeHaberler = () => { if (haberlerTimer.current) clearTimeout(haberlerTimer.current); haberlerTimer.current = setTimeout(() => setHaberlerOpen(false), 200); };
  const openAraclar = () => { if (araclarTimer.current) clearTimeout(araclarTimer.current); setAraclarOpen(true); };
  const closeAraclar = () => { if (araclarTimer.current) clearTimeout(araclarTimer.current); araclarTimer.current = setTimeout(() => setAraclarOpen(false), 200); };
  const [store, setStore] = useState(getStoreInfo());
  useEffect(() => { setStore(getStoreInfo()); }, []);

  // Mobile sub-menu state
  const [mobileHaberlerOpen, setMobileHaberlerOpen] = useState(false);
  const [mobileAraclarOpen, setMobileAraclarOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };
  const isAnyActive = (links: { href: string }[]) => links.some((l) => isActive(l.href));

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-200"
      style={{
        backgroundColor: theme === 'dark' ? 'rgba(11,17,32,0.92)' : 'rgba(255,255,255,0.92)',
        borderColor: 'var(--border-primary)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
            <div className="relative w-8 h-8 rounded-xl overflow-hidden shadow-md group-hover:shadow-lg transition-shadow">
              <Image
                src="/images/icon-192.png"
                alt="Borsa Cebimde"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[15px] font-extrabold leading-tight" style={{ color: 'var(--text-primary)' }}>
                Borsa <span style={{ color: '#2979FF' }}>Cebimde</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav — sadelestirildi: 4 ana link + 2 dropdown grup */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 whitespace-nowrap"
                style={{
                  color: isActive(link.href) ? '#2979FF' : 'var(--text-secondary)',
                  backgroundColor: isActive(link.href)
                    ? (theme === 'dark' ? 'rgba(41,121,255,0.1)' : 'rgba(41,121,255,0.08)')
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Haberler dropdown */}
            <div
              className="relative"
              onMouseEnter={openHaberler}
              onMouseLeave={closeHaberler}
            >
              <button
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 whitespace-nowrap flex items-center gap-1"
                style={{
                  color: isAnyActive(haberlerLinks) ? '#2979FF' : 'var(--text-secondary)',
                  backgroundColor: isAnyActive(haberlerLinks)
                    ? (theme === 'dark' ? 'rgba(41,121,255,0.1)' : 'rgba(41,121,255,0.08)')
                    : 'transparent',
                }}
              >
                Haberler
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {haberlerOpen && (
                <div className="absolute left-0 top-full pt-2 min-w-[220px] z-50">
                  <div
                    className="rounded-lg shadow-xl border py-1.5"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(11,17,32,0.97)' : 'rgba(255,255,255,0.97)',
                      borderColor: 'var(--border-primary)',
                    }}
                  >
                    {haberlerLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2 text-[13px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        style={{ color: isActive(l.href) ? '#2979FF' : 'var(--text-secondary)' }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Araclar dropdown */}
            <div
              className="relative"
              onMouseEnter={openAraclar}
              onMouseLeave={closeAraclar}
            >
              <button
                className="px-3 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-150 whitespace-nowrap flex items-center gap-1"
                style={{
                  color: isAnyActive(araclarLinks) ? '#2979FF' : 'var(--text-secondary)',
                  backgroundColor: isAnyActive(araclarLinks)
                    ? (theme === 'dark' ? 'rgba(41,121,255,0.1)' : 'rgba(41,121,255,0.08)')
                    : 'transparent',
                }}
              >
                Araçlar
                <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {araclarOpen && (
                <div className="absolute right-0 top-full pt-2 min-w-[220px] z-50">
                  <div
                    className="rounded-lg shadow-xl border py-1.5"
                    style={{
                      backgroundColor: theme === 'dark' ? 'rgba(11,17,32,0.97)' : 'rgba(255,255,255,0.97)',
                      borderColor: 'var(--border-primary)',
                    }}
                  >
                    {araclarLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className="block px-4 py-2 text-[13px] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                        style={{ color: isActive(l.href) ? '#2979FF' : 'var(--text-secondary)' }}
                      >
                        {l.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg transition-colors duration-150"
              style={{
                color: 'var(--text-muted)',
                backgroundColor: theme === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.04)',
              }}
              aria-label="Tema değiştir"
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              )}
            </button>

            {/* Download CTA */}
            <a
              href={store.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-brand text-white text-[13px] font-semibold transition-all hover:bg-brand-light"
            >
              Uygulamayı İndir
            </a>

            {/* Hamburger */}
            <button
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: 'var(--text-secondary)' }}
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menü"
            >
              {menuOpen ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="lg:hidden border-t backdrop-blur-xl"
          style={{
            backgroundColor: theme === 'dark' ? 'rgba(11,17,32,0.97)' : 'rgba(255,255,255,0.97)',
            borderColor: 'var(--border-primary)',
          }}
        >
          <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-col gap-1">
            {/* Ana linkler */}
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
                style={{
                  color: isActive(link.href) ? '#2979FF' : 'var(--text-secondary)',
                  backgroundColor: isActive(link.href)
                    ? (theme === 'dark' ? 'rgba(41,121,255,0.1)' : 'rgba(41,121,255,0.06)')
                    : 'transparent',
                }}
              >
                {link.label}
              </Link>
            ))}

            {/* Haberler accordion */}
            <button
              onClick={() => setMobileHaberlerOpen(v => !v)}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium"
              style={{ color: isAnyActive(haberlerLinks) ? '#2979FF' : 'var(--text-secondary)' }}
            >
              Haberler
              <svg className={`w-4 h-4 transition-transform ${mobileHaberlerOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileHaberlerOpen && haberlerLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="pl-8 pr-4 py-2 rounded-lg text-sm"
                style={{ color: isActive(l.href) ? '#2979FF' : 'var(--text-muted)' }}
              >
                {l.label}
              </Link>
            ))}

            {/* Araclar accordion */}
            <button
              onClick={() => setMobileAraclarOpen(v => !v)}
              className="flex items-center justify-between px-4 py-2.5 rounded-lg text-sm font-medium"
              style={{ color: isAnyActive(araclarLinks) ? '#2979FF' : 'var(--text-secondary)' }}
            >
              Araçlar
              <svg className={`w-4 h-4 transition-transform ${mobileAraclarOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {mobileAraclarOpen && araclarLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="pl-8 pr-4 py-2 rounded-lg text-sm"
                style={{ color: isActive(l.href) ? '#2979FF' : 'var(--text-muted)' }}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-2 mt-1" style={{ borderTop: '1px solid var(--border-primary)' }}>
              <a
                href={store.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-white text-sm font-semibold"
              >
                Uygulamayı İndir
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
