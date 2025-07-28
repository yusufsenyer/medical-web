"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Loader2, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { passwordResetRequestSchema } from '@/lib/auth/validation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'

type PasswordResetRequestData = z.infer<typeof passwordResetRequestSchema>

interface PasswordResetFormProps {
  onSuccess?: (email: string) => void
  onError?: (error: string) => void
}

export function PasswordResetForm({ onSuccess, onError }: PasswordResetFormProps) {
  const { forgotPassword } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sentEmail, setSentEmail] = useState<string>('')

  const form = useForm<PasswordResetRequestData>({
    resolver: zodResolver(passwordResetRequestSchema),
    defaultValues: {
      email: ''
    }
  })

  const onSubmit = async (data: PasswordResetRequestData) => {
    setIsLoading(true)
    setError(null)
    
    try {
      await forgotPassword(data.email)
      
      setSentEmail(data.email)
      setIsSuccess(true)
      onSuccess?.(data.email)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Şifre sıfırlama e-postası gönderilirken bir hata oluştu'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResendEmail = async () => {
    if (sentEmail) {
      setIsLoading(true)
      try {
        await forgotPassword(sentEmail)
        console.log('Resending password reset email to:', sentEmail)
      } catch (error) {
        setError('E-posta tekrar gönderilirken bir hata oluştu')
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (isSuccess) {
    return (
      <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="mx-auto w-16 h-16 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4"
          >
            <CheckCircle className="h-8 w-8 text-green-600" />
          </motion.div>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            E-posta Gönderildi
          </CardTitle>
          <p className="text-sm text-gray-600">
            Şifre sıfırlama talimatları e-posta adresinize gönderildi
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert>
            <Mail className="h-4 w-4" />
            <AlertDescription>
              <strong>{sentEmail}</strong> adresine şifre sıfırlama linki gönderildi. 
              E-postanızı kontrol edin ve spam klasörünü de kontrol etmeyi unutmayın.
            </AlertDescription>
          </Alert>

          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">
              E-posta gelmediyse:
            </p>
            
            <Button
              variant="outline"
              onClick={handleResendEmail}
              disabled={isLoading}
              className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                'E-postayı Tekrar Gönder'
              )}
            </Button>

            <div className="text-center">
              <a
                href="/auth/login"
                className="text-sm text-primary hover:underline font-medium"
              >
                Giriş sayfasına dön
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Şifremi Unuttum
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          E-posta adresinizi girin, size şifre sıfırlama linki gönderelim
        </p>
      </CardHeader>
      <CardContent>
        <AnimatePresence>
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Gönderiliyor...
                </>
              ) : (
                'Şifre Sıfırlama Linki Gönder'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Şifrenizi hatırladınız mı?{' '}
            <a href="/auth/login" className="text-primary hover:underline font-medium">
              Giriş Yapın
            </a>
          </p>
          
          <p className="text-sm text-muted-foreground">
            Hesabınız yok mu?{' '}
            <a href="/auth/signup" className="text-primary hover:underline font-medium">
              Hesap Oluşturun
            </a>
          </p>
        </div>

        <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
          <p className="text-xs font-medium mb-1 text-blue-800">Bilgi:</p>
          <p className="text-xs text-blue-700">
            Şifre sıfırlama linki 1 saat boyunca geçerlidir.
            E-posta gelmezse spam klasörünüzü kontrol edin.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
