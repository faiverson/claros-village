"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";
// import { useSession, signOut } from 'next-auth/react'
import { Disclosure, Menu, Transition } from "@headlessui/react";
import {
  ArrowRightIcon,
  Bars3Icon,
  BookOpenIcon,
  CalendarDaysIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

const userNavigation = [
  { name: "Información", href: "/", icon: InformationCircleIcon, public: true },
  // { name: 'Novedades', href: '/novedades', icon: MegaphoneIcon, public: true },
  {
    name: "Reglamentos",
    href: "/reglamentos",
    icon: BookOpenIcon,
    public: false,
  },
  {
    name: "Reservas",
    href: "/reservas",
    icon: CalendarDaysIcon,
    public: false,
  },
  { name: "Loguearse", href: "/login", icon: ArrowRightIcon, public: true },
];

export default function Header() {
  // const { data: session } = useSession()
  let session: any = null;

  const pathname = usePathname();

  // const onLogOut = async () => await signOut()
  const onLogOut = async () => {};

  return (
    <header className="text-light container relative bg-foreground lg:mx-auto lg:mt-2 lg:h-24 lg:max-w-screen-xl">
      <Disclosure as="nav" className="shadow lg:shadow-none">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 justify-between lg:h-full">
                <div className="flex w-16 flex-shrink-0 items-center lg:h-[96px] lg:w-[122px]">
                  <Link href="/">
                    <Image
                      src="/img/logo.png"
                      alt="Claros Village"
                      sizes="100vw"
                      quality={100}
                      priority
                      width={132}
                      height={96}
                    />
                  </Link>
                </div>
                <div className="flex items-center">
                  <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                    {userNavigation.map((item) => {
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
                      <Menu as="div" className="relative ml-3">
                        <div>
                          <Menu.Button className="focus:ring-grey-500 relative flex rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">Open user menu</span>
                            <Image
                              src={session.user?.image!}
                              width={60}
                              height={60}
                              className="h-8 w-8 rounded-full hover:opacity-50 lg:h-10 lg:w-10"
                              alt={session.user?.name!}
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute right-0 z-30 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="https://sr.reservas.clarosvillage.org.ar"
                                  className={
                                    active
                                      ? "bg-green-100 text-gray-900"
                                      : "block px-4 py-2 text-sm text-gray-700"
                                  }
                                >
                                  Panel Reservas
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/vecinos"
                                  className={
                                    active
                                      ? "bg-green-100 text-gray-900"
                                      : "block px-4 py-2 text-sm text-gray-700"
                                  }
                                >
                                  Listado Vecinos
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="/morosos"
                                  className={
                                    active
                                      ? "bg-green-100 text-gray-900"
                                      : "block px-4 py-2 text-sm text-gray-700"
                                  }
                                >
                                  Listado Morosos
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  href="#"
                                  className={
                                    active
                                      ? "bg-green-100 text-gray-900 "
                                      : "block px-4 py-2 text-sm text-gray-700"
                                  }
                                  onClick={onLogOut}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  )}
                </div>

                <div className="-mr-2 flex items-center sm:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="bg-main-green-light text-main-green-dark hover:text-main-green  relative inline-flex items-center justify-center rounded-md  p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            {/* Mobile version */}
            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 pb-3 pt-2">
                {userNavigation.map((item) => {
                  return (
                    <Disclosure.Button
                      key={item.href}
                      as="a"
                      href={item.href}
                      className={`nav-link-button ${pathname === item.href ? "active" : ""}`}
                    >
                      {item.name}
                    </Disclosure.Button>
                  );
                })}
              </div>
              {!!session && (
                <div className="border-t border-gray-200 pb-3 pt-4">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <Image
                        src={session.user?.image!}
                        width={60}
                        height={60}
                        className="h-10 w-10 rounded-full"
                        alt={session.user?.name!}
                      />
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">
                        {session.user?.name!}
                      </div>
                      <div className="text-sm font-medium text-gray-500">
                        {session.user?.email!}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 space-y-1">
                    <Disclosure.Button
                      as="a"
                      href="https://sr.reservas.clarosvillage.org.ar"
                      className={`nav-link-button-profile ${pathname === "/reservas" ? "active" : ""}`}
                    >
                      Panel Reservas
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="/vecinos"
                      className={`nav-link-button-profile ${pathname === "/vecinos" ? "active" : ""}`}
                    >
                      Listado Vecinos
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      href="/morosos"
                      className={`nav-link-button-profile ${pathname === "/morosos" ? "active" : ""}`}
                    >
                      Listado Morosos
                    </Disclosure.Button>
                    <Disclosure.Button
                      as="a"
                      onClick={onLogOut}
                      className="nav-link-button-profile"
                    >
                      Sign out
                    </Disclosure.Button>
                  </div>
                </div>
              )}
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </header>
  );
}
