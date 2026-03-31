const segments = [
  {
    icon: '⚖️',
    name: 'Abogados y estudios jurídicos',
    tagline: 'Capta consultas de nuevos clientes todos los días.',
  },
  {
    icon: '🏥',
    name: 'Clínicas y centros médicos',
    tagline: 'Llena tu agenda con pacientes que buscan tus servicios.',
  },
  {
    icon: '🏠',
    name: 'Inmobiliarias y corredoras',
    tagline: 'Genera leads de compradores y arrendatarios calificados.',
  },
  {
    icon: '💼',
    name: 'Consultores y asesores',
    tagline: 'Posiciónate como experto y recibe solicitudes de propuesta.',
  },
  {
    icon: '🔧',
    name: 'Servicios técnicos y profesionales',
    tagline: 'Haz que te encuentren cuando más te necesitan.',
  },
  {
    icon: '🎓',
    name: 'Institutos y academias',
    tagline: 'Capta alumnos con campañas medibles y optimizables.',
  },
  {
    icon: '🏗️',
    name: 'Constructoras y arquitectos',
    tagline: 'Atrae proyectos con una base digital profesional.',
  },
  {
    icon: '💄',
    name: 'Centros estéticos y salud',
    tagline: 'Más reservas online con anuncios que realmente convierten.',
  },
  {
    icon: '📦',
    name: 'Pymes con foco en leads',
    tagline: 'Si vendes por formulario o WhatsApp, esto es para ti.',
  },
]

export default function WhoIsItFor() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-cyan/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">¿Para quién es?</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6 max-w-3xl mx-auto leading-tight">
            Ideal para negocios que quieren{' '}
            <span className="gradient-text">más leads</span>, no más excusas.
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Si vendes por formulario o WhatsApp, esta base es para ti.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {segments.map((segment, index) => (
            <div
              key={index}
              className="card-dark card-dark-hover rounded-2xl p-6 flex items-start gap-4 transition-all duration-300 group cursor-default"
            >
              <span className="text-3xl flex-shrink-0">{segment.icon}</span>
              <div>
                <h3 className="text-base font-bold text-white mb-1">{segment.name}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{segment.tagline}</p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm mb-4">
            ¿Tu rubro no está en la lista? Igual podemos ayudarte.
          </p>
          <a
            href="#contacto"
            className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-all duration-200 hover:shadow-glow-purple"
          >
            Cotizar sin compromiso →
          </a>
        </div>
      </div>
    </section>
  )
}
