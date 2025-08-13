"use client"

import { useState, useEffect, useCallback, useMemo } from 'react'
import { EyeOff } from 'lucide-react'
import { Header } from '@/components/layout/header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  DollarSign,
  Package,
  Users,
  TrendingUp,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  Calendar,
  User,
  Globe,
  Palette,
  Target,
  FileText,
  X,
  ArrowLeft,
  Loader2,
  Settings,
  ExternalLink,
  Trash
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { PAGE_OPTIONS } from '@/lib/constants'
import { useAuth } from '@/hooks/use-auth'
import { useStore } from '@/lib/store'
import { generateOrderPDF, generateAllOrdersPDF } from '@/lib/pdf-utils'

interface Analytics {
  totalRevenue: number;
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
}

interface Order {
  id: string;
  website_name?: string;
  siteName?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'delivered';
  total_price: number;
  totalPrice?: number;
  created_at: string;
  createdAt?: string;
  customer_name?: string;
  customer_surname?: string;
  customerName?: string;
  customerSurname?: string;
  email?: string;
  customer_email?: string;
  customerEmail?: string;
  customer_phone?: string;
  customerPhone?: string;
  website_type?: string;
  websiteType?: string;
  notes?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  profession?: string;
  selected_pages?: string[] | string;
  selectedPages?: string[] | string;
  additional_features?: any[];
  selected_features?: any[];
  basePrice?: number;
  deliveryDays?: number;
  specialRequests?: string;
  updatedAt?: string;
}

function AdminPageContent() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const { orders, analytics, users, updateOrderStatus, loadAllOrders, loadAnalytics, loadAllUsers, updateUserRole, deleteUser } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')
  const [websiteUrl, setWebsiteUrl] = useState('')
  const [adminNotes, setAdminNotes] = useState('')
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30) // seconds
  const [lastRefresh, setLastRefresh] = useState(new Date())
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({})

  // Mount effect
  useEffect(() => {
    setMounted(true)
  }, [])

  // Admin access control
  useEffect(() => {
    if (!mounted) return

    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (user && user.role !== 'admin') {
      router.push('/dashboard') // Redirect customers to their dashboard
      return
    }
  }, [user, isAuthenticated, router, mounted])

  // Load orders and analytics on component mount
  useEffect(() => {
    if (!mounted) return

    const loadData = async () => {
      if (user?.role === 'admin') {
        try {
          await Promise.all([loadAllOrders(), loadAnalytics(), loadAllUsers()])
        } catch (error) {
          console.error('Error loading admin data:', error)
        } finally {
          setIsLoading(false)
        }
      } else {
        setIsLoading(false)
      }
    }

    loadData()
  }, [user, loadAllOrders, loadAnalytics, mounted])

  // Auto-refresh functionality
  const refreshData = useCallback(async () => {
    if (user?.role === 'admin') {
      try {
        await Promise.all([loadAllOrders(), loadAnalytics(), loadAllUsers()])
        setLastRefresh(new Date())
      } catch (error) {
        console.error('Error refreshing data:', error)
      }
    }
  }, [user, loadAllOrders, loadAnalytics, loadAllUsers])

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    if (autoRefresh && user?.role === 'admin') {
      intervalId = setInterval(() => {
        refreshData()
      }, refreshInterval * 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
      }
    }
  }, [autoRefresh, refreshInterval, refreshData, user?.role])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status: newStatus,
          websiteUrl: websiteUrl || undefined,
          adminNotes: adminNotes || undefined,
          estimatedDeliveryDate: estimatedDeliveryDate || undefined
        })
      })

      if (response.ok) {
        updateOrderStatus(orderId, newStatus)
        // Reset form fields
        setWebsiteUrl('')
        setAdminNotes('')
        setEstimatedDeliveryDate('')
        // Refresh data
        await refreshData()
      } else {
        console.error('Failed to update order status')
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const handleDownloadPDF = (order: any) => {
    // Create simple text content for download
    const pdfContent = `
SIPARIŞ DETAYLARI
================

Müşteri Bilgileri:
- Ad Soyad: ${order.customerName || 'Belirtilmemiş'}
- E-posta: ${order.email || 'Belirtilmemiş'}
- Telefon: ${order.phone || 'Belirtilmemiş'}
- Meslek: ${order.profession || 'Belirtilmemiş'}

Proje Bilgileri:
- Site Adı: ${order.siteName || 'Belirtilmemiş'}
- Site Türü: ${order.websiteType || 'Belirtilmemiş'}
- Hedef Kitle: ${order.targetAudience || 'Belirtilmemiş'}
- Amaç: ${order.purpose || 'Belirtilmemiş'}
- Renk Paleti: ${order.colorPalette || 'Belirtilmemiş'}

Seçilen Sayfalar:
${order.selectedPages ? order.selectedPages.map((page: string) => `- ${page}`).join('\n') : 'Belirtilmemiş'}

Seçilen Özellikler:
${order.selectedFeatures ? order.selectedFeatures.map((feature: any) => `- ${typeof feature === 'string' ? feature : feature.name || feature.id}: ${feature.price || 0}₺`).join('\n') : 'Belirtilmemiş'}

Fiyat Bilgileri:
- Temel Fiyat: ${order.basePrice || order.totalPrice || 0}₺
- Toplam Fiyat: ${order.totalPrice || 0}₺

Özel İstekler:
${order.specialRequests || 'Özel istek belirtilmemiş'}

Teslimat:
- Teslimat Süresi: ${order.deliveryDays || 'Belirtilmemiş'} gün
- Durum: ${order.status || 'Belirtilmemiş'}
- Sipariş Tarihi: ${new Date(order.createdAt).toLocaleDateString('tr-TR')}
- Güncelleme Tarihi: ${new Date(order.updatedAt || order.createdAt).toLocaleDateString('tr-TR')}
    `

    // Create and download file
    const blob = new Blob([pdfContent], { type: 'text/plain;charset=utf-8' })
    const url = window.URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `siparis-${order.id}-${(order.customerName || 'unknown').replace(/\s+/g, '-')}.txt`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleDownloadAllPDF = () => {
    generateAllOrdersPDF(orders)
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      await updateUserRole(userId, newRole)
      // Optionally show success message
    } catch (error) {
      console.error('Error updating user role:', error)
      // Optionally show error message
    }
  }

  const handleDeleteUser = async (userId: string) => {
    try {
      if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
        await deleteUser(userId)
        // Refresh users list
        await loadAllUsers()
      }
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Kullanıcı silinirken hata oluştu')
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'customer': return 'bg-teal-100 text-teal-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'admin': return 'Admin'
      case 'customer': return 'Müşteri'
      default: return role
    }
  }

  const getCustomerName = (order: any) => {
    // Try different customer name formats
    if (order.customerName && order.customerName.trim() && order.customerName !== '') {
      return order.customerName
    }

    const firstName = order.customer_name || ''
    const lastName = order.customer_surname || ''
    const fullName = `${firstName} ${lastName}`.trim()

    if (fullName && fullName !== '') {
      return fullName
    }

    // If no name available, use email or fallback
    if (order.email || order.customerEmail || order.customer_email) {
      const email = order.email || order.customerEmail || order.customer_email
      return email.split('@')[0] // Use email username part
    }

    return `Sipariş #${order.id?.slice(-6) || 'Bilinmiyor'}`
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'in_progress': return 'bg-teal-100 text-teal-800'
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

  const openOrderDetail = (order: any) => {
    setSelectedOrder(order)
    setOrderNotes(order.notes || '')
    setIsDetailModalOpen(true)
  }

  const closeOrderDetail = () => {
    setIsDetailModalOpen(false)
    setSelectedOrder(null)
    setOrderNotes('')
  }

  const saveOrderNotes = () => {
    if (selectedOrder) {
      // Update order notes in store
      const updatedOrders = orders.map(order =>
        order.id === selectedOrder.id
          ? { ...order, notes: orderNotes }
          : order
      )
      // Note: We would need to add updateOrderNotes to store for this to work properly
      setSelectedOrder({ ...selectedOrder, notes: orderNotes })
    }
  }

  const getFeatureName = (featureId: string) => {
    const featureNames: { [key: string]: string } = {
      'logo': 'Logo Tasarımı',
      'ssl': 'SSL Sertifikası',
      'whatsapp': 'WhatsApp Business API',
      'google-ads': 'Google Ads Yönetimi',
      'email-marketing': 'E-mail Marketing',
      'multilang': 'Çoklu Dil Desteği',
      'hosting': 'Özel Hosting',
      'maintenance': 'Maintenance (Yıllık)'
    }
    return featureNames[featureId] || featureId
  }



  const filteredOrders = useMemo(() => (orders || []).filter(order => {
    const customerName = order.customer_name || '';
    const customerEmail = order.customer_email || '';
    const websiteType = order.website_type || '';

    const matchesSearch =
      websiteType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.id || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus

    return matchesSearch && matchesStatus
  }), [orders, searchTerm, selectedStatus])

  // Show loading state
  if (!mounted || isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-teal-600" />
              <span className="text-lg text-muted-foreground">Veriler yükleniyor...</span>
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (!mounted) {
    return null;
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  if (user?.role !== 'admin') {
    router.push('/dashboard');
    return null;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
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
            className="flex items-center space-x-2 text-teal-600 hover:text-teal-700 hover:bg-teal-50 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Ana Sayfaya Dön</span>
          </Button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Panel</h1>
            <p className="text-muted-foreground">Sipariş yönetimi ve analitik veriler</p>
            {user && user.role === 'admin' && (
              <p className="text-sm text-muted-foreground mt-1">
                Hoş geldin, {user.firstName || user.fullName || user.email}
              </p>
            )}
            {(!isAuthenticated || user?.role !== 'admin') && (
              <p className="text-sm text-yellow-600 mt-1">
                ⚠️ Tam erişim için admin hesabı ile giriş yapın
              </p>
            )}
          </div>
          <div className="flex items-center space-x-3">
            {!isAuthenticated || user?.role !== 'admin' ? (
              <Link href="/auth/login">
                <Button
                  variant="outline"
                  className="border-teal-200 text-teal-600 hover:bg-teal-50 hover:border-teal-300"
                >
                  Admin Girişi
                </Button>
              </Link>
            ) : (
              <div className="flex items-center space-x-4">
                {/* Auto-refresh controls */}
                <div className="flex items-center space-x-2 text-sm">
                  <div className="flex items-center space-x-2 bg-gray-50 rounded-lg px-3 py-2">
                    <div className="flex items-center space-x-1">
                      <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      <span className="text-xs text-gray-600">
                        {autoRefresh ? 'Otomatik' : 'Manuel'}
                      </span>
                    </div>
                    <select
                      value={refreshInterval}
                      onChange={(e) => setRefreshInterval(Number(e.target.value))}
                      className="text-xs border-0 bg-transparent"
                      disabled={!autoRefresh}
                    >
                      <option value={10}>10s</option>
                      <option value={30}>30s</option>
                      <option value={60}>1dk</option>
                      <option value={300}>5dk</option>
                    </select>
                    <button
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className="text-xs text-teal-600 hover:text-teal-700"
                    >
                      {autoRefresh ? 'Durdur' : 'Başlat'}
                    </button>
                  </div>
                  <div className="text-xs text-gray-500">
                    Son: {lastRefresh.toLocaleTimeString('tr-TR')}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={refreshData}
                    className="text-xs"
                  >
                    Yenile
                  </Button>
                </div>

                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400"
                >
                  Çıkış Yap
                </Button>
              </div>
            )}
          </div>
        </div>

        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:grid-cols-3">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="orders">Siparişler</TabsTrigger>
            <TabsTrigger value="users">Kullanıcılar</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <Card key={i}>
                    <CardContent className="p-6">
                      <div className="animate-pulse h-16 bg-gray-200 rounded"></div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Toplam Gelir</p>
                        <p className="text-2xl font-bold text-green-600">
                          ₺{(typeof analytics.totalRevenue === 'number' ? analytics.totalRevenue : 0).toLocaleString('tr-TR')}
                        </p>
                      </div>
                      <DollarSign className="h-8 w-8 text-green-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Toplam Sipariş</p>
                        <p className="text-2xl font-bold text-teal-600">{analytics.totalOrders || 0}</p>
                      </div>
                      <Package className="h-8 w-8 text-teal-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Bekleyen Sipariş</p>
                        <p className="text-2xl font-bold text-orange-600">
                          {typeof analytics.pendingOrders === 'number' ? analytics.pendingOrders.toString() : '0'}
                        </p>
                      </div>
                      <Clock className="h-8 w-8 text-orange-600" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Tamamlanan</p>
                        <p className="text-2xl font-bold text-purple-600">{analytics.completedOrders || 0}</p>
                      </div>
                      <TrendingUp className="h-8 w-8 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle>Son Siparişler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          {order.website_name || `${getCustomerName(order)} Web Sitesi`}
                        </h4>
                        <Badge className={getStatusColor(order.status || 'pending')}>
                          {getStatusText(order.status || 'pending')}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold">₺{(order.total_price || 0).toLocaleString('tr-TR')}</span>
                        <span className="text-sm text-gray-600">
                          {(() => {
                            const date = order.created_at ? new Date(order.created_at) : new Date();
                            return !isNaN(date.getTime()) 
                              ? date.toLocaleDateString('tr-TR')
                              : 'Geçersiz Tarih';
                          })()}
                        </span>
                        <p className="font-medium">{getCustomerName(order)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            {/* Filters */}
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Sipariş, müşteri adı veya email ile ara..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <select
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option value="all">Tüm Durumlar</option>
                      <option value="pending">Bekliyor</option>
                      <option value="in-progress">Devam Ediyor</option>
                      <option value="completed">Tamamlandı</option>
                      <option value="delivered">Teslim Edildi</option>
                    </select>
                    
                    <Button variant="outline" size="sm" onClick={handleDownloadAllPDF}>
                      <Download className="h-4 w-4 mr-2" />
                      Tüm Siparişleri İndir
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>



            {/* Orders Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="text-left p-4 font-semibold">Sipariş</th>
                        <th className="text-left p-4 font-semibold">Müşteri</th>
                        <th className="text-left p-4 font-semibold">Telefon</th>
                        <th className="text-left p-4 font-semibold">Tür</th>
                        <th className="text-left p-4 font-semibold">Durum</th>
                        <th className="text-left p-4 font-semibold">Tutar</th>
                        <th className="text-left p-4 font-semibold">Tarih</th>
                        <th className="text-left p-4 font-semibold">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => (
                        <tr key={order.id} className="border-t hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-semibold">
                                {order.website_name || `${getCustomerName(order)} Web Sitesi`}
                              </p>
                              <p className="text-sm text-gray-600">#{order.id}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <div>
                              <p className="font-medium">
                                {getCustomerName(order)}
                              </p>
                              <p className="text-sm text-gray-600">
                                {order.customer_email || 'E-posta yok'}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">
                              {order.customer_phone || 'Telefon yok'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="capitalize">
                              {order.website_type || 'Bilinmiyor'}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(order.status || 'pending')}>
                              {getStatusText(order.status || 'pending')}
                            </Badge>
                          </td>
                          <td className="p-4 font-semibold">
                            ₺{(order.total_price || 0).toLocaleString('tr-TR')}
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-600">
                              {(() => {
                                const date = new Date(order.created_at || Date.now());
                                return isNaN(date.getTime()) 
                                  ? 'Geçersiz Tarih'
                                  : date.toLocaleDateString('tr-TR', {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric'
                                    });
                              })()}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => openOrderDetail(order)}
                              >
                                <Eye className="h-4 w-4 mr-1" />
                                Detay
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDownloadPDF(order)}
                              >
                                <Download className="h-4 w-4 mr-1" />
                                PDF
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {filteredOrders.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-gray-500">Sipariş bulunamadı.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Kullanıcı Yönetimi</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-semibold">Kullanıcı</th>
                        <th className="text-left p-4 font-semibold">E-posta</th>
                        <th className="text-left p-4 font-semibold">Şifre</th>
                        <th className="text-left p-4 font-semibold">Kayıt Tarihi</th>
                        <th className="text-left p-4 font-semibold">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{user.fullName || user.firstName + ' ' + user.lastName || user.email}</p>
                              <p className="text-sm text-gray-600">#{user.id}</p>
                            </div>
                          </td>
                          <td className="p-4">{user.email}</td>
                          <td className="p-4">
                            <div className="flex items-center gap-1.5">
                              <div className="relative">
                                <input
                                  type={showPassword[user.id] ? "text" : "password"}
                                  value={showPassword[user.id] ? (user.password || "••••••••") : "••••••••"}
                                  readOnly
                                  className="w-28 h-7 px-2 text-xs border rounded bg-gray-50 text-gray-700 font-mono"
                                />
                                <button
                                  type="button"
                                  onClick={() => setShowPassword((prev) => ({ ...prev, [user.id]: !prev[user.id] }))}
                                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-gray-500 hover:text-gray-700 focus:outline-none"
                                  tabIndex={-1}
                                  aria-label="Şifreyi Göster/Gizle"
                                >
                                  {showPassword[user.id] ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                </button>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            {user.createdAt ? 
                              new Date(user.createdAt).toLocaleDateString('tr-TR', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              }) : 
                              'Tarih bilgisi yok'
                            }
                          </td>
                          <td className="p-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" onClick={() => handleDeleteUser(user.id)}>
                                <Trash className="h-4 w-4 mr-1" /> Sil
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {users.length === 0 && (
                    <div className="text-center py-12">
                      <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">
                        Henüz kullanıcı bulunmuyor
                      </h3>
                      <p className="text-gray-500">
                        Kayıtlı kullanıcılar burada görünecek
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Sipariş Detay Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>Sipariş Detayları</span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => selectedOrder && handleDownloadPDF(selectedOrder)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  PDF İndir
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeOrderDetail}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
            <DialogDescription>
              Seçilen siparişin detaylı bilgilerini görüntüleyin ve düzenleyin.
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              {/* Temel Bilgiler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>Müşteri Bilgileri</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Ad Soyad</label>
                      <p className="font-semibold">{selectedOrder.customerName || selectedOrder.customer_name || 'Belirtilmemiş'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">E-mail</label>
                      <p>{selectedOrder.email || selectedOrder.customer_email || 'Belirtilmemiş'}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Meslek</label>
                      <Badge variant="outline">
                        {selectedOrder.profession || 'Belirtilmemiş'}
                      </Badge>
                    </div>

                    {/* Sosyal Medya Hesapları */}
                    <div>
                      <label className="text-sm font-medium text-gray-600">Sosyal Medya Hesapları</label>
                      <div className="space-y-2 mt-2">


                        {(selectedOrder.facebook && selectedOrder.facebook.trim() !== '') && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">f</span>
                            </div>
                            <a
                              href={selectedOrder.facebook.startsWith('http') ? selectedOrder.facebook : `https://facebook.com/${selectedOrder.facebook.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline text-sm"
                            >
                              {selectedOrder.facebook}
                            </a>
                          </div>
                        )}

                        {(selectedOrder.instagram && selectedOrder.instagram.trim() !== '') && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">i</span>
                            </div>
                            <a
                              href={selectedOrder.instagram.startsWith('http') ? selectedOrder.instagram : `https://instagram.com/${selectedOrder.instagram.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-purple-600 hover:underline text-sm"
                            >
                              {selectedOrder.instagram}
                            </a>
                          </div>
                        )}

                        {(selectedOrder.twitter && selectedOrder.twitter.trim() !== '') && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-400 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">x</span>
                            </div>
                            <a
                              href={selectedOrder.twitter.startsWith('http') ? selectedOrder.twitter : `https://twitter.com/${selectedOrder.twitter.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:underline text-sm"
                            >
                              {selectedOrder.twitter}
                            </a>
                          </div>
                        )}

                        {(selectedOrder.linkedin && selectedOrder.linkedin.trim() !== '') && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-700 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">in</span>
                            </div>
                            <a
                              href={selectedOrder.linkedin.startsWith('http') ? selectedOrder.linkedin : `https://linkedin.com/in/${selectedOrder.linkedin}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-700 hover:underline text-sm"
                            >
                              {selectedOrder.linkedin}
                            </a>
                          </div>
                        )}

                        {(selectedOrder.youtube && selectedOrder.youtube.trim() !== '') && (
                          <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-red-600 rounded flex items-center justify-center">
                              <span className="text-white text-xs font-bold">yt</span>
                            </div>
                            <a
                              href={selectedOrder.youtube.startsWith('http') ? selectedOrder.youtube : `https://youtube.com/${selectedOrder.youtube.replace('@', '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-red-600 hover:underline text-sm"
                            >
                              {selectedOrder.youtube}
                            </a>
                          </div>
                        )}

                        {(!selectedOrder.facebook || selectedOrder.facebook.trim() === '') &&
                         (!selectedOrder.instagram || selectedOrder.instagram.trim() === '') &&
                         (!selectedOrder.twitter || selectedOrder.twitter.trim() === '') &&
                         (!selectedOrder.linkedin || selectedOrder.linkedin.trim() === '') &&
                         (!selectedOrder.youtube || selectedOrder.youtube.trim() === '') && (
                          <p className="text-gray-500 text-sm">Sosyal medya hesabı belirtilmemiş</p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Globe className="h-5 w-5" />
                      <span>Proje Bilgileri</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <label className="text-sm font-medium text-gray-600">Website Adı</label>
                      <p className="font-semibold">
                        {selectedOrder.siteName || selectedOrder.websiteName || selectedOrder.website_name || `${getCustomerName(selectedOrder)} Web Sitesi`}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Tür</label>
                      <Badge variant="secondary">
                        {(selectedOrder.websiteType || selectedOrder.website_type) === 'single-page' ? 'Tek Sayfa' : 'Çok Sayfa'}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Durum</label>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {getStatusText(selectedOrder.status)}
                      </Badge>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Sipariş Tarihi</label>
                      <p className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(selectedOrder.createdAt || selectedOrder.created_at || Date.now()).toLocaleDateString('tr-TR')}</span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Hedef Kitle ve Amaç */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Target className="h-5 w-5" />
                      <span>Hedef Kitle</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedOrder.targetAudience || selectedOrder.target_audience || 'Belirtilmemiş'}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Website Amacı</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{selectedOrder.purpose || 'Belirtilmemiş'}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Renk Paleti */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Palette className="h-5 w-5" />
                    <span>Renk Paleti</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="outline" className="capitalize">
                    {selectedOrder.colorPalette || selectedOrder.color_palette || 'Belirtilmemiş'}
                  </Badge>
                </CardContent>
              </Card>

              {/* Seçili Sayfalar (Çok sayfalı için) */}
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

                return selectedOrder.website_type === 'multi-page' && selectedPages.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Seçili Sayfalar ({selectedPages.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {selectedPages.map((pageId: string) => {
                          const page = PAGE_OPTIONS.find(p => p.id === pageId)
                          return page ? (
                            <div key={pageId} className="p-3 bg-teal-50 rounded-lg border">
                              <h5 className="font-medium text-teal-900">{page.name}</h5>
                              <p className="text-xs text-teal-700 mt-1">{page.description}</p>
                              <p className="text-sm font-bold text-teal-800 mt-2">₺{page.price}</p>
                            </div>
                          ) : null
                        })}
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}

              {/* Ek Özellikler */}
              {(() => {
                // Güvenli additional_features kontrolü
                let additionalFeatures = selectedOrder.additional_features || selectedOrder.selected_features || []

                if (typeof additionalFeatures === 'string') {
                  try {
                    additionalFeatures = JSON.parse(additionalFeatures)
                  } catch (e) {
                    additionalFeatures = []
                  }
                }

                if (!Array.isArray(additionalFeatures)) {
                  additionalFeatures = []
                }

                return additionalFeatures.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Ek Özellikler ({additionalFeatures.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {additionalFeatures.map((feature: any, index: number) => (
                          <Badge key={index} variant="secondary">
                            {typeof feature === 'string' ? getFeatureName(feature) : (feature.name || feature.id || 'Bilinmeyen Özellik')}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })()}

              {/* Hakkımda / Özel İstekler - HER ZAMAN GÖSTER */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Hakkınızda, İş Tecrübeleriniz ve Özel İstekleriniz</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-500">
                      <h4 className="font-semibold text-teal-900 mb-2">📋 Kişisel ve Mesleki Bilgiler</h4>
                      <p className="text-teal-800 whitespace-pre-wrap leading-relaxed">
                        {selectedOrder.specialRequests || selectedOrder.special_requests || selectedOrder.knowledge_text || selectedOrder.notes || 'Kullanıcı bu alanı doldurmamış.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-teal-50 p-3 rounded-lg border-l-4 border-teal-500">
                        <h5 className="font-semibold text-teal-900 text-sm mb-1">💼 Deneyimleriniz</h5>
                        <p className="text-teal-700 text-xs">
                          Eğitim durumu, çalıştığınız yerler, deneyim süresi
                        </p>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg border-l-4 border-green-500">
                        <h5 className="font-semibold text-green-900 text-sm mb-1">💡 Uzmanlık Alanları</h5>
                        <p className="text-green-700 text-xs">
                          Özel branşlarınız, sertifikalarınız, yetenekleriniz
                        </p>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg border-l-4 border-purple-500">
                        <h5 className="font-semibold text-purple-900 text-sm mb-1">👥 Çalışma Şekli</h5>
                        <p className="text-purple-700 text-xs">
                          Çalışma saatleri, randevu sistemi, ekip bilgileri
                        </p>
                      </div>
                    </div>

                    <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                      <h5 className="font-semibold text-yellow-900 text-sm mb-1">ℹ️ Website'de Kullanım</h5>
                      <p className="text-yellow-800 text-xs">
                        Bu bilgiler website'nin "Hakkımızda" sayfasında ve hizmet tanıtımlarında kullanılacak.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Fiyat Detayı */}
              <Card>
                <CardHeader>
                  <CardTitle>Fiyat Detayı</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Temel paket:</span>
                      <span>₺{selectedOrder.website_type === 'single-page' ? '1,999' : '3,999'}</span>
                    </div>
                    {(() => {
                      // Güvenli selected_pages fiyat hesaplama
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

                      const pagesPrice = selectedPages.reduce((sum: number, pageId: string) => {
                        const page = PAGE_OPTIONS.find(p => p.id === pageId)
                        return sum + (page?.price || 0)
                      }, 0)

                      return selectedPages.length > 0 && (
                        <div className="flex justify-between">
                          <span>Ek sayfalar:</span>
                          <span>₺{pagesPrice.toLocaleString()}</span>
                        </div>
                      )
                    })()}
                    <hr />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Toplam:</span>
                      <span>₺{(selectedOrder.total_price || selectedOrder.totalPrice || 0).toLocaleString('tr-TR')}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Website Teslimi ve Durum Yönetimi */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>Sipariş Yönetimi</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Mevcut Website URL */}
                  {selectedOrder.websiteUrl && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                      <label className="text-sm font-medium text-green-800">Teslim Edilen Website</label>
                      <div className="flex items-center space-x-2 mt-1">
                        <a
                          href={selectedOrder.websiteUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-800 underline"
                        >
                          {selectedOrder.websiteUrl}
                        </a>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => window.open(selectedOrder.websiteUrl, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Website URL Girişi */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Website URL</label>
                    <Input
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      placeholder="https://example.com"
                      className="mt-1"
                    />
                  </div>

                  {/* Admin Notları */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Admin Notları</label>
                    <Textarea
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Sipariş hakkında notlarınızı buraya yazın..."
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  {/* Tahmini Teslim Tarihi */}
                  <div>
                    <label className="text-sm font-medium text-gray-600">Tahmini Teslim Tarihi</label>
                    <Input
                      type="date"
                      value={estimatedDeliveryDate}
                      onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  {/* Durum Güncelleme Butonları */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-600">Sipariş Durumu Güncelle</label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(selectedOrder.id, 'in-progress')}
                        className="text-teal-600 border-teal-200 hover:bg-teal-50"
                      >
                        İşleme Al
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(selectedOrder.id, 'completed')}
                        className="text-green-600 border-green-200 hover:bg-green-50"
                      >
                        Tamamla
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(selectedOrder.id, 'delivered')}
                        className="text-purple-600 border-purple-200 hover:bg-purple-50"
                      >
                        Teslim Et
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => handleStatusChange(selectedOrder.id, 'pending')}
                        className="text-orange-600 border-orange-200 hover:bg-orange-50"
                      >
                        Beklemede
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default function AdminPage() {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Bir Hata Oluştu</h2>
          <p className="text-gray-600">Lütfen sayfayı yenileyin veya daha sonra tekrar deneyin.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <AdminPageContent />
    </div>
  );
}