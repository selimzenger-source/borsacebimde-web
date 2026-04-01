import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Borsa Cebimde - Uygulamayi Indir',
  description:
    'Borsa Cebimde uygulamasini Android ve iOS icin ucretsiz indirin. Halka arz takibi, AI destekli KAP haberleri, tavan taban bildirimleri ve daha fazlasi.',
  alternates: {
    canonical: 'https://borsacebimde.app/indir',
  },
  openGraph: {
    title: 'Borsa Cebimde - Uygulamayi Indir',
    description:
      'Halka arz, KAP haberleri, AI analiz ve borsa takibi. Simdi ucretsiz indir!',
    url: 'https://borsacebimde.app/indir',
    images: [{ url: '/images/icon-512.png', width: 512, height: 512, alt: 'Borsa Cebimde' }],
  },
};

export default function IndirLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
