import Link from 'next/link'
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-teal-500 to-blue-600">
                <span className="text-white font-bold">M</span>
              </div>
              <span className="text-xl font-bold">MedWebify</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Profesyonel web sitesi tasarım platformu.
              Modern tasarım ile işinizi dijitalleştirin.
            </p>
            <div className="flex space-x-4">
              <Facebook className="h-5 w-5 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors" />
              <Twitter className="h-5 w-5 text-gray-400 hover:text-teal-400 cursor-pointer transition-colors" />
              <Instagram className="h-5 w-5 text-gray-400 hover:text-teal-500 cursor-pointer transition-colors" />
              <Linkedin className="h-5 w-5 text-gray-400 hover:text-blue-600 cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Hızlı Linkler</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</Link></li>
              <li><Link href="/pricing" className="text-gray-400 hover:text-white transition-colors">Fiyatlandırma</Link></li>
              <li><Link href="#features" className="text-gray-400 hover:text-white transition-colors">Özellikler</Link></li>
              <li><Link href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Referanslar</Link></li>
              <li><Link href="/order" className="text-gray-400 hover:text-white transition-colors">Sipariş Ver</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Web Tasarım Hizmetleri</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="text-gray-400">Kurumsal Web Tasarımı</span></li>
              <li><span className="text-gray-400">E-ticaret Siteleri</span></li>
              <li><span className="text-gray-400">Blog ve Portföy</span></li>
              <li><span className="text-gray-400">Mobil Uyumluluk</span></li>
              <li><span className="text-gray-400">SEO Optimizasyonu</span></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold mb-4">İletişim</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-teal-500" />
                <span className="text-gray-400">info@medwebify.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-teal-500" />
                <span className="text-gray-400">+90 212 555 0123</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-teal-500" />
                <span className="text-gray-400">İstanbul, Türkiye</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 MedWebify. Tüm hakları saklıdır.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Gizlilik Politikası
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Kullanım Şartları
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}