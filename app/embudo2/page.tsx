'use client'

import { useState } from 'react'

const WA_LINK = 'https://wa.me/56955350255?text=Hola%2C%20vi%20la%20p%C3%A1gina%20y%20quiero%20entender%20por%20qu%C3%A9%20mis%20ads%20no%20funcionan.%20%C2%BFPueden%20ayudarme%3F'

function CTAButton({ text = 'Diagnosticar mi campaña gratis', size = 'lg', full = false }: { text?: string; size?: 'lg' | 'xl'; full?: boolean }) {
  return (
    <a
      href={WA_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className={`
        gradient-bg text-white font-extrabold rounded-2xl inline-flex items-center justify-center gap-3
        hover:opacity-90 active:scale-95 transition-all duration-200 hover:shadow-glow-purple
        ${size === 'xl' ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-base'}
        ${full ? 'w-full' : ''}
      `}
    >
      <span>💬</span>
      {text}
      <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" className="flex-shrink-0">
        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </a>
  )
}

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
)

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
    <circle cx="10" cy="10" r="10" fill="rgba(124,58,237,0.15)" />
    <path d="M6 10l3 3 5-5" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0">
    <circle cx="10" cy="10" r="10" fill="rgba(239,68,68,0.15)" />
    <path d="M7 7l6 6M13 7l-6 6" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const testimonials = [
  {
    initials: 'AG', name: 'Andrea González', company: 'Centro Dental AG', industry: 'Odontología', color: '#8B5CF6', stars: 5,
    quote: 'Antes pagaba a una agencia que no me mostraba resultados. Con ClickBase sé en tiempo real cuántas personas hacen clic, cuántas llaman y cuánto me cuesta cada paciente nuevo.',
    result: 'Visibilidad total de resultados',
    before: 'Pagaba $120.000/mes sin saber si funcionaba',
  },
  {
    initials: 'VR', name: 'Valentina Riquelme', company: 'VR Propiedades', industry: 'Inmobiliaria', color: '#06B6D4', stars: 5,
    quote: 'Tenía Meta Pixel mal instalado y las conversiones no se registraban. Estaba optimizando campañas con datos incorrectos. Cuando lo arreglaron, el costo por lead cayó a la mitad en 2 semanas.',
    result: 'CPL -50% al corregir el tracking',
    before: 'Pixel mal instalado por 4 meses',
  },
  {
    initials: 'RM', name: 'Rodrigo Muñoz', company: 'Muñoz Constructora', industry: 'Construcción', color: '#EC4899', stars: 5,
    quote: 'Había probado Google Ads solo y gasté $300.000 en un mes sin ningún resultado. El problema no era Google, era que mi página no convertía y no tenía tracking. Con el setup correcto, la semana 1 tuve 2 llamadas.',
    result: '2 llamadas en la semana 1',
    before: '$300.000 gastados sin 1 lead',
  },
  {
    initials: 'MF', name: 'Dr. Marcelo Fuentes', company: 'Centro Médico Providencia', industry: 'Clínica', color: '#7C3AED', stars: 5,
    quote: 'Antes dependíamos del boca a boca. Hoy recibimos entre 4 y 6 consultas nuevas por semana desde Google. El tracking nos permite saber exactamente qué anuncio las genera.',
    result: '+5 consultas/semana',
    before: 'Solo boca a boca, sin leads digitales',
  },
  {
    initials: 'CP', name: 'Catalina Pérez', company: 'Estudio CP Arquitectura', industry: 'Arquitectura', color: '#F59E0B', stars: 5,
    quote: 'Tenía miedo de "tirar plata" en publicidad sin resultados. Con el tracking instalado vi exactamente qué funcionaba y qué no. Optimizamos la campaña la semana 2 y los leads bajaron de precio a la mitad.',
    result: 'CPL -52% en 2 semanas',
    before: 'Miedo de invertir sin saber el retorno',
  },
  {
    initials: 'JS', name: 'Jorge Salas', company: 'Salas & Asociados', industry: 'Estudio Jurídico', color: '#10B981', stars: 5,
    quote: 'El setup estuvo listo en una semana. Yo solo entregué la información de mi negocio y ellos construyeron todo. La primera semana de campaña ya teníamos 3 consultas.',
    result: '3 consultas en 1ª semana',
    before: 'Nunca había hecho publicidad digital',
  },
]

const faqs = [
  {
    q: '¿Por qué mis ads actuales no están funcionando?',
    a: 'Las causas más comunes son: tracking incorrecto (el pixel o las conversiones no están bien configuradas), landing page que no convierte (la página recibe tráfico pero no persuade al visitante), segmentación incorrecta del anuncio, o presupuesto insuficiente. Escríbenos y hacemos un diagnóstico rápido sin costo.',
  },
  {
    q: '¿Pueden revisar y corregir mis campañas existentes?',
    a: 'Sí. Si ya tienes campañas activas, podemos hacer una auditoría, identificar los problemas y corregirlos. El setup incluye la corrección del tracking, la reconstrucción de la landing si es necesario y la optimización de la campaña.',
  },
  {
    q: '¿Cuánto tiempo tarda en verse la mejora?',
    a: 'Con el tracking correcto instalado, verás datos reales desde el día 1. La optimización de la campaña basada en datos correctos generalmente muestra mejoras en los primeros 7 a 14 días de campaña corregida.',
  },
  {
    q: '¿Qué pasa con mis campañas actuales mientras hacen el setup?',
    a: 'No es necesario pausarlas. Hacemos el trabajo en paralelo y te avisamos antes de hacer cualquier cambio en tus campañas existentes. La transición es transparente.',
  },
  {
    q: '¿Por qué confiar en ustedes si ya pagué a alguien y no funcionó?',
    a: 'Entendemos la desconfianza. Por eso trabajamos con transparencia total: instalamos el tracking desde el día 1 para que tú mismo veas los datos en tiempo real. No tienes que creer en nuestra palabra, los números hablan solos.',
  },
  {
    q: '¿Tienen garantía?',
    a: 'Si al día 7 el setup no está completo y funcionando, seguimos trabajando sin costo adicional hasta que esté. Tu tracking activo, tu campaña lista y tu página publicada. Sin excusas.',
  },
]

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-slate-800 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors duration-200"
      >
        <span className="text-white font-semibold text-sm sm:text-base pr-4">{q}</span>
        <span className={`flex-shrink-0 w-6 h-6 rounded-full border border-brand-purple/40 flex items-center justify-center transition-transform duration-300 ${open ? 'rotate-45' : ''}`}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M6 2v8M2 6h8" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      {open && (
        <div className="px-6 pb-5 text-slate-400 text-sm leading-relaxed border-t border-slate-800 pt-4">
          {a}
        </div>
      )}
    </div>
  )
}

export default function Embudo2() {
  return (
    <div className="min-h-screen bg-dark text-white">

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-brand-purple/20 bg-dark/90 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-lg font-extrabold gradient-text">ClickBase</span>
          </a>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-bold text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/10 transition-colors duration-200 px-4 py-2 rounded-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
            </svg>
            <span className="hidden sm:inline">+56 9 9436 6697</span>
            <span className="sm:hidden">WhatsApp</span>
          </a>
        </div>
      </header>

      {/* ── URGENCY BAR ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-brand-purple/80 to-brand-cyan/60 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold">
        🔥 Auditoría de campaña <strong>gratuita</strong> — Diagnóstico sin costo para los negocios que escriban hoy
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-red-500/30 bg-red-500/10 text-sm font-medium text-red-400 mb-8">
            <span>🚨</span>
            El problema no son tus ads. Es lo que hay debajo.
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            ¿Pagaste publicidad{' '}
            <span className="text-red-400">y no llegaron clientes?</span>
            <br />
            <span className="gradient-text">El problema no son los ads.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            El 80% de los negocios que fracasan con Google Ads o Meta Ads tienen el mismo problema:
            tracking roto, landing que no convierte, o ambos. Te arreglamos la base y relanzamos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <CTAButton text="Diagnosticar mi campaña gratis" size="xl" />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            {['✅ Diagnóstico sin costo', '✅ Tracking correcto desde día 1', '✅ Setup en 7 días', '✅ Sin permanencia'].map((pill) => (
              <span key={pill} className="px-3 py-1.5 bg-dark-card border border-slate-700 rounded-full text-slate-300">{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── BEFORE / AFTER STATS ────────────────────────────── */}
      <section className="py-12 border-y border-brand-purple/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '80%', label: 'de negocios con tracking mal instalado' },
              { number: '-50%', label: 'Caída en CPL al corregir el setup' },
              { number: '7', label: 'Días para relanzar correctamente' },
              { number: '100%', label: 'Visibilidad de resultados desde día 1' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">{stat.number}</p>
                <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM DIAGNOSIS ───────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Diagnóstico</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight">
              ¿Por qué tus ads{' '}
              <span className="gradient-text">no están funcionando?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {[
              { icon: '🔌', title: 'Tracking roto o mal instalado', desc: 'Tu Meta Pixel o Google Tag no registra conversiones correctamente. Estás optimizando con datos falsos. Las plataformas aprenden del tracking incorrecto y cada día empeoran.' },
              { icon: '🌐', title: 'Landing page que no convierte', desc: 'Tu página recibe el tráfico del anuncio pero no está diseñada para convertir. Los visitantes llegan, no entienden la oferta y se van. El problema no está en el anuncio.' },
              { icon: '🎯', title: 'Público mal segmentado', desc: 'Estás mostrando el anuncio a personas que no son tu cliente ideal. Gastas presupuesto en clics irrelevantes que nunca van a convertir.' },
              { icon: '📉', title: 'Sin datos para optimizar', desc: 'Sin tracking correcto, no puedes mejorar. No sabes qué anuncio trae clientes, qué horario funciona mejor, ni qué dispositivo convierte más.' },
            ].map((item) => (
              <div key={item.title} className="card-dark rounded-2xl p-6 flex gap-4 border-l-2 border-red-500/30">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl border border-red-500/20 bg-red-500/5 text-center">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              <strong className="text-white">La buena noticia:</strong> todos estos problemas tienen solución.
              Y con el setup correcto, los resultados se ven en días, no en meses.
            </p>
          </div>
        </div>
      </section>

      {/* ── COMPARISON TABLE ────────────────────────────────── */}
      <section className="py-16 bg-dark-card/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Sin setup correcto <span className="text-red-400">vs.</span> Con ClickBase
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {/* Sin setup */}
            <div className="rounded-2xl p-6 border border-red-500/20 bg-red-500/5">
              <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2"><span>✗</span> Sin setup correcto</h3>
              <ul className="space-y-3">
                {[
                  'Tracking roto, datos incorrectos',
                  'No sabes qué anuncio convierte',
                  'Landing genérica sin estructura',
                  'Presupuesto quemado sin retorno',
                  'Optimización a ciegas',
                  'Dependencia de intuición, no datos',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                    <XIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Con ClickBase */}
            <div className="rounded-2xl p-6 border border-brand-purple/30 bg-brand-purple/5">
              <h3 className="text-success font-bold mb-4 flex items-center gap-2"><span>✓</span> Con ClickBase</h3>
              <ul className="space-y-3">
                {[
                  'Tracking 100% verificado desde día 1',
                  'Sabes exactamente qué genera leads',
                  'Landing optimizada para convertir',
                  'Cada peso invertido es medible',
                  'Optimización basada en datos reales',
                  'Visibilidad total de tu campaña',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckIcon />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mt-8">
            <CTAButton text="Quiero la versión correcta" size="xl" />
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS 1 ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Resultados reales</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-2 leading-tight">
              Negocios que ya{' '}
              <span className="gradient-text">arreglaron su base</span>
            </h2>
            <p className="text-slate-500 text-sm">Testimonios de clientes reales · Resultados pueden variar según industria y presupuesto</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
              <div key={i} className="card-dark rounded-2xl p-7 flex flex-col gap-5 card-dark-hover transition-all duration-300">
                <div className="text-xs px-3 py-1.5 rounded-full w-fit border border-red-500/20 bg-red-500/5 text-red-400 font-medium">
                  Antes: {t.before}
                </div>
                <div className="flex gap-1">{Array.from({ length: t.stars }).map((_, s) => <StarIcon key={s} />)}</div>
                <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</blockquote>
                <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full w-fit" style={{ background: `${t.color}18`, border: `1px solid ${t.color}40`, color: t.color }}>
                  📈 {t.result}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: `linear-gradient(135deg, ${t.color}, #06B6D4)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.company} · {t.industry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-card/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Todo incluido</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              El <span className="gradient-text">setup correcto</span> incluye todo esto
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              'Landing page optimizada para conversión (nueva o reconstruida)',
              'Auditoría y corrección del tracking existente',
              'Google Tag Manager correctamente configurado',
              'Meta Pixel instalado y verificado',
              'Conversiones configuradas en Google Ads',
              'Conversiones configuradas en Meta Ads',
              'Primera campaña (o corrección de la existente)',
              'Dashboard de resultados en tiempo real',
              'Entrega con documentación del tracking',
              'Soporte post-entrega 30 días por WhatsApp',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-dark-card/60 rounded-xl border border-slate-800">
                <CheckIcon />
                <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 border border-brand-purple/30">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
              <span className="text-2xl font-extrabold text-white">Setup completo:</span>
              <span className="text-xl text-slate-300 line-through font-medium">$999.990 + IVA</span>
              <span className="text-2xl font-extrabold gradient-text">$699.990 + IVA</span>
              <span className="text-xs font-bold text-success bg-success/10 border border-success/25 rounded-full px-2 py-0.5">−30%</span>
            </div>
            <p className="text-slate-400 text-sm">Pago único. Resultado garantizado en 7 días.</p>
          </div>
        </div>
      </section>

      {/* ── QUIÉN ESTÁ DETRÁS ───────────────────────────────── */}
      <section className="py-16 lg:py-20 bg-dark-card/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="card-dark rounded-3xl p-8 sm:p-10 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="flex-shrink-0 flex flex-col items-center gap-3">
              <img
                src="/vicente.png"
                alt="Vicente Torres G."
                className="w-24 h-24 rounded-2xl object-cover object-top"
              />
              <a
                href="https://www.linkedin.com/in/vicente-t-568362118/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-[#0A66C2] px-3 py-1.5 rounded-lg transition-colors duration-200"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
            <div>
              <span className="section-label">Quién está detrás</span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-3 mb-3 leading-tight">
                No es una agencia anónima.{' '}
                <span className="gradient-text">Hay una persona real detrás.</span>
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                Soy <strong className="text-white">Vicente Torres G.</strong>, Ingeniero Civil Industrial de la PUC y CEO de Proppi.
                Vi de cerca cómo negocios con buen producto queman plata en publicidad por no tener el tracking correcto.
                Ese problema tiene solución y es lo que hacemos.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                A diferencia de una agencia donde tu proyecto lo ve un junior,{' '}
                <strong className="text-white">cada setup pasa por mis manos antes de entregarse.</strong>{' '}
                Eso incluye revisar que el tracking esté 100% correcto.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 text-sm"
              >
                💬 Hablar directamente conmigo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA INTERMEDIA ──────────────────────────────────── */}
      <div className="py-10 text-center px-4">
        <p className="text-slate-400 text-sm mb-4">Escríbenos y revisamos tu campaña actual sin costo</p>
        <CTAButton text="Quiero que revisen mi campaña" size="xl" />
      </div>

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-card/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Proceso</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              De campaña rota a{' '}
              <span className="gradient-text">sistema funcionando</span>
              {' '}en 7 días
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '01', icon: '🔍', title: 'Diagnóstico', desc: 'Revisamos tu tracking, landing y campaña actual. Te decimos exactamente qué está fallando.' },
              { step: '02', icon: '📋', title: 'Plan de corrección', desc: 'Definimos qué necesita ser reconstruido y qué solo necesita corrección. Sin sorpresas.' },
              { step: '03', icon: '⚙️', title: 'Construcción', desc: 'Nuestro equipo corrige o reconstruye todo: landing, tracking, conversiones y campaña.' },
              { step: '04', icon: '🚀', title: 'Relanzamiento', desc: 'Revisamos todo contigo y relanzamos. Desde ese momento, ves resultados reales.' },
            ].map((step) => (
              <div key={step.step} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 text-2xl mb-3 relative">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center">
                    {step.step}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <CTAButton text="Empezar con el diagnóstico" size="xl" />
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" id="precios">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Inversión</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              Menor que lo que ya{' '}
              <span className="gradient-text">estás perdiendo</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Cada mes con el tracking mal configurado es presupuesto publicitario quemado.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="pricing-highlight rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full gradient-bg text-white">Más popular</div>
              <p className="text-slate-400 text-sm mb-2">Setup + corrección</p>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-base text-slate-300 line-through font-medium">$999.990 + IVA</span>
                <span className="text-xs font-bold text-success bg-success/10 border border-success/25 rounded-full px-2 py-0.5">−30%</span>
              </div>
              <p className="text-4xl font-extrabold text-white mb-1">$699.990 <span className="text-xl font-normal text-slate-400">+ IVA</span></p>
              <p className="text-slate-500 text-xs mb-3">Pago único</p>
              <div className="flex items-center gap-1.5 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse inline-block flex-shrink-0" />
                <span className="text-xs text-amber-400 font-medium">Solo 10 cupos disponibles por mes <span className="font-normal opacity-80">(para garantizar un trabajo personalizado para tu negocio)</span></span>
              </div>
              <ul className="space-y-3 mb-8">
                {['Auditoría de tracking existente', 'Landing nueva o corregida', 'Google Tag Manager correcto', 'Meta Pixel verificado', 'Conversiones reconfiguradas', 'Campaña relanzada o corregida'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-success">✓</span> {item}
                  </li>
                ))}
              </ul>
              <CTAButton text="Corregir mi setup" full />
            </div>

            <div className="card-dark rounded-2xl p-8">
              <p className="text-slate-400 text-sm mb-2">Mantención mensual</p>
              <p className="text-4xl font-extrabold text-white mb-1">$49.990</p>
              <p className="text-slate-500 text-xs mb-6">+ IVA · Opcional · Sin permanencia</p>
              <ul className="space-y-3 mb-8">
                {['Monitoreo del tracking', 'Optimización mensual de campaña', 'Soporte WhatsApp prioritario', 'Ajustes menores a la landing', 'Reporte mensual de resultados', 'Sin contrato mínimo'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-brand-cyan">✓</span> {item}
                  </li>
                ))}
              </ul>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full border border-slate-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm hover:border-slate-400 hover:bg-white/5 transition-all duration-200 flex items-center justify-center"
              >
                Consultar mantención
              </a>
            </div>
          </div>

          {/* No somos masivos */}
          <div className="mt-6 max-w-2xl mx-auto">
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

          <p className="text-center text-slate-500 text-xs mt-4">
            * Valores no incluyen IVA. La inversión en publicidad (Google/Meta) se paga directamente a las plataformas.
          </p>
        </div>
      </section>

      {/* ── CTA INTERMEDIA 2 ────────────────────────────────── */}
      <div className="py-12 gradient-bg text-center px-4">
        <p className="text-white/80 text-sm mb-2">Diagnóstico gratuito — Sin compromiso</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">Escríbenos y te decimos qué está fallando</h3>
        <CTAButton text="Quiero el diagnóstico gratis" size="xl" />
      </div>

      {/* ── TESTIMONIALS 2 ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Más negocios que{' '}
              <span className="gradient-text">dan vuelta sus resultados</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(3, 6).map((t, i) => (
              <div key={i} className="card-dark rounded-2xl p-7 flex flex-col gap-5 card-dark-hover transition-all duration-300">
                <div className="flex gap-1">{Array.from({ length: t.stars }).map((_, s) => <StarIcon key={s} />)}</div>
                <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">"{t.quote}"</blockquote>
                <div className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full w-fit" style={{ background: `${t.color}18`, border: `1px solid ${t.color}40`, color: t.color }}>
                  📈 {t.result}
                </div>
                <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0" style={{ background: `linear-gradient(135deg, ${t.color}, #06B6D4)` }}>
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.company} · {t.industry}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUARANTEE ───────────────────────────────────────── */}
      <section className="py-16 bg-dark-card/40">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="text-5xl mb-4">🛡️</div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
            Garantía de <span className="gradient-text">resultados</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-6">
            Si al día 7 el setup no está completo y funcionando, seguimos trabajando sin costo adicional hasta que esté.
            Y a diferencia de tu experiencia anterior, aquí ves los datos en tiempo real desde el primer día.
            No tienes que confiar en nuestra palabra: los números lo demuestran.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['✅ Entrega en 7 días', '✅ Datos en tiempo real', '✅ Sin permanencia', '✅ Diagnóstico gratuito'].map((item) => (
              <span key={item} className="text-slate-300">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">FAQ</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
              Preguntas{' '}
              <span className="gradient-text">frecuentes</span>
            </h2>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => <FAQItem key={i} q={faq.q} a={faq.a} />)}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────── */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 70%)' }} />
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/40 bg-brand-purple/10 text-sm font-medium text-brand-purple-light mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" />
            Diagnóstico gratuito disponible ahora
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Tus ads pueden funcionar.{' '}
            <span className="gradient-text">Solo necesitan la base correcta.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            Escríbenos hoy. Te decimos qué está fallando en tu campaña actual,
            sin costo y sin compromiso. Si decides avanzar, tienes todo funcionando en 7 días.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <CTAButton text="Quiero empezar ahora" size="xl" />
          </div>

          <p className="text-slate-500 text-sm">
            O escríbenos directo al{' '}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="text-[#25D366] hover:underline">
              +56 9 9436 6697
            </a>
          </p>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────── */}
      <footer className="border-t border-brand-purple/20 bg-dark-card/60 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <span className="text-xl">⚡</span>
          <span className="text-lg font-extrabold gradient-text">ClickBase</span>
        </div>
        <p className="text-xs text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Aviso: Los resultados de las campañas publicitarias dependen de factores como industria, presupuesto, competencia y estacionalidad. Los precios corresponden al servicio de configuración y no incluyen la inversión publicitaria. Los valores no incluyen IVA.
        </p>
        <p className="text-xs text-slate-700 mt-4">© {new Date().getFullYear()} ClickBase. Todos los derechos reservados.</p>
      </footer>
    </div>
  )
}
