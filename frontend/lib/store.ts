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
  slogan?: string
  created_at?: string
  updated_at?: string
  instagram?: string
  facebook?: string
  twitter?: string
  linkedin?: string
  youtube?: string
  // Additional fields for compatibility
  siteName?: string
  customerName?: string
  customerSurname?: string
  customerEmail?: string
  customerPhone?: string
  websiteType?: string
  colorPalette?: string
  targetAudience?: string
  additionalFeatures?: string[]
  selectedPages?: string[]
  totalPrice?: number
  basePrice?: number
  deliveryDays?: number
  specialRequests?: string
  createdAt?: string
  updatedAt?: string
  website_url?: string
  websiteUrl?: string
  // Delivery assets
  delivery_zip_url?: string
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
  resetOrderPreserveContact: () => void
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
  deleteUser: (userId: string) => Promise<boolean>
  setOrderStep: (step: number) => void
  resetOrderStep: () => void

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

  setOrderStep: (step: number) => set((state) => ({ orderStep: step })),
  resetOrderStep: () => set((state) => ({ orderStep: 1 })),
  nextStep: () => set((state) => ({ orderStep: Math.min(state.orderStep + 1, 5) })),

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

  // Yeni sipariş başlatırken ad, soyad, e-mail kalsın; diğer alanlar sıfırlansın
  resetOrderPreserveContact: () => set((state) => ({
    currentOrder: {
      customer_name: state.currentOrder.customer_name,
      customer_surname: state.currentOrder.customer_surname,
      customer_email: state.currentOrder.customer_email,
    },
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
      console.log('loadUserOrders: userEmail:', userEmail)
      
      if (!userEmail) {
        console.log('loadUserOrders: No user email found')
        set((state) => ({ ...state, isLoading: false }))
        return false
      }
      
      try {
        const { db, collection, getDocs, query, where } = await import('./firebase')
        console.log('loadUserOrders: Firebase imported successfully')
        
        const ordersRef = collection(db as any, 'orders')
        console.log('loadUserOrders: Orders collection reference created')
        
        // Firebase'deki gerçek veri yapısına göre arama
        // Kullanıcı verilerinde email field'ı var, siparişlerde customer_email olabilir
        const q1 = query(ordersRef, where('customer_email', '==', userEmail))
        const q2 = query(ordersRef, where('email', '==', userEmail))
        const q3 = query(ordersRef, where('customerEmail', '==', userEmail))
        
        console.log('loadUserOrders: Queries created, executing...')
        
        const [querySnapshot1, querySnapshot2, querySnapshot3] = await Promise.all([
          getDocs(q1).catch(() => ({ docs: [] })),
          getDocs(q2).catch(() => ({ docs: [] })),
          getDocs(q3).catch(() => ({ docs: [] }))
        ])
        
        const allDocs = [
          ...querySnapshot1.docs,
          ...querySnapshot2.docs,
          ...querySnapshot3.docs
        ]
        
        console.log('loadUserOrders: Found orders count:', allDocs.length)
        console.log('loadUserOrders: Query results:', {
          customer_email: querySnapshot1.docs.length,
          email: querySnapshot2.docs.length,
          customerEmail: querySnapshot3.docs.length
        })
        
        // Duplicate removal based on document ID
        const uniqueDocs = allDocs.filter((doc, index, self) => 
          index === self.findIndex(d => d.id === doc.id)
        )
        
        console.log('loadUserOrders: Unique orders count:', uniqueDocs.length)
        
        const userOrders = uniqueDocs.map(doc => {
          const data = doc.data();
          console.log('loadUserOrders: Order data:', data)
          return {
            id: doc.id,
            website_name: data.website_name || data.websiteName || '',
            customer_name: data.customer_name || data.customerName || '',
            customer_surname: data.customer_surname || data.customerSurname || '',
            customer_email: data.customer_email || data.customerEmail || data.email || '',
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
            status: data.status || 'pending',
            knowledge_text: data.knowledge_text || data.specialRequests || '',
            slogan: data.slogan || '',
            created_at: data.created_at || data.createdAt || '',
            updated_at: data.updated_at || data.updatedAt || '',
            instagram: data.instagram || '',
            facebook: data.facebook || '',
            twitter: data.twitter || '',
            linkedin: data.linkedin || '',
            youtube: data.youtube || '',
            website_url: data.website_url || data.websiteUrl || '',
            // Additional fields for compatibility
            siteName: data.website_name || data.websiteName || '',
            customerName: data.customer_name || data.customerName || '',
            customerSurname: data.customer_surname || data.customerSurname || '',
            customerEmail: data.customer_email || data.customerEmail || data.email || '',
            customerPhone: data.customer_phone || data.customerPhone || '',
            websiteType: data.website_type || data.websiteType || 'single-page',
            colorPalette: data.color_palette || data.colorPalette || '',
            targetAudience: data.target_audience || data.targetAudience || '',
            additionalFeatures: data.additional_features || data.selectedFeatures || [],
            selectedPages: data.selected_pages || data.selectedPages || [],
            totalPrice: data.total_price || data.totalPrice || 0,
            basePrice: data.base_price || data.basePrice || 0,
            deliveryDays: data.delivery_days || data.deliveryDays || 0,
            specialRequests: data.knowledge_text || data.specialRequests || '',
            createdAt: data.created_at || data.createdAt || '',
            updatedAt: data.updated_at || data.updatedAt || '',
            websiteUrl: data.website_url || data.websiteUrl || ''
          }
        })
        console.log('loadUserOrders: Processed orders:', userOrders)
        set(() => ({ userOrders, isLoading: false }))
        return true
      } catch (firestoreError) {
        console.error('loadUserOrders: Firestore error:', firestoreError)
        set(() => ({ userOrders: [], isLoading: false }))
        return true
      }
    } catch (error) {
      console.error('loadUserOrders: General error:', error)
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

  deleteUser: async (userId: string) => {
    try {
      // Firestore'dan kullanıcıyı silmeden önce e-postasını al
      const { db, doc, getDoc, deleteDoc } = await import('./firebase')
      const userRef = doc(db as any, 'users', userId)
      const snap = await getDoc(userRef)
      const email = (snap.exists() ? (snap.data() as any).email : '') as string

      // Firestore'dan kullanıcıyı sil
      await deleteDoc(userRef)

      // Backend'te kullanıcıyı pasif hale getir (eşleşen e-posta üzerinden)
      if (email) {
        try {
          const searchParams = new URLSearchParams({ search: email })
          const resp = await fetch(`${API_BASE_URL}/users?${searchParams.toString()}`, {
            headers: { 'Content-Type': 'application/json' }
          })
          if (resp.ok) {
            const data = await resp.json()
            const backendUsers = Array.isArray(data?.data) ? data.data : Array.isArray(data) ? data : []
            const found = backendUsers.find((u: any) => (u.email || '').toLowerCase() === email.toLowerCase())
            if (found?.id) {
              await fetch(`${API_BASE_URL}/users/${found.id}/status`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: { isActive: false } })
              })
            }
          }
        } catch (e) {
          console.warn('Backend user deactivation skipped:', e)
        }
      }

      // Local state'den kullanıcıyı kaldır
      set((state) => ({
        users: state.users.filter(user => user.id !== userId)
      }))

      return true
    } catch (error) {
      throw error
    }
  },

  setLoading: (loading) => set(() => ({ isLoading: loading })),

  calculateTotal: () => {
    const state = get()
    const featuresTotal = (state.selectedFeatures || []).reduce((sum, f) => sum + (f.price || 0), 0)
    set(() => ({ totalPrice: featuresTotal }))
  },

  addOrder: async (order) => {
    set(() => ({ isLoading: true }))
    try {
      const token = get().auth.token
      const payload = {
        order: {
          website_name: order.website_name || '',
          customer_name: order.customer_name || '',
          customer_surname: order.customer_surname || '',
          customer_email: order.customer_email || '',
          customer_phone: order.customer_phone || '',
          profession: order.profession || '',
          website_type: order.website_type || 'single-page',
          color_palette: order.color_palette || '',
          target_audience: order.target_audience || '',
          purpose: order.purpose || '',
          additional_features: order.additional_features || [],
          selected_pages: order.selected_pages || [],
          total_price: order.total_price || get().totalPrice || 0,
          delivery_days: order.delivery_days || 7,
          knowledge_text: order.knowledge_text || '',
          slogan: order.slogan || '',
          instagram: order.instagram || '',
          facebook: order.facebook || '',
          twitter: order.twitter || '',
          linkedin: order.linkedin || '',
          youtube: order.youtube || ''
        }
      }

      const response = await fetch(`${API_BASE_URL}/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(payload)
      })

      const data = await response.json().catch(() => ({} as any))
      if (response.ok) {
        try {
          const { db, collection, addDoc } = await import('./firebase')
          const ordersRef = collection(db as any, 'orders')
          await addDoc(ordersRef, {
            website_name: payload.order.website_name,
            customer_name: payload.order.customer_name,
            customer_surname: payload.order.customer_surname,
            customer_email: payload.order.customer_email,
            customer_phone: payload.order.customer_phone,
            profession: payload.order.profession,
            website_type: payload.order.website_type,
            color_palette: payload.order.color_palette,
            target_audience: payload.order.target_audience,
            purpose: payload.order.purpose,
            additional_features: payload.order.additional_features,
            selected_pages: payload.order.selected_pages,
            total_price: payload.order.total_price,
            delivery_days: payload.order.delivery_days,
            status: 'pending',
            knowledge_text: payload.order.knowledge_text,
            slogan: payload.order.slogan,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
            instagram: payload.order.instagram,
            facebook: payload.order.facebook,
            twitter: payload.order.twitter,
            linkedin: payload.order.linkedin,
            youtube: payload.order.youtube
          })
        } catch (firebaseError) {
          console.error('Failed to save order to Firebase:', firebaseError)
        }

        const newOrder = {
          id: (data?.data?.id || data?.id || Date.now()).toString(),
          website_name: payload.order.website_name,
          customer_name: payload.order.customer_name,
          customer_surname: payload.order.customer_surname,
          customer_email: payload.order.customer_email,
          customer_phone: payload.order.customer_phone,
          profession: payload.order.profession,
          website_type: payload.order.website_type,
          color_palette: payload.order.color_palette,
          target_audience: payload.order.target_audience,
          purpose: payload.order.purpose,
          additional_features: payload.order.additional_features,
          selected_pages: payload.order.selected_pages,
          total_price: payload.order.total_price,
          base_price: payload.order.total_price,
          delivery_days: payload.order.delivery_days,
          status: 'pending',
          knowledge_text: payload.order.knowledge_text,
          slogan: payload.order.slogan,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          facebook: payload.order.facebook,
          instagram: payload.order.instagram,
          twitter: payload.order.twitter,
          linkedin: payload.order.linkedin,
          youtube: payload.order.youtube,
          website_url: ''
        }

        set((state) => {
          const newOrders = [...state.orders, newOrder]
          const newUserOrders = [...state.userOrders, newOrder]
          const totalRevenue = newOrders.reduce((sum, o) => sum + (o.total_price || 0), 0)
          const pendingOrders = newOrders.filter(o => o.status === 'pending').length
          const inProgressOrders = newOrders.filter(o => o.status === 'in_progress').length
          const completedOrders = newOrders.filter(o => o.status === 'completed').length

          return {
            orders: newOrders,
            userOrders: newUserOrders,
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
        const errorMsg = (data && (data.message || data.error)) || 'Sipariş oluşturulamadı'
        throw new Error(errorMsg)
      }
    } catch (error) {
      set(() => ({ isLoading: false }))
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
      const normalizedEmail = (email || '').trim().toLowerCase()
      const normalizedPassword = (password || '').trim()
      // Check mock users first
      const mockUser = MOCK_USERS.find(u => u.email.toLowerCase() === normalizedEmail && u.password === normalizedPassword)

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
        body: JSON.stringify({ user: { email: normalizedEmail, password: normalizedPassword } }),
      })
      let data: any = null
      try {
        data = await response.json()
      } catch {}

      if (response.ok && data?.success) {
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
      }

      // Backend başarısızsa Firebase üzerinden fallback (env ile kapatılabilir)
      if (process.env.NEXT_PUBLIC_ALLOW_FIREBASE_FALLBACK === 'true') {
        try {
          const { db, collection, getDocs, query, where } = await import('./firebase')
          const usersRef = collection(db as any, 'users')
          const q = query(usersRef, where('email', '==', normalizedEmail))
          const snap = await getDocs(q)
          const doc = snap.docs[0]
          const u = doc ? (doc.data() as any) : null
          if (u && (u.password === normalizedPassword)) {
            const user: User = {
              id: doc.id,
              email: u.email,
              firstName: u.firstName || '',
              lastName: u.lastName || '',
              fullName: u.fullName || `${u.firstName || ''} ${u.lastName || ''}`.trim(),
              role: u.role || 'customer',
              phone: u.phone || '',
              company: u.company || '',
              bio: u.bio || '',
              isEmailVerified: !!u.isEmailVerified,
              createdAt: u.createdAt || new Date().toISOString(),
              updatedAt: u.updatedAt || new Date().toISOString()
            }

            const token = 'firebase-fallback-token-' + Date.now()
            localStorage.setItem('auth-token', token)
            localStorage.setItem('user-data', JSON.stringify(user))
            localStorage.setItem('has-logged-in-before', 'true')

            set((state) => ({
              auth: { user, token, isAuthenticated: true, isLoading: false }
            }))

            // Backend'e yoksa senkron kayıt dene (bloklamadan)
            try {
              await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user: { firstName: user.firstName || 'User', lastName: user.lastName || 'User', email: user.email, password: normalizedPassword } })
              })
            } catch {}

            return true
          }
        } catch {}
      }

      throw new Error((data && data.message) || 'Giriş başarısız')
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

      // Sadece gerekli alanları gönder + normalize
      const normalizedEmail = (userData.email || '').trim().toLowerCase()
      const normalizedPassword = (userData.password || '').trim()

      const backendUserData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: normalizedEmail,
        password: normalizedPassword
      }

      // Call Rails backend API
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: backendUserData }),
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

        // Also add user to Firebase Firestore
        try {
          const { db, collection, addDoc, query, where, getDocs } = await import('./firebase')
          const usersRef = collection(db as any, 'users')
          const q = query(usersRef, where('email', '==', user.email))
          const querySnapshot = await getDocs(q)

          if (querySnapshot.empty) {
            await addDoc(usersRef, {
              id: user.id,
              email: user.email,
              firstName: user.firstName,
              lastName: user.lastName,
              fullName: user.fullName,
              role: user.role,
              phone: user.phone || '',
              company: user.company || '',
              bio: user.bio || '',
              password: normalizedPassword,
              isEmailVerified: user.isEmailVerified,
              createdAt: user.createdAt,
              updatedAt: user.updatedAt
            })
            console.log('User added to Firebase Firestore:', user.email)
          } else {
            console.log('User already exists in Firebase Firestore, skipping add:', user.email)
          }
        } catch (firebaseError) {
          console.error('Failed to add user to Firebase Firestore:', firebaseError)
          // Do not block signup if Firebase fails
        }

        return true
      } else {
        // Eğer e-posta zaten alınmışsa, otomatik olarak giriş dene
        const msg = `${data.message || ''} ${(data.errors || []).join(' ')}`.toLowerCase()
        if (msg.includes('email has already been taken') || msg.includes('email already exists')) {
          try {
            const loginResp = await fetch(`${API_BASE_URL}/auth/login`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ user: { email: normalizedEmail, password: normalizedPassword } })
            })
            const loginData = await loginResp.json().catch(() => ({}))
            if (loginResp.ok && loginData?.success) {
              const user: User = {
                id: loginData.data.user.id,
                email: loginData.data.user.email,
                firstName: loginData.data.user.firstName || '',
                lastName: loginData.data.user.lastName || '',
                fullName: loginData.data.user.fullName || `${loginData.data.user.firstName} ${loginData.data.user.lastName}`,
                role: loginData.data.user.role,
                phone: loginData.data.user.phone || '',
                company: loginData.data.user.company || '',
                bio: loginData.data.user.bio || '',
                isEmailVerified: true,
                createdAt: loginData.data.user.createdAt || new Date().toISOString(),
                updatedAt: loginData.data.user.updatedAt || new Date().toISOString()
              }
              const token = loginData.data.token || `fake-token-${user.id}`
              localStorage.setItem('auth-token', token)
              localStorage.setItem('user-data', JSON.stringify(user))
              localStorage.setItem('has-logged-in-before', 'true')
              set((state) => ({ auth: { user, token, isAuthenticated: true, isLoading: false } }))
              return true
            }
          } catch {}
          // Kullanıcıya daha açıklayıcı mesaj göster
          throw new Error('Bu e-posta zaten kayıtlı. Lütfen giriş yapın.')
        }
        // Diğer hatalar
        const errorMsg = (data.errors && data.errors.length > 0) ? data.errors[0] : (data.message || 'Kayıt başarısız')
        throw new Error(errorMsg)
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
      const { db, collection, getDocs } = await import('./firebase')
      const ordersRef = collection(db as any, 'orders')
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
          slogan: data.slogan || '',
          created_at: data.created_at || data.createdAt || new Date().toISOString(),
          updated_at: data.updated_at || data.updatedAt || new Date().toISOString(),
          instagram: data.instagram || '',
          facebook: data.facebook || '',
          twitter: data.twitter || '',
          linkedin: data.linkedin || '',
          youtube: data.youtube || '',
          website_url: data.website_url || data.websiteUrl || '',
          delivery_zip_url: data.delivery_zip_url || ''
        }
      })
      set((state) => ({ orders }))
      return true
    } catch (error) {
      set((state) => ({ orders: [] }))
      return true
    }
  },

  loadAllUsers: async () => {
    try {
      const { db, collection, getDocs } = await import('./firebase')
      const usersRef = collection(db as any, 'users')
      const querySnapshot = await getDocs(usersRef)
      const users = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('loadAllUsers: User data:', data)
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
          isEmailVerified: data.isEmailVerified || data.isActive || false,
          createdAt: data.createdAt || data.created_at || new Date().toISOString(),
          updatedAt: data.updatedAt || data.updated_at || new Date().toISOString()
        }
      })
      console.log('loadAllUsers: Processed users:', users)
      set((state) => ({ users }))
      return true
    } catch (error) {
      console.error('loadAllUsers: Error:', error)
      set((state) => ({ users: [] }))
      return true
    }
  }
}))