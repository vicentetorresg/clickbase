import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { insertLead } from '@/lib/leads'
import { sendMailViaAppsScript } from '@/lib/apps-script-mail'

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

  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })
  const requestUserAgent = user_agent || req.headers.get('user-agent')
  const deviceLabel = getDeviceLabel(device || requestUserAgent)
  const subject = `ClickBase | Nuevo lead | ${name} | ${phone}`
  const body = [
    `Nombre: ${name}`,
    `Teléfono: ${phone}`,
    rubro ? `Rubro: ${rubro}` : '',
    budget ? `Inversión en publicidad: ${budget}` : '',
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
      <body style="margin:0;padding:0;background:#f3f6fb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#0f172a;">
        <div style="max-width:560px;margin:0 auto;padding:28px 16px;">
          <div style="background:linear-gradient(135deg,#1e1b4b 0%,#312e81 45%,#0f766e 100%);border-radius:24px 24px 0 0;padding:24px 28px;">
            <div style="display:inline-block;font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#c4b5fd;margin-bottom:10px;">ClickBase</div>
            <div style="font-size:28px;font-weight:800;line-height:1.1;color:#ffffff;">Nuevo lead</div>
            <div style="font-size:14px;color:#ddd6fe;margin-top:8px;">Entr&oacute; un nuevo contacto desde el formulario y ya qued&oacute; guardado en la base.</div>
          </div>
          <div style="background:#ffffff;border:1px solid #ddd6fe;border-top:none;border-radius:0 0 24px 24px;padding:26px 28px 22px;box-shadow:0 20px 45px rgba(30,27,75,0.08);">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:18px;">
              <div style="font-size:13px;font-weight:700;color:#6d28d9;background:#f3e8ff;border:1px solid #e9d5ff;padding:7px 12px;border-radius:999px;">Lead recibido</div>
              <div style="font-size:12px;color:#64748b;">${now}</div>
            </div>
            <table style="width:100%;border-collapse:collapse;background:#f8fafc;border:1px solid #e2e8f0;border-radius:18px;overflow:hidden;">
              <tr>
                <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Nombre</span>
                  <div style="font-size:17px;font-weight:800;color:#0f172a;margin-top:4px;">${name}</div>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Telefono</span>
                  <div style="font-size:16px;font-weight:800;color:#0f766e;margin-top:4px;">${phone}</div>
                </td>
              </tr>
              ${rubro ? `<tr>
                <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Rubro</span>
                  <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${rubro}</div>
                </td>
              </tr>` : ''}
              ${budget ? `<tr>
                <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Inversion en publicidad</span>
                  <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${budget}</div>
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Fuente</span>
                  <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${source || '/'}</div>
                </td>
              </tr>
              ${deviceLabel ? `<tr>
                <td style="padding:16px 18px;border-bottom:1px solid #e2e8f0;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">Dispositivo</span>
                  <div style="font-size:14px;font-weight:700;color:#0f172a;margin-top:4px;">${deviceLabel}</div>
                </td>
              </tr>` : ''}
              ${utm_campaign || utm_source ? `<tr>
                <td style="padding:16px 18px;">
                  <span style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.08em;">UTM</span>
                  <div style="font-size:14px;font-weight:700;color:#6d28d9;margin-top:4px;">${[utm_campaign, utm_source, utm_medium, utm_content].filter(Boolean).join(' · ')}</div>
                </td>
              </tr>` : ''}
            </table>
            <div style="margin-top:18px;font-size:12px;line-height:1.6;color:#64748b;">
              Este correo se envi&oacute; desde el flujo principal de captaci&oacute;n. El lead tambi&eacute;n queda registrado en la tabla <strong>leads</strong> de Supabase.
            </div>
          </div>
          <p style="text-align:center;font-size:11px;color:#94a3b8;margin-top:14px;">ClickBase · clickbase.cl</p>
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
    await sendMailViaAppsScript({ subject, body, html })
  } catch (error) {
    console.error('Apps Script lead email error (non-fatal):', error)
  }

  return NextResponse.json({ ok: true })
}
