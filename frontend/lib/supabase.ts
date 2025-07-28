import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'admin' | 'customer'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name?: string | null
          role?: 'admin' | 'customer'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'admin' | 'customer'
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string | null
          website_name: string
          customer_name: string
          customer_surname: string
          customer_email: string
          profession: string
          website_type: 'single-page' | 'multi-page'
          color_palette: string
          target_audience: string
          purpose: string
          additional_features: any
          total_price: number
          delivery_days: number
          status: 'pending' | 'in-progress' | 'completed' | 'delivered'
          knowledge_text: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          website_name: string
          customer_name: string
          customer_surname: string
          customer_email: string
          profession: string
          website_type: 'single-page' | 'multi-page'
          color_palette: string
          target_audience: string
          purpose: string
          additional_features?: any
          total_price: number
          delivery_days: number
          status?: 'pending' | 'in-progress' | 'completed' | 'delivered'
          knowledge_text?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          website_name?: string
          customer_name?: string
          customer_surname?: string
          customer_email?: string
          profession?: string
          website_type?: 'single-page' | 'multi-page'
          color_palette?: string
          target_audience?: string
          purpose?: string
          additional_features?: any
          total_price?: number
          delivery_days?: number
          status?: 'pending' | 'in-progress' | 'completed' | 'delivered'
          knowledge_text?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      features: {
        Row: {
          id: string
          name: string
          description: string
          price: number
          category: string
          is_active: boolean
        }
        Insert: {
          id?: string
          name: string
          description: string
          price: number
          category: string
          is_active?: boolean
        }
        Update: {
          id?: string
          name?: string
          description?: string
          price?: number
          category?: string
          is_active?: boolean
        }
      }
    }
  }
}