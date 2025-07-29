import { create } from 'zustand'

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1'

export interface Feature {
  id: string
  name: string
  description: string
  price: number
  category: string
  is_active: boolean
}

export interface Order {
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
  status?: 'pending' | 'in-progress' | 'completed' | 'delivered'
  knowledge_text?: string
  created_at?: string
  updated_at?: string
}

export interface User {
  id: string
  email: string
  firstName?: string
  lastName?: string
  fullName?: string
  password?: string // For registered users
  role: 'admin' | 'customer'
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
        totalRevenue: orders.reduce((sum, o) => sum + (parseFloat(o.total_price) || 0), 0)
      }

      set(() => ({ analytics }))
      return analytics
    } catch (error) {
      throw error
    }
  },

  loadUserOrders: async () => {
    console.log('Store: loadUserOrders called')
    set((state) => ({ isLoading: true }))

    try {
      // Rails backend'ten tüm siparişleri çek
      console.log(`Store: Fetching from ${API_BASE_URL}/orders`)
      const response = await fetch(`${API_BASE_URL}/orders`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })

      console.log('Store: Response status:', response.status)

      if (response.ok) {
        const apiResponse = await response.json()
        console.log('Store: API Response from Rails:', apiResponse)

        const orders = apiResponse.data || []
        console.log('Store: Orders array:', orders)
        console.log('Store: Orders count:', orders.length)

        // Kullanıcının siparişlerini filtrele (email'e göre)
        const userData = localStorage.getItem('user-data')
        console.log('Store: Raw user data from localStorage:', userData)

        const userEmail = userData ? JSON.parse(userData).email : null
        console.log('Store: User email for filtering:', userEmail)

        const userOrders = userEmail ? orders.filter(order => {
          console.log('Store: Checking order:', order.email, 'vs', userEmail)
          return order.email === userEmail
        }) : []
        console.log('Store: Filtered user orders:', userOrders)
        console.log('Store: User orders count:', userOrders.length)

        set((state) => {
          console.log('Store: Setting userOrders in state')
          return {
            ...state,
            userOrders: userOrders,
            isLoading: false
          }
        })
        return true
      } else {
        const errorText = await response.text()
        console.error('Store: API Error:', response.status, errorText)
        throw new Error('Siparişler yüklenemedi: ' + response.status)
      }
    } catch (error) {
      console.error('Store: loadUserOrders error:', error)
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
      // Call Rails backend API
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
      console.log('Store: Loading all orders for admin')
      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (response.ok) {
        const apiResponse = await response.json()
        console.log('Store: All orders loaded:', apiResponse)

        const orders = apiResponse.data || []
        set((state) => ({ orders }))
        return true
      } else {
        console.error('Store: Failed to load all orders')
        return false
      }
    } catch (error) {
      console.error('Store: Error loading all orders:', error)
      return false
    }
  },

  loadAllUsers: async () => {
    try {
      console.log('Store: Loading all users for admin')
      const response = await fetch(`${API_BASE_URL}/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      })

      if (response.ok) {
        const apiResponse = await response.json()
        console.log('Store: All users loaded:', apiResponse)

        const users = apiResponse.data || []
        set((state) => ({ users }))
        return true
      } else {
        console.error('Store: Failed to load all users')
        return false
      }
    } catch (error) {
      console.error('Store: Error loading all users:', error)
      return false
    }
  }
}))