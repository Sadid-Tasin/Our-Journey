import { createClient } from '@supabase/supabase-js'

// Vite er jonno VITE_ prefix use korte hobe
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
