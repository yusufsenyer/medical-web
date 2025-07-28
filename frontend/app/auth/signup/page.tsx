"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { SignUpForm } from '@/components/auth/SignUpForm'
import { BackButton } from '@/components/auth/BackButton'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/hooks/use-auth'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function SignUpPage() {
  const router = useRouter()
  const [isSuccess, setIsSuccess] = useState(false)
  const [userEmail, setUserEmail] = useState('')

  const handleSignUpSuccess = (data: any) => {
    setUserEmail(data.email)
    setIsSuccess(true)

    // Redirect to admin after successful signup
    setTimeout(() => {
      router.push('/admin')
    }, 2000)
  }

  const handleSignUpError = (error: string) => {
    console.error('Sign up error:', error)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <BackButton className="mb-6" />

          <Card className="w-full backdrop-blur-sm bg-white/80 border-white/20 shadow-xl">
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
                Hesap Oluşturuldu!
              </CardTitle>
              <p className="text-sm text-gray-600">
                Başarıyla giriş yapıldı
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200/50">
                <p className="text-sm font-medium mb-2 text-blue-800">
                  Hoş Geldiniz!
                </p>
                <p className="text-sm text-blue-700">
                  <strong>{userEmail}</strong> ile hesabınız başarıyla oluşturuldu.
                  Şimdi giriş yapabilirsiniz.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => router.push('/auth/login')}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
                >
                  Giriş Yap
                </Button>

                <Button
                  variant="outline"
                  onClick={() => router.push('/')}
                  className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                >
                  Ana Sayfaya Dön
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <AuthGuard requireGuest={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative w-full max-w-md">
          <BackButton className="mb-6" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SignUpForm
              onSuccess={handleSignUpSuccess}
              onError={handleSignUpError}
            />
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}
