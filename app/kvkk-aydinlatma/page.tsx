import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'KVKK Aydınlatma Metni | Borsa Cebimde',
  description:
    '6698 sayılı Kişisel Verilerin Korunması Kanunu kapsamında Borsa Cebimde kullanıcılarına yönelik aydınlatma metni. Veri sahibi haklarınız ve başvuru yolları.',
  alternates: { canonical: 'https://borsacebimde.app/kvkk-aydinlatma' },
};

export default function KvkkPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
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
          <span className="text-xs font-semibold" style={{ color: '#2979FF' }}>KVKK</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          KVKK Aydınlatma Metni
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          6698 sayılı Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında kişisel verilerinizin işlenmesine ilişkin
          aydınlatma metnidir.
        </p>
      </header>

      <section className="card p-6 sm:p-8" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            1. Veri Sorumlusu
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde uygulaması ve borsacebimde.app web sitesi kapsamında kişisel verileriniz,
            6698 sayılı KVKK'ya uygun şekilde işlenmektedir. Veri sorumlusu sıfatıyla bu aydınlatma metni
            hazırlanmıştır. İletişim: <strong>borsacebimde@gmail.com</strong>
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            2. İşlenen Kişisel Veriler
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Hizmetimizi sağlamak amacıyla aşağıdaki veri kategorileri işlenmektedir:
          </p>
          <ul className="list-disc pl-5 text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>Kimlik bilgileri:</strong> Cihaz kimliği (device ID) — kullanıcı ayrımı için</li>
            <li><strong>İletişim bilgileri:</strong> E-posta adresi (iletişim formunu kullanırsanız)</li>
            <li><strong>Uygulama kullanım verileri:</strong> Favori hisseler, bildirim tercihleri</li>
            <li><strong>Cihaz bilgileri:</strong> İşletim sistemi, uygulama sürümü, push bildirim token'ı</li>
            <li><strong>Ödeme bilgileri:</strong> Abonelik satın alımları App Store / Google Play üzerinden yapılır;
              kart bilgileri tarafımızca <em>hiçbir şekilde</em> tutulmaz</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            3. İşleme Amaçları
          </h2>
          <ul className="list-disc pl-5 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>Uygulama fonksiyonlarının sağlanması (halka arz takibi, KAP haber bildirimi vs.)</li>
            <li>Abonelik ve ücretli hizmetlerin yönetimi</li>
            <li>Push bildirimlerin iletilmesi</li>
            <li>Teknik sorunların giderilmesi ve hata ayıklama</li>
            <li>Yasal yükümlülüklerin yerine getirilmesi</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            4. İşlemenin Hukuki Sebepleri
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Kişisel verileriniz; KVKK 5/2 maddesi uyarınca <strong>sözleşmenin ifası</strong>
            (kullanım koşullarımızı kabul ederek hizmet talep etmeniz), <strong>meşru menfaat</strong>
            (hizmet kalitesinin artırılması, suistimal önleme) ve <strong>açık rızanız</strong> (bildirim
            tercihleri, pazarlama iletişimi) hukuki sebeplerine dayanarak işlenir.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            5. Verilerin Aktarılması
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Kişisel verileriniz aşağıdaki durumlar dışında üçüncü kişilere aktarılmaz:
          </p>
          <ul className="list-disc pl-5 text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            <li><strong>Hizmet sağlayıcılar:</strong> Bulut altyapısı (Render.com), push bildirim servisleri
              (Google FCM, Apple APNs), analitik hizmetler — veriler yalnızca teknik hizmet için kullanılır</li>
            <li><strong>Ödeme ortakları:</strong> Apple App Store ve Google Play (abonelik yönetimi)</li>
            <li><strong>Yetkili kurumlar:</strong> Yasal zorunluluk halinde (mahkeme kararı, savcılık talebi)</li>
          </ul>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Bazı servis sağlayıcılarımız yurtdışı merkezli olabilir. Bu durumda aktarım, KVKK 9. madde
            kapsamında değerlendirilir ve gerekli güvenlik önlemleri alınır.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            6. Saklama Süresi
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Uygulama hesabınız aktif olduğu sürece verileriniz saklanır. Hesabınızı sildiğinizde veriler
            30 gün içinde sistemimizden kaldırılır. Yasal saklama yükümlülüğü olan veriler (örneğin ödeme
            kayıtları) mevzuatın öngördüğü süre boyunca tutulur (Vergi mevzuatı: 5 yıl).
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            7. Veri Sahibi Hakları (KVKK Madde 11)
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            KVKK kapsamında sahip olduğunuz haklar:
          </p>
          <ul className="list-disc pl-5 text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
            <li>İşlenmişse buna ilişkin bilgi talep etme</li>
            <li>İşleme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme</li>
            <li>Yurt içi veya yurt dışında aktarıldığı üçüncü kişileri öğrenme</li>
            <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
            <li>KVKK 7. madde çerçevesinde silinmesini/yok edilmesini isteme</li>
            <li>Düzeltme/silme işlemlerinin üçüncü kişilere bildirilmesini isteme</li>
            <li>Otomatik işlemle aleyhinize çıkan sonuca itiraz etme</li>
            <li>Hukuka aykırı işleme nedeniyle zarara uğramışsanız zararın giderilmesini talep etme</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            8. Başvuru Yolu
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            KVKK 11. madde kapsamındaki taleplerinizi <strong>borsacebimde@gmail.com</strong> adresine
            e-posta göndererek iletebilirsiniz. E-postanızda kimliğinizi doğrulayıcı bilgi (ad-soyad,
            uygulamada kullandığınız cihaz kimliği veya kayıtlı e-posta) belirtmeniz, talebinizin daha
            hızlı sonuçlanmasını sağlar. Başvurularınız en geç 30 gün içinde yanıtlanacaktır.
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            Talebinizin reddi halinde Kişisel Verileri Koruma Kurulu'na (KVKK) şikayette bulunma hakkınız
            saklıdır.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            9. Güncellemeler
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu aydınlatma metni, yasal ve operasyonel gereklilikler kapsamında zaman zaman güncellenebilir.
            Güncel metin bu sayfada yayınlanır. Son güncelleme tarihi: Nisan 2026.
          </p>
        </div>

        <div className="pt-4 border-t" style={{ borderColor: 'var(--border-primary)' }}>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            İlgili diğer belgeler:{' '}
            <Link href="/gizlilik-politikasi" className="hover:underline" style={{ color: '#2979FF' }}>
              Gizlilik Politikası
            </Link>
            ,{' '}
            <Link href="/kullanim-kosullari" className="hover:underline" style={{ color: '#2979FF' }}>
              Kullanım Koşulları
            </Link>
            ,{' '}
            <Link href="/cerez-politikasi" className="hover:underline" style={{ color: '#2979FF' }}>
              Çerez Politikası
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
