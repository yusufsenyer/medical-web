"use client"

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useStore } from '@/lib/store'
import { useAuth } from '@/hooks/use-auth'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { PROFESSIONS } from '@/lib/constants'

const personalInfoSchema = z.object({
  customer_name: z.string().min(2, 'İsim en az 2 karakter olmalıdır'),
  customer_surname: z.string().min(2, 'Soyisim en az 2 karakter olmalıdır'),
  customer_email: z.string().email('Geçerli bir e-mail adresi giriniz'),
  profession: z.string().min(1, 'Meslek seçimi zorunludur')
})

type PersonalInfoData = z.infer<typeof personalInfoSchema>

interface PersonalInfoStepProps {
  onValidation: (isValid: boolean) => void
}

export function PersonalInfoStep({ onValidation }: PersonalInfoStepProps) {
  const { currentOrder, updateOrder } = useStore()
  const { user } = useAuth()

  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      customer_name: currentOrder.customer_name || user?.firstName || '',
      customer_surname: currentOrder.customer_surname || user?.lastName || '',
      customer_email: currentOrder.customer_email || user?.email || '',
      profession: currentOrder.profession || ''
    }
  })

  const watchedValues = form.watch()

  // Update form when user data is available
  useEffect(() => {
    if (user && !currentOrder.customer_name && !currentOrder.customer_surname && !currentOrder.customer_email) {
      form.setValue('customer_name', user.firstName || '')
      form.setValue('customer_surname', user.lastName || '')
      form.setValue('customer_email', user.email || '')
    }
  }, [user, form, currentOrder])

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Kişisel Bilgileriniz</h2>
        <p className="text-gray-600">
          Size daha iyi hizmet verebilmemiz için kişisel bilgilerinizi paylaşın.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="customer_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>İsim *</FormLabel>
                  <FormControl>
                    <Input placeholder="İsminizi giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customer_surname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Soyisim *</FormLabel>
                  <FormControl>
                    <Input placeholder="Soyisminizi giriniz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="customer_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>E-mail Adresi *</FormLabel>
                <FormControl>
                  <Input placeholder="ornek@email.com" type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="profession"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mesleğiniz *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Mesleğinizi seçiniz" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PROFESSIONS.map((profession) => (
                      <SelectItem key={profession} value={profession}>
                        {profession}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Bilgi</h3>
        <p className="text-blue-800 text-sm">
          Girdiğiniz bilgiler web sitenizin içeriğinin kişiselleştirilmesi için kullanılacaktır. 
          Mesleğinize özel şablonlar ve öneriler sunacağız.
        </p>
      </div>
    </div>
  )
}