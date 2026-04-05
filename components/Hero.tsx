'use client'

import { useOpenWAModal } from '@/components/WAModalProvider'

export default function Hero() {
  const openModal = useOpenWAModal()
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background glow blobs */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #A855F7 0%, transparent 70%)' }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT COLUMN */}
          <div className="animate-fade-up">
            {/* Badge pill */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/40 bg-brand-purple/10 text-sm font-medium text-brand-purple-light mb-8 glow-purple">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" />
              <span>Para dueños de PYME que quieren crecer de verdad</span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              ¿Tu negocio lleva meses estancado sin saber cómo atraer más clientes?{' '}
              <span className="gradient-text">
                Te armamos el sistema completo para que lleguen solos.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-400 mb-6 leading-relaxed max-w-xl">
              Página web profesional + anuncios en Google e Instagram + tracking real.
              Sin tecnicismos, sin excusas — solo más clientes entrando por la puerta.
            </p>

            {/* CTAs */}
            <div className="flex flex-col gap-3 mb-8">
              <button
                onClick={openModal}
                className="flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 w-full sm:w-fit"
                style={{ boxShadow: '0 0 28px rgba(37, 211, 102, 0.4)' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
                </svg>
                Cotizar por WhatsApp — respuesta en minutos
              </button>
              {/* GTM note: add dataLayer.push({ event: 'cta_click', cta_location: 'hero' }) via GTM trigger on this element */}
              <p className="text-xs text-slate-500">
                ¿Prefieres dejar tus datos?{' '}
                <a href="#contacto" className="text-slate-400 underline underline-offset-2 hover:text-white transition-colors">
                  Llena el formulario y te cotizamos →
                </a>
              </p>
            </div>

            {/* Scarcity */}
            <div className="flex items-center gap-1.5 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block flex-shrink-0" />
              <span className="text-xs text-amber-400 font-medium">Solo 10 cupos disponibles por mes <span className="font-normal opacity-80">(para garantizar un trabajo personalizado para tu negocio)</span></span>
            </div>

            {/* Price pills */}
            <div className="flex flex-col gap-2">
              {/* Setup pill con MP */}
              <div className="inline-flex flex-col gap-1.5 px-4 py-3 rounded-2xl bg-dark-card border border-slate-700 w-fit">
                <div className="flex items-center gap-2 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-success inline-block flex-shrink-0" />
                  Setup:
                  <span className="line-through text-slate-400 font-medium">$999.990 + IVA</span>
                  <span className="font-bold text-white text-base">$699.990 + IVA</span>
                  <span className="text-xs font-bold text-success bg-success/10 border border-success/20 rounded-full px-1.5 py-0.5">−30%</span>
                </div>
                <div className="flex items-center gap-2 pl-4">
                  <img src="/mercadopago.svg" alt="Mercado Pago" className="h-5 w-auto flex-shrink-0" />
                  <span className="text-xs text-slate-300">
                    o en <span className="text-white font-semibold">3 cuotas sin interés</span> de <span className="text-white font-bold">$233.330 + IVA</span>
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-card border border-slate-700 text-sm text-slate-300 w-fit">
                <span className="w-2 h-2 rounded-full bg-brand-cyan inline-block" />
                Mantención desde: $49.990/mes + IVA
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN - CSS Dashboard Widget */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="animate-float w-full max-w-sm">
              {/* Main widget card */}
              <div className="card-dark rounded-2xl p-6 shadow-glow-brand">
                {/* Widget header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <div className="w-3 h-3 rounded-full bg-success" />
                      <div className="absolute inset-0 w-3 h-3 rounded-full bg-success pulse-dot" />
                    </div>
                    <span className="text-sm font-semibold text-white">Sistema activo</span>
                  </div>
                  <span className="text-xs text-slate-500">En vivo</span>
                </div>

                {/* Metric cards */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-dark rounded-xl p-4 border border-slate-800">
                    <p className="text-xs text-slate-500 mb-1">Leads este mes</p>
                    <p className="text-2xl font-bold text-white">47</p>
                    <p className="text-xs text-success font-medium mt-1">↑ +23%</p>
                  </div>
                  <div className="bg-dark rounded-xl p-4 border border-slate-800">
                    <p className="text-xs text-slate-500 mb-1">Costo por lead</p>
                    <p className="text-2xl font-bold text-white">$2.1k</p>
                    <p className="text-xs text-success font-medium mt-1">↓ -12%</p>
                  </div>
                </div>

                {/* Mini bar chart */}
                <div className="mb-6">
                  <p className="text-xs text-slate-500 mb-3">Leads por día (últimos 12 días)</p>
                  <div className="flex items-end justify-between gap-1 h-16">
                    {[30, 55, 40, 70, 45, 80, 60, 90, 55, 75, 85, 95].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 rounded-sm"
                        style={{
                          height: `${height}%`,
                          background: `linear-gradient(to top, #7C3AED, #06B6D4)`,
                          opacity: i < 11 ? 0.6 + (i / 11) * 0.4 : 1,
                          animationDelay: `${i * 50}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Tracking status */}
                <div className="space-y-2.5">
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-3">
                    Estado del tracking
                  </p>
                  {[
                    { name: 'Google Tag Manager', color: '#F59E0B' },
                    { name: 'Meta Pixel', color: '#3B82F6' },
                    { name: 'Conversiones', color: '#10B981' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <span className="text-xs text-slate-400">{item.name}</span>
                      <span className="flex items-center gap-1.5 text-xs font-medium" style={{ color: item.color }}>
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: item.color }}
                        />
                        Activo
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating accent badges */}
              <div className="absolute -top-4 -right-4 bg-success/10 border border-success/30 rounded-xl px-3 py-2 text-xs font-semibold text-success shadow-lg">
                +47 leads 🎯
              </div>
              <div className="absolute -bottom-4 -left-4 bg-brand-purple/10 border border-brand-purple/30 rounded-xl px-3 py-2 text-xs font-semibold text-brand-purple-light shadow-lg">
                ROI 3.2x 📈
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
