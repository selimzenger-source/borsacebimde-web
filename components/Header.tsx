'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/halka-arz', label: 'Halka Arz' },
  { href: '/kap-ai', label: 'KAP AI' },
  { href: '/haberler', label: 'Haberler' },
  { href: '/tavan-taban', label: 'Tavan Taban' },
  { href: '/viop', label: 'VIOP' },
  { href: '/spk-bulten', label: 'SPK Bülten' },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/90 backdrop-blur-md border-b border-glass-border">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-accent-green shadow-[0_0_8px_rgba(76,175,80,0.8)]" />
            <span className="text-lg font-bold text-text-primary tracking-tight">
              Borsa <span className="text-accent-green">Cebimde</span>
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={[
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-150',
                  isActive(link.href)
                    ? 'bg-accent-green/15 text-accent-green'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Download button */}
            <a
              href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-accent-green text-white text-sm font-semibold transition-all duration-150 hover:bg-green-500 hover:shadow-[0_0_16px_rgba(76,175,80,0.4)]"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              Uygulamayı İndir
            </a>

            {/* Hamburger menu */}
            <button
              className="lg:hidden p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-white/5 transition-all"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menüyü aç/kapat"
              aria-expanded={menuOpen}
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
        <div className="lg:hidden border-t border-glass-border bg-bg-primary/95 backdrop-blur-md">
          <nav className="max-w-screen-xl mx-auto px-4 py-3 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={[
                  'px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-150',
                  isActive(link.href)
                    ? 'bg-accent-green/15 text-accent-green'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5',
                ].join(' ')}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 pb-1 border-t border-glass-border mt-1">
              <a
                href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-green text-white text-sm font-semibold"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                Uygulamayı İndir
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
