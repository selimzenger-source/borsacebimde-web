import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'BIST Endeksleri Rehberi: BIST 100, BIST 30 ve Digerleri',
  description:
    'Borsa Istanbul endeksleri nedir? BIST 30, BIST 50, BIST 100 farklari, sektor endeksleri, endeks revizyonu ve endeks yatirim fonlari hakkinda kapsamli rehber.',
  alternates: { canonical: 'https://borsacebimde.app/blog/bist-endeks-rehberi' },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: 'BIST Endeksleri Rehberi: BIST 100, BIST 30 ve Digerleri',
  description:
    'Borsa Istanbul endeksleri nedir? BIST 30, BIST 50, BIST 100 farklari, sektor endeksleri, endeks revizyonu ve endeks yatirim fonlari hakkinda kapsamli rehber.',
  author: { '@type': 'Organization', name: 'Borsa Cebimde' },
  publisher: { '@type': 'Organization', name: 'Borsa Cebimde' },
  datePublished: '2026-04-10',
  mainEntityOfPage: { '@type': 'WebPage', '@id': 'https://borsacebimde.app/blog/bist-endeks-rehberi' },
};

export default function BistEndeksRehberiPage() {
  return (
    <article className="flex flex-col gap-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* Breadcrumb */}
      <nav className="text-sm" style={{ color: 'var(--text-muted)' }}>
        <Link href="/" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Ana Sayfa</Link>
        <span className="mx-2">/</span>
        <Link href="/blog" className="hover:underline" style={{ color: 'var(--text-muted)' }}>Blog</Link>
        <span className="mx-2">/</span>
        <span style={{ color: 'var(--text-primary)' }}>BIST Endeksleri</span>
      </nav>

      <div className="card p-6 sm:p-8 flex flex-col gap-5">
        <div className="flex items-center gap-2 text-[11px]">
          <span className="font-semibold px-2 py-0.5 rounded-full" style={{ backgroundColor: 'rgba(41,121,255,0.1)', color: '#2979FF' }}>Endeks</span>
          <span style={{ color: 'var(--text-muted)' }}>10 Nisan 2026</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
          BIST Endeksleri Rehberi: BIST 100, BIST 30 ve Digerleri
        </h1>

        <div className="flex flex-col gap-4 text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>

          <p>
            Borsa endeksleri, belirli kriterlere gore secilmis hisse senetlerinin bir arada
            performansini olcen gostergelerdir. Borsa Istanbul (BIST), pay piyasasinda farkli
            olcek ve sektorlere gore onlarca endeks hesaplar. Bu endeksler, piyasanin genel
            yonunu anlamak, sektorel performanslari karsilastirmak ve yatirim stratejileri
            olusturmak icin temel referans noktalardir. Yatirimcilar icin endeksleri anlamak,
            borsadaki buyuk resmi gormek acisindan buyuk onem tasir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            BIST 100: Ana Endeks
          </h2>
          <p>
            BIST 100, Borsa Istanbul&apos;un ana endeksidir ve Turk borsasinin genel performansini
            olcmek icin en cok kullanilan gostergedir. Piyasa degeri ve islem hacmi en yuksek 100
            sirketin hisselerinden olusur. Medyada ve finans dunyasinda &quot;borsa ne yapti&quot;
            denildiginde genellikle BIST 100 endeksindeki degisim kastedilir.
          </p>
          <p>
            BIST 100, hem yerli hem de yabanci yatirimcilar tarafindan yakindan takip edilir.
            Yabanci yatirimcilarin Turkiye piyasasina olan ilgisi genellikle BIST 100 uzerinden
            olculur. Endeksin yukselisi genel bir iyimserlige, dususu ise piyasada tedirginlige
            isaret edebilir. Ancak BIST 100 yukselirken tum hisseler yukselmiyor olabilir; bu
            nedenle bireysel hisse performanslari ayri degerlendirilmelidir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            BIST 30: Mavi Cip Endeksi
          </h2>
          <p>
            BIST 30, piyasa degeri ve likiditesi en yuksek 30 sirketin hisselerinden olusan
            endekstir. Bu sirketler genellikle Turkiye&apos;nin en buyuk ve en cok bilinen
            sirketleridir. BIST 30 endeksi, vadeli islem kontratlarinin (VIOP) temelini olusturur
            ve kurumsal yatirimcilarin portfoy yonetiminde en sik referans aldiklari endekstir.
          </p>
          <p>
            BIST 30 hisseleri, yuksek islem hacimleri nedeniyle likidite acisindan avantajlidir.
            Yatirimcilar bu hisseleri istedikleri anda alip satabilir ve buyuk emirlerde bile
            fiyat kaymasi (slippage) nispeten dusuktur. Bu ozellik, ozellikle buyuk tutarli
            islemler yapan yatirimcilar icin onemlidir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            BIST 50: Orta Olcekli Endeks
          </h2>
          <p>
            BIST 50, BIST 30 endeksindeki 30 hisseye ek olarak 20 hisse daha iceren, daha genis
            kapsamli bir endekstir. BIST 30&apos;a dahil olmayan ancak yine de yuksek piyasa degeri
            ve likiditeye sahip sirketleri icerir. BIST 50, BIST 30 ile BIST 100 arasinda bir
            gecis endeksi olarak dusunulebilir ve orta-buyuk olcekli sirketlerin performansini
            olcmek icin kullanilir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Sektor Endeksleri
          </h2>
          <p>
            Borsa Istanbul, farkli sektorlerdeki sirketlerin performansini ayri ayri izlemek icin
            sektor endeksleri hesaplar. Baslica sektor endeksleri arasinda BIST Banka (XBANK),
            BIST Sanayi (XUSIN), BIST Holding (XHOLD), BIST Teknoloji (XUTEK), BIST Gida (XGIDA),
            BIST Insaat (XINSA) ve BIST Enerji (XEINK) sayilabilir.
          </p>
          <p>
            Sektor endeksleri, yatirimcilarin hangi sektorlerin piyasanin genelinden iyi veya kotu
            performans gosterdigini anlamasina yardimci olur. Ornegin, BIST Banka endeksinin BIST
            100&apos;den daha hizli yukselmesi, bankacilik sektorune olan ilginin arttigina isaret
            edebilir. Sektor bazli yatirim stratejisi izleyen yatirimcilar bu endeksleri yakindan
            takip eder.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Diger Onemli Endeksler
          </h2>
          <p>
            <strong>BIST TUM:</strong> Borsa Istanbul&apos;daki pay piyasasinda islem goren tum
            sirketlerin hisselerinden olusan en genis kapsamli endekstir. Piyasanin butunune
            iliskin bir gorus elde etmek icin kullanilir.
          </p>
          <p>
            <strong>BIST Temettu (XTMTU):</strong> Yuksek temettu verimine sahip sirketlerden
            olusan endekstir. Gelir odakli yatirim stratejisi izleyen yatirimcilar icin
            referans niteligi tasir.
          </p>
          <p>
            <strong>BIST Kurumsal Yonetim (XKURY):</strong> Kurumsal yonetim ilkelerine uyum
            notu yuksek sirketlerden olusan endekstir. Bu sirketler, seffaflik ve hesap
            verebilirlik acisindan daha yuksek standartlara sahiptir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Endeks Revizyonu Nasil Yapilir?
          </h2>
          <p>
            Borsa Istanbul, endeks bilesimlerini belirli periyotlarla gozden gecirir. Ana
            endeksler (BIST 30, BIST 50, BIST 100) icin revizyon genellikle yilda dort kez,
            mart, haziran, eylul ve aralik aylarinda gerceklestirilir. Revizyon surecinde
            sirketlerin son donemdeki piyasa degeri, islem hacmi ve serbest dolasim orani gibi
            kriterler degerlendirilir.
          </p>
          <p>
            Bir sirketin endekse dahil edilmesi veya endeksten cikarilmasi, o sirketin hisse
            fiyatini dogrudan etkileyebilir. Endekse yeni dahil olan sirketlerin hisseleri
            genellikle artan talep nedeniyle deger kazanirken, endeksten cikarilan sirketlerin
            hisselerinde satis baskisi gorulebilir. Bunun temel nedeni, endeks fonlarinin portfoy
            yapilarini endeks bilesimine gore ayarlamak zorunda olmalaridir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Endekste Yer Almanin Sirkete Etkisi
          </h2>
          <p>
            Bir sirketin BIST 30 veya BIST 100 gibi onemli endekslere dahil olmasi, o sirket
            icin birden fazla avantaj saglar. Ilk olarak, endekse bagli yatirim fonlari (ETF ve
            endeks fonlari) zorunlu olarak o sirketin hisselerini portfoyune ekler, bu da ek
            talep olusturur. Ikinci olarak, yabanci yatirimcilarin radaruna girer ve uluslararasi
            fonlarin ilgisini cekebilir.
          </p>
          <p>
            Ucuncu olarak, endekste yer almak sirketin gorunurlugunu ve itibarini arttirir.
            Analistler ve medya, endeks sirketlerini daha yakindan takip eder. Son olarak,
            endekse dahil olma sureci sirketleri daha seffaf ve yatirimci dostu olmaya tesvik eder
            cunku endeks kriterleri arasinda islem hacmi ve serbest dolasim orani gibi
            parametreler yer alir.
          </p>

          <h2 className="text-lg font-bold mt-2" style={{ color: 'var(--text-primary)' }}>
            Endeks Yatirim Fonlari (ETF)
          </h2>
          <p>
            Endeks yatirim fonlari (ETF), belirli bir endeksin performansini birebir takip etmeyi
            hedefleyen fonlardir. Ornegin, BIST 30 ETF&apos;i, BIST 30 endeksindeki hisseleri
            ayni agirlikta portfoyune alarak endeksin getirisini yatirimcilara yansitmaya calisir.
            ETF&apos;ler, yatirimcilarin tek bir islemle cok sayida hisseye yatirim yapmasina
            olanak tanir.
          </p>
          <p>
            ETF&apos;lerin avantajlari arasinda dusuk yonetim ucretleri, anlik likidite, portfoy
            cesitlendirmesi ve seffaflik yer alir. Turkiye&apos;de BIST 30 ETF, BIST 100 ETF,
            altin ETF ve doviz ETF gibi cesitli borsa yatirim fonlari islem gormektedir.
            Bireysel hisse secimi yapmak yerine piyasanin geneline yatirim yapmak isteyen
            yatirimcilar icin ETF&apos;ler pratik bir cozumdur.
          </p>

          <p>
            Endeksleri takip etmek ve piyasanin genel yonunu anlamak, basarili bir yatirim
            stratejisinin temel tasidir. Guncel piyasa verileri,{' '}
            <Link href="/tavan-taban" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              tavan-taban takibi
            </Link>{' '}
            ve{' '}
            <Link href="/halka-arz" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              halka arz bilgileri
            </Link>{' '}
            icin{' '}
            <Link href="/indir" style={{ color: '#2979FF' }} className="font-medium hover:underline">
              Borsa Cebimde uygulamasini indirin
            </Link>.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="mt-4 p-4 rounded-lg text-xs leading-relaxed" style={{ backgroundColor: 'var(--bg-tertiary)', color: 'var(--text-muted)' }}>
          <strong>Yasal Uyari:</strong> Bu icerik yalnizca bilgilendirme amaciyla hazirlanmis olup
          yatirim tavsiyesi degildir. Endeks bilgileri genel bilgilendirme amaclidir ve guncelligi
          garanti edilmez. Yatirim kararlari kisisel arastirma ve profesyonel danismanlik ile
          alinmalidir. Borsa Cebimde, yatirim kararlarinizdan dolayi sorumluluk kabul etmez.
        </div>
      </div>
    </article>
  );
}
