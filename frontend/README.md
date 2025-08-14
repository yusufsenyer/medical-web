# MedWebify Frontend

Bu proje Next.js 13 ile geliştirilmiş profesyonel web sitesi tasarım platformudur.

## Kurulum

1. Bağımlılıkları yükleyin:
```bash
npm install
```

2. Environment variables dosyası oluşturun:
```bash
cp .env.example .env.local
```

3. `.env.local` dosyasını düzenleyin:
```env
# Firebase Configuration (Opsiyonel - demo için fallback var)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id

# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api/v1

# Supabase Configuration (Opsiyonel)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# CORS Configuration
NEXT_PUBLIC_ALLOWED_ORIGIN=http://localhost:3001
```

4. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

## Port Yapılandırması

- **Frontend (Next.js)**: `http://localhost:3001`
- **Backend (Rails)**: `http://localhost:3000`

## Demo Hesaplar

### Admin Hesabı
- **E-posta**: `admin123@example.com`
- **Şifre**: `admin123`

### Backend Admin Hesabı
- **E-posta**: `admin123@gmail.com`
- **Şifre**: `admin123`

## Özellikler

- ✅ Kullanıcı kayıt/giriş sistemi
- ✅ Admin paneli (sipariş yönetimi, kullanıcı yönetimi)
- ✅ Müşteri dashboard'u
- ✅ 5 adımlı sipariş formu
- ✅ Responsive tasarım
- ✅ Firebase entegrasyonu (opsiyonel)
- ✅ Rails API entegrasyonu

## Sorun Giderme

### Firestore Bağlantı Hatası
Firebase konfigürasyonu yoksa uygulama demo modunda çalışır. Gerçek Firebase kullanmak için `.env.local` dosyasını düzenleyin.

### CORS Hatası
Backend'in `http://localhost:3000`'de çalıştığından emin olun.

### Hydration Uyarısı
Browser extension'larından gelen "bis_skin_checked" uyarısı bastırılmıştır.

## Teknolojiler

- **Framework**: Next.js 13 (App Router)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod
- **Database**: Firebase Firestore (opsiyonel)
- **Backend**: Rails API
