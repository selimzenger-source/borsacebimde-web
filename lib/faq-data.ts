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
];
