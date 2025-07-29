"use client"

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Play, ArrowRight, Zap, Users, Shield, Globe, Sparkles, CheckCircle, Star, Rocket, Code, Palette, Monitor, Award, TrendingUp, Clock, Heart, Target, Layers } from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      {/* Elegant Background */}
      <div className="absolute inset-0">
        {/* Subtle Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f8fafc_1px,transparent_1px),linear-gradient(to_bottom,#f8fafc_1px,transparent_1px)] bg-[size:60px_60px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>

        {/* Floating Elements */}
        <motion.div
          animate={{
            y: [-20, 20, -20],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 right-32 w-4 h-4 bg-rose-400 rounded-full opacity-60"
        ></motion.div>

        <motion.div
          animate={{
            y: [20, -20, 20],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-64 left-32 w-3 h-3 bg-blue-400 rounded-full opacity-60"
        ></motion.div>

        <motion.div
          animate={{
            y: [-15, 15, -15],
            rotate: [0, 3, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-48 right-48 w-2 h-2 bg-emerald-400 rounded-full opacity-60"
        ></motion.div>
      </div>

      <div className="relative container mx-auto px-4 py-20 flex items-center min-h-screen">
        <div className="w-full max-w-5xl mx-auto text-center">

          {/* Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-12 mb-20"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center space-x-3 bg-gray-50 border border-gray-200 text-gray-700 px-8 py-4 rounded-full text-sm font-medium"
            >
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              <span>Trusted by 10,000+ businesses worldwide</span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </motion.div>

            {/* Main Heading */}
            <div className="space-y-8">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-6xl lg:text-8xl font-light leading-tight text-gray-900"
              >
                <span className="block font-extralight">Beautiful</span>
                <span className="block font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Websites
                </span>
                <span className="block font-extralight text-gray-500">Made Simple</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.8 }}
                className="text-xl lg:text-2xl text-gray-500 leading-relaxed max-w-3xl mx-auto font-light"
              >
                Create stunning, professional websites in minutes with our
                <span className="text-gray-900 font-medium"> AI-powered platform</span>.
                No coding required, unlimited possibilities.
              </p>
            </div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
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
                <Play className="mr-3 h-5 w-5 transition-transform group-hover:scale-110" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Feature Indicators */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="flex flex-wrap justify-center items-center gap-12 text-gray-400"
            >
              {[
                { icon: Heart, text: "No Code Required" },
                { icon: Target, text: "SEO Optimized" },
                { icon: Shield, text: "Secure & Fast" },
                { icon: Layers, text: "Fully Customizable" }
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  className="flex items-center space-x-3 hover:text-gray-600 transition-colors cursor-pointer group"
                >
                  <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-light">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Feature Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20"
          >
            {[
              {
                number: "01",
                title: "Choose Template",
                description: "Select from our curated collection of professional templates"
              },
              {
                number: "02",
                title: "Customize Design",
                description: "Personalize every element with our intuitive drag-and-drop editor"
              },
              {
                number: "03",
                title: "Launch Website",
                description: "Publish your site instantly with our one-click deployment"
              }
            ].map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.8 }}
                className="group text-center"
              >
                <div className="relative mb-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gray-900 transition-colors duration-300">
                    <span className="text-2xl font-light text-gray-400 group-hover:text-white transition-colors duration-300">
                      {step.number}
                    </span>
                  </div>

                  {index < 2 && (
                    <div className="hidden md:block absolute top-8 left-full w-full h-px bg-gray-200"></div>
                  )}
                </div>

                <h3 className="text-xl font-medium text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                  {step.title}
                </h3>
                <p className="text-gray-500 font-light leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Stats */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative pb-20"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.7, duration: 0.8 }}
                className="text-3xl lg:text-4xl font-light text-gray-900 mb-4"
              >
                Trusted by thousands
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.8 }}
                className="text-gray-500 font-light"
              >
                Join the community of successful businesses
              </motion.p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
              {[
                { number: 10000, suffix: "+", label: "Happy Customers" },
                { number: 99, suffix: "%", label: "Satisfaction Rate" },
                { number: 5, suffix: " min", label: "Setup Time" },
                { number: 24, suffix: "/7", label: "Support" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.9 + index * 0.1, duration: 0.8 }}
                  className="group"
                >
                  <div className="text-4xl lg:text-5xl font-light text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                    <AnimatedCounter end={stat.number} suffix={stat.suffix} />
                  </div>
                  <div className="text-gray-500 font-light text-sm uppercase tracking-wider">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}