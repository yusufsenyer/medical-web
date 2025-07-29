"use client"

import { motion } from 'framer-motion'
import { Zap, Palette, Search, Shield, Clock, Users, Smartphone, Globe, Code, Headphones, ArrowRight, CheckCircle, Brain, Layers, Rocket, Award, TrendingUp, Monitor } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Brain,
    title: 'AI Powered Design',
    description: 'Yapay zeka teknolojisi ile otomatik tasarım oluşturma ve optimizasyon',
    benefits: ['Akıllı renk paleti seçimi', 'Otomatik layout optimizasyonu', 'İçerik önerisi sistemi'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-50 to-pink-50'
  },
  {
    icon: Layers,
    title: 'Advanced Customization',
    description: 'Her detayı kontrol edin, sınırsız özelleştirme imkanı',
    benefits: ['Drag & drop editör', 'Gerçek zamanlı önizleme', 'Mobil responsive kontrol'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-50 to-cyan-50'
  },
  {
    icon: Rocket,
    title: 'Lightning Fast Performance',
    description: 'Hızlı yükleme ve performans optimizasyonu',
    benefits: ['CDN entegrasyonu', 'Otomatik sıkıştırma', 'Lazy loading teknolojisi'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-50 to-red-50'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Kurumsal seviye güvenlik ve koruma',
    benefits: ['SSL sertifikası', 'DDoS koruması', 'Günlük güvenlik taraması'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-50 to-emerald-50'
  },
  {
    icon: Search,
    title: 'SEO Mastery',
    description: 'Google\'da üst sıralarda yer almak için gelişmiş SEO',
    benefits: ['Otomatik meta tag\'ler', 'Schema markup', 'Site haritası oluşturma'],
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-50 to-purple-50'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Dünya çapında erişilebilirlik ve çoklu dil desteği',
    benefits: ['Çoklu dil sistemi', 'Yerel SEO optimizasyonu', 'Bölgesel hosting'],
    color: 'from-teal-500 to-blue-500',
    bgColor: 'from-teal-50 to-blue-50'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-r from-indigo-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
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
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              <Award className="h-4 w-4" />
              <span>Premium Features</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-gray-900">
              <span className="block">Gelişmiş Özellikler</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Profesyonel Sonuçlar
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Modern teknoloji ve AI destekli özelliklerimiz ile
              <span className="font-semibold text-gray-900"> web sitenizi bir sonraki seviyeye</span> taşıyın
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              whileHover={{
                scale: 1.02,
                y: -5
              }}
              className="group relative"
            >
              <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-xl`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3">
                      {feature.benefits.map((benefit, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1), duration: 0.5 }}
                          className="flex items-start space-x-3 text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full mt-2 flex-shrink-0"></div>
                          <span className="text-sm leading-relaxed">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover Border Effect */}
                <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-indigo-200 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-12 lg:p-16 text-white max-w-4xl mx-auto shadow-2xl">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
                <Rocket className="h-12 w-12 text-white" />
              </div>

              <h3 className="text-3xl lg:text-5xl font-black mb-6">
                Hazır mısınız?
                <span className="block text-cyan-200">
                  Hemen Başlayalım!
                </span>
              </h3>

              <p className="text-xl text-indigo-100 mb-10 max-w-2xl mx-auto">
                Binlerce memnun müşterimize katılın ve
                <span className="font-semibold text-white"> profesyonel web sitenizi bugün oluşturun</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/order">
                  <Button
                    size="lg"
                    className="group bg-white text-indigo-600 hover:bg-indigo-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <TrendingUp className="mr-3 h-6 w-6" />
                    Hemen Başla
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300"
                >
                  <Monitor className="mr-3 h-6 w-6" />
                  Canlı Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg border border-gray-100"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              3 Adımda Web Siteniz Hazır
            </h3>
            <p className="text-gray-600">
              Karmaşık süreçler yok, sadece 3 basit adım
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                title: 'Şablonunuzu Seçin',
                description: 'Mesleğinize uygun şablonu seçin veya AI\'ın önerdiği tasarımı kullanın'
              },
              {
                step: '02',
                title: 'İçeriğinizi Ekleyin',
                description: 'Bilgilerinizi girin, fotoğraflarınızı yükleyin. AI size yardımcı olsun'
              },
              {
                step: '03',
                title: 'Yayınlayın',
                description: 'Tek tıkla sitenizi yayınlayın ve müşterilerinizle buluşun'
              }
            ].map((item, index) => (
              <div key={item.step} className="text-center relative">
                {index < 2 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-blue-200 to-purple-200 transform -translate-y-1/2"></div>
                )}

                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  {item.title}
                </h4>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/order">
              <Button size="lg" className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Hemen Başlayın
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}