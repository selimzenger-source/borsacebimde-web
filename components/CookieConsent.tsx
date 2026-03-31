'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      // Small delay so it doesn't flash on load
      const timer = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  function accept() {
    localStorage.setItem('cookie_consent', 'accepted');
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        padding: '0 16px 16px',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          maxWidth: 520,
          margin: '0 auto',
          padding: '16px 20px',
          borderRadius: 16,
          background: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
          <div
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              borderRadius: 8,
              background: 'rgba(255,152,0,0.12)',
              border: '1px solid rgba(255,152,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#FF9800" strokeWidth={2}>
              <circle cx="12" cy="12" r="10" />
              <circle cx="8" cy="10" r="1.5" fill="#FF9800" stroke="none" />
              <circle cx="14" cy="8" r="1" fill="#FF9800" stroke="none" />
              <circle cx="16" cy="14" r="1.5" fill="#FF9800" stroke="none" />
              <circle cx="10" cy="15" r="1" fill="#FF9800" stroke="none" />
            </svg>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Bu web sitesi, deneyiminizi iyileştirmek ve reklam hizmetleri sunmak için çerezler kullanır.
              Siteyi kullanmaya devam ederek{' '}
              <Link
                href="/cerez-politikasi"
                style={{ color: '#2979FF', textDecoration: 'underline' }}
              >
                Çerez Politikamızı
              </Link>{' '}
              ve{' '}
              <Link
                href="/gizlilik-politikasi"
                style={{ color: '#2979FF', textDecoration: 'underline' }}
              >
                Gizlilik Politikamızı
              </Link>{' '}
              kabul etmiş olursunuz.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <button
            onClick={accept}
            style={{
              padding: '8px 20px',
              borderRadius: 10,
              background: '#2979FF',
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
              border: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Kabul Et
          </button>
        </div>
      </div>
    </div>
  );
}
