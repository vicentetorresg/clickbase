import { NextResponse } from 'next/server'
import { sendMailViaAppsScript } from '@/lib/apps-script-mail'

function getDeviceLabel(input?: string | null) {
  if (!input) return 'Desconocido'
  if (/iPhone|iPad|iPod/i.test(input)) return '📱 iOS'
  if (/Android/i.test(input)) return '📱 Android'
  if (/Windows/i.test(input)) return '💻 Windows'
  if (/Macintosh|Mac OS X|MacIntel|MacPPC|Mac68K|\bMac\b/i.test(input)) return '💻 Mac'
  if (/mobile/i.test(input)) return '📱 Mobile'
  if (/desktop/i.test(input)) return '💻 Escritorio'
  return '💻 Escritorio'
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

  const sourceLabel = (() => {
    if (!referrer) return 'Directo / sin referrer'
    if (referrer.includes('facebook') || referrer.includes('instagram') || referrer.includes('fb.')) return '📘 Meta (Facebook/Instagram)'
    if (referrer.includes('google')) return '🔍 Google'
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

  const utmRow = hasUtms ? `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
        <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Campaña</span>
        <div style="margin-top:5px;display:flex;flex-wrap:wrap;gap:4px;">
          ${utm_source ? `<span style="background:rgba(124,58,237,0.2);color:#a78bfa;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_source}</span>` : ''}
          ${utm_medium ? `<span style="background:rgba(6,182,212,0.15);color:#67e8f9;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_medium}</span>` : ''}
          ${utm_campaign ? `<span style="background:rgba(245,158,11,0.15);color:#fcd34d;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_campaign}</span>` : ''}
          ${utm_content ? `<span style="background:rgba(255,255,255,0.08);color:#94a3b8;padding:2px 8px;border-radius:4px;font-size:12px;">${utm_content}</span>` : ''}
        </div>
      </td>
    </tr>` : ''

  const subject = `[ClickBase] ${title || 'Quiero más clientes'} · ${source || '/'} · ${now}`
  const body = `Botón: ${title || 'Quiero más clientes'}\nPágina: ${source || '/'}\nFuente: ${sourceLabel}\nDispositivo: ${deviceLabel}\nHora: ${now}`
  const html = `
    <!DOCTYPE html>
    <html lang="es">
    <head><meta charset="UTF-8"></head>
    <body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
      <div style="max-width:460px;margin:0 auto;padding:24px 16px;">
        <div style="text-align:center;margin-bottom:16px;">
          <span style="font-size:20px;">⚡</span>
          <span style="font-size:16px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-left:6px;">ClickBase</span>
          <p style="margin:6px 0 0 0;font-size:11px;color:#334155;">${now}</p>
        </div>
        <div style="background:#12122A;border:1px solid rgba(6,182,212,0.3);border-radius:16px;padding:20px;">
          <div style="text-align:center;margin-bottom:16px;">
            <span style="background:rgba(6,182,212,0.12);border:1px solid rgba(6,182,212,0.35);color:#06B6D4;font-size:13px;font-weight:700;padding:5px 14px;border-radius:20px;">👆 Botón clickeado</span>
          </div>
          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Botón</span>
                <div style="font-size:15px;font-weight:700;color:#fff;margin-top:3px;">${title || 'Quiero más clientes'}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Página</span>
                <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${source || '/'}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Fuente</span>
                <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${sourceLabel}</div>
              </td>
            </tr>
            <tr>
              <td style="padding:10px 0;${hasUtms ? 'border-bottom:1px solid rgba(255,255,255,0.06);' : ''}">
                <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Dispositivo</span>
                <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${deviceLabel}</div>
              </td>
            </tr>
            ${utmRow}
          </table>
        </div>
        <p style="text-align:center;font-size:10px;color:#1e293b;margin-top:14px;">⚡ ClickBase · clickbase.cl</p>
      </div>
    </body>
    </html>
  `

  await sendMailViaAppsScript({ subject, body, html }).catch(() => {})

  return NextResponse.json({ ok: true })
}
