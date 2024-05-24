import { Providers } from '@/app/providers'
import Header from '@/components/layout/header'
import { auth } from '@/src/auth'
import { Metadata, Viewport } from 'next'
import { SessionProvider } from 'next-auth/react'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getMessages } from 'next-intl/server'
import { NextFontWithVariable } from 'next/dist/compiled/@next/font'
import { Lato, Satisfy } from 'next/font/google'
import './globals.css'

const lato: NextFontWithVariable = Lato({
  weight: ['100', '300', '400', '700', '900'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-lato',
})

const satisfy: NextFontWithVariable = Satisfy({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-satisfy',
})

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'green' },
  ],
}

export const metadata: Metadata = {
  title: {
    template: '%s | Claros Village',
    default: 'Barrio Claros Village',
  },
  keywords: ['Claros', 'Claros Village', 'barrio', 'barrio claros village'],
  description:
    'Información relevante al barrio Claros Village de la ciudad de Córdoba',
  authors: [{ name: 'Fabian Torres' }],
  creator: 'Fabian Torres',
  publisher: 'Fabian Torres',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const runtime = 'nodejs'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const locale = await getLocale()

  const messages = await getMessages()

  const session = await auth()

  return (
    <html lang={locale} className={`${lato.variable} ${satisfy.variable}`}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <SessionProvider session={session}>
              <main className="flex min-h-screen flex-col">
                <div className="absolute z-0 hidden h-16 w-full bg-foreground lg:block lg:h-80" />
                <Header />
                <div className="lg:main-box-shadow content relative flex-grow bg-white lg:mx-auto lg:mt-2 lg:h-24 lg:max-w-screen-xl">
                  {children}
                </div>
              </main>
              {/* <ScrollToTopButton /> */}
            </SessionProvider>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
