"use client"

import { motion } from 'framer-motion'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Plus } from 'lucide-react'
import { PRICING_PACKAGES, ADDITIONAL_FEATURES } from '@/lib/constants'
import Link from 'next/link'

export default function PricingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              Web Siteniz İçin{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mükemmel Paketi
              </span>{' '}
              Seçin
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              İhtiyacınıza göre tasarlanmış paketler ve ek özellikler. 
              Profesyonel web sitenizi bugün oluşturmaya başlayın.
            </motion.p>
          </div>
        </section>

        {/* Pricing Packages */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto items-stretch">
              {PRICING_PACKAGES.map((pkg, index) => (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`relative bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 ${
                    pkg.popular ? 'ring-2 ring-purple-500 scale-105 shadow-xl' : 'hover:shadow-xl'
                  }`}
                >
                  {pkg.popular && (
                    <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 text-sm font-semibold">
                      🎯 En Popüler
                    </Badge>
                  )}

                  <div className="p-8 lg:p-10 h-full flex flex-col">
                    {/* Package Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${pkg.color} shadow-lg mb-6`}>
                        <div className="w-10 h-10 bg-white/20 rounded-xl"></div>
                      </div>

                      <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>

                      <div className="mb-6">
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <span className="text-5xl font-bold">₺{pkg.price.toLocaleString()}</span>
                        </div>
                        <div className="text-sm text-gray-500">
                          <span className="line-through">₺{pkg.originalPrice.toLocaleString()}</span>
                          <span className="ml-2 text-green-600 font-semibold">
                            ₺{(pkg.originalPrice - pkg.price).toLocaleString()} tasarruf
                          </span>
                        </div>
                        <div className="text-gray-600 mt-2">Tek seferlik ödeme</div>
                      </div>
                    </div>

                    {/* Features List */}
                    <ul className="space-y-4 mb-8 flex-grow">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <div className="mt-auto">
                      <Link href="/order">
                        <Button
                          className={`w-full py-6 text-lg font-semibold rounded-xl ${
                            pkg.popular
                              ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 transform hover:scale-105'
                              : `bg-gradient-to-r ${pkg.color} hover:opacity-90 transform hover:scale-105`
                          } transition-all duration-200`}
                        >
                          Hemen Başla
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ek{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Özellikler
                </span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Web sitenizi daha da güçlendirin. İhtiyaçlarınıza göre ek özellikler ekleyin.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {ADDITIONAL_FEATURES.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Plus className="h-5 w-5 text-blue-500" />
                      <span className="font-semibold text-gray-900">{feature.name}</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className="text-2xl font-bold text-green-600">
                      ₺{feature.price.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Sıkça Sorulan{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Sorular
                </span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto space-y-6">
              {[
                {
                  question: "Ödeme nasıl yapılır?",
                  answer: "Güvenli ödeme sistemimiz ile kredi kartı veya havale ile ödeme yapabilirsiniz. Taksit seçenekleri mevcuttur."
                },
                {
                  question: "Web sitesi ne kadar sürede hazır olur?",
                  answer: "Pakete göre 3-10 iş günü arasında web siteniz hazır olur. Acil projeler için ekspres teslimat seçenekleri vardır."
                },
                {
                  question: "Sonradan değişiklik yapabilir miyim?",
                  answer: "Elbette! 1 yıl boyunca ücretsiz küçük değişiklikler, büyük değişiklikler için uygun fiyatlı paketlerimiz var."
                },
                {
                  question: "Hosting ve domain dahil mi?",
                  answer: "Evet, 1 yıl hosting ve domain ücretsiz dahil. Sonraki yıllar için uygun fiyatlı yenileme seçeneklerimiz var."
                }
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                  <p className="text-gray-600">{faq.answer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-700">
          <div className="container mx-auto px-4 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl lg:text-4xl font-bold text-white mb-6"
            >
              Web Sitenizi Bugün Oluşturmaya Başlayın
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto"
            >
              Risk almadan test edin, beğenmezseniz para iadesi garantimiz var.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <Link href="/order">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
                  Hemen Başla - Ücretsiz Deneme
                  <ArrowRight className="ml-2 h-5 w-5" />
x                 </Button>
              </Link>
            </motion.div> 
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}