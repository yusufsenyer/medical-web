"use client"

import { motion } from 'framer-motion'
import { Zap, Palette, Search, Shield, Clock, Users, Smartphone, Globe, Code, Headphones, ArrowRight, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const mainFeatures = [
  {
    icon: Zap,
    title: 'AI Destekli Tasarım',
    description: 'Yapay zeka ile dakikalar içinde profesyonel web sitesi',
    details: ['Otomatik tasarım önerileri', 'Akıllı renk paleti seçimi', 'İçerik optimizasyonu']
  },
  {
    icon: Palette,
    title: 'Mesleğe Özel Şablonlar',
    description: '50+ sektöre özel hazır şablon',
    details: ['Doktor, avukat, berber şablonları', 'Sektörel içerik önerileri', 'Özelleştirilebilir tasarımlar']
  },
  {
    icon: Smartphone,
    title: 'Mobil Uyumlu',
    description: 'Tüm cihazlarda mükemmel görünüm',
    details: ['Responsive tasarım', 'Hızlı yükleme', 'Touch-friendly arayüz']
  }
]

const additionalFeatures = [
  { icon: Search, title: 'SEO Optimizasyonu', description: 'Google\'da üst sıralarda yer alın' },
  { icon: Shield, title: 'Güvenli Hosting', description: 'SSL sertifikası ve günlük yedekleme' },
  { icon: Globe, title: 'Özel Domain', description: 'Kendi domain adınızı kullanın' },
  { icon: Code, title: 'Kolay Yönetim', description: 'Teknik bilgi gerektirmez' },
  { icon: Headphones, title: '24/7 Destek', description: 'Uzman ekibimiz her zaman yanınızda' },
  { icon: Clock, title: 'Hızlı Teslimat', description: '5 dakikada siteniz hazır' }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">
              Tıbbi Özellikler,
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                Hasta Odaklı Tasarım
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Kliniğiniz için ihtiyacınız olan tüm tıbbi özellikler tek platformda
            </p>
          </motion.div>
        </div>

        {/* Main Features */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                {/* Icon */}
                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-teal-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Details */}
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-center space-x-3 text-gray-600">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Daha Fazla Özellik
            </h3>
            <p className="text-gray-600">
              Web sitenizi başarıya taşıyacak ek özellikler
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group"
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-teal-200">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center group-hover:bg-teal-200 transition-colors duration-300">
                      <feature.icon className="h-6 w-6 text-teal-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-teal-600 transition-colors">
                        {feature.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-teal-200 to-blue-200 transform -translate-y-1/2"></div>
                )}

                <div className="w-16 h-16 bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
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
            <Link href="/auth/signup">
              <Button size="lg" className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                Kliniğinizi Dijitalleştirin
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}