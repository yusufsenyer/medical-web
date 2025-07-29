"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Check, ArrowRight, Star, Crown, Zap, Sparkles, Rocket, Award, TrendingUp } from 'lucide-react'

const pricingPlans = [
  {
    name: 'Essential',
    price: '1,999',
    originalPrice: '2,999',
    description: 'Perfect for small businesses and startups',
    features: [
      'Up to 5 pages',
      'Mobile responsive design',
      'Free domain for 1 year',
      'Basic SEO optimization',
      'SSL certificate',
      'Email support'
    ],
    popular: false
  },
  {
    name: 'Professional',
    price: '3,999',
    originalPrice: '5,999',
    description: 'Ideal for growing businesses',
    features: [
      'Up to 15 pages',
      'Advanced blog system',
      'Online booking system',
      'Google Analytics Pro',
      'Social media integration',
      'Live chat support',
      'Advanced SEO tools',
      'Priority support'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: '7,999',
    originalPrice: '11,999',
    description: 'Complete solution for large businesses',
    features: [
      'Unlimited pages',
      'Full e-commerce system',
      'Multi-language support',
      'Enterprise analytics',
      'Custom development',
      'API integrations',
      'Dedicated account manager',
      '24/7 premium support'
    ],
    popular: false
  }
]

export function PricingPreview() {
  return (
    <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center space-x-3 bg-gray-50 border border-gray-200 text-gray-600 px-8 py-4 rounded-full text-sm font-light">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Simple pricing • No hidden fees</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-light text-gray-900">
              <span className="block font-extralight">Choose Your</span>
              <span className="block font-bold">Perfect Plan</span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed font-light">
              One-time payment, lifetime access.
              <span className="text-gray-900 font-medium"> No subscriptions, no surprises</span>
            </p>

            {/* Special Offer */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center space-x-3 bg-gray-900 text-white px-10 py-4 rounded-full font-medium"
            >
              <Star className="h-4 w-4" />
              <span>Limited Time: 33% Off All Plans</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto mb-20">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 1 }}
              className={`relative group ${plan.popular ? 'lg:scale-105' : ''}`}
            >
              {plan.popular && (
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10"
                >
                  <Badge className="bg-gray-900 text-white px-6 py-2 text-sm font-medium border-0">
                    Most Popular
                  </Badge>
                </motion.div>
              )}

              <div className="bg-white rounded-2xl hover:shadow-lg transition-all duration-500 border border-gray-100 h-full p-10">

                {/* Header */}
                <div className="text-center mb-10">
                  <h3 className="text-2xl font-medium text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {plan.name}
                  </h3>
                  <p className="text-gray-500 mb-8 font-light leading-relaxed">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline justify-center space-x-3 mb-3">
                      <span className="text-5xl font-light text-gray-900">
                        ₺{plan.price}
                      </span>
                      <span className="text-lg text-gray-400 line-through font-light">
                        ₺{plan.originalPrice}
                      </span>
                    </div>
                    <div className="text-gray-500 text-sm font-light">One-time payment</div>
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 mb-10">
                  {plan.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: (index * 0.2) + (idx * 0.05), duration: 0.5 }}
                      className="flex items-start space-x-3"
                    >
                      <div className="flex-shrink-0 w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center mt-0.5 group-hover:bg-gray-900 transition-colors duration-300">
                        <Check className="h-3 w-3 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-gray-600 font-light text-sm leading-relaxed group-hover:text-gray-700 transition-colors">
                        {feature}
                      </span>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href="/order">
                  <Button
                    className={`w-full py-4 text-lg font-medium rounded-full transition-all duration-300 ${
                      plan.popular
                        ? 'bg-gray-900 hover:bg-gray-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
                        : 'bg-gray-100 hover:bg-gray-900 text-gray-900 hover:text-white border border-gray-200 hover:border-gray-900'
                    }`}
                  >
                    {plan.popular ? 'Get Started' : 'Choose Plan'}
                  </Button>
                </Link>

                {/* Hover Line */}
                <div className="mt-8 h-px bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Guarantee Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="bg-gray-50 rounded-2xl p-16 lg:p-20 max-w-4xl mx-auto border border-gray-100">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <h3 className="text-4xl lg:text-6xl font-light text-gray-900">
                <span className="block font-extralight">30-Day</span>
                <span className="block font-bold">Money Back</span>
                <span className="block font-extralight text-gray-500">Guarantee</span>
              </h3>

              <p className="text-xl lg:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Not satisfied? Get a full refund within 30 days.
                <span className="text-gray-900 font-medium"> No questions asked</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Button
                  size="lg"
                  className="group bg-gray-900 hover:bg-gray-800 text-white px-16 py-6 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Get Started Today
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>

                <Button
                  size="lg"
                  variant="ghost"
                  className="group text-gray-600 hover:text-gray-900 px-16 py-6 text-lg font-medium rounded-full transition-all duration-300"
                >
                  <Star className="mr-3 h-5 w-5" />
                  Free Consultation
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}