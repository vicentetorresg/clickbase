'use client'

import { useState } from 'react'
import { useOpenWAModal } from '@/components/WAModalProvider'

type FormData = {
  nombre: string
  email: string
  rubro: string
  whatsapp: string
}

const initialFormData: FormData = {
  nombre: '',
  email: '',
  rubro: '',
  whatsapp: '',
}

export default function CTAFinal() {
  const openModal = useOpenWAModal()
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pushEvent = (event: Record<string, any>) => {
    if (typeof window !== 'undefined') {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push(event)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Disparar evento de intento de envío
    pushEvent({ event: 'form_submit_attempt', form_location: 'cta_final' })

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: window.location.pathname,
          referrer: document.referrer || null,
        }),
      })

      const result = await res.json()

      if (!result.success) {
        throw new Error(result.error || 'Error al enviar')
      }

      // ✅ Evento principal de conversión — úsalo en GTM como activador
      pushEvent({
        event: 'lead_generado',
        form_location: 'cta_final',
        rubro: formData.rubro,
      })

      setSubmitted(true)
      setFormData(initialFormData)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Hubo un error. Intenta por WhatsApp.'
      )
    } finally {
      setLoading(false)
    }
  }

  const inputClass =
    'w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-500 text-sm transition-all duration-200 focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none'

  return (
    <section id="contacto" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/8 to-transparent pointer-events-none" />
      <div
        className="absolute top-1/4 right-0 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN */}
          <div>
            <span className="section-label">Cotiza sin compromiso</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6 leading-tight">
              ¿Listo para dejar de depender del boca en boca?{' '}
              <span className="gradient-text">Cuéntanos de tu negocio.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              En 15 minutos te decimos si podemos ayudarte, cuánto cuesta y cuándo arrancamos.
              Sin tecnicismos, sin presión. Solo una conversación honesta sobre tu negocio.
            </p>

            {/* WhatsApp button — primary CTA */}
            <button
              onClick={() => {
                pushEvent({ event: 'whatsapp_click', location: 'cta_final' })
                openModal()
              }}
              className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-4 rounded-xl transition-all duration-200 text-base mb-3 w-full sm:w-auto justify-center sm:justify-start"
              style={{ boxShadow: '0 0 24px rgba(37, 211, 102, 0.3)' }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
              </svg>
              Hablar por WhatsApp ahora
            </button>

            <p className="text-sm text-[#25D366] font-medium mb-8 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse inline-block" />
              Te respondemos en minutos
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {['Sin compromiso', 'Respuesta rápida', 'Propuesta a medida'].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 text-sm text-slate-300 bg-dark-card border border-slate-700 rounded-full px-4 py-2"
                >
                  <span className="text-success">✓</span>
                  {badge}
                </span>
              ))}
            </div>

            {/* What happens next */}
            <div className="mt-10 card-dark rounded-2xl p-6">
              <h3 className="text-base font-bold text-white mb-4">¿Cómo funciona?</h3>
              <ol className="space-y-3">
                {[
                  'Escríbenos por WhatsApp o llena el formulario',
                  'Revisamos tu caso y te orientamos sin compromiso',
                  'Preparamos una propuesta a medida para tu negocio',
                  'Empezamos cuando estés listo',
                ].map((step, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-400">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full gradient-bg flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* RIGHT COLUMN - Form (secondary) */}
          <div>
            <p className="text-sm text-slate-500 mb-3 text-center sm:text-left">
              Si prefieres, también puedes dejar tus datos y te contactamos.
            </p>
            <div className="card-dark rounded-2xl p-6 sm:p-8 border border-slate-800/60">
              {submitted ? (
                /* Success state */
                <div className="text-center py-12">
                  <div className="text-6xl mb-6">✅</div>
                  <h3 className="text-2xl font-extrabold text-white mb-4">
                    ¡Listo! Te contactamos pronto.
                  </h3>
                  <p className="text-slate-400 mb-6">
                    Recibimos tu solicitud. Te enviamos una propuesta en menos
                    de 24 horas hábiles.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={openModal}
                      className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm"
                    >
                      💬 También puedes escribirnos por WhatsApp
                    </button>
                  </div>
                </div>
              ) : (
                /* Form */
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="text-base font-semibold text-slate-300 mb-6">
                    Déjanos tus datos y te cotizamos
                  </h3>

                  <div className="space-y-4">
                    {/* Nombre */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        Nombre <span className="text-brand-purple-light">*</span>
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                        className={inputClass}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        Email <span className="text-brand-purple-light">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                        className={inputClass}
                      />
                    </div>

                    {/* Rubro */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        Rubro <span className="text-brand-purple-light">*</span>
                      </label>
                      <input
                        type="text"
                        name="rubro"
                        value={formData.rubro}
                        onChange={handleChange}
                        required
                        placeholder="Ej: Clínica, inmobiliaria, abogados..."
                        className={inputClass}
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">
                        WhatsApp <span className="text-brand-purple-light">*</span>
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        required
                        placeholder="+56 9 XXXX XXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Error message */}
                  {error && (
                    <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
                      ⚠️ {error}
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    onClick={() => pushEvent({ event: 'cta_submit_click', location: 'form' })}
                    className={`w-full gradient-bg text-white font-bold py-4 px-8 rounded-xl text-base mt-6 transition-all duration-200 flex items-center justify-center gap-2 ${
                      loading
                        ? 'opacity-70 cursor-not-allowed'
                        : 'hover:opacity-90 hover:shadow-glow-purple'
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg
                          className="animate-spin w-5 h-5"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                          />
                        </svg>
                        Enviando...
                      </>
                    ) : (
                      'Quiero mi cotización →'
                    )}
                  </button>

                  {/* Note */}
                  <p className="text-xs text-slate-500 mt-4 text-center leading-relaxed">
                    Sin compromiso. Te respondemos en menos de 24 horas hábiles.
                  </p>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
