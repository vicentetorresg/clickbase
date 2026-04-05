import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const {
    session_id,
    referrer,
    entry_page,
    pages_visited,
    max_scroll,
    duration_sec,
    user_agent,
  } = body as {
    session_id: string
    referrer: string | null
    entry_page: string
    pages_visited: string[]
    max_scroll: Record<string, number>
    duration_sec: number
    user_agent: string | null
  }

  // Wait briefly so any in-flight WA click / form events finish inserting
  await new Promise((resolve) => setTimeout(resolve, 3000))

  // Query WA clicks and form submits for this session
  const { data: events } = await supabase
    .from('events')
    .select('type')
    .eq('session_id', session_id)
    .in('type', ['wa_click', 'form_submit'])

  const waClicks = events?.filter((e) => e.type === 'wa_click').length ?? 0
  const formSubmits = events?.filter((e) => e.type === 'form_submit').length ?? 0

  // Skip if less than 5 seconds (bot/accidental)
  if (duration_sec < 5) {
    return NextResponse.json({ skipped: true })
  }

  // Format duration
  const minutes = Math.floor(duration_sec / 60)
  const seconds = duration_sec % 60
  const durationStr = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`

  // Determine traffic source label
  const sourceLabel = (() => {
    if (!referrer) return 'Directo / sin referrer'
    if (referrer.includes('facebook') || referrer.includes('instagram') || referrer.includes('fb.')) return '📘 Meta (Facebook/Instagram)'
    if (referrer.includes('google')) return '🔍 Google'
    return referrer.substring(0, 80)
  })()

  // Determine device type from user agent
  const deviceLabel = (() => {
    if (!user_agent) return 'Desconocido'
    if (/iPhone|iPad|iPod/i.test(user_agent)) return '📱 iOS'
    if (/Android/i.test(user_agent)) return '📱 Android'
    if (/Windows/i.test(user_agent)) return '💻 Windows'
    if (/Mac/i.test(user_agent)) return '💻 Mac'
    return '💻 Escritorio'
  })()

  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })

  // Build pages table rows
  const pagesRows = (pages_visited?.length ? pages_visited : [entry_page])
    .map((page: string) => {
      const scroll = max_scroll?.[page]
      return `
        <tr>
          <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.06);">
            <span style="font-size:13px;color:#e2e8f0;font-weight:600;">${page || '/'}</span>
          </td>
          <td style="padding:8px 12px;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;">
            <span style="font-size:12px;color:${scroll && scroll >= 75 ? '#10B981' : scroll && scroll >= 50 ? '#F59E0B' : '#64748b'};">
              ${scroll !== undefined ? scroll + '%' : '—'}
            </span>
          </td>
        </tr>`
    })
    .join('')

  // Compose subject with key highlights
  const subjectParts: string[] = []
  if (waClicks > 0) subjectParts.push(`💬 WA click`)
  if (formSubmits > 0) subjectParts.push(`📋 Formulario`)
  const subject = `👤 Sesión ${entry_page || '/'} · ${durationStr}${subjectParts.length ? ' · ' + subjectParts.join(' · ') : ''}`

  await resend.emails.send({
    from: 'ClickBase <notificaciones@priceguard.cl>',
    to: 'vicente.torres@proppi.cl',
    subject,
    html: `
      <!DOCTYPE html>
      <html lang="es">
      <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
      <body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
        <div style="max-width:520px;margin:0 auto;padding:28px 16px;">
          <!-- Header -->
          <div style="text-align:center;margin-bottom:20px;">
            <span style="font-size:20px;">⚡</span>
            <span style="font-size:16px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-left:6px;">ClickBase</span>
            <p style="margin:6px 0 0 0;font-size:11px;color:#334155;">Resumen de visita · ${now}</p>
          </div>

          <!-- Action badges -->
          ${waClicks > 0 || formSubmits > 0 ? `
          <div style="display:flex;gap:8px;justify-content:center;margin-bottom:16px;flex-wrap:wrap;">
            ${waClicks > 0 ? `<span style="background:rgba(37,211,102,0.15);border:1px solid rgba(37,211,102,0.4);color:#25D366;font-size:12px;font-weight:700;padding:5px 12px;border-radius:20px;">💬 ${waClicks} click WA</span>` : ''}
            ${formSubmits > 0 ? `<span style="background:rgba(124,58,237,0.15);border:1px solid rgba(124,58,237,0.4);color:#A855F7;font-size:12px;font-weight:700;padding:5px 12px;border-radius:20px;">📋 ${formSubmits} formulario</span>` : ''}
          </div>` : ''}

          <!-- Main card -->
          <div style="background:#12122A;border:1px solid rgba(124,58,237,0.25);border-radius:16px;padding:24px;margin-bottom:12px;">
            <!-- Stats row -->
            <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin-bottom:20px;text-align:center;">
              <div style="background:#1a1a3a;border-radius:10px;padding:12px 8px;">
                <div style="font-size:20px;font-weight:800;color:#fff;">${durationStr}</div>
                <div style="font-size:10px;color:#64748b;margin-top:3px;text-transform:uppercase;letter-spacing:0.05em;">Tiempo</div>
              </div>
              <div style="background:#1a1a3a;border-radius:10px;padding:12px 8px;">
                <div style="font-size:20px;font-weight:800;color:#fff;">${pages_visited?.length ?? 1}</div>
                <div style="font-size:10px;color:#64748b;margin-top:3px;text-transform:uppercase;letter-spacing:0.05em;">Páginas</div>
              </div>
              <div style="background:#1a1a3a;border-radius:10px;padding:12px 8px;">
                <div style="font-size:20px;font-weight:800;color:${waClicks > 0 ? '#25D366' : '#fff'};">${waClicks > 0 ? '✓' : '—'}</div>
                <div style="font-size:10px;color:#64748b;margin-top:3px;text-transform:uppercase;letter-spacing:0.05em;">WA Click</div>
              </div>
            </div>

            <!-- Source & Device -->
            <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
              <tr>
                <td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Fuente</span>
                  <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${sourceLabel}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:9px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Dispositivo</span>
                  <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${deviceLabel}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:9px 0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Entrada</span>
                  <div style="font-size:13px;font-weight:600;color:#e2e8f0;margin-top:3px;">${entry_page || '/'}</div>
                </td>
              </tr>
            </table>

            <!-- Pages visited -->
            <div>
              <p style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 8px 0;">Páginas visitadas · scroll máximo</p>
              <table style="width:100%;border-collapse:collapse;">
                ${pagesRows}
              </table>
            </div>
          </div>

          <p style="text-align:center;font-size:10px;color:#1e293b;margin-top:16px;">
            ⚡ ClickBase · <a href="https://www.clickbase.cl" style="color:#7C3AED;text-decoration:none;">clickbase.cl</a>
          </p>
        </div>
      </body>
      </html>
    `,
  })

  return NextResponse.json({ ok: true })
}
