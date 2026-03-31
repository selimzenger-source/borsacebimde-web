'use client';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bistfinans.app';
const APP_STORE_URL = 'https://apps.apple.com/us/app/borsa-cebimde-haber-arz/id6760570446';

export default function AppStoreBanner() {
  return (
    <div
      className="card p-6 sm:p-8 my-8"
      style={{ background: 'linear-gradient(135deg, rgba(41,121,255,0.08), rgba(41,121,255,0.02))' }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-bold mb-1" style={{ color: 'var(--text-primary)' }}>
            Daha fazlasi icin uygulamayi indirin
          </h3>
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Anlik bildirimler, VIP icerikler ve hisse takibi - hepsi cebinizde.
          </p>
          <div className="flex flex-wrap gap-2">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-brand text-white text-sm font-semibold transition-all hover:bg-brand-light"
            >
              Google Play
            </a>
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-primary)',
                color: 'var(--text-primary)',
              }}
            >
              App Store
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
