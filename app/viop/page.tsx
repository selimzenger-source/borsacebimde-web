import type { Metadata } from 'next';
import ViopContent from './Content';

export const metadata: Metadata = {
  title: 'VİOP Gece Seansı - Vadeli İşlem ve Opsiyon Piyasası',
  description:
    'VİOP gece seansı verileri, açılış-kapanış bilgileri ve saatlik seyir takibi. BIST 30, dolar, euro ve altın vadeli işlem sözleşmeleri.',
  keywords: [
    'VİOP',
    'vadeli işlem',
    'opsiyon piyasası',
    'gece seansı',
    'BIST 30 vadeli',
    'dolar vadeli',
    'altın vadeli',
    'VİOP akşam seansı',
    'türev piyasa',
  ],
  openGraph: {
    title: 'VİOP Gece Seansı - Vadeli İşlem ve Opsiyon Piyasası',
    description:
      'VİOP gece seansı verileri ve anlık takip. Vadeli işlem sözleşmelerinin açılış, kapanış ve seyir bilgileri.',
  },
};

export default function ViopPage() {
  return (
    <>
      {/* Önce dinamik içerik */}
      <ViopContent />

      {/* SEO içerik aşağıda */}
      <article className="mt-10 flex flex-col gap-6">
        <div className="card p-6 sm:p-8 flex flex-col gap-4">
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
            VİOP Gece Seansı Hakkında
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Vadeli İşlem ve Opsiyon Piyasası (VİOP), Borsa İstanbul bünyesinde faaliyet gösteren türev
            ürünler piyasasıdır. VİOP gece seansı, 19:00-23:00 saatleri arasında gerçekleşen özel bir
            işlem dönemidir. Bu seansta yatırımcılar, küresel piyasalardaki gelişmelere anında tepki
            verebilmektedir. ABD borsalarının kapanış saatlerindeki hareketler ve küresel gelişmeler
            gece seansında fiyatlanır.
          </p>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            VİOP&apos;ta BIST 30 endeks vadeli, döviz (dolar, euro) vadeli ve altın vadeli işlem
            sözleşmeleri işlem görmektedir. Gece seansındaki fiyat hareketleri, ertesi günkü
            BIST açılışı hakkında önemli ipuçları vermektedir. Platformumuz açılış, kapanış ve
            saatlik seyir verilerini anlık olarak takip eder.
          </p>
        </div>

        <div className="flex gap-3 p-4 rounded-xl" style={{ background: 'rgba(255,152,0,0.06)', border: '1px solid rgba(255,152,0,0.2)' }}>
          <svg className="w-5 h-5 shrink-0 mt-0.5" style={{ color: '#FF9800' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div>
            <p className="text-sm font-semibold mb-1" style={{ color: '#FF9800' }}>Yasal Uyarı</p>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              VİOP&apos;ta kaldıraçlı işlem yapılmaktadır ve yatırdığınız teminattan fazlasını
              kaybedebilirsiniz. Bu sayfadaki bilgiler yatırım tavsiyesi değildir.
            </p>
          </div>
        </div>
      </article>
    </>
  );
}
