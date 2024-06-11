'use client'

import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  DocumentPlusIcon,
} from '@heroicons/react/24/outline'
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'
import UserProfile from '../base/UserProfile'
import { Session } from 'next-auth'

export default function Header({session}: {session: Session}) {
  const t = useTranslations('Header')

  const userNavigation = useMemo(
    () => [
      {
        name: 'Información',
        href: '/',
        icon: InformationCircleIcon,
        show: true,
      },
      {
        name: 'Reglamentos',
        href: '/reglamentos',
        icon: BookOpenIcon,
        show: !!session,
      },
      {
        name: 'Reservas',
        href: '/reservas',
        icon: CalendarDaysIcon,
        show: !!session,
      },
      {
        name: 'Loguearse',
        href: '/login',
        icon: ArrowRightIcon,
        show: !session,
      },
      {
        name: 'Registrarse',
        href: '/register',
        icon: DocumentPlusIcon,
        show: !session,
      },
    ],
    [session],
  )

  const pathname = usePathname()

  return (
    <Navbar className="bg-main-foreground">
      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand className="flex w-16 flex-shrink-0 items-center lg:h-[96px] lg:w-[122px]">
          <Link href="/">
            <Image
              src="/img/logo.png"
              alt="Claros Village"
              quality={100}
              priority
              width={132}
              height={96}
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-4 sm:flex" justify="end">
        {userNavigation
          .filter((item) => item.show)
          .map((item) => {
            const IconNav = item.icon
            return (
              <NavbarItem key={item.href}>
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-button ${pathname === item.href ? 'active' : ''}`}
                >
                  <IconNav className="nav-icon" />
                  <span>{item.name}</span>
                </Link>
              </NavbarItem>
            )
          })}
        {!!session && (
          <NavbarItem>
            <UserProfile />
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="end">
        <NavbarMenuToggle />
        {!!session && (
          <NavbarItem>
            <UserProfile />
          </NavbarItem>
        )}
      </NavbarContent>

      <NavbarMenu className="gap-0 p-0">
        {userNavigation
          .filter((item) => item.show)
          .map((item) => {
            const IconNav = item.icon
            return (
              <NavbarMenuItem key={item.href} className="bg-main-foreground">
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link-button ${pathname === item.href ? 'active' : ''}`}
                >
                  <IconNav className="nav-icon" />
                  <span>{item.name}</span>
                </Link>
              </NavbarMenuItem>
            )
          })}
      </NavbarMenu>
    </Navbar>
  )
}
