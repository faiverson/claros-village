import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-primary-500 text-white">
      <div className="flex flex-col gap-4 px-4 py-4 lg:flex-row lg:gap-8">
        <div className="flex flex-col gap-2 lg:w-1/3 justify-center">
          <div className="flex items-center gap-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/apple-icon-N7jTiQdeotAf7rPPNseI1SUJZ2cKZl.png"
              alt="Claros Village Logo"
              width={150}
              height={50}
              className="h-8 w-auto bg-white p-1 rounded"
            />
            <span className="text-xs">
              Claros Village fue desarrollado por{' '}
              <a
                href="https://www.grupoedisur.com.ar/quienes-somos-grupo-edisur"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Grupo Edisur
              </a>
            </span>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-1 gap-4 lg:w-2/5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="space-y-1">
            <h3 className="text-xs font-medium">Ubicación</h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-start gap-1">
                <MapPin className="h-4 w-4 shrink-0" />
                <span>Once de Septiembre 3480</span>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/Claros+Village/@-31.4529608,-64.1510974,17z/data=!4m14!1m7!3m6!1s0x9432a3a68602a989:0xc0dba9a3e4f471de!2sClaros+Village!8m2!3d-31.4529654!4d-64.1485225!16s%2Fg%2F11g1gqgbj7!3m5!1s0x9432a3a68602a989:0xc0dba9a3e4f471de!8m2!3d-31.4529654!4d-64.1485225!16s%2Fg%2F11g1gqgbj7?entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:underline"
                >
                  Ver en Google Maps
                  <ChevronRight className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-medium">Telefonos</h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>+351-4029025</span>
              </li>
              <li className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>+351-4028961</span>
              </li>
            </ul>
          </div>
          <div className="space-y-1">
            <h3 className="text-xs font-medium">Correos</h3>
            <ul className="space-y-1 text-xs">
              <li className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:directorio@clarosvillage.org.ar`} target="_blank" rel="noopener noreferrer">
                  directorio@clarosvillage.org.ar
                </a>
              </li>
              <li className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:denuncias@clarosvillage.org.ar`} target="_blank" rel="noopener noreferrer">
                  denuncias@clarosvillage.org.ar
                </a>
              </li>
              <li className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <a href={`mailto:intendencia@clarosvillage.org.ar`} target="_blank" rel="noopener noreferrer">
                  intendencia@clarosvillage.org.ar
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col gap-2 lg:w-1/4" />
      </div>
      <div className="border-t border-white/20 py-2">
        <div className="flex mx-auto flex-col items-center justify-between gap-1 px-4 md:px-6 lg:flex-row">
          <p className="text-center text-xs lg:text-left">
            &copy; {new Date().getFullYear()} Claros Village. Todos los derechos reservados.
          </p>
          <p className="text-center text-xs lg:text-left">Diseñado y desarrollado con ❤️ para nuestra comunidad</p>
        </div>
      </div>
    </footer>
  )
}
