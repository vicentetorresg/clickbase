import { supabase } from '@/lib/supabase'

export type LeadInsert = {
  name?: string | null
  email?: string | null
  phone?: string | null
  company?: string | null
  rubro?: string | null
  budget?: string | null
  message?: string | null
  source?: string | null
  referrer?: string | null
  userAgent?: string | null
  device?: string | null
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
  utm_content?: string | null
  channel?: string | null
}

export async function insertLead(lead: LeadInsert) {
  const payload = {
    name: lead.name || null,
    email: lead.email || null,
    phone: lead.phone || null,
    company: lead.company || null,
    rubro: lead.rubro || null,
    budget: lead.budget || null,
    message: lead.message || null,
    source: lead.source || '/',
    referrer: lead.referrer || null,
    user_agent: lead.userAgent || null,
    device: lead.device || null,
    utm_source: lead.utm_source || null,
    utm_medium: lead.utm_medium || null,
    utm_campaign: lead.utm_campaign || null,
    utm_content: lead.utm_content || null,
    channel: lead.channel || 'web_form',
  }

  const { error, data } = await supabase
    .from('leads')
    .insert(payload)
    .select('id')
    .single()

  if (error) throw error
  return data
}
