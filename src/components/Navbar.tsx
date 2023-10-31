"use client"

import Link from 'next/link'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'

interface ChildComponentProps {
  className: string
  onClick?: () => void
}

const Navbar: React.FC<ChildComponentProps> = ({ className, onClick }) => {
  return (
    <nav className={className}>
      <Link href="/" className='nav-wrapper-link' {...(!!onClick && onClick)}><MegaphoneIcon className='nav-icon' />Novedades</Link>
      <Link href="/reglamento" className='nav-wrapper-link' {...(!!onClick && onClick)}><BookOpenIcon className='nav-icon' />Reglamento Interno</Link>
      <Link href="https://reservas.clarosvillage.org.ar/tpt/home.aspx#cph_pnlUnidad" className='nav-wrapper-link'><CalendarDaysIcon className='nav-icon' />Reservas</Link>
      {false && <Link href="/contacto" className='nav-wrapper-link' {...(!!onClick && onClick)}><EnvelopeIcon className='nav-icon' />Contacto</Link>}
      <Link href="/informacion" className='nav-wrapper-link' {...(!!onClick && onClick)}><InformationCircleIcon className='nav-icon' />Información</Link>
    </nav>
  )
}

export default Navbar
