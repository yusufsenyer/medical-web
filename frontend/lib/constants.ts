export const PRICING_PACKAGES = [
  {
    id: 'basic',
    name: 'Temel Paket',
    price: 1999,
    originalPrice: 2499,
    popular: false,
    features: [
      'Tek sayfalık web sitesi',
      '5 bölüm (Hakkımda, Hizmetler, İletişim)',
      'Mobil uyumlu tasarım',
      'SEO optimizasyonu',
      '1 yıl domain ücretsiz',
      '5 GB hosting',
      'Teslim süresi: 3-5 iş günü'
    ],
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'professional',
    name: 'Profesyonel Paket',
    price: 3999,
    originalPrice: 4999,
    popular: true,
    features: [
      'Çok sayfalı web sitesi (max 10 sayfa)',
      'Blog sistemi',
      'İletişim formu',
      'Google Analytics entegrasyonu',
      'Sosyal medya entegrasyonu',
      'Randevu sistemi (doktorlar için)',
      '10 GB hosting',
      'Teslim süresi: 5-7 iş günü'
    ],
    color: 'from-purple-500 to-pink-600'
  },
  {
    id: 'premium',
    name: 'Premium Paket',
    price: 6999,
    originalPrice: 8999,
    popular: false,
    features: [
      'Sınırsız sayfa',
      'E-ticaret sistemi',
      'Canlı sohbet',
      'Advanced SEO',
      'Özel tasarım',
      'API entegrasyonları',
      '25 GB hosting',
      'Öncelikli destek',
      'Teslim süresi: 7-10 iş günü'
    ],
    color: 'from-emerald-400 to-cyan-600'
  }
]

export const ADDITIONAL_FEATURES = [
  { id: 'logo', name: 'Logo Tasarımı', price: 500, category: 'design' },
  { id: 'ssl', name: 'SSL Sertifikası', price: 300, category: 'security' },
  { id: 'whatsapp', name: 'WhatsApp Business API', price: 800, category: 'communication' },
  { id: 'google-ads', name: 'Google Ads Yönetimi', price: 1200, category: 'marketing' },
  { id: 'email-marketing', name: 'E-mail Marketing', price: 600, category: 'marketing' },
  { id: 'multilang', name: 'Çoklu Dil Desteği', price: 1000, category: 'functionality' },
  { id: 'hosting', name: 'Özel Hosting', price: 2000, category: 'hosting' },
  { id: 'maintenance', name: 'Maintenance (Yıllık)', price: 1800, category: 'support' }
]

export const COLOR_PALETTES = [
  { id: 'blue', name: 'Professional Blue', colors: ['#0066CC', '#004499', '#3399FF'] },
  { id: 'green', name: 'Medical Green', colors: ['#00CC66', '#008844', '#33FF88'] },
  { id: 'purple', name: 'Creative Purple', colors: ['#8B5CF6', '#7C3AED', '#A78BFA'] },
  { id: 'orange', name: 'Energy Orange', colors: ['#FF6B35', '#FF4500', '#FF8C42'] },
  { id: 'teal', name: 'Modern Teal', colors: ['#14B8A6', '#0F766E', '#2DD4BF'] },
  { id: 'indigo', name: 'Corporate Indigo', colors: ['#6366F1', '#4F46E5', '#818CF8'] }
]

export const PROFESSIONS = [
  'Doktor', 'Diş Hekimi', 'Veteriner', 'Psikolog', 'Fizyoterapist',
  'Avukat', 'Notar', 'Muhasebeci', 'Mimar', 'Mühendis',
  'Kuaför', 'Berber', 'Estetisyen', 'Masaj Terapisti', 'Diyetisyen',
  'Eğitim Danışmanı', 'Dil Kursu', 'Müzik Eğitmeni', 'Spor Antrenörü',
  'Fotoğrafçı', 'Videograf', 'Grafik Tasarımcı', 'İç Mimar',
  'Emlak Danışmanı', 'Sigortacı', 'Mali Müşavir', 'Diğer'
]

export const PAGE_OPTIONS = [
  { id: 'about', name: 'Hakkımızda', description: 'Şirketiniz hakkında bilgi ve istatistikler', price: 200 },
  { id: 'services', name: 'Hizmetler', description: 'Hizmet teklifinizin açıklaması', price: 300 },
  { id: 'pricing', name: 'Fiyatlandırma', description: 'Dönüşüm sağlamak için tasarlandı', price: 250 },
  { id: 'privacy', name: 'Gizlilik Politikası', description: 'Gizliliği nasıl koruduğunuzu açıklayın', price: 150 },
  { id: 'news', name: 'Haberler', description: 'Bloglama ve alakalı içerik yayınlama', price: 400 },
  { id: 'success', name: 'Başarı Öyküleri', description: 'En iyi örnek olay incelemelerinizi paylaşın', price: 350 },
  { id: 'career', name: 'Kariyer', description: 'İş ilanları yayınlayın', price: 300 },
  { id: 'store', name: 'Mağaza', description: 'E-Ticaret ile daha fazla satış yapın', price: 800 },
  { id: 'events', name: 'Etkinlikler', description: 'Yerinde ve çevrimiçi etkinlikler yayınlayın', price: 400 },
  { id: 'forum', name: 'Forum', description: 'Ziyaretçilere ihtiyaç duydukları bilgileri verin', price: 600 },
  { id: 'chat', name: 'Canlı Sohbet', description: 'Çekişi artırmak için ziyaretçilerle sohbet edin', price: 500 },
  { id: 'education', name: 'e-Eğitim', description: 'Bilgiyi herkese açık olarak veya ücret karşılığında paylaşın', price: 700 },
  { id: 'locator', name: 'Mağaza Bulucu', description: 'Mağazalarınızın haritası ve girişi', price: 450 },
  { id: 'appointment', name: 'Randevu', description: 'Self servis rezervasyon sistemi', price: 600 },
  { id: 'helpdesk', name: 'Yardım Masası', description: 'Ticketing sistemi ile destek', price: 550 }
]