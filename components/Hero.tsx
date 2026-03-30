export default function Hero() {
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
              <span>Especialistas en Paid Media y tracking para PYMEs</span>
            </div>

            {/* H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
              Tu página, tus anuncios y tu tracking:{' '}
              <span className="gradient-text">
                listos para captar clientes desde el día uno.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-400 mb-6 leading-relaxed max-w-xl">
              No solo una página bonita. Una base técnica completa para que tus
              campañas funcionen, tu tracking mida y tus leads lleguen.
            </p>

            {/* Author strip */}
            <div className="flex items-center gap-3 mb-8 p-3 rounded-xl bg-dark-card/60 border border-slate-800 w-fit">
              <img
                src="/vicente.png"
                alt="Vicente Torres G."
                className="w-9 h-9 rounded-lg object-cover object-top flex-shrink-0"
              />
              <div>
                <p className="text-sm font-semibold text-white leading-tight">Vicente Torres G.</p>
                <p className="text-xs text-slate-500">Ing. Civil Industrial PUC · CEO Proppi</p>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* GTM note: add dataLayer.push({ event: 'cta_click', cta_location: 'hero' }) via GTM trigger on this element */}
              <a
                href="#contacto"
                className="gradient-bg text-white font-bold px-8 py-4 rounded-xl text-base hover:opacity-90 transition-all duration-200 hover:shadow-glow-purple text-center"
              >
                Quiero cotizar mi página + campaña
              </a>
              {/* GTM note: add dataLayer.push({ event: 'whatsapp_click', location: 'hero' }) via GTM trigger on this element */}
              <a
                href="https://wa.me/56994366697?text=Hola%2C%20quiero%20cotizar%20la%20p%C3%A1gina%20web%20%2B%20campa%C3%B1a%20%2B%20tracking.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-slate-600 text-white font-bold px-8 py-4 rounded-xl text-base hover:border-slate-400 hover:bg-white/5 transition-all duration-200"
              >
                <span>💬</span>
                <span>Hablar por WhatsApp</span>
              </a>
            </div>

            {/* Price pills */}
            <div className="flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-card border border-slate-700 text-sm text-slate-300">
                <span className="w-2 h-2 rounded-full bg-success inline-block" />
                Setup: $699.990 + IVA
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-dark-card border border-slate-700 text-sm text-slate-300">
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
