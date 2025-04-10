import CommonSpacesNavigation from '@/components/CommonSpacesNavigation'
import * as LucideIcon from 'lucide-react'

export default function EspaciosComunesLayout({ children }: { children: React.ReactNode }) {
  const navItems = [
    {
      title: 'Mis reservas',
      href: '/espacios-comunes/mis-reservas',
      iconName: 'Calendar' as keyof typeof LucideIcon,
    },
    {
      title: 'Nueva reserva',
      href: '/espacios-comunes/nueva-reserva',
      iconName: 'PlusCircle' as keyof typeof LucideIcon,
    },
  ]

  return (
    <>
      <CommonSpacesNavigation navItems={navItems} />
      <main className="p-6">{children}</main>
    </>
  )
}
