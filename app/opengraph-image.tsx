import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'ClickBase — Página Web + Ads + Tracking'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0d0d14',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Fondo degradado sutil */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Logo */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '32px',
          }}
        >
          <span style={{ fontSize: '52px' }}>⚡</span>
          <span
            style={{
              fontSize: '52px',
              fontWeight: '800',
              background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            ClickBase
          </span>
        </div>

        {/* Título principal */}
        <div
          style={{
            fontSize: '42px',
            fontWeight: '700',
            color: '#ffffff',
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '900px',
            marginBottom: '24px',
          }}
        >
          Página web + Ads + Tracking completo
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: '24px',
            color: '#94a3b8',
            textAlign: 'center',
            maxWidth: '700px',
            marginBottom: '48px',
          }}
        >
          Base lista para captar clientes desde el día uno
        </div>

        {/* Pills */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Landing page', 'Google & Meta Ads', 'GTM + Pixel'].map((tag) => (
            <div
              key={tag}
              style={{
                background: 'rgba(139,92,246,0.12)',
                border: '1px solid rgba(139,92,246,0.3)',
                borderRadius: '999px',
                padding: '10px 24px',
                fontSize: '18px',
                color: '#c4b5fd',
                fontWeight: '600',
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL abajo */}
        <div
          style={{
            position: 'absolute',
            bottom: '32px',
            fontSize: '18px',
            color: '#475569',
            letterSpacing: '0.05em',
          }}
        >
          clickbase.cl
        </div>
      </div>
    ),
    { ...size }
  )
}
