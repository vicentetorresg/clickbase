import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = 'ClickBase <notificaciones@priceguard.cl>'
const CC_EMAIL = 'vicente.torres@proppi.cl'
const WHATSAPP_URL = 'https://wa.me/56955350255?text=Hola%20Vicente%2C%20recibí%20la%20cotización%20y%20quiero%20avanzar.'

const SERVICIOS_DETALLE: Record<string, {
  nombre: string
  tipo: string
  precio: number
  precioLista?: number
  sla: string
  features: string[]
}> = {
  setup: {
    nombre: 'Setup Inicial',
    tipo: 'Pago único',
    precio: 699990,
    precioLista: 999990,
    sla: 'Entrega en 5–7 días hábiles desde el pago.',
    features: [
      'Diseño y desarrollo de landing page de alta conversión',
      'Formulario de contacto conectado y funcional',
      'Botón a WhatsApp con tracking de clics',
      'Google Tag Manager (GTM) instalado y configurado',
      'Meta Pixel configurado y verificado',
      'Conversiones de Google configuradas',
      'Setup de primera campaña (Google Ads o Meta Ads)',
      'Versión responsive (mobile + desktop)',
      'Hosting incluido el primer mes (Vercel)',
    ],
  },
  mantencion: {
    nombre: 'Mantención Base',
    tipo: 'Mensual',
    precio: 49990,
    sla: 'Soporte por WhatsApp en horario hábil (lunes a viernes, 9:00–18:00). Respuesta en el día. Ajustes menores con entrega en hasta 48 horas hábiles.',
    features: [
      'Soporte no prioritario por WhatsApp',
      'Ajustes menores de texto, imágenes o colores',
      'Monitoreo básico del sistema (formularios, tracking)',
      'Apoyo general ante consultas técnicas',
    ],
  },
  gestion: {
    nombre: 'Gestión Activa',
    tipo: 'Mensual',
    precio: 149990,
    sla: 'Soporte prioritario por WhatsApp con respuesta en menos de 4 horas hábiles. Reuniones mensuales de revisión. Informe de resultados entregado los primeros 5 días de cada mes.',
    features: [
      'Todo lo del plan Mantención Base',
      'Reuniones periódicas de seguimiento (1 por mes)',
      'Soporte prioritario por WhatsApp (respuesta en <4 horas hábiles)',
      'Revisión y optimización de campañas activas',
      'Informe mensual de resultados (clicks, leads, costo por lead)',
      'Sugerencias proactivas de mejora',
    ],
  },
  ads_extra: {
    nombre: 'Segunda plataforma Ads',
    tipo: 'Pago adicional único',
    precio: 149990,
    sla: 'Entrega en 3–5 días hábiles desde el pago.',
    features: [
      'Configuración de segunda plataforma (Google Ads o Meta Ads)',
      'Estructura de campaña lista para activar',
      'Integración con el tracking ya instalado',
      'Configuración de conversiones en la segunda plataforma',
    ],
  },
}

function fmt(n: number) {
  return '$' + n.toLocaleString('es-CL')
}

function formatDate(iso: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-')
  return `${d}/${m}/${y}`
}

export async function POST(req: Request) {
  const body = await req.json()
  const { nombre_cliente, email_cliente, servicios, descuento, mensaje_personal, vigencia, total_unico, total_mensual, slug } = body

  if (!email_cliente) {
    return NextResponse.json({ success: false, error: 'No hay email del cliente' }, { status: 400 })
  }

  const cotizacionUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.clickbase.cl'}/cotizacion/${slug}`

  const serviciosDetalle = (servicios as string[]).map((id) => SERVICIOS_DETALLE[id]).filter(Boolean)
  const desc = descuento || 0

  const serviciosHtml = serviciosDetalle.map((s) => `
    <div style="background:#12122A;border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:20px 24px;margin-bottom:16px;">
      <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px;gap:16px;">
        <div>
          <span style="font-size:15px;font-weight:700;color:#fff;">${s.nombre}</span>
          <span style="display:inline-block;margin-left:8px;font-size:11px;background:rgba(124,58,237,0.15);color:#a78bfa;border:1px solid rgba(124,58,237,0.3);border-radius:20px;padding:2px 8px;">${s.tipo}</span>
        </div>
        <div style="text-align:right;flex-shrink:0;">
          ${s.precioLista ? `<div style="font-size:14px;color:#94a3b8;text-decoration:line-through;font-weight:500;">${fmt(s.precioLista)} + IVA</div>` : desc > 0 ? `<div style="font-size:14px;color:#94a3b8;text-decoration:line-through;font-weight:500;">${fmt(s.precio)} + IVA</div>` : ''}
          <span style="font-size:18px;font-weight:800;color:#fff;">${fmt(Math.round(s.precio * (1 - desc / 100)))}</span>
          <span style="font-size:11px;color:#64748b;margin-left:4px;">+ IVA${s.tipo === 'Mensual' ? ' / mes' : ''}</span>
        </div>
      </div>
      <ul style="margin:0 0 12px 0;padding:0;list-style:none;">
        ${s.features.map((f) => `<li style="font-size:13px;color:#cbd5e1;padding:4px 0;display:flex;align-items:flex-start;gap:8px;"><span style="color:#4ade80;flex-shrink:0;">✓</span>${f}</li>`).join('')}
      </ul>
      <div style="background:rgba(124,58,237,0.08);border-left:3px solid #7C3AED;border-radius:0 6px 6px 0;padding:8px 12px;margin-top:8px;">
        <span style="font-size:12px;color:#94a3b8;"><strong style="color:#a78bfa;">SLA:</strong> ${s.sla}</span>
      </div>
    </div>
  `).join('')

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">

    <!-- Logo -->
    <div style="text-align:center;margin-bottom:32px;">
      <span style="font-size:28px;">⚡</span>
      <span style="font-size:22px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-left:6px;">ClickBase</span>
    </div>

    <!-- Hero -->
    <div style="background:linear-gradient(135deg,rgba(124,58,237,0.15),rgba(6,182,212,0.08));border:1px solid rgba(124,58,237,0.25);border-radius:16px;padding:32px 28px;margin-bottom:24px;text-align:center;">
      <p style="font-size:15px;color:#94a3b8;margin:0 0 8px 0;">Propuesta personalizada para</p>
      <h1 style="font-size:28px;font-weight:800;color:#fff;margin:0 0 16px 0;">${nombre_cliente}</h1>
      ${mensaje_personal ? `<p style="font-size:14px;color:#cbd5e1;margin:0 0 20px 0;padding:12px 16px;border-left:3px solid #7C3AED;text-align:left;background:rgba(124,58,237,0.05);border-radius:0 8px 8px 0;">${mensaje_personal}</p>` : ''}
      ${vigencia ? `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(251,191,36,0.08);border:1px solid rgba(251,191,36,0.2);border-radius:8px;padding:6px 12px;font-size:12px;color:#fbbf24;">⏱ Válida hasta el ${formatDate(vigencia)}</div>` : ''}
    </div>

    <!-- Servicios -->
    <h2 style="font-size:16px;font-weight:700;color:#fff;margin:0 0 16px 0;">Servicios incluidos</h2>
    ${serviciosHtml}

    <!-- Totales -->
    <div style="background:#12122A;border:1px solid rgba(124,58,237,0.3);border-radius:12px;padding:20px 24px;margin-bottom:24px;">
      <h2 style="font-size:15px;font-weight:700;color:#fff;margin:0 0 16px 0;">Resumen de inversión</h2>

      <table style="width:100%;border-collapse:collapse;">
      ${total_unico > 0 ? (() => {
        const precioOriginalUnico = serviciosDetalle.filter(s=>s.tipo==='Pago único').reduce((a,s)=>a+(s.precioLista??s.precio),0)
        const ahorroUnico = precioOriginalUnico - total_unico
        return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);vertical-align:top;">
            <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">Pago único (setup)</div>
            <div style="font-size:14px;color:#94a3b8;text-decoration:line-through;font-weight:500;">${fmt(precioOriginalUnico)} + IVA</div>
          </td>
          <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;vertical-align:top;white-space:nowrap;">
            <div style="font-size:22px;font-weight:800;color:#fff;line-height:1.2;">${fmt(total_unico)}</div>
            <div style="font-size:12px;color:#64748b;">+ IVA</div>
            ${desc > 0 ? `<div style="font-size:12px;font-weight:700;color:#4ade80;margin-top:2px;">Ahorras ${fmt(ahorroUnico)}</div>` : ''}
          </td>
        </tr>`
      })() : ''}
      ${total_mensual > 0 ? (() => {
        const precioOriginalMensual = serviciosDetalle.filter(s=>s.tipo==='Mensual').reduce((a,s)=>a+s.precio,0)
        const ahorroMensual = precioOriginalMensual - total_mensual
        return `
        <tr>
          <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);vertical-align:top;">
            <div style="font-size:13px;color:#94a3b8;margin-bottom:4px;">Mantención mensual</div>
            ${desc > 0 ? `<div style="font-size:14px;color:#94a3b8;text-decoration:line-through;font-weight:500;">${fmt(precioOriginalMensual)} + IVA/mes</div>` : ''}
          </td>
          <td style="padding:12px 0;border-bottom:1px solid rgba(255,255,255,0.06);text-align:right;vertical-align:top;white-space:nowrap;">
            <div style="font-size:22px;font-weight:800;color:#fff;line-height:1.2;">${fmt(total_mensual)}</div>
            <div style="font-size:12px;color:#64748b;">+ IVA / mes</div>
            ${desc > 0 ? `<div style="font-size:12px;font-weight:700;color:#4ade80;margin-top:2px;">Ahorras ${fmt(ahorroMensual)}/mes</div>` : ''}
          </td>
        </tr>`
      })() : ''}
      </table>

      ${desc > 0 ? `
      <table style="width:100%;border-collapse:collapse;margin-top:14px;">
        <tr>
          <td style="background:rgba(74,222,128,0.08);border:1.5px solid rgba(74,222,128,0.4);border-radius:10px;padding:14px 16px;">
            <table style="border-collapse:collapse;width:100%;">
              <tr>
                <td style="vertical-align:middle;width:36px;font-size:26px;line-height:1;padding-right:12px;">🎁</td>
                <td style="vertical-align:middle;">
                  <div style="font-size:15px;font-weight:800;color:#4ade80;">¡${desc}% de descuento aplicado!</div>
                  <div style="font-size:12px;color:#86efac;margin-top:3px;">Precio especial para tu cotización — válido según fecha indicada.</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>` : ''}

      <p style="font-size:11px;color:#374151;margin:14px 0 0 0;">Los valores no incluyen IVA. La inversión publicitaria (Google/Meta) se paga directamente a las plataformas.</p>
    </div>

    <!-- Botones -->
    <div style="text-align:center;margin-bottom:32px;">
      <a href="${cotizacionUrl}" style="display:inline-block;background:linear-gradient(135deg,#7C3AED,#06B6D4);color:#fff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;margin-bottom:12px;">
        Ver cotización completa →
      </a>
      <br>
      <a href="${WHATSAPP_URL}" style="display:inline-flex;align-items:center;gap:8px;background:#25D366;color:#fff;font-weight:700;font-size:14px;padding:14px 32px;border-radius:12px;text-decoration:none;margin-top:8px;">
        💬 Escribir por WhatsApp
      </a>
    </div>

    <!-- Footer -->
    <div style="text-align:center;padding-top:24px;border-top:1px solid rgba(255,255,255,0.05);">
      <p style="font-size:12px;color:#374151;margin:0;">
        ⚡ ClickBase — Página web + campañas + tracking completo<br>
        <a href="https://www.clickbase.cl" style="color:#7C3AED;text-decoration:none;">www.clickbase.cl</a>
      </p>
    </div>

  </div>
</body>
</html>
  `

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email_cliente,
      cc: CC_EMAIL,
      subject: `Tu cotización ClickBase — ${nombre_cliente}`,
      html,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false, error: String(err) }, { status: 500 })
  }
}
