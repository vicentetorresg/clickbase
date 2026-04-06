'use client'

import { createContext, useContext, useState } from 'react'
import { fbq } from '@/lib/fbq'

const WAModalContext = createContext<(title?: string) => void>(() => {})

const WAIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.849L.057 23.5a.5.5 0 0 0 .61.61l5.651-1.471A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.907 0-3.698-.528-5.228-1.449l-.374-.224-3.879 1.009 1.009-3.879-.224-.374A9.953 9.953 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
)

export function useOpenWAModal() {
  return useContext(WAModalContext)
}

const Spinner = () => (
  <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeOpacity="0.3"/>
    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="3" strokeLinecap="round"/>
  </svg>
)

function LeadModal({ title, onClose, onAbandon }: { title: string; onClose: () => void; onAbandon: () => void }) {
  const [step, setStep] = useState<0 | 1>(0)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleClose() {
    if (!sent) onAbandon()
    onClose()
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    const source = typeof window !== 'undefined' ? window.location.pathname : '/'
    try {
      let utms: Record<string, string> = {}
      try {
        const stored = sessionStorage.getItem('cb_utms')
        if (stored) utms = JSON.parse(stored)
      } catch {}

      const res = await fetch('/api/lead-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source, ...utms }),
      })
      if (!res.ok) throw new Error()
      fbq('track', 'Lead')
      setSent(true)
    } catch {
      setError('Hubo un error al enviar. Intenta de nuevo o escríbenos directo.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(4px)' }}
      onClick={handleClose}
    >
      <div
        className="relative bg-[#12122A] border border-[rgba(124,58,237,0.3)] rounded-2xl p-6 w-full max-w-sm"
        onClick={e => e.stopPropagation()}
      >
        {/* Header gradiente */}
        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl" style={{ background: 'linear-gradient(90deg, #7C3AED, #06B6D4, #25D366)' }} />

        <button onClick={handleClose} className="absolute top-4 right-4 text-slate-500 hover:text-white text-lg leading-none z-10">✕</button>

        {sent ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'linear-gradient(135deg, #1DA851, #25D366)', boxShadow: '0 0 32px rgba(37,211,102,0.5)' }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <h3 className="text-white font-bold text-xl mb-2">¡Listo, {name.split(' ')[0]}!</h3>
            <p className="text-slate-300 text-sm mb-1">Te escribimos por WhatsApp <strong className="text-white">hoy mismo</strong>.</p>
            <p className="text-slate-500 text-xs mt-2">Revisa tu WhatsApp en los próximos minutos.</p>
          </div>
        ) : step === 0 ? (
          /* Paso 1: qué es ClickBase */
          <div className="pt-3">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-lg">⚡</span>
              <span className="text-xs font-bold text-[#A855F7] uppercase tracking-widest">¿Qué es ClickBase?</span>
            </div>
            <h3 className="text-white font-bold text-xl mb-1 text-center leading-snug">
              Web + campaña + tracking.<br />
              <span style={{ background: 'linear-gradient(135deg,#7C3AED,#06B6D4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Clientes desde el día 1.
              </span>
            </h3>
            <p className="text-slate-400 text-sm mb-4 text-center">Todo lo que necesita tu negocio para conseguir clientes online, sin depender de terceros.</p>

            <ul className="flex flex-col gap-2 mb-4 bg-[#0e0e28] rounded-xl p-3">
              {[
                { icon: '🌐', text: 'Landing de alta conversión incluida' },
                { icon: '📣', text: 'Campaña en Google Ads o Meta Ads' },
                { icon: '📊', text: 'Pixel + GTM + tracking configurado' },
                { icon: '💬', text: 'Leads llegan directo a tu WhatsApp' },
              ].map(item => (
                <li key={item.text} className="flex items-center gap-2.5 text-sm text-slate-300">
                  <span className="text-base leading-none">{item.icon}</span>
                  <span>{item.text}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center gap-2 mt-2 bg-[#0e0e28] rounded-xl py-3 px-3">
              <img src="/mercadopago.svg" alt="MercadoPago" className="h-8 w-auto" />
              <span className="text-white text-sm font-bold text-center">Por solo 12 cuotas sin interés de $66.666 + IVA</span>
            </div>

            <button
              onClick={() => setStep(1)}
              className="btn-cta w-full inline-flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-white transition-all duration-200 mt-3"
              style={{ background: 'linear-gradient(135deg, #1DA851, #25D366)', boxShadow: '0 0 24px rgba(37,211,102,0.4)' }}
            >
              Me interesa, quiero cotizar →
            </button>
            <p className="text-center text-slate-600 text-xs mt-2">Sin compromiso · Cotización gratis</p>
          </div>
        ) : (
          /* Paso 2: formulario */
          <div className="pt-3">
            <button onClick={() => setStep(0)} className="flex items-center gap-1 text-slate-500 hover:text-slate-300 text-xs mb-3 transition-colors">
              ← Volver
            </button>
            <h3 className="text-white font-bold text-xl mb-1 text-center">Déjanos tus datos</h3>
            <p className="text-slate-400 text-sm mb-4 text-center">Te contactamos hoy por WhatsApp.</p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                required
                value={name}
                onChange={e => setName(e.target.value)}
                name="name"
                placeholder="Tu nombre"
                autoComplete="name"
                className="bg-[#1a1a3a] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[rgba(124,58,237,0.6)]"
                style={{ fontSize: '16px' }}
              />
              <input
                required
                value={phone}
                onChange={e => setPhone(e.target.value)}
                name="tel"
                placeholder="Ej: +56 9 1234 5678"
                type="tel"
                autoComplete="tel"
                className="bg-[#1a1a3a] border border-slate-700 rounded-xl px-4 py-3 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-[rgba(124,58,237,0.6)]"
                style={{ fontSize: '16px' }}
              />
              {error && <p className="text-red-400 text-xs -mt-1">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                className="btn-cta w-full inline-flex items-center justify-center gap-2 font-bold py-3.5 rounded-xl text-white transition-all duration-200 disabled:opacity-60 mt-1"
                style={{ background: 'linear-gradient(135deg, #1DA851, #25D366)', boxShadow: '0 0 24px rgba(37,211,102,0.4)' }}
              >
                {loading ? <><Spinner /> Enviando...</> : <><span>Quiero más clientes</span> <WAIcon /></>}
              </button>
              <p className="text-center text-slate-600 text-xs -mt-1">🔒 Sin compromisos · Respuesta hoy</p>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export function WAModalProvider({ children }: { children: React.ReactNode }) {
  const [showModal, setShowModal] = useState(false)
  const [modalTitle, setModalTitle] = useState('Quiero más clientes')
  const utmRef = useState<Record<string, string | null>>(() => ({}))[0]

  function openModal(t?: string) {
    const title = t || 'Quiero más clientes'
    setModalTitle(title)
    setShowModal(true)
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search)
      const payload = {
        title,
        source: window.location.pathname,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
        utm_source: params.get('utm_source'),
        utm_medium: params.get('utm_medium'),
        utm_campaign: params.get('utm_campaign'),
        utm_content: params.get('utm_content'),
      }
      Object.assign(utmRef, payload)
      fetch('/api/modal-open', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }).catch(() => {})
    }
  }

  function handleAbandon() {
    fetch('/api/modal-abandon', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(utmRef),
    }).catch(() => {})
  }

  return (
    <WAModalContext.Provider value={openModal}>
      {children}
      {showModal && (
        <LeadModal
          title={modalTitle}
          onClose={() => setShowModal(false)}
          onAbandon={handleAbandon}
        />
      )}
    </WAModalContext.Provider>
  )
}
