'use client'

import { useEffect, useState } from 'react'
import { supabase, type Cotizacion } from '@/lib/supabase'

const SERVICIOS_MAP: Record<string, { nombre: string; tipo: string; precio: number; features: string[] }> = {
  setup: {
    nombre: 'Setup Inicial',
    tipo: 'one-time',
    precio: 699990,
    features: [
      'Diseño y desarrollo de landing page',
      'Formulario de contacto conectado',
      'Botón a WhatsApp con tracking',
      'Google Tag Manager instalado',
      'Meta Pixel configurado',
      'Conversiones de Google configuradas',
      'Setup de primera campaña (Google Ads o Meta Ads)',
      'Versión responsive (mobile + desktop)',
    ],
  },
  mantencion: {
    nombre: 'Mantención Base',
    tipo: 'monthly',
    precio: 49990,
    features: [
      'Soporte no prioritario por WhatsApp',
      'Ajustes menores de contenido',
      'Monitoreo básico del sistema',
      'Apoyo general ante consultas',
    ],
  },
  gestion: {
    nombre: 'Gestión Activa',
    tipo: 'monthly',
    precio: 149990,
    features: [
      'Todo lo del plan de Mantención Base',
      'Reuniones periódicas de seguimiento',
      'Soporte prioritario por WhatsApp',
      'Revisión y optimización de campañas',
      'Informe mensual de resultados',
      'Sugerencias proactivas de mejora',
    ],
  },
  ads_extra: {
    nombre: 'Segunda plataforma Ads',
    tipo: 'one-time',
    precio: 149990,
    features: [
      'Configuración de Google Ads o Meta Ads adicional',
      'Estructura de campaña lista para activar',
      'Integración con tracking ya instalado',
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

export default function CotizacionPage({ params }: { params: { slug: string } }) {
  const [data, setData] = useState<Cotizacion | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    supabase
      .from('cotizaciones')
      .select('*')
      .eq('slug', params.slug)
      .single()
      .then(({ data: row, error }) => {
        if (error || !row) {
          setNotFound(true)
        } else {
          setData(row as Cotizacion)
        }
      })
  }, [params.slug])

  if (notFound) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-400 text-lg">Cotización no encontrada.</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <svg className="animate-spin w-6 h-6 text-brand-purple" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
        </svg>
      </div>
    )
  }

  const servicios = data.servicios.map((id) => SERVICIOS_MAP[id]).filter(Boolean)
  const unicos = servicios.filter((s) => s.tipo === 'one-time')
  const mensuales = servicios.filter((s) => s.tipo === 'monthly')
  const descuentoUnico = data.descuento_unico ?? data.descuento ?? 0
  const descuentoMensual = data.descuento_mensual ?? data.descuento ?? 0

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Header */}
      <div className="border-b border-white/5 py-5 px-6">
        <div className="max-w-3xl mx-auto flex items-center gap-2">
          <span className="text-2xl">⚡</span>
          <span className="text-xl font-bold gradient-text">ClickBase</span>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">

        {/* Greeting */}
        <div>
          <span className="section-label">Propuesta personalizada</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
            Hola, {data.nombre_cliente} 👋
          </h1>
          {data.mensaje_personal && (
            <p className="text-slate-400 text-base leading-relaxed mt-3 border-l-2 border-brand-purple pl-4">
              {data.mensaje_personal}
            </p>
          )}
        </div>

        {/* Vigencia */}
        {data.vigencia && (
          <div className="flex items-center gap-2 text-sm text-amber-400 bg-amber-400/5 border border-amber-400/20 rounded-xl px-4 py-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            Esta cotización es válida hasta el <strong className="ml-1">{formatDate(data.vigencia)}</strong>
          </div>
        )}

        {/* Servicios */}
        <div className="space-y-5">
          <h2 className="text-lg font-bold text-white">Servicios incluidos</h2>
          {servicios.map((s) => (
            <div key={s.nombre} className="card-dark rounded-2xl p-6">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{s.nombre}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    s.tipo === 'one-time'
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                  }`}>
                    {s.tipo === 'one-time' ? 'Pago único' : 'Mensual'}
                  </span>
                </div>
                <div className="text-right flex-shrink-0">
                  {(s.tipo === 'one-time' ? descuentoUnico : descuentoMensual) > 0 && (
                    <div className="text-xs text-slate-600 line-through">{fmt(s.precio)}</div>
                  )}
                  <span className="text-xl font-extrabold text-white">
                    {fmt(Math.round(s.precio * (1 - (s.tipo === 'one-time' ? descuentoUnico : descuentoMensual) / 100)))}
                  </span>
                  <span className="text-xs text-slate-500 ml-1">
                    + IVA{s.tipo === 'monthly' ? ' / mes' : ''}
                  </span>
                </div>
              </div>
              <ul className="space-y-2">
                {s.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
                    <span className="text-emerald-400 flex-shrink-0 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Total */}
        <div className="card-dark rounded-2xl p-6 border border-brand-purple/30">
          <h2 className="text-base font-bold text-white mb-5">Resumen de inversión</h2>
          <div className="space-y-4">
            {unicos.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Pago único (setup)</span>
                <div className="text-right">
                  {descuentoUnico > 0 && (
                    <div className="text-xs text-slate-600 line-through">
                      {fmt(unicos.reduce((a, s) => a + s.precio, 0))} + IVA
                    </div>
                  )}
                  <span className="text-2xl font-extrabold text-white">{fmt(data.total_unico)}</span>
                  <span className="text-sm text-slate-400 ml-1">+ IVA</span>
                </div>
              </div>
            )}
            {mensuales.length > 0 && (
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Mantención mensual</span>
                <div className="text-right">
                  {descuentoMensual > 0 && (
                    <div className="text-xs text-slate-600 line-through">
                      {fmt(mensuales.reduce((a, s) => a + s.precio, 0))} + IVA/mes
                    </div>
                  )}
                  <span className="text-2xl font-extrabold text-white">{fmt(data.total_mensual)}</span>
                  <span className="text-sm text-slate-400 ml-1">+ IVA / mes</span>
                </div>
              </div>
            )}
            {(descuentoUnico > 0 || descuentoMensual > 0) && (
              <div className="flex flex-col gap-1 p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                {descuentoUnico > 0 && (
                  <span className="text-emerald-400 text-sm font-semibold">✓ Descuento de {descuentoUnico}% en implementación</span>
                )}
                {descuentoMensual > 0 && (
                  <span className="text-emerald-400 text-sm font-semibold">✓ Descuento de {descuentoMensual}% en mensual</span>
                )}
              </div>
            )}
          </div>
          <p className="text-xs text-slate-600 mt-4">
            Los valores no incluyen IVA. La inversión publicitaria (Google/Meta) se paga directamente a las plataformas y no está incluida.
          </p>
        </div>

        {/* CTA */}
        <div className="card-dark rounded-2xl p-6 text-center">
          <h3 className="text-lg font-bold text-white mb-2">¿Listo para avanzar?</h3>
          <p className="text-slate-400 text-sm mb-6">
            Escríbeme por WhatsApp y cerramos los detalles.
          </p>
          <a
            href="https://wa.me/56994366697?text=Hola%20Vicente%2C%20recibí%20la%20cotización%20y%20quiero%20avanzar."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-xl transition-all duration-200 text-base"
            style={{ boxShadow: '0 0 20px rgba(37,211,102,0.2)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z"/>
            </svg>
            Quiero avanzar
          </a>
        </div>

        {/* Footer */}
        <div className="text-center pt-4 pb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-lg">⚡</span>
            <span className="font-bold gradient-text text-sm">ClickBase</span>
          </div>
          <p className="text-xs text-slate-600">
            Página web + campañas + tracking completo — base lista para captar clientes.
          </p>
        </div>

      </div>
    </div>
  )
}
