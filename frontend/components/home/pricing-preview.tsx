"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Star, Crown, Zap, X } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Başlangıç',
    price: '1.999',
    originalPrice: '2.999',
    description: 'Küçük işletmeler için',
    features: [
      '5 sayfalık web sitesi',
      'Mobil uyumlu tasarım',
      '1 yıl domain ücretsiz',
      'Temel SEO',
      'SSL sertifikası'
    ],
    notIncluded: [
      'Blog sistemi',
      'Randevu sistemi',
      'E-ticaret'
    ],
    buttonText: 'Başla',
    popular: false
  },
  {
    name: 'Profesyonel',
    price: '3.999',
    originalPrice: '5.999',
    description: 'En popüler seçenek',
    features: [
      '15 sayfalık web sitesi',
      'Blog ve haber sistemi',
      'Online randevu sistemi',
      'Google Analytics',
      'Sosyal medya entegrasyonu',
      'Canlı chat desteği',
      'Gelişmiş SEO',
      'Öncelikli destek'
    ],
    notIncluded: [
      'E-ticaret sistemi',
      'Çoklu dil desteği'
    ],
    buttonText: 'En Popüler 🔥',
    popular: true
  },
  {
    name: 'Kurumsal',
    price: '7.999',
    originalPrice: '11.999',
    description: 'Büyük şirketler için',
    features: [
      'Sınırsız sayfa',
      'E-ticaret sistemi',
      'Çoklu dil desteği',
      'Advanced SEO & Analytics',
      'Özel tasarım',
      'API entegrasyonları',
      'Dedicated hesap yöneticisi',
      '7/24 öncelikli destek',
      'Özel geliştirme'
    ],
    notIncluded: [],
    buttonText: 'Kurumsal Çözüm',
    popular: false
  }
]

export function PricingPreview() {
  return (
    <section className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              <Star className="h-4 w-4" />
              <span>Şeffaf Fiyatlandırma</span>
            </div>

            <h2 className="text-3xl lg:text-5xl font-black text-gray-900">
              Basit ve
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Uygun Fiyatlar
              </span>
            </h2>

            <p className="text-xl text-gray-600">
              Gizli ücret yok, aylık abonelik yok. Tek seferlik ödeme ile web siteniz sonsuza kadar sizin.
            </p>

            {/* Special Offer */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
              <span>⚡</span>
              <span>Sınırlı Süre: %33 İndirim!</span>
              <span>⚡</span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Table */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-xs font-bold">
                      EN POPÜLER
                    </Badge>
                  </div>
                )}

                <div className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                  plan.popular ? 'border-blue-200 ring-4 ring-blue-50' : 'border-gray-100'
                } h-full`}>

                  <div className="p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-baseline justify-center space-x-2">
                          <span className="text-4xl lg:text-5xl font-black text-gray-900">
                            ₺{plan.price}
                          </span>
                          <span className="text-lg text-gray-500 line-through">
                            ₺{plan.originalPrice}
                          </span>
                        </div>
                        <div className="text-green-600 font-semibold text-sm mt-1">
                          ₺{parseInt(plan.originalPrice) - parseInt(plan.price)} tasarruf
                        </div>
                        <div className="text-gray-500 text-sm mt-2">Tek seferlik ödeme</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-5 h-5 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                            <Check className="h-3 w-3 text-green-600" />
                          </div>
                          <span className="text-gray-700 text-sm">{feature}</span>
                        </div>
                      ))}

                      {plan.notIncluded.map((feature, idx) => (
                        <div key={idx} className="flex items-start space-x-3 opacity-50">
                          <div className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mt-0.5">
                            <X className="h-3 w-3 text-gray-400" />
                          </div>
                          <span className="text-gray-500 text-sm line-through">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Link href="/order">
                      <Button
                        className={`w-full py-3 font-semibold rounded-xl transition-all duration-300 ${
                          plan.popular
                            ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                            : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                      >
                        {plan.buttonText}
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Tüm Paketlerde Dahil
            </h3>
            <p className="text-gray-600">
              Her pakette standart olarak sunduğumuz özellikler
            </p>
          </div>

          <div className="bg-gray-50 rounded-2xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                'Mobil uyumlu tasarım',
                'SSL sertifikası',
                'Hızlı hosting',
                'Teknik destek',
                'SEO optimizasyonu',
                'Google Analytics',
                'Sosyal medya entegrasyonu',
                'Para iade garantisi'
              ].map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-green-600" />
                  </div>
                  <span className="text-gray-700 text-sm font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 lg:p-12 text-white max-w-4xl mx-auto">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Hala Karar Veremediniz mi?
            </h3>
            <p className="text-blue-100 mb-8 text-lg">
              Uzmanlarımızla konuşun, size en uygun paketi birlikte belirleyelim.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-8 py-3"
              >
                Ücretsiz Danışmanlık
              </Button>
              <Link href="/pricing">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-3"
                >
                  Detaylı Karşılaştırma
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}