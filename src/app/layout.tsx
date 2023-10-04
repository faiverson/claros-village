import './globals.css'
import type { Metadata } from 'next'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Lato, Satisfy } from 'next/font/google'
import Header from 'components/layout/header'

const lato: NextFontWithVariable = Lato({
  weight: ['100', '300', "400", "700", "900"],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
})

const satisfy: NextFontWithVariable = Satisfy({
  weight: ["400"],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satisfy',
})


export const metadata: Metadata = {
  title: {
    template: '%s | Claros Village',
    default: 'Barrio Claros Village'
  },
  keywords: ['Claros', 'Claros Village', 'barrio', 'barrio claros village'],
  description: 'Información relevante al barrio Claros Village de la ciudad de Córdoba',
  authors: [{ name: 'Fabian Torres' }],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'green' },
  ],
  creator: 'Fabian Torres',
  publisher: 'Fabian Torres',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  }) {
  return (
    <html lang="es" className={`${lato.variable} ${satisfy.variable}`}>
      <body>
        <main className="flex min-h-screen flex-col items-center">
          <div className='bg-foreground absolute h-80 w-full z-0' />
          <Header />
          <div className='wrapper'>{children}</div>
        </main>
      </body>
    </html>
  )
}
