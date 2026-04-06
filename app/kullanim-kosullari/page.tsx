import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Kullan\u0131m Ko\u015fullar\u0131 - Borsa Cebimde',
  description: 'Borsa Cebimde web sitesi ve mobil uygulama kullan\u0131m ko\u015fullar\u0131, sorumluluk reddi ve yasal bilgiler.',
};

export default function KullanimKosullariPage() {
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
          Kullan{'\u0131'}m Ko{'\u015f'}ullar{'\u0131'}
        </h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Son g&uuml;ncelleme: 6 Nisan 2026
        </p>
      </header>

      <article className="card p-6 sm:p-8 space-y-8" style={{ lineHeight: 1.8 }}>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>1. Genel</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu kullan{'\u0131'}m ko{'\u015f'}ullar{'\u0131'}, <strong>borsacebimde.app</strong> web sitesi ve
            &ldquo;Borsa Cebimde - Haber &amp; Arz&rdquo; mobil uygulamas{'\u0131'}n{'\u0131'}n (bundan sonra &ldquo;Hizmet&rdquo; olarak an{'\u0131'}lacakt{'\u0131'}r)
            kullan{'\u0131'}m{'\u0131'}na ili{'\u015f'}kin {'\u015f'}art ve ko{'\u015f'}ullar{'\u0131'} belirler. Hizmeti kullanarak bu ko{'\u015f'}ullar{'\u0131'} kabul etmi{'\u015f'} say{'\u0131'}l{'\u0131'}rs{'\u0131'}n{'\u0131'}z.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>2. Hizmet Tan{'\u0131'}m{'\u0131'}</h2>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, Borsa {'\u0130'}stanbul (B{'\u0130'}ST) hisse senedi yat{'\u0131'}r{'\u0131'}mc{'\u0131'}lar{'\u0131'} i{'\u00e7'}in geli{'\u015f'}tirilmi{'\u015f'} bir bilgi ve takip platformudur. Sunulan hizmetler:
          </p>
          <ul className="text-sm list-disc pl-6 space-y-1" style={{ color: 'var(--text-secondary)' }}>
            <li>KAP (Kamuyu Ayd{'\u0131'}nlatma Platformu) bildirimlerinin yapay zek{'\u00e2'} ile analizi</li>
            <li>Halka arz takvimi ve takibi</li>
            <li>Piyasa haberleri ve g{'\u00fc'}ndem</li>
            <li>Tavan ve taban hisse takibi</li>
            <li>V{'\u0130'}OP gece seans{'\u0131'} verileri</li>
            <li>SPK b{'\u00fc'}lten analizleri</li>
            <li>Push bildirimler ve anl{'\u0131'}k uyar{'\u0131'}lar</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>3. Yat{'\u0131'}r{'\u0131'}m Tavsiyesi De{'\u011f'}ildir</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            <strong>Borsa Cebimde hi{'\u00e7'}bir {'\u015f'}ekilde yat{'\u0131'}r{'\u0131'}m tavsiyesi, dan{'\u0131'}{'\u015f'}manl{'\u0131'}{'\u011f'}{'\u0131'} veya y{'\u00f6'}nlendirmesi sunmaz.</strong> Platformda
            yer alan t{'\u00fc'}m veriler, analizler, puanlamalar ve i{'\u00e7'}erikler yaln{'\u0131'}zca bilgilendirme ama{'\u00e7'}l{'\u0131'}d{'\u0131'}r.
            Yat{'\u0131'}r{'\u0131'}m kararlar{'\u0131'}n{'\u0131'}z tamamen sizin sorumlulu{'\u011f'}unuzdad{'\u0131'}r. Yat{'\u0131'}r{'\u0131'}m yapmadan {'\u00f6'}nce
            lisansl{'\u0131'} bir yat{'\u0131'}r{'\u0131'}m dan{'\u0131'}{'\u015f'}man{'\u0131'}na ba{'\u015f'}vurman{'\u0131'}z {'\u00f6'}nerilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>4. Yapay Zek{'\u00e2'} (AI) {'\u0130'}{'\u00e7'}erikleri</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Platformda yer alan yapay zek{'\u00e2'} destekli analizler, {'\u00f6'}zetler ve puanlamalar otomatik olarak
            {'\u00fc'}retilmektedir. Bu i{'\u00e7'}erikler hata i{'\u00e7'}erebilir ve kesinlik garantisi ta{'\u015f'}{'\u0131'}maz.
            AI taraf{'\u0131'}ndan {'\u00fc'}retilen i{'\u00e7'}eriklerin do{'\u011f'}rulu{'\u011f'}unu ba{'\u011f'}{'\u0131'}ms{'\u0131'}z kaynaklardan teyit etmeniz {'\u00f6'}nerilir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>5. Veri Kaynaklar{'\u0131'}</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Platformda g{'\u00f6'}sterilen borsa verileri, haberler ve bildirimler {'\u00e7'}e{'\u015f'}itli kamuya a{'\u00e7'}{'\u0131'}k kaynaklardan
            (KAP, SPK, haber ajanslar{'\u0131'}) derlenmektedir. Verilerin ger{'\u00e7'}ek zamanl{'\u0131'} olma garantisi yoktur;
            gecikmeler ya{'\u015f'}anabilir. Kesin ve g{'\u00fc'}ncel bilgi i{'\u00e7'}in resmi kaynaklar{'\u0131'} (kap.org.tr, spk.gov.tr, borsaistanbul.com) kontrol ediniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>6. Hesap ve Kullan{'\u0131'}m</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Hizmeti kullanmak i{'\u00e7'}in hesap olu{'\u015f'}turman{'\u0131'}z gerekmez. Cihaz{'\u0131'}n{'\u0131'}z {'\u00fc'}zerinden anonim bir
            tan{'\u0131'}mlay{'\u0131'}c{'\u0131'} (device ID) ile hizmet sunulmaktad{'\u0131'}r. Takip listeniz ve tercihleriniz
            cihaz{'\u0131'}n{'\u0131'}zda yerel olarak saklan{'\u0131'}r. Hizmeti yasalara ayk{'\u0131'}r{'\u0131'} {'\u015f'}ekilde kullanman{'\u0131'}z,
            otomatik botlarla veri {'\u00e7'}ekmeniz veya i{'\u00e7'}eri{'\u011f'}i izinsiz kopyalaman{'\u0131'}z yasakt{'\u0131'}r.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>7. Fikri M{'\u00fc'}lkiyet</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde ad{'\u0131'}, logosu, tasar{'\u0131'}m{'\u0131'} ve yaz{'\u0131'}l{'\u0131'}m{'\u0131'} fikri m{'\u00fc'}lkiyet haklar{'\u0131'} ile korunmaktad{'\u0131'}r.
            {'\u0130'}{'\u00e7'}eriklerin izinsiz kopyalanmas{'\u0131'}, da{'\u011f'}{'\u0131'}t{'\u0131'}lmas{'\u0131'} veya ticari ama{'\u00e7'}la kullan{'\u0131'}lmas{'\u0131'} yasakt{'\u0131'}r.
            Haber i{'\u00e7'}erikleri ilgili haber kaynaklar{'\u0131'}na aittir ve kaynak belirtilerek sunulmaktad{'\u0131'}r.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>8. Sorumluluk S{'\u0131'}n{'\u0131'}rlamas{'\u0131'}</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Borsa Cebimde, platformda sunulan bilgilerin do{'\u011f'}rulu{'\u011f'}u, eksiksizli{'\u011f'}i veya g{'\u00fc'}ncelli{'\u011f'}i konusunda
            hi{'\u00e7'}bir garanti vermez. Platformun kullan{'\u0131'}m{'\u0131'}ndan do{'\u011f'}abilecek do{'\u011f'}rudan veya dolayl{'\u0131'}
            zararlardan (finansal kay{'\u0131'}plar dahil) sorumluluk kabul edilmez. Hizmet &ldquo;oldu{'\u011f'}u gibi&rdquo;
            sunulmaktad{'\u0131'}r ve kesintisiz {'\u00e7'}al{'\u0131'}{'\u015f'}ma garantisi yoktur.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>9. {'\u00dc'}{'\u00e7'}{'\u00fc'}nc{'\u00fc'} Taraf Hizmetleri</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Platformda Google AdSense reklamlar{'\u0131'}, Google Analytics ve Firebase hizmetleri kullan{'\u0131'}lmaktad{'\u0131'}r.
            Bu {'\u00fc'}{'\u00e7'}{'\u00fc'}nc{'\u00fc'} taraf hizmetlerinin kendi kullan{'\u0131'}m ko{'\u015f'}ullar{'\u0131'} ve gizlilik politikalar{'\u0131'} ge{'\u00e7'}erlidir.
            Detayl{'\u0131'} bilgi i{'\u00e7'}in <a href="/gizlilik-politikasi" className="text-brand hover:underline">Gizlilik Politikam{'\u0131'}z{'\u0131'}</a> ve{' '}
            <a href="/cerez-politikasi" className="text-brand hover:underline">{'\u00c7'}erez Politikam{'\u0131'}z{'\u0131'}</a> inceleyiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>10. Abonelik ve {'\u00d6'}demeler</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Uygulaman{'\u0131'}n temel {'\u00f6'}zellikleri {'\u00fc'}cretsizdir. VIP abonelik sat{'\u0131'}n al{'\u0131'}mlar{'\u0131'} Google Play ve
            Apple App Store {'\u00fc'}zerinden ger{'\u00e7'}ekle{'\u015f'}tirilir. {'\u0130'}ptal ve iade ko{'\u015f'}ullar{'\u0131'} ilgili ma{'\u011f'}azan{'\u0131'}n
            politikalar{'\u0131'}na tabidir. Abonelik iptali i{'\u00e7'}in cihaz{'\u0131'}n{'\u0131'}z{'\u0131'}n ma{'\u011f'}aza ayarlar{'\u0131'}ndan i{'\u015f'}lem yapabilirsiniz.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>11. De{'\u011f'}i{'\u015f'}iklikler</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu kullan{'\u0131'}m ko{'\u015f'}ullar{'\u0131'} {'\u00f6'}nceden bildirim yap{'\u0131'}lmaks{'\u0131'}z{'\u0131'}n g{'\u00fc'}ncellenebilir.
            G{'\u00fc'}ncel ko{'\u015f'}ullar her zaman bu sayfada yay{'\u0131'}nlan{'\u0131'}r. Hizmeti kullanmaya devam etmeniz,
            g{'\u00fc'}ncellenmi{'\u015f'} ko{'\u015f'}ullar{'\u0131'} kabul etti{'\u011f'}iniz anlam{'\u0131'}na gelir.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>12. {'\u0130'}leti{'\u015f'}im</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Kullan{'\u0131'}m ko{'\u015f'}ullar{'\u0131'} hakk{'\u0131'}nda sorular{'\u0131'}n{'\u0131'}z i{'\u00e7'}in:{' '}
            <a href="mailto:borsacebimde@gmail.com" className="text-brand hover:underline">borsacebimde@gmail.com</a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold mb-3" style={{ color: 'var(--text-primary)' }}>13. Uygulanacak Hukuk</h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Bu kullan{'\u0131'}m ko{'\u015f'}ullar{'\u0131'} T{'\u00fc'}rkiye Cumhuriyeti yasalar{'\u0131'}na tabidir.
            Uyu{'\u015f'}mazl{'\u0131'}klarda {'\u0130'}stanbul mahkemeleri ve icra daireleri yetkilidir.
          </p>
        </section>

      </article>
    </div>
  );
}
