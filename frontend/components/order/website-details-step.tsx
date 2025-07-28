"use client"

import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/lib/store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

import { Globe, FileText, Users, Target, Check, ShoppingCart, Building2, Plus, Minus } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { PAGE_OPTIONS } from '@/lib/constants'

// Debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: NodeJS.Timeout
  return ((...args: any[]) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }) as T
}

const websiteDetailsSchema = z.object({
  website_name: z.string().min(2, 'Web sitesi adı en az 2 karakter olmalıdır'),
  website_type: z.enum(['single-page', 'multi-page']),
  target_audience: z.string().min(5, 'Hedef kitle bilgisi en az 5 karakter olmalıdır'),
  purpose: z.string().min(10, 'Web sitesi amacı en az 10 karakter olmalıdır')
})

type WebsiteDetailsData = z.infer<typeof websiteDetailsSchema>

interface WebsiteDetailsStepProps {
  onValidation: (isValid: boolean) => void
}

const websiteTypes = [
  {
    value: 'single-page',
    title: 'Tek Sayfa',
    description: 'Tüm bilgiler tek sayfada, hızlı ve etkili',
    detailedDescription: 'E-ticaret: Online satış platformu. Küçük işletmeler ve kişisel markalar için ideal.',
    icon: FileText,
    price: '₺1,999',
    features: ['Hızlı yükleme', 'Mobil uyumlu', 'SEO optimizasyonu', 'İletişim formu'],
    idealFor: 'Küçük işletmeler, freelancerlar, kişisel markalar'
  },
  {
    value: 'multi-page',
    title: 'Çok Sayfa',
    description: 'Detaylı içerik için birden fazla sayfa',
    detailedDescription: 'Kurumsal: Kapsamlı bilgi ve hizmet sunumu. Büyük işletmeler ve detaylı içerik için ideal.',
    icon: Building2,
    price: '₺3,999',
    features: ['Sınırsız sayfa', 'Blog sistemi', 'Gelişmiş SEO', 'Analitik entegrasyonu'],
    idealFor: 'Kurumsal firmalar, klinikler, büyük işletmeler'
  }
]

export function WebsiteDetailsStep({ onValidation }: WebsiteDetailsStepProps) {
  const { currentOrder, updateOrder, selectedPages, addPage, removePage } = useStore()
  const [selectedType, setSelectedType] = useState<string>(currentOrder.website_type || 'single-page')
  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<WebsiteDetailsData>({
    resolver: zodResolver(websiteDetailsSchema),
    defaultValues: {
      website_name: currentOrder.website_name || '',
      website_type: currentOrder.website_type || 'single-page',
      target_audience: currentOrder.target_audience || '',
      purpose: currentOrder.purpose || ''
    }
  })

  // Debounced update function
  const debouncedUpdate = useCallback(
    debounce((data: any) => {
      if (!isUpdating) {
        setIsUpdating(true)
        updateOrder(data as Partial<typeof currentOrder>)
        setTimeout(() => setIsUpdating(false), 100)
      }
    }, 300),
    [updateOrder, isUpdating]
  )

  useEffect(() => {
    const subscription = form.watch((data) => {
      debouncedUpdate(data)
    })
    return () => subscription.unsubscribe()
  }, [form, debouncedUpdate])

  // Handle website type change separately
  const handleWebsiteTypeChange = (value: string) => {
    if (value !== selectedType) {
      setSelectedType(value)
      form.setValue('website_type', value as 'single-page' | 'multi-page')
    }
  }

  useEffect(() => {
    const isValid = form.formState.isValid && (selectedType !== 'multi-page' || selectedPages.length >= 3)
    onValidation(isValid)
  }, [form.formState.isValid, onValidation, selectedType, selectedPages.length])



  const selectedTypeData = websiteTypes.find(type => type.value === selectedType)

  const handlePageToggle = useCallback((pageId: string, checked: boolean) => {
    if (checked && !selectedPages.includes(pageId)) {
      addPage(pageId)
    } else if (!checked && selectedPages.includes(pageId)) {
      removePage(pageId)
    }
  }, [selectedPages, addPage, removePage])

  const selectedPagesPrice = selectedPages.reduce((sum, pageId) => {
    const page = PAGE_OPTIONS.find(p => p.id === pageId)
    return sum + (page?.price || 0)
  }, 0)

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Web Sitesi Detayları</h2>
        <p className="text-gray-600">
          Web sitenizin temel özelliklerini ve amacını belirleyelim.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="website_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Web Sitesi Adı *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Dr. Ahmet Yılmaz Kliniği, Güzellik Merkezi, vs." 
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Web Sitesi Türü *
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {websiteTypes.map((type) => (
                <motion.div
                  key={type.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card
                    className={`cursor-pointer hover:shadow-lg transition-all duration-300 ${
                      selectedType === type.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleWebsiteTypeChange(type.value)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <motion.div
                          className={`p-3 rounded-lg transition-colors duration-300 ${
                            selectedType === type.value ? 'bg-blue-200' : 'bg-blue-100'
                          }`}
                          animate={{
                            scale: selectedType === type.value ? 1.1 : 1,
                            rotate: selectedType === type.value ? 5 : 0
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <type.icon className={`h-6 w-6 transition-colors duration-300 ${
                            selectedType === type.value ? 'text-blue-700' : 'text-blue-600'
                          }`} />
                        </motion.div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-semibold text-lg">{type.title}</h3>
                              {selectedType === type.value && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <Check className="h-5 w-5 text-green-600" />
                                </motion.div>
                              )}
                            </div>
                            <span className="text-xl font-bold text-green-600">
                              {type.price}
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mb-3">
                            {type.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {type.features.slice(0, 2).map((feature, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">
                            <strong>İdeal:</strong> {type.idealFor}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Seçilen türe özel bilgilendirme */}
          <AnimatePresence mode="wait">
            {selectedTypeData && (
              <motion.div
                key={selectedType}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-blue-200 rounded-lg">
                    <selectedTypeData.icon className="h-6 w-6 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 mb-2">
                      {selectedTypeData.title} - {selectedTypeData.detailedDescription}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Özellikler:</h5>
                        <ul className="space-y-1">
                          {selectedTypeData.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center space-x-2 text-sm text-blue-700"
                            >
                              <Check className="h-4 w-4 text-green-600" />
                              <span>{feature}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-2">Kimler için ideal:</h5>
                        <p className="text-sm text-blue-700">{selectedTypeData.idealFor}</p>
                        <div className="mt-3 p-3 bg-green-100 rounded-lg">
                          <p className="text-sm font-medium text-green-800">
                            Başlangıç fiyatı: {selectedTypeData.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Çok Sayfalı Website Seçenekleri */}
          <AnimatePresence>
            {selectedType === 'multi-page' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-lg border border-purple-200">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-semibold text-purple-900 mb-1">
                        Sayfa Seçenekleri
                      </h4>
                      <p className="text-sm text-purple-700">
                        Web sitenizde bulunmasını istediğiniz sayfaları seçin (minimum 3 sayfa)
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-purple-600">
                        {selectedPages.length} sayfa seçildi
                      </div>
                      {selectedPagesPrice > 0 && (
                        <div className="text-lg font-bold text-purple-800">
                          +₺{selectedPagesPrice.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedPages.length < 3 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-4 p-3 bg-yellow-100 border border-yellow-300 rounded-lg"
                    >
                      <p className="text-sm text-yellow-800">
                        ⚠️ Lütfen en az 3 sayfa seçin. Eksik: {3 - selectedPages.length} sayfa
                      </p>
                    </motion.div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {PAGE_OPTIONS.map((page) => {
                      const isSelected = selectedPages.includes(page.id)

                      return (
                        <motion.div
                          key={page.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className={`cursor-pointer transition-all duration-200 ${
                            isSelected ? 'transform scale-105' : ''
                          }`}
                          onClick={() => handlePageToggle(page.id, !isSelected)}
                        >
                          <Card className={`h-full transition-all duration-300 ${
                            isSelected
                              ? 'ring-2 ring-purple-500 bg-purple-50 shadow-lg'
                              : 'hover:shadow-md border-gray-200'
                          }`}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-3">
                                <div className="flex items-center space-x-3">
                                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                                    isSelected ? 'bg-purple-600 border-purple-600' : 'border-gray-300'
                                  }`}>
                                    {isSelected && <Check className="h-3 w-3 text-white" />}
                                  </div>
                                  <div>
                                    <h5 className="font-semibold text-sm">{page.name}</h5>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-1">
                                  {isSelected ? (
                                    <Minus className="h-4 w-4 text-red-500" />
                                  ) : (
                                    <Plus className="h-4 w-4 text-green-500" />
                                  )}
                                  <span className="text-sm font-bold text-purple-600">
                                    ₺{page.price}
                                  </span>
                                </div>
                              </div>
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {page.description}
                              </p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>

                  {selectedPages.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-green-100 rounded-lg"
                    >
                      <h5 className="font-semibold text-green-900 mb-2">
                        Seçili Sayfalar ({selectedPages.length})
                      </h5>
                      <div className="flex flex-wrap gap-2">
                        <AnimatePresence>
                          {selectedPages.map((pageId) => {
                            const page = PAGE_OPTIONS.find(p => p.id === pageId)
                            return page ? (
                              <motion.div
                                key={pageId}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Badge variant="secondary" className="bg-green-200 text-green-800">
                                  {page.name} - ₺{page.price}
                                </Badge>
                              </motion.div>
                            ) : null
                          })}
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <FormField
            control={form.control}
            name="target_audience"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Users className="h-4 w-4" />
                  <span>Hedef Kitle *</span>
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Örn: 25-50 yaş arası kadınlar, çocuklu aileler, işletme sahipleri"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Target className="h-4 w-4" />
                  <span>Web Sitenizin Amacı *</span>
                </FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Örn: Yeni hastalar kazanmak, hizmetlerimi tanıtmak, online randevu almak, güvenilirliğimi artırmak..."
                    className="min-h-[100px]"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="font-semibold text-green-900 mb-2">Öneriler</h3>
        <div className="text-green-800 text-sm space-y-1">
          <p>• <strong>Tek Sayfa:</strong> Basit hizmetler, küçük işletmeler için idealdir</p>
          <p>• <strong>Çok Sayfa:</strong> Detaylı bilgi, blog, galeriler için uygundur</p>
        </div>
      </div>
    </div>
  )
}