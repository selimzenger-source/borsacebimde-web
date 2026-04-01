import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SPK Bulten Analizleri - Sermaye Piyasasi Kurulu Kararlari',
  description:
    'SPK bulten analizleri, Sermaye Piyasasi Kurulu kararlari ve duzenlemeleri. SPK onay, iptal ve idari yaptirim kararlari takibi.',
  keywords: [
    'SPK bülten',
    'SPK kararları',
    'Sermaye Piyasası Kurulu',
    'SPK analiz',
    'SPK onay',
    'SPK düzenlemeleri',
    'borsa düzenleme',
  ],
  alternates: {
    canonical: 'https://borsacebimde.app/spk-bulten/',
  },
  openGraph: {
    title: 'SPK Bulten Analizleri - Borsa Cebimde',
    description: 'SPK bulten analizleri ve Sermaye Piyasasi Kurulu kararlari.',
    url: 'https://borsacebimde.app/spk-bulten/',
  },
};

export default function SpkBultenLayout({ children }: { children: React.ReactNode }) {
  return children;
}
