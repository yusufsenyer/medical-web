// API Configuration and Service Layer
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1';

// API Response Types
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
  error?: string;
}

// HTTP Client Class
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth-token') : null;
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<T>(response);
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: data ? JSON.stringify(data) : undefined,
    });
    
    return this.handleResponse<T>(response);
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    const response = await fetch(`${this.baseURL}${endpoint}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });
    
    return this.handleResponse<T>(response);
  }
}

// Create API client instance
const apiClient = new ApiClient(API_BASE_URL);

// Auth API
export const authApi = {
  register: (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => apiClient.post('/auth/register', userData),

  login: (credentials: {
    email: string;
    password: string;
  }) => apiClient.post('/auth/login', credentials),

  getProfile: () => apiClient.get('/auth/profile'),

  updateProfile: (profileData: {
    firstName?: string;
    lastName?: string;
    phone?: string;
    company?: string;
    bio?: string;
  }) => apiClient.put('/auth/profile', profileData),

  verifyToken: () => apiClient.get('/auth/verify'),
};

// Orders API
export const ordersApi = {
  create: (orderData: {
    customerName: string;
    customerEmail: string;
    customerPhone?: string;
    websiteType: string;
    selectedPages: string[];
    selectedFeatures: Array<{
      id: string;
      name: string;
      price: number;
    }>;
    basePrice: number;
    specialRequests?: string;
  }) => apiClient.post('/orders', orderData),

  getAll: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.status) queryParams.append('status', params.status);
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    return apiClient.get(`/orders${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id: string) => apiClient.get(`/orders/${id}`),

  updateStatus: (id: string, statusData: {
    status?: string;
    adminNotes?: string;
    estimatedDeliveryDate?: string;
  }) => apiClient.put(`/orders/${id}/status`, statusData),

  getUserOrders: () => apiClient.get('/orders/my-orders'),

  delete: (id: string) => apiClient.delete(`/orders/${id}`),
};

// Users API (Admin only)
export const usersApi = {
  getAll: (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }) => {
    const queryParams = new URLSearchParams();
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.search) queryParams.append('search', params.search);
    
    const queryString = queryParams.toString();
    return apiClient.get(`/users${queryString ? `?${queryString}` : ''}`);
  },

  getById: (id: string) => apiClient.get(`/users/${id}`),

  updateStatus: (id: string, statusData: {
    isActive: boolean;
  }) => apiClient.put(`/users/${id}/status`, statusData),
};

// Admin API
export const adminApi = {
  getAnalytics: () => apiClient.get('/admin/analytics'),
  getStats: () => apiClient.get('/admin/stats'),
};

// Health Check
export const healthApi = {
  check: () => apiClient.get('/health'),
};

// Export default API client for custom requests
export default apiClient;
