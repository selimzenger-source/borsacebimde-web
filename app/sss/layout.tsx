import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular - Borsa, Halka Arz, KAP, VİOP',
  description:
    'Borsa, halka arz, KAP haberleri, tavan taban, VİOP ve SPK bülten hakkında sıkça sorulan sorular ve cevapları. Yeni başlayanlar için borsa rehberi.',
  keywords: ['borsa nedir', 'halka arz nedir', 'halka arza nasıl katılırım', 'KAP nedir', 'tavan taban nedir', 'VİOP nedir', 'SPK nedir', 'borsa sıkça sorulan sorular', 'borsa rehberi', 'yeni başlayanlar için borsa'],
  alternates: { canonical: 'https://borsacebimde.app/sss' },
  openGraph: {
    title: 'Sıkça Sorulan Sorular | Borsa Cebimde',
    description: 'Borsa, halka arz, KAP haberleri ve daha fazlası hakkında SSS.',
  },
};

export default function SSSLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <noscript>
        <div style={{ padding: 20 }}>
          <h1>Sıkça Sorulan Sorular</h1>
          <h2>Halka Arz</h2>
          <p>Halka arz, bir şirketin hisse senetlerini ilk kez Borsa İstanbul'da halka satışa sunmasıdır.</p>
          <h2>KAP Haberleri</h2>
          <p>KAP (Kamuyu Aydınlatma Platformu), Borsa İstanbul'da işlem gören şirketlerin zorunlu bildirim yaptığı resmi platformdur.</p>
          <h2>Tavan Taban</h2>
          <p>Borsa İstanbul'da hisse senetlerinin günlük fiyat değişim limiti vardır. Bir hisse bir günde en fazla %10 yükselebilir (tavan) veya düşebilir (taban).</p>
          <h2>VİOP</h2>
          <p>VİOP (Vadeli İşlem ve Opsiyon Piyasası), Borsa İstanbul bünyesinde faaliyet gösteren türev piyasadır.</p>
          <h2>SPK Bülten</h2>
          <p>SPK (Sermaye Piyasası Kurulu), Türkiye'de sermaye piyasalarını düzenleyen ve denetleyen bağımsız bir kurumdur.</p>
        </div>
      </noscript>
    </>
  );
}
