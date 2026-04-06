import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { insertLead } from '@/lib/leads'

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwDRPoh1CDQqNNHxWCNBKFezhcxMn2MoDNYPUpVTX06coOkdD-hy4ZbOlzC931z3vIV4g/exec'

function getDeviceLabel(input?: string | null) {
  if (!input) return null
  if (/iPhone|iPad|iPod/i.test(input)) return 'iOS'
  if (/Android/i.test(input)) return 'Android'
  if (/Windows/i.test(input)) return 'Windows'
  if (/Macintosh|Mac OS X|MacIntel|MacPPC|Mac68K|\bMac\b/i.test(input)) return 'Mac'
  if (/mobile/i.test(input)) return 'Mobile'
  if (/desktop/i.test(input)) return 'Escritorio'
  return input
}

export async function POST(req: Request) {
  const { name, email, phone, rubro, budget, source, device, user_agent, utm_source, utm_medium, utm_campaign, utm_content } = await req.json()

  const requestUserAgent = user_agent || req.headers.get('user-agent')
  const deviceLabel = getDeviceLabel(device || requestUserAgent)

  await insertLead({
    name,
    email,
    phone,
    rubro,
    budget,
    source,
    userAgent: requestUserAgent,
    device: deviceLabel,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
    channel: 'lead_form',
  })

  // Disparar en background sin bloquear la respuesta
  void supabase.from('events').insert({
    type: 'form_submit',
    source: source || null,
    user_agent: req.headers.get('user-agent') || null,
  })

  fetch(APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, phone, source, device: deviceLabel, utm_source, utm_medium, utm_campaign, utm_content }),
  }).catch((error) => {
    console.error('Apps Script email error (non-fatal):', error)
  })

  return NextResponse.json({ ok: true })
}
