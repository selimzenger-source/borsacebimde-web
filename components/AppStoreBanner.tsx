'use client';

import Image from 'next/image';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bistfinans.app';
const APP_STORE_URL = 'https://apps.apple.com/us/app/borsa-cebimde-haber-arz/id6760570446';

export default function AppStoreBanner() {
  return (
    <div
      className="card my-8 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(41,121,255,0.12) 0%, rgba(41,121,255,0.03) 50%, rgba(124,77,255,0.06) 100%)',
        borderColor: 'rgba(41,121,255,0.2)',
      }}
    >
      <div className="flex flex-col sm:flex-row items-center gap-5 p-6 sm:p-8">
        {/* App icon */}
        <div
          className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden relative"
          style={{
            boxShadow: '0 8px 32px rgba(41,121,255,0.3)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Borsa Cebimde"
            fill
            className="object-contain p-1"
          />
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Daha fazlası için uygulamayı indirin
          </h3>
          <p className="text-sm mb-5 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            Anlık bildirimler, VIP içerikler ve hisse takibi - hepsi cebinizde.
          </p>

          {/* Store buttons */}
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:shadow-lg active:scale-95"
              style={{ background: '#2979FF' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.807 1.626a1 1 0 010 1.732l-2.807 1.626L15.206 12l2.492-2.492zM5.864 2.658L16.8 8.99l-2.302 2.302-8.635-8.635z" />
              </svg>
              Google Play
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-95"
              style={{
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-secondary)',
                color: 'var(--text-primary)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              App Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
