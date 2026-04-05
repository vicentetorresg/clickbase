'use client'

import { useOpenWAModal } from '@/components/WAModalProvider'

type PlanFeature = {
  text: string
  included: boolean
}

type Plan = {
  badge: string
  badgeType: 'one-time' | 'monthly'
  name: string
  price: string
  originalPrice?: string
  discountPct?: number
  cupos?: number
  priceSuffix: string
  subtitle: string
  disclaimer?: string
  features: PlanFeature[]
  cta: string
  ctaHref: string
  ctaExternal?: boolean
  highlighted: boolean
  popularLabel?: string
  note?: string
}

const plans: Plan[] = [
  {
    badge: 'Pago único',
    badgeType: 'one-time',
    name: 'Setup Inicial',
    price: '$799.990',
    originalPrice: '$999.990',
    discountPct: 20,
    cupos: 10,
    priceSuffix: '+ IVA',
    subtitle: 'Todo listo para empezar',
    features: [
      { text: 'Diseño y desarrollo de landing', included: true },
      { text: 'Formulario de contacto conectado', included: true },
      { text: 'Botón a WhatsApp con tracking', included: true },
      { text: 'Google Tag Manager instalado', included: true },
      { text: 'Meta Pixel configurado', included: true },
      { text: 'Conversiones configuradas', included: true },
      { text: 'Setup de primera campaña (Google o Meta)', included: true },
      { text: 'Versión responsive', included: true },
    ],
    cta: 'Quiero el setup completo',
    ctaHref: 'https://wa.me/56955350255?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n',
    ctaExternal: true,
    highlighted: false,
  },
  {
    badge: 'Mensual',
    badgeType: 'monthly',
    name: 'Mantención Base',
    price: 'Desde $49.990',
    priceSuffix: '+ IVA / mes',
    subtitle: 'Para mantener tu sistema operando',
    disclaimer: 'Requiere haber completado el setup inicial',
    popularLabel: 'Más popular',
    features: [
      { text: 'Soporte por WhatsApp con respuesta durante el día', included: true },
      { text: 'Ajustes menores de contenido', included: true },
      { text: 'Monitoreo básico del sistema', included: true },
      { text: 'Apoyo general ante consultas', included: true },
      { text: 'Reuniones incluidas', included: false },
      { text: 'Optimización activa de campañas', included: false },
      { text: 'Desarrollos nuevos', included: false },
    ],
    cta: 'Cotizar mantención',
    ctaHref: 'https://wa.me/56955350255?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n',
    ctaExternal: true,
    highlighted: true,
    note: 'Si necesitas reuniones o una gestión más activa, el valor mensual aumenta.',
  },
  {
    badge: 'Mensual',
    badgeType: 'monthly',
    name: 'Gestión Activa',
    price: 'Desde $149.990',
    priceSuffix: '+ IVA / mes',
    subtitle: 'Para crecer con acompañamiento',
    features: [
      { text: 'Todo lo del plan base', included: true },
      { text: 'Reuniones periódicas de seguimiento', included: true },
      { text: 'Soporte prioritario por WhatsApp', included: true },
      { text: 'Revisión y optimización de campañas', included: true },
      { text: 'Informe mensual de resultados', included: true },
      { text: 'Sugerencias proactivas de mejora', included: true },
    ],
    cta: 'Quiero gestión activa',
    ctaHref: 'https://wa.me/56955350255?text=Hola%2C%20quiero%20m%C3%A1s%20informaci%C3%B3n',
    ctaExternal: true,
    highlighted: false,
  },
]

export default function Pricing() {
  const openModal = useOpenWAModal()

  return (
    <section id="precios" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/5 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="section-label">Planes y precios</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4">
            Transparencia total.{' '}
            <span className="gradient-text">Sin letras chicas.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Empieza con el setup. El mantenimiento es opcional y puedes agregarlo cuando quieras.
          </p>
        </div>

        {/* PASO 1 — Setup */}
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-4 py-1.5">
              <span className="w-5 h-5 rounded-full bg-success flex items-center justify-center text-dark text-xs font-extrabold flex-shrink-0">1</span>
              <span className="text-sm font-bold text-success">Paso 1 — Requerido para empezar</span>
            </div>
          </div>
          {(() => {
            const plan = plans[0]
            return (
              <div className="pricing-highlight shadow-glow-brand rounded-2xl p-6 lg:p-8">
                <div className="grid lg:grid-cols-2 gap-8 items-start">
                  {/* Left: price */}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-success/10 text-success border border-success/30">
                        {plan.badge}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-white mb-3">{plan.name}</h3>
                    <p className="text-slate-400 text-sm mb-4">{plan.subtitle}</p>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-base text-slate-400 line-through">{plan.originalPrice} + IVA</span>
                      <span className="text-xs font-bold text-success bg-success/10 border border-success/25 rounded-full px-2 py-0.5">−{plan.discountPct}%</span>
                    </div>
                    <p className="text-5xl font-extrabold gradient-text leading-none mb-1">{plan.price}</p>
                    <p className="text-slate-400 text-base mb-3">{plan.priceSuffix}</p>
                    <p className="text-white font-semibold text-sm mb-4">Un solo pago, todo instalado. Sin sorpresas.</p>
                    <div className="flex items-center gap-3 mb-5 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl px-4 py-3">
                      <img src="/mercadopago.svg" alt="Mercado Pago" className="h-10 w-auto flex-shrink-0" />
                      <div>
                        <p className="text-sm text-white/60 mb-0.5">o en 12 cuotas sin interés de</p>
                        <p className="text-xl font-extrabold text-[#25D366] leading-tight">$66.666 <span className="text-sm font-normal text-white/70">+ IVA / cuota</span></p>
                      </div>
                    </div>
                    {plan.cupos && (
                      <div className="flex items-center gap-1.5 mb-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block flex-shrink-0" />
                        <span className="text-xs text-amber-400 font-medium">Solo {plan.cupos} cupos disponibles este mes</span>
                      </div>
                    )}
                    <button
                      onClick={openModal}
                      className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold py-4 px-6 rounded-xl text-base transition-all duration-200 active:scale-95"
                      style={{ boxShadow: '0 0 24px rgba(37,211,102,0.35)' }}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
                      </svg>
                      {plan.cta}
                    </button>
                  </div>
                  {/* Right: features */}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Qué incluye</p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm">
                          <span className="flex-shrink-0 mt-0.5 text-success">✅</span>
                          <span className="text-slate-300">{feature.text}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )
          })()}
        </div>

        {/* Connector */}
        <div className="flex items-center gap-4 my-8 max-w-2xl mx-auto">
          <div className="flex-1 h-px bg-slate-800" />
          <div className="flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/30 rounded-full px-4 py-1.5">
            <span className="w-5 h-5 rounded-full bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan text-xs font-extrabold flex-shrink-0">2</span>
            <span className="text-sm font-bold text-brand-cyan">Paso 2 — Mantenimiento (opcional)</span>
          </div>
          <div className="flex-1 h-px bg-slate-800" />
        </div>
        <p className="text-center text-sm text-slate-500 mb-8 -mt-4">Requiere haber completado el Setup Inicial. Cancela cuando quieras.</p>

        {/* PASO 2 — Monthly plans */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {plans.slice(1).map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'pricing-highlight shadow-glow-purple'
                  : 'card-dark card-dark-hover'
              }`}
            >
              {plan.popularLabel && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ {plan.popularLabel}
                  </span>
                </div>
              )}
              <div className="mb-3">
                <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30">
                  {plan.badge}
                </span>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-sm text-slate-400 mb-4">{plan.subtitle}</p>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-3xl lg:text-4xl font-extrabold text-white">{plan.price}</span>
                <span className="text-slate-400 text-sm">{plan.priceSuffix}</span>
              </div>
              <div className="h-px bg-brand-purple/20 mb-4" />
              <ul className="space-y-3 mb-4">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span className={`flex-shrink-0 mt-0.5 ${feature.included ? 'text-success' : 'text-slate-600'}`}>
                      {feature.included ? '✅' : '❌'}
                    </span>
                    <span className={feature.included ? 'text-slate-300' : 'text-slate-600'}>{feature.text}</span>
                  </li>
                ))}
              </ul>
              {plan.note && <p className="text-xs text-slate-500 italic mb-4">{plan.note}</p>}
              <button
                onClick={openModal}
                className={`flex items-center justify-center gap-2 w-full font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 ${
                  plan.highlighted
                    ? 'gradient-bg text-white hover:opacity-90 hover:shadow-glow-purple'
                    : 'border border-brand-purple/40 text-brand-purple-light hover:border-brand-purple hover:bg-brand-purple/10'
                }`}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0 opacity-80">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
                </svg>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>

        {/* No somos masivos */}
        <div className="mt-10 max-w-2xl mx-auto">
          <div className="flex items-start gap-4 bg-brand-purple/10 border border-brand-purple/30 rounded-xl px-5 py-5">
            <span className="text-2xl flex-shrink-0 mt-0.5">🎯</span>
            <div>
              <p className="text-sm font-semibold text-white mb-1">No somos una agencia masiva</p>
              <p className="text-sm text-slate-400 leading-relaxed">
                Trabajamos con pocos clientes a la vez para que cada proyecto tenga atención directa, sin intermediarios.
                Nosotros mismos ejecutamos tu web y tu campaña, por eso limitamos a 10 proyectos por mes.
              </p>
            </div>
          </div>
        </div>

        {/* Additional note */}
        <div className="mt-4 max-w-2xl mx-auto">
          <div className="flex items-start gap-3 bg-dark-card border border-yellow-500/20 rounded-xl px-5 py-4">
            <span className="text-xl flex-shrink-0 mt-0.5">⚠️</span>
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-300">Desarrollos adicionales:</span>{' '}
              Integraciones especiales y nuevas funcionalidades se cotizan por separado
              según el alcance del proyecto. Conversemos y te armo una propuesta a medida.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
