"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Star, Crown, Zap, Sparkles, Rocket, Gem, Infinity } from 'lucide-react'
import { useRef } from 'react'

const pricingPlans = [
  {
    name: 'Starter',
    price: '1.999',
    originalPrice: '2.999',
    description: 'Küçük işletmeler için mükemmel başlangıç',
    features: [
      'AI destekli 5 sayfa tasarım',
      'Mobil-first responsive tasarım',
      '1 yıl premium domain',
      'Temel SEO optimizasyonu',
      'SSL güvenlik sertifikası',
      'Hızlı SSD hosting',
      'E-posta desteği'
    ],

    color: 'from-blue-500 to-cyan-500',
    bgGradient: 'from-blue-900/20 to-cyan-900/20',
    popular: false
  },
  {
    name: 'Professional',
    price: '3.999',
    originalPrice: '5.999',
    description: 'Büyüyen işletmeler için güçlü çözüm',
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

    color: 'from-purple-500 to-pink-500',
    bgGradient: 'from-purple-900/20 to-pink-900/20',
    popular: true
  },
  {
    name: 'Enterprise',
    price: '7.999',
    originalPrice: '11.999',
    description: 'Kurumsal seviye tam çözüm',
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

    color: 'from-orange-500 to-red-500',
    bgGradient: 'from-orange-900/20 to-red-900/20',
    popular: false
  }
]

export function PricingPreview() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"])

  return (
    <section ref={containerRef} className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-30px", "80px"]) }}
          className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-10, -30, -10],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Transparent Pricing • No Hidden Fees</span>
            </div>

            <h2 className="text-4xl lg:text-7xl font-black text-white leading-tight">
              Geleceğe
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Yatırım Yapın
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Tek seferlik ödeme ile
              <span className="text-white font-semibold"> web siteniz sonsuza kadar sizin</span>.
              Gizli ücret yok, aylık abonelik yok.
            </p>

            {/* Special Offer */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-4 rounded-full font-bold shadow-2xl"
            >
              <Rocket className="h-5 w-5" />
              <span>Sınırlı Süre: %33 İndirim!</span>
              <Infinity className="h-5 w-5" />
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
                rotateY: 2,
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
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-bold shadow-2xl border-0">
                    🚀 MOST POPULAR
                  </Badge>
                </motion.div>
              )}

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 h-full relative overflow-hidden group-hover:shadow-2xl group-hover:shadow-purple-500/10">

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${plan.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10 p-8 lg:p-10">
                  {/* Header */}
                  <div className="text-center mb-8">
                    <div className={`w-20 h-20 bg-gradient-to-r ${plan.color} rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                      {plan.name === 'Starter' && <Zap className="h-10 w-10 text-white" />}
                      {plan.name === 'Professional' && <Crown className="h-10 w-10 text-white" />}
                      {plan.name === 'Enterprise' && <Gem className="h-10 w-10 text-white" />}
                    </div>

                    <h3 className="text-2xl lg:text-3xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">
                      {plan.name}
                    </h3>
                    <p className="text-gray-300 mb-8 group-hover:text-white transition-colors">
                      {plan.description}
                    </p>

                    {/* Price */}
                    <div className="mb-8">
                      <div className="flex items-baseline justify-center space-x-2 mb-2">
                        <span className="text-5xl lg:text-6xl font-black text-white">
                          ₺{plan.price}
                        </span>
                        <span className="text-xl text-gray-400 line-through">
                          ₺{plan.originalPrice}
                        </span>
                      </div>
                      <div className="text-green-400 font-bold text-lg mb-2">
                        ₺{parseInt(plan.originalPrice) - parseInt(plan.price)} tasarruf
                      </div>
                      <div className="text-gray-400 text-sm">Tek seferlik ödeme • Sonsuza kadar sizin</div>
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
                        <span className="text-gray-300 group-hover:text-white transition-colors text-sm leading-relaxed">
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
                          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 hover:from-purple-600 hover:via-pink-600 hover:to-purple-600 text-white shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105'
                          : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white shadow-xl hover:shadow-blue-500/25'
                      }`}
                    >
                      {plan.popular ? 'Hemen Başla 🚀' : 'Paketi Seç'}
                    </Button>
                  </Link>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/5 group-hover:via-purple-500/5 group-hover:to-pink-500/5 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-white/20 max-w-5xl mx-auto">
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
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <h3 className="text-3xl lg:text-5xl font-black text-white mb-6">
                30 Gün
                <span className="block bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                  Para İade Garantisi
                </span>
              </h3>

              <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                Memnun kalmazsan,
                <span className="text-white font-semibold"> hiçbir soru sormadan paranı geri alırsın</span>.
                Risk yok, sadece kazanç var.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Star className="mr-3 h-6 w-6" />
                  Ücretsiz Danışmanlık
                </Button>

                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-12 py-6 text-xl font-bold rounded-full transition-all duration-300"
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