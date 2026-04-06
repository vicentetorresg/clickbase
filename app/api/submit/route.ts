import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { insertLead } from '@/lib/leads'
import { sendMailViaAppsScript } from '@/lib/apps-script-mail'

const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyh4a4T6fnfA8u0C6oyI7oBT37NSsJI6wuiyQN8tHB4hN2hnwGYlXRzCwJxFfoxDe6a/exec'

const RESEND_API_KEY = process.env.RESEND_API_KEY!
const NOTIFY_EMAIL   = 'vicente.torres@proppi.cl'
const FROM_EMAIL     = 'ClickBase <notificaciones@priceguard.cl>'
const WA_NUMBER      = '56955350255'

function buildEmailHtml(data: Record<string, string>) {
  const row = (label: string, value: string) => value ? `
    <tr>
      <td style="padding:10px 16px;font-weight:600;color:#94a3b8;font-size:13px;white-space:nowrap;width:130px;">${label}</td>
      <td style="padding:10px 16px;color:#f1f5f9;font-size:14px;">${value}</td>
    </tr>` : ''

  return `<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#08080F;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:linear-gradient(135deg,#7C3AED,#06B6D4);padding:28px 32px;border-radius:16px 16px 0 0;">
            <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.7);letter-spacing:0.08em;text-transform:uppercase;">ClickBase</p>
            <h1 style="margin:6px 0 0;font-size:22px;font-weight:700;color:#fff;">
              🎯 Nuevo lead recibido
            </h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0F0F1A;padding:24px 32px;border:1px solid rgba(124,58,237,0.2);border-top:none;">

            <p style="margin:0 0 20px;font-size:14px;color:#94a3b8;">
              Alguien completó el formulario de cotización. Aquí están sus datos:
            </p>

            <!-- Data table -->
            <table width="100%" cellpadding="0" cellspacing="0"
              style="background:#08080F;border-radius:12px;border:1px solid rgba(124,58,237,0.15);overflow:hidden;">
              <tbody>
                ${row('Nombre',   data.nombre)}
                ${row('Empresa',  data.empresa)}
                ${row('Rubro',    data.rubro)}
                ${row('Email',    data.email)}
                ${row('WhatsApp', data.whatsapp)}
                ${data.mensaje ? `
                <tr>
                  <td colspan="2" style="padding:12px 16px 6px;font-weight:600;color:#94a3b8;font-size:13px;">Mensaje</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:0 16px 14px;color:#f1f5f9;font-size:14px;line-height:1.6;">${data.mensaje}</td>
                </tr>` : ''}
              </tbody>
            </table>

            <!-- CTA buttons -->
            <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:24px;">
              <tr>
                <td style="padding-right:8px;">
                  <a href="https://wa.me/${WA_NUMBER}?text=Hola%20${encodeURIComponent(data.nombre)}%2C%20te%20contacto%20desde%20ClickBase%20por%20tu%20solicitud%20de%20cotizaci%C3%B3n."
                    style="display:block;text-align:center;background:linear-gradient(135deg,#7C3AED,#06B6D4);color:#fff;font-weight:700;font-size:14px;padding:14px;border-radius:10px;text-decoration:none;">
                    💬 Responder por WhatsApp
                  </a>
                </td>
                <td style="padding-left:8px;">
                  <a href="mailto:${data.email}?subject=Tu%20cotizaci%C3%B3n%20en%20ClickBase&body=Hola%20${encodeURIComponent(data.nombre)}%2C"
                    style="display:block;text-align:center;background:#0F0F1A;color:#A855F7;font-weight:700;font-size:14px;padding:14px;border-radius:10px;text-decoration:none;border:1px solid rgba(124,58,237,0.4);">
                    ✉️ Responder por email
                  </a>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#0a0a12;padding:16px 32px;border-radius:0 0 16px 16px;border:1px solid rgba(124,58,237,0.1);border-top:none;">
            <p style="margin:0;font-size:12px;color:#475569;text-align:center;">
              ClickBase · notificaciones@proppi.cl
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const requestUserAgent = request.headers.get('user-agent') || null
    const subject = `🎯 Nuevo lead: ${data.nombre}${data.empresa ? ` · ${data.empresa}` : ''} (${data.rubro})`
    const html = buildEmailHtml(data)
    const body = [
      `Nombre: ${data.nombre}`,
      `Empresa: ${data.empresa || '—'}`,
      `Rubro: ${data.rubro || '—'}`,
      `Email: ${data.email || '—'}`,
      `WhatsApp: ${data.whatsapp || '—'}`,
      data.mensaje ? `Mensaje: ${data.mensaje}` : '',
      `Fuente: ${data.source || '/'}`,
    ].filter(Boolean).join('\n')

    // Validación básica
    if (!data.nombre || !data.email || !data.whatsapp || !data.rubro) {
      return NextResponse.json(
        { success: false, error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    await insertLead({
      name: data.nombre,
      email: data.email,
      phone: data.whatsapp,
      company: data.empresa,
      rubro: data.rubro,
      message: data.mensaje,
      source: data.source || '/',
      referrer: data.referrer || null,
      userAgent: requestUserAgent,
      utm_source: data.utm_source,
      utm_medium: data.utm_medium,
      utm_campaign: data.utm_campaign,
      utm_content: data.utm_content,
      channel: 'cotizacion_form',
    })

    // 1. Guardar en Google Sheets
    const sheetRes = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      redirect: 'follow',
    })

    if (!sheetRes.ok) {
      throw new Error(`Google Sheets error: ${sheetRes.status}`)
    }

    const sheetResult = await sheetRes.json()
    if (!sheetResult.success) {
      throw new Error(sheetResult.error || 'Error guardando en Sheets')
    }

    // 2. Enviar email de notificación (no bloquea si falla)
    try {
      const resendResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from:    FROM_EMAIL,
          to:      [NOTIFY_EMAIL],
          subject,
          html,
        }),
      })

      if (!resendResponse.ok) {
        throw new Error(`Resend error: ${resendResponse.status}`)
      }
    } catch (emailErr) {
      console.error('Email error (non-fatal):', emailErr)
      try {
        await sendMailViaAppsScript({ subject, body, html })
      } catch (appsScriptError) {
        console.error('Apps Script lead email error (non-fatal):', appsScriptError)
      }
    }

    void supabase.from('events').insert({
      type: 'form_submit',
      source: data.source || '/',
      referrer: data.referrer || null,
      user_agent: requestUserAgent,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error al procesar lead:', error)
    return NextResponse.json(
      { success: false, error: 'No se pudo enviar el formulario. Intenta por WhatsApp.' },
      { status: 500 }
    )
  }
}
