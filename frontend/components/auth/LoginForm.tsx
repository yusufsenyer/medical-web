"use client"

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Eye, EyeOff, Loader2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { loginSchema } from '@/lib/auth/validation'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { useToast } from '@/hooks/use-toast'

type LoginData = z.infer<typeof loginSchema>

interface LoginFormProps {
  onSuccess?: (data: LoginData) => void
  onError?: (error: string) => void
}

export function LoginForm({ onSuccess, onError }: LoginFormProps) {
  const { login, isLoading } = useAuth()
  const { toast } = useToast()
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [rememberMe, setRememberMe] = useState(false)

  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginData) => {
    setError(null)

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(data.email)) {
      toast({
        variant: "destructive",
        title: "Giriş Hatası",
        description: "E-posta veya şifre yanlış",
      })
      return
    }

    try {
      const success = await login(data.email, data.password)

      if (success) {
        toast({
          variant: "default",
          title: "Giriş Başarılı",
          description: "Hoş geldiniz!",
        })
        onSuccess?.(data)
      } else {
        throw new Error('Geçersiz e-posta veya şifre')
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Giriş işlemi sırasında bir hata oluştu'
      setError(errorMessage)
      toast({
        variant: "destructive",
        title: "Giriş Hatası",
        description: errorMessage,
      })
      onError?.(errorMessage)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
          Giriş Yap
        </CardTitle>
        <p className="text-sm text-gray-600 text-center">
          Hesabınıza giriş yaparak devam edin
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
                        placeholder="Şifrenizi girin"
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                    disabled={isLoading}
                  />
                  <div
                    className={`w-4 h-4 border-2 rounded cursor-pointer transition-all duration-200 ${
                      rememberMe
                        ? 'bg-gradient-to-r from-teal-500 to-blue-600 border-teal-500'
                        : 'border-teal-300 hover:border-teal-400'
                    } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    onClick={() => !isLoading && setRememberMe(!rememberMe)}
                  >
                    {rememberMe && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-full h-full flex items-center justify-center"
                      >
                        <div className="w-2 h-2 bg-white rounded-sm" />
                      </motion.div>
                    )}
                  </div>
                </div>
                <label
                  htmlFor="remember"
                  className={`text-sm font-medium cursor-pointer ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => !isLoading && setRememberMe(!rememberMe)}
                >
                  Beni hatırla
                </label>
              </div>
              
              <a
                href="/auth/forgot-password"
                className="text-sm text-primary hover:underline font-medium"
              >
                Şifremi unuttum
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-semibold"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Giriş yapılıyor...
                </>
              ) : (
                'Giriş Yap'
              )}
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                veya
              </span>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Hesabınız yok mu?{' '}
              <a href="/auth/signup" className="text-primary hover:underline font-medium">
                Hesap Oluşturun
              </a>
            </p>
          </div>
        </div>

        {/* Demo credentials info */}
        <div className="mt-6 p-3 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg border border-teal-200/50">
          <p className="text-xs font-medium mb-1 text-teal-800">Admin Hesap:</p>
          <p className="text-xs text-teal-700">
            E-posta: admin123@gmail.com<br />
            Şifre: admin123
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
