'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

const SERVICIOS = [
  {
    id: 'setup',
    nombre: 'Setup Inicial',
    tipo: 'one-time',
    precio: 699990,
    label: 'Pago único',
    descripcion: 'Landing + GTM + Pixel + campaña Google o Meta',
  },
  {
    id: 'mantencion',
    nombre: 'Mantención Base',
    tipo: 'monthly',
    precio: 49990,
    label: 'Mensual',
    descripcion: 'Soporte WhatsApp + ajustes menores + monitoreo',
  },
  {
    id: 'gestion',
    nombre: 'Gestión Activa',
    tipo: 'monthly',
    precio: 149990,
    label: 'Mensual',
    descripcion: 'Reuniones + optimización de campañas + informes mensuales',
  },
  {
    id: 'ads_extra',
    nombre: 'Segunda plataforma Ads',
    tipo: 'one-time',
    precio: 149990,
    label: 'Adicional',
    descripcion: 'Agregar Google Ads o Meta Ads si el setup solo incluye una',
  },
]

function generarSlug() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
}

export default function CotizadorPage() {
  const [authed, setAuthed] = useState(false)
  const [loginError, setLoginError] = useState(false)
  const [usuario, setUsuario] = useState('')
  const [clave, setClave] = useState('')

  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [telefono, setTelefono] = useState('')
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState<string[]>(['setup'])
  const [descuento, setDescuento] = useState(0)
  const [mensajePersonal, setMensajePersonal] = useState('')
  const [vigencia, setVigencia] = useState('')
  const [urlGenerada, setUrlGenerada] = useState('')
  const [copiado, setCopiado] = useState(false)
  const [guardando, setGuardando] = useState(false)
  const [errorGuardar, setErrorGuardar] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setAuthed(localStorage.getItem('cb_auth') === 'true')
    }
    const d = new Date()
    d.setDate(d.getDate() + 7)
    setVigencia(d.toISOString().split('T')[0])
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (usuario === 'vtorres' && clave === 'admin') {
      localStorage.setItem('cb_auth', 'true')
      setAuthed(true)
    } else {
      setLoginError(true)
    }
  }

  const toggleServicio = (id: string) => {
    setServiciosSeleccionados((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    )
  }

  const totalUnico = SERVICIOS.filter(
    (s) => s.tipo === 'one-time' && serviciosSeleccionados.includes(s.id)
  ).reduce((acc, s) => acc + s.precio, 0)

  const totalMensual = SERVICIOS.filter(
    (s) => s.tipo === 'monthly' && serviciosSeleccionados.includes(s.id)
  ).reduce((acc, s) => acc + s.precio, 0)

  const totalUnicoFinal = Math.round(totalUnico * (1 - descuento / 100))
  const totalMensualFinal = Math.round(totalMensual * (1 - descuento / 100))

  const fmt = (n: number) => '$' + n.toLocaleString('es-CL')

  const generarUrl = async () => {
    setGuardando(true)
    setErrorGuardar('')
    setUrlGenerada('')

    const slug = generarSlug()

    const { error } = await supabase.from('cotizaciones').insert({
      slug,
      nombre_cliente: nombre,
      email_cliente: correo,
      telefono_cliente: telefono,
      servicios: serviciosSeleccionados,
      descuento,
      mensaje_personal: mensajePersonal,
      vigencia: vigencia || null,
      total_unico: totalUnicoFinal,
      total_mensual: totalMensualFinal,
      creado_por: 'vtorres',
    })

    if (error) {
      setErrorGuardar('Error al guardar: ' + error.message)
      setGuardando(false)
      return
    }

    const url = `${window.location.origin}/cotizacion/${slug}`

    // Enviar email si hay correo
    if (correo) {
      await fetch('/api/send-cotizacion', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          nombre_cliente: nombre,
          email_cliente: correo,
          servicios: serviciosSeleccionados,
          descuento,
          mensaje_personal: mensajePersonal,
          vigencia,
          total_unico: totalUnicoFinal,
          total_mensual: totalMensualFinal,
        }),
      })
    }

    setUrlGenerada(url)
    setGuardando(false)
  }

  const copiarUrl = () => {
    navigator.clipboard.writeText(urlGenerada)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-3xl">⚡</span>
              <span className="text-2xl font-bold gradient-text">ClickBase</span>
            </div>
            <p className="text-slate-500 text-sm">Cotizador interno</p>
          </div>
          <form onSubmit={handleLogin} className="card-dark rounded-2xl p-8 space-y-4">
            <h2 className="text-lg font-bold text-white mb-2">Iniciar sesión</h2>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Usuario</label>
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                autoComplete="username"
                className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1.5">Contraseña</label>
              <input
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                autoComplete="current-password"
                className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
              />
            </div>
            {loginError && (
              <p className="text-red-400 text-sm">Usuario o contraseña incorrectos.</p>
            )}
            <button
              type="submit"
              className="w-full gradient-bg text-white font-bold py-3 rounded-xl text-sm hover:opacity-90 transition-all duration-200 mt-2"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {/* Top bar */}
      <div className="border-b border-white/5 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <span className="font-bold gradient-text">ClickBase</span>
          <span className="text-slate-600 text-sm ml-2">/ Cotizador</span>
        </div>
        <button
          onClick={() => { localStorage.removeItem('cb_auth'); setAuthed(false) }}
          className="text-xs text-slate-500 hover:text-white transition-colors"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT: Form */}
          <div className="space-y-8">

            {/* Datos del cliente */}
            <div className="card-dark rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-5">Datos del cliente</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Nombre *</label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Nombre completo o empresa"
                    className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Correo</label>
                  <input
                    type="email"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="cliente@email.cl"
                    className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Teléfono</label>
                  <input
                    type="tel"
                    value={telefono}
                    onChange={(e) => setTelefono(e.target.value)}
                    placeholder="+56 9 XXXX XXXX"
                    className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Servicios */}
            <div className="card-dark rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-5">Servicios</h2>
              <div className="space-y-3">
                {SERVICIOS.map((s) => {
                  const selected = serviciosSeleccionados.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleServicio(s.id)}
                      className={`w-full text-left rounded-xl p-4 border transition-all duration-200 ${
                        selected
                          ? 'border-brand-purple bg-brand-purple/10'
                          : 'border-slate-700 bg-dark hover:border-slate-500'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className={`w-3.5 h-3.5 rounded-sm border flex-shrink-0 flex items-center justify-center ${selected ? 'gradient-bg border-transparent' : 'border-slate-600'}`}>
                              {selected && (
                                <svg width="8" height="8" viewBox="0 0 12 12" fill="white">
                                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                                </svg>
                              )}
                            </span>
                            <span className="text-sm font-semibold text-white">{s.nombre}</span>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              s.tipo === 'one-time'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : s.tipo === 'monthly'
                                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                                : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                            }`}>{s.label}</span>
                          </div>
                          <p className="text-xs text-slate-500 ml-5">{s.descripcion}</p>
                        </div>
                        <span className="text-sm font-bold text-white whitespace-nowrap">
                          {fmt(s.precio)}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Opciones adicionales */}
            <div className="card-dark rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-5">Opciones</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">
                    Descuento (%) <span className="text-slate-600">— opcional</span>
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={50}
                    value={descuento}
                    onChange={(e) => setDescuento(Number(e.target.value))}
                    className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">
                    Mensaje personal <span className="text-slate-600">— aparece arriba de la cotización</span>
                  </label>
                  <textarea
                    rows={3}
                    value={mensajePersonal}
                    onChange={(e) => setMensajePersonal(e.target.value)}
                    placeholder="Ej: Hola Marcelo, aquí va la propuesta que conversamos..."
                    className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-400 mb-1.5">Válida hasta</label>
                  <input
                    type="date"
                    value={vigencia}
                    onChange={(e) => setVigencia(e.target.value)}
                    className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Resumen + generar */}
          <div className="lg:sticky lg:top-8 space-y-6 self-start">

            <div className="card-dark rounded-2xl p-6">
              <h2 className="text-base font-bold text-white mb-5">Resumen</h2>
              {serviciosSeleccionados.length === 0 ? (
                <p className="text-sm text-slate-600">Selecciona al menos un servicio.</p>
              ) : (
                <div className="space-y-3">
                  {SERVICIOS.filter((s) => serviciosSeleccionados.includes(s.id)).map((s) => (
                    <div key={s.id} className="flex justify-between items-center text-sm">
                      <span className="text-slate-300">{s.nombre}</span>
                      <span className="font-semibold text-white">{fmt(s.precio)}</span>
                    </div>
                  ))}
                  {descuento > 0 && (
                    <div className="flex justify-between items-center text-sm text-emerald-400">
                      <span>Descuento ({descuento}%)</span>
                      <span>— aplicado</span>
                    </div>
                  )}
                  <div className="h-px bg-white/10 my-2" />
                  {totalUnico > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Pago único</span>
                      <div className="text-right">
                        {descuento > 0 && (
                          <div className="text-xs text-slate-600 line-through">{fmt(totalUnico)}</div>
                        )}
                        <span className="text-lg font-extrabold text-white">{fmt(totalUnicoFinal)}</span>
                        <span className="text-xs text-slate-500 ml-1">+ IVA</span>
                      </div>
                    </div>
                  )}
                  {totalMensual > 0 && (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Mensual</span>
                      <div className="text-right">
                        {descuento > 0 && (
                          <div className="text-xs text-slate-600 line-through">{fmt(totalMensual)}</div>
                        )}
                        <span className="text-lg font-extrabold text-white">{fmt(totalMensualFinal)}</span>
                        <span className="text-xs text-slate-500 ml-1">+ IVA / mes</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={generarUrl}
              disabled={!nombre || serviciosSeleccionados.length === 0 || guardando}
              className={`w-full gradient-bg text-white font-bold py-4 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                !nombre || serviciosSeleccionados.length === 0 || guardando
                  ? 'opacity-40 cursor-not-allowed'
                  : 'hover:opacity-90 hover:shadow-glow-purple'
              }`}
            >
              {guardando ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                  Guardando...
                </>
              ) : 'Generar URL de cotización →'}
            </button>

            {errorGuardar && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
                ⚠️ {errorGuardar}
              </div>
            )}

            {urlGenerada && (
              <div className="card-dark rounded-2xl p-5 space-y-3">
                <p className="text-sm font-semibold text-white">✓ Cotización guardada{correo ? ' · Email enviado' : ''}</p>
                <div className="bg-dark rounded-xl p-3 border border-slate-700 break-all text-xs text-slate-400 font-mono">
                  {urlGenerada}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={copiarUrl}
                    className="flex-1 gradient-bg text-white font-bold py-2.5 rounded-xl text-sm hover:opacity-90 transition-all duration-200"
                  >
                    {copiado ? '✓ Copiado' : 'Copiar URL'}
                  </button>
                  <a
                    href={urlGenerada}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center border border-brand-purple/40 text-brand-purple-light hover:border-brand-purple hover:bg-brand-purple/10 font-semibold py-2.5 rounded-xl text-sm transition-all duration-200"
                  >
                    Ver preview
                  </a>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  )
}
