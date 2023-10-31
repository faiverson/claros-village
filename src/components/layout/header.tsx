'use client'

import Image from 'next/image'
import Link from 'next/link'
import { InformationCircleIcon } from '@heroicons/react/24/outline'
// import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
import { BookOpenIcon } from '@heroicons/react/24/outline'
import { CalendarDaysIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className='container mx-auto max-w-screen-xl  flex justify-between items-center h-24 mt-2 relative text-light'>
      <Link href="/"><Image src='/img/logo.png' alt='Claros Village' width={122} height={96} priority={true} /></Link>
      <nav className='flex gap-8 uppercase font-semibold text-xl'>
        <Link href="/" className='nav-wrapper-link'><MegaphoneIcon className='nav-icon' />Novedades</Link>
        {/* <motion.div className="underline" layoutId="underline" /> */}
        <Link href="/reglamento" className='nav-wrapper-link'><BookOpenIcon className='nav-icon' />Reglamento Interno</Link>
        <Link href="https://reservas.clarosvillage.org.ar/tpt/home.aspx#cph_pnlUnidad" className='nav-wrapper-link'><CalendarDaysIcon className='nav-icon' />Reservas</Link>
        {/* <Link href="/contacto" className='nav-wrapper-link'><EnvelopeIcon className='nav-icon' />Contacto</Link> */}
        <Link href="/informacion" className='nav-wrapper-link'><InformationCircleIcon className='nav-icon' />Información</Link>
        {!!session
          ? <Menu closeOnSelect={true}>
            <MenuButton transition='all 0.2s'>
              <div className='flex gap-2'>
                <Image src={session.user?.image!} width={60} height={60} className='avatar' alt={session.user?.name!} />
                <ChevronDownIcon className='w-[24px]' />
              </div>
            </MenuButton>
            <MenuList className='bg-primary '>
              <MenuItem className=' hover:bg-secondary'><Link href="/morosos" className='nav-wrapper-link'>Morosos</Link></MenuItem>
              <MenuItem className=' hover:bg-secondary' onClick={signOut}>Log Out</MenuItem>
            </MenuList>
          </Menu>
          : <Link href="/login" className='nav-wrapper-link'><InformationCircleIcon className='nav-icon' />Login</Link>
        }
      </nav>
    </header>
  )
}
