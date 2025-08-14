"use client"

import { useState, useEffect } from 'react'
import { useStore } from '@/lib/store'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, CreditCard, Package } from 'lucide-react'
import { PRICING_PACKAGES, COLOR_PALETTES } from '@/lib/constants'
import { useRouter } from 'next/navigation'
import { useToast } from '@/hooks/use-toast'

interface SummaryStepProps {
  onValidation: (isValid: boolean) => void
}

export function SummaryStep({ onValidation }: SummaryStepProps) {
  const { currentOrder, selectedFeatures, totalPrice, calculateTotal, setLoading, addOrder, resetOrderPreserveContact } = useStore()
  const [isCompleting, setIsCompleting] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Temel paket bilgisini al
  const basePackage = PRICING_PACKAGES.find(pkg => 
    (currentOrder.website_type === 'single-page' && pkg.id === 'basic') ||
    (currentOrder.website_type === 'multi-page' && pkg.id === 'professional')
  )

  const basePrice = basePackage?.price || 0
  const featuresPrice = selectedFeatures.reduce((sum, feature) => sum + feature.price, 0)
  const finalTotal = basePrice + featuresPrice

  const selectedColorPalette = COLOR_PALETTES.find(p => p.id === currentOrder.color_palette)

  const estimatedDays = currentOrder.website_type === 'single-page' ? '3-5' : '5-7'

  useEffect(() => {
    onValidation(true)
    calculateTotal()
  }, [])

  const handleCompleteOrder = async () => {
    setIsCompleting(true)
    setLoading(true)

    try {
      // Yeni sipariş objesi oluştur
      console.log('Summary step currentOrder:', currentOrder)
      console.log('Summary step currentOrder.knowledge_text:', currentOrder.knowledge_text)

      const newOrder = {
        id: Date.now().toString(),
        customer_name: currentOrder.customer_name || '',
        customer_surname: currentOrder.customer_surname || '',
        customer_email: currentOrder.customer_email || '',
        customer_phone: currentOrder.customer_phone || '',
        profession: currentOrder.profession || '',
        website_name: currentOrder.website_name || '',
        website_type: (currentOrder.website_type || 'single-page') as 'single-page' | 'multi-page',
        target_audience: currentOrder.target_audience || '',
        purpose: currentOrder.purpose || '',
        color_palette: currentOrder.color_palette || '',
        selected_pages: currentOrder.selected_pages || [],
        additional_features: selectedFeatures.map(f => f.name),
        total_price: finalTotal,
        status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        knowledge_text: currentOrder.knowledge_text || '',
        delivery_days: currentOrder.delivery_days || (((currentOrder.website_type || 'single-page') === 'multi-page') ? 7 : 5),
        slogan: currentOrder.slogan || '',
        // Sosyal medya hesapları
        facebook: currentOrder.facebook || '',
        instagram: currentOrder.instagram || '',
        twitter: currentOrder.twitter || '',
        linkedin: currentOrder.linkedin || '',
        youtube: currentOrder.youtube || ''
      }

      // Siparişi store'a ekle (backend'e gönder)
      const success = await addOrder(newOrder)

      if (success) {
        // Önce formu yeni sipariş için sıfırla (iletişim bilgileri kalsın)
        try { resetOrderPreserveContact() } catch {}
        // Başarı toast'u
        toast({
          variant: "default",
          title: "Sipariş Başarıyla Alındı! 🎉",
          description: "Siparişinizi 'Siparişlerim' bölümünden takip edebilirsiniz.",
        })

        // Siparişlerim sayfasına yönlendir
        router.push('/dashboard')
      } else {
        throw new Error('Sipariş oluşturulamadı')
      }
    } catch (error) {
      console.error('Order creation error:', error)
      toast({
        variant: "destructive",
        title: "Sipariş Hatası",
        description: "Sipariş alınırken bir hata oluştu. Lütfen tekrar deneyin.",
      })
    } finally {
      setIsCompleting(false)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Sipariş Özeti</h2>
        <p className="text-gray-600">
          Sipariş detaylarınızı kontrol edin ve ödeme ile siparişinizi tamamlayın.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sol: Sipariş Detayları */}
        <div className="lg:col-span-2 space-y-6">
          {/* Kişisel Bilgiler */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <span>Kişisel Bilgiler</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">İsim Soyisim</span>
                  <p className="font-medium">{currentOrder.customer_name} {currentOrder.customer_surname}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">E-mail</span>
                  <p className="font-medium">{currentOrder.customer_email}</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-gray-500">Meslek</span>
                  <p className="font-medium">{currentOrder.profession}</p>
                </div>
              </div>

              {/* Sosyal Medya Hesapları */}
              {(currentOrder.facebook || currentOrder.instagram || currentOrder.twitter || currentOrder.linkedin || currentOrder.youtube) && (
                <div className="mt-4 pt-4 border-t">
                  <span className="text-sm text-gray-500 block mb-2">Sosyal Medya Hesapları</span>
                  <div className="flex flex-wrap gap-2">
                    {currentOrder.facebook && (
                      <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded text-xs">
                        <div className="w-3 h-3 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">f</span>
                        </div>
                        <span>{currentOrder.facebook}</span>
                      </div>
                    )}
                    {currentOrder.instagram && (
                      <div className="flex items-center space-x-1 bg-purple-50 px-2 py-1 rounded text-xs">
                        <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">i</span>
                        </div>
                        <span>{currentOrder.instagram}</span>
                      </div>
                    )}
                    {currentOrder.twitter && (
                      <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded text-xs">
                        <div className="w-3 h-3 bg-blue-400 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">x</span>
                        </div>
                        <span>{currentOrder.twitter}</span>
                      </div>
                    )}
                    {currentOrder.linkedin && (
                      <div className="flex items-center space-x-1 bg-blue-50 px-2 py-1 rounded text-xs">
                        <div className="w-3 h-3 bg-blue-700 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">in</span>
                        </div>
                        <span>{currentOrder.linkedin}</span>
                      </div>
                    )}
                    {currentOrder.youtube && (
                      <div className="flex items-center space-x-1 bg-red-50 px-2 py-1 rounded text-xs">
                        <div className="w-3 h-3 bg-red-600 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">yt</span>
                        </div>
                        <span>{currentOrder.youtube}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Web Sitesi Detayları */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span>Web Sitesi Detayları</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <span className="text-sm text-gray-500">Web Sitesi Adı</span>
                <p className="font-medium text-lg">{currentOrder.website_name}</p>
              </div>

              {/* Slogan (Ödeme ve Özet ekranında göster) */}
              <div>
                <span className="text-sm text-gray-500">Slogan</span>
                <p className="font-medium italic">{(currentOrder.slogan && currentOrder.slogan.trim() !== '') ? currentOrder.slogan : 'Slogan belirtilmemiş'}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-500">Tür</span>
                  <p className="font-medium">
                    {currentOrder.website_type === 'single-page' ? 'Tek Sayfa' : 'Çok Sayfa'}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Renk Paleti</span>
                  <div className="flex items-center space-x-2 mt-1">
                    <p className="font-medium">{selectedColorPalette?.name}</p>
                    <div className="flex space-x-1">
                      {selectedColorPalette?.colors.map((color, index) => (
                        <div
                          key={index}
                          className="w-4 h-4 rounded border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <span className="text-sm text-gray-500">Hedef Kitle</span>
                <p className="font-medium">{currentOrder.target_audience}</p>
              </div>

              <div>
                <span className="text-sm text-gray-500">Amaç</span>
                <p className="font-medium">{currentOrder.purpose}</p>
              </div>

              {currentOrder.knowledge_text && (
                <div>
                  <span className="text-sm text-gray-500">Ek Bilgiler</span>
                  <p className="font-medium text-sm bg-gray-50 p-3 rounded-lg">
                    {currentOrder.knowledge_text.substring(0, 200)}
                    {currentOrder.knowledge_text.length > 200 && '...'}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Ek Özellikler */}
          {selectedFeatures.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Ek Özellikler ({selectedFeatures.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {selectedFeatures.map((feature) => (
                    <div key={feature.id} className="flex justify-between items-center">
                      <span className="font-medium">{feature.name}</span>
                      <Badge variant="secondary">₺{feature.price.toLocaleString()}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sağ: Fiyat Özeti */}
        <div className="space-y-6">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="h-5 w-5 text-green-600" />
                <span>Fiyat Özeti</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Temel Paket ({basePackage?.name})</span>
                <span className="font-medium">₺{basePrice.toLocaleString()}</span>
              </div>

              {selectedFeatures.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Ek Özellikler</span>
                      <span>₺{featuresPrice.toLocaleString()}</span>
                    </div>
                    {selectedFeatures.map((feature) => (
                      <div key={feature.id} className="flex justify-between text-sm text-gray-500">
                        <span>• {feature.name}</span>
                        <span>₺{feature.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}

              <Separator />
              
              <div className="flex justify-between text-lg font-bold">
                <span>Toplam</span>
                <span className="text-green-600">₺{finalTotal.toLocaleString()}</span>
              </div>

              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Tahmini Teslim: {estimatedDays} iş günü</span>
              </div>

              <Separator />

              <Button
                onClick={handleCompleteOrder}
                disabled={isCompleting}
                className="w-full py-6 text-lg font-semibold bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
              >
                {isCompleting ? 'Sipariş Tamamlanıyor...' : `₺${finalTotal.toLocaleString()} - Siparişi Tamamla`}
              </Button>

              <div className="text-xs text-gray-500 text-center">
                Güvenli ödeme sistemi ile korunursunuz
              </div>
            </CardContent>
          </Card>

          {/* Güvence Bilgisi */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <h3 className="font-semibold text-blue-900 mb-2">Güvence</h3>
              <div className="text-blue-800 text-sm space-y-1">
                <p>✓ 30 gün para iadesi garantisi</p>
                <p>✓ Unlimited revizyon hakkı</p>
                <p>✓ 1 yıl ücretsiz destek</p>
                <p>✓ Güvenli SSL ödeme</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}