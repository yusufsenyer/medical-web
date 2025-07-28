"use client"

import { motion } from 'framer-motion'
import { Zap, Palette, Search, Shield, Clock, Users } from 'lucide-react'

const features = [
  {
    icon: Zap,
    title: 'Hızlı ve Kolay',
    description: 'Sürükle-bırak arayüzü ile dakikalar içinde profesyonel web sitesi oluşturun.',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Palette,
    title: 'Profesyonel Tasarım',
    description: 'Mesleğinize özel tasarlanmış şablonlar ve renk paletleri ile öne çıkın.',
    color: 'from-purple-400 to-pink-500'
  },
  {
    icon: Search,
    title: 'SEO Optimized',
    description: 'Google aramalarında üst sıralarda yer alın, daha çok müşteriye ulaşın.',
    color: 'from-blue-400 to-indigo-500'
  },
  {
    icon: Shield,
    title: 'Güvenli Hosting',
    description: 'SSL sertifikası ve günlük yedeklemeler ile verileriniz güvende.',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Clock,
    title: 'Hızlı Teslimat',
    description: '3-10 iş günü arasında web siteniz hazır ve yayında olacak.',
    color: 'from-red-400 to-pink-500'
  },
  {
    icon: Users,
    title: '24/7 Destek',
    description: 'Uzman ekibimiz her zaman yanınızda, sorunlarınızı çözmek için burada.',
    color: 'from-teal-400 to-cyan-500'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Neden{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WebBuilder Pro
            </span>
            ?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Modern teknoloji ile desteklenen özelliklerimiz sayesinde, 
            web sitenizi kolayca yönetebilir ve işinizi büyütebilirsiniz.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative"
            >
              <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 h-full">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.color} shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}