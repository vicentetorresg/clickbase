import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const body = await req.json()
  const { source, referrer, user_agent } = body

  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })

  const [dbResult, emailResult] = await Promise.allSettled([
    supabase.from('whatsapp_clicks').insert({
      source: source || 'unknown',
      referrer: referrer || null,
      user_agent: user_agent || null,
    }),
    resend.emails.send({
      from: 'ClickBase <notificaciones@priceguard.cl>',
      to: 'vicente.torres@proppi.cl',
      subject: `📲 Click en WhatsApp — ${source || 'web'}`,
      html: `
        <!DOCTYPE html>
        <html lang="es">
        <head><meta charset="UTF-8"></head>
        <body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
          <div style="max-width:480px;margin:0 auto;padding:32px 16px;">
            <div style="text-align:center;margin-bottom:24px;">
              <span style="font-size:24px;">⚡</span>
              <span style="font-size:18px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-left:6px;">ClickBase</span>
            </div>
            <div style="background:#12122A;border:1px solid rgba(37,211,102,0.3);border-radius:16px;padding:28px 24px;">
              <div style="display:flex;align-items:center;gap:12px;margin-bottom:20px;">
                <span style="font-size:32px;">📲</span>
                <div>
                  <h2 style="margin:0;font-size:18px;font-weight:800;color:#fff;">Nuevo click en WhatsApp</h2>
                  <p style="margin:4px 0 0 0;font-size:13px;color:#25D366;">Alguien quiere contactarte</p>
                </div>
              </div>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Página</span>
                    <div style="font-size:15px;font-weight:600;color:#fff;margin-top:4px;">${source || '—'}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Hora (Santiago)</span>
                    <div style="font-size:15px;font-weight:600;color:#fff;margin-top:4px;">${now}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <span style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Referrer</span>
                    <div style="font-size:13px;color:#94a3b8;margin-top:4px;word-break:break-all;">${referrer || 'Directo'}</div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="font-size:12px;color:#64748b;text-transform:uppercase;letter-spacing:0.05em;">Dispositivo</span>
                    <div style="font-size:11px;color:#475569;margin-top:4px;word-break:break-all;">${(user_agent || '—').substring(0, 120)}</div>
                  </td>
                </tr>
              </table>
            </div>
            <p style="text-align:center;font-size:11px;color:#1e293b;margin-top:20px;">
              ⚡ ClickBase — <a href="https://www.clickbase.cl" style="color:#7C3AED;text-decoration:none;">clickbase.cl</a>
            </p>
          </div>
        </body>
        </html>
      `,
    }),
  ])

  if (dbResult.status === 'rejected') {
    console.error('whatsapp_clicks insert error:', dbResult.reason)
  }
  if (emailResult.status === 'rejected') {
    console.error('resend send error:', emailResult.reason)
  }

  return NextResponse.json({ success: true })
}
