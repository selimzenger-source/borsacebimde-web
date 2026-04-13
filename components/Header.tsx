'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';
import { getStoreInfo } from '@/lib/platform';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/halka-arz', label: 'Halka Arz' },
  { href: '/kap-ai', label: 'KAP Pozitif' },
  { href: '/kap-tum-haberler', label: 'Tüm KAP' },
  { href: '/piyasa-haberleri', label: 'Haberler' },
  { href: '/tavan-taban', label: 'Tavan Taban' },
  { href: '/viop', label: 'VİOP' },
  { href: '/spk-bulten', label: 'SPK Bülten' },
  { href: '/kurum-onerileri', label: 'Kurum Önerileri' },
  { href: '/blog', label: 'Rehber' },
];

export default function Header() {
  const pathname = usePathname();
  const { theme, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [store, setStore] = useState(getStoreInfo());
  useEffect(() => { setStore(getStoreInfo()); }, []);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

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

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-all duration-150 whitespace-nowrap"
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
