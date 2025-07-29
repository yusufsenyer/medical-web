export const PRICING_PACKAGES = [
  {
    id: 'basic',
    name: 'Başlangıç Klinik',
    price: 2499,
    originalPrice: 2999,
    popular: false,
    features: [
      'Tek sayfalık doktor web sitesi',
      'Hakkımda, Tedavi Alanları, İletişim',
      'Mobil uyumlu tıbbi tasarım',
      'SEO optimizasyonu',
      'Sosyal medya entegrasyonu',
      '1 yıl domain ücretsiz',
      '10 GB hosting',
      'Teslim süresi: 3-5 iş günü'
    ],
    color: 'from-teal-400 to-teal-600'
  },
  {
    id: 'professional',
    name: 'Profesyonel Klinik',
    price: 4999,
    originalPrice: 5999,
    popular: true,
    features: [
      'Çok sayfalı klinik web sitesi (max 10 sayfa)',
      'Online randevu sistemi',
      'Hasta yorumları bölümü',
      'Sağlık blog sistemi',
      'Anlaşmalı kurumlar listesi',
      'Google Analytics entegrasyonu',
      'İletişim formu ve harita',
      '1 yıl domain + hosting ücretsiz',
      '25 GB hosting',
      'Teslim süresi: 5-7 iş günü'
    ],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'premium',
    name: 'Gelişmiş Klinik',
    price: 7999,
    originalPrice: 9999,
    popular: false,
    features: [
      'Sınırsız sayfa ve özellik',
      'Gelişmiş randevu yönetimi',
      'Hasta portal sistemi',
      'Telemedicine entegrasyonu',
      'Özel klinik tasarımı',
      'Performans optimizasyonu',
      'Canlı destek sistemi',
      '2 yıl domain + hosting ücretsiz',
      '50 GB hosting',
      'Teslim süresi: 7-10 iş günü'
    ],
    color: 'from-cyan-400 to-cyan-600'
  }
]

export const ADDITIONAL_FEATURES = [
  { id: 'logo', name: 'Klinik Logo Tasarımı', price: 750, category: 'design' },
  { id: 'ssl', name: 'SSL Sertifikası (Güvenlik)', price: 300, category: 'security' },
  { id: 'whatsapp', name: 'WhatsApp Randevu Sistemi', price: 1200, category: 'communication' },
  { id: 'seo', name: 'Tıbbi SEO Optimizasyonu', price: 1500, category: 'marketing' },
  { id: 'patient-portal', name: 'Hasta Portal Sistemi', price: 2500, category: 'functionality' },
  { id: 'telemedicine', name: 'Telemedicine Entegrasyonu', price: 3000, category: 'functionality' },
  { id: 'multilang', name: 'Çoklu Dil Desteği', price: 1000, category: 'functionality' },
  { id: 'hosting', name: 'Tıbbi Hosting (HIPAA Uyumlu)', price: 2500, category: 'hosting' },
  { id: 'maintenance', name: 'Yıllık Bakım ve Güncelleme', price: 2400, category: 'support' }
]

export const COLOR_PALETTES = [
  { id: 'medical-blue', name: 'Tıbbi Mavi', colors: ['#0EA5E9', '#0284C7', '#38BDF8'] },
  { id: 'medical-teal', name: 'Sağlık Yeşili', colors: ['#14B8A6', '#0D9488', '#2DD4BF'] },
  { id: 'medical-green', name: 'Doğal Yeşil', colors: ['#22C55E', '#16A34A', '#4ADE80'] },
  { id: 'medical-navy', name: 'Profesyonel Lacivert', colors: ['#1E40AF', '#1D4ED8', '#3B82F6'] },
  { id: 'medical-purple', name: 'Terapi Moru', colors: ['#7C3AED', '#6D28D9', '#8B5CF6'] },
  { id: 'medical-gray', name: 'Klinik Gri', colors: ['#6B7280', '#4B5563', '#9CA3AF'] },
  { id: 'medical-red', name: 'Acil Kırmızı', colors: ['#DC2626', '#B91C1C', '#EF4444'] }
]

export const PROFESSIONS = [
  'Pratisyen Hekim', 'İç Hastalıkları', 'Kardiyoloji', 'Nöroloji', 'Ortopedi',
  'Üroloji', 'Kadın Hastalıkları ve Doğum', 'Çocuk Hastalıkları', 'Göz Hastalıkları', 'Kulak Burun Boğaz',
  'Cildiye', 'Psikiyatri', 'Anestezi', 'Radyoloji', 'Patoloji',
  'Genel Cerrahi', 'Beyin Cerrahisi', 'Kalp Cerrahisi', 'Plastik Cerrahi', 'Göğüs Cerrahisi',
  'Diş Hekimi', 'Ağız Diş Çene Cerrahisi', 'Ortodonti', 'Endodonti', 'Periodontoloji',
  'Fizyoterapist', 'Diyetisyen', 'Psikolog', 'Ebe', 'Hemşire',
  'Veteriner Hekim', 'Eczacı', 'Optisyen', 'Diğer'
]

export const PAGE_OPTIONS = [
  { id: 'about', name: 'Hakkımızda', description: 'Doktor bilgileri, eğitim ve deneyim', price: 200 },
  { id: 'services', name: 'Tedavi Alanları', description: 'Sunduğunuz tıbbi hizmetler', price: 300 },
  { id: 'appointment', name: 'Randevu Sistemi', description: 'Online randevu alma sistemi', price: 600 },
  { id: 'contact', name: 'İletişim', description: 'Klinik bilgileri ve harita', price: 150 },
  { id: 'gallery', name: 'Galeri', description: 'Klinik fotoğrafları ve tedavi örnekleri', price: 250 },
  { id: 'testimonials', name: 'Hasta Yorumları', description: 'Hasta deneyimleri ve değerlendirmeler', price: 350 },
  { id: 'blog', name: 'Sağlık Blog', description: 'Sağlık makaleleri ve bilgilendirme', price: 400 },
  { id: 'faq', name: 'Sık Sorulan Sorular', description: 'Hastalardan gelen yaygın sorular', price: 200 },
  { id: 'insurance', name: 'Anlaşmalı Kurumlar', description: 'SGK ve özel sigorta anlaşmaları', price: 180 },
  { id: 'team', name: 'Ekibimiz', description: 'Klinik personeli ve uzman kadro', price: 300 },
  { id: 'emergency', name: 'Acil Durum', description: 'Acil durum bilgileri ve iletişim', price: 150 },
  { id: 'certificates', name: 'Sertifikalar', description: 'Mesleki sertifikalar ve ödüller', price: 200 },
  { id: 'equipment', name: 'Teknoloji', description: 'Kullanılan tıbbi cihazlar ve teknoloji', price: 250 },
  { id: 'privacy', name: 'Gizlilik Politikası', description: 'Hasta gizliliği ve KVKK uyumu', price: 150 },
  { id: 'helpdesk', name: 'Yardım Masası', description: 'Ticketing sistemi ile destek', price: 550 }
]