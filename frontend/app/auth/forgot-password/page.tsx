"use client"

import { PasswordResetForm } from '@/components/auth/PasswordResetForm'
import { BackButton } from '@/components/auth/BackButton'
import { motion } from 'framer-motion'

export default function ForgotPasswordPage() {
  const handleResetSuccess = (email: string) => {
    console.log('Password reset email sent to:', email)
  }

  const handleResetError = (error: string) => {
    console.error('Password reset error:', error)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-blue-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <BackButton className="mb-6" href="/auth/login" label="Giriş sayfasına dön" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <PasswordResetForm
            onSuccess={handleResetSuccess}
            onError={handleResetError}
          />
        </motion.div>
      </div>
    </div>
  )
}
