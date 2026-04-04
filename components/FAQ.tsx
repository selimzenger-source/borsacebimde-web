'use client';

import { useState } from 'react';
import Script from 'next/script';

export interface FAQItem {
  question: string;
  answer: string;
}

function FAQAccordion({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div
      className="overflow-hidden transition-all duration-200"
      style={{
        borderRadius: 14,
        border: `1px solid ${isOpen ? 'rgba(41,121,255,0.3)' : 'var(--border-primary)'}`,
        background: isOpen ? 'linear-gradient(135deg, rgba(41,121,255,0.06), var(--bg-card))' : 'var(--bg-card)',
      }}
    >
      <button
        onClick={onToggle}
        className="w-full text-left flex items-center gap-3 p-4 sm:p-5 transition-colors duration-150"
        style={{ cursor: 'pointer', background: 'transparent', border: 'none' }}
      >
        {/* Question icon */}
        <span
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
          style={{
            background: isOpen ? 'rgba(41,121,255,0.15)' : 'var(--bg-surface)',
            color: isOpen ? '#2979FF' : 'var(--text-muted)',
            border: `1px solid ${isOpen ? 'rgba(41,121,255,0.3)' : 'var(--border-primary)'}`,
          }}
        >
          S
        </span>

        {/* Question text */}
        <span
          className="flex-1 text-sm sm:text-[15px] font-semibold leading-snug"
          style={{ color: isOpen ? '#2979FF' : 'var(--text-primary)' }}
        >
          {item.question}
        </span>

        {/* Arrow */}
        <svg
          className="shrink-0 w-4 h-4 transition-transform duration-200"
          style={{
            color: isOpen ? '#2979FF' : 'var(--text-muted)',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
          }}
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6l4 4 4-4" />
        </svg>
      </button>

      {/* Answer */}
      <div
        className="transition-all duration-200 overflow-hidden"
        style={{
          maxHeight: isOpen ? 500 : 0,
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div
          className="px-4 sm:px-5 pb-4 sm:pb-5 text-sm leading-relaxed"
          style={{
            color: 'var(--text-secondary)',
            paddingLeft: 'calc(1rem + 28px + 12px)',
          }}
        >
          {item.answer}
        </div>
      </div>
    </div>
  );
}

export default function FAQ({ items, title, description }: { items: FAQItem[]; title?: string; description?: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // FAQPage JSON-LD
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <section className="mt-10 mb-6">
      {/* JSON-LD */}
      <Script
        id={`faq-jsonld-${title?.slice(0, 10) || 'main'}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(41,121,255,0.15), rgba(124,77,255,0.10))',
            border: '1px solid rgba(41,121,255,0.25)',
          }}
        >
          <svg className="w-4.5 h-4.5" style={{ color: '#2979FF' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
            {title || 'Sıkça Sorulan Sorular'}
          </h2>
          {description && (
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{description}</p>
          )}
        </div>
      </div>

      {/* Accordion list */}
      <div className="flex flex-col gap-2.5">
        {items.map((item, idx) => (
          <FAQAccordion
            key={idx}
            item={item}
            isOpen={openIndex === idx}
            onToggle={() => setOpenIndex(openIndex === idx ? null : idx)}
          />
        ))}
      </div>
    </section>
  );
}
