const testimonials = [
  {
    initials: 'M',
    name: 'Médico · Clínica particular',
    company: 'Santiago',
    industry: 'Salud',
    color: '#7C3AED',
    stars: 5,
    quote:
      'Antes dependíamos del boca a boca y había meses muy malos. Hoy recibimos entre 4 y 6 consultas nuevas por semana. El negocio por fin tiene un flujo constante de pacientes.',
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
      'Había gastado plata en publicidad antes y nunca funcionó. Con ClickBase fue distinto: en el primer mes ya tenía clientes llegando solos. Por fin siento que el negocio está creciendo.',
    result: '+40% clientes en 3 meses',
  },
  {
    initials: 'J',
    name: 'Socio · Estudio jurídico',
    company: 'Santiago',
    industry: 'Legal',
    color: '#10B981',
    stars: 5,
    quote:
      'Yo solo les conté de mi negocio y ellos construyeron todo. En una semana estaba listo y la primera semana de campaña ya teníamos 3 consultas nuevas. No esperaba resultados tan rápido.',
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
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
        {/* WhatsApp CTA post-testimonials */}
        <div className="text-center">
          <p className="text-slate-400 text-sm mb-5">¿Quieres resultados así para tu negocio?</p>
          <a
            href="https://wa.me/56994366697?text=Hola%2C%20quiero%20cotizar%20la%20p%C3%A1gina%20web%20%2B%20campa%C3%B1a%20%2B%20tracking.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200"
            style={{ boxShadow: '0 0 24px rgba(37, 211, 102, 0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
            </svg>
            Hablar por WhatsApp
          </a>
        </div>

      </div>
    </section>
  )
}
