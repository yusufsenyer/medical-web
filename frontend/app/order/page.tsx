"use client"

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { motion } from 'framer-motion'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { PersonalInfoStep } from '@/components/order/personal-info-step'
import { WebsiteDetailsStep } from '@/components/order/website-details-step'
import { DesignPreferencesStep } from '@/components/order/design-preferences-step'
import { FeaturesStep } from '@/components/order/features-step'
import { KnowledgeStep } from '@/components/order/knowledge-step'
import { SummaryStep } from '@/components/order/summary-step'
import { AuthGuard } from '@/components/auth/AuthGuard'

const steps = [
  { id: 1, name: 'Kişisel Bilgiler', component: PersonalInfoStep },
  { id: 2, name: 'Web Sitesi Detayları', component: WebsiteDetailsStep },
  { id: 3, name: 'Tasarım Tercihleri', component: DesignPreferencesStep },
  { id: 4, name: 'Ek Özellikler', component: FeaturesStep },
  { id: 5, name: 'Özel İstekler', component: KnowledgeStep },
  { id: 6, name: 'Özet & Ödeme', component: SummaryStep }
]

export default function OrderPage() {
  const { orderStep, nextStep, prevStep, currentOrder, totalPrice, calculateTotal } = useStore()
  const [isValid, setIsValid] = useState(false)

  const currentStepData = steps.find(step => step.id === orderStep)
  const CurrentStepComponent = currentStepData?.component || PersonalInfoStep

  const progress = (orderStep / steps.length) * 100

  const handleNext = () => {
    console.log('Next button clicked, isValid:', isValid, 'currentStep:', orderStep)
    if (isValid) {
      calculateTotal()
      nextStep()
    } else {
      console.log('Form is not valid, cannot proceed')
    }
  }

  const handlePrev = () => {
    prevStep()
  }

  const handleValidation = (valid: boolean) => {
    console.log('Validation changed:', valid, 'for step:', orderStep)
    setIsValid(valid)
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gray-50">
        <Header />

        <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Header */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">
                  Adım {orderStep}: {currentStepData?.name}
                </h1>
                <span className="text-sm text-gray-500">
                  {orderStep} / {steps.length}
                </span>
              </div>
              <Progress value={progress} className="w-full" />
            </div>

            {/* Steps Navigation */}
            <div className="flex space-x-2 overflow-x-auto">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium ${
                    step.id === orderStep
                      ? 'bg-blue-100 text-blue-700'
                      : step.id < orderStep
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {step.name}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <motion.div
            key={orderStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl p-8 shadow-sm mb-8"
          >
            <CurrentStepComponent onValidation={handleValidation} />
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={orderStep === 1}
              className="flex items-center space-x-2"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Önceki</span>
            </Button>

            <div className="text-center">
              {totalPrice > 0 && (
                <div className="text-lg font-semibold text-green-600">
                  Toplam: ₺{totalPrice.toLocaleString()}
                </div>
              )}
            </div>

            <Button
              onClick={handleNext}
              disabled={!isValid}
              className={`flex items-center space-x-2 ${
                orderStep === steps.length 
                  ? 'bg-green-600 hover:bg-green-700' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <span>
                {orderStep === steps.length ? 'Siparişi Tamamla' : 'Devam Et'}
              </span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        </main>

        <Footer />
      </div>
    </AuthGuard>
  )
}