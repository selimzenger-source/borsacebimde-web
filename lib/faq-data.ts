import type { FAQItem } from '@/components/FAQ';

export const halkaArzFAQ: FAQItem[] = [
  {
    question: 'Halka arz nedir?',
    answer: 'Halka arz, bir şirketin hisse senetlerini ilk kez Borsa İstanbul\'da halka satışa sunmasıdır. Yatırımcılar belirlenen fiyattan hisse senedi satın alabilir. SPK (Sermaye Piyasası Kurulu) onayı ile gerçekleşir.',
  },
  {
    question: 'Halka arza nasıl katılırım?',
    answer: 'Halka arza katılmak için bir aracı kurumda yatırım hesabınız olmalıdır. Talep toplama döneminde aracı kurumunuz üzerinden başvuru yapabilirsiniz. Başvuru sırasında hesabınızda yeterli bakiye bulunmalıdır.',
  },
  {
    question: 'Halka arzda lot nedir?',
    answer: 'Lot, hisse senedi alım satımında kullanılan birimdir. 1 lot = 1 adet hisse senedi anlamına gelir. Halka arzlarda her yatırımcıya eşit veya oransal olarak lot dağıtımı yapılır.',
  },
  {
    question: 'Eşit dağıtım ne demek?',
    answer: 'Eşit dağıtım, halka arzda başvuran tüm yatırımcılara eşit miktarda lot verilmesidir. Örneğin, 1000 yatırımcı başvurduysa ve 10.000 lot varsa, her birine 10 lot düşer. Küsuratlar kura ile dağıtılır.',
  },
  {
    question: 'Halka arz takvimini nasıl takip edebilirim?',
    answer: 'Borsa Cebimde uygulaması ile güncel halka arz takvimini takip edebilir, dağıtım tarihleri ve işlem başlangıcında anlık bildirim alabilirsiniz. Uygulama Google Play ve App Store\'da ücretsiz olarak mevcuttur.',
  },
  {
    question: 'Halka arzda para kaybedilir mi?',
    answer: 'Halka arz yatırımı da diğer borsa yatırımları gibi risk içerir. Hisse fiyatı işlem başladıktan sonra düşebilir. Yatırım kararı vermeden önce şirketin finansal durumunu ve sektörünü araştırmanız önemlidir. Bu bilgiler yatırım tavsiyesi değildir.',
  },
  {
    question: 'Halka arzda tavan takibi ne demek?',
    answer: 'Halka arz sonrası işlem görmeye başlayan hisse senedinin günlük fiyat limitine (tavan) ulaşıp ulaşmadığını takip etmek anlamına gelir. Birçok halka arzda hisse ilk günlerde ardışık tavan yapabilir. Borsa Cebimde, her halka arzın tavan takibini otomatik olarak yapar ve kaç gün tavan yaptığını, kümülatif getiriyi ve tavan kırılma tarihini gösterir.',
  },
  {
    question: 'SPK onayı ne kadar sürer?',
    answer: 'SPK halka arz başvuru inceleme süresi genellikle 4 ila 12 hafta arasında değişmektedir. Bu süre şirketin büyüklüğüne, başvuru dosyasının eksiksizliğine ve SPK\'nın iş yoğunluğuna göre farklılık gösterebilir. Borsa Cebimde, SPK başvuru durumlarını takip ederek onay geldiğinde anlık bildirim göndermektedir.',
  },
  {
    question: 'Halka arzda katılım endeksi nedir?',
    answer: 'Katılım endeksi, hissenin faizsiz finans ilkelerine uygunluğunu gösteren bir sınıflandırmadır. "Uygun" olarak işaretlenen halka arzlar, katılım bankacılığı kurallarına göre yatırım yapılabilir niteliktedir. Bu bilgi, katılım bankacılığı tercih eden yatırımcılar için önemli bir referanstır.',
  },
];

export const kapFAQ: FAQItem[] = [
  {
    question: 'KAP nedir?',
    answer: 'KAP (Kamuyu Aydınlatma Platformu), Borsa İstanbul\'da işlem gören şirketlerin zorunlu olarak bildirim yaptığı resmi platformdur. Şirketler önemli gelişmeleri, finansal raporları ve genel kurul kararlarını KAP üzerinden duyurur.',
  },
  {
    question: 'KAP haberleri neden önemlidir?',
    answer: 'KAP haberleri, şirketlerin resmi ve zorunlu açıklamalarını içerir. Bedelsiz sermaye artırımı, temettü kararı, önemli sözleşmeler gibi haberler hisse fiyatını doğrudan etkileyebilir. Bu nedenle yatırımcılar için kritik öneme sahiptir.',
  },
  {
    question: 'KAP haberlerini nasıl takip edebilirim?',
    answer: 'Borsa Cebimde uygulaması ile tüm BIST senetlerinin KAP haberlerini yapay zeka analizi ile takip edebilirsiniz. Favori hisselerinize bildirim ayarlayarak anlık bildirim alabilirsiniz. BIST 50 hisseleri ücretsiz olarak sunulmaktadır.',
  },
  {
    question: 'KAP haberlerinde AI analizi ne işe yarar?',
    answer: 'Yapay zeka analizi, KAP bildirimlerini otomatik olarak değerlendirir ve olumlu/olumsuz/nötr olarak sınıflandırır. Her habere 1-10 arası etki puanı verir. Bu sayede yüzlerce bildirimi tek tek okumanıza gerek kalmaz, önemli haberleri hızlıca görebilirsiniz.',
  },
  {
    question: 'Belirli bir hissenin KAP haberlerini nasıl bulurum?',
    answer: 'Borsa Cebimde web sitesinde veya uygulamada arama kutusuna hisse kodunu (örneğin THYAO, ASELS) yazarak o şirkete ait tüm KAP bildirimlerini filtreleyebilirsiniz.',
  },
];

export const tavanTabanFAQ: FAQItem[] = [
  {
    question: 'Tavan ve taban ne demek?',
    answer: 'Borsa İstanbul\'da hisse senetlerinin günlük fiyat değişim limiti vardır. Bir hisse bir günde en fazla %10 yükselebilir (tavan) veya düşebilir (taban). Bu limitlere ulaşan hisselere "tavan yapan" veya "taban yapan" hisse denir.',
  },
  {
    question: 'Bir hisse neden tavan veya taban yapar?',
    answer: 'Tavan genellikle çok olumlu bir haber (bedelsiz sermaye artırımı, önemli sözleşme vb.) sonrası oluşur. Taban ise olumsuz gelişmelerde (kötü bilanço, SPK yaptırımı vb.) gerçekleşir. Arz-talep dengesizliği fiyatı limite taşır.',
  },
  {
    question: 'Tavan taban hisselerini nasıl takip edebilirim?',
    answer: 'Borsa Cebimde uygulaması ile her akşam seans kapandıktan sonra günün tavan ve taban yapan hisselerini bildirim olarak alabilirsiniz. Web sitemizden de günlük tavan taban listesini görüntüleyebilirsiniz.',
  },
  {
    question: 'Tavan yapan hisseyi almak mantıklı mı?',
    answer: 'Tavan yapan hisse almak riskli olabilir. Fiyat zaten yüksek bir seviyede olduğu için ertesi gün düşüş yaşanabilir. Yatırım kararlarınızı temel ve teknik analiz ile desteklemeniz önemlidir. Bu bilgiler yatırım tavsiyesi değildir.',
  },
];

export const viopFAQ: FAQItem[] = [
  {
    question: 'VİOP nedir?',
    answer: 'VİOP (Vadeli İşlem ve Opsiyon Piyasası), Borsa İstanbul bünyesinde faaliyet gösteren türev piyasadır. Endeks, döviz, emtia ve hisse senedi üzerine vadeli işlem ve opsiyon sözleşmeleri alınıp satılabilir.',
  },
  {
    question: 'VİOP gece seansı nedir?',
    answer: 'VİOP gece seansı (akşam seansı), normal borsa saatleri dışında 19:00-23:00 saatleri arasında gerçekleşen işlem dönemidir. Küresel piyasalardaki gelişmelere anında tepki verme imkanı sunar.',
  },
  {
    question: 'VİOP gece seansını nasıl takip edebilirim?',
    answer: 'Borsa Cebimde uygulaması ile VİOP gece seansı ve gündüz seansı verilerini anlık olarak takip edebilirsiniz. Önemli gelişmelerde bildirim alarak piyasadan kopmazsınız.',
  },
  {
    question: 'VİOP\'ta işlem yapmak riskli midir?',
    answer: 'VİOP\'ta kaldıraçlı işlem yapıldığı için risk seviyesi yüksektir. Yatırdığınız teminattan fazlasını kaybedebilirsiniz. VİOP\'ta işlem yapmadan önce türev ürünleri iyi anlamanız önerilir. Bu bilgiler yatırım tavsiyesi değildir.',
  },
];

export const spkBultenFAQ: FAQItem[] = [
  {
    question: 'SPK nedir?',
    answer: 'SPK (Sermaye Piyasası Kurulu), Türkiye\'de sermaye piyasalarını düzenleyen ve denetleyen bağımsız bir kurumdur. Halka arz onayları, yaptırımlar ve piyasa düzenlemeleri SPK tarafından gerçekleştirilir.',
  },
  {
    question: 'SPK bülteni nedir?',
    answer: 'SPK haftalık bülteni, Sermaye Piyasası Kurulu\'nun aldığı kararları, onayladığı halka arzları, verdiği yaptırımları ve düzenleyici değişiklikleri içeren resmi yayındır. Her hafta yayınlanır.',
  },
  {
    question: 'SPK bültenini nasıl takip edebilirim?',
    answer: 'Borsa Cebimde uygulaması ile SPK bültenleri yayınlandığında yapay zeka analizi ile özetlenmiş bildirimleri anında alabilirsiniz. Web sitemizden de güncel SPK bülten analizlerini görüntüleyebilirsiniz.',
  },
  {
    question: 'SPK bülteni yatırımcıları nasıl etkiler?',
    answer: 'SPK bülteni yeni halka arz onayları, şirketlere verilen cezalar ve piyasa düzenlemeleri hakkında bilgi içerir. Özellikle halka arz yatırımcıları için yeni onaylanan halka arzları takip etmek açısından çok önemlidir.',
  },
];

export const bilancoFAQ: FAQItem[] = [
  {
    question: 'Bilanço nedir?',
    answer: 'Bilanço, bir şirketin belirli bir tarihteki varlıkları, borçları ve özkaynaklarını gösteren finansal tablodur. BIST şirketleri her üç ayda bir KAP üzerinden çeyreklik (Q1, Q2, Q3) ve yıl sonu (Q4) bilançolarını yayınlamak zorundadır.',
  },
  {
    question: 'Çeyreklik bilanço ne anlama gelir?',
    answer: 'Çeyreklik bilanço, bir şirketin üç aylık dönemlerdeki finansal performansını gösterir. Q1 Ocak-Mart, Q2 Nisan-Haziran, Q3 Temmuz-Eylül, Q4 Ekim-Aralık dönemini kapsar. Yatırımcılar çeyreklik trendleri takip ederek şirketin büyüme hızını ölçebilir.',
  },
  {
    question: 'Bilançoda en önemli kalemler nelerdir?',
    answer: 'Yatırımcılar için en kritik kalemler: Net Satışlar (ciro), Brüt Kâr, FAVÖK (EBITDA), Net Dönem Kârı, Toplam Varlıklar, Net Borç ve Özkaynaklar olarak sıralanabilir. Bu kalemlerin önceki yılın aynı dönemiyle (YoY) karşılaştırılması büyüme trendi hakkında bilgi verir.',
  },
  {
    question: 'YoY (Year over Year) ne demek?',
    answer: 'YoY (Yıllık Karşılaştırma), bir kalemin geçen yılın aynı dönemiyle yüzdesel olarak karşılaştırılmasıdır. Örneğin 2026 Q1 satışlarının 2025 Q1 satışlarıyla kıyaslanması "satış YoY %" değerini verir. Bu metrik, mevsimsel etkilerden arındırılmış gerçek büyümeyi gösterir.',
  },
  {
    question: 'FAVÖK (EBITDA) nedir?',
    answer: 'FAVÖK (Faiz, Amortisman ve Vergi Öncesi Kâr), şirketin temel faaliyetlerinden elde ettiği kârlılığı ölçer. Finansman ve muhasebe etkilerinden arındırıldığı için şirketlerin operasyonel performansını karşılaştırmak için ideal bir metriktir. Yüksek ve artan FAVÖK marjı sağlıklı bir işletme göstergesidir.',
  },
  {
    question: 'Bilanço bildirimleri ne zaman yayınlanır?',
    answer: 'BIST şirketleri konsolide bilanço için Q1, Q2, Q3 dönemlerinde dönem bitimini takip eden 60 gün, Q4 (yıl sonu) için ise 70 gün içinde KAP\'a bilanço yayınlamak zorundadır. Bağımsız denetim raporlu yıl sonu bilançolarının yayın süresi 90 gündür.',
  },
  {
    question: 'Bilanço açıklamasından sonra hisse nasıl etkilenir?',
    answer: 'Bilanço açıklaması hisse fiyatını kısa vadede önemli ölçüde etkileyebilir. Beklentinin üzerinde gelen pozitif bilanço hisseyi yukarı, beklentinin altında kalan bilanço ise aşağı taşıyabilir. Borsa Cebimde, her bilanço sonrası yapay zeka destekli analiz üreterek olumlu/olumsuz/nötr sınıflandırma ve 1-10 arası etki puanı verir.',
  },
  {
    question: 'Net borç / FAVÖK oranı nedir?',
    answer: 'Net Borç / FAVÖK, şirketin borç yükünün operasyonel kârlılığa oranını gösterir. 2x altı düşük borç, 3x üstü yüksek borç olarak değerlendirilir. Düşük oran finansal sağlamlığı, yüksek oran ise borç riskini işaret eder. Banka ve sigorta sektörlerinde bu oran kullanılmaz.',
  },
  {
    question: 'Sektörel bilanço farklılıkları var mı?',
    answer: 'Evet. Bankalar için Net Faiz Geliri, Komisyon Gelirleri, Krediler ve Mevduatlar; sigorta şirketleri için Brüt Prim ve Teknik Bölüm Dengesi; aracı kurumlar için Komisyon Gelirleri kritik kalemlerdir. Borsa Cebimde bu sektörlere özel bilanço kartları gösterir.',
  },
  {
    question: 'Bilanço analizi yatırım tavsiyesi midir?',
    answer: 'Hayır. Borsa Cebimde\'deki bilanço analizleri ve AI puanları yalnızca bilgilendirme amaçlıdır, yatırım tavsiyesi niteliği taşımaz. Yatırım kararlarınızı vermeden önce profesyonel danışmanlık almanız ve şirketin tüm yönlerini araştırmanız önerilir.',
  },
];

export const temettuFAQ: FAQItem[] = [
  {
    question: 'Temettü nedir?',
    answer: 'Temettü, anonim şirketlerin yıllık kârından pay sahiplerine dağıttığı tutardır. Şirket Genel Kurul kararıyla net dönem kârının bir kısmını ya da tamamını ortaklarına nakit olarak ya da bedelsiz hisse şeklinde dağıtabilir. BIST şirketlerinde temettü dağıtımı yıllık olarak gerçekleşir.',
  },
  {
    question: 'Temettü verimi nasıl hesaplanır?',
    answer: 'Temettü Verimi = (Brüt Hisse Başına Temettü × 100) / Hisse Fiyatı. Örneğin hisse 10 TL ve brüt temettü 1 TL ise verim %10\'dur. Yüksek verim cazip görünse de sürdürülebilirlik ve şirket sağlığı daha önemli kriterlerdir. Sadece son yılın verimi değil, son 3-5 yılın ortalaması bakılmalıdır.',
  },
  {
    question: 'Brüt ve net temettü farkı nedir?',
    answer: 'Brüt temettü şirketin açıkladığı toplam dağıtım tutarıdır. Net temettü ise %15 stopaj kesintisi sonrası yatırımcının cebine giren tutardır. Örneğin brüt 1 TL temettü için stopaj 0,15 TL, net 0,85 TL\'dir. Yatırım fonu hesaplarında stopaj farklı uygulanabilir.',
  },
  {
    question: 'Eski tarih ne demek (ex-dividend)?',
    answer: 'Temettü ödeme hakkı belirleme tarihinden önceki son işlem günüdür. Bu tarihten itibaren hisseyi alan kişiye o dönemin temettüsü ÖDENMEZ. Temettüden faydalanmak için "ex-dividend" tarihinden önce hisseye sahip olmak gerekir. Bu tarihte hisse fiyatı genellikle temettü tutarı kadar düşer.',
  },
  {
    question: 'Temettü ne zaman ödenir?',
    answer: 'Genel Kurul\'da kararlaştırılan ödeme tarihinde otomatik olarak yatırım hesabınıza işlenir. Genellikle Mart-Eylül arasında yoğunlaşır. Bazı şirketler temettüyü 2-3 taksitte dağıtır. Borsa Cebimde, takip listenizdeki hisselerin temettü tarihlerini hatırlatır.',
  },
  {
    question: 'Temettü şampiyonu kimdir?',
    answer: 'Temettü Şampiyonu, son 1, 3 veya 5 yıllık periyotlarda en yüksek temettü verimi sunan, üst üste temettü dağıtan ve payout oranı yüksek şirketlerdir. Yatırımcılar uzun vadeli pasif gelir stratejisinde bu hisseleri tercih edebilir.',
  },
  {
    question: 'Payout oranı (dağıtım oranı) nedir?',
    answer: 'Payout Oranı = (Dağıtılan Temettü / Net Dönem Kârı) × 100. Şirketin yıllık kârının ne kadarını ortaklara dağıttığını gösterir. %100\'ün üzeri = kârın tamamı + birikmiş kâr veya yedek dağıtımı, %0 = hiç temettü vermedi. %30-70 arası sürdürülebilir sayılır.',
  },
  {
    question: 'Üst üste temettü neden önemli?',
    answer: 'Bir şirketin üst üste 5-10 yıl temettü dağıtması, istikrarlı kârlılık ve güçlü nakit akışı işaretidir. Temettü kesintisi (azaltma veya tamamen iptal) genellikle hisseyi sert düşürür. Bu nedenle "Consecutive Years" (üst üste yıl) metriği güvenilir temettü hisseleri için kritik göstergedir.',
  },
  {
    question: 'Temettü takvimi nasıl takip edilir?',
    answer: 'Borsa Cebimde\'de yıllık temettü takvimi, yaklaşan ödemeler ve ödenmiş temettüler kategorilere ayrılarak listelenir. Her hisse için brüt/net dağıtım, ex-dividend tarihi, ödeme tarihi ve yıllık verim gösterilir. Mobil uygulamada favori hisselerinizin temettü tarihlerinde anlık bildirim alabilirsiniz.',
  },
  {
    question: 'Bedelli ve bedelsiz temettü farkı nedir?',
    answer: 'Bedelsiz temettü (Bedelsiz Sermaye Artırımı) hissedarlara para yerine yeni hisse verilmesidir, hisse sayınız artar ama toplam değer aynı kalır. Bedelli sermaye artırımı ise ortakların hisse satın almak için para ödediği işlemdir, yatırım gerektirir. Nakit temettü ise doğrudan hesabınıza para yatırılmasıdır.',
  },
];

export const genelFAQ: FAQItem[] = [
  {
    question: 'Borsa Cebimde nedir?',
    answer: 'Borsa Cebimde, Borsa İstanbul yatırımcıları için geliştirilmiş ücretsiz bir mobil uygulamadır. Halka arz takvimi, yapay zeka destekli KAP haberleri, tavan taban bildirimleri, VİOP gece seansı ve SPK bülten analizleri sunmaktadır.',
  },
  {
    question: 'Borsa Cebimde ücretsiz mi?',
    answer: 'Evet, uygulama ücretsiz olarak indirilebilir. BIST 50 hisselerinin KAP haberleri ve temel özellikler ücretsiz sunulmaktadır. Tüm BIST hisselerine erişim için VIP abonelik mevcuttur.',
  },
  {
    question: 'Borsa Cebimde uygulamasını nasıl indirebilirim?',
    answer: 'Google Play Store veya Apple App Store\'dan "Borsa Cebimde" aratarak ücretsiz indirebilirsiniz. Hem Android hem iOS cihazlarda kullanılabilir.',
  },
  {
    question: 'Borsa Cebimde yatırım tavsiyesi veriyor mu?',
    answer: 'Hayır, Borsa Cebimde yatırım tavsiyesi vermez. Uygulama sadece bilgi ve haber aktarımı yapar. Yapay zeka analizleri bilgilendirme amaçlıdır ve yatırım kararlarınız için profesyonel danışmanlık almanız önerilir.',
  },
  {
    question: 'Bildirimler nasıl çalışır?',
    answer: 'Favori hisselerinize bildirim ayarlayarak KAP haberi düştüğünde, halka arz dağıtımı yaklaştığında veya tavan/taban oluştuğunda anlık push bildirim alabilirsiniz. Bildirim ayarlarını uygulama içinden özelleştirebilirsiniz.',
  },
  {
    question: 'Web sitesi ile mobil uygulama arasındaki fark nedir?',
    answer: 'Web sitemiz (borsacebimde.com) tüm temel özellikleri sunmaktadır: halka arz takvimi, KAP haberleri, tavan taban hisseleri, VİOP gece seansı ve SPK bülten analizleri. Mobil uygulama ise bunlara ek olarak anlık push bildirimler, favori hisse listesi, kişiselleştirilmiş bildirim ayarları ve çevrimdışı erişim gibi özellikler sunmaktadır.',
  },
  {
    question: 'Veriler ne sıklıkla güncelleniyor?',
    answer: 'KAP haberleri ve piyasa verileri gerçek zamanlı olarak güncellenmektedir. Tavan taban verileri seans kapanışında, halka arz takvimi yeni gelişmeler oldukça, SPK bültenleri ise haftalık olarak güncellenmektedir. Yapay zeka analizleri her yeni KAP bildirimi geldiğinde otomatik olarak üretilmektedir.',
  },
  {
    question: 'Borsa Cebimde hangi veri kaynaklarını kullanıyor?',
    answer: 'Platformumuz Kamuyu Aydınlatma Platformu (KAP), Sermaye Piyasası Kurulu (SPK), Bloomberg HT, BigPara ve Uzmanpara gibi Türkiye\'nin en güvenilir finans veri kaynaklarından bilgi derlemektedir. Tüm veriler resmi ve güvenilir kaynaklardan alınmaktadır.',
  },
  {
    question: 'Yapay zeka analizleri ne kadar güvenilir?',
    answer: 'Yapay zeka analizlerimiz KAP bildirimlerini otomatik olarak değerlendirerek olumlu/olumsuz/nötr sınıflandırma yapar ve 1-10 arası etki puanı verir. Ancak AI analizleri bilgilendirme amaçlıdır, kesin doğruluk garantisi vermez ve yatırım tavsiyesi niteliği taşımaz. Yatırım kararlarınızı vermeden önce kendi araştırmanızı yapmanız önerilir.',
  },
  {
    question: 'Borsa Cebimde ile iletişime nasıl geçebilirim?',
    answer: 'E-posta adresimiz borsacebimde@gmail.com üzerinden bize ulaşabilirsiniz. Ayrıca X (Twitter) hesabımız @BorsaCebimde üzerinden de iletişime geçebilirsiniz. Önerileriniz ve geri bildirimleriniz bizim için çok değerlidir.',
  },
];
