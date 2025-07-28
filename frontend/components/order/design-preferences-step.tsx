"use client"

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/lib/store'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Card, CardContent } from '@/components/ui/card'
import { COLOR_PALETTES } from '@/lib/constants'
import { Check } from 'lucide-react'

const designPreferencesSchema = z.object({
  color_palette: z.string().min(1, 'Renk paleti seçimi zorunludur')
})

type DesignPreferencesData = z.infer<typeof designPreferencesSchema>

interface DesignPreferencesStepProps {
  onValidation: (isValid: boolean) => void
}

export function DesignPreferencesStep({ onValidation }: DesignPreferencesStepProps) {
  const { currentOrder, updateOrder } = useStore()

  const form = useForm<DesignPreferencesData>({
    resolver: zodResolver(designPreferencesSchema),
    defaultValues: {
      color_palette: currentOrder.color_palette || ''
    }
  })

  useEffect(() => {
    const subscription = form.watch((data) => {
      updateOrder(data as Partial<typeof currentOrder>)
    })
    return () => subscription.unsubscribe()
  }, [form, updateOrder])

  useEffect(() => {
    const isValid = form.formState.isValid
    onValidation(isValid)
  }, [form.formState.isValid, onValidation])

  const selectedPalette = form.watch('color_palette')

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-2">Tasarım Tercihleri</h2>
        <p className="text-gray-600">
          Web sitenizin görsel tarzını belirleyin. Renk seçiminiz markanızın kimliğini yansıtacak.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <FormField
            control={form.control}
            name="color_palette"
            render={({ field }) => (
              <FormItem className="space-y-4">
                <FormLabel className="text-lg font-semibold">Renk Paleti Seçimi *</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    value={field.value}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    {COLOR_PALETTES.map((palette) => (
                      <div key={palette.id} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={palette.id}
                          id={palette.id}
                          className="peer sr-only"
                        />
                        <label
                          htmlFor={palette.id}
                          className="flex-1 cursor-pointer"
                        >
                          <Card className={`peer-checked:ring-2 peer-checked:ring-blue-500 hover:shadow-md transition-all relative ${
                            selectedPalette === palette.id ? 'ring-2 ring-blue-500' : ''
                          }`}>
                            {selectedPalette === palette.id && (
                              <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full p-1">
                                <Check className="h-4 w-4" />
                              </div>
                            )}
                            <CardContent className="p-6">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <h3 className="font-semibold text-lg">{palette.name}</h3>
                                </div>
                                
                                <div className="flex space-x-2">
                                  {palette.colors.map((color, index) => (
                                    <div
                                      key={index}
                                      className="w-12 h-12 rounded-lg shadow-sm border"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>
                                
                                <div className="bg-gray-50 p-4 rounded-lg">
                                  <div className="h-2 rounded" style={{ backgroundColor: palette.colors[0] }}></div>
                                  <div className="mt-2 space-y-1">
                                    <div className="h-1 bg-gray-200 rounded w-3/4"></div>
                                    <div className="h-1 bg-gray-200 rounded w-1/2"></div>
                                  </div>
                                  <div className="mt-2 flex space-x-2">
                                    <div 
                                      className="flex-1 h-6 rounded text-xs flex items-center justify-center text-white font-medium"
                                      style={{ backgroundColor: palette.colors[1] }}
                                    >
                                      Button
                                    </div>
                                    <div 
                                      className="w-6 h-6 rounded"
                                      style={{ backgroundColor: palette.colors[2] }}
                                    ></div>
                                  </div>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        </label>
                      </div>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="bg-yellow-50 p-4 rounded-lg">
        <h3 className="font-semibold text-yellow-900 mb-2">Renk Seçimi İpuçları</h3>
        <div className="text-yellow-800 text-sm space-y-1">
          <p>• <strong>Mavi:</strong> Güven, profesyonellik (Doktorlar, avukatlar için ideal)</p>
          <p>• <strong>Yeşil:</strong> Sağlık, doğallık (Sağlık sektörü, wellness)</p>
          <p>• <strong>Mor:</strong> Yaratıcılık, lüks (Güzellik, sanat sektörü)</p>
          <p>• <strong>Turuncu:</strong> Enerji, dostluk (Spor, eğitim sektörü)</p>
        </div>
      </div>
    </div>
  )
}