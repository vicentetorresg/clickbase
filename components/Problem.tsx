'use client'

import { useOpenWAModal } from '@/components/WAModalProvider'

const painPoints = [
  {
    icon: '😤',
    title: 'Llevas años trabajando duro y el negocio no crece',
    description:
      'Pones todo el esfuerzo, pero las ventas siguen igual mes a mes. La sensación de estar corriendo en círculos es real.',
  },
  {
    icon: '📵',
    title: 'Dependes del boca en boca y nunca sabes cuándo llega el próximo cliente',
    description:
      'Los referidos son buenos, pero no son predecibles. Un mes lleno, el siguiente vacío — sin poder controlar nada.',
  },
  {
    icon: '🌐',
    title: 'Tus competidores aparecen en Google y tú no existes en internet',
    description:
      'Mientras otros negocios captan clientes online todos los días, tú sigues invisible para quienes buscan lo que ofreces.',
  },
  {
    icon: '💸',
    title: 'Ya intentaste publicidad y solo quemaste plata sin resultados',
    description:
      'Pagaste a alguien para hacer anuncios, no llegaron clientes y quedaste con la sensación de que "el marketing digital no funciona".',
  },
]

export default function Problem() {
  const openModal = useOpenWAModal()

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle bg glow */}
      <div
        className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">¿Te reconoces aquí?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6 max-w-3xl mx-auto leading-tight">
            El estancamiento no es mala suerte. Es falta de sistema.
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            La mayoría de los dueños de PYME trabajan duro, pero siguen dependiendo del azar.
            Sin un sistema que atraiga clientes de forma predecible, siempre vas a estar apagando incendios.
          </p>
        </div>

        {/* Pain points grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {painPoints.map((point, index) => (
            <div
              key={index}
              className="card-dark card-dark-hover rounded-2xl p-6 transition-all duration-300 group"
              style={{ borderLeft: '3px solid rgba(124, 58, 237, 0.5)' }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0 mt-0.5">{point.icon}</span>
                <div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {point.title}
                  </h3>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA nudge */}
        <div className="text-center mt-12">
          <p className="text-slate-400 text-sm mb-4">Si te identificaste con alguno, tenemos exactamente lo que necesitas.</p>
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-7 py-3.5 rounded-xl transition-all duration-200 text-sm"
            style={{ boxShadow: '0 0 16px rgba(37, 211, 102, 0.2)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
            </svg>
            Hablar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
