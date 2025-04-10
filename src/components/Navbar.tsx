'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import { UserDropdownMenu } from '@/components/UserDropdownMenu'
import { Session } from 'next-auth'
import { Logo } from '@/components/ui/logo'
import { usePathname } from 'next/navigation'

interface NavLink {
  href: string
  label: string
}

interface NavbarProps {
  user: Session['user'] | null
  links: NavLink[]
}

export function Navbar({ user, links }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const scrollToSection = useSmoothScroll()
  const pathname = usePathname()
  const isHomePage = pathname === '/'

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    if (isHomePage) {
      scrollToSection(e, anchor)
    }
  }

  const renderLink = (link: NavLink, isMobile?: boolean) => {
    const href = isHomePage ? link.href : `/${link.href}`
    const baseClasses = isMobile
      ? 'block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50'
      : 'text-xs font-medium hover:text-primary-500'

    return (
      <Link
        key={link.href}
        href={href}
        className={baseClasses}
        onClick={(e) => {
          handleNavClick(e, link.href)
          if (isMobile) setIsMenuOpen(false)
        }}
      >
        {link.label}
      </Link>
    )
  }

  return (
    <nav className="w-full">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Logo href={user ? '/' : '#home'} />

        {/* Mobile menu button */}
        <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5 text-primary-500" /> : <Menu className="h-5 w-5 text-primary-500" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          {links && links.map((link) => renderLink(link))}
          {user ? (
            <UserDropdownMenu user={user} />
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/auth/signin">
                <button className="text-primary-500 hover:text-primary-600 text-xs h-7 px-3">Iniciar Sesión</button>
              </Link>
              <Link href="/auth/register">
                <button className="bg-primary-500 text-white hover:bg-primary-600 text-xs h-7 px-3 rounded">Registrarse</button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {links.map((link) => renderLink(link, true))}
            {user ? (
              <div className="px-3 py-2">
                <UserDropdownMenu user={user} />
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Link href="/auth/signin" className="w-full">
                  <button className="w-full text-base font-medium text-primary-500 hover:text-primary-600">Iniciar Sesión</button>
                </Link>
                <Link href="/auth/register" className="w-full">
                  <button className="w-full bg-primary-500 text-white hover:bg-primary-600 text-base rounded">Registrarse</button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
