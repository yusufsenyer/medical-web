"use client"

import { useState } from 'react'
import { ProfileUpdateForm } from '@/components/auth/ProfileUpdateForm'
import { BackButton } from '@/components/auth/BackButton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2, KeyRound, ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'
import { AuthGuard } from '@/components/auth/AuthGuard'
import { useAuth } from '@/hooks/use-auth'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const { user } = useAuth()
  const { updatePassword } = useAuth()
  const passwordForm = useForm<{ currentPassword: string; newPassword: string; confirmPassword: string }>({
    defaultValues: { currentPassword: '', newPassword: '', confirmPassword: '' }
  })
  const [pwdLoading, setPwdLoading] = useState(false)
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const handlePasswordSubmit = async (values: { currentPassword: string; newPassword: string; confirmPassword: string }) => {
    if (values.newPassword !== values.confirmPassword) {
      alert('Yeni şifreler eşleşmiyor')
      return
    }
    if (values.newPassword.length < 6) {
      alert('Yeni şifre en az 6 karakter olmalıdır')
      return
    }
    setPwdLoading(true)
    try {
      await updatePassword(values.newPassword)
      alert('Şifre başarıyla güncellendi!')
      passwordForm.reset()
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Şifre güncellenirken hata oluştu')
    } finally {
      setPwdLoading(false)
    }
  }

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
      <div className="min-h-screen py-8 px-4 relative overflow-hidden bg-[radial-gradient(ellipse_at_top_left,rgba(20,184,166,0.12),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(37,99,235,0.12),transparent_40%)]">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute -top-16 -left-16 w-[28rem] h-[28rem] bg-gradient-to-br from-teal-300/20 to-cyan-300/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -right-16 w-[28rem] h-[28rem] bg-gradient-to-tr from-blue-300/20 to-sky-300/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <BackButton className="mb-6" />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8 backdrop-blur-sm bg-white/80 border border-teal-100/60 rounded-xl overflow-hidden">
                <TabsTrigger value="profile" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Profil Bilgileri</span>
                </TabsTrigger>
              <TabsTrigger value="password" className="flex items-center space-x-2">
                <KeyRound className="h-4 w-4" />
                <span>Şifre Sıfırla</span>
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

            <TabsContent value="password">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="w-full max-w-2xl mx-auto backdrop-blur-sm bg-white/85 border-white/30 shadow-xl">
                  <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent flex items-center justify-center gap-2">
                      <ShieldCheck className="h-5 w-5" /> Şifre Sıfırlama
                    </CardTitle>
                    <p className="text-sm text-gray-600 text-center">Hesap güvenliğiniz için güçlü bir şifre kullanın</p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={passwordForm.handleSubmit(handlePasswordSubmit)} className="space-y-4">
                      <div>
                        <label className="block text-sm mb-1 text-red-700">Mevcut Şifre</label>
                        <div className="relative">
                          <Input 
                            type={showCurrentPassword ? "text" : "password"} 
                            {...passwordForm.register('currentPassword')} 
                            required 
                            className="border-red-200 focus-visible:ring-red-400 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            {showCurrentPassword ? (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-red-700">Yeni Şifre</label>
                        <div className="relative">
                          <Input 
                            type={showNewPassword ? "text" : "password"} 
                            {...passwordForm.register('newPassword')} 
                            required 
                            className="border-red-200 focus-visible:ring-red-400 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            {showNewPassword ? (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm mb-1 text-red-700">Yeni Şifre (Tekrar)</label>
                        <div className="relative">
                          <Input 
                            type={showConfirmPassword ? "text" : "password"} 
                            {...passwordForm.register('confirmPassword')} 
                            required 
                            className="border-red-200 focus-visible:ring-red-400 pr-10"
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            {showConfirmPassword ? (
                              <EyeOff className="h-4 w-4 text-red-600" />
                            ) : (
                              <Eye className="h-4 w-4 text-red-600" />
                            )}
                          </Button>
                        </div>
                      </div>
                      <div className="pt-2">
                        <Button type="submit" disabled={pwdLoading} className="w-full bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white">
                          {pwdLoading ? (<><Loader2 className="h-4 w-4 mr-2 animate-spin"/>Güncelleniyor...</>) : 'Şifreyi Güncelle'}
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </AuthGuard>
  )
}
