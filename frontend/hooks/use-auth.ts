"use client"

import { useEffect, useState } from 'react'
import { useStore } from '@/lib/store'
import { useRouter } from 'next/navigation'

export function useAuth() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const {
    auth,
    setUser,
    setToken,
    setAuthLoading,
    login,
    logout,
    checkAuth,
    signUp: storeSignUp
  } = useStore()

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Check authentication on mount
  useEffect(() => {
    if (!mounted) return
    checkAuth()
  }, [checkAuth, mounted])

  const signUp = async (userData: {
    firstName: string
    lastName: string
    email: string
    password: string
  }) => {
    try {
      console.log('useAuth signUp called:', userData)
      // Use store's signUp function which calls the backend API
      const success = await storeSignUp(userData)
      return success
    } catch (error) {
      console.error('useAuth signUp error:', error)
      throw error
    }
  }

  const forgotPassword = async (email: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, make actual API call to send reset email
      console.log('Password reset requested for:', email)
      
      return true
    } catch (error) {
      throw error
    }
  }

  const resetPassword = async (token: string, newPassword: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, make actual API call to reset password
      console.log('Password reset with token:', token)
      
      return true
    } catch (error) {
      throw error
    }
  }

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, verify current password and update
      console.log('Password updated')
      
      return true
    } catch (error) {
      throw error
    }
  }

  const updateProfile = async (profileData: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    company?: string
    bio?: string
  }) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Update user in store
      if (auth.user) {
        const updatedUser = {
          ...auth.user,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          fullName: `${profileData.firstName} ${profileData.lastName}`,
          email: profileData.email,
          updatedAt: new Date().toISOString()
        }
        
        setUser(updatedUser)
        localStorage.setItem('user-data', JSON.stringify(updatedUser))
      }
      
      return true
    } catch (error) {
      throw error
    }
  }

  const verifyEmail = async (token: string) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // In production, verify email with token
      console.log('Email verified with token:', token)
      
      // Update user verification status
      if (auth.user) {
        const updatedUser = {
          ...auth.user,
          isEmailVerified: true,
          updatedAt: new Date().toISOString()
        }
        
        setUser(updatedUser)
        localStorage.setItem('user-data', JSON.stringify(updatedUser))
      }
      
      return true
    } catch (error) {
      throw error
    }
  }

  const requireAuth = (redirectTo: string = '/auth/login') => {
    if (!auth.isAuthenticated && !auth.isLoading) {
      router.push(redirectTo)
      return false
    }
    return true
  }

  const requireGuest = (redirectTo: string = '/admin') => {
    if (auth.isAuthenticated) {
      router.push(redirectTo)
      return false
    }
    return true
  }

  return {
    // State
    user: mounted ? auth.user : null,
    isAuthenticated: mounted ? auth.isAuthenticated : false,
    isLoading: !mounted || auth.isLoading,
    token: mounted ? auth.token : null,

    // Actions
    login,
    logout,
    signUp,
    forgotPassword,
    resetPassword,
    updatePassword,
    updateProfile,
    verifyEmail,
    checkAuth,

    // Guards
    requireAuth,
    requireGuest
  }
}
