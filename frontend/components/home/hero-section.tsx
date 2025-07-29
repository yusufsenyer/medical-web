"use client"

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Users, Shield, Globe, Sparkles, CheckCircle, Star, Rocket, Code, Palette, Monitor, Heart, Award, TrendingUp } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'
import { useRef } from 'react'

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section ref={containerRef} className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <motion.div
          style={{ y }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/30 to-purple-600/30 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]) }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-600/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [360, 180, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, -100, -20],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}

        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <motion.div
        style={{ opacity }}
        className="relative container mx-auto px-4 py-20 flex items-center min-h-screen"
      >
        <div className="w-full max-w-6xl mx-auto text-center">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8 mb-16"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 py-3 rounded-full text-sm font-medium"
            >
              <Sparkles className="h-4 w-4 text-yellow-400" />
              <span>AI Powered • No Code • Professional</span>
              <Rocket className="h-4 w-4 text-blue-400" />
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl lg:text-8xl font-black leading-tight"
              >
                <span className="text-white">Hayalinizdeki</span>
                <br />
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Web Sitesi
                </span>
                <br />
                <span className="text-white">Artık Gerçek</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-xl lg:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto"
              >
                Yapay zeka teknolojisi ile
                <span className="text-white font-semibold"> dakikalar içinde profesyonel web sitesi</span> oluşturun.
                Kod bilgisi gerektirmez, sınırsız özelleştirme imkanı!
              </motion.p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/order">
                <Button
                  size="lg"
                  className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <Rocket className="mr-3 h-6 w-6" />
                  Hemen Başla
                  <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Button
                size="lg"
                variant="outline"
                className="group bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-12 py-6 text-xl font-bold rounded-full transition-all duration-300"
              >
                <Play className="mr-3 h-6 w-6 transition-transform group-hover:scale-110" />
                Canlı Demo
              </Button>
            </motion.div>
          </motion.div>

          {/* Interactive Feature Cards */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: Zap,
                title: "5 Dakikada Hazır",
                description: "AI ile otomatik tasarım",
                color: "from-yellow-400 to-orange-500",
                delay: 0
              },
              {
                icon: Palette,
                title: "Sınırsız Özelleştirme",
                description: "Her detayı kontrol edin",
                color: "from-purple-400 to-pink-500",
                delay: 0.1
              },
              {
                icon: TrendingUp,
                title: "SEO Optimizasyonu",
                description: "Google'da üst sıralarda",
                color: "from-green-400 to-blue-500",
                delay: 0.2
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 + feature.delay, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 5,
                }}
                className="group relative"
              >
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:border-white/40 transition-all duration-300 h-full">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {React.createElement(feature.icon, { className: "h-8 w-8 text-white" })}
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-wrap justify-center items-center gap-8 text-gray-300 mb-16"
          >
            {[
              { icon: Shield, text: "SSL Güvenli" },
              { icon: Award, text: "Ödüllü Tasarım" },
              { icon: Heart, text: "%99 Memnuniyet" },
              { icon: Users, text: "10K+ Müşteri" }
            ].map((item, index) => (
              <motion.div
                key={item.text}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.3 + index * 0.1, duration: 0.5 }}
                className="flex items-center space-x-2 hover:text-white transition-colors cursor-pointer"
              >
                {React.createElement(item.icon, { className: "h-5 w-5 text-blue-400" })}
                <span className="font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Floating Stats */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-4"
      >
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 lg:p-8 border border-white/20 shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-black text-white">
                <AnimatedCounter end={10000} suffix="+" />
              </div>
              <div className="text-blue-300 font-medium">Mutlu Müşteri</div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-black text-white">
                <AnimatedCounter end={99} suffix="%" />
              </div>
              <div className="text-purple-300 font-medium">Memnuniyet</div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-black text-white">
                <AnimatedCounter end={5} suffix=" dk" />
              </div>
              <div className="text-pink-300 font-medium">Kurulum</div>
            </div>

            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-black text-white">
                <AnimatedCounter end={24} suffix="/7" />
              </div>
              <div className="text-green-300 font-medium">Destek</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}