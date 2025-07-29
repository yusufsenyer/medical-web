"use client"

import { useEffect, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/use-auth'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: ReactNode
  requireAuth?: boolean
  requireGuest?: boolean
  redirectTo?: string
}

export function AuthGuard({ 
  children, 
  requireAuth = false, 
  requireGuest = false,
  redirectTo 
}: AuthGuardProps) {
  const router = useRouter()
  const { isAuthenticated, isLoading, checkAuth } = useAuth()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  useEffect(() => {
    if (isLoading) return

    if (requireAuth && !isAuthenticated) {
      const returnUrl = window.location.pathname
      const loginUrl = redirectTo || `/auth/login?returnUrl=${encodeURIComponent(returnUrl)}`
      router.push(loginUrl)
      return
    }

    if (requireGuest && isAuthenticated) {
      const dashboardUrl = redirectTo || '/dashboard'
      router.push(dashboardUrl)
      return
    }
  }, [isAuthenticated, isLoading, requireAuth, requireGuest, redirectTo, router])

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-muted-foreground">Yükleniyor...</span>
        </div>
      </div>
    )
  }

  // Don't render if auth requirements not met
  if (requireAuth && !isAuthenticated) {
    return null
  }

  if (requireGuest && isAuthenticated) {
    return null
  }

  return <>{children}</>
}
