"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Avatar} from "@nextui-org/react"
import {
  ArrowRightIcon,
  BookOpenIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { signOut } from "@/src/auth";

export default function Header() {
  const { data: session } = useSession()

  const userNavigation = useMemo(() => [
    { name: "Información", href: "/", icon: InformationCircleIcon, show: true },
    // { name: 'Novedades', href: '/novedades', icon: MegaphoneIcon, public: true },
    {
      name: "Reglamentos",
      href: "/reglamentos",
      icon: BookOpenIcon,
      show: !!session,
    },
    {
      name: "Reservas",
      href: "/reservas",
      icon: CalendarDaysIcon,
      show: !!session,
    },
    { name: "Loguearse", href: "/login", icon: ArrowRightIcon, show: !session },
  ], [session]);

  const pathname = usePathname();

  const onLogOut = () =>
    signOut()

  const avatarUrl = !!session && session.user?.image || '';

  console.log('session', session)

  return (
    <header className="text-light container relative bg-foreground lg:mx-auto lg:mt-2 lg:h-24 lg:max-w-screen-xl">

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between lg:h-full">
                <div className="flex w-16 flex-shrink-0 items-center lg:h-[96px] lg:w-[122px]">
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
                </div>
                <div className="flex items-center">
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {userNavigation.filter(item => item.show).map((item) => {
                      const IconNav = item.icon;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`nav-link-button ${pathname === item.href ? "active" : ""}`}
                        >
                          <IconNav className="nav-icon" />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                  {!!session && (
                    <div className="hidden sm:ml-6 sm:flex sm:items-center">
                      {/* Profile dropdown */}
                      <Dropdown>
                        <DropdownTrigger>
                          { avatarUrl ?
                        <Avatar
                              isBordered
                              as="button"
                              className="transition-transform hover:cursor-pointer"
                              src={avatarUrl}
                            />: <UserCircleIcon className="h-10 w-10 rounded-full fill-main-green hover:opacity-50 bg-white hover:cursor-pointer" />
                          }
                        </DropdownTrigger>
                        <DropdownMenu aria-label="Link Actions">
                          <DropdownItem key="morosos" href="/morosos">
                            Morosos
                          </DropdownItem>
                          <DropdownItem key="residentes" href="/residentes">
                            Residentes
                          </DropdownItem>
                          <DropdownItem key="log-out" onClick={onLogOut}>
                            Cerrar Sesión
                          </DropdownItem>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  )}
                </div>
              </div>
            </div>
    </header>
  );
}
