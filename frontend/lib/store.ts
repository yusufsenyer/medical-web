import { create } from 'zustand'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'

// Mock Users for Development
const MOCK_USERS: User[] = [
  {
    id: 'admin-1',
    email: 'admin123@example.com',
    firstName: 'Admin',
    lastName: 'User',
    fullName: 'Admin User',
    password: 'admin123',
    role: 'admin',
    isEmailVerified: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

export interface Feature {
  id: string
  name: string
  description: string
  price: number
  category: string
  is_active: boolean
}

export interface Order {
  customer_phone?: string
  id?: string
  website_name: string
  customer_name: string
  customer_surname: string
  customer_email: string
  profession: string
  website_type: 'single-page' | 'multi-page'
  color_palette: string
  target_audience: string
  purpose: string
  additional_features: string[]
  selected_pages?: string[]
  total_price: number
  delivery_days: number
  status?: 'pending' | 'in-progress' | 'completed' | 'delivered' | string
  knowledge_text?: string
  created_at?: string
  updated_at?: string
  instagram?: string
  facebook?: string
  twitter?: string
  linkedin?: string
  youtube?: string
}

export interface User {
  bio?: string
  company?: string
  id: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  password?: string // For registered users
  role: 'admin' | 'customer' | string
  phone?: string
  isEmailVerified: boolean
  createdAt: string
  updatedAt: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  token: string | null
}

interface StoreState {
  // Order state
  currentOrder: Partial<Order>
  orderStep: number
  selectedFeatures: Feature[]
  selectedPages: string[]
  totalPrice: number
  isLoading: boolean

  // Admin state
  orders: Order[]
  userOrders: Order[]
  analytics: any

  // Auth state
  auth: AuthState

  // Registered users
  registeredUsers: User[]
  users: User[]

  // Actions
  updateOrder: (data: Partial<Order>) => void
  nextStep: () => void
  prevStep: () => void
  resetOrder: () => void
  addFeature: (feature: Feature) => void
  removeFeature: (featureId: string) => void
  addPage: (pageId: string) => void
  removePage: (pageId: string) => void
  setOrders: (orders: Order[]) => void
  setLoading: (loading: boolean) => void
  calculateTotal: () => void
  addOrder: (order: Order) => Promise<boolean>
  updateOrderStatus: (orderId: string, status: string) => void
  loadOrders: () => Promise<boolean>
  loadAnalytics: () => Promise<any>
  loadUserOrders: () => Promise<boolean>
  loadUsers: () => Promise<boolean>
  loadAllUsers: () => Promise<boolean>
  loadAllOrders: () => Promise<boolean>
  updateUserRole: (userId: string, role: string) => Promise<boolean>

  // Auth actions
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  setAuthLoading: (loading: boolean) => void
  login: (email: string, password: string) => Promise<boolean>
  signUp: (userData: { firstName: string, lastName: string, email: string, password: string }) => Promise<boolean>
  logout: () => void
  checkAuth: () => Promise<void>
}

export const useStore = create<StoreState>((set, get) => ({
  currentOrder: {},
  orderStep: 1,
  selectedFeatures: [],
  selectedPages: [],
  totalPrice: 0,
  isLoading: false,
  orders: [], // Admin orders
  userOrders: [], // User orders for dashboard
  analytics: {
    totalOrders: 0,
    pendingOrders: 0,
    inProgressOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    averageOrderValue: 0
  },

  // Auth initial state
  auth: {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    token: null
  },

  // Registered users storage
  registeredUsers: typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('registered-users') || '[]') : [],
  users: [],

  updateOrder: (data) => set((state) => ({
    currentOrder: { ...state.currentOrder, ...data }
  })),

  nextStep: () => set((state) => ({
    orderStep: Math.min(state.orderStep + 1, 6)
  })),

  prevStep: () => set((state) => ({
    orderStep: Math.max(state.orderStep - 1, 1)
  })),

  resetOrder: () => set(() => ({
    currentOrder: {},
    orderStep: 1,
    selectedFeatures: [],
    selectedPages: [],
    totalPrice: 0
  })),

  addFeature: (feature) => set((state) => {
    const exists = state.selectedFeatures.find(f => f.id === feature.id)
    if (!exists) {
      const newFeatures = [...state.selectedFeatures, feature]
      return { selectedFeatures: newFeatures }
    }
    return state
  }),

  removeFeature: (featureId) => set((state) => ({
    selectedFeatures: state.selectedFeatures.filter(f => f.id !== featureId)
  })),

  addPage: (pageId) => set((state) => {
    const exists = state.selectedPages.includes(pageId)
    if (!exists) {
      return { selectedPages: [...state.selectedPages, pageId] }
    }
    return state
  }),

  removePage: (pageId) => set((state) => ({
    selectedPages: state.selectedPages.filter(id => id !== pageId)
  })),

  setOrders: (orders) => set(() => ({ orders })),

  loadOrders: async () => {
    set((state) => ({ isLoading: true }))

    try {
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        set(() => ({
          orders: data,
          isLoading: false
        }))
        return true
      } else {
        throw new Error('Siparişler yüklenemedi')
      }
    } catch (error) {
      set((state) => ({ isLoading: false }))
      throw error
    }
  },

  loadAnalytics: async () => {
    try {
      // Calculate analytics from orders
      const state = get()
      const orders = state.orders || []

      const analytics = {
        totalOrders: orders.length,
        pendingOrders: orders.filter(o => o.status === 'pending').length,
        completedOrders: orders.filter(o => o.status === 'completed').length,
        totalRevenue: orders.reduce((sum, o) => sum + (typeof o.total_price === 'string' ? parseFloat(o.total_price) : o.total_price || 0), 0)
      }

      set(() => ({ analytics }))
      return analytics
    } catch (error) {
      throw error
    }
  },

  loadUserOrders: async () => {
    // Firestore'dan siparişleri çek
    set((state) => ({ isLoading: true }))
    try {
      const userData = localStorage.getItem('user-data')
      const userEmail = userData ? JSON.parse(userData).email : null
      if (!userEmail) {
        set((state) => ({ ...state, isLoading: false }))
        return false
      }
      const { db, collection, getDocs, query, where } = await import('./firebase')
      const ordersRef = collection(db, 'orders')
      const q = query(ordersRef, where('email', '==', userEmail))
      const querySnapshot = await getDocs(q)
      const userOrders = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          website_name: data.website_name || data.websiteName || '',
          customer_name: data.customer_name || data.customerName || '',
          customer_surname: data.customer_surname || data.customerSurname || '',
          customer_email: data.customer_email || data.customerEmail || '',
          customer_phone: data.customer_phone || data.customerPhone || '',
          profession: data.profession || '',
          website_type: data.website_type || data.websiteType || 'single-page',
          color_palette: data.color_palette || data.colorPalette || '',
          target_audience: data.target_audience || data.targetAudience || '',
          purpose: data.purpose || '',
          additional_features: data.additional_features || data.selectedFeatures || [],
          selected_pages: data.selected_pages || data.selectedPages || [],
          total_price: data.total_price || data.totalPrice || 0,
          base_price: data.base_price || data.basePrice || 0,
          delivery_days: data.delivery_days || data.deliveryDays || 0,
          status: data.status || '',
          knowledge_text: data.knowledge_text || data.specialRequests || '',
          created_at: data.created_at || data.createdAt || '',
          updated_at: data.updated_at || data.updatedAt || '',
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || ''
        }
      })
      set(() => ({ userOrders, isLoading: false }))
      return true
    } catch (error) {
      set((state) => ({ ...state, isLoading: false }))
      throw error
    }
  },

  loadUsers: async () => {
    set((state) => ({ isLoading: true }))

    try {
      const response = await fetch(`${API_BASE_URL}/users`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data = await response.json()
        set(() => ({
          users: data,
          isLoading: false
        }))
        return true
      } else {
        throw new Error('Kullanıcılar yüklenemedi')
      }
    } catch (error) {
      set((state) => ({ isLoading: false }))
      throw error
    }
  },

  updateUserRole: async (userId: string, role: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { role } }),
      })

      if (response.ok) {
        const data = await response.json()
        // Update local state
        set((state) => ({
          users: state.users.map(user =>
            user.id === userId ? { ...user, role } : user
          )
        }))
        return true
      } else {
        throw new Error('Kullanıcı rolü güncellenemedi')
      }
    } catch (error) {
      throw error
    }
  },

  setLoading: (loading) => set(() => ({ isLoading: loading })),

  calculateTotal: () => {
    const state = get()
    const basePrice = state.currentOrder.website_type === 'single-page' ? 1999 : 3999
    const featuresPrice = state.selectedFeatures.reduce((sum, feature) => sum + feature.price, 0)

    // Calculate pages price for multi-page websites
    let pagesPrice = 0
    if (state.currentOrder.website_type === 'multi-page') {
      // Import PAGE_OPTIONS here to avoid circular dependency
      const PAGE_OPTIONS = [
        { id: 'about', price: 200 }, { id: 'services', price: 300 }, { id: 'pricing', price: 250 },
        { id: 'privacy', price: 150 }, { id: 'news', price: 400 }, { id: 'success', price: 350 },
        { id: 'career', price: 300 }, { id: 'store', price: 800 }, { id: 'events', price: 400 },
        { id: 'forum', price: 600 }, { id: 'chat', price: 500 }, { id: 'education', price: 700 },
        { id: 'locator', price: 450 }, { id: 'appointment', price: 600 }, { id: 'helpdesk', price: 550 }
      ]

      pagesPrice = state.selectedPages.reduce((sum, pageId) => {
        const page = PAGE_OPTIONS.find(p => p.id === pageId)
        return sum + (page?.price || 0)
      }, 0)
    }

    const totalPrice = basePrice + featuresPrice + pagesPrice

    // Only update if price actually changed
    if (state.totalPrice !== totalPrice) {
      set({ totalPrice })

      // Update order with calculated total and selected pages
      set((state) => ({
        currentOrder: {
          ...state.currentOrder,
          total_price: totalPrice,
          selected_pages: state.selectedPages
        }
      }))
    }
  },

  addOrder: async (order) => {
    set((state) => ({ isLoading: true }))

    try {
      // Call Rails backend API
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          order: {
            // Customer info
            customer_name: `${order.customer_name} ${order.customer_surname}`.trim(),
            customer_email: order.customer_email,
            customer_phone: order.customer_phone || '',
            profession: order.profession || '',

            // Website details
            website_name: order.website_name || '',
            website_type: order.website_type,
            target_audience: order.target_audience || '',
            purpose: order.purpose || '',
            color_palette: order.color_palette || '',

            // Pages and features
            selected_pages: JSON.stringify(order.selected_pages || []),
            selected_features: JSON.stringify(order.additional_features?.map(f => ({ id: f, name: f, price: 0 })) || []),

            // Pricing
            base_price: order.total_price,
            total_price: order.total_price,

            // Additional info
            special_requests: order.knowledge_text || '',
            delivery_days: order.delivery_days || 7,
            status: 'pending'
          }
        }),
      })

      if (response.ok) {
        const data = await response.json()

        set((state) => {
          const newOrders = [...state.orders, data] // Admin orders
          const newUserOrders = [...state.userOrders, data] // User orders
          const totalRevenue = newOrders.reduce((sum, o) => sum + (parseFloat(o.total_price) || 0), 0)
          const pendingOrders = newOrders.filter(o => o.status === 'pending').length
          const inProgressOrders = newOrders.filter(o => o.status === 'in_progress').length
          const completedOrders = newOrders.filter(o => o.status === 'completed').length

          return {
            orders: newOrders, // Admin orders
            userOrders: newUserOrders, // User orders
            isLoading: false,
            analytics: {
              totalOrders: newOrders.length,
              pendingOrders,
              inProgressOrders,
              completedOrders,
              totalRevenue,
              averageOrderValue: newOrders.length > 0 ? Math.round(totalRevenue / newOrders.length) : 0
            }
          }
        })
        return true
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Sipariş oluşturulamadı')
      }
    } catch (error) {
      set((state) => ({ isLoading: false }))
      throw error
    }
  },

  updateOrderStatus: (orderId, status) => set((state) => ({
    orders: state.orders.map(order =>
      order.id === orderId
        ? { ...order, status, updated_at: new Date().toISOString() }
        : order
    )
  })),

  // Auth actions
  setUser: (user) => set((state) => ({
    auth: { ...state.auth, user, isAuthenticated: !!user }
  })),

  setToken: (token) => set((state) => ({
    auth: { ...state.auth, token }
  })),

  setAuthLoading: (loading) => set((state) => ({
    auth: { ...state.auth, isLoading: loading }
  })),

  login: async (email, password) => {
    set((state) => ({ auth: { ...state.auth, isLoading: true } }))

    try {
      // Check mock users first
      const mockUser = MOCK_USERS.find(u => u.email === email && u.password === password)

      if (mockUser) {
        // Mock login success
        const user: User = {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName || '',
          lastName: mockUser.lastName || '',
          fullName: mockUser.fullName || `${mockUser.firstName} ${mockUser.lastName}`,
          role: mockUser.role,
          phone: '',
          company: '',
          bio: '',
          isEmailVerified: true,
          createdAt: mockUser.createdAt,
          updatedAt: mockUser.updatedAt
        }

        const token = 'mock-admin-token-' + Date.now()

        // Store in localStorage
        localStorage.setItem('auth-token', token)
        localStorage.setItem('user-data', JSON.stringify(user))

        // Check if this is first login (no previous login data)
        const isFirstLogin = !localStorage.getItem('has-logged-in-before')
        if (isFirstLogin && user.role !== 'admin') {
          localStorage.setItem('is-first-login', 'true')
        }
        localStorage.setItem('has-logged-in-before', 'true')

        set((state) => ({
          auth: {
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          }
        }))

        return true
      }

      // If not found in mock users, try backend API
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: { email, password } }),
      })

      const data = await response.json()

      if (data.success) {
        const user: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          firstName: data.data.user.firstName || '',
          lastName: data.data.user.lastName || '',
          fullName: data.data.user.fullName || `${data.data.user.firstName} ${data.data.user.lastName}`,
          role: data.data.user.role,
          phone: data.data.user.phone || '',
          company: data.data.user.company || '',
          bio: data.data.user.bio || '',
          isEmailVerified: true,
          createdAt: data.data.user.createdAt || new Date().toISOString(),
          updatedAt: data.data.user.updatedAt || new Date().toISOString()
        }

        const token = data.data.token

        // Store in localStorage
        localStorage.setItem('auth-token', token)
        localStorage.setItem('user-data', JSON.stringify(user))

        // Check if this is first login (no previous login data)
        const isFirstLogin = !localStorage.getItem('has-logged-in-before')
        if (isFirstLogin && user.role !== 'admin') {
          localStorage.setItem('is-first-login', 'true')
        }
        localStorage.setItem('has-logged-in-before', 'true')

        set((state) => ({
          auth: {
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          }
        }))

        return true
      } else {
        throw new Error(data.message || 'Giriş başarısız')
      }
    } catch (error) {
      set((state) => ({
        auth: { ...state.auth, isLoading: false }
      }))

      if (error instanceof Error) {
        throw error
      }
      throw new Error('Bağlantı hatası')
    }
  },

  signUp: async (userData) => {
    set((state) => ({ auth: { ...state.auth, isLoading: true } }))

    try {
      console.log('Sending signup request:', userData);

      // Call Rails backend API
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: userData }),
      })

      const data = await response.json()
      console.log('Signup response:', data);

      if (data.success) {
        const user: User = {
          id: data.data.user.id,
          email: data.data.user.email,
          firstName: data.data.user.firstName || '',
          lastName: data.data.user.lastName || '',
          fullName: data.data.user.fullName || `${data.data.user.firstName} ${data.data.user.lastName}`,
          role: data.data.user.role,
          phone: data.data.user.phone || '',
          company: data.data.user.company || '',
          bio: data.data.user.bio || '',
          isEmailVerified: true,
          createdAt: data.data.user.createdAt || new Date().toISOString(),
          updatedAt: data.data.user.updatedAt || new Date().toISOString()
        }

        const token = data.data?.token || `fake-token-${user.id}`

        // Store in localStorage
        localStorage.setItem('auth-token', token)
        localStorage.setItem('user-data', JSON.stringify(user))
        localStorage.setItem('is-first-login', 'true') // Mark as first login

        set((state) => ({
          auth: {
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          }
        }))

        return true
      } else {
        throw new Error(data.message || 'Kayıt başarısız')
      }
    } catch (error) {
      set((state) => ({
        auth: { ...state.auth, isLoading: false }
      }))

      if (error instanceof Error) {
        throw error
      }
      throw new Error('Bağlantı hatası')
    }
  },

  logout: () => {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user-data')

    set((state) => ({
      auth: {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false
      }
    }))
  },

  checkAuth: async () => {
    set((state) => ({ auth: { ...state.auth, isLoading: true } }))

    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        set((state) => ({
          auth: {
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          }
        }))
        return
      }

      const token = localStorage.getItem('auth-token')
      const userData = localStorage.getItem('user-data')

      if (token && userData) {
        const user = JSON.parse(userData)
        set((state) => ({
          auth: {
            user,
            token,
            isAuthenticated: true,
            isLoading: false
          }
        }))
      } else {
        set((state) => ({
          auth: {
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false
          }
        }))
      }
    } catch (error) {
      console.error('checkAuth error:', error)
      set((state) => ({
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false
        }
      }))
    }
  },

  // Admin functions
  loadAllOrders: async () => {
    try {
      console.log('Store: Loading all orders for admin (Firestore)')
      const { db, collection, getDocs } = await import('./firebase')
      const ordersRef = collection(db, 'orders')
      const querySnapshot = await getDocs(ordersRef)
      const orders = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          website_name: data.website_name || data.websiteName || '',
          customer_name: data.customer_name || data.customerName || '',
          customer_surname: data.customer_surname || data.customerSurname || '',
          customer_email: data.customer_email || data.customerEmail || '',
          customer_phone: data.customer_phone || data.customerPhone || '',
          profession: data.profession || '',
          website_type: data.website_type || data.websiteType || 'single-page',
          color_palette: data.color_palette || data.colorPalette || '',
          target_audience: data.target_audience || data.targetAudience || '',
          purpose: data.purpose || '',
          additional_features: data.additional_features || data.selectedFeatures || [],
          selected_pages: data.selected_pages || data.selectedPages || [],
          total_price: data.total_price || data.totalPrice || 0,
          base_price: data.base_price || data.basePrice || 0,
          delivery_days: data.delivery_days || data.deliveryDays || 0,
          status: data.status || '',
          knowledge_text: data.knowledge_text || data.specialRequests || '',
          created_at: data.created_at || data.createdAt || '',
          updated_at: data.updated_at || data.updatedAt || '',
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          website_url: data.website_url || data.websiteUrl || ''
        }
      })
      set((state) => ({ orders }))
      return true
    } catch (error) {
      console.error('Store: Error loading all orders (Firestore):', error)
      return false
    }
  },

  loadAllUsers: async () => {
    try {
      console.log('Store: Loading all users for admin (Firestore)')
      const { db, collection, getDocs } = await import('./firebase')
      const usersRef = collection(db, 'users')
      const querySnapshot = await getDocs(usersRef)
      const users = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          email: data.email || '',
          firstName: data.firstName || '',
          lastName: data.lastName || '',
          fullName: data.fullName || `${data.firstName || ''} ${data.lastName || ''}`,
          role: data.role || 'customer',
          phone: data.phone || '',
          company: data.company || '',
          bio: data.bio || '',
          password: data.password || '',
          isEmailVerified: data.isEmailVerified || false,
          createdAt: data.createdAt || '',
          updatedAt: data.updatedAt || ''
        }
      })
      set((state) => ({ users }))
      return true
    } catch (error) {
      console.error('Store: Error loading all users (Firestore):', error)
      return false
    }
  }
}))