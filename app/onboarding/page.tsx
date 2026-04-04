'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import Link from 'next/link'

// ─── Types ────────────────────────────────────────────────────────────────────

type FormData = {
  // Step 1 — Datos legales
  nombre_rep_legal: string
  rut_rep_legal: string
  razon_social: string
  rut_empresa: string
  nombre_comercial: string

  // Step 2 — Negocio
  email: string
  telefono: string
  descripcion_negocio: string
  ciudad_operacion: string
  ticket_promedio: string
  buyer_persona: string
  competidores: string
  sitio_web_actual: string
  redes_sociales: string

  // Step 3 — Objetivos
  objetivos: string
  presupuesto_publicidad: string
  meta_leads_mes: string

  // Step 4 — Marketing actual
  tiene_meta_ads: boolean
  tiene_google_ads: boolean
  ha_hecho_anuncios: boolean
  plataformas_anteriores: string[]
  resultados_anteriores: string
  tiene_google_analytics: boolean
  tiene_meta_pixel: boolean
  tiene_gtm: boolean

  // Step 5 — Diseño
  estilos_diseno: string[]
  estilo_otro: string
  tiene_branding: boolean
  colores_tipografias: string
  tiene_imagenes: boolean
  web_referencia: string

  // Adicional
  info_adicional: string
}

const initialData: FormData = {
  nombre_rep_legal: '',
  rut_rep_legal: '',
  razon_social: '',
  rut_empresa: '',
  nombre_comercial: '',
  email: '',
  telefono: '',
  descripcion_negocio: '',
  ciudad_operacion: '',
  ticket_promedio: '',
  buyer_persona: '',
  competidores: '',
  sitio_web_actual: '',
  redes_sociales: '',
  objetivos: '',
  presupuesto_publicidad: '',
  meta_leads_mes: '',
  tiene_meta_ads: false,
  tiene_google_ads: false,
  ha_hecho_anuncios: false,
  plataformas_anteriores: [],
  resultados_anteriores: '',
  tiene_google_analytics: false,
  tiene_meta_pixel: false,
  tiene_gtm: false,
  estilos_diseno: [],
  estilo_otro: '',
  tiene_branding: false,
  colores_tipografias: '',
  tiene_imagenes: false,
  web_referencia: '',
  info_adicional: '',
}

const STEPS = [
  { number: 1, label: 'Datos legales' },
  { number: 2, label: 'Tu negocio' },
  { number: 3, label: 'Objetivos' },
  { number: 4, label: 'Marketing' },
  { number: 5, label: 'Diseño' },
]

const PLATAFORMAS = ['Meta Ads (Facebook/Instagram)', 'Google Ads', 'TikTok Ads', 'LinkedIn Ads', 'Otro']

const ESTILOS_DISENO = [
  'Minimalista / Limpio',
  'Oscuro (Dark mode)',
  'Claro y profesional',
  'Colores vivos y llamativo',
  'Corporativo / Institucional',
  'Con fotos de personas reales',
  'Con ilustraciones / vectores',
  'Similar a una marca de referencia',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatRut(value: string) {
  const clean = value.replace(/[^0-9kK]/g, '').toUpperCase()
  if (clean.length <= 1) return clean
  const body = clean.slice(0, -1)
  const dv = clean.slice(-1)
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
  return `${formatted}-${dv}`
}

// ─── Input Components ─────────────────────────────────────────────────────────

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  required,
  hint,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
  required?: boolean
  hint?: string
}) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1.5 font-medium">
        {label}
        {required && <span className="text-brand-purple-light ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-slate-500 mb-2">{hint}</p>}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none transition-colors"
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  required,
  hint,
  rows = 3,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  required?: boolean
  hint?: string
  rows?: number
}) {
  return (
    <div>
      <label className="block text-sm text-slate-300 mb-1.5 font-medium">
        {label}
        {required && <span className="text-brand-purple-light ml-1">*</span>}
      </label>
      {hint && <p className="text-xs text-slate-500 mb-2">{hint}</p>}
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none transition-colors resize-none"
      />
    </div>
  )
}

function Toggle({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
  hint?: string
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`w-full text-left rounded-xl p-4 border transition-all duration-200 ${
        checked ? 'border-brand-purple bg-brand-purple/10' : 'border-slate-700 bg-dark hover:border-slate-500'
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">{label}</p>
          {hint && <p className="text-xs text-slate-500 mt-0.5">{hint}</p>}
        </div>
        <div
          className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
            checked ? 'gradient-bg' : 'bg-slate-700'
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              checked ? 'translate-x-5' : 'translate-x-0.5'
            }`}
          />
        </div>
      </div>
    </button>
  )
}

function CheckboxGroup({
  options,
  selected,
  onChange,
}: {
  options: string[]
  selected: string[]
  onChange: (v: string[]) => void
}) {
  const toggle = (opt: string) => {
    if (selected.includes(opt)) {
      onChange(selected.filter((s) => s !== opt))
    } else {
      onChange([...selected, opt])
    }
  }
  return (
    <div className="grid sm:grid-cols-2 gap-2">
      {options.map((opt) => {
        const active = selected.includes(opt)
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className={`text-left rounded-xl px-4 py-3 border text-sm transition-all duration-200 flex items-center gap-2.5 ${
              active ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-slate-700 bg-dark text-slate-400 hover:border-slate-500'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center ${
                active ? 'gradient-bg border-transparent' : 'border-slate-600'
              }`}
            >
              {active && (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

// ─── Step Components ──────────────────────────────────────────────────────────

function Step1({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Datos legales</h2>
        <p className="text-sm text-slate-400">Necesitamos estos datos para emitir la boleta/factura y formalizar el trabajo.</p>
      </div>
      <Input
        label="Nombre completo del representante legal"
        value={data.nombre_rep_legal}
        onChange={(v) => setData({ ...data, nombre_rep_legal: v })}
        placeholder="Ej: María González Pérez"
        required
      />
      <Input
        label="RUT del representante legal"
        value={data.rut_rep_legal}
        onChange={(v) => setData({ ...data, rut_rep_legal: formatRut(v) })}
        placeholder="Ej: 12.345.678-9"
        required
      />
      <Input
        label="Razón social"
        value={data.razon_social}
        onChange={(v) => setData({ ...data, razon_social: v })}
        placeholder="Ej: González y Asociados SpA"
        required
      />
      <Input
        label="RUT de la empresa"
        value={data.rut_empresa}
        onChange={(v) => setData({ ...data, rut_empresa: formatRut(v) })}
        placeholder="Ej: 76.543.210-K"
        required
      />
      <Input
        label="Nombre comercial"
        value={data.nombre_comercial}
        onChange={(v) => setData({ ...data, nombre_comercial: v })}
        placeholder="Ej: MiMarca (si es distinto a la razón social)"
        hint="Déjalo en blanco si es el mismo que la razón social"
      />
    </div>
  )
}

function Step2({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Tu negocio</h2>
        <p className="text-sm text-slate-400">Cuéntanos sobre tu empresa para entender bien tu contexto.</p>
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Correo de contacto"
          value={data.email}
          onChange={(v) => setData({ ...data, email: v })}
          placeholder="nombre@empresa.cl"
          type="email"
          required
        />
        <Input
          label="Teléfono"
          value={data.telefono}
          onChange={(v) => setData({ ...data, telefono: v })}
          placeholder="+56 9 XXXX XXXX"
          type="tel"
        />
      </div>
      <Textarea
        label="¿Qué producto o servicio ofrecen?"
        value={data.descripcion_negocio}
        onChange={(v) => setData({ ...data, descripcion_negocio: v })}
        placeholder="Ej: Somos una clínica dental que ofrece ortodoncia, blanqueamiento y limpieza dental para adultos y niños..."
        required
        rows={3}
      />
      <div className="grid sm:grid-cols-2 gap-5">
        <Input
          label="Ciudad / Región donde operan"
          value={data.ciudad_operacion}
          onChange={(v) => setData({ ...data, ciudad_operacion: v })}
          placeholder="Ej: Santiago, o 'Todo Chile (online)'"
        />
        <Input
          label="Precio promedio de tu servicio/producto"
          value={data.ticket_promedio}
          onChange={(v) => setData({ ...data, ticket_promedio: v })}
          placeholder="Ej: $150.000 por sesión"
          hint="Ayuda a calibrar el presupuesto de ads"
        />
      </div>
      <Textarea
        label="Describe a tu cliente ideal (buyer persona)"
        value={data.buyer_persona}
        onChange={(v) => setData({ ...data, buyer_persona: v })}
        placeholder="Ej: Mujeres de 30-50 años, profesionales, de Santiago, que buscan mejorar su sonrisa para sentirse más seguras. Les importa la calidad y el precio justo..."
        required
        rows={4}
        hint="¿Quién te compra? ¿Qué edad tiene? ¿Qué le importa? ¿Dónde vive?"
      />
      <Input
        label="¿Quiénes son tus principales competidores?"
        value={data.competidores}
        onChange={(v) => setData({ ...data, competidores: v })}
        placeholder="Ej: Clínica XYZ, Centro Dental ABC..."
        hint="Opcional — ayuda a hacer un benchmark antes de crear los anuncios"
      />
      <Input
        label="Sitio web actual (si tienes)"
        value={data.sitio_web_actual}
        onChange={(v) => setData({ ...data, sitio_web_actual: v })}
        placeholder="https://www.tuempresa.cl"
      />
      <Input
        label="Redes sociales (si tienes)"
        value={data.redes_sociales}
        onChange={(v) => setData({ ...data, redes_sociales: v })}
        placeholder="Ej: @tuempresa en Instagram, facebook.com/tuempresa"
      />
    </div>
  )
}

function Step3({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Objetivos y presupuesto</h2>
        <p className="text-sm text-slate-400">¿Qué quieres lograr y con cuánto estás dispuesto a invertir en publicidad?</p>
      </div>
      <Textarea
        label="¿Qué quisieras lograr con este proyecto?"
        value={data.objetivos}
        onChange={(v) => setData({ ...data, objetivos: v })}
        placeholder="Ej: Quiero generar al menos 20 leads calificados al mes para mi clínica dental. También quiero tener una página web profesional que transmita confianza..."
        required
        rows={4}
        hint="Sé específico: más llamadas, más clientes online, más reconocimiento de marca, etc."
      />
      <Input
        label="¿Cuánto invertirías al mes en publicidad (Google/Meta)?"
        value={data.presupuesto_publicidad}
        onChange={(v) => setData({ ...data, presupuesto_publicidad: v })}
        placeholder="Ej: $200.000/mes"
        hint="Este dinero se paga directamente a Google o Meta, no a ClickBase. Sin presupuesto no pueden correr anuncios."
      />
      <Input
        label="¿Cuántos leads nuevos quisieras generar al mes?"
        value={data.meta_leads_mes}
        onChange={(v) => setData({ ...data, meta_leads_mes: v })}
        placeholder="Ej: 20 consultas al mes"
        hint="Opcional — ayuda a dimensionar la campaña correctamente"
      />
    </div>
  )
}

function Step4({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Marketing actual</h2>
        <p className="text-sm text-slate-400">Cuéntanos qué tienes hoy para saber desde dónde partimos.</p>
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-300 font-medium">¿Tienes cuenta creada en estas plataformas?</p>
        <Toggle
          label="Cuenta de Meta Ads (Facebook/Instagram)"
          checked={data.tiene_meta_ads}
          onChange={(v) => setData({ ...data, tiene_meta_ads: v })}
          hint="Administrador de anuncios de Facebook/Instagram"
        />
        <Toggle
          label="Cuenta de Google Ads"
          checked={data.tiene_google_ads}
          onChange={(v) => setData({ ...data, tiene_google_ads: v })}
        />
      </div>

      <div className="space-y-2">
        <p className="text-sm text-slate-300 font-medium">¿Tienes instalado alguno de estos?</p>
        <Toggle
          label="Google Tag Manager"
          checked={data.tiene_gtm}
          onChange={(v) => setData({ ...data, tiene_gtm: v })}
        />
        <Toggle
          label="Meta Pixel (Pixel de Facebook)"
          checked={data.tiene_meta_pixel}
          onChange={(v) => setData({ ...data, tiene_meta_pixel: v })}
        />

      </div>

      <div className="space-y-3">
        <Toggle
          label="¿Has hecho anuncios pagados antes?"
          checked={data.ha_hecho_anuncios}
          onChange={(v) => setData({ ...data, ha_hecho_anuncios: v, plataformas_anteriores: v ? data.plataformas_anteriores : [] })}
        />
        {data.ha_hecho_anuncios && (
          <div className="space-y-3 pl-4 border-l-2 border-brand-purple/30">
            <div>
              <p className="text-sm text-slate-300 font-medium mb-2">¿En qué plataformas?</p>
              <CheckboxGroup
                options={PLATAFORMAS}
                selected={data.plataformas_anteriores}
                onChange={(v) => setData({ ...data, plataformas_anteriores: v })}
              />
            </div>
            <Textarea
              label="¿Qué resultados obtuviste?"
              value={data.resultados_anteriores}
              onChange={(v) => setData({ ...data, resultados_anteriores: v })}
              placeholder="Ej: Tuve buenos resultados con Meta Ads durante 6 meses, pero después el costo por lead subió mucho. Con Google nunca logré que funcionara..."
              rows={3}
            />
          </div>
        )}
      </div>
    </div>
  )
}

function Step5({ data, setData }: { data: FormData; setData: (d: FormData) => void }) {
  const otroSeleccionado = data.estilos_diseno.includes('Otro')
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Diseño de tu landing</h2>
        <p className="text-sm text-slate-400">Ayúdanos a entender la estética que buscas para tu página.</p>
      </div>

      <div>
        <p className="text-sm text-slate-300 font-medium mb-2">
          ¿Qué estilos de diseño te gustan? <span className="text-slate-500 font-normal">(puedes elegir varios)</span>
        </p>
        <CheckboxGroup
          options={ESTILOS_DISENO}
          selected={data.estilos_diseno}
          onChange={(v) => setData({ ...data, estilos_diseno: v })}
        />
        {/* Otro */}
        <div className="mt-2">
          <button
            type="button"
            onClick={() => {
              if (otroSeleccionado) {
                setData({ ...data, estilos_diseno: data.estilos_diseno.filter((s) => s !== 'Otro'), estilo_otro: '' })
              } else {
                setData({ ...data, estilos_diseno: [...data.estilos_diseno, 'Otro'] })
              }
            }}
            className={`text-left rounded-xl px-4 py-3 border text-sm transition-all duration-200 flex items-center gap-2.5 w-full ${
              otroSeleccionado ? 'border-brand-purple bg-brand-purple/10 text-white' : 'border-slate-700 bg-dark text-slate-400 hover:border-slate-500'
            }`}
          >
            <span
              className={`w-4 h-4 rounded-sm border flex-shrink-0 flex items-center justify-center ${
                otroSeleccionado ? 'gradient-bg border-transparent' : 'border-slate-600'
              }`}
            >
              {otroSeleccionado && (
                <svg width="8" height="8" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </span>
            Otro
          </button>
          {otroSeleccionado && (
            <input
              type="text"
              value={data.estilo_otro}
              onChange={(e) => setData({ ...data, estilo_otro: e.target.value })}
              placeholder="Describe el estilo que buscas..."
              className="mt-2 w-full bg-dark border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm focus:border-brand-purple focus:ring-2 focus:ring-brand-purple/20 focus:outline-none transition-colors"
            />
          )}
        </div>
      </div>

      <div className="space-y-3">
        <Toggle
          label="¿Tienes branding definido?"
          checked={data.tiene_branding}
          onChange={(v) => setData({ ...data, tiene_branding: v, colores_tipografias: v ? data.colores_tipografias : '' })}
          hint="Logo, colores de marca, tipografías, etc."
        />
        {data.tiene_branding && (
          <div className="pl-4 border-l-2 border-brand-purple/30">
            <Textarea
              label="Describe tus colores y tipografías"
              value={data.colores_tipografias}
              onChange={(v) => setData({ ...data, colores_tipografias: v })}
              placeholder="Ej: Colores: azul marino (#1A2B4C) y dorado (#C9A84C). Fuente: Montserrat. Logo disponible en SVG."
              rows={2}
            />
          </div>
        )}
      </div>

      <Toggle
        label="¿Tienes imágenes o videos propios para usar?"
        checked={data.tiene_imagenes}
        onChange={(v) => setData({ ...data, tiene_imagenes: v })}
        hint="Fotos del local, del equipo, de los productos/servicios, etc."
      />

      <Input
        label="¿Hay algún sitio web que te guste como referencia?"
        value={data.web_referencia}
        onChange={(v) => setData({ ...data, web_referencia: v })}
        placeholder="https://www.ejemplo.com"
        hint="Opcional — nos ayuda a entender tu gusto visual"
      />

      <Textarea
        label="¿Algo más que quieras contarnos?"
        value={data.info_adicional}
        onChange={(v) => setData({ ...data, info_adicional: v })}
        placeholder="Cualquier cosa adicional que creas importante: restricciones, preferencias, comentarios, preguntas..."
        rows={3}
      />
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const [sending, setSending] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const canAdvance = () => {
    if (step === 1) {
      return (
        data.nombre_rep_legal.trim() &&
        data.rut_rep_legal.trim() &&
        data.razon_social.trim() &&
        data.rut_empresa.trim()
      )
    }
    if (step === 2) {
      return data.email.trim() && data.descripcion_negocio.trim() && data.buyer_persona.trim()
    }
    if (step === 3) {
      return data.objetivos.trim()
    }
    return true
  }

  const handleSubmit = async () => {
    setSending(true)
    setError('')
    try {
      const { error: sbError } = await supabase.from('onboardings').insert({
        nombre_rep_legal: data.nombre_rep_legal,
        rut_rep_legal: data.rut_rep_legal,
        razon_social: data.razon_social,
        rut_empresa: data.rut_empresa,
        nombre_comercial: data.nombre_comercial || null,
        email: data.email,
        telefono: data.telefono || null,
        descripcion_negocio: data.descripcion_negocio,
        ciudad_operacion: data.ciudad_operacion || null,
        ticket_promedio: data.ticket_promedio || null,
        buyer_persona: data.buyer_persona,
        competidores: data.competidores || null,
        sitio_web_actual: data.sitio_web_actual || null,
        redes_sociales: data.redes_sociales || null,
        objetivos: data.objetivos,
        presupuesto_publicidad: data.presupuesto_publicidad || null,
        meta_leads_mes: data.meta_leads_mes || null,
        tiene_meta_ads: data.tiene_meta_ads,
        tiene_google_ads: data.tiene_google_ads,
        ha_hecho_anuncios: data.ha_hecho_anuncios,
        plataformas_anteriores: data.plataformas_anteriores,
        resultados_anteriores: data.resultados_anteriores || null,
        tiene_google_analytics: data.tiene_google_analytics,
        tiene_meta_pixel: data.tiene_meta_pixel,
        tiene_gtm: data.tiene_gtm,
        estilos_diseno: data.estilos_diseno,
        estilo_otro: data.estilo_otro || null,
        tiene_branding: data.tiene_branding,
        colores_tipografias: data.colores_tipografias || null,
        tiene_imagenes: data.tiene_imagenes,
        web_referencia: data.web_referencia || null,
        info_adicional: data.info_adicional || null,
      })
      if (sbError) throw sbError
      setDone(true)
    } catch (e: unknown) {
      setError('Hubo un error al enviar el formulario. Por favor intenta de nuevo o escríbenos por WhatsApp.')
      console.error(e)
    } finally {
      setSending(false)
    }
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (done) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full gradient-bg flex items-center justify-center text-4xl mx-auto mb-6 shadow-glow-purple">
            ✓
          </div>
          <h1 className="text-2xl font-extrabold text-white mb-3">¡Formulario enviado!</h1>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Recibimos toda tu información. Nos pondremos en contacto contigo a la brevedad para coordinar los siguientes pasos.
          </p>
          <a
            href="https://wa.me/56955350255?text=Hola%2C%20acabo%20de%20completar%20el%20formulario%20de%20onboarding.%20%C2%BFMe%20pueden%20confirmar%20que%20lo%20recibieron%3F"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-200 mb-4"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.848L.057 23.5c-.07.27.057.553.298.634.068.024.139.035.208.035.177 0 .35-.074.474-.212l5.792-5.792A11.94 11.94 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.817 9.817 0 01-5.217-1.494L3.5 22l1.703-3.2A9.78 9.78 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z"/>
            </svg>
            Confirmar por WhatsApp
          </a>
          <div>
            <Link href="/" className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    )
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <div className="border-b border-white/5 px-4 sm:px-6 py-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-xl">⚡</span>
            <span className="font-bold gradient-text">ClickBase</span>
          </Link>
          <span className="text-slate-500 text-sm">Onboarding cliente</span>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10">

        {/* Step indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-4">
            {STEPS.map((s, i) => (
              <div key={s.number} className="flex items-center flex-1">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step > s.number
                        ? 'gradient-bg text-white'
                        : step === s.number
                        ? 'border-2 border-brand-purple text-brand-purple-light bg-brand-purple/10'
                        : 'border border-slate-700 text-slate-600'
                    }`}
                  >
                    {step > s.number ? (
                      <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    ) : (
                      s.number
                    )}
                  </div>
                  <span
                    className={`text-xs mt-1.5 font-medium hidden sm:block ${
                      step >= s.number ? 'text-slate-300' : 'text-slate-600'
                    }`}
                  >
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-2 transition-colors duration-300 ${
                      step > s.number ? 'gradient-bg' : 'bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Mobile step label */}
          <p className="text-center text-sm text-brand-purple-light font-medium sm:hidden">
            {STEPS[step - 1]?.label}
          </p>
          {/* Progress bar */}
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-4">
            <div
              className="h-full gradient-bg rounded-full transition-all duration-500"
              style={{ width: `${(step / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="card-dark rounded-2xl p-6 sm:p-8 mb-6">
          {step === 1 && <Step1 data={data} setData={setData} />}
          {step === 2 && <Step2 data={data} setData={setData} />}
          {step === 3 && <Step3 data={data} setData={setData} />}
          {step === 4 && <Step4 data={data} setData={setData} />}
          {step === 5 && <Step5 data={data} setData={setData} />}
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-sm text-red-400">
            ⚠️ {error}
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center gap-3">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 border border-slate-600 text-slate-300 font-semibold py-3.5 rounded-xl text-sm hover:border-slate-400 hover:bg-white/5 transition-all duration-200"
            >
              ← Anterior
            </button>
          )}
          {step < STEPS.length ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!canAdvance()}
              className={`flex-1 font-bold py-3.5 rounded-xl text-sm transition-all duration-200 ${
                canAdvance()
                  ? 'gradient-bg text-white hover:opacity-90 hover:shadow-glow-purple'
                  : 'bg-slate-800 text-slate-600 cursor-not-allowed'
              }`}
            >
              Siguiente →
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              disabled={sending}
              className={`flex-1 font-bold py-3.5 rounded-xl text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
                sending
                  ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  : 'gradient-bg text-white hover:opacity-90 hover:shadow-glow-purple'
              }`}
            >
              {sending ? (
                <>
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Enviando...
                </>
              ) : (
                'Enviar formulario ✓'
              )}
            </button>
          )}
        </div>

        <p className="text-center text-xs text-slate-600 mt-6">
          Paso {step} de {STEPS.length} · Los campos con <span className="text-brand-purple-light">*</span> son obligatorios
        </p>
      </div>
    </div>
  )
}
