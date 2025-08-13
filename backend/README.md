# MedicalWeb Pro Backend

Rails 8 API-only backend for MedicalWeb Pro platform.

## Kurulum

1. Ruby 3.0+ yüklü olduğundan emin olun

2. Bağımlılıkları yükleyin:
```bash
bundle install
```

3. Veritabanını oluşturun:
```bash
bin/rails db:create
bin/rails db:migrate
```

4. Geliştirme sunucusunu başlatın:
```bash
bin/rails server
```

## Port Yapılandırması

- **Backend (Rails)**: `http://localhost:3000`
- **Frontend (Next.js)**: `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /api/v1/health` - API sağlık kontrolü

### Authentication
- `POST /api/v1/auth/register` - Kullanıcı kaydı
- `POST /api/v1/auth/login` - Kullanıcı girişi
- `GET /api/v1/auth/profile` - Kullanıcı profili
- `PUT /api/v1/auth/update-profile` - Profil güncelleme

### Orders
- `GET /api/v1/orders` - Tüm siparişler
- `POST /api/v1/orders` - Yeni sipariş oluşturma
- `GET /api/v1/orders/:id` - Sipariş detayı
- `PUT /api/v1/orders/:id` - Sipariş güncelleme
- `PUT /api/v1/orders/:id/status` - Sipariş durumu güncelleme
- `DELETE /api/v1/orders/:id` - Sipariş silme

### Users (Admin Only)
- `GET /api/v1/users` - Tüm kullanıcılar
- `GET /api/v1/users/:id` - Kullanıcı detayı
- `PUT /api/v1/users/:id/status` - Kullanıcı durumu güncelleme
- `PUT /api/v1/users/:id/role` - Kullanıcı rolü güncelleme

## Demo Hesaplar

### Admin Hesabı
- **E-posta**: `admin123@gmail.com`
- **Şifre**: `admin123`

Bu hesap otomatik olarak oluşturulur.

## Veritabanı

- **Database**: SQLite (development)
- **Tables**: `users` (sadece)

Orders şu anda bellek içinde tutulmaktadır (demo amaçlı).

## CORS Yapılandırması

Frontend'den gelen isteklere izin verilen originler:
- `http://localhost:3001`
- `http://127.0.0.1:3001`
- `http://localhost:3000`
- `http://127.0.0.1:3000`

## Geliştirme

### Rails Console
```bash
bin/rails console
```

### Database Reset
```bash
bin/rails db:reset
```

### Test
```bash
bin/rails test
```

## Güvenlik Notları

⚠️ **Demo Amaçlı**: Bu backend demo amaçlıdır ve production kullanımı için güvenlik önlemleri eklenmelidir:

- Şifre hash'leme (bcrypt)
- JWT token doğrulama
- Rate limiting
- Input validation
- SQL injection koruması

## Teknolojiler

- **Framework**: Rails 8.0.2
- **Database**: SQLite
- **API Mode**: API-only Rails
- **CORS**: rack-cors
- **Authentication**: Basit şifre kontrolü (demo)
