"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Users, Shield, Globe, Sparkles, CheckCircle, Star, Rocket, Code, Palette, Monitor } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Geometric Background */}
      <div className="absolute inset-0">
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Floating Geometric Shapes */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-20 w-32 h-32 border-2 border-teal-200 rounded-full opacity-30"
        ></motion.div>

        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute top-40 right-32 w-24 h-24 bg-gradient-to-r from-teal-200 to-blue-200 rounded-lg opacity-20"
        ></motion.div>

        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-40 left-32 w-16 h-16 bg-gradient-to-r from-teal-300 to-blue-300 rounded-full opacity-25"
        ></motion.div>
      </div>

      <div className="relative container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-teal-50 border border-teal-200 text-teal-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Rocket className="h-4 w-4" />
                <span>Doktorlar İçin Özel Web Tasarım Platformu</span>
              </motion.div>

              {/* Main Heading */}
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-black leading-tight text-gray-900">
                  Kliniğinizin
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-blue-600">
                    Dijital Kimliği
                  </span>
                  Burada Başlar
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                  Doktorlar için özel tasarlanmış web sitesi platformu.
                  <span className="font-semibold text-gray-900"> Hasta odaklı tasarım</span>,
                  profesyonel görünüm!
                </p>
              </div>

              {/* Features List */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Code, text: "Kod Gerektirmez" },
                  { icon: Palette, text: "Profesyonel Tasarım" },
                  { icon: Monitor, text: "Mobil Uyumlu" },
                  { icon: Zap, text: "Hızlı Kurulum" }
                ].map((feature, index) => (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                    className="flex items-center space-x-3"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link href="/auth/signup">
                  <Button size="lg" className="group bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300">
                    Kliniğinizi Dijitalleştirin
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Button size="lg" variant="outline" className="group px-8 py-4 text-lg font-semibold border-2 border-gray-300 hover:border-teal-300 hover:bg-teal-50 transition-all duration-300">
                  <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                  Demo İzle
                </Button>
              </motion.div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                className="flex items-center space-x-6 text-sm text-gray-500"
              >
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>SSL Güvenli</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>24/7 Destek</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Para İade Garantisi</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Visual */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              {/* Main Device Mockup */}
              <div className="relative">
                {/* Desktop Mockup */}
                <div className="bg-gray-900 rounded-t-2xl p-2 shadow-2xl">
                  <div className="bg-white rounded-t-xl overflow-hidden">
                    {/* Browser Bar */}
                    <div className="bg-gray-100 px-4 py-3 flex items-center space-x-2">
                      <div className="flex space-x-2">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="flex-1 bg-white rounded-md px-3 py-1 text-xs text-gray-500">
                        https://yourwebsite.com
                      </div>
                    </div>

                    {/* Website Content */}
                    <div className="p-8 space-y-6">
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="w-32 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded"></div>
                        <div className="flex space-x-2">
                          <div className="w-16 h-6 bg-gray-200 rounded"></div>
                          <div className="w-16 h-6 bg-teal-500 rounded"></div>
                        </div>
                      </div>

                      {/* Hero Content */}
                      <div className="space-y-4">
                        <div className="w-3/4 h-6 bg-gray-800 rounded"></div>
                        <div className="w-1/2 h-4 bg-gray-400 rounded"></div>
                        <div className="w-24 h-8 bg-gradient-to-r from-teal-500 to-blue-600 rounded"></div>
                      </div>

                      {/* Cards */}
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-20 bg-gradient-to-br from-teal-100 to-teal-200 rounded-lg"></div>
                        <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                        <div className="h-20 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-lg"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Mockup */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -bottom-8 -right-8 w-32 bg-gray-900 rounded-2xl p-1 shadow-xl"
                >
                  <div className="bg-white rounded-xl overflow-hidden">
                    <div className="bg-gray-100 h-6 flex items-center justify-center">
                      <div className="w-8 h-1 bg-gray-400 rounded-full"></div>
                    </div>
                    <div className="p-3 space-y-2">
                      <div className="w-full h-2 bg-gradient-to-r from-teal-500 to-blue-600 rounded"></div>
                      <div className="w-3/4 h-1 bg-gray-300 rounded"></div>
                      <div className="w-1/2 h-1 bg-gray-300 rounded"></div>
                      <div className="grid grid-cols-2 gap-1 mt-2">
                        <div className="h-8 bg-teal-100 rounded"></div>
                        <div className="h-8 bg-blue-100 rounded"></div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [-10, 10, -10] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg"
                >
                  <Globe className="h-8 w-8 text-white" />
                </motion.div>

                <motion.div
                  animate={{ y: [10, -10, 10] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 -left-8 w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg"
                >
                  <Shield className="h-6 w-6 text-white" />
                </motion.div>
              </div>
            </motion.div>
          </div>
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
          <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-3xl p-8 lg:p-12 text-white shadow-2xl">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={5000} suffix="+" />
                </div>
                <div className="text-teal-100 font-medium">Mutlu Doktor</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={98} suffix="%" />
                </div>
                <div className="text-teal-100 font-medium">Hasta Memnuniyeti</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={3} suffix=" dk" />
                </div>
                <div className="text-teal-100 font-medium">Randevu Süresi</div>
              </div>

              <div className="space-y-2">
                <div className="text-3xl lg:text-4xl font-bold">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-teal-100 font-medium">Tıbbi Destek</div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}