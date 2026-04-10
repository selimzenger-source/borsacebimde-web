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

export default function SSSContent() {
  return (
    <>
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
    </>
  );
}
