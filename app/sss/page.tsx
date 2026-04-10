import type { Metadata } from 'next';
import SSSContent from './Content';

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular - Borsa, Halka Arz ve KAP Hakkında',
  description:
    'Borsa Cebimde uygulaması, halka arz süreci, KAP haberleri, tavan taban hisseleri, VİOP gece seansı ve SPK bülten analizleri hakkında sıkça sorulan sorular ve cevapları.',
  keywords: [
    'borsa sıkça sorulan sorular',
    'halka arz SSS',
    'KAP haberleri SSS',
    'borsa cebimde yardım',
    'tavan taban nedir',
    'VİOP SSS',
    'SPK bülten SSS',
  ],
};

export default function SSSPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <header
        className="card relative overflow-hidden p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(41,121,255,0.2)',
        }}
      >
        <div
          className="absolute -top-16 -right-16 w-56 h-56 rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(41,121,255,0.1) 0%, transparent 70%)',
          }}
        />
        <div className="relative">
          <div
            className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
            style={{
              background: 'rgba(41,121,255,0.1)',
              border: '1px solid rgba(41,121,255,0.2)',
            }}
          >
            <svg
              className="w-3.5 h-3.5"
              style={{ color: '#2979FF' }}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
              />
            </svg>
            <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>
              SSS
            </span>
          </div>
          <h1
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Sıkça Sorulan Sorular
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Borsa, halka arz, KAP haberleri ve daha fazlası hakkında merak edilenler
          </p>
        </div>
      </header>

      {/* Giriş Metni */}
      <div
        className="card p-6 sm:p-8 text-sm leading-relaxed flex flex-col gap-3"
        style={{ color: 'var(--text-secondary)', borderColor: 'var(--border-primary)' }}
      >
        <p>
          Bu sayfada Borsa Cebimde uygulaması ve sunduğu hizmetler hakkında en sık sorulan soruların
          cevaplarını bulabilirsiniz. Halka arz sürecinin nasıl işlediğinden KAP haberlerinin nasıl
          analiz edildiğine, tavan ve taban hisselerinin takibinden VİOP gece seansı verilerine kadar
          pek çok konuda merak ettiğiniz soruları kategorilere ayırarak yanıtladık.
        </p>
        <p>
          Borsa Cebimde, Borsa İstanbul&apos;daki gelişmeleri yapay zeka destekli analizlerle takip
          etmenizi sağlayan kapsamlı bir yatırımcı bilgi platformudur. Uygulamamız, KAP bildirimi
          yayımlandığında yapay zeka ile otomatik analiz yaparak haberin olumlu mu yoksa olumsuz mu
          olduğunu değerlendirir. Halka arz takvimini güncel tutarak yeni halka arzlar hakkında
          zamanında bildirim gönderir. Tavan ve taban yapan hisseleri anlık olarak listeleyerek
          piyasadaki hareketleri takip etmenize yardımcı olur.
        </p>
        <p>
          Aşağıdaki bölümlerde her konu başlığına tıklayarak ilgili sorulara hızlıca ulaşabilir,
          ilgili sayfalara yönlendirme bağlantılarını kullanarak daha fazla detaya erişebilirsiniz.
          Aradığınız cevabı bulamadıysanız uygulama içi destek kanalımızdan bize ulaşabilirsiniz.
        </p>
      </div>

      {/* FAQ İçeriği */}
      <SSSContent />
    </div>
  );
}
