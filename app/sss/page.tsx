'use client';

import Link from 'next/link';
import FAQ from '@/components/FAQ';
import AppStoreBanner from '@/components/AppStoreBanner';
import { halkaArzFAQ, kapFAQ, tavanTabanFAQ, viopFAQ, spkBultenFAQ, genelFAQ } from '@/lib/faq-data';

const sections = [
  { id: 'genel', title: 'Borsa Cebimde Hakkında', items: genelFAQ, link: '/', linkLabel: 'Ana Sayfa' },
  { id: 'halka-arz', title: 'Halka Arz', items: halkaArzFAQ, link: '/halka-arz', linkLabel: 'Halka Arz Takvimi' },
  { id: 'kap', title: 'KAP Haberleri', items: kapFAQ, link: '/kap-ai', linkLabel: 'KAP Pozitif Haberler' },
  { id: 'tavan-taban', title: 'Tavan & Taban', items: tavanTabanFAQ, link: '/tavan-taban', linkLabel: 'Tavan Taban Hisseleri' },
  { id: 'viop', title: 'VİOP', items: viopFAQ, link: '/viop', linkLabel: 'VİOP Gece Seansı' },
  { id: 'spk', title: 'SPK Bülten', items: spkBultenFAQ, link: '/spk-bulten', linkLabel: 'SPK Bülten Analizleri' },
];

export default function SSSPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{ background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))', borderColor: 'rgba(41,121,255,0.2)' }}
      >
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(41,121,255,0.1) 0%, transparent 70%)' }} />
        <div className="relative">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full" style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)' }}>
            <svg className="w-3.5 h-3.5" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>SSS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>Sıkça Sorulan Sorular</h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Borsa, halka arz, KAP haberleri ve daha fazlası hakkında merak edilenler</p>
        </div>
      </header>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-[1.02]"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-secondary)',
            }}
          >
            {s.title}
          </a>
        ))}
      </div>

      {/* FAQ Sections */}
      {sections.map((s) => (
        <div key={s.id} id={s.id}>
          <FAQ items={s.items} title={s.title} description={`${s.title} hakkında sıkça sorulan sorular`} />
          <div className="flex justify-end mt-2">
            <Link
              href={s.link}
              className="text-xs font-semibold transition-colors hover:underline"
              style={{ color: '#2979FF' }}
            >
              {s.linkLabel} sayfasına git →
            </Link>
          </div>
        </div>
      ))}

      <AppStoreBanner message="Tüm soruların cevabı cebinizde! Ücretsiz indirin." />
    </div>
  );
}
