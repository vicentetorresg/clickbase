'use client'

import { useOpenWAModal } from '@/components/WAModalProvider'

const includes = [
  {
    icon: '🎨',
    title: 'Diseño y desarrollo de landing',
    description: 'Diseñada con foco en conversión, no solo en estética.',
  },
  {
    icon: '📋',
    title: 'Formulario de contacto',
    description: 'Conectado para recibir leads directamente en tu email o CRM.',
  },
  {
    icon: '💬',
    title: 'Botón a WhatsApp',
    description: 'Integrado y configurado para disparar eventos de conversión.',
  },
  {
    icon: '🏷️',
    title: 'Google Tag Manager',
    description: 'Instalado y configurado como base para todo el tracking.',
  },
  {
    icon: '📊',
    title: 'Meta Pixel',
    description: 'Instalado para medir conversiones y crear audiencias en Facebook e Instagram.',
  },
  {
    icon: '✅',
    title: 'Conversiones configuradas',
    description: 'Envío de formulario y clics en WhatsApp medidos desde el día uno.',
  },
  {
    icon: '🚀',
    title: 'Setup de primera campaña',
    description: 'Estructura inicial de Google Ads o Meta Ads lista para activar.',
  },
  {
    icon: '📱',
    title: 'Versión responsive',
    description: 'Se ve y convierte bien en celular, tablet y desktop.',
  },
]

export default function WhatIncludes() {
  const openModal = useOpenWAModal()

  return (
    <section id="incluye" className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="section-label">Qué incluye</span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mt-4 mb-6 max-w-2xl mx-auto leading-tight">
            Todo lo que incluye el setup de{' '}
            <span className="line-through text-slate-300 font-medium">$999.990 + IVA</span>{' '}
            <span className="gradient-text">$699.990 + IVA</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-6">
            Un solo pago, todo instalado. Sin sorpresas.
          </p>
          <div className="inline-flex items-center gap-3 bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl px-5 py-3">
            <img src="/mercadopago.svg" alt="Mercado Pago" className="h-8 w-auto flex-shrink-0" />
            <div className="text-left">
              <p className="text-xs text-white/60">o en 3 cuotas sin interés de</p>
              <p className="text-xl font-extrabold text-[#25D366] leading-tight">$233.330 <span className="text-sm font-normal text-white/60">+ IVA / cuota</span></p>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mb-10">
          {includes.map((item, index) => (
            <div
              key={index}
              className="card-dark card-dark-hover rounded-2xl p-6 transition-all duration-300 group"
            >
              <span className="text-3xl block mb-4">{item.icon}</span>
              <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Price highlight */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-4 gradient-border rounded-2xl px-8 py-6 w-full max-w-sm">
            <div className="text-center">
              <p className="text-sm text-slate-400 mb-2">Todo lo anterior por</p>
              <div className="flex items-center justify-center gap-2 mb-1">
                <span className="text-base text-slate-400 line-through font-medium">$999.990 + IVA</span>
                <span className="text-xs font-bold text-success bg-success/10 border border-success/25 rounded-full px-2 py-0.5">−30%</span>
              </div>
              <p className="text-5xl font-extrabold gradient-text leading-none mb-1">$699.990</p>
              <p className="text-slate-400 text-base mb-2">+ IVA</p>
              <p className="text-white font-semibold text-sm mb-3">Un solo pago, todo instalado. Sin sorpresas.</p>
            </div>
            <div className="flex items-center gap-3 w-full bg-[#25D366]/10 border border-[#25D366]/30 rounded-xl px-4 py-3">
              <img src="/mercadopago.svg" alt="Mercado Pago" className="h-10 w-auto flex-shrink-0" />
              <div>
                <p className="text-sm text-white/60 mb-0.5">o en 3 cuotas sin interés de</p>
                <p className="text-xl font-extrabold text-[#25D366] leading-tight">$233.330 <span className="text-sm font-normal text-white/70">+ IVA / cuota</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Callout note */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-3 bg-dark-card border border-slate-700 rounded-xl px-5 py-4">
            <span className="text-xl flex-shrink-0 mt-0.5">💡</span>
            <p className="text-sm text-slate-400">
              <span className="font-semibold text-slate-300">¿Necesitas algo más?</span>{' '}
              Los desarrollos adicionales, integraciones especiales y nuevas
              funcionalidades se cotizan por separado según el alcance del proyecto.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-10">
          <button
            onClick={openModal}
            className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-8 py-4 rounded-xl text-base transition-all duration-200"
            style={{ boxShadow: '0 0 20px rgba(37, 211, 102, 0.25)' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z" />
            </svg>
            Cotizar por WhatsApp
          </button>
        </div>
      </div>
    </section>
  )
}
