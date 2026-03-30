'use client'

import Navigation from '@/components/Navigation'
import Hero from '@/components/Hero'
import TrustBar from '@/components/TrustBar'
import Problem from '@/components/Problem'
import Solution from '@/components/Solution'
import WhatIncludes from '@/components/WhatIncludes'
import Pricing from '@/components/Pricing'
import HowItWorks from '@/components/HowItWorks'
import WhoIsItFor from '@/components/WhoIsItFor'
import Benefits from '@/components/Benefits'
import Testimonials from '@/components/Testimonials'
import AboutUs from '@/components/AboutUs'
import AboutPreview from '@/components/AboutPreview'
import FAQ from '@/components/FAQ'
import ProductMockup from '@/components/ProductMockup'
import CTAFinal from '@/components/CTAFinal'
import StickyMobileCTA from '@/components/StickyMobileCTA'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-purple/20 bg-dark-card/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚡</span>
              <span className="text-lg font-bold gradient-text">ClickBase</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              Página web + primera campaña + tracking completo. Una base técnica lista para
              captar clientes desde el día uno.
            </p>
            <a
              href="https://wa.me/56994366697?text=Hola%2C%20quiero%20cotizar%20la%20p%C3%A1gina%20web%20%2B%20campa%C3%B1a%20%2B%20tracking.%20%C2%BFMe%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#25D366] hover:text-white transition-colors duration-200 font-medium"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
              </svg>
              Escribir por WhatsApp
            </a>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Navegación</h3>
            <ul className="space-y-3">
              {[
                { label: 'Qué incluye', href: '#incluye' },
                { label: 'Precios', href: '#precios' },
                { label: 'Cómo funciona', href: '#como-funciona' },
                { label: 'Cotizar', href: '#contacto' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Servicios</h3>
            <ul className="space-y-3">
              {['Landing pages de alta conversión', 'Google Ads (Search & Display)', 'Meta Ads (Facebook & Instagram)', 'Google Tag Manager', 'Meta Pixel'].map((service) => (
                <li key={service}>
                  <span className="text-sm text-slate-400 flex items-start gap-2">
                    <span className="text-brand-purple-light mt-0.5 flex-shrink-0">›</span>
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="h-px bg-brand-purple/20 mb-8" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© {currentYear} ClickBase. Todos los derechos reservados.</p>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <span className="w-1.5 h-1.5 rounded-full bg-success inline-block" />
            Sistema activo
          </div>
        </div>
        <div className="mt-6 p-4 bg-dark rounded-xl border border-slate-800">
          <p className="text-xs text-slate-600 leading-relaxed">
            <span className="text-slate-500 font-medium">Aviso:</span> Los resultados de las campañas publicitarias dependen de factores como industria, presupuesto, competencia y estacionalidad. Los precios publicados corresponden al servicio de configuración y no incluyen la inversión publicitaria que se paga directamente a las plataformas (Google, Meta). Los valores indicados no incluyen IVA.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default function InicioPage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <TrustBar />
        <AboutPreview />
        <Problem />
        <Solution />
        <ProductMockup />
        <WhatIncludes />
        <Pricing />
        <HowItWorks />
        <WhoIsItFor />
        <Benefits />
        <Testimonials />
        <AboutUs />
        <FAQ />
        <CTAFinal />
      </main>
      <Footer />
      <StickyMobileCTA />
    </>
  )
}
