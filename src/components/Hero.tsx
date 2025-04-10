'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MapPin, Phone, Mail, ChevronRight, Home, ShieldUser, Trees, Building2 } from 'lucide-react'
import Link from 'next/link'
import useSmoothScroll from '@/hooks/useSmoothScroll'
import { ContactForm } from './ContactForm'

export default function Hero() {
  const scrollToSection = useSmoothScroll()

  return (
    <>
      <section
        id="home"
        className="w-full py-16 md:py-24 bg-cover bg-center bg-no-repeat relative min-h-[700px] flex items-center"
        style={{
          backgroundImage: "url('/static/img/hero.webp')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="max-w-3xl mx-auto px-4 md:px-6 relative z-10 w-full">
          <div className="flex flex-col items-center text-center">
            <div className="space-y-4 max-w-xl">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl text-white">Bienvenido a Claros Village</h1>
              <p className="text-white/90 text-base md:text-lg">
                Un vecindario exclusivo diseñado para ofrecerte la mejor calidad de vida en un entorno natural y seguro.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center pt-2">
                <Link href="#contact" onClick={(e) => scrollToSection(e, '#contact')}>
                  <Button size="lg" className="bg-primary-500 text-gray-200 hover:bg-primary-500/90 hover:text-gray-300">
                    Contactanos
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-500">Sobre Claros Village</h2>
              <p className="text-gray-600 text-base md:text-lg">
                Claros Village es un desarrollo residencial exclusivo que combina la tranquilidad de la naturaleza con la comodidad de la
                vida moderna.
              </p>
            </div>
          </div>
          <div className="mx-auto grid items-center gap-6 py-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col items-center space-y-3 rounded-lg border p-4 shadow-sm h-full">
              <div className="rounded-full bg-primary-500/10 p-2 mb-2">
                <Home className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-primary-500 text-center h-7 flex items-center justify-center">Lotes Residenciales</h3>
              <p className="text-center text-sm text-muted-foreground mt-auto">
                Amplios lotes residenciales con todos los servicios disponsibles.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 rounded-lg border p-4 shadow-sm h-full">
              <div className="rounded-full bg-primary-500/10 p-2 mb-2">
                <ShieldUser className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-primary-500 text-center h-7 flex items-center justify-center">Seguridad 24/7</h3>
              <p className="text-center text-sm text-muted-foreground mt-auto">
                Sistema de seguridad las 24 horas para garantizar la tranquilidad de tu familia.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 rounded-lg border p-4 shadow-sm h-full">
              <div className="rounded-full bg-primary-500/10 p-2 mb-2">
                <Trees className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-primary-500 text-center h-7 flex items-center justify-center">Espacios Verdes</h3>
              <p className="text-center text-sm text-muted-foreground mt-auto">
                Espacios verdes y áreas recreativas para el disfrute de toda la familia.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-3 rounded-lg border p-4 shadow-sm h-full">
              <div className="rounded-full bg-primary-500/10 p-2 mb-2">
                <Building2 className="h-6 w-6 text-primary-500" />
              </div>
              <h3 className="text-lg font-bold text-primary-500 text-center h-7 flex items-center justify-center">SUM</h3>
              <p className="text-center text-sm text-muted-foreground mt-auto">
                Salón de Usos Múltiples para eventos sociales y reuniones comunitarias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section id="map" className="w-full py-12 md:py-16 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-500">Mapa del Barrio</h2>
            </div>
          </div>
          <div className="mx-auto py-6">
            <div className="overflow-hidden rounded-lg border shadow-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mapa-jhuxZw6TXJRUj21Dw8OGZ33rximFCg.png"
                alt="Mapa de Claros Village"
                width={800}
                height={600}
                className="w-full h-auto"
              />
            </div>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-400"></div>
                <span className="text-xs">Lotes baldíos</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-green-800"></div>
                <span className="text-xs">Lotes comerciales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-cyan-500"></div>
                <span className="text-xs">Lotes residenciales</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-12 md:py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary-500">Contáctanos</h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Estamos aquí para responder todas tus preguntas. Completa el formulario y nos pondremos en contacto contigo lo antes
                  posible.
                </p>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary-500" />
                  <span className="text-sm">Once de Septiembre 3480</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-primary-500" />
                  <span className="text-sm">+351-4029025 / +351-4028961</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-500" />
                  <a href="mailto:directorio@clarosvillage.org.ar" className="text-sm hover:underline">
                    directorio@clarosvillage.org.ar
                  </a>
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
