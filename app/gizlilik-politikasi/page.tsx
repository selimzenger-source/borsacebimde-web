import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Gizlilik Politikası - Borsa Cebimde',
  description: 'Borsa Cebimde gizlilik politikası, KVKK aydınlatma metni ve kişisel verilerin korunması hakkında bilgi.',
};

export default function GizlilikPolitikasiPage() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <header
        className="card relative overflow-hidden p-6 sm:p-8 mb-8"
        style={{
          background: 'linear-gradient(135deg, var(--bg-secondary), var(--bg-primary))',
          borderColor: 'rgba(41,121,255,0.2)',
        }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
          Gizlilik Politikası
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Son g&uuml;ncelleme: 31 Mart 2026
        </p>
      </header>

      <article className="card p-6 sm:p-8 space-y-8" style={{ lineHeight: 1.8 }}>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Veri Sorumlusu</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu web sitesi (&quot;borsacebimde.app&quot;) ve Borsa Cebimde mobil uygulaması, bireysel geli&#351;tirici Selim Zenger taraf&#305;ndan i&#351;letilmektedir.
            Ki&#351;isel verileriniz 6698 say&#305;l&#305; Ki&#351;isel Verilerin Korunmas&#305; Kanunu (&quot;KVKK&quot;) kapsam&#305;nda i&#351;lenmektedir.
          </p>
          <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
            <strong style={{ color: 'var(--text-primary)' }}>&#304;leti&#351;im:</strong> borsacebimde@gmail.com
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Toplanan Veriler</h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Hizmetlerimizi sunarken a&#351;a&#287;&#305;daki verileri toplayabiliriz:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Cihaz Bilgileri:</strong> Cihaz kimli&#287;i (anonim), i&#351;letim sistemi, uygulama s&uuml;r&uuml;m&uuml;</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Kullan&#305;m Verileri:</strong> Sayfa g&ouml;r&uuml;nt&uuml;leme, t&#305;klama, oturum s&uuml;resi (Google Analytics arac&#305;l&#305;&#287;&#305;yla)</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Reklam Verileri:</strong> Google AdSense taraf&#305;ndan toplanan reklam tercihleri ve &ccedil;erez verileri</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Abonelik Bilgileri:</strong> Sat&#305;n alma i&#351;lemleri RevenueCat ve Google Play / Apple &uuml;zerinden y&ouml;netilir; &ouml;deme bilgileri taraf&#305;m&#305;zda saklanmaz</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Bildirim Tokenleri:</strong> Push bildirim hizmeti i&ccedil;in Expo push token</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Verilerin &#304;&#351;lenme Amac&#305;</h2>
          <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>Hizmetin sunulmas&#305; ve iyile&#351;tirilmesi</li>
            <li>Kullan&#305;c&#305; deneyiminin ki&#351;iselle&#351;tirilmesi</li>
            <li>&#304;statistiksel analizler ve performans &ouml;l&ccedil;&uuml;m&uuml;</li>
            <li>Reklam hizmetlerinin sunulmas&#305; (Google AdSense / AdMob)</li>
            <li>Push bildirim g&ouml;nderimi</li>
            <li>Yasal y&uuml;k&uuml;ml&uuml;l&uuml;klerin yerine getirilmesi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Verilerin Payla&#351;&#305;m&#305;</h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Ki&#351;isel verileriniz a&#351;a&#287;&#305;daki &uuml;&ccedil;&uuml;nc&uuml; taraflarla payla&#351;&#305;labilir:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>Google LLC:</strong> AdSense/AdMob reklam hizmetleri ve Analytics</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>RevenueCat Inc.:</strong> Abonelik y&ouml;netimi</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Expo (EAS):</strong> Push bildirim hizmetleri</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Render:</strong> Web hosting hizmetleri</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Cloudflare:</strong> CDN ve DNS hizmetleri</li>
          </ul>
          <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
            Verileriniz yukar&#305;da belirtilen ama&ccedil;lar d&#305;&#351;&#305;nda &uuml;&ccedil;&uuml;nc&uuml; ki&#351;ilerle payla&#351;&#305;lmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. &Ccedil;erezler (Cookies)</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Web sitemiz, hizmet kalitesini art&#305;rmak ve reklam hizmetleri sunmak amac&#305;yla &ccedil;erezler kullan&#305;r.
            &Ccedil;erezler hakk&#305;nda detayl&#305; bilgi i&ccedil;in{' '}
            <a href="/cerez-politikasi" style={{ color: '#2979FF', textDecoration: 'underline' }}>
              &Ccedil;erez Politikam&#305;z&#305;
            </a>{' '}
            inceleyebilirsiniz. Sitemizi kullanarak &ccedil;erez kullan&#305;m&#305;na onay vermi&#351; say&#305;l&#305;rs&#305;n&#305;z;
            ancak taray&#305;c&#305; ayarlar&#305;n&#305;zdan &ccedil;erezleri devre d&#305;&#351;&#305; b&#305;rakabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. KVKK Kapsam&#305;ndaki Haklar&#305;n&#305;z</h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            KVKK&apos;n&#305;n 11. maddesi uyar&#305;nca a&#351;a&#287;&#305;daki haklara sahipsiniz:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li>Ki&#351;isel verilerinizin i&#351;lenip i&#351;lenmedi&#287;ini &ouml;&#287;renme</li>
            <li>Ki&#351;isel verileriniz i&#351;lenmi&#351;se buna ili&#351;kin bilgi talep etme</li>
            <li>Ki&#351;isel verilerinizin i&#351;lenme amac&#305;n&#305; ve bunlar&#305;n amac&#305;na uygun kullan&#305;l&#305;p kullan&#305;lmad&#305;&#287;&#305;n&#305; &ouml;&#287;renme</li>
            <li>Yurt i&ccedil;inde veya yurt d&#305;&#351;&#305;nda ki&#351;isel verilerinizin aktar&#305;ld&#305;&#287;&#305; &uuml;&ccedil;&uuml;nc&uuml; ki&#351;ileri bilme</li>
            <li>Ki&#351;isel verilerinizin eksik veya yanl&#305;&#351; i&#351;lenmi&#351; olmas&#305; h&acirc;linde bunlar&#305;n d&uuml;zeltilmesini isteme</li>
            <li>KVKK&apos;n&#305;n 7. maddesinde &ouml;ng&ouml;r&uuml;len &#351;artlar &ccedil;er&ccedil;evesinde ki&#351;isel verilerinizin silinmesini veya yok edilmesini isteme</li>
            <li>&#304;&#351;lenen verilerin m&uuml;nhas&#305;ran otomatik sistemler vas&#305;tas&#305;yla analiz edilmesi suretiyle ki&#351;inin kendisi aleyhine bir sonucun ortaya &ccedil;&#305;kmas&#305;na itiraz etme</li>
            <li>Ki&#351;isel verilerin kanuna ayk&#305;r&#305; olarak i&#351;lenmesi sebebiyle zarara u&#287;raman&#305;z h&acirc;linde zarar&#305;n giderilmesini talep etme</li>
          </ul>
          <p className="text-sm mt-3" style={{ color: 'var(--text-secondary)' }}>
            Haklar&#305;n&#305;z&#305; kullanmak i&ccedil;in <strong style={{ color: 'var(--text-primary)' }}>borsacebimde@gmail.com</strong> adresine ba&#351;vurabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Veri G&uuml;venli&#287;i</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Verilerinizin g&uuml;venli&#287;i i&ccedil;in SSL/TLS &#351;ifreleme, g&uuml;venli sunucu altyap&#305;s&#305; ve
            eri&#351;im kontrol&uuml; gibi teknik ve idari tedbirler uygulanmaktad&#305;r. &Ouml;deme bilgileriniz
            hi&ccedil;bir zaman sunucular&#305;m&#305;zda saklanmaz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>8. Yat&#305;r&#305;m Tavsiyesi De&#287;ildir</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde platformunda sunulan t&uuml;m i&ccedil;erikler (haberler, analizler, halka arz bilgileri,
            tavan/taban verileri vb.) yaln&#305;zca bilgilendirme ama&ccedil;l&#305;d&#305;r ve hi&ccedil;bir &#351;ekilde yat&#305;r&#305;m
            tavsiyesi, dan&#305;&#351;manl&#305;&#287;&#305; veya y&ouml;nlendirmesi olarak de&#287;erlendirilmemelidir.
            Yat&#305;r&#305;m kararlar&#305;n&#305;z&#305; almadan &ouml;nce lisansl&#305; bir yat&#305;r&#305;m dan&#305;&#351;man&#305;na ba&#351;vurman&#305;z
            tavsiye edilir. SPK lisans&#305; bulunmamaktad&#305;r.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>9. De&#287;i&#351;iklikler</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu gizlilik politikas&#305; zaman zaman g&uuml;ncellenebilir. &Ouml;nemli de&#287;i&#351;iklikler
            yap&#305;ld&#305;&#287;&#305;nda kullan&#305;c&#305;lar uygulama i&ccedil;i bildirim veya web sitesi &uuml;zerinden
            bilgilendirilecektir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>10. &#304;leti&#351;im</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Gizlilik politikam&#305;z hakk&#305;nda sorular&#305;n&#305;z i&ccedil;in bizimle ileti&#351;ime ge&ccedil;ebilirsiniz:
          </p>
          <ul className="list-none mt-2 space-y-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            <li><strong style={{ color: 'var(--text-primary)' }}>E-posta:</strong> borsacebimde@gmail.com</li>
            <li><strong style={{ color: 'var(--text-primary)' }}>Web:</strong> borsacebimde.app</li>
          </ul>
        </section>

      </article>
    </div>
  );
}
