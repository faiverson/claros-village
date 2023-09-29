'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function Header() {
  return (
    <header className='container mx-auto max-w-screen-xl  flex justify-between items-center h-24 mt-2 relative text-light'>
      <Link href="/"><Image src='/img/logo.png' alt='Claros Village' width={122} height={96} priority={true} /></Link>
      <nav className='flex gap-8 uppercase font-semibold text-xl'>
        <Link href="/">Novedades</Link>
        {/* <motion.div className="underline" layoutId="underline" /> */}
        <Link href="/reglamento">Reglamento Interno</Link>
        <Link href="/reservas">Reservas</Link>
        <Link href="/contacto">Contacto</Link>
        <Link href="/informacion">Información</Link>
      </nav>
    </header>
  )
}
