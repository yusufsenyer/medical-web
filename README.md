# MedWebify

Profesyonel web sitesi tasarım platformu. Next.js frontend ve Rails API backend ile geliştirilmiştir.

## 🚀 Hızlı Başlangıç

### Gereksinimler
- Node.js 18+
- Ruby 3.0+
- npm veya yarn

### Kurulum

1. **Repository'yi klonlayın**
```bash
git clone <repository-url>
cd medical-web
```

2. **Backend'i kurun**
```bash
cd backend
bundle install
bin/rails db:create
bin/rails db:migrate
bin/rails server
```

3. **Frontend'i kurun (yeni terminal)**
```bash
cd frontend
npm install
npm run dev
```

4. **Tarayıcıda açın**
- Frontend: http://localhost:3001
- Backend API: http://localhost:3000

## 📋 Demo Hesaplar

### Frontend Admin
- **E-posta**: `admin123@example.com`
- **Şifre**: `admin123`

### Backend Admin
- **E-posta**: `admin123@gmail.com`
- **Şifre**: `admin123`

## 🏗️ Proje Yapısı

```
medical-web/
├── backend/                 # Rails 8 API
│   ├── app/
│   │   ├── controllers/api/v1/
│   │   └── models/
│   ├── config/
│   └── db/
└── frontend/               # Next.js 13 App
    ├── app/
    ├── components/
    ├── lib/
    └── hooks/
```

## 🔧 Özellikler

### Frontend (Next.js)
- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Admin paneli (sipariş yönetimi)
- ✅ Müşteri dashboard'u
- ✅ 5 adımlı sipariş formu
- ✅ Responsive tasarım
- ✅ Firebase entegrasyonu (opsiyonel)
- ✅ Zustand state management

### Backend (Rails API)
- ✅ RESTful API endpoints
- ✅ Kullanıcı yönetimi
- ✅ Sipariş yönetimi (bellek içi)
- ✅ CORS yapılandırması
- ✅ SQLite veritabanı

## 🛠️ Teknolojiler

### Frontend
- **Framework**: Next.js 13 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

### Backend
- **Framework**: Rails 8.0.2
- **Mode**: API-only
- **Database**: SQLite
- **CORS**: rack-cors
- **Authentication**: Basit şifre kontrolü

## 🔍 Sorun Giderme

### Firestore Bağlantı Hatası
Firebase konfigürasyonu yoksa uygulama demo modunda çalışır. Gerçek Firebase kullanmak için:

1. `frontend/.env.local` dosyası oluşturun
2. Firebase konfigürasyon bilgilerini ekleyin

### CORS Hatası
- Backend'in `http://localhost:3000`'de çalıştığından emin olun
- Frontend'in `http://localhost:3001`'de çalıştığından emin olun

### Port Çakışması
Eğer portlar meşgulse:
- Backend: `bin/rails server -p 3000`
- Frontend: `npm run dev -- -p 3001`

### Hydration Uyarısı
Browser extension'larından gelen "bis_skin_checked" uyarısı bastırılmıştır.

## 📚 Detaylı Dokümantasyon

- [Frontend README](./frontend/README.md)
- [Backend README](./backend/README.md)

## 🚀 Production Deployment

### Güvenlik Önlemleri
Bu proje demo amaçlıdır. Production kullanımı için:

1. **Backend**:
   - bcrypt ile şifre hash'leme
   - JWT token doğrulama
   - Rate limiting
   - Input validation

2. **Frontend**:
   - Environment variables
   - HTTPS
   - CSP headers

### Deployment
- **Frontend**: Vercel, Netlify
- **Backend**: Heroku, Railway, DigitalOcean

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 Destek

Herhangi bir sorun veya öneriniz için:
- GitHub Issues açın
- Email: yusufsenyer@gmail.com

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
