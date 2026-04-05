'use client'

import { useOpenWAModal } from '@/components/WAModalProvider'

export default function AboutUs() {
  const openModal = useOpenWAModal()
  return (
    <section id="quienes-somos" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-dark rounded-3xl p-8 sm:p-12 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Photo + badge */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              {/* Avatar — TODO: reemplazar con foto real */}
              <div className="relative">
                <img
                  src="/vicente.png"
                  alt="Vicente Torres G."
                  className="w-36 h-36 rounded-2xl object-cover object-top"
                />
                {/* Verified badge */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-glow-purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>

              {/* Name + title */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-extrabold text-white mb-1">Vicente Torres G.</h3>
                <p className="text-brand-purple-light text-sm font-semibold mb-1">CEO @ Proppi · Fundador ClickBase</p>
                <p className="text-slate-500 text-xs">Ing. Civil Industrial · PUC Chile</p>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">+3.000</p>
                  <p className="text-xs text-slate-500">contactos LinkedIn</p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">+100</p>
                  <p className="text-xs text-slate-500">clientes</p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">3</p>
                  <p className="text-xs text-slate-500">startups</p>
                </div>
              </div>
            </div>

            {/* RIGHT — Bio + CTA */}
            <div>
              <span className="section-label">Quién está detrás</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-5 leading-tight">
                No es una agencia anónima.<br />
                <span className="gradient-text">Hay una persona real detrás.</span>
              </h2>

              <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  Soy Ingeniero Civil Industrial de la PUC, CEO de Proppi y fundador de múltiples
                  startups. A lo largo de estos años me especialicé en Paid Media porque vi de cerca
                  cómo negocios con buen producto pierden plata en publicidad por no tener la base
                  técnica correcta.
                </p>
                <p>
                  Configurar bien Google Ads, Meta Pixel y GTM no es magia — pero sí requiere
                  criterio y experiencia. ClickBase existe para que no tengas que aprenderlo tú:
                  yo lo instalo, lo dejo funcionando y te entrego todo listo para captar leads.
                </p>
                <p className="text-white font-semibold">
                  Cada proyecto pasa por mis manos antes de entregarse.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={openModal}
                  className="inline-flex items-center justify-center gap-2 gradient-bg text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-all duration-200 hover:shadow-glow-purple text-sm"
                >
                  💬 Hablar directamente conmigo
                </button>
                <a
                  href="https://www.linkedin.com/in/vicente-t-568362118/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 hover:text-white hover:border-[#0A66C2] font-semibold px-6 py-3.5 rounded-xl transition-all duration-200 text-sm"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  LinkedIn
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
