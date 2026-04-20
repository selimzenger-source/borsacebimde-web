import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'İletişim | Borsa Cebimde',
  description:
    'Borsa Cebimde iletişim bilgileri. Öneri, şikayet, iş birliği ve destek talepleriniz için bize ulaşabilirsiniz.',
  alternates: { canonical: 'https://borsacebimde.app/iletisim' },
};

export default function IletisimPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <header
        className="card p-6 sm:p-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(41,121,255,0.2)',
        }}
      >
        <div
          className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full"
          style={{ background: 'rgba(41,121,255,0.1)', border: '1px solid rgba(41,121,255,0.2)' }}
        >
          <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>İletişim</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Bize Ulaşın
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Öneri, şikayet, iş birliği veya teknik destek için bize yazın.
        </p>
      </header>

      {/* İletişim Kartları */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="card p-6" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            📧 E-posta
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Her türlü soru, öneri ve destek talebi için:
          </p>
          <a
            href="mailto:borsacebimde@gmail.com"
            className="text-base font-semibold hover:underline"
            style={{ color: '#2979FF' }}
          >
            borsacebimde@gmail.com
          </a>
          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            Yanıt süresi: 24-48 saat (hafta içi)
          </p>
        </div>

        <div className="card p-6" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            📱 Uygulama İçi İletişim
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Mobil uygulamamızda <strong>Ayarlar → Bize Yazın</strong> bölümünden kategoriye göre (görüş,
            hata bildirimi, özellik isteği) mesaj iletebilirsiniz. Ekran görüntüsü ekleyebilirsiniz.
          </p>
          <div className="flex gap-2 mt-2">
            <a
              href="https://play.google.com/store/apps/details?id=com.bistfinans.app"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
            >
              Google Play
            </a>
            <a
              href="https://apps.apple.com/tr/app/borsa-cebimde-haber-arz/id6760570446?l=tr"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium"
              style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-primary)', color: 'var(--text-secondary)' }}
            >
              App Store
            </a>
          </div>
        </div>

        <div className="card p-6" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            🐦 Sosyal Medya
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Anlık güncellemeler, piyasa haberleri ve duyurular için bizi takip edebilirsiniz.
          </p>
          <a
            href="https://x.com/borsacebimde"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold hover:underline"
            style={{ color: '#2979FF' }}
          >
            X (Twitter): @borsacebimde
          </a>
        </div>

        <div className="card p-6" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
            ⚖️ Yasal & Veri Talepleri
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            KVKK kapsamındaki kişisel veri erişim/silme talepleri, telif hakkı bildirimleri ve resmi
            kurum yazışmaları için aynı e-posta adresinden ulaşabilirsiniz. Başvurular 30 gün içinde
            yanıtlanır.
          </p>
          <Link
            href="/kvkk-aydinlatma"
            className="text-sm font-semibold hover:underline"
            style={{ color: '#2979FF' }}
          >
            → KVKK Aydınlatma Metni
          </Link>
        </div>
      </section>

      {/* SSS */}
      <section className="card p-6 sm:p-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>
          Sık Karşılaşılan Konular
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Uygulamada bir sorun yaşıyorum, nasıl bildirmeliyim?
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Uygulama içinde <strong>Ayarlar → Bize Yazın</strong> bölümünden "Hata Bildirimi" kategorisini
              seçerek mesajınızı iletin. Cihaz modeli, işletim sistemi sürümü ve hatayı nasıl tetiklediğinizi
              belirtirseniz daha hızlı çözüme ulaşırız.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Yeni bir özellik önermek istiyorum.
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Uygulama içindeki iletişim formundan "Özellik Önerisi" kategorisi ile ya da
              e-posta adresimize detaylı açıklamasıyla birlikte gönderebilirsiniz. Gerçekleştirilebilir
              öneriler yol haritamıza alınır.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Reklam veya iş birliği için iletişim
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Kurumsal iş birliği, sponsorluk ya da reklam talepleri için e-posta adresimizden bize
              ulaşabilirsiniz. Teklifinizi "İş Birliği" konu başlığıyla göndermeniz önerilir.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Aboneliğimi nasıl iptal ederim?
            </h3>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              iOS aboneliğinizi <strong>Ayarlar → Apple Kimliği → Abonelikler</strong>, Android aboneliğinizi
              <strong> Google Play → Profil → Ödemeler ve Abonelikler</strong> bölümünden istediğiniz zaman iptal
              edebilirsiniz. İptal sonrası mevcut dönem sonuna kadar erişim sürer.
            </p>
          </div>
        </div>
      </section>

      {/* Kurumsal Bilgi */}
      <section className="card p-6" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <h2 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>
          Kurumsal Bilgi
        </h2>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          <strong>Proje Adı:</strong> Borsa Cebimde<br />
          <strong>Web:</strong> borsacebimde.app<br />
          <strong>E-posta:</strong> borsacebimde@gmail.com<br />
          <strong>Platformlar:</strong> iOS, Android, Web
        </p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          Borsa Cebimde, Türkiye Borsası (BIST) yatırımcılarına yönelik bir finans bilgi platformudur. Yatırım
          tavsiyesi vermemekte, yalnızca kamuya açık veri kaynaklarını (KAP, SPK, Borsa İstanbul) agregasyon
          ve yapay zeka destekli analizle kullanıcıya sunmaktadır.
        </p>
      </section>
    </div>
  );
}
