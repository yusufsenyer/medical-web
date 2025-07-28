"use client"

import { useState, useEffect, useCallback } from 'react'
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
  Loader2
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { motion, AnimatePresence } from 'framer-motion'
import { PAGE_OPTIONS } from '@/lib/constants'
import { useAuth } from '@/hooks/use-auth'
import { useStore } from '@/lib/store'
import { generateOrderPDF, generateAllOrdersPDF } from '@/lib/pdf-utils'

// All data comes from backend API

export default function AdminPage() {
  const router = useRouter()
  const { user, logout, isAuthenticated } = useAuth()
  const { orders, analytics, users, updateOrderStatus, loadOrders, loadAnalytics, loadUsers, updateUserRole } = useStore()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [orderNotes, setOrderNotes] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [refreshInterval, setRefreshInterval] = useState(30) // seconds
  const [lastRefresh, setLastRefresh] = useState(new Date())

  // Admin access control
  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
      return
    }

    if (user && user.role !== 'admin') {
      router.push('/dashboard') // Redirect customers to their dashboard
      return
    }
  }, [user, isAuthenticated, router])

  // Load orders and analytics on component mount
  useEffect(() => {
    const loadData = async () => {
      if (user?.role === 'admin') {
        try {
          await Promise.all([loadOrders(), loadAnalytics(), loadUsers()])
        } catch (error) {
          console.error('Error loading admin data:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }

    loadData()
  }, [user, loadOrders, loadAnalytics])

  // Auto-refresh functionality
  const refreshData = useCallback(async () => {
    if (user?.role === 'admin') {
      try {
        await Promise.all([loadOrders(), loadAnalytics(), loadUsers()])
        setLastRefresh(new Date())
      } catch (error) {
        console.error('Error refreshing data:', error)
      }
    }
  }, [user, loadOrders, loadAnalytics, loadUsers])

  useEffect(() => {
    if (!autoRefresh || !user?.role === 'admin') return

    const interval = setInterval(() => {
      refreshData()
    }, refreshInterval * 1000)

    return () => clearInterval(interval)
  }, [autoRefresh, refreshInterval, refreshData, user])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    updateOrderStatus(orderId, newStatus)
  }

  const handleDownloadPDF = (order: any) => {
    generateOrderPDF(order)
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800'
      case 'customer': return 'bg-blue-100 text-blue-800'
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
    if (order.customerEmail || order.customer_email) {
      const email = order.customerEmail || order.customer_email
      return email.split('@')[0] // Use email username part
    }

    return `Sipariş #${order.id?.slice(-6) || 'Bilinmiyor'}`
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



  const filteredOrders = orders.filter(order => {
    const customerName = order.customerName || `${order.customer_name || ''} ${order.customer_surname || ''}`.trim()
    const customerEmail = order.customerEmail || order.customer_email || ''
    const websiteType = order.websiteType || order.website_type || ''

    const matchesSearch =
      websiteType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.id || '').toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
              <span className="text-lg text-muted-foreground">Veriler yükleniyor...</span>
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
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300"
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
                      className="text-xs text-blue-600 hover:text-blue-700"
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Toplam Gelir</p>
                      <p className="text-2xl font-bold text-green-600">
                        ₺{analytics.totalRevenue?.toLocaleString('tr-TR') || '0'}
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
                      <p className="text-2xl font-bold text-blue-600">{analytics.totalOrders || 0}</p>
                    </div>
                    <Package className="h-8 w-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Bekleyen Sipariş</p>
                      <p className="text-2xl font-bold text-orange-600">{analytics.pendingOrders || 0}</p>
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
                        <p className="text-sm text-gray-600">
                          {getCustomerName(order)}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusText(order.status)}
                        </Badge>
                        <span className="font-semibold">₺{(order.total_price || order.totalPrice || 0).toLocaleString('tr-TR')}</span>
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

            {/* DEBUG: Orders Info */}
            <div className="bg-yellow-100 p-4 rounded-lg border border-yellow-300 mb-4">
              <strong>DEBUG - Orders Info:</strong><br/>
              Total orders: {orders.length}<br/>
              Filtered orders: {filteredOrders.length}<br/>
              Latest order ID: {orders.length > 0 ? Math.max(...orders.map(o => o.id)) : 'None'}<br/>
              Order IDs: {orders.map(o => o.id).join(', ')}
            </div>

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
                                {order.customerEmail || order.customer_email || 'E-posta yok'}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline">
                              {order.customerPhone || order.customer_phone || 'Telefon yok'}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="capitalize">
                              {order.websiteType || order.website_type || 'Bilinmiyor'}
                            </span>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusText(order.status)}
                            </Badge>
                          </td>
                          <td className="p-4 font-semibold">
                            ₺{(order.total_price || order.totalPrice || 0).toLocaleString('tr-TR')}
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-600">
                              {new Date(order.createdAt || order.created_at || Date.now()).toLocaleDateString('tr-TR')}
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
                        <th className="text-left p-4 font-semibold">Rol</th>
                        <th className="text-left p-4 font-semibold">Kayıt Tarihi</th>
                        <th className="text-left p-4 font-semibold">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <div className="font-semibold">
                                {user.firstName} {user.lastName}
                              </div>
                              <div className="text-sm text-gray-600">
                                ID: {user.id}
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <span className="text-sm">{user.email}</span>
                          </td>
                          <td className="p-4">
                            <Badge className={getRoleColor(user.role)}>
                              {getRoleText(user.role)}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <span className="text-sm text-gray-600">
                              {new Date(user.createdAt || Date.now()).toLocaleDateString('tr-TR')}
                            </span>
                          </td>
                          <td className="p-4">
                            <div className="flex items-center space-x-2">
                              <select
                                value={user.role}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                                className="text-sm border rounded px-2 py-1"
                              >
                                <option value="customer">Müşteri</option>
                                <option value="admin">Admin</option>
                              </select>
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
                      <p className="font-semibold">{selectedOrder.customer_name} {selectedOrder.customer_surname}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">E-mail</label>
                      <p>{selectedOrder.customer_email}</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-600">Meslek</label>
                      <Badge variant="outline">
                        {selectedOrder.profession || 'Belirtilmemiş'}
                      </Badge>
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
                        {selectedOrder.websiteName || selectedOrder.website_name || `${getCustomerName(selectedOrder)} Web Sitesi`}
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
                            <div key={pageId} className="p-3 bg-blue-50 rounded-lg border">
                              <h5 className="font-medium text-blue-900">{page.name}</h5>
                              <p className="text-xs text-blue-700 mt-1">{page.description}</p>
                              <p className="text-sm font-bold text-blue-800 mt-2">₺{page.price}</p>
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
                    <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-semibold text-blue-900 mb-2">📋 Kişisel ve Mesleki Bilgiler</h4>
                      <div className="mb-2 text-xs text-gray-600 bg-gray-100 p-2 rounded">
                        <strong>DEBUG:</strong><br/>
                        special_requests: "{selectedOrder.special_requests}"<br/>
                        knowledge_text: "{selectedOrder.knowledge_text}"<br/>
                        notes: "{selectedOrder.notes}"<br/>
                        Order ID: {selectedOrder.id}
                      </div>
                      <p className="text-blue-800 whitespace-pre-wrap leading-relaxed">
                        {selectedOrder.special_requests || selectedOrder.knowledge_text || selectedOrder.notes || 'Kullanıcı bu alanı doldurmamış.'}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                        <h5 className="font-semibold text-blue-900 text-sm mb-1">💼 Deneyimleriniz</h5>
                        <p className="text-blue-700 text-xs">
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

              {/* Notlar */}
              <Card>
                <CardHeader>
                  <CardTitle>Admin Notları</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Textarea
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder="Sipariş hakkında notlarınızı buraya yazın..."
                    className="min-h-[100px]"
                  />
                  <Button onClick={saveOrderNotes} className="w-full">
                    Notları Kaydet
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}