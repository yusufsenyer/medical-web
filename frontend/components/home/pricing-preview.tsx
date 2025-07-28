"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Temel Plan',
    price: '1.999',
    originalPrice: '2.499',
    description: 'Küçük işletmeler için ideal',
    features: ['Tek sayfalık web sitesi', 'Mobil uyumlu tasarım', '1 yıl domain ücretsiz', 'SEO optimizasyonu'],
    color: 'from-blue-400 to-blue-600',
    popular: false
  },
  {
    name: 'Profesyonel Plan',
    price: '3.999',
    originalPrice: '4.999',
    description: 'En popüler seçenek',
    features: ['10 sayfa web sitesi', 'Blog sistemi', 'Randevu sistemi', 'Google Analytics'],
    color: 'from-purple-500 to-pink-600',
    popular: true
  },
  {
    name: 'Premium Plan',
    price: '6.999',
    originalPrice: '8.999',
    description: 'Kurumsal çözümler',
    features: ['Sınırsız sayfa', 'E-ticaret sistemi', 'Advanced SEO', 'Öncelikli destek'],
    color: 'from-emerald-400 to-cyan-600',
    popular: false
  }
]

export function PricingPreview() {
  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Hesaplı{' '}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Fiyatlandırma
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          >
            İhtiyacınıza göre tasarlanmış paketler. Hemen başlayın, istediğiniz zaman upgrade yapın.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className={`relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular ? 'ring-2 ring-purple-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-4 py-1">
                  En Popüler
                </Badge>
              )}

              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${plan.color} shadow-lg mb-4`}>
                    <div className="w-8 h-8 bg-white/20 rounded-lg"></div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-4xl font-bold">₺{plan.price}</span>
                    <div className="text-sm text-gray-500">
                      <span className="line-through">₺{plan.originalPrice}</span>
                      <span className="ml-2 text-green-600 font-medium">
                        ₺{parseInt(plan.originalPrice) - parseInt(plan.price)} indirim
                      </span>
                    </div>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-3">
                      <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${
                    plan.popular 
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700' 
                      : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                  }`}
                >
                  Başla
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link href="/pricing">
            <Button variant="outline" size="lg" className="group">
              Detaylı Fiyatlar
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}