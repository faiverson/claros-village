import { Navbar } from '@/components/Navbar'
import Hero from '@/components/Hero'
import Footer from '@/components/Footer'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const navLinks = [
  { href: '#home', label: 'Inicio' },
  { href: '#nosotros', label: 'Servicios' },
  { href: '#map', label: 'Mapa' },
  { href: '#contact', label: 'Contacto' },
]

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <Navbar user={session?.user || null} links={navLinks} />
      </header>
      <main className="flex-grow overflow-auto">
        <Hero />
      </main>
      <Footer />
    </div>
  )
}
