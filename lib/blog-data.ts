export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'halka-arz-nedir',
    title: 'Halka Arz Nedir? Başlangıç Rehberi',
    excerpt:
      'Halka arz sürecini baştan sona öğrenmek isteyenler için kapsamlı rehber. SPK onay süreci, talep toplama, lot dağıtımı ve yatırımcı için önemli ipuçları.',
    date: '2026-03-15',
    category: 'Halka Arz',
  },
  {
    slug: 'kap-haberleri-rehberi',
    title: 'KAP Haberleri Neden Önemli? Yatırımcı Rehberi',
    excerpt:
      'Kamuyu Aydınlatma Platformu (KAP) bildirimlerini doğru okumak ve yorumlamak için bilmeniz gereken her şey.',
    date: '2026-03-10',
    category: 'KAP',
  },
  {
    slug: 'tavan-taban-stratejileri',
    title: 'Tavan Taban Hisseleri: Ne Anlama Gelir?',
    excerpt:
      'Borsada tavan ve taban kavramları, neden oluşur, ardışık tavan analizi ve yatırımcıların dikkat etmesi gereken noktalar.',
    date: '2026-03-05',
    category: 'Borsa Rehberi',
  },
  {
    slug: 'viop-gece-seansi-rehberi',
    title: 'VİOP Gece Seansı Rehberi',
    excerpt:
      'Vadeli İşlem ve Opsiyon Piyasası (VİOP) gece seansı nedir, hangi saatlerde işlem yapılır, küresel piyasa etkileri ve kaldıraç riskleri.',
    date: '2026-02-28',
    category: 'VİOP',
  },
  {
    slug: 'borsa-yatirim-temel-kavramlar',
    title: 'Borsada Yatırım: Temel Kavramlar',
    excerpt:
      'Hisse senedi, lot, endeks, BIST 100, piyasa değeri, F/K oranı gibi borsanın temel kavramlarını öğrenerek yatırım yolculuğunuza başlayın.',
    date: '2026-02-20',
    category: 'Borsa Rehberi',
  },
  {
    slug: 'spk-nedir-gorevleri',
    title: 'SPK Nedir? Görevleri ve Yatırımcıya Etkisi',
    excerpt:
      'Sermaye Piyasası Kurulu (SPK) nedir, ne iş yapar, halka arz onayları, yatırımcı koruması ve haftalık bültenler hakkında bilmeniz gerekenler.',
    date: '2026-02-15',
    category: 'Düzenleyici',
  },
  {
    slug: 'yapay-zeka-borsa-analizi',
    title: 'Yapay Zeka ile Borsa Analizi: Geleceğin Yatırım Araçları',
    excerpt:
      'Yapay zeka teknolojisi borsa analizinde nasıl kullanılır? KAP haber analizi, duygu analizi ve bireysel yatırımcıya faydaları.',
    date: '2026-02-10',
    category: 'Teknoloji',
  },
  {
    slug: 'bist-endeks-rehberi',
    title: 'BIST Endeksleri Rehberi: BIST 100, BIST 30 ve Diğerleri',
    excerpt:
      'Borsa İstanbul endeks sistemi nasıl çalışır? BIST 30, BIST 50, BIST 100 farkları, sektör endeksleri ve yatırımcıya etkisi.',
    date: '2026-02-05',
    category: 'Borsa Rehberi',
  },
];
