const testimonials = [
  {
    initials: 'M',
    name: 'Médico · Clínica particular',
    company: 'Santiago',
    industry: 'Salud',
    color: '#7C3AED',
    stars: 5,
    quote:
      'Antes dependíamos del boca a boca. Hoy recibimos entre 4 y 6 consultas nuevas por semana desde Google. El tracking nos permite saber exactamente qué anuncio las genera.',
    result: '+5 consultas/semana',
  },
  {
    initials: 'V',
    name: 'Corredora de propiedades',
    company: 'Región Metropolitana',
    industry: 'Inmobiliaria',
    color: '#06B6D4',
    stars: 5,
    quote:
      'Lo que más me sorprendió fue la claridad. Desde el día uno supe cuántos leads llegaban, desde qué anuncio y a qué costo. Nunca había tenido esa información.',
    result: 'Costo por lead -40%',
  },
  {
    initials: 'J',
    name: 'Socio · Estudio jurídico',
    company: 'Santiago',
    industry: 'Legal',
    color: '#10B981',
    stars: 5,
    quote:
      'El setup estuvo listo en una semana. Yo solo entregué la información de mi negocio y ellos construyeron todo. La primera semana de campaña ya teníamos 3 consultas.',
    result: '3 consultas en 1ª semana',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Resultados reales</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-4 leading-tight">
            Lo que dicen{' '}
            <span className="gradient-text">quienes ya lo probaron</span>
          </h2>
          <p className="text-slate-500 text-sm">
            {/* TODO: Reemplaza con testimonios reales de tus clientes */}
            Testimonios de clientes reales · Resultados pueden variar según industria y presupuesto
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="card-dark rounded-2xl p-7 flex flex-col gap-5 card-dark-hover transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: t.stars }).map((_, s) => (
                  <svg key={s} width="16" height="16" viewBox="0 0 20 20" fill="#F59E0B">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <blockquote className="text-slate-300 text-sm leading-relaxed flex-1">
                "{t.quote}"
              </blockquote>

              {/* Result badge */}
              <div
                className="inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full w-fit"
                style={{
                  background: `${t.color}18`,
                  border: `1px solid ${t.color}40`,
                  color: t.color,
                }}
              >
                📈 {t.result}
              </div>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-white/5">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ background: `linear-gradient(135deg, ${t.color}, #06B6D4)` }}
                >
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
  )
}
