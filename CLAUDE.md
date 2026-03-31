# Borsa Cebimde Web Sitesi

## Proje Bilgileri
- **Teknoloji**: Next.js 14 + Tailwind CSS (static export)
- **Deploy**: Render Static Site (free tier)
- **Domain**: borsacebimde.app (Cloudflare DNS)
- **API**: https://sz-bist-finans-api.onrender.com (aynı backend)

## AdSense
- Publisher ID: ca-pub-4684027780055868
- Site doğrulaması yapılacak (AdSense kod snippet head'e eklendi)

## Önemli Kurallar
- Tüm metinler TÜRKÇE olmalı
- Türkçe karakterler (İ, Ş, Ğ, Ü, Ö, Ç, ı, ş, ğ, ü, ö, ç) doğru kullanılmalı
- ASLA textTransform: uppercase kullanılmamalı
- ASLA emoji kullanılmamalı — SVG/CSS ikonlar kullan
- VIP/ücretli içerikler gösterilmeyecek
- Bildirim konsepti yok — sadece ücretsiz veri
- Her sayfada uygulama indirme CTA'sı olacak
- Responsive: mobil + masaüstü

## App Store Linkleri
- Google Play: https://play.google.com/store/apps/details?id=com.bistfinans.app
- App Store: https://apps.apple.com/us/app/borsa-cebimde-haber-arz/id6760570446

## Build
```bash
npm run build  # Static export → out/ dizini
```

## Deploy (Render)
- Build command: npm run build
- Publish directory: out
