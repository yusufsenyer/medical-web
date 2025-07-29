"use client"

import { useRouter } from 'next/navigation'
import { LoginForm } from '@/components/auth/LoginForm'
import { BackButton } from '@/components/auth/BackButton'
import { motion } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { AuthGuard } from '@/components/auth/AuthGuard'

export default function LoginPage() {
  const router = useRouter()

  const handleLoginSuccess = (data: any) => {
    console.log('Login successful:', data)

    // Get return URL from query params or default to dashboard
    const urlParams = new URLSearchParams(window.location.search)
    const returnUrl = urlParams.get('returnUrl') || '/dashboard'

    // Redirect to intended page
    router.push(returnUrl)
  }

  const handleLoginError = (error: string) => {
    console.error('Login error:', error)
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
            <LoginForm
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
            />
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}
