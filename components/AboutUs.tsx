export default function AboutUs() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #06B6D4 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-dark rounded-3xl p-8 sm:p-12 lg:p-14">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* LEFT — Photo + badge */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              {/* Avatar — TODO: reemplazar con foto real */}
              <div className="relative">
                <div
                  className="w-36 h-36 rounded-2xl flex items-center justify-center text-white text-5xl font-extrabold"
                  style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
                >
                  {/* TODO: reemplazar con <img src="/foto.jpg" alt="Vicente Torres" className="w-36 h-36 rounded-2xl object-cover" /> */}
                  VT
                </div>
                {/* Verified badge */}
                <div className="absolute -bottom-3 -right-3 w-10 h-10 rounded-full gradient-bg flex items-center justify-center shadow-glow-purple">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                  </svg>
                </div>
              </div>

              {/* Name + title */}
              <div className="text-center lg:text-left">
                <h3 className="text-2xl font-extrabold text-white mb-1">Vicente Torres</h3>
                <p className="text-brand-purple-light text-sm font-semibold">Fundador · ClickBase</p>
              </div>

              {/* Quick stats */}
              <div className="flex gap-6">
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">+5</p>
                  <p className="text-xs text-slate-500">años en ads</p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">+150</p>
                  <p className="text-xs text-slate-500">proyectos</p>
                </div>
                <div className="w-px bg-white/10" />
                <div className="text-center">
                  <p className="text-2xl font-extrabold text-white">12+</p>
                  <p className="text-xs text-slate-500">industrias</p>
                </div>
              </div>
            </div>

            {/* RIGHT — Bio + CTA */}
            <div>
              <span className="section-label">Quién está detrás</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-4 mb-5 leading-tight">
                No somos una agencia grande.<br />
                <span className="gradient-text">Somos los que hacen el trabajo.</span>
              </h2>

              {/* TODO: Personaliza este texto con tu historia real */}
              <div className="space-y-4 text-slate-400 text-sm leading-relaxed">
                <p>
                  Llevo más de 5 años configurando campañas de Google Ads y Meta Ads para pymes y
                  profesionales en Chile. He visto de cerca cómo negocios con buen producto pierden
                  plata en publicidad por no tener la base técnica correcta.
                </p>
                <p>
                  ClickBase nació para solucionar exactamente eso: entrar, instalar bien, y dejar
                  todo funcionando. Sin humo, sin contratos eternos, sin promesas vacías.
                </p>
                <p className="text-white font-medium">
                  Cada proyecto lo reviso personalmente antes de entregar.
                </p>
              </div>

              {/* CTA */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <a
                  href="https://wa.me/56994366697?text=Hola%2C%20quiero%20cotizar%20la%20p%C3%A1gina%20web%20%2B%20campa%C3%B1a%20%2B%20tracking.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 gradient-bg text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-all duration-200 hover:shadow-glow-purple text-sm"
                >
                  💬 Hablar directamente conmigo
                </a>
                {/* TODO: Agrega tu LinkedIn si quieres */}
                {/* <a href="https://linkedin.com/in/tu-perfil" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-slate-700 text-slate-300 hover:text-white font-semibold px-6 py-3.5 rounded-xl hover:border-slate-500 transition-all duration-200 text-sm">
                  LinkedIn →
                </a> */}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
