"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Users, Shield } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 lg:py-32">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium"
              >
                <Zap className="h-4 w-4" />
                <span>AI Destekli Teknoloji</span>
              </motion.div>

              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Profesyonel Web Sitenizi{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Dakikalar İçinde
                </span>{' '}
                Oluşturun
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                AI destekli teknoloji ile mesleğinize özel web sitesi tasarlayın. 
                Kod bilgisi gerektirmez, dakikalar içinde yayında!
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/order">
                <Button size="lg" className="group bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-6 text-lg font-semibold">
                  Oluşturmaya Başla
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              
              <Button size="lg" variant="outline" className="group px-8 py-6 text-lg font-semibold">
                <Play className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Demo İzle
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter end={10000} suffix="+" />
                </div>
                <div className="text-sm text-gray-600 mt-1">Mutlu Müşteri</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter end={99} suffix="%" />
                </div>
                <div className="text-sm text-gray-600 mt-1">Memnuniyet</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900">
                  <AnimatedCounter end={24} suffix="/7" />
                </div>
                <div className="text-sm text-gray-600 mt-1">Destek</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Visual */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main mockup */}
              <div className="bg-white rounded-2xl shadow-2xl p-1 mx-auto max-w-md lg:max-w-lg">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-8">
                  <div className="space-y-4">
                    <div className="h-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded w-3/4"></div>
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded w-full"></div>
                      <div className="h-2 bg-gray-300 rounded w-5/6"></div>
                      <div className="h-2 bg-gray-300 rounded w-4/6"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <div className="h-20 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"></div>
                      <div className="h-20 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg"
              >
                <Shield className="h-6 w-6" />
              </motion.div>

              <motion.div
                animate={{ y: [10, -10, 10] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-4 -left-4 bg-orange-500 text-white p-3 rounded-full shadow-lg"
              >
                <Users className="h-6 w-6" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}