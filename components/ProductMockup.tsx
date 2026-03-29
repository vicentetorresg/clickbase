export default function ProductMockup() {
  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-purple/6 to-transparent pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7C3AED 0%, transparent 70%)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">El resultado</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6 max-w-3xl mx-auto leading-tight">
            Así queda tu landing page{' '}
            <span className="gradient-text">lista para convertir</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Una página profesional, rápida y conectada a tus campañas desde el primer día.
          </p>
        </div>

        {/* Mockup + features */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT: Browser mockup */}
          <div className="relative">
            {/* Glow behind mockup */}
            <div
              className="absolute inset-0 blur-3xl opacity-20 rounded-3xl"
              style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }}
            />

            {/* Browser window */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3" style={{ background: '#1a1a2e' }}>
                {/* Traffic lights */}
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                </div>
                {/* URL bar */}
                <div className="flex-1 mx-3 bg-white/5 rounded-md px-3 py-1 flex items-center gap-2">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-slate-500 flex-shrink-0">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" stroke="currentColor" strokeWidth="2"/>
                    <path d="M2 12h20M12 2c-2.5 3-4 6.5-4 10s1.5 7 4 10M12 2c2.5 3 4 6.5 4 10s-1.5 7-4 10" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                  <span className="text-xs text-slate-400 font-mono">tunegocio.cl</span>
                </div>
              </div>

              {/* Page content preview */}
              <div className="overflow-hidden" style={{ background: '#08080F' }}>
                {/* Mini nav */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/5">
                  <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }} />
                    <div className="w-14 h-2 rounded-full bg-white/60" />
                  </div>
                  <div className="flex gap-3">
                    <div className="w-10 h-1.5 rounded-full bg-white/20" />
                    <div className="w-10 h-1.5 rounded-full bg-white/20" />
                    <div className="w-10 h-1.5 rounded-full bg-white/20" />
                    <div className="w-16 h-5 rounded-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }} />
                  </div>
                </div>

                {/* Mini hero */}
                <div className="px-5 pt-7 pb-6 relative">
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{ background: 'radial-gradient(ellipse at 70% 50%, #7C3AED 0%, transparent 60%)' }}
                  />
                  <div className="relative">
                    {/* Badge */}
                    <div className="flex items-center gap-1.5 mb-3 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#06B6D4]" />
                      <div className="w-24 h-1.5 rounded-full bg-[#06B6D4]/60" />
                    </div>
                    {/* Headline */}
                    <div className="space-y-1.5 mb-4">
                      <div className="w-56 h-3 rounded-full bg-white/80" />
                      <div className="w-44 h-3 rounded-full bg-white/60" />
                      <div className="w-36 h-3 rounded-full" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }} />
                    </div>
                    {/* Subtext */}
                    <div className="space-y-1 mb-5">
                      <div className="w-52 h-1.5 rounded-full bg-white/25" />
                      <div className="w-44 h-1.5 rounded-full bg-white/20" />
                    </div>
                    {/* CTA buttons */}
                    <div className="flex gap-2">
                      <div className="w-24 h-7 rounded-lg" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }} />
                      <div className="w-24 h-7 rounded-lg bg-[#25D366]/80" />
                    </div>
                  </div>
                </div>

                {/* Trust bar */}
                <div className="flex justify-around items-center px-5 py-3 border-y border-white/5" style={{ background: '#0d0d1a' }}>
                  {[60, 80, 50, 70].map((w, i) => (
                    <div key={i} className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]/60" />
                      <div className={`h-1.5 rounded-full bg-white/20`} style={{ width: w / 4 + 'px' }} />
                    </div>
                  ))}
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-3 gap-2 p-4">
                  {[0, 1, 2].map((i) => (
                    <div key={i} className="rounded-lg p-2.5" style={{ background: '#12122A', border: '1px solid rgba(124,58,237,0.15)' }}>
                      <div className="w-4 h-4 rounded-md mb-2" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }} />
                      <div className="w-full h-1.5 rounded-full bg-white/40 mb-1" />
                      <div className="w-3/4 h-1 rounded-full bg-white/20" />
                    </div>
                  ))}
                </div>

                {/* Form section */}
                <div className="flex gap-3 p-4 pt-0">
                  <div className="flex-1 space-y-1.5">
                    <div className="w-16 h-1 rounded-full bg-white/30" />
                    <div className="h-5 rounded-lg bg-white/5 border border-white/10" />
                    <div className="w-16 h-1 rounded-full bg-white/30 mt-2" />
                    <div className="h-5 rounded-lg bg-white/5 border border-white/10" />
                    <div className="h-6 rounded-lg mt-2" style={{ background: 'linear-gradient(135deg, #7C3AED, #06B6D4)' }} />
                  </div>
                  <div className="flex-1 rounded-xl p-3" style={{ background: '#12122A', border: '1px solid rgba(124,58,237,0.15)' }}>
                    <div className="w-20 h-1.5 rounded-full bg-white/50 mb-2" />
                    <div className="space-y-1">
                      {[80, 70, 90, 75].map((w, i) => (
                        <div key={i} className="flex items-center gap-1">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#7C3AED]/60 flex-shrink-0" />
                          <div className="h-1 rounded-full bg-white/20" style={{ width: w + '%' }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating metric badges */}
            <div
              className="absolute -top-3 -right-3 bg-[#12122A] border border-[#7C3AED]/40 rounded-xl px-3 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-[#28CA41] animate-pulse" />
                <span className="text-xs font-bold text-white">GTM activo</span>
              </div>
            </div>

            <div
              className="absolute -bottom-3 -left-3 bg-[#12122A] border border-[#06B6D4]/40 rounded-xl px-3 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#06B6D4">
                  <path d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" stroke="#06B6D4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span className="text-xs font-bold text-white">Tracking listo</span>
              </div>
            </div>

            <div
              className="absolute top-1/2 -left-4 -translate-y-1/2 bg-[#12122A] border border-[#25D366]/40 rounded-xl px-3 py-2 shadow-lg"
            >
              <div className="flex items-center gap-2">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
                </svg>
                <span className="text-xs font-bold text-white">WA integrado</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Feature list */}
          <div className="space-y-5">
            <div className="space-y-4">
              {[
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/>
                    </svg>
                  ),
                  title: 'Landing diseñada para tu rubro',
                  desc: 'Estructura, copy y llamadas a la acción pensados para convertir visitas en leads de tu industria.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                  ),
                  title: 'GTM + Meta Pixel + conversiones Google',
                  desc: 'Todo el tracking instalado y verificado. Sabes exactamente qué campañas generan leads.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                    </svg>
                  ),
                  title: 'Google Ads o Meta Ads configurado',
                  desc: 'Estructura de campaña lista para activar. No arrancas desde cero ni pierdes plata tanteando.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                    </svg>
                  ),
                  title: 'WhatsApp + formulario activos',
                  desc: 'Dos canales de contacto funcionando. Los leads llegan a tu WhatsApp y a tu correo.',
                },
                {
                  icon: (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
                    </svg>
                  ),
                  title: 'Entrega en 5–7 días hábiles',
                  desc: 'Todo listo para activar campañas la misma semana. Sin esperas de meses.',
                },
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-0.5">{item.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <a
                href="#precios"
                className="inline-flex items-center gap-2 gradient-bg text-white font-bold px-6 py-3.5 rounded-xl hover:opacity-90 transition-all duration-200 hover:shadow-glow-purple text-sm"
              >
                Ver precios del setup completo →
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
