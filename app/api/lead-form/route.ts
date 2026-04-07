import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { insertLead } from '@/lib/leads'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'ClickBase <notificaciones@priceguard.cl>'
const NOTIFY_EMAIL = 'vicente.torres@proppi.cl'

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

  await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    subject: `Nuevo lead ClickBase — ${name || 'Sin nombre'}`,
    html: `
      <p><strong>Nombre:</strong> ${name || '-'}</p>
      <p><strong>Teléfono:</strong> ${phone || '-'}</p>
      <p><strong>Rubro:</strong> ${rubro || '-'}</p>
      <p><strong>Presupuesto:</strong> ${budget || '-'}</p>
      <p><strong>Fuente:</strong> ${source || '-'}</p>
      <p><strong>Dispositivo:</strong> ${deviceLabel || '-'}</p>
      ${utm_source ? `<p><strong>UTM:</strong> ${utm_source} / ${utm_medium || '-'} / ${utm_campaign || '-'}</p>` : ''}
    `,
  }).catch((err: unknown) => {
    console.error('Resend email error (non-fatal):', err)
  })

  return NextResponse.json({ ok: true })
}
