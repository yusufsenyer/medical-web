"use client"

import { motion } from 'framer-motion'
import { Zap, Palette, Search, Shield, Clock, Users, Smartphone, Globe, Code, Headphones, ArrowRight, CheckCircle, Brain, Layers, Rocket, Award, TrendingUp, Monitor, Heart, Target, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

const features = [
  {
    icon: Brain,
    title: 'Intelligent Design',
    description: 'AI-powered design suggestions that adapt to your brand and industry',
    number: '01'
  },
  {
    icon: Layers,
    title: 'Flexible Customization',
    description: 'Complete control over every element with intuitive editing tools',
    number: '02'
  },
  {
    icon: Rocket,
    title: 'Lightning Performance',
    description: 'Optimized for speed with global CDN and advanced caching',
    number: '03'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level security with SSL certificates and regular backups',
    number: '04'
  },
  {
    icon: Search,
    title: 'SEO Excellence',
    description: 'Built-in SEO tools to help you rank higher in search results',
    number: '05'
  },
  {
    icon: Globe,
    title: 'Global Reach',
    description: 'Multi-language support and worldwide hosting infrastructure',
    number: '06'
  }
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* Header */}
        <div className="text-center mb-20 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center space-x-3 bg-white border border-gray-200 text-gray-600 px-8 py-4 rounded-full text-sm font-light">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <span>Everything you need to succeed</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-light text-gray-900">
              <span className="block font-extralight">Powerful</span>
              <span className="block font-bold">Features</span>
            </h2>

            <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed font-light">
              Professional tools and features designed to help your business
              <span className="text-gray-900 font-medium"> grow and succeed online</span>
            </p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15, duration: 1 }}
              className="group"
            >
              <div className="bg-white rounded-2xl p-10 hover:shadow-lg transition-all duration-500 border border-gray-100 h-full">

                {/* Number */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-6xl font-extralight text-gray-200 group-hover:text-gray-300 transition-colors duration-300">
                    {feature.number}
                  </span>
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-900 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-medium text-gray-900 group-hover:text-gray-700 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 leading-relaxed font-light group-hover:text-gray-600 transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover Line */}
                <div className="mt-8 h-px bg-gray-100 group-hover:bg-gray-900 transition-colors duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-16 lg:p-20 max-w-4xl mx-auto border border-gray-100">
            <motion.div
              initial={{ scale: 0.9 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.8 }}
              className="space-y-10"
            >
              <h3 className="text-4xl lg:text-6xl font-light text-gray-900">
                <span className="block font-extralight">Ready to</span>
                <span className="block font-bold">Get Started?</span>
              </h3>

              <p className="text-xl lg:text-2xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
                Join thousands of successful businesses and
                <span className="text-gray-900 font-medium"> create your professional website today</span>
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-8">
                <Link href="/order">
                  <Button
                    size="lg"
                    className="group bg-gray-900 hover:bg-gray-800 text-white px-16 py-6 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Start Building
                    <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>

                <Button
                  size="lg"
                  variant="ghost"
                  className="group text-gray-600 hover:text-gray-900 px-16 py-6 text-lg font-medium rounded-full transition-all duration-300"
                >
                  <Monitor className="mr-3 h-5 w-5" />
                  View Examples
                </Button>
              </div>
            </motion.div>
          </div>
        </motion.div>


      </div>
    </section>
  )
}