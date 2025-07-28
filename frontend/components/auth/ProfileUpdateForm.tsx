"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, CheckCircle, AlertCircle, User, Mail, Phone, Building } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { profileUpdateSchema } from '@/lib/auth/validation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'

type ProfileUpdateData = z.infer<typeof profileUpdateSchema>

interface ProfileUpdateFormProps {
  initialData?: Partial<ProfileUpdateData>
  onSuccess?: (data: ProfileUpdateData) => void
  onError?: (error: string) => void
}

export function ProfileUpdateForm({ initialData, onSuccess, onError }: ProfileUpdateFormProps) {
  const { updateProfile, user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [hasChanges, setHasChanges] = useState(false)

  const form = useForm<ProfileUpdateData>({
    resolver: zodResolver(profileUpdateSchema),
    defaultValues: {
      firstName: initialData?.firstName || user?.firstName || '',
      lastName: initialData?.lastName || user?.lastName || '',
      email: initialData?.email || user?.email || '',
      phone: initialData?.phone || user?.phone || '',
      company: initialData?.company || user?.company || '',
      bio: initialData?.bio || user?.bio || ''
    }
  })

  // Watch for form changes
  const watchedValues = form.watch()
  useState(() => {
    const currentValues = form.getValues()
    const hasChanged = Object.keys(currentValues).some(key => {
      return currentValues[key as keyof ProfileUpdateData] !== initialData?.[key as keyof ProfileUpdateData]
    })
    setHasChanges(hasChanged)
  })

  const onSubmit = async (data: ProfileUpdateData) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)
    
    try {
      await updateProfile(data)
      
      console.log('Profile update successful:', data)
      setSuccess(true)
      setHasChanges(false)
      onSuccess?.(data)
      
      // Reset success state after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Profil güncellenirken bir hata oluştu'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    form.reset()
    setHasChanges(false)
    setError(null)
    setSuccess(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Profil Bilgileri
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          Hesap bilgilerinizi güncelleyin
        </p>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
          {success && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <Alert className="border-green-200 bg-green-50">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <AlertDescription className="text-green-800">
                  Profil bilgileriniz başarıyla güncellendi!
                </AlertDescription>
              </Alert>
            </motion.div>
          )}
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-blue-700">
                <User className="h-5 w-5" />
                <span>Kişisel Bilgiler</span>
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Adınızı girin"
                          {...field}
                          className="transition-all duration-200 focus-visible:ring-ring"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Soyad</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Soyadınızı girin"
                          {...field}
                          className="transition-all duration-200 focus-visible:ring-ring"
                          disabled={isLoading}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-blue-700">
                <Mail className="h-5 w-5" />
                <span>İletişim Bilgileri</span>
              </h3>
              
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-posta Adresi</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="email"
                          placeholder="ornek@email.com"
                          {...field}
                          className="pl-10 transition-all duration-200 focus-visible:ring-ring"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefon (Opsiyonel)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="tel"
                          placeholder="Telefon numaranız"
                          {...field}
                          className="pl-10 transition-all duration-200 focus-visible:ring-ring"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center space-x-2 text-blue-700">
                <Building className="h-5 w-5" />
                <span>Profesyonel Bilgiler</span>
              </h3>
              
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Şirket (Opsiyonel)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Şirket adınız"
                          {...field}
                          className="pl-10 transition-all duration-200 focus-visible:ring-ring"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Biyografi (Opsiyonel)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Kendiniz hakkında kısa bir açıklama yazın..."
                        {...field}
                        className="min-h-[100px] transition-all duration-200 focus-visible:ring-ring"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                disabled={isLoading || success || !hasChanges}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Güncelleniyor...
                  </>
                ) : success ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" />
                    Güncellendi!
                  </>
                ) : (
                  'Değişiklikleri Kaydet'
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                disabled={isLoading || !hasChanges}
                className="flex-1 sm:flex-none border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
              >
                İptal Et
              </Button>
            </div>

            {hasChanges && !success && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-sm text-blue-600">
                  Kaydedilmemiş değişiklikleriniz var
                </p>
              </motion.div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
