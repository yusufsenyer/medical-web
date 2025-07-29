"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Users, Shield, Globe, Sparkles, CheckCircle, Star } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-purple-50 min-h-screen flex items-center">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/5 rounded-full blur-2xl"></div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-indigo-400 rounded-full animate-ping"></div>
      </div>

      <div className="relative container mx-auto px-4 py-20">
        {/* Centered Hero Content */}
        <div className="text-center max-w-5xl mx-auto space-y-12">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-6 py-3 rounded-full text-sm font-medium border border-blue-200/50 shadow-sm"
          >
            <Sparkles className="h-4 w-4" />
            <span>AI Destekli Yeni Nesil Web Tasarım</span>
            <Zap className="h-4 w-4" />
          </motion.div>

          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
              <span className="block text-gray-900">Profesyonel Web Sitenizi</span>
              <span className="block bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Dakikalar İçinde Oluşturun
              </span>
            </h1>

            <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              AI destekli teknoloji ile mesleğinize özel, mobil uyumlu ve SEO optimizasyonlu web sitesi tasarlayın.
              <span className="font-semibold text-gray-800"> Kod bilgisi gerektirmez!</span>
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/order">
              <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-10 py-6 text-xl font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <Globe className="mr-3 h-6 w-6" />
                Oluşturmaya Başla
                <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Button size="lg" variant="outline" className="group px-10 py-6 text-xl font-semibold rounded-full border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300">
              <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
              Demo İzle
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>SSL Sertifikası</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Mobil Uyumlu</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>SEO Optimizasyonu</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>24/7 Destek</span>
            </div>
          </motion.div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-20 max-w-4xl mx-auto"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <div className="text-gray-600 font-medium">Mutlu Müşteri</div>
                <div className="flex justify-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <div className="text-gray-600 font-medium">Memnuniyet Oranı</div>
                <div className="text-sm text-gray-500">Müşteri Geri Bildirimleri</div>
              </div>

              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <AnimatedCounter end={5} suffix=" dk" />
                </div>
                <div className="text-gray-600 font-medium">Ortalama Süre</div>
                <div className="text-sm text-gray-500">Site Oluşturma</div>
              </div>

              <div className="space-y-2">
                <div className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-gray-600 font-medium">Canlı Destek</div>
                <div className="text-sm text-gray-500">Her Zaman Yanınızda</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-20 relative max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Main mockup */}
            <div className="bg-white rounded-3xl shadow-2xl p-2 mx-auto border border-gray-200/50">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 lg:p-12">
                <div className="space-y-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="h-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full w-1/3"></div>
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                      <div className="h-24 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl"></div>
                      <div className="h-24 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl"></div>
                      <div className="h-24 bg-gradient-to-br from-indigo-100 to-indigo-200 rounded-xl"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <motion.div
              animate={{ y: [-15, 15, -15], rotate: [0, 5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 -right-6 bg-gradient-to-r from-green-400 to-green-500 text-white p-4 rounded-2xl shadow-lg"
            >
              <Shield className="h-8 w-8" />
            </motion.div>

            <motion.div
              animate={{ y: [15, -15, 15], rotate: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-gradient-to-r from-orange-400 to-orange-500 text-white p-4 rounded-2xl shadow-lg"
            >
              <Users className="h-8 w-8" />
            </motion.div>

            <motion.div
              animate={{ y: [-10, 10, -10], rotate: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/2 -right-8 bg-gradient-to-r from-blue-400 to-purple-500 text-white p-3 rounded-xl shadow-lg"
            >
              <Zap className="h-6 w-6" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}