"use client"

import { useState } from 'react'
import { ProfileUpdateForm } from '@/components/auth/ProfileUpdateForm'
import { BackButton } from '@/components/auth/BackButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { useAuth } from '@/hooks/use-auth'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { user } = useAuth()

  const handleProfileUpdateSuccess = (data: any) => {
    console.log('Profile updated successfully:', data)
  }

  const handleProfileUpdateError = (error: string) => {
    console.error('Profile update error:', error)
  }

  // Use real user data instead of mock data
  const initialProfileData = {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    company: user?.company || '',
    bio: user?.bio || ''
  }

  return (
    <AuthGuard requireAuth={true}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <BackButton className="mb-6" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-1 mb-8 backdrop-blur-sm bg-white/80">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profil Bilgileri</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="profile">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProfileUpdateForm
                    initialData={initialProfileData}
                    onSuccess={handleProfileUpdateSuccess}
                    onError={handleProfileUpdateError}
                  />
                </motion.div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}
