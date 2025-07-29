"use client"

import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Package,
  Clock,
  CheckCircle,
  Calendar,
  Globe,
  FileText,
  ArrowLeft,
  Loader2,
  Plus,
  Eye,
  Download
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { useStore } from '@/lib/store'

export default function CustomerDashboard() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const { userOrders, loadUserOrders } = useStore()
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Customer access control and first login redirect
  useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (user && user.role === 'admin') {
      router.push('/admin') // Redirect admin to admin panel
      return
    }

    // Check if this is first login and redirect to orders
    const isFirstLogin = localStorage.getItem('is-first-login')
    if (isFirstLogin === 'true' && user?.role !== 'admin') {
      localStorage.removeItem('is-first-login') // Clear flag
      router.push('/order')
      return
    }
  }, [user, isAuthenticated, router, mounted])

  // Load user's orders on component mount
  useEffect(() => {
    if (!mounted) return

    const loadData = async () => {
      if (user && (user.role === 'customer' || user.role === 'user')) {
        console.log('Dashboard: Loading user orders for:', user.email)
        try {
          await loadUserOrders()
          console.log('Dashboard: User orders loaded, count:', userOrders.length)
        } catch (error) {
          console.error('Error loading user orders:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user, loadUserOrders, mounted])

  // Debug userOrders değişikliklerini izle
  useEffect(() => {
    console.log('Dashboard: userOrders changed:', userOrders)
    console.log('Dashboard: userOrders length:', userOrders.length)
  }, [userOrders])

  // Debug user data
  useEffect(() => {
    if (!mounted) return

    const userData = localStorage.getItem('user-data')
    console.log('Dashboard: localStorage user-data:', userData)
    if (userData) {
      const parsed = JSON.parse(userData)
      console.log('Dashboard: parsed user data:', parsed)
      console.log('Dashboard: user email:', parsed.email)
    }
  }, [mounted])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'delivered': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'Beklemede'
      case 'in_progress': return 'Devam Ediyor'
      case 'completed': return 'Tamamlandı'
      case 'delivered': return 'Teslim Edildi'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />
      case 'in_progress': return <Package className="h-4 w-4" />
      case 'completed': return <CheckCircle className="h-4 w-4" />
      case 'delivered': return <Globe className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  // Show loading state
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-lg text-muted-foreground">Siparişleriniz yükleniyor...</span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="ghost"
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Siparişlerim</h1>
            <p className="text-muted-foreground">Web sitesi siparişlerinizi takip edin</p>
            {user && (
              <p className="text-sm text-muted-foreground mt-1">
                Hoş geldin, {user.firstName || user.fullName || user.email}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => router.push('/order')}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yeni Sipariş
            </Button>
            <Button variant="outline" onClick={handleLogout}>
              Çıkış Yap
            </Button>
          </div>
        </div>

        {/* Orders Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Toplam Sipariş</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userOrders.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Beklemede</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-yellow-600">
                {userOrders.filter(o => o.status === 'pending').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Devam Ediyor</CardTitle>
              <Package className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {userOrders.filter(o => o.status === 'in_progress').length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tamamlandı</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {userOrders.filter(o => o.status === 'completed').length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivered Websites */}
        {userOrders.filter(order => (order.status === 'delivered' || order.status === 'completed') && order.websiteUrl).length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Globe className="h-5 w-5 text-green-600" />
                <span>Teslim Edilen Web Sitelerim</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userOrders
                  .filter(order => (order.status === 'delivered' || order.status === 'completed') && order.websiteUrl)
                  .map((order) => (
                    <motion.div
                      key={order.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="border rounded-lg p-4 hover:shadow-md transition-all bg-gradient-to-br from-green-50 to-blue-50"
                    >
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">
                            {order.siteName || `${order.customerName} Web Sitesi`}
                          </h3>
                          <Badge className="bg-green-100 text-green-800">
                            <Globe className="h-3 w-3 mr-1" />
                            Yayında
                          </Badge>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2 mb-1">
                            <Calendar className="h-3 w-3" />
                            <span>Teslim: {new Date(order.updatedAt || order.createdAt || Date.now()).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="capitalize">{order.websiteType === 'single-page' ? 'Tek Sayfa' : 'Çok Sayfa'}</span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            onClick={() => window.open(order.websiteUrl, '_blank')}
                            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                            size="sm"
                          >
                            <Globe className="h-4 w-4 mr-1" />
                            Web Sitemi Ziyaret Et
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Orders List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Package className="h-5 w-5" />
              <span>Tüm Siparişlerim</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {userOrders.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-muted-foreground mb-2">
                  Henüz siparişiniz bulunmuyor
                </h3>
                <p className="text-muted-foreground mb-4">
                  İlk web sitenizi oluşturmak için sipariş verin
                </p>
                <Button
                  onClick={() => router.push('/order')}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  İlk Siparişimi Ver
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {userOrders.map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">
                            {order.siteName || `${order.customerName} Web Sitesi`}
                          </h3>
                          <Badge className={getStatusColor(order.status)}>
                            <div className="flex items-center space-x-1">
                              {getStatusIcon(order.status)}
                              <span>{getStatusText(order.status)}</span>
                            </div>
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-2">
                            <Globe className="h-4 w-4" />
                            <span>{order.websiteType}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(order.createdAt || Date.now()).toLocaleDateString('tr-TR')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold text-foreground">
                              ₺{order.totalPrice?.toLocaleString('tr-TR')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {/* Website URL Button - Show if delivered */}
                        {(order.status === 'delivered' || order.status === 'completed') && order.websiteUrl && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(order.websiteUrl, '_blank')}
                            className="text-green-600 border-green-200 hover:bg-green-50"
                          >
                            <Globe className="h-4 w-4 mr-1" />
                            Web Sitemi Gör
                          </Button>
                        )}

                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setSelectedOrder(order)}
                            >
                              <Eye className="h-4 w-4 mr-1" />
                              Detay
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Sipariş Detayları</DialogTitle>
                            </DialogHeader>
                            {selectedOrder && (
                              <div className="space-y-6">
                                {/* Temel Bilgiler */}
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Sipariş No
                                    </label>
                                    <p className="font-mono text-sm">{selectedOrder.id}</p>
                                  </div>
                                  <div>
                                    <label className="text-sm font-medium text-muted-foreground">
                                      Durum
                                    </label>
                                    <div className="mt-1">
                                      <Badge className={getStatusColor(selectedOrder.status)}>
                                        {getStatusText(selectedOrder.status)}
                                      </Badge>
                                    </div>
                                  </div>
                                </div>

                                {/* Müşteri Bilgileri */}
                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3">Müşteri Bilgileri</h4>
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Ad Soyad
                                      </label>
                                      <p>{selectedOrder.customerName || `${selectedOrder.customer_name} ${selectedOrder.customer_surname}`}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        E-posta
                                      </label>
                                      <p>{selectedOrder.customerEmail || selectedOrder.customer_email}</p>
                                    </div>
                                    {(selectedOrder.customerPhone || selectedOrder.customer_phone) && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                          Telefon
                                        </label>
                                        <p>{selectedOrder.customerPhone || selectedOrder.customer_phone}</p>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Web Sitesi Detayları */}
                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3">Web Sitesi Detayları</h4>
                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Web Sitesi Türü
                                      </label>
                                      <p>{selectedOrder.websiteType || selectedOrder.website_type}</p>
                                    </div>

                                    {(() => {
                                      // Güvenli selected_pages kontrolü
                                      let selectedPages = selectedOrder.selected_pages || selectedOrder.selectedPages || []

                                      if (typeof selectedPages === 'string') {
                                        try {
                                          selectedPages = JSON.parse(selectedPages)
                                        } catch (e) {
                                          selectedPages = []
                                        }
                                      }

                                      if (!Array.isArray(selectedPages)) {
                                        selectedPages = []
                                      }

                                      return selectedPages.length > 0
                                    })() && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                          Seçilen Sayfalar
                                        </label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                          {(() => {
                                            // Güvenli selected_pages erişimi
                                            let selectedPages = selectedOrder.selected_pages || selectedOrder.selectedPages || []

                                            if (typeof selectedPages === 'string') {
                                              try {
                                                selectedPages = JSON.parse(selectedPages)
                                              } catch (e) {
                                                selectedPages = []
                                              }
                                            }

                                            if (!Array.isArray(selectedPages)) {
                                              selectedPages = []
                                            }

                                            return selectedPages.map((page: string, index: number) => (
                                              <Badge key={index} variant="secondary">
                                                {page}
                                              </Badge>
                                            ))
                                          })()}
                                        </div>
                                      </div>
                                    )}

                                    {(selectedOrder.selectedFeatures || selectedOrder.additional_features) && (
                                      <div>
                                        <label className="text-sm font-medium text-muted-foreground">
                                          Ek Özellikler
                                        </label>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                          {(selectedOrder.selectedFeatures || selectedOrder.additional_features || []).map((feature: any, index: number) => (
                                            <Badge key={index} variant="outline">
                                              {typeof feature === 'string' ? feature : feature.name || feature.id}
                                            </Badge>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {(() => {
                                      // Güvenli hakkımda bilgisi erişimi
                                      const aboutText = selectedOrder.special_requests || selectedOrder.knowledge_text || selectedOrder.specialRequests || selectedOrder.notes || ''

                                      return aboutText.trim() && (
                                        <div>
                                          <label className="text-sm font-medium text-muted-foreground">
                                            Hakkınızda, İş Tecrübeleriniz ve Özel İstekleriniz
                                          </label>
                                          <div className="mt-2 space-y-3">
                                            <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                                              <h5 className="font-semibold text-blue-900 text-sm mb-2">📋 Kişisel ve Mesleki Bilgiler</h5>
                                              <p className="text-sm text-blue-800 whitespace-pre-wrap leading-relaxed">
                                                {aboutText}
                                              </p>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                                              <div className="bg-blue-50 p-2 rounded border-l-2 border-blue-400">
                                                <h6 className="font-medium text-blue-900 text-xs mb-1">💼 Deneyimleriniz</h6>
                                                <p className="text-blue-700 text-xs">Eğitim, iş deneyimi</p>
                                              </div>

                                              <div className="bg-green-50 p-2 rounded border-l-2 border-green-400">
                                                <h6 className="font-medium text-green-900 text-xs mb-1">💡 Uzmanlık Alanları</h6>
                                                <p className="text-green-700 text-xs">Branşlar, sertifikalar</p>
                                              </div>

                                              <div className="bg-purple-50 p-2 rounded border-l-2 border-purple-400">
                                                <h6 className="font-medium text-purple-900 text-xs mb-1">👥 Çalışma Şekli</h6>
                                                <p className="text-purple-700 text-xs">Saatler, randevu sistemi</p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      )
                                    })()}
                                  </div>
                                </div>

                                {/* Fiyat Bilgileri */}
                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3">Fiyat Detayları</h4>
                                  <div className="space-y-2">
                                    {selectedOrder.basePrice && (
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Temel Paket:</span>
                                        <span>₺{selectedOrder.basePrice.toLocaleString('tr-TR')}</span>
                                      </div>
                                    )}
                                    {selectedOrder.featuresPrice && selectedOrder.featuresPrice > 0 && (
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Ek Özellikler:</span>
                                        <span>₺{selectedOrder.featuresPrice.toLocaleString('tr-TR')}</span>
                                      </div>
                                    )}
                                    <div className="flex justify-between font-semibold text-lg border-t pt-2">
                                      <span>Toplam:</span>
                                      <span>₺{(selectedOrder.totalPrice || selectedOrder.total_price)?.toLocaleString('tr-TR')}</span>
                                    </div>
                                  </div>
                                </div>

                                {/* Tarih Bilgileri */}
                                <div className="border-t pt-4">
                                  <h4 className="font-medium mb-3">Tarih Bilgileri</h4>
                                  <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Sipariş Tarihi
                                      </label>
                                      <p>{new Date(selectedOrder.createdAt || selectedOrder.created_at || Date.now()).toLocaleDateString('tr-TR')}</p>
                                    </div>
                                    <div>
                                      <label className="text-sm font-medium text-muted-foreground">
                                        Son Güncelleme
                                      </label>
                                      <p>{new Date(selectedOrder.updatedAt || selectedOrder.updated_at || Date.now()).toLocaleDateString('tr-TR')}</p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
