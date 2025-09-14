# 📊 Google Analytics Kurulum Rehberi

## 🚀 Hızlı Kurulum

### 1. Google Analytics Hesabı Oluştur
1. [Google Analytics](https://analytics.google.com/) sitesine git
2. "Start measuring" butonuna tıkla
3. Hesap adı: "Portfolio Website"
4. Property adı: "Frontend Developer Portfolio"
5. Reporting time zone: "Turkey"

### 2. Measurement ID Al
1. Data Streams > Web > Add stream
2. Website URL: `https://yourwebsite.com`
3. Stream name: "Portfolio Website"
4. **Measurement ID'yi kopyala** (G-XXXXXXXXXX formatında)

### 3. Kodu Güncelle
`index.html` ve `projects.html` dosyalarında:

```html
<!-- Bu satırı bul: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>

<!-- GA_MEASUREMENT_ID yerine gerçek ID'ni yaz: -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
```

```html
<!-- Bu satırı da güncelle: -->
gtag('config', 'GA_MEASUREMENT_ID');

<!-- Şöyle olmalı: -->
gtag('config', 'G-XXXXXXXXXX');
```

## 📈 Takip Edilen Veriler

### 🎯 Otomatik Takip
- ✅ Sayfa görüntülemeleri
- ✅ Ziyaretçi sayısı
- ✅ Sayfada geçirilen süre
- ✅ Scroll derinliği (25%, 50%, 75%, 100%)
- ✅ Cihaz ve tarayıcı bilgileri

### 🖱️ Etkileşim Takibi
- ✅ Buton tıklamaları
- ✅ Menü linklerine tıklama
- ✅ Contact form gönderimi
- ✅ Admin panel erişimi
- ✅ Proje filtreleme
- ✅ Proje kartı tıklamaları

### 📊 Admin Panel Analytics
- Admin paneline giriş yap
- "Analytics Görüntüle" butonuna tıkla
- Veriler konsola yazdırılır ve panoya kopyalanır

## 🔧 Gelişmiş Ayarlar

### Custom Events
```javascript
// Özel event gönderme
trackEvent('custom_event', {
    category: 'engagement',
    label: 'special_action',
    value: 1
});
```

### E-commerce Tracking
```javascript
// Satın alma takibi
trackEvent('purchase', {
    category: 'ecommerce',
    label: 'package_selected',
    value: 5000 // TL cinsinden
});
```

## 📱 Mobil Analytics

### Responsive Tracking
- Mobil ve desktop ayrı takip
- Touch event'leri
- Mobil menü kullanımı

### Performance Tracking
- Sayfa yükleme süreleri
- Core Web Vitals
- Mobile performance

## 🎨 Dashboard Özelleştirme

### Google Analytics Dashboard
1. Google Analytics > Reports
2. Real-time > Overview
3. Audience > Demographics
4. Behavior > Site Content

### Custom Reports
- Hangi sayfalar popüler
- Kullanıcı davranışları
- Conversion rates
- Bounce rates

## 🔒 Gizlilik ve GDPR

### Cookie Consent
```javascript
// Cookie onayı için
if (localStorage.getItem('cookieConsent') === 'accepted') {
    // Analytics kodunu yükle
}
```

### Data Retention
- Google Analytics varsayılan: 26 ay
- Özelleştirilebilir: 14 ay - 38 ay

## 📊 Raporlama

### Haftalık Raporlar
- Ziyaretçi sayısı
- Popüler sayfalar
- Cihaz dağılımı
- Coğrafi konum

### Aylık Raporlar
- Traffic trends
- User engagement
- Conversion rates
- Performance metrics

## 🚨 Sorun Giderme

### Analytics Çalışmıyor
1. Measurement ID doğru mu?
2. Ad blocker kapalı mı?
3. Console'da hata var mı?
4. Network sekmesinde gtag.js yüklendi mi?

### Veriler Görünmüyor
- 24-48 saat bekle (ilk veriler)
- Real-time reports kontrol et
- Browser cache temizle

## 📞 Destek

### Google Analytics Help
- [Google Analytics Academy](https://analytics.google.com/analytics/academy/)
- [Google Analytics Help Center](https://support.google.com/analytics/)

### Portfolio Specific
- Admin panel > Analytics Görüntüle
- Console'da detaylı veriler
- Local storage backup

---

**Not**: Bu analytics sistemi hem Google Analytics hem de local storage kullanır. Google Analytics çalışmasa bile temel veriler local storage'da saklanır.
