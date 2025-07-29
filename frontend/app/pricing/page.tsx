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
        <section className="bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-4xl lg:text-5xl font-bold mb-6"
            >
              Kliniğiniz İçin{' '}
              <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                İdeal Paketi
              </span>{' '}
              Seçin
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Doktorlar için özel tasarlanmış paketler ve tıbbi özellikler.
              Hasta odaklı profesyonel web sitenizi bugün oluşturun.
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
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -10,
                    scale: pkg.popular ? 1.02 : 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  transition={{
                    delay: index * 0.15,
                    duration: 0.7,
                    ease: "easeOut"
                  }}
                  className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 ${
                    pkg.popular ? 'ring-2 ring-purple-500 scale-105 shadow-xl' : 'hover:shadow-xl'
                  }`}
                >
                  {pkg.popular && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5, type: "spring" }}
                    >
                      <Badge className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6 py-2 text-sm font-semibold animate-pulse">
                        🎯 En Popüler
                      </Badge>
                    </motion.div>
                  )}

                  <div className={`p-8 lg:p-10 h-full ${pkg.popular ? '' : 'flex flex-col'}`}>
                    {/* Package Header */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 0.2, duration: 0.6 }}
                      className="text-center mb-8"
                    >
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{
                          delay: index * 0.15 + 0.4,
                          duration: 0.8,
                          type: "spring",
                          stiffness: 200
                        }}
                        className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${pkg.color} shadow-lg mb-6`}
                      >
                        <div className="w-10 h-10 bg-white/20 rounded-xl"></div>
                      </motion.div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.15 + 0.5, duration: 0.5 }}
                        className="text-2xl font-bold mb-2"
                      >
                        {pkg.name}
                      </motion.h3>

                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.15 + 0.6, duration: 0.6 }}
                        className="mb-6"
                      >
                        <div className="flex items-center justify-center space-x-2 mb-2">
                          <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.15 + 0.7, duration: 0.5 }}
                            className="text-5xl font-bold"
                          >
                            ₺{pkg.price.toLocaleString()}
                          </motion.span>
                        </div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.15 + 0.8, duration: 0.5 }}
                          className="text-sm text-gray-500"
                        >
                          <span className="line-through">₺{pkg.originalPrice.toLocaleString()}</span>
                          <span className="ml-2 text-green-600 font-semibold">
                            ₺{(pkg.originalPrice - pkg.price).toLocaleString()} tasarruf
                          </span>
                        </motion.div>
                        <div className="text-gray-600 mt-2">Tek seferlik ödeme</div>
                      </motion.div>
                    </motion.div>

                    {/* Features List */}
                    <motion.ul
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.15 + 0.9, duration: 0.6 }}
                      className={`space-y-4 mb-8 ${pkg.popular ? '' : 'flex-grow'}`}
                    >
                      {pkg.features.map((feature, idx) => (
                        <motion.li
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          whileHover={{ x: 5, transition: { duration: 0.2 } }}
                          transition={{
                            delay: index * 0.15 + 1.0 + (idx * 0.1),
                            duration: 0.4
                          }}
                          className="flex items-start space-x-3"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{
                              delay: index * 0.15 + 1.0 + (idx * 0.1) + 0.2,
                              duration: 0.3,
                              type: "spring"
                            }}
                          >
                            <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                          </motion.div>
                          <span className="text-gray-700 leading-relaxed">{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>

                    {/* CTA Button */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.15 + 1.5, duration: 0.6 }}
                      className={pkg.popular ? '' : 'mt-auto'}
                    >
                      <Link href="/order">
                        <motion.div
                          whileHover={{
                            scale: 1.05,
                            transition: { duration: 0.2 }
                          }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button
                            className={`w-full py-6 text-lg font-semibold rounded-xl ${
                              pkg.popular
                                ? 'bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700'
                                : `bg-gradient-to-r ${pkg.color} hover:opacity-90`
                            } transition-all duration-300 shadow-lg hover:shadow-xl`}
                          >
                            Hemen Başla
                            <motion.div
                              initial={{ x: 0 }}
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
                              className="ml-2 inline-block"
                            >
                              <ArrowRight className="h-5 w-5" />
                            </motion.div>
                          </Button>
                        </motion.div>
                      </Link>
                    </motion.div>
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
                Tıbbi{' '}
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
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
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{
                    y: -8,
                    scale: 1.05,
                    transition: { duration: 0.3, ease: "easeOut" }
                  }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500"
                >
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center space-x-2">
                      <motion.div
                        initial={{ scale: 0, rotate: -90 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{
                          delay: index * 0.1 + 0.3,
                          duration: 0.5,
                          type: "spring"
                        }}
                      >
                        <Plus className="h-5 w-5 text-teal-500" />
                      </motion.div>
                      <span className="font-semibold text-gray-900">{feature.name}</span>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
                    className="text-right"
                  >
                    <motion.span
                      whileHover={{ scale: 1.1 }}
                      className="text-2xl font-bold text-green-600"
                    >
                      ₺{feature.price.toLocaleString()}
                    </motion.span>
                  </motion.div>
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
                <span className="bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
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
        <section className="py-20 bg-gradient-to-br from-teal-600 to-blue-700">
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
              className="text-xl text-teal-100 mb-8 max-w-2xl mx-auto"
            >
              Risk almadan test edin, beğenmezseniz para iadesi garantimiz var.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >{/*  */}
              <Link href="/order">
                <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold">
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