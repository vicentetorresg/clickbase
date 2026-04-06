import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = 'ClickBase <notificaciones@clickbase.cl>'
const CC_EMAIL = 'vicente.torres@proppi.cl'

function getDeviceLabel(input?: string | null) {
  if (!input) return 'Desconocido'
  if (/iPhone|iPad|iPod/i.test(input)) return 'iOS'
  if (/Android/i.test(input)) return 'Android'
  if (/Windows/i.test(input)) return 'Windows'
  if (/Macintosh|Mac OS X|MacIntel|MacPPC|Mac68K|\bMac\b/i.test(input)) return 'Mac'
  if (/mobile/i.test(input)) return 'Mobile'
  if (/desktop/i.test(input)) return 'Escritorio'
  return 'Escritorio'
}

export async function POST(req: Request) {
  const {
    title,
    source,
    referrer,
    user_agent,
    userAgent,
    device,
    utm_source,
    utm_medium,
    utm_campaign,
    utm_content,
  } = await req.json()

  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })
  const safeTitle = title || 'Quiero más clientes'

  const sourceLabel = (() => {
    if (!referrer) return 'Directo / sin referrer'
    if (referrer.includes('facebook') || referrer.includes('instagram') || referrer.includes('fb.')) return 'Meta (Facebook/Instagram)'
    if (referrer.includes('google')) return 'Google'
    return (referrer as string).substring(0, 80)
  })()

  const effectiveUserAgent =
    user_agent ||
    userAgent ||
    req.headers.get('user-agent') ||
    req.headers.get('sec-ch-ua-platform') ||
    device ||
    null

  const deviceLabel = getDeviceLabel(effectiveUserAgent)

  const hasUtms = utm_source || utm_medium || utm_campaign || utm_content
  const utmSummary = [utm_campaign, utm_source, utm_medium, utm_content].filter(Boolean).join(' · ')

  const utmRow = hasUtms ? `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Campana UTM</span>
        <div style="margin-top:5px;display:flex;flex-wrap:wrap;gap:4px;">
          ${utm_source ? `<span style="background:rgba(124,58,237,0.2);color:#a78bfa;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_source}</span>` : ''}
          ${utm_medium ? `<span style="background:rgba(6,182,212,0.15);color:#67e8f9;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_medium}</span>` : ''}
          ${utm_campaign ? `<span style="background:rgba(245,158,11,0.15);color:#fcd34d;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_campaign}</span>` : ''}
          ${utm_content ? `<span style="background:rgba(255,255,255,0.08);color:#94a3b8;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_content}</span>` : ''}
        </div>
      </td>
    </tr>` : ''

  const subject = `ClickBase | ${safeTitle} | ${source || '/'} | ${now}`
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#f3f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
      <div style="max-width:560px;margin:0 auto;padding:28px 16px;">
        <div style="background:linear-gradient(135deg,#0f172a 0%,#111827 45%,#0b3b57 100%);border-radius:24px 24px 0 0;padding:24px 28px;">
          <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#93c5fd;margin-bottom:10px;">ClickBase</div>
          <div style="font-size:28px;font-weight:800;line-height:1.1;color:#ffffff;">Quiero m&aacute;s clientes</div>
          <div style="font-size:14px;color:#cbd5e1;margin-top:8px;">Se abri&oacute; el CTA y ya tienes una nueva se&ntilde;al de inter&eacute;s.</div>
        </div>
        <div style="background:#ffffff;border:1px solid #dbe7f3;border-top:none;border-radius:0 0 24px 24px;padding:26px 28px 22px;box-shadow:0 20px 45px rgba(15,23,42,0.08);">
          <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;">
            <div style="font-size:13px;font-weight:700;color:#0369a1;background:#e0f2fe;border:1px solid #bae6fd;padding:7px 12px;border-radius:999px;">CTA abierto</div>
            <div style="font-size:12px;color:#64748b;">${now}</div>
          </div>
          <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
            <tr>
              <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Boton</span>
                <div style="font-size:17px;font-weight:800;color:#0f172a;margin-top:4px;">${safeTitle}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Pagina</span>
                <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${source || '/'}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Fuente</span>
                <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${sourceLabel}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 18px;${hasUtms ? 'border-bottom:1px solid #e2e8f0;' : ''}">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Dispositivo</span>
                <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${deviceLabel}</div>
              </td>
            </tr>
            ${utmRow}
          </table>
          <div style="margin-top:18px;font-size:12px;line-height:1.6;color:#64748b;">
            Este correo se envi&oacute; desde el flujo de apertura del CTA para ayudarte a distinguir intenci&oacute;n de compra antes de que el lead complete el formulario.
          </div>
        </div>
        <p style="text-align:center;font-size:11px;color:#94a3b8;margin-top:14px;">ClickBase · clickbase.cl</p>
      </div>
    </body>
    </html>
  `

  try {
    await supabase.from('events').insert({
      type: 'modal_open',
      source: source || null,
      referrer: utmSummary || referrer || null,
      user_agent: effectiveUserAgent,
    })
  } catch (_) {}

  resend.emails.send({
    from: FROM_EMAIL,
    to: CC_EMAIL,
    subject,
    html,
  }).catch(() => {})

  return NextResponse.json({ ok: true })
}
