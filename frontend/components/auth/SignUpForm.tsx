"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Check, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { signUpSchema, getPasswordStrength } from '@/lib/auth/validation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

type SignUpData = z.infer<typeof signUpSchema>

interface SignUpFormProps {
  onSuccess?: (data: SignUpData) => void
  onError?: (error: string) => void
}

export function SignUpForm({ onSuccess, onError }: SignUpFormProps) {
  const { signUp, isLoading } = useAuth()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState({ score: 0, feedback: [], color: 'red' })

  const form = useForm<SignUpData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      acceptTerms: false
    }
  })

  const watchPassword = form.watch('password')

  // Update password strength when password changes
  useState(() => {
    if (watchPassword) {
      const strength = getPasswordStrength(watchPassword)
      setPasswordStrength(strength)
    }
  })

  const onSubmit = async (data: SignUpData) => {
    console.log('SignUp form submitted:', data);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      console.log('Email validation failed:', data.email);
      toast({
        variant: "destructive",
        title: "Kayıt Hatası",
        description: "E-posta adresi geçersiz",
      })
      return
    }

    try {
      console.log('Calling signUp function...');
      const result = await signUp({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      })
      console.log('SignUp result:', result);

      toast({
        variant: "default",
        title: "Hesap Oluşturuldu",
        description: "Başarıyla kayıt oldunuz! Şimdi giriş yapabilirsiniz.",
      })

      onSuccess?.(data)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Kayıt işlemi sırasında bir hata oluştu'
      toast({
        variant: "destructive",
        title: "Kayıt Hatası",
        description: errorMessage,
      })
      onError?.(errorMessage)
    }
  }

  const getStrengthColor = (score: number) => {
    if (score >= 4) return 'bg-green-500'
    if (score >= 3) return 'bg-yellow-500'
    if (score >= 2) return 'bg-orange-500'
    return 'bg-red-500'
  }

  const getStrengthText = (score: number) => {
    if (score >= 4) return 'Güçlü'
    if (score >= 3) return 'Orta'
    if (score >= 2) return 'Zayıf'
    return 'Çok Zayıf'
  }

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Hesap Oluştur
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          MedicalWeb Pro'ya katılın ve kliniğinizin web sitesini oluşturun
        </p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Adınız"
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
                        placeholder="Soyadınız"
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

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-posta Adresi</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="ornek@email.com"
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Güçlü bir şifre oluşturun"
                        {...field}
                        className="pr-10 transition-all duration-200 focus-visible:ring-ring"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  
                  {/* Password Strength Indicator */}
                  <AnimatePresence>
                    {watchPassword && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-2 space-y-2"
                      >
                        <div className="flex items-center space-x-2">
                          <div className="flex-1 bg-blue-100 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${getStrengthColor(passwordStrength.score)}`}
                              style={{ width: `${(passwordStrength.score / 5) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs font-medium text-teal-700">
                            {getStrengthText(passwordStrength.score)}
                          </span>
                        </div>
                        
                        {passwordStrength.feedback.length > 0 && (
                          <div className="text-xs text-teal-600">
                            <p>Eksik gereksinimler:</p>
                            <ul className="list-disc list-inside space-y-1">
                              {passwordStrength.feedback.map((item, index) => (
                                <li key={index}>{item}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Şifre Tekrarı</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Şifrenizi tekrar girin"
                        {...field}
                        className="pr-10 transition-all duration-200 focus-visible:ring-ring"
                        disabled={isLoading}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        disabled={isLoading}
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Eye className="h-4 w-4 text-muted-foreground" />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="acceptTerms"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={field.value}
                        onChange={field.onChange}
                        className="sr-only"
                        disabled={isLoading}
                      />
                      <div
                        className={`w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 ${
                          field.value
                            ? 'bg-gradient-to-r from-teal-500 to-blue-600 border-teal-500'
                            : 'border-teal-300 hover:border-teal-400'
                        } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        onClick={() => !isLoading && field.onChange(!field.value)}
                      >
                        {field.value && (
                          <Check className="h-3 w-3 text-white absolute top-0 left-0" />
                        )}
                      </div>
                    </div>
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      <a href="/terms" className="text-primary hover:underline">
                        Kullanım Şartları
                      </a>{' '}
                      ve{' '}
                      <a href="/privacy" className="text-primary hover:underline">
                        Gizlilik Politikası
                      </a>
                      'nı kabul ediyorum
                    </label>
                  </div>
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Hesap Oluşturuluyor...
                </>
              ) : (
                'Hesap Oluştur'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Zaten hesabınız var mı?{' '}
            <a href="/auth/login" className="text-primary hover:underline font-medium">
              Giriş Yapın
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
