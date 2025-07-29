"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { Zap, Palette, Search, Shield, Clock, Users, Smartphone, Globe, Code, Headphones, ArrowRight, CheckCircle, Sparkles, Brain, Layers, Rocket } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useRef } from 'react'

const features = [
  {
    icon: Brain,
    title: 'AI Powered Design',
    description: 'Yapay zeka teknolojisi ile otomatik tasarım oluşturma',
    details: ['Akıllı renk paleti seçimi', 'Otomatik layout optimizasyonu', 'İçerik önerisi sistemi'],
    color: 'from-purple-500 to-pink-500',
    bgColor: 'from-purple-900/20 to-pink-900/20'
  },
  {
    icon: Layers,
    title: 'Advanced Customization',
    description: 'Her detayı kontrol edin, sınırsız özelleştirme imkanı',
    details: ['Drag & drop editör', 'Gerçek zamanlı önizleme', 'Mobil responsive kontrol'],
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'from-blue-900/20 to-cyan-900/20'
  },
  {
    icon: Rocket,
    title: 'Lightning Fast',
    description: 'Hızlı yükleme ve performans optimizasyonu',
    details: ['CDN entegrasyonu', 'Otomatik sıkıştırma', 'Lazy loading teknolojisi'],
    color: 'from-orange-500 to-red-500',
    bgColor: 'from-orange-900/20 to-red-900/20'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Kurumsal seviye güvenlik ve koruma',
    details: ['SSL sertifikası', 'DDoS koruması', 'Günlük güvenlik taraması'],
    color: 'from-green-500 to-emerald-500',
    bgColor: 'from-green-900/20 to-emerald-900/20'
  },
  {
    icon: Search,
    title: 'SEO Mastery',
    description: 'Google\'da üst sıralarda yer almak için gelişmiş SEO',
    details: ['Otomatik meta tag\'ler', 'Schema markup', 'Site haritası oluşturma'],
    color: 'from-indigo-500 to-purple-500',
    bgColor: 'from-indigo-900/20 to-purple-900/20'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Dünya çapında erişilebilirlik ve çoklu dil desteği',
    details: ['Çoklu dil sistemi', 'Yerel SEO optimizasyonu', 'Bölgesel hosting'],
    color: 'from-teal-500 to-blue-500',
    bgColor: 'from-teal-900/20 to-blue-900/20'
  }
]

export function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"])

  return (
    <section ref={containerRef} id="features" className="py-20 lg:py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          style={{ y }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["-50px", "150px"]) }}
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
        />

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
            className="space-y-6"
          >
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium">
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>Next Generation Features</span>
            </div>

            <h2 className="text-4xl lg:text-7xl font-black text-white leading-tight">
              Geleceğin
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Web Teknolojisi
              </span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed">
              Yapay zeka destekli özellikler ile
              <span className="text-white font-semibold"> web sitenizi bir sonraki seviyeye</span> taşıyın
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
                scale: 1.05,
                rotateY: 5,
              }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 h-full relative overflow-hidden">

                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.color} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                    <feature.icon className="h-10 w-10 text-white" />
                  </div>

                  {/* Content */}
                  <div className="space-y-6">
                    <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {feature.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-3">
                      {feature.details.map((detail, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: (index * 0.1) + (idx * 0.1), duration: 0.5 }}
                          className="flex items-center space-x-3 text-gray-400 group-hover:text-gray-200 transition-colors duration-300"
                        >
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex-shrink-0"></div>
                          <span className="text-sm">{detail}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Demo Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-3xl p-12 lg:p-16 border border-white/20 max-w-4xl mx-auto">
            <motion.div
              initial={{ scale: 0.8 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <Rocket className="h-12 w-12 text-white" />
              </div>

              <h3 className="text-3xl lg:text-5xl font-black text-white mb-6">
                Hazır mısınız?
                <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Geleceği Yaşayın
                </span>
              </h3>

              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
                Yapay zeka destekli web tasarım deneyimini şimdi yaşayın.
                <span className="text-white font-semibold"> Ücretsiz demo</span> ile başlayın.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Link href="/order">
                  <Button
                    size="lg"
                    className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                  >
                    <Sparkles className="mr-3 h-6 w-6" />
                    AI ile Başla
                    <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="outline"
                  className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-12 py-6 text-xl font-bold rounded-full transition-all duration-300"
                >
                  <Globe className="mr-3 h-6 w-6" />
                  Canlı Demo
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
        <div className="absolute bottom-20 left-20 w-2 h-2 bg-pink-400 rounded-full animate-ping"></div>
      </div>
    </section>
  )
}