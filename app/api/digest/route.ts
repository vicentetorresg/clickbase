import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

function fmtSource(s: string | null) {
  if (!s || s === '/') return 'Home (/)'
  return s
}

function scrollBar(pct: number) {
  const filled = Math.round(pct / 10)
  const bar = '█'.repeat(filled) + '░'.repeat(10 - filled)
  return `<span style="font-family:monospace;color:#7C3AED;letter-spacing:1px;">${bar}</span> <strong style="color:#fff;">${pct}%</strong>`
}

export async function GET() {
  // Digest disabled — per-session emails are used instead
  return NextResponse.json({ disabled: true })

  const since = new Date(Date.now() - 30 * 60 * 1000).toISOString()

  const { data: events, error } = await supabase
    .from('events')
    .select('*')
    .gte('created_at', since)

  if (error) {
    console.error('digest query error:', error)
    return NextResponse.json({ success: false, error: JSON.stringify(error) }, { status: 500 })
  }

  // Continúa aunque no haya eventos — envía igual con totales en 0

  // Aggregate
  const visits: Record<string, Set<string>> = {}
  const waClicks: Record<string, number> = {}
  const formSubmits: Record<string, number> = {}
  const scrollDepths: Record<string, number[]> = {}

  for (const e of (events ?? [])) {
    const src = e.source || 'desconocido'

    if (e.type === 'visit') {
      if (!visits[src]) visits[src] = new Set()
      if (e.session_id) visits[src].add(e.session_id)
    }
    if (e.type === 'wa_click') {
      waClicks[src] = (waClicks[src] || 0) + 1
    }
    if (e.type === 'form_submit') {
      formSubmits[src] = (formSubmits[src] || 0) + 1
    }
    if (e.type === 'scroll' && e.scroll_depth) {
      if (!scrollDepths[src]) scrollDepths[src] = []
      scrollDepths[src].push(e.scroll_depth)
    }
  }

  const allSources = Array.from(new Set([
    ...Object.keys(visits),
    ...Object.keys(waClicks),
    ...Object.keys(formSubmits),
    ...Object.keys(scrollDepths),
  ]))

  const totalVisits = Object.values(visits).reduce((a, s) => a + s.size, 0)
  const totalWA = Object.values(waClicks).reduce((a, n) => a + n, 0)
  const totalForms = Object.values(formSubmits).reduce((a, n) => a + n, 0)

  const now = new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })
  const sinceStr = new Date(since).toLocaleTimeString('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit' })
  const nowStr = new Date().toLocaleTimeString('es-CL', { timeZone: 'America/Santiago', hour: '2-digit', minute: '2-digit' })

  const rowsHtml = allSources.map(src => {
    const v = visits[src]?.size || 0
    const wa = waClicks[src] || 0
    const f = formSubmits[src] || 0
    const depths = scrollDepths[src] || []
    const avgScroll = depths.length > 0 ? Math.round(depths.reduce((a, b) => a + b, 0) / depths.length) : null

    return `
      <tr>
        <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);color:#a78bfa;font-weight:600;font-size:13px;">${fmtSource(src)}</td>
        <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);text-align:center;color:#fff;font-size:15px;font-weight:700;">${v}</td>
        <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);text-align:center;">
          ${avgScroll !== null ? scrollBar(avgScroll) : '<span style="color:#475569;">—</span>'}
        </td>
        <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);text-align:center;color:${wa > 0 ? '#25D366' : '#475569'};font-size:15px;font-weight:700;">${wa > 0 ? wa : '—'}</td>
        <td style="padding:12px 16px;border-bottom:1px solid rgba(255,255,255,0.05);text-align:center;color:${f > 0 ? '#06B6D4' : '#475569'};font-size:15px;font-weight:700;">${f > 0 ? f : '—'}</td>
      </tr>
    `
  }).join('')

  const html = `
<!DOCTYPE html>
<html lang="es">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#08080F;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">

    <!-- Header -->
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:22px;">⚡</span>
      <span style="font-size:18px;font-weight:800;background:linear-gradient(135deg,#7C3AED,#06B6D4);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-left:6px;">ClickBase</span>
      <p style="color:#475569;font-size:12px;margin:6px 0 0 0;">Resumen ${sinceStr} → ${nowStr} (Santiago)</p>
    </div>

    <!-- Totals -->
    <div style="display:flex;gap:12px;margin-bottom:24px;">
      <div style="flex:1;background:#12122A;border:1px solid rgba(124,58,237,0.2);border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:28px;font-weight:800;color:#fff;">${totalVisits}</div>
        <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;">Visitas</div>
      </div>
      <div style="flex:1;background:#12122A;border:1px solid rgba(37,211,102,0.2);border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:28px;font-weight:800;color:${totalWA > 0 ? '#25D366' : '#fff'};">${totalWA}</div>
        <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;">Clicks WA</div>
      </div>
      <div style="flex:1;background:#12122A;border:1px solid rgba(6,182,212,0.2);border-radius:12px;padding:16px;text-align:center;">
        <div style="font-size:28px;font-weight:800;color:${totalForms > 0 ? '#06B6D4' : '#fff'};">${totalForms}</div>
        <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;margin-top:4px;">Formularios</div>
      </div>
    </div>

    <!-- Table -->
    <div style="background:#12122A;border:1px solid rgba(124,58,237,0.15);border-radius:12px;overflow:hidden;">
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr style="background:rgba(124,58,237,0.1);">
            <th style="padding:12px 16px;text-align:left;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Fuente</th>
            <th style="padding:12px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Visitas</th>
            <th style="padding:12px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Scroll promedio</th>
            <th style="padding:12px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Clicks WA</th>
            <th style="padding:12px 16px;text-align:center;font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:0.06em;font-weight:600;">Forms</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    </div>

    <p style="text-align:center;font-size:11px;color:#1e293b;margin-top:20px;">
      ⚡ ClickBase — <a href="https://www.clickbase.cl" style="color:#7C3AED;text-decoration:none;">clickbase.cl</a> · ${now}
    </p>
  </div>
</body>
</html>
  `

  await resend.emails.send({
    from: 'ClickBase <notificaciones@priceguard.cl>',
    to: 'vicente.torres@proppi.cl',
    subject: `📊 Resumen ClickBase ${sinceStr}–${nowStr} · ${totalVisits} visitas · ${totalWA} WA · ${totalForms} forms`,
    html,
  })

  return NextResponse.json({ success: true, sent: true, totalVisits, totalWA, totalForms })
}
