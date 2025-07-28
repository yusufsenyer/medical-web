# WebBuilder Pro 🚀

Modern, professional web sitesi oluşturma platformu. Next.js 14, TypeScript ve Tailwind CSS ile geliştirilmiş tam özellikli bir SaaS uygulaması.

## ✨ Özellikler

### 🎨 Modern UI/UX
- **Responsive Design**: Tüm cihazlarda mükemmel görünüm
- **Glassmorphism Effects**: Modern cam efektleri
- **Blue-Purple Gradient**: Profesyonel renk paleti
- **Smooth Animations**: Framer Motion ile akıcı animasyonlar
- **Toast Notifications**: Kullanıcı dostu bildirimler

### 🔐 Authentication Sistemi
- **Admin Panel**: `admin123@example.com` / `admin123`
- **User Registration**: Kullanıcı kayıt sistemi
- **Role-Based Access**: Admin ve müşteri rolleri
- **Email Validation**: Gerçek zamanlı email doğrulama
- **Session Management**: Güvenli oturum yönetimi

### 📊 Admin Panel
- **Real-time Analytics**: Canlı istatistikler
- **Order Management**: Sipariş yönetimi
- **PDF Export**: Sipariş raporları
- **Status Updates**: Sipariş durumu güncelleme
- **Search & Filter**: Gelişmiş arama ve filtreleme

### 🛒 Sipariş Sistemi
- **Multi-step Form**: Adım adım sipariş formu
- **Dynamic Pricing**: Dinamik fiyat hesaplama
- **Feature Selection**: Özellik seçimi
- **Real-time Preview**: Anlık önizleme
- **Order Tracking**: Sipariş takibi

## 🛠️ Teknolojiler

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI + shadcn/ui
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React

## 🚀 Kurulum

### Gereksinimler
- Node.js 18+ 
- npm veya yarn

### Adımlar

1. **Repository'yi klonlayın**
```bash
git clone https://github.com/yusufsenyer/website_builder.git
cd website_builder
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
# veya
yarn install
```

3. **Development server'ı başlatın**
```bash
npm run dev
# veya
yarn dev
```

4. **Tarayıcıda açın**
```
http://localhost:3000
```

## 📱 Kullanım

### Admin Girişi
- **URL**: `/auth/login`
- **Email**: `admin123@example.com`
- **Password**: `admin123`

### Kullanıcı Kaydı
- **URL**: `/auth/signup`
- Kayıt sonrası giriş yapabilirsiniz

### Web Sitesi Oluşturma
- **URL**: `/order`
- Giriş gerekli
- Adım adım form doldurma
- Dinamik fiyat hesaplama

### Admin Panel
- **URL**: `/admin`
- Sadece admin hesabı ile tam erişim
- Sipariş yönetimi ve analytics

## 📁 Proje Yapısı

```
├── app/                    # Next.js App Router
│   ├── admin/             # Admin panel
│   ├── auth/              # Authentication pages
│   ├── order/             # Order process
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── auth/              # Auth components
│   ├── home/              # Homepage components
│   ├── layout/            # Layout components
│   ├── order/             # Order components
│   └── ui/                # UI components
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
│   ├── auth/              # Auth utilities
│   ├── store.ts           # Zustand store
│   └── utils.ts           # Helper functions
└── public/                # Static assets
```

## 🎯 Özellik Detayları

### Authentication Flow
1. **Kayıt**: Email validation + user storage
2. **Giriş**: Admin/user role kontrolü
3. **Session**: LocalStorage ile persistence
4. **Logout**: Güvenli çıkış

### Order Process
1. **Personal Info**: Kişisel bilgiler
2. **Website Details**: Site detayları
3. **Features**: Özellik seçimi
4. **Design**: Tasarım tercihleri
5. **Summary**: Özet ve onay

### Admin Features
- **Dashboard**: Analytics ve metrikler
- **Orders**: Sipariş listesi ve detayları
- **PDF Export**: Raporlama
- **Status Management**: Durum güncelleme

## 🔧 Geliştirme

### Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
```

### Environment Variables
```env
# Gerekli environment variables yoktur
# Tüm veriler localStorage'da saklanır
```

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 👨‍💻 Geliştirici

**Yusuf Senyer**
- GitHub: [@yusufsenyer](https://github.com/yusufsenyer)
- Email: yusufsenyer@gmail.com

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## 📞 Destek

Herhangi bir sorun veya öneriniz için:
- GitHub Issues açın
- Email gönderin: yusufsenyer@gmail.com

---

⭐ Bu projeyi beğendiyseniz yıldız vermeyi unutmayın!
