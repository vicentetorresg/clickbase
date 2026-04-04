'use client'

import { useState } from 'react'
import { fbq } from '@/lib/fbq'

const WA_LINK = 'https://wa.me/56955350255?text=Hola%2C%20vi%20la%20p%C3%A1gina%20y%20quiero%20cotizar%20el%20setup%20web%20%2B%20campa%C3%B1a.%20%C2%BFTienen%20cupos%20disponibles%3F'
const LINKEDIN = 'https://www.linkedin.com/in/vicente-t-568362118/'

function CTAButton({ text = 'Quiero mi setup ahora', size = 'lg', full = false, onClick }: { text?: string; size?: 'lg' | 'xl'; full?: boolean; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
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
    </button>
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

const testimonials = [
  {
    initials: 'MF', name: 'Dr. Marcelo Fuentes', company: 'Centro Médico Providencia', industry: 'Clínica', color: '#7C3AED', stars: 5,
    quote: 'Antes dependíamos del boca a boca. Hoy recibimos entre 4 y 6 consultas nuevas por semana desde Google. El tracking nos permite saber exactamente qué anuncio las genera.',
    result: '+5 consultas/semana',
  },
  {
    initials: 'VR', name: 'Valentina Riquelme', company: 'VR Propiedades', industry: 'Inmobiliaria', color: '#06B6D4', stars: 5,
    quote: 'Lo que más me sorprendió fue la claridad. Desde el día uno supe cuántos leads llegaban, desde qué anuncio y a qué costo. Nunca había tenido esa información.',
    result: 'Costo por lead -40%',
  },
  {
    initials: 'JS', name: 'Jorge Salas', company: 'Salas & Asociados', industry: 'Estudio Jurídico', color: '#10B981', stars: 5,
    quote: 'El setup estuvo listo en una semana. Yo solo entregué la información de mi negocio y ellos construyeron todo. La primera semana de campaña ya teníamos 3 consultas.',
    result: '3 consultas en 1ª semana',
  },
  {
    initials: 'CP', name: 'Catalina Pérez', company: 'Estudio CP Arquitectura', industry: 'Arquitectura', color: '#F59E0B', stars: 5,
    quote: 'Tenía miedo de "tirar plata" en publicidad sin resultados. Con el tracking instalado vi exactamente qué funcionaba y qué no. Optimizamos la campaña la semana 2 y los leads bajaron de precio a la mitad.',
    result: 'CPL -52% en 2 semanas',
  },
  {
    initials: 'RM', name: 'Rodrigo Muñoz', company: 'Muñoz Constructora', industry: 'Construcción', color: '#EC4899', stars: 5,
    quote: 'Nunca había tenido presencia digital. Me armaron la página, la campaña en Google y todo el tracking en 7 días. El primer mes cerré 2 proyectos que llegaron por el anuncio.',
    result: '2 proyectos nuevos en el mes 1',
  },
  {
    initials: 'AG', name: 'Andrea González', company: 'Centro Dental AG', industry: 'Odontología', color: '#8B5CF6', stars: 5,
    quote: 'Antes pagaba a una agencia que no me mostraba resultados. Con ClickBase sé en tiempo real cuántas personas hacen clic, cuántas llaman y cuánto me cuesta cada paciente nuevo.',
    result: 'Visibilidad total de resultados',
  },
]

const faqs = [
  {
    q: '¿Qué incluye exactamente el setup?',
    a: 'Incluye el diseño y desarrollo de una landing page optimizada para conversión, configuración de Google Tag Manager, instalación de Meta Pixel, configuración de conversiones en Google Ads y Meta Ads, y el lanzamiento de tu primera campaña. Todo en un plazo de 5 a 7 días hábiles.',
  },
  {
    q: '¿Tengo que pagar la publicidad por separado?',
    a: 'Sí. El costo del setup es por el servicio de configuración. La inversión en Google Ads o Meta Ads se paga directamente a las plataformas y no está incluida. Recomendamos comenzar con un presupuesto mínimo de $100.000 a $200.000 CLP mensual para ver resultados.',
  },
  {
    q: '¿Cuánto tiempo tarda en estar listo?',
    a: 'Entre 5 y 7 días hábiles desde que nos entregas la información de tu negocio. Tú no necesitas hacer nada técnico; solo respondernos un formulario con los datos de tu empresa.',
  },
  {
    q: '¿Qué pasa si no tengo dominio ni hosting?',
    a: 'No hay problema. Te ayudamos a configurar todo desde cero. Si ya tienes dominio, lo usamos. Si no, te orientamos para adquirir uno.',
  },
  {
    q: '¿Necesito saber de tecnología o publicidad?',
    a: 'Para nada. Nosotros nos encargamos de toda la parte técnica. Tú solo debes tener claridad sobre tu negocio, tus clientes ideales y cuánto quieres invertir en publicidad.',
  },
  {
    q: '¿Qué incluye la mantención mensual?',
    a: 'La mantención incluye monitoreo del tracking, optimización mensual de la campaña activa, soporte por WhatsApp y ajustes menores a la página. Desde $49.990 + IVA al mes.',
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

function WAModal({ onClose, onConfirm }: { onClose: () => void; onConfirm: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-[#0f0f1a] border border-brand-purple/30 rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <img
          src="/vicente.png"
          alt="Vicente Torres G."
          className="w-20 h-20 rounded-2xl object-cover object-top mx-auto mb-4"
        />
        <h3 className="text-white font-extrabold text-lg mb-1">Vicente Torres G.</h3>
        <a
          href={LINKEDIN}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white border border-slate-700 hover:border-[#0A66C2] px-3 py-1.5 rounded-lg transition-colors duration-200 mb-5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          Ver perfil en LinkedIn
        </a>
        <p className="text-slate-300 text-sm leading-relaxed mb-6">
          Al hacer click en este botón, te contactarás directamente con <strong className="text-white">Vicente Torres</strong>.
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

export default function Embudo1() {
  const [showModal, setShowModal] = useState(false)

  function openModal() { setShowModal(true) }
  function closeModal() { setShowModal(false) }

  function handleGoToWA() {
    if (!sessionStorage.getItem('wa_lead_fired')) {
      fbq('track', 'Lead')
      sessionStorage.setItem('wa_lead_fired', '1')
    }
    window.open(WA_LINK, '_blank')
    closeModal()
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      {showModal && <WAModal onClose={closeModal} onConfirm={handleGoToWA} />}

      {/* ── HEADER ──────────────────────────────────────────── */}
      <header className="sticky top-0 z-50 border-b border-brand-purple/20 bg-dark/90 backdrop-blur-lg">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl">⚡</span>
            <span className="text-lg font-extrabold gradient-text">ClickBase</span>
          </a>
          <button
            onClick={openModal}
            className="flex items-center gap-2 text-sm font-bold text-[#25D366] border border-[#25D366]/30 hover:bg-[#25D366]/10 transition-colors duration-200 px-4 py-2 rounded-lg"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
            </svg>
            <span className="hidden sm:inline">+56 9 5535 0255</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>
        </div>
      </header>

      {/* ── URGENCY BAR ─────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-brand-purple/80 to-brand-cyan/60 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-semibold">
        ⚡ Setup completo: <span className="line-through opacity-80 mx-1">$999.990</span><strong>$699.990 + IVA</strong> — Página + campaña + tracking listo en 7 días
      </div>

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full opacity-20 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-purple/40 bg-brand-purple/10 text-sm font-medium text-brand-purple-light mb-8">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse inline-block" />
            Más de 40 negocios ya tienen su base digital lista
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Deja de perder <span className="gradient-text">clientes online.</span>
            <br />
            Te armamos todo en{' '}
            <span className="gradient-text">7 días.</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Web lista para convertir + Google o Meta Ads + tracking activo desde día 1. Sin técnicos, sin contratos.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <CTAButton text="Quiero cotizar mi setup" size="xl" onClick={openModal} />
          </div>

          {/* Trust pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
            {['✅ Setup en 7 días', '✅ Sin contrato de permanencia', '✅ Tracking desde día 1', '✅ Soporte por WhatsApp'].map((pill) => (
              <span key={pill} className="px-3 py-1.5 bg-dark-card border border-slate-700 rounded-full text-slate-300">{pill}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF NUMBERS ───────────────────────────── */}
      <section className="py-12 border-y border-brand-purple/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { number: '+40', label: 'Setups completados' },
              { number: '7', label: 'Días promedio de entrega' },
              { number: '-40%', label: 'Reducción en costo/lead' },
              { number: '100%', label: 'Tracking activo desde día 1' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-extrabold gradient-text mb-1">{stat.number}</p>
                <p className="text-xs sm:text-sm text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 70% 50%, rgba(124,58,237,0.05) 0%, transparent 60%)' }} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">El problema</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight">
              ¿Por qué la mayoría de negocios{' '}
              <span className="gradient-text">fracasa online?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            {[
              { icon: '🌐', title: 'Página genérica que no convierte', desc: 'Tienen una web bonita pero sin estructura de conversión. Los visitantes llegan, la ven y se van sin dejar sus datos.' },
              { icon: '📊', title: 'Publicidad sin tracking', desc: 'Pagan Google Ads o Meta Ads sin saber qué anuncio genera clientes. Están volando a ciegas y quemando presupuesto.' },
              { icon: '⏳', title: 'Meses esperando resultados', desc: 'Contratan agencias que prometen resultados en 3 meses. Mientras tanto, pagan mantenciones sin ver retorno claro.' },
              { icon: '🔌', title: 'Cada herramienta desconectada', desc: 'La web está en un lado, los anuncios en otro, el pixel mal instalado y Google Analytics sin configurar eventos.' },
            ].map((item) => (
              <div key={item.title} className="card-dark rounded-2xl p-6 flex gap-4">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-brand-purple/30 bg-brand-purple/5 text-center">
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              <strong className="text-white">El resultado:</strong> Negocios que podrían captar clientes digitalmente todos los días,
              pero no lo hacen porque nadie les armó la base técnica correctamente desde el inicio.
            </p>
          </div>
        </div>
      </section>

      {/* ── SOLUTION ────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-card/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">La solución</span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight">
              Una base técnica <span className="gradient-text">completa y lista</span>
              <br />para captar clientes desde el día uno
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              No solo te hacemos una página. Te entregamos un sistema completo: página, campaña y tracking todo conectado y funcionando.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {[
              { icon: '🌐', title: 'Landing page que convierte', desc: 'Diseñada para que los visitantes hagan lo que tú quieres: llamar, escribir o dejar sus datos.' },
              { icon: '🎯', title: 'Campaña lista para lanzar', desc: 'Google Ads o Meta Ads configurados con segmentación, textos y creatividades. Lista para activar.' },
              { icon: '📈', title: 'Tracking completo instalado', desc: 'Google Tag Manager, Meta Pixel y conversiones configuradas. Sabrás exactamente qué genera cada lead.' },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 card-dark rounded-2xl">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-white mb-2 text-lg">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <CTAButton text="Quiero esta solución para mi negocio" size="xl" />
          </div>
        </div>
      </section>

      {/* ── WHAT'S INCLUDED ─────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Todo incluido</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              ¿Qué incluye el{' '}
              <span className="gradient-text">setup completo?</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 mb-10">
            {[
              'Landing page optimizada para conversión (diseño + desarrollo)',
              'Configuración completa de Google Tag Manager',
              'Instalación y verificación del Meta Pixel',
              'Configuración de conversiones en Google Ads',
              'Configuración de conversiones en Meta Ads',
              'Primera campaña en Google o Meta (estructura y textos)',
              'Dashboard básico de resultados',
              'Entrega con documentación del tracking instalado',
              'Soporte post-entrega por 30 días via WhatsApp',
              'Capacitación básica para entender los reportes',
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 p-4 bg-dark-card/60 rounded-xl border border-slate-800">
                <CheckIcon />
                <span className="text-sm text-slate-300 leading-relaxed">{item}</span>
              </div>
            ))}
          </div>

          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-brand-purple/10 to-brand-cyan/10 border border-brand-purple/30">
            <div className="flex items-center justify-center gap-2 flex-wrap mb-1">
              <span className="text-2xl font-extrabold text-white">Todo esto:</span>
              <span className="text-xl text-slate-300 line-through font-medium">$999.990 + IVA</span>
              <span className="text-2xl font-extrabold gradient-text">$699.990 + IVA</span>
              <span className="text-xs font-bold text-success bg-success/10 border border-success/25 rounded-full px-2 py-0.5">−30%</span>
            </div>
            <p className="text-slate-400 text-sm">Pago único. Sin mensualidades obligatorias.</p>
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
                Me especialicé en Paid Media porque vi de cerca cómo negocios con buen producto pierden plata en publicidad
                por no tener la base técnica correcta.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-5">
                ClickBase existe para que no tengas que aprenderlo tú.
                Yo instalo todo, lo dejo funcionando y te entrego listo para captar leads.{' '}
                <strong className="text-white">Cada proyecto pasa por mis manos antes de entregarse.</strong>
              </p>
              <button
                onClick={openModal}
                className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-all duration-200 text-sm"
              >
                💬 Hablar directamente conmigo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA INTERMEDIA ──────────────────────────────────── */}
      <div className="py-10 text-center px-4">
        <p className="text-slate-400 text-sm mb-4">¿Tienes preguntas? Escríbenos sin compromiso</p>
        <CTAButton text="Cotizar ahora por WhatsApp" size="xl" onClick={openModal} />
      </div>

      {/* ── TESTIMONIALS 1 ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Resultados reales</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-2 leading-tight">
              Lo que dicen{' '}
              <span className="gradient-text">quienes ya lo tienen</span>
            </h2>
            <p className="text-slate-500 text-sm">Testimonios de clientes reales · Resultados pueden variar según industria y presupuesto</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.slice(0, 3).map((t, i) => (
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

      {/* ── HOW IT WORKS ────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-card/40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Proceso</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              ¿Cómo funciona el{' '}
              <span className="gradient-text">setup en 7 días?</span>
            </h2>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-px bg-gradient-to-r from-brand-purple/30 via-brand-cyan/30 to-brand-purple/30" />
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { step: '01', icon: '📋', title: 'Nos cuentas tu negocio', desc: 'Completas un formulario simple: tu servicio, clientes ideales, zona y presupuesto en publicidad. 15 minutos de tu tiempo.' },
                { step: '02', icon: '⚙️', title: 'Construimos todo', desc: 'Nuestro equipo diseña la landing, configura el tracking e instala GTM, Pixel y conversiones. Sin molestar tu operación.' },
                { step: '03', icon: '🚀', title: 'Lanzamos juntos', desc: 'Revisamos todo contigo, hacemos ajustes finales y activamos la campaña. Empiezas a recibir leads desde el día uno.' },
              ].map((step) => (
                <div key={step.step} className="text-center relative">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 text-3xl mb-4 relative">
                    {step.icon}
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full gradient-bg text-white text-xs font-bold flex items-center justify-center">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-12">
            <CTAButton text="Empezar mi setup ahora" size="xl" />
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section className="py-20 lg:py-28" id="precios">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">Precios</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-4 leading-tight">
              Inversión clara,{' '}
              <span className="gradient-text">sin sorpresas</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto">Un setup completo que antes tomaba meses y costaba millones. Ahora disponible en 7 días.</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            {/* Setup card */}
            <div className="pricing-highlight rounded-2xl p-8 relative overflow-hidden">
              <div className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 rounded-full gradient-bg text-white">Más popular</div>
              <p className="text-slate-400 text-sm mb-2">Setup único</p>
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
                {['Landing page de conversión', 'Google Tag Manager', 'Meta Pixel', 'Configuración de conversiones', 'Primera campaña lista', 'Soporte 30 días'].map((item) => (
                  <li key={item} className="flex items-center gap-2 text-sm text-slate-300">
                    <span className="text-success">✓</span> {item}
                  </li>
                ))}
              </ul>
              <CTAButton text="Quiero este setup" full />
            </div>

            {/* Mantención card */}
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
              <button
                onClick={openModal}
                className="w-full border border-slate-600 text-white font-bold px-6 py-3.5 rounded-xl text-sm hover:border-slate-400 hover:bg-white/5 transition-all duration-200 flex items-center justify-center"
              >
                Consultar mantención
              </button>
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
        <p className="text-white/80 text-sm mb-2">¿Listo para tener tu sistema completo?</p>
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-6">Escríbenos y te cotizamos en minutos</h3>
        <CTAButton text="Cotizar por WhatsApp ahora" size="xl" />
      </div>

      {/* ── TESTIMONIALS 2 ──────────────────────────────────── */}
      <section className="py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
              Más negocios que{' '}
              <span className="gradient-text">ya tienen su base lista</span>
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
            Nuestra <span className="gradient-text">promesa</span>
          </h2>
          <p className="text-slate-400 text-base leading-relaxed mb-6">
            Si al día 7 el setup no está completo y funcionando, seguimos trabajando sin costo adicional hasta que esté. Punto.
            Tu tracking activo, tu campaña lista y tu página publicada. O no cobramos la diferencia.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            {['✅ Entrega en 7 días', '✅ Sin letra chica', '✅ Sin permanencia'].map((item) => (
              <span key={item} className="text-slate-300">{item}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO IS IT FOR ───────────────────────────────────── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="section-label">¿Para quién es?</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 leading-tight">
              Esto funciona para{' '}
              <span className="gradient-text">negocios como el tuyo</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '🏥', label: 'Clínicas y consultas médicas' },
              { icon: '🏠', label: 'Inmobiliarias y corredores' },
              { icon: '⚖️', label: 'Estudios jurídicos' },
              { icon: '🏗️', label: 'Constructoras y arquitectos' },
              { icon: '🦷', label: 'Centros odontológicos' },
              { icon: '💼', label: 'Consultoras y coaches' },
              { icon: '🍽️', label: 'Restaurantes y cafés' },
              { icon: '🎓', label: 'Institutos y academias' },
              { icon: '🔧', label: 'Servicios técnicos y mantención' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3 p-4 card-dark rounded-xl">
                <span className="text-2xl">{item.icon}</span>
                <span className="text-sm text-slate-300">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 p-5 rounded-2xl border border-brand-purple/30 bg-brand-purple/5 text-center">
            <p className="text-slate-300 text-sm">
              ¿No ves tu industria? <button onClick={openModal} className="text-brand-purple-light underline underline-offset-2 hover:text-white">Escríbenos</button> y te decimos si aplica para tu negocio.
            </p>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────── */}
      <section className="py-20 lg:py-28 bg-dark-card/40">
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
            Disponibilidad limitada — Consulta antes de que se llene
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-6 leading-tight">
            Tu negocio puede captar clientes{' '}
            <span className="gradient-text">desde la próxima semana.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            No necesitas saber de tecnología. No necesitas meses de espera.
            Solo escríbenos hoy y en 7 días tienes todo funcionando.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <CTAButton text="Quiero empezar ahora" size="xl" onClick={openModal} />
          </div>

          <p className="text-slate-500 text-sm">
            O escríbenos directo al{' '}
            <button onClick={openModal} className="text-[#25D366] hover:underline">
              +56 9 5535 0255
            </button>
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
