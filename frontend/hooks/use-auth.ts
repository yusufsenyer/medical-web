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
      // Önce backend'e kayıt
      const success = await storeSignUp(userData)
      if (!success) throw new Error('Backend kaydı başarısız')

      // Backend başarılıysa Firebase'e de ekle
      try {
        const { db, collection, getDocs, query, where } = await import('@/lib/firebase')
        const { addDoc } = await import('firebase/firestore')
        // Aynı email ile kullanıcı var mı kontrol et
        const usersRef = collection(db as any, 'users')
        const q = query(usersRef, where('email', '==', userData.email))
        const existing = await getDocs(q)
        if (existing.docs.length === 0) {
          await addDoc(usersRef, {
            email: userData.email,
            firstName: userData.firstName,
            lastName: userData.lastName,
            fullName: `${userData.firstName} ${userData.lastName}`,
            password: userData.password,
            role: 'customer',
            isEmailVerified: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          })
        }
      } catch (firebaseError) {
        console.error('Firebase user creation error:', firebaseError)
        // İsteğe bağlı: Backend'deki kullanıcıyı sil veya uyarı göster
      }
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

  const updatePassword = async (newPassword: string) => {
    try {
      if (!newPassword || newPassword.length < 6) {
        throw new Error('Şifre en az 6 karakter olmalıdır')
      }

      // Ensure we have backend user id; resolve by email if missing
      let backendUserId = auth.user?.id
      const email = (auth.user?.email || '').trim().toLowerCase()

      if (!backendUserId && email) {
        try {
          const searchUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'}/users?search=${encodeURIComponent(email)}`
          const res = await fetch(searchUrl, { headers: { 'Content-Type': 'application/json', ...(auth.token ? { 'Authorization': `Bearer ${auth.token}` } : {}) } })
          if (res.ok) {
            const users = await res.json()
            const found = Array.isArray(users) ? users.find((u: any) => (u.email || '').toLowerCase() === email) : null
            if (found?.id) backendUserId = found.id.toString()
          }
        } catch (e) {
          // ignore search errors; will fail below if id still missing
        }
      }

      if (!backendUserId) {
        throw new Error('Kullanıcı kimliği bulunamadı')
      }

      // Backend password update
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'}/auth/update-profile`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          ...(auth.token ? { 'Authorization': `Bearer ${auth.token}` } : {})
        },
        body: JSON.stringify({ 
          user: { 
            id: backendUserId, 
            password: newPassword,
            password_confirmation: newPassword,
            email
          } 
        })
      })

      let data: any = {}
      try { data = await response.json() } catch {}

      if (!response.ok) {
        if (response.status === 422) {
          const msg = data?.message || data?.errors?.join?.(', ') || JSON.stringify(data) || 'Şifre güncellenemedi'
          throw new Error(msg)
        } else {
          throw new Error('Şifre güncellenemedi')
        }
      }

      // Firebase'de şifreyi güncelle
      try {
        const { db, collection, getDocs, query, where, updateDoc, doc } = await import('@/lib/firebase')
        const usersRef = collection(db as any, 'users')
        const q = query(usersRef, where('email', '==', (auth.user?.email || '').toLowerCase()))
        const snap = await getDocs(q)
        await Promise.all(snap.docs.map(d => updateDoc(doc(db as any, 'users', d.id), {
          password: newPassword,
          updatedAt: new Date().toISOString()
        })))
      } catch (firebaseError) {
        console.warn('Firebase password update failed:', firebaseError)
        // Don't fail if Firebase update fails
      }

      return true
    } catch (error) {
      console.error('Password update error:', error)
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
      // Call Rails backend API (align with backend routes.rb)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'}/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(auth.token ? { 'Authorization': `Bearer ${auth.token}` } : {})
        },
        body: JSON.stringify({
          user: {
            id: auth.user?.id,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            email: profileData.email,
            phone: profileData.phone,
            company: profileData.company,
            bio: profileData.bio
          }
        })
      })

      if (response.ok) {
        const result = await response.json()

        // Update user in store
        if (auth.user) {
          const updatedUser = {
            ...auth.user,
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            fullName: `${profileData.firstName} ${profileData.lastName}`,
            email: profileData.email,
            phone: profileData.phone,
            company: profileData.company,
            bio: profileData.bio,
            updatedAt: new Date().toISOString()
          }

          setUser(updatedUser)
          localStorage.setItem('user-data', JSON.stringify(updatedUser))
        }

        // Firebase'de de kullanıcıyı email ile bulup güncelle
        try {
          const { db, collection, getDocs, query, where, updateDoc, doc } = await import('@/lib/firebase')
          const usersRef = collection(db as any, 'users')
          const q = query(usersRef, where('email', '==', profileData.email.toLowerCase().trim()))
          const snap = await getDocs(q)
          await Promise.all(snap.docs.map(d => updateDoc(doc(db as any, 'users', d.id), {
            firstName: profileData.firstName,
            lastName: profileData.lastName,
            fullName: `${profileData.firstName} ${profileData.lastName}`,
            email: profileData.email.toLowerCase().trim(),
            phone: profileData.phone || '',
            company: profileData.company || '',
            bio: profileData.bio || '',
            updatedAt: new Date().toISOString()
          })))
        } catch (e) {
          console.warn('Firebase profile update skipped:', e)
        }

        return true
      } else {
        throw new Error('Profile update failed')
      }
    } catch (error) {
      // Fallback to local update if API fails
      if (auth.user) {
        const updatedUser = {
          ...auth.user,
          firstName: profileData.firstName,
          lastName: profileData.lastName,
          fullName: `${profileData.firstName} ${profileData.lastName}`,
          email: profileData.email,
          phone: profileData.phone,
          company: profileData.company,
          bio: profileData.bio,
          updatedAt: new Date().toISOString()
        }

        setUser(updatedUser)
        localStorage.setItem('user-data', JSON.stringify(updatedUser))
      }

      return true
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
