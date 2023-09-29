import './globals.css'
import type { Metadata } from 'next'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Lato, Satisfy } from 'next/font/google'
import Header from 'components/layout/header';

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
  title: 'Barrio Claros Village',
  description: 'Información relevante al barrio Claros Village de la ciudad de Córdoba',
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
