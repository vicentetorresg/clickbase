const stats = [
  { value: '7 días', label: 'Entrega del setup completo' },
  { value: '+20', label: 'PYMEs atendidas' },
  { value: '1er mes', label: 'Para ver los primeros clientes' },
  { value: 'WhatsApp', label: 'Soporte directo, sin intermediarios' },
]

export default function TrustBar() {
  return (
    <div className="border-y border-brand-purple/20 bg-dark-card/60 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-brand-purple/20">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center md:px-8">
              <span className="text-3xl font-extrabold text-white mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-slate-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
