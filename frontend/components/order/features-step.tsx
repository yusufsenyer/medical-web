"use client"

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { Card, CardContent } from '@/components/ui/card'

import { Badge } from '@/components/ui/badge'
import { ADDITIONAL_FEATURES } from '@/lib/constants'
import { Plus, Minus, TrendingUp, TrendingDown, Check } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeaturesStepProps {
  onValidation: (isValid: boolean) => void
}

export function FeaturesStep({ onValidation }: FeaturesStepProps) {
  const { selectedFeatures, addFeature, removeFeature, currentOrder, calculateTotal } = useStore()
  const [previousTotal, setPreviousTotal] = useState(0)
  const [priceChange, setPriceChange] = useState<'increase' | 'decrease' | null>(null)

  useEffect(() => {
    // Bu adım isteğe bağlı, her zaman geçerli
    onValidation(true)
  }, [onValidation])

  useEffect(() => {
    // Real-time fiyat hesaplama - sadece feature sayısı değiştiğinde
    const timer = setTimeout(() => {
      calculateTotal()
    }, 100)

    return () => clearTimeout(timer)
  }, [selectedFeatures.length])

  const handleFeatureToggle = (feature: any, checked: boolean) => {
    const featureObj = {
      id: feature.id,
      name: feature.name,
      description: feature.name,
      price: feature.price,
      category: feature.category,
      is_active: true
    }

    const currentTotal = totalSelectedPrice

    if (checked) {
      addFeature(featureObj)
      setPriceChange('increase')
    } else {
      removeFeature(feature.id)
      setPriceChange('decrease')
    }

    setPreviousTotal(currentTotal)

    // Reset price change animation after 1 second
    setTimeout(() => setPriceChange(null), 1000)
  }

  const isFeatureSelected = (featureId: string) => {
    return selectedFeatures.some(f => f.id === featureId)
  }

  // Kategorilere göre özellikler
  const categorizedFeatures = ADDITIONAL_FEATURES.reduce((acc, feature) => {
    if (!acc[feature.category]) {
      acc[feature.category] = []
    }
    acc[feature.category].push(feature)
    return acc
  }, {} as Record<string, typeof ADDITIONAL_FEATURES>)

  const categoryNames = {
    design: 'Tasarım',
    security: 'Güvenlik',
    communication: 'İletişim',
    marketing: 'Pazarlama',
    functionality: 'Fonksiyonellik',
    hosting: 'Hosting',
    support: 'Destek'
  }

  const totalSelectedPrice = selectedFeatures.reduce((sum, feature) => sum + feature.price, 0)
  const basePrice = currentOrder.website_type === 'single-page' ? 1999 : 3999
  const grandTotal = basePrice + totalSelectedPrice

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Ek Özellikler</h2>
        <p className="text-gray-600">
          Web sitenizi daha güçlü hale getiren ek özellikler seçebilirsiniz. Bu adım isteğe bağlıdır.
        </p>
      </div>

      {/* Real-time Fiyat Özeti */}
      <motion.div
        layout
        className="sticky top-4 z-10"
      >
        <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 shadow-lg">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-blue-900 mb-1">
                  Fiyat Özeti
                </h3>
                <p className="text-sm text-blue-700">
                  {selectedFeatures.length} özellik seçildi
                </p>
              </div>
              <motion.div
                animate={{
                  scale: priceChange ? 1.1 : 1,
                  color: priceChange === 'increase' ? '#10b981' : priceChange === 'decrease' ? '#ef4444' : '#1f2937'
                }}
                transition={{ duration: 0.3 }}
                className="text-right"
              >
                {priceChange && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="flex items-center space-x-1 text-sm mb-1"
                  >
                    {priceChange === 'increase' ? (
                      <TrendingUp className="h-4 w-4 text-green-600" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600" />
                    )}
                    <span className={priceChange === 'increase' ? 'text-green-600' : 'text-red-600'}>
                      {priceChange === 'increase' ? 'Arttı' : 'Azaldı'}
                    </span>
                  </motion.div>
                )}
                <div className="text-2xl font-bold text-blue-900">
                  ₺{grandTotal.toLocaleString()}
                </div>
              </motion.div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Temel paket:</span>
                <span className="font-medium">₺{basePrice.toLocaleString()}</span>
              </div>
              {selectedFeatures.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Ek özellikler:</span>
                  <motion.span
                    key={totalSelectedPrice}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="font-medium text-blue-600"
                  >
                    ₺{totalSelectedPrice.toLocaleString()}
                  </motion.span>
                </div>
              )}
              <hr className="border-blue-200" />
              <div className="flex justify-between font-bold text-lg">
                <span>Toplam:</span>
                <motion.span
                  key={grandTotal}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-blue-900"
                >
                  ₺{grandTotal.toLocaleString()}
                </motion.span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Seçili özellikler listesi */}
      <AnimatePresence>
        {selectedFeatures.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <h3 className="font-semibold text-green-900 mb-3">
                  Seçili Özellikler ({selectedFeatures.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  <AnimatePresence>
                    {selectedFeatures.map((feature) => (
                      <motion.div
                        key={feature.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                          {feature.name} - ₺{feature.price.toLocaleString()}
                        </Badge>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Özellikler listesi */}
      <div className="space-y-6">
        {Object.entries(categorizedFeatures).map(([category, features]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
              <span>{categoryNames[category as keyof typeof categoryNames]}</span>
              <Badge variant="outline">{features.length} özellik</Badge>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => {
                const isSelected = isFeatureSelected(feature.id)
                
                return (
                  <Card
                    key={feature.id}
                    className={`cursor-pointer transition-all hover:shadow-md ${
                      isSelected ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                    }`}
                    onClick={() => handleFeatureToggle(feature, !isSelected)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3 flex-1">
                          <div className={`w-4 h-4 rounded border-2 flex items-center justify-center mt-1 ${
                            isSelected ? 'bg-blue-600 border-blue-600' : 'border-gray-300'
                          }`}>
                            {isSelected && <Check className="h-3 w-3 text-white" />}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{feature.name}</h4>
                            <p className="text-sm text-gray-600 mb-2">
                              {getFeatureDescription(feature.id)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right ml-4">
                          <div className="flex items-center space-x-2">
                            {isSelected ? (
                              <Minus className="h-4 w-4 text-red-500" />
                            ) : (
                              <Plus className="h-4 w-4 text-green-500" />
                            )}
                          </div>
                          <div className="text-lg font-bold text-blue-600 mt-1">
                            ₺{feature.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Bilgi</h3>
        <p className="text-blue-800 text-sm">
          Ek özellikler web sitenizin teslimat süresini 1-3 gün uzatabilir. 
          Seçili özellikler toplam fiyata eklenecektir.
        </p>
      </div>
    </div>
  )
}

function getFeatureDescription(featureId: string): string {
  const descriptions = {
    'logo': 'Profesyonel logo tasarımı ve web sitesine entegrasyonu',
    'ssl': 'Güvenli bağlantı sertifikası ve HTTPS protokolü',
    'whatsapp': 'WhatsApp Business entegrasyonu ve otomatik mesajlar',
    'google-ads': 'Google Ads kampanya kurulumu ve 1 ay yönetimi',
    'email-marketing': 'E-mail listesi kurulumu ve şablon tasarımı',
    'multilang': 'İkinci dil seçeneği ve çeviri hizmeti',
    'hosting': 'Premium hosting paketi ve gelişmiş performans',
    'maintenance': 'Yıllık güncellemeler ve teknik bakım hizmeti'
  }
  
  return descriptions[featureId as keyof typeof descriptions] || ''
}