import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'
import { insertLead } from '@/lib/leads'
import { sendMailViaAppsScript } from '@/lib/apps-script-mail'

const resend = new Resend(process.env.RESEND_API_KEY)

function getDeviceLabel(input?: string | null) {
  if (!input) return null
  if (/iPhone|iPad|iPod/i.test(input)) return '📱 iOS'
  if (/Android/i.test(input)) return '📱 Android'
  if (/Windows/i.test(input)) return '💻 Windows'
  if (/Macintosh|Mac OS X|MacIntel|MacPPC|Mac68K|\bMac\b/i.test(input)) return '💻 Mac'
  if (/mobile/i.test(input)) return '📱 Mobile'
  if (/desktop/i.test(input)) return '💻 Escritorio'
  return input
}

export async function POST(req: Request) {
  const { name, email, phone, rubro, budget, source, device, user_agent, utm_source, utm_medium, utm_campaign, utm_content } = await req.json()

  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })
  const requestUserAgent = user_agent || req.headers.get('user-agent')
  const deviceLabel = getDeviceLabel(device || requestUserAgent)
  const subject = `🎯 Nuevo lead · ${name} · ${phone}`
  const body = [
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    `Correo: ${email || '—'}`,
    `Rubro: ${rubro || '—'}`,
    `Inversión en publicidad: ${budget || '—'}`,
    `Fuente: ${source || '/'}`,
    `Dispositivo: ${deviceLabel || '—'}`,
    utm_campaign || utm_source
      ? `UTM: ${[utm_campaign, utm_source, utm_medium, utm_content].filter(Boolean).join(' · ')}`
      : '',
    `Hora: ${now}`,
  ].filter(Boolean).join('\n')
  const html = `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8"></head>
      <body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:480px;margin:0 auto;padding:28px 16px;">
          <div style="text-align:center;margin-bottom:20px;">
            <span style="font-size:20px;">⚡</span>
            <span style="font-size:16px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-left:6px;">ClickBase</span>
            <p style="margin:6px 0 0 0;font-size:11px;color:#334155;">${now}</p>
          </div>
          <div style="background:#12122A;border:1px solid rgba(124,58,237,0.3);border-radius:16px;padding:24px;">
            <div style="text-align:center;margin-bottom:20px;">
              <span style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.4);color:#A855F7;font-size:13px;font-weight:700;padding:5px 14px;border-radius:20px;">🎯 Nuevo Lead</span>
            </div>
            <table style="width:100%;border-collapse:collapse;">
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Nombre</span>
                  <div style="font-size:15px;font-weight:700;color:#fff;margin-top:3px;">${name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Teléfono</span>
                  <div style="font-size:15px;font-weight:700;color:#10B981;margin-top:3px;">${phone}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Rubro</span>
                  <div style="font-size:14px;font-weight:600;color:#e2e8f0;margin-top:3px;">${rubro || '—'}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Inversión en publicidad</span>
                  <div style="font-size:14px;font-weight:600;color:#e2e8f0;margin-top:3px;">${budget || '—'}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Correo</span>
                  <div style="font-size:14px;font-weight:600;color:#e2e8f0;margin-top:3px;">${email}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Fuente</span>
                  <div style="font-size:13px;font-weight:600;color:#64748b;margin-top:3px;">${source || '/'}</div>
                </td>
              </tr>
              ${deviceLabel ? `<tr>
                <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Dispositivo</span>
                  <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${deviceLabel}</div>
                </td>
              </tr>` : ''}
              ${utm_campaign || utm_source ? `<tr>
                <td style="padding:10px 0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">UTM</span>
                  <div style="font-size:13px;font-weight:600;color:#A855F7;margin-top:3px;">${[utm_campaign, utm_source, utm_medium, utm_content].filter(Boolean).join(' · ')}</div>
                </td>
              </tr>` : ''}
            </table>
          </div>
          <p style="text-align:center;font-size:10px;color:#1e293b;margin-top:16px;">⚡ ClickBase · clickbase.cl</p>
        </div>
      </body>
      </html>
      `

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

  try {
    await supabase.from('events').insert({
      type: 'form_submit',
      source: source || null,
      user_agent: req.headers.get('user-agent') || null,
    })
  } catch (_) {}

  try {
    await resend.emails.send({
      from: 'ClickBase <notificaciones@priceguard.cl>',
      to: 'vicente.torres@proppi.cl',
      subject,
      html,
    })
  } catch (error) {
    console.error('Lead email error (non-fatal):', error)
    try {
      await sendMailViaAppsScript({ subject, body, html })
    } catch (appsScriptError) {
      console.error('Apps Script lead email error (non-fatal):', appsScriptError)
    }
  }

  return NextResponse.json({ ok: true })
}
