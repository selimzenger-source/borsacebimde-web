'use client';

const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bistfinans.app';
const APP_STORE_URL = 'https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446';

const features = [
  {
    label: 'Anlık Bildirimler',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
      </svg>
    ),
  },
  {
    label: 'VIP İçerikler',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    label: 'Hisse Takibi',
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
  },
];

export default function AppStoreBanner() {
  return (
    <div className="relative overflow-hidden rounded-2xl my-8">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, #1a4731 0%, #0A2E1F 40%, #071A14 100%)',
        }}
      />
      {/* Decorative blobs */}
      <div
        className="absolute -top-12 -right-12 w-48 h-48 rounded-full opacity-20"
        style={{ background: 'radial-gradient(circle, #4CAF50 0%, transparent 70%)' }}
      />
      <div
        className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #26C6DA 0%, transparent 70%)' }}
      />

      {/* Content */}
      <div className="relative px-6 py-8 sm:px-8 sm:py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          {/* Text block */}
          <div className="flex-1 min-w-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 mb-3 px-2.5 py-1 rounded-full bg-accent-green/15 border border-accent-green/25">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-green pulse-dot" />
              <span className="text-accent-green text-xs font-semibold">Ücretsiz İndir</span>
            </div>

            <h2 className="text-text-primary text-xl sm:text-2xl font-bold mb-2 leading-snug">
              Daha fazlası için uygulamayı indirin!
            </h2>
            <p className="text-text-secondary text-sm leading-relaxed mb-4 max-w-md">
              Halka arz bildirimleri, KAP açıklamaları ve borsa haberleri — hepsi cebinizde. Anlık bildirim alın, VIP içeriklere erişin.
            </p>

            {/* Feature chips */}
            <div className="flex flex-wrap gap-2 mb-6">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-text-secondary text-xs font-medium"
                >
                  <span className="text-accent-green">{f.icon}</span>
                  {f.label}
                </div>
              ))}
            </div>

            {/* Store buttons */}
            <div className="flex flex-wrap gap-3">
              {/* Google Play */}
              <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-accent-green text-white font-semibold text-sm transition-all hover:bg-green-500 hover:shadow-[0_0_20px_rgba(76,175,80,0.4)] active:scale-95"
              >
                {/* Google Play icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.18 23.76a1.5 1.5 0 01-.68-.17C2.19 23.37 2 23 2 22.5V1.5C2 1 2.19.63 2.5.41a1.5 1.5 0 011.54.06l18 10.5a1.5 1.5 0 010 2.56l-18 10.5a1.5 1.5 0 01-.86.23z" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-normal opacity-85">Google Play'den</span>
                  <span>İndir</span>
                </div>
              </a>

              {/* App Store */}
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-white/10 border border-white/15 text-text-primary font-semibold text-sm transition-all hover:bg-white/15 hover:border-white/25 active:scale-95"
              >
                {/* Apple icon */}
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.42c1.32.07 2.24.73 3.01.77.97-.19 1.9-.81 3.01-.88 1.29-.09 2.61.43 3.57 1.56-3.1 1.86-2.58 5.96.41 7.65-.57 1.56-1.31 3.06-3 3.76zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
                <div className="flex flex-col leading-tight">
                  <span className="text-[10px] font-normal opacity-75">App Store'dan</span>
                  <span>İndir</span>
                </div>
              </a>
            </div>
          </div>

          {/* Decorative phone mockup (minimal, SVG-based) */}
          <div className="hidden sm:flex shrink-0 w-24 items-center justify-center opacity-60">
            <svg viewBox="0 0 80 140" fill="none" className="w-20 h-auto">
              <rect x="4" y="2" width="72" height="136" rx="12" fill="rgba(76,175,80,0.1)" stroke="rgba(76,175,80,0.4)" strokeWidth="2" />
              <rect x="14" y="14" width="52" height="100" rx="6" fill="rgba(76,175,80,0.05)" />
              <rect x="28" y="126" width="24" height="4" rx="2" fill="rgba(76,175,80,0.4)" />
              {/* Screen lines */}
              <rect x="20" y="24" width="40" height="4" rx="2" fill="rgba(255,255,255,0.1)" />
              <rect x="20" y="34" width="30" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
              <rect x="20" y="44" width="40" height="3" rx="1.5" fill="rgba(76,175,80,0.2)" />
              <rect x="20" y="54" width="35" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
              <rect x="20" y="64" width="40" height="3" rx="1.5" fill="rgba(255,215,0,0.15)" />
              <rect x="20" y="74" width="28" height="3" rx="1.5" fill="rgba(255,255,255,0.07)" />
              <rect x="20" y="84" width="40" height="16" rx="4" fill="rgba(76,175,80,0.08)" stroke="rgba(76,175,80,0.2)" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
