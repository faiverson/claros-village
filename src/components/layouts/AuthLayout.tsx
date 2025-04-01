import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Navbar } from '@/components/Navbar'
interface AuthLayoutProps {
  children: React.ReactNode
}

const navLinks = [
  { href: '/#home', label: 'Inicio' },
  { href: '/#nosotros', label: 'Servicios' },
  { href: '/#map', label: 'Mapa' },
  { href: '/#contact', label: 'Contacto' },
]

export async function AuthLayout({ children }: AuthLayoutProps) {
  const session = await getServerSession()

  if (!session) redirect('/')

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <Navbar user={session?.user || null} links={navLinks} />
      </header>
      <main className="flex-1 container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
