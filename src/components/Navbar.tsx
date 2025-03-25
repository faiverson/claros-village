'use client';

import { useState } from 'react';
import Image from "next/image"
import Link from "next/link"
import { Menu, X, LogOut } from "lucide-react"
import useSmoothScroll from "@/hooks/useSmoothScroll"
import { useSession, signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollToSection = useSmoothScroll();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <nav className="w-full">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        <Link href="#home" className="flex items-center gap-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-icon-N7jTiQdeotAf7rPPNseI1SUJZ2cKZl.png"
            alt="Claros Village Logo"
            width={150}
            height={50}
            className="h-8 w-auto"
          />
        </Link>

        {/* Mobile menu button */}
        <button className="block md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X className="h-5 w-5 text-primary-500" /> : <Menu className="h-5 w-5 text-primary-500" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="#home" className="text-xs font-medium hover:text-primary-500" onClick={(e) => scrollToSection(e, '#home')}>
            Inicio
          </Link>
          <Link href="#nosotros" className="text-xs font-medium hover:text-primary-500" onClick={(e) => scrollToSection(e, '#nosotros')}>
            Servicios
          </Link>
          <Link href="#map" className="text-xs font-medium hover:text-primary-500" onClick={(e) => scrollToSection(e, '#map')}>
            Mapa
          </Link>
          <Link href="#contact" className="text-xs font-medium hover:text-primary-500" onClick={(e) => scrollToSection(e, '#contact')}>
            Contacto
          </Link>
          {session?.user?.name ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-xs font-medium text-primary-500 hover:text-primary-600">
                  {session.user.name}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 z-50 bg-white">
                <DropdownMenuItem onClick={() => signOut()} className="text-xs hover:bg-gray-100 cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-primary-500 hover:text-primary-600 text-xs h-7 px-3"
                onClick={() => router.push('/auth/signin')}
              >
                Iniciar Sesión
              </Button>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-primary-500 text-white hover:bg-primary-600 text-xs h-7 px-3"
                >
                  Registrarse
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              href="#home"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              onClick={(e) => {
                scrollToSection(e, '#home');
                setIsMenuOpen(false);
              }}
            >
              Inicio
            </Link>
            <Link
              href="#nosotros"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              onClick={(e) => {
                scrollToSection(e, '#nosotros');
                setIsMenuOpen(false);
              }}
            >
              Servicios
            </Link>
            <Link
              href="#map"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              onClick={(e) => {
                scrollToSection(e, '#map');
                setIsMenuOpen(false);
              }}
            >
              Mapa
            </Link>
            <Link
              href="#contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-500 hover:bg-gray-50"
              onClick={(e) => {
                scrollToSection(e, '#contact');
                setIsMenuOpen(false);
              }}
            >
              Contacto
            </Link>
            {session?.user?.name ? (
              <div className="px-3 py-2">
                <Button
                  variant="ghost"
                  className="w-full text-base font-medium text-primary-500 hover:text-primary-600 flex items-center justify-start"
                  onClick={() => signOut()}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Cerrar sesión
                </Button>
              </div>
            ) : (
              <div className="flex flex-col space-y-2 px-3 py-2">
                <Button
                  variant="ghost"
                  className="w-full text-base font-medium text-primary-500 hover:text-primary-600"
                  onClick={() => router.push('/auth/signin')}
                >
                  Iniciar Sesión
                </Button>
                <Link href="/auth/register" className="w-full">
                  <Button
                    className="w-full bg-primary-500 text-white hover:bg-primary-600 text-base"
                  >
                    Registrarse
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
