import type { Metadata } from 'next';
import SpkBasvurularContent from './Content';
import { fetchSpkApplicationsSSR } from '@/lib/ssr-prefetch';
import type { SPKApplication } from '@/lib/api';

export const metadata: Metadata = {
  title: 'SPK Başvuruları - Onay Bekleyen Halka Arz Başvuruları',
  description:
    'SPK onayı bekleyen halka arz başvurularının güncel listesi. Sermaye Piyasası Kurulu\'na yapılan halka arz başvuruları, onay süreci ve yatırımcılar için önemli bilgiler.',
  alternates: { canonical: 'https://borsacebimde.app/spk-basvurular' },
  keywords: [
    'SPK başvuruları',
    'halka arz başvurusu',
    'SPK onayı bekleyen',
    'halka arz onay süreci',
    'SPK izahname onayı',
    'Borsa İstanbul halka arz',
  ],
};

export default async function SpkBasvurularPage() {
  const initialApps = (await fetchSpkApplicationsSSR()) as SPKApplication[];

  return <SpkBasvurularContent initialApps={initialApps} />;
}
