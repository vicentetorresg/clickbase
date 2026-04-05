'use client'

import { useState } from 'react'
import { useOpenWAModal } from '@/components/WAModalProvider'

type FAQItem = {
  question: string
  answer: string
}

const faqs: FAQItem[] = [
  {
    question: '¿El setup incluye las campañas de publicidad?',
    answer:
      'Sí, incluye la estructura y configuración inicial de tu primera campaña en Google Ads o Meta Ads. La inversión publicitaria (el presupuesto que le pagas a Google o Meta por los anuncios) la manejas tú directamente.',
  },
  {
    question: '¿El precio incluye el presupuesto en anuncios?',
    answer:
      'No. El valor del setup cubre solo el servicio de diseño, desarrollo y configuración. El presupuesto que inviertes en publicidad se paga directamente a Google o Meta, según lo que definas gastar mensualmente.',
  },
  {
    question: '¿Incluye dominio y hosting?',
    answer:
      'No están incluidos. Te recomendamos opciones según tu caso y te acompañamos en la contratación. Los costos de hosting y dominio corren por tu cuenta.',
  },
  {
    question: '¿Qué incluye la mantención mensual base?',
    answer:
      'El plan base desde $49.990 + IVA incluye soporte no prioritario por WhatsApp, ajustes menores de contenido, monitoreo básico del sistema y apoyo general. No incluye reuniones, optimización activa de campañas ni desarrollos nuevos.',
  },
  {
    question: '¿Puedo pedir reuniones con el plan base?',
    answer:
      'Las reuniones no están incluidas en el plan base. Si necesitas acompañamiento más activo, seguimiento regular o reuniones periódicas, el plan mensual sube. Conversemos y te armamos una propuesta según lo que necesitas.',
  },
  {
    question: '¿Puedo pedir funcionalidades o páginas adicionales?',
    answer:
      'Sí. Cualquier desarrollo adicional, integración especial o nueva sección se cotiza por separado según el alcance del proyecto.',
  },
  {
    question: '¿Cuánto demora la entrega?',
    answer:
      'El tiempo estimado es de 5 a 10 días hábiles desde que tenemos toda la información de tu negocio. Proyectos más complejos o con requerimientos especiales pueden tomar más tiempo.',
  },
  {
    question: '¿Ya tengo página web, me sirve igual?',
    answer:
      'Sí. Podemos implementar el tracking y la configuración de campañas en tu sitio actual, o construir una landing específica para tus anuncios. Evaluamos tu caso sin costo.',
  },
  {
    question: '¿En qué plataformas trabajan?',
    answer:
      'Trabajamos con Google Ads y Meta Ads (Facebook e Instagram).',
  },
  {
    question: '¿Me garantizan resultados?',
    answer:
      'Garantizamos que la base técnica queda bien instalada y la estructura inicial es correcta. Los resultados de las campañas dependen de factores como tu industria, presupuesto y competencia. Lo que sí puedes esperar: un sistema instalado correctamente desde el día uno, sin plata botada en configuraciones incorrectas.',
  },
]

function FAQItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div
      className={`card-dark rounded-xl overflow-hidden transition-all duration-300 ${
        isOpen ? 'border-brand-purple/40' : 'border-transparent hover:border-brand-purple/20'
      }`}
      style={{ border: '1px solid' }}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-base font-semibold text-white group-hover:text-brand-purple-light transition-colors duration-200">
          {item.question}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full gradient-bg flex items-center justify-center transition-transform duration-300 ${
            isOpen ? 'rotate-45' : ''
          }`}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V11M1 6H11"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>
      </button>

      {/* Answer */}
      <div
        className="faq-answer"
        style={{
          maxHeight: isOpen ? '300px' : '0',
          opacity: isOpen ? 1 : 0,
        }}
      >
        <div className="px-6 pb-5">
          <div className="h-px bg-brand-purple/20 mb-4" />
          <p className="text-slate-400 text-sm leading-relaxed">{item.answer}</p>
        </div>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const openModal = useOpenWAModal()

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="section-label">Preguntas frecuentes</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6">
            Dudas comunes{' '}
            <span className="gradient-text">antes de cotizar</span>
          </h2>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              item={faq}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-400 mb-6">
            ¿Tienes una pregunta que no está acá?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contacto"
              className="gradient-bg text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 hover:shadow-glow-purple text-center"
            >
              Cotizar ahora
            </a>
            <button
              onClick={openModal}
              className="flex items-center justify-center gap-2 border border-slate-600 text-white font-bold px-8 py-4 rounded-xl hover:border-slate-400 hover:bg-white/5 transition-all duration-200"
            >
              💬 Preguntar por WhatsApp
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
