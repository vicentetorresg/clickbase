import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Página Web + Google Ads + Tracking | ClickBase',
  description:
    'Landing page de alta conversión + Google Ads o Meta Ads + GTM + Meta Pixel. Setup desde $699.990 + IVA. Base lista para captar leads. ClickBase.',
  metadataBase: new URL('https://clickbase.cl'),
  openGraph: {
    title: 'Página Web + Google Ads + Tracking | ClickBase',
    description:
      'Landing page de alta conversión + Google Ads o Meta Ads + GTM + Meta Pixel. Setup desde $699.990 + IVA. Base lista para captar leads.',
    type: 'website',
    locale: 'es_CL',
    url: 'https://clickbase.cl',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'ClickBase — Página Web + Ads + Tracking' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Página Web + Google Ads + Tracking | ClickBase',
    description:
      'Landing page de alta conversión + Google Ads o Meta Ads + GTM + Meta Pixel. Setup desde $699.990 + IVA.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className={inter.variable}>
      <head>
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-N5F5GG9S');` }} />
        {/* End Google Tag Manager */}
      </head>
      <body className="bg-dark text-white antialiased">
        {/* Google Tag Manager (noscript) */}
        <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N5F5GG9S" height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe></noscript>
        {/* End Google Tag Manager (noscript) */}
        {children}
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','1241207074763520');fbq('track','PageView');` }}
        />
        {/* End Meta Pixel */}
      </body>
    </html>
  )
}
