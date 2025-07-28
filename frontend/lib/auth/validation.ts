import { z } from 'zod'

// Email validation schema
export const emailSchema = z.string()
  .email('Geçerli bir e-posta adresi giriniz')
  .min(1, 'E-posta adresi gereklidir')

// Password validation schema
export const passwordSchema = z.string()
  .min(8, 'Şifre en az 8 karakter olmalıdır')
  .regex(/[A-Z]/, 'Şifre en az bir büyük harf içermelidir')
  .regex(/[a-z]/, 'Şifre en az bir küçük harf içermelidir')
  .regex(/[0-9]/, 'Şifre en az bir rakam içermelidir')
  .regex(/[^A-Za-z0-9]/, 'Şifre en az bir özel karakter içermelidir')

// Sign up form schema
export const signUpSchema = z.object({
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  email: emailSchema,
  password: passwordSchema,
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, {
    message: 'Kullanım şartlarını kabul etmelisiniz'
  })
}).refine(data => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
})

// Login form schema
export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, 'Şifre gereklidir')
})

// Password reset request schema
export const passwordResetRequestSchema = z.object({
  email: emailSchema
})

// Password reset schema
export const passwordResetSchema = z.object({
  password: passwordSchema,
  confirmPassword: z.string(),
  token: z.string().min(1, 'Geçersiz token')
}).refine(data => data.password === data.confirmPassword, {
  message: 'Şifreler eşleşmiyor',
  path: ['confirmPassword']
})

// Password update schema
export const passwordUpdateSchema = z.object({
  currentPassword: z.string().min(1, 'Mevcut şifre gereklidir'),
  newPassword: passwordSchema,
  confirmNewPassword: z.string()
}).refine(data => data.newPassword === data.confirmNewPassword, {
  message: 'Yeni şifreler eşleşmiyor',
  path: ['confirmNewPassword']
})

// Profile update schema
export const profileUpdateSchema = z.object({
  firstName: z.string().min(2, 'Ad en az 2 karakter olmalıdır'),
  lastName: z.string().min(2, 'Soyad en az 2 karakter olmalıdır'),
  email: emailSchema,
  phone: z.string().optional(),
  company: z.string().optional(),
  bio: z.string().max(500, 'Biyografi en fazla 500 karakter olabilir').optional()
})

// Password strength checker
export function getPasswordStrength(password: string): {
  score: number
  feedback: string[]
  color: string
} {
  let score = 0
  const feedback: string[] = []

  if (password.length >= 8) score += 1
  else feedback.push('En az 8 karakter')

  if (/[A-Z]/.test(password)) score += 1
  else feedback.push('Büyük harf')

  if (/[a-z]/.test(password)) score += 1
  else feedback.push('Küçük harf')

  if (/[0-9]/.test(password)) score += 1
  else feedback.push('Rakam')

  if (/[^A-Za-z0-9]/.test(password)) score += 1
  else feedback.push('Özel karakter')

  let color = 'red'
  if (score >= 4) color = 'green'
  else if (score >= 3) color = 'yellow'
  else if (score >= 2) color = 'orange'

  return { score, feedback, color }
}

// Email validation helper
export function isValidEmail(email: string): boolean {
  return emailSchema.safeParse(email).success
}

// Token generation helper
export function generateToken(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Rate limiting helper
export function createRateLimiter(maxAttempts: number, windowMs: number) {
  const attempts = new Map<string, { count: number; resetTime: number }>()

  return {
    isAllowed: (identifier: string): boolean => {
      const now = Date.now()
      const userAttempts = attempts.get(identifier)

      if (!userAttempts || now > userAttempts.resetTime) {
        attempts.set(identifier, { count: 1, resetTime: now + windowMs })
        return true
      }

      if (userAttempts.count >= maxAttempts) {
        return false
      }

      userAttempts.count++
      return true
    },
    getRemainingTime: (identifier: string): number => {
      const userAttempts = attempts.get(identifier)
      if (!userAttempts) return 0
      return Math.max(0, userAttempts.resetTime - Date.now())
    }
  }
}

// JWT token helpers (simplified for demo)
export function createJWT(payload: any): string {
  // In production, use proper JWT library
  const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
  const body = btoa(JSON.stringify(payload))
  const signature = btoa('demo-signature-' + Date.now())
  return `${header}.${body}.${signature}`
}

export function verifyJWT(token: string): any {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    
    const payload = JSON.parse(atob(parts[1]))
    
    // Check expiration
    if (payload.exp && payload.exp < Date.now() / 1000) {
      return null
    }
    
    return payload
  } catch {
    return null
  }
}

// Password hashing helpers (simplified for demo)
export async function hashPassword(password: string): Promise<string> {
  // In production, use bcrypt or similar
  const encoder = new TextEncoder()
  const data = encoder.encode(password + 'demo-salt')
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashedInput = await hashPassword(password)
  return hashedInput === hash
}
