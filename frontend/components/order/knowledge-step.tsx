"use client"

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/lib/store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Lightbulb, Users } from 'lucide-react'

const knowledgeSchema = z.object({
  knowledge_text: z.string().min(10, 'En az 10 karakter girmelisiniz').max(1000, 'En fazla 1000 karakter girebilirsiniz')
})

type KnowledgeData = z.infer<typeof knowledgeSchema>

interface KnowledgeStepProps {
  onValidation: (isValid: boolean) => void
}

export function KnowledgeStep({ onValidation }: KnowledgeStepProps) {
  const { currentOrder, updateOrder } = useStore()

  const form = useForm<KnowledgeData>({
    resolver: zodResolver(knowledgeSchema),
    defaultValues: {
      knowledge_text: currentOrder.knowledge_text || ''
    }
  })

  useEffect(() => {
    const subscription = form.watch((data) => {
      updateOrder(data as Partial<typeof currentOrder>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateOrder])

  useEffect(() => {
    // Form validation'ına göre geçerlilik kontrolü
    const isValid = form.formState.isValid && form.getValues('knowledge_text')?.length >= 10
    onValidation(isValid)
  }, [form.formState.isValid, form.watch('knowledge_text'), onValidation])

  // Form değişikliklerini store'a kaydet
  useEffect(() => {
    const subscription = form.watch((value) => {
      console.log('Knowledge step form watch:', value)
      if (value.knowledge_text) {
        console.log('Updating order with knowledge_text:', value.knowledge_text)
        updateOrder({ knowledge_text: value.knowledge_text })
      }
    })
    return () => subscription.unsubscribe()
  }, [form, updateOrder])

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Özel İstekler ve Bilgiler</h2>
        <p className="text-gray-600">
          Web sitenizin daha kişisel olması için özel isteklerinizi ve bilgilerinizi paylaşın. <span className="text-red-600 font-medium">Bu alan zorunludur.</span>
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <FormField
            control={form.control}
            name="knowledge_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg font-semibold">
                  Hakkınızda, İş Tecrübeleriniz ve Özel İstekleriniz
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Örn: 15 yıllık deneyim, X üniversitesi mezunu, özel branşlarım, çalışma saatlerim, ekibim, özel isteklerim, web sitesinde bulunmasını istediğim bilgiler..."
                    className="min-h-[200px] text-base"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e)
                      console.log('Textarea onChange:', e.target.value)
                      updateOrder({ knowledge_text: e.target.value })
                    }}
                  />
                </FormControl>
                <FormMessage />
                <div className="text-sm text-gray-500">
                  Bu bilgiler web sitenizin içeriğini kişiselleştirmek için kullanılacaktır.
                </div>
              </FormItem>
            )}
          />
        </form>
      </Form>

      {/* Yardımcı kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Deneyimleriniz</h3>
                <p className="text-sm text-gray-600">
                  Eğitim durumu, çalıştığınız yerler, deneyim süresi gibi bilgiler
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Lightbulb className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Uzmanlık Alanları</h3>
                <p className="text-sm text-gray-600">
                  Özel branşlarınız, sertifikalarınız, yetenekleriniz
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Çalışma Şekli</h3>
                <p className="text-sm text-gray-600">
                  Çalışma saatleri, randevu sistemi, ekip bilgileri
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="bg-purple-50 p-6 rounded-lg">
        <h3 className="font-semibold text-purple-900 mb-3">Örnek Bilgiler</h3>
        <div className="text-purple-800 text-sm space-y-2">
          <p>
            <strong>Doktor için:</strong> "İstanbul Üniversitesi Tıp Fakültesi mezunuyum. 10 yıldır kardiyoloji alanında çalışıyorum. 
            Özellikle kalp ritim bozuklukları ve bypass ameliyatları konusunda uzmanım. Pazartesi-Cuma 09:00-17:00 arası hastalarımı kabul ediyorum."
          </p>
          <p>
            <strong>Kuaför için:</strong> "5 yıldır saç bakımı ve styling konusunda hizmet veriyorum. 
            Özellikle düğün saçları ve modern kesimler konusunda deneyimim var. Hafta sonu randevuları da alıyorum."
          </p>
        </div>
      </div>
    </div>
  )
}