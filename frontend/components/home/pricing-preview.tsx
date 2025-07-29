"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Star, Crown, Zap } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Başlangıç',
    price: '1.999',
    originalPrice: '2.999',
    period: 'tek seferlik',
    description: 'Küçük işletmeler ve freelancer\'lar için',
    features: [
      '5 sayfalık web sitesi',
      'Mobil uyumlu responsive tasarım',
      '1 yıl ücretsiz domain',
      'Temel SEO optimizasyonu',
      'SSL sertifikası',
      'E-posta desteği'
    ],
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
    icon: Zap,
    popular: false
  },
  {
    name: 'Profesyonel',
    price: '3.999',
    originalPrice: '5.999',
    period: 'tek seferlik',
    description: 'Büyüyen işletmeler için en popüler seçenek',
    features: [
      '15 sayfalık web sitesi',
      'Blog ve haber sistemi',
      'Online randevu sistemi',
      'Google Analytics entegrasyonu',
      'Sosyal medya entegrasyonu',
      'Canlı chat desteği',
      'Gelişmiş SEO araçları',
      'Öncelikli destek'
    ],
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
    icon: Crown,
    popular: true
  },
  {
    name: 'Kurumsal',
    price: '7.999',
    originalPrice: '11.999',
    period: 'tek seferlik',
    description: 'Büyük şirketler ve kurumsal çözümler',
    features: [
      'Sınırsız sayfa',
      'E-ticaret sistemi',
      'Çoklu dil desteği',
      'Advanced SEO & Analytics',
      'Özel tasarım ve geliştirme',
      'API entegrasyonları',
      'Dedicated hesap yöneticisi',
      '7/24 öncelikli destek'
    ],
    color: 'from-indigo-500 to-indigo-600',
    bgColor: 'from-indigo-50 to-indigo-100',
    icon: Star,
    popular: false
  }
]

export function PricingPreview() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-white via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl"></div>
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
              <Star className="h-4 w-4" />
              <span>Özel Fiyatlar</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-bold">
              <span className="text-gray-900">Uygun Fiyatlı </span>
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Paketler
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              İhtiyacınıza göre tasarlanmış paketler.
              <span className="font-semibold text-gray-800"> Hemen başlayın</span>, istediğiniz zaman upgrade yapın.
            </p>

            {/* Special Offer Badge */}
            <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg">
              <span>🎉</span>
              <span>Sınırlı Süre: %40'a Varan İndirim!</span>
              <span>🎉</span>
            </div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative group ${
                plan.popular ? 'lg:scale-110 lg:-mt-8' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10">
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 text-sm font-bold shadow-lg">
                    🔥 EN POPÜLER
                  </Badge>
                </div>
              )}

              <div className={`bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-2 ${
                plan.popular ? 'border-purple-200' : 'border-gray-100'
              } h-full relative overflow-hidden`}>

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10 p-8 lg:p-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${plan.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <plan.icon className="h-8 w-8 text-white" />
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>

                    {/* Price */}
                    <div className="mb-6">
                      <div className="flex items-center justify-center space-x-2 mb-2">
                        <span className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          ₺{plan.price}
                        </span>
                      </div>
                      <div className="text-sm text-gray-500">
                        <span className="line-through text-lg">₺{plan.originalPrice}</span>
                        <span className="ml-2 text-green-600 font-bold text-lg">
                          ₺{parseInt(plan.originalPrice) - parseInt(plan.price)} tasarruf
                        </span>
                      </div>
                      <div className="text-gray-600 text-sm mt-1">{plan.period}</div>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-green-600" />
                        </div>
                        <span className="text-gray-700 leading-relaxed">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link href="/order">
                    <Button
                      className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 shadow-lg hover:shadow-xl'
                          : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {plan.popular ? 'Hemen Başla 🚀' : 'Paketi Seç'}
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-center mt-20 space-y-8"
        >
          {/* Money Back Guarantee */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-lg border border-gray-100">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-left">
                <h4 className="font-bold text-gray-900">30 Gün Para İade Garantisi</h4>
                <p className="text-gray-600">Memnun kalmazsan, paranı geri al!</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Link href="/pricing">
              <Button variant="outline" size="lg" className="group px-8 py-4 text-lg font-semibold rounded-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50">
                Tüm Paketleri Karşılaştır
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <p className="text-gray-500 text-sm">
              Sorularınız mı var? <a href="#contact" className="text-blue-600 hover:underline font-medium">Bize ulaşın</a>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}