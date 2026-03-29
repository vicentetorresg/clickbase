import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Cotizacion = {
  id?: string
  slug: string
  nombre_cliente: string
  email_cliente: string
  telefono_cliente: string
  servicios: string[]
  descuento?: number
  descuento_unico?: number
  descuento_mensual?: number
  mensaje_personal: string
  vigencia: string
  total_unico: number
  total_mensual: number
  creado_por: string
  created_at?: string
}
