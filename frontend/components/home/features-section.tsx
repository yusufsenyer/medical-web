"use client"

import { motion } from 'framer-motion'
import { Zap, Palette, Search, Shield, Clock, Users, Smartphone, Globe, Code, Headphones } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'AI Destekli Hızlı Tasarım',
    description: 'Yapay zeka teknolojisi ile dakikalar içinde profesyonel web sitesi oluşturun. Kod bilgisi gerektirmez.',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100'
  },
  {
    icon: Palette,
    title: 'Mesleğe Özel Şablonlar',
    description: 'Doktor, avukat, mimar, berber ve daha fazlası için özel tasarlanmış profesyonel şablonlar.',
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100'
  },
  {
    icon: Smartphone,
    title: 'Mobil Uyumlu Tasarım',
    description: 'Tüm cihazlarda mükemmel görünüm. Responsive tasarım ile her ekranda profesyonel görünüm.',
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100'
  },
  {
    icon: Search,
    title: 'SEO Optimizasyonu',
    description: 'Google aramalarında üst sıralarda yer alın. Yerleşik SEO araçları ile daha fazla müşteriye ulaşın.',
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100'
  },
  {
    icon: Shield,
    title: 'Güvenli ve Hızlı Hosting',
    description: 'SSL sertifikası, günlük yedekleme ve hızlı sunucular ile verileriniz güvende ve siteniz hızlı.',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'from-emerald-50 to-emerald-100'
  },
  {
    icon: Globe,
    title: 'Özel Domain Desteği',
    description: 'Kendi domain adınızı kullanın veya bizden ücretsiz subdomain alın. Profesyonel görünüm garantili.',
    color: 'from-cyan-500 to-cyan-600',
    bgColor: 'from-cyan-50 to-cyan-100'
  },
  {
    icon: Code,
    title: 'Kolay İçerik Yönetimi',
    description: 'Kullanıcı dostu panel ile içeriklerinizi kolayca güncelleyin. Teknik bilgi gerektirmez.',
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100'
  },
  {
    icon: Headphones,
    title: '7/24 Canlı Destek',
    description: 'Uzman ekibimiz her zaman yanınızda. Canlı chat, telefon ve e-posta desteği ile sorunlarınızı çözüyoruz.',
    color: 'from-pink-500 to-pink-600',
    bgColor: 'from-pink-50 to-pink-100'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 via-white to-blue-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Zap className="h-4 w-4" />
              <span>Özelliklerimiz</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gray-900">Neden </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                WebBuilder Pro
              </span>
              <span className="text-gray-900">?</span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Modern teknoloji ve AI destekli özelliklerimiz sayesinde,
              <span className="font-semibold text-gray-800"> web sitenizi kolayca yönetebilir</span> ve işinizi büyütebilirsiniz.
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-white/50 h-full relative overflow-hidden">
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-200 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl p-12 text-white max-w-4xl mx-auto shadow-2xl">
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Hemen Başlayın ve Farkı Görün!
            </h3>
            <p className="text-xl mb-8 text-blue-100">
              Binlerce memnun müşterimize katılın ve profesyonel web sitenizi bugün oluşturun.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-10 py-4 rounded-full font-bold text-lg hover:bg-blue-50 transition-colors duration-300 shadow-lg"
            >
              Ücretsiz Denemeye Başla
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}