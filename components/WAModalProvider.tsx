'use client'

import { createContext, useContext, useState } from 'react'
import { fbq } from '@/lib/fbq'

const WA_LINK = 'https://wa.me/56955350255?text=Hola%2C%20quiero%20cotizar%20la%20p%C3%A1gina%20web%20%2B%20campa%C3%B1a%20%2B%20tracking.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F'

const WAModalContext = createContext<() => void>(() => {})

export function useOpenWAModal() {
  return useContext(WAModalContext)
}

function WAModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f1a] border border-brand-purple/30 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <p className="text-white font-extrabold text-xl leading-snug mb-5">
          ¿Listo para aumentar tus clientes?
        </p>
        <img
          src="/vicente.png"
          alt="Vicente Torres G."
          className="w-20 h-20 rounded-2xl object-cover object-top mx-auto mb-3"
        />
        <h3 className="text-white font-extrabold text-base">Vicente Torres G.</h3>
        <p className="text-slate-400 text-xs mb-5">CEO de Proppi</p>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Escríbeme directo — te respondo en minutos y vemos si podemos ayudarte.
        </p>
        <button
          onClick={onConfirm}
          className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-extrabold text-base px-6 py-4 rounded-2xl transition-colors duration-200"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
          </svg>
          Ir a WhatsApp
        </button>
        <button
          onClick={onClose}
          className="mt-3 text-xs text-slate-600 hover:text-slate-400 transition-colors duration-200"
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export function WAModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)

  function openModal() { setOpen(true) }
  function closeModal() { setOpen(false) }

  function handleConfirm() {
    if (!sessionStorage.getItem('wa_lead_fired')) {
      fbq('track', 'Lead')
      sessionStorage.setItem('wa_lead_fired', '1')
    }
    const trackPayload = {
      source: window.location.pathname || '/',
      referrer: document.referrer || null,
      user_agent: navigator.userAgent || null,
    }
    fetch('/api/track-click', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(trackPayload),
    }).catch(() => {})
    fetch('/api/track-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'wa_click', ...trackPayload }),
    }).catch(() => {})
    window.open(WA_LINK, '_blank')
    closeModal()
  }

  return (
    <WAModalContext.Provider value={openModal}>
      {children}
      {open && <WAModal onClose={closeModal} onConfirm={handleConfirm} />}
    </WAModalContext.Provider>
  )
}
