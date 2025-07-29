"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Star, Crown, Zap, Sparkles, Rocket, Award, TrendingUp } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Starter',
    price: '1.999',
    originalPrice: '2.999',
    description: 'Küçük işletmeler ve freelancer\'lar için mükemmel başlangıç',
    features: [
      'AI destekli 5 sayfa tasarım',
      'Mobil-first responsive tasarım',
      '1 yıl premium domain',
      'Temel SEO optimizasyonu',
      'SSL güvenlik sertifikası',
      'Hızlı SSD hosting',
      'E-posta desteği'
    ],
    highlight: 'En Uygun Fiyat',
    color: 'from-blue-500 to-cyan-500',
    popular: false
  },
  {
    name: 'Professional',
    price: '3.999',
    originalPrice: '5.999',
    description: 'Büyüyen işletmeler için güçlü ve kapsamlı çözüm',
    features: [
      'AI destekli 15 sayfa tasarım',
      'Gelişmiş blog sistemi',
      'Online randevu yönetimi',
      'Google Analytics Pro',
      'Sosyal medya entegrasyonu',
      'Canlı chat sistemi',
      'Advanced SEO araçları',
      'Öncelikli 24/7 destek',
      'E-ticaret hazırlığı'
    ],
    highlight: 'En Popüler',
    color: 'from-indigo-500 to-purple-500',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '7.999',
    originalPrice: '11.999',
    description: 'Kurumsal seviye tam çözüm ve özel geliştirme',
    features: [
      'Sınırsız sayfa ve özellik',
      'Tam e-ticaret sistemi',
      'Çoklu dil ve bölge desteği',
      'Enterprise SEO & Analytics',
      'Özel tasarım ve geliştirme',
      'API entegrasyonları',
      'Dedicated hesap yöneticisi',
      'White-label çözümler',
      '7/24 premium destek',
      'Özel hosting altyapısı'
    ],
    highlight: 'Tam Çözüm',
    color: 'from-orange-500 to-red-500',
    popular: false
  }
]

export function PricingPreview() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-indigo-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-indigo-100/30 to-cyan-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-r from-purple-100/30 to-pink-100/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg">
              <Award className="h-4 w-4" />
              <span>Transparent Pricing • No Hidden Fees</span>
            </div>

            <h2 className="text-4xl lg:text-6xl font-black text-gray-900">
              <span className="block">Uygun Fiyatlı</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-cyan-600 bg-clip-text text-transparent">
                Premium Paketler
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed">
              Gizli ücret yok, aylık abonelik yok.
              <span className="font-semibold text-gray-900"> Tek seferlik ödeme ile web siteniz sonsuza kadar sizin</span>.
            </p>

            {/* Special Offer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-xl"
            >
              <Sparkles className="h-5 w-5" />
              <span>Sınırlı Süre: %33 İndirim!</span>
              <TrendingUp className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              whileHover={{
                scale: plan.popular ? 1.02 : 1.05,
                y: -10
              }}
              className={`relative group ${plan.popular ? 'lg:scale-110' : ''}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 text-sm font-bold shadow-xl border-0">
                    🚀 {plan.highlight}
                  </Badge>
                </motion.div>
              )}

              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 h-full relative overflow-hidden">

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10 p-8 lg:p-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    {!plan.popular && (
                      <div className="inline-flex items-center space-x-2 bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                        <Star className="h-4 w-4" />
                        <span>{plan.highlight}</span>
                      </div>
                    )}

                    <h3 className="text-2xl lg:text-3xl font-black text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-8 group-hover:text-gray-700 transition-colors leading-relaxed">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline justify-center space-x-2 mb-2">
                        <span className="text-5xl lg:text-6xl font-black text-gray-900">
                          ₺{plan.price}
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₺{plan.originalPrice}
                        </span>
                      </div>
                      <div className="text-green-600 font-bold text-lg mb-2">
                        ₺{parseInt(plan.originalPrice) - parseInt(plan.price)} tasarruf
                      </div>
                      <div className="text-gray-500 text-sm">Tek seferlik ödeme • Sonsuza kadar sizin</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-4 mb-10">
                    {plan.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index * 0.2) + (idx * 0.05), duration: 0.5 }}
                        className="flex items-start space-x-3"
                      >
                        <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center mt-0.5">
                          <Check className="h-4 w-4 text-white" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-800 transition-colors text-sm leading-relaxed">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href="/order">
                    <Button
                      className={`w-full py-4 text-lg font-bold rounded-2xl transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white shadow-xl hover:shadow-2xl transform hover:scale-105'
                          : 'bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black text-white shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {plan.popular ? 'Hemen Başla 🚀' : 'Paketi Seç'}
                    </Button>
                  </Link>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-indigo-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-indigo-500/5 group-hover:via-purple-500/5 group-hover:to-cyan-500/5 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-12 lg:p-16 max-w-5xl mx-auto shadow-2xl">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                {[
                  { icon: '🔒', title: 'SSL Güvenli', desc: 'Bank seviye güvenlik' },
                  { icon: '⚡', title: 'Hızlı Hosting', desc: 'SSD tabanlı sunucular' },
                  { icon: '🎯', title: 'SEO Ready', desc: 'Google optimizasyonu' },
                  { icon: '💬', title: '24/7 Destek', desc: 'Canlı destek hattı' }
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="text-center"
                  >
                    <div className="text-3xl mb-2">{item.icon}</div>
                    <h4 className="text-white font-bold mb-1">{item.title}</h4>
                    <p className="text-indigo-100 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-3xl lg:text-5xl font-black text-white mb-6">
                30 Gün
                <span className="block text-cyan-200">
                  Para İade Garantisi
                </span>
              </h3>

              <p className="text-xl text-indigo-100 mb-10 max-w-3xl mx-auto">
                Memnun kalmazsan,
                <span className="font-semibold text-white"> hiçbir soru sormadan paranı geri alırsın</span>.
                Risk yok, sadece kazanç var.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="group bg-white text-indigo-600 hover:bg-indigo-50 px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <Star className="mr-3 h-6 w-6" />
                  Ücretsiz Danışmanlık
                </Button>

                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-12 py-6 text-xl font-bold rounded-2xl transition-all duration-300"
                  >
                    Detaylı Karşılaştırma
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}