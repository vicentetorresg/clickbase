'use client'

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
  highlighted: boolean
  popularLabel?: string
  note?: string
}

const plans: Plan[] = [
  {
    badge: 'Pago único',
    badgeType: 'one-time',
    name: 'Setup Inicial',
    price: '$699.990',
    originalPrice: '$999.990',
    discountPct: 30,
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
    ctaHref: '#contacto',
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
      { text: 'Soporte no prioritario por WhatsApp', included: true },
      { text: 'Ajustes menores de contenido', included: true },
      { text: 'Monitoreo básico del sistema', included: true },
      { text: 'Apoyo general ante consultas', included: true },
      { text: 'Reuniones incluidas', included: false },
      { text: 'Optimización activa de campañas', included: false },
      { text: 'Desarrollos nuevos', included: false },
    ],
    cta: 'Cotizar mantención',
    ctaHref: '#contacto',
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
    ctaHref: '#contacto',
    highlighted: false,
  },
]

export default function Pricing() {
  return (
    <section id="precios" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/5 to-transparent pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Planes y precios</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6">
            Transparencia total.{' '}
            <span className="gradient-text">Sin letras chicas.</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Elige cómo quieres trabajar. Sin contratos forzosos ni cobros escondidos.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 lg:p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'pricing-highlight shadow-glow-purple lg:scale-105 lg:-my-4'
                  : 'card-dark card-dark-hover'
              }`}
            >
              {/* Popular label */}
              {plan.popularLabel && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="gradient-bg text-white text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap">
                    ⭐ {plan.popularLabel}
                  </span>
                </div>
              )}

              {/* Badge */}
              <div className="mb-4">
                <span
                  className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                    plan.badgeType === 'one-time'
                      ? 'bg-success/10 text-success border border-success/30'
                      : 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/30'
                  }`}
                >
                  {plan.badge}
                </span>
              </div>

              {/* Plan name */}
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

              {/* Disclaimer */}
              {plan.disclaimer && (
                <div className="mb-4 p-3 bg-dark/60 rounded-lg border border-slate-700">
                  <p className="text-xs text-slate-400 italic">{plan.disclaimer}</p>
                </div>
              )}

              {/* Price */}
              <div className="mb-2">
                {plan.originalPrice && (
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base text-slate-300 line-through">{plan.originalPrice}</span>
                    <span className="text-xs font-bold text-success bg-success/10 border border-success/25 rounded-full px-2 py-0.5">
                      −{plan.discountPct}%
                    </span>
                  </div>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl lg:text-4xl font-extrabold text-white">
                    {plan.price}
                  </span>
                  <span className="text-slate-400 text-sm">{plan.priceSuffix}</span>
                </div>
              </div>
              {plan.badgeType === 'one-time' && (
                <div className="flex items-center gap-3 mb-3 mt-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5">
                  <img src="/mercadopago.svg" alt="Mercado Pago" className="h-10 w-auto flex-shrink-0" />
                  <p className="text-xs text-white leading-tight">
                    Hasta <span className="font-semibold">3 cuotas sin interés</span>
                    <br />
                    <span className="text-white/70">de </span><span className="text-white font-bold">$233.330</span><span className="text-white/70"> / cuota</span>
                  </p>
                </div>
              )}
              <p className="text-sm text-slate-400 mb-4">{plan.subtitle}</p>
              {plan.cupos && (
                <div className="flex items-center gap-1.5 mb-6">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block flex-shrink-0" />
                  <span className="text-xs text-amber-400 font-medium">
                    Solo {plan.cupos} cupos disponibles este mes{' '}
                    <span className="font-normal opacity-80">(para garantizar un trabajo personalizado para tu negocio)</span>
                  </span>
                </div>
              )}

              {/* Divider */}
              <div className="h-px bg-brand-purple/20 mb-6" />

              {/* Features list */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm">
                    <span
                      className={`flex-shrink-0 mt-0.5 ${
                        feature.included ? 'text-success' : 'text-slate-600'
                      }`}
                    >
                      {feature.included ? '✅' : '❌'}
                    </span>
                    <span
                      className={feature.included ? 'text-slate-300' : 'text-slate-600'}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Note */}
              {plan.note && (
                <p className="text-xs text-slate-500 italic mb-4">{plan.note}</p>
              )}

              {/* CTA */}
              <a
                href={plan.ctaHref}
                onClick={() => {
                  // GTM: dataLayer.push({ event: 'pricing_cta_click', plan: plan.name })
                }}
                className={`block text-center font-bold py-3.5 px-6 rounded-xl text-sm transition-all duration-200 ${
                  plan.highlighted
                    ? 'gradient-bg text-white hover:opacity-90 hover:shadow-glow-purple'
                    : 'border border-brand-purple/40 text-brand-purple-light hover:border-brand-purple hover:bg-brand-purple/10'
                }`}
              >
                {plan.cta}
              </a>
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
