"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Users, Shield, Globe, Sparkles, CheckCircle, Star, Rocket, Code, Palette, Monitor, Award, TrendingUp, Clock } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 overflow-hidden">
      {/* Modern Background Pattern */}
      <div className="absolute inset-0">
        {/* Dot Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(59,130,246,0.15)_1px,transparent_0)] bg-[size:24px_24px]"></div>

        {/* Gradient Orbs */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
        ></motion.div>

        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.7, 0.4]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-r from-cyan-400/20 to-indigo-600/20 rounded-full blur-3xl"
        ></motion.div>
      </div>

      <div className="relative container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="w-full max-w-6xl mx-auto text-center">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm border border-indigo-200 text-indigo-700 px-6 py-3 rounded-full text-sm font-medium shadow-lg"
            >
              <Sparkles className="h-4 w-4" />
              <span>AI Powered • Professional • Fast</span>
              <Star className="h-4 w-4" />
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black leading-tight text-gray-900">
                <span className="block">Mükemmel Web Sitesi</span>
                <span className="block bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Artık Hayal Değil
                </span>
              </h1>

              <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
                Yapay zeka teknolojisi ile
                <span className="font-semibold text-gray-900"> profesyonel web sitenizi dakikalar içinde</span> oluşturun.
                Kod bilgisi gerektirmez, sınırsız özelleştirme imkanı!
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/order">
                <Button size="lg" className="group bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white px-12 py-6 text-xl font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                  <Rocket className="mr-3 h-6 w-6" />
                  Hemen Başla
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Button size="lg" variant="outline" className="group px-12 py-6 text-xl font-bold rounded-2xl border-2 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300">
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                Canlı Demo
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-wrap justify-center items-center gap-8 text-gray-600"
            >
              {[
                { icon: Shield, text: "SSL Güvenli" },
                { icon: Award, text: "Ödüllü Tasarım" },
                { icon: Users, text: "10K+ Müşteri" },
                { icon: Clock, text: "5 Dk Kurulum" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                  className="flex items-center space-x-2 hover:text-indigo-600 transition-colors cursor-pointer"
                >
                  <item.icon className="h-5 w-5 text-indigo-500" />
                  <span className="font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: Zap,
                title: "AI Destekli Tasarım",
                description: "Yapay zeka ile otomatik tasarım oluşturma",
                color: "from-yellow-400 to-orange-500"
              },
              {
                icon: Palette,
                title: "Sınırsız Özelleştirme",
                description: "Her detayı istediğiniz gibi düzenleyin",
                color: "from-purple-400 to-pink-500"
              },
              {
                icon: TrendingUp,
                title: "SEO Optimizasyonu",
                description: "Google'da üst sıralarda yer alın",
                color: "from-green-400 to-blue-500"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  y: -5
                }}
                className="group relative"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Binlerce Memnun Müşteri
              </h3>
              <p className="text-indigo-100">
                Güvenilir platform, kanıtlanmış sonuçlar
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <div className="text-indigo-100 font-medium">Mutlu Müşteri</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-300 fill-current" />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <div className="text-indigo-100 font-medium">Memnuniyet Oranı</div>
                <div className="text-xs text-indigo-200">Müşteri Geri Bildirimleri</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={5} suffix=" dk" />
                </div>
                <div className="text-indigo-100 font-medium">Ortalama Kurulum</div>
                <div className="text-xs text-indigo-200">Hızlı ve Kolay</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-indigo-100 font-medium">Canlı Destek</div>
                <div className="text-xs text-indigo-200">Her Zaman Yanınızda</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}