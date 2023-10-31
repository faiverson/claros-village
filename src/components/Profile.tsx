"use client"

import Link from 'next/link'
import Image from 'next/image'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'
import { useSession, signOut } from 'next-auth/react'
import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react'

const Profile = () => {

  const { data: session } = useSession()

  const onLogOut = async () => await signOut()

  return (
    !!session
      ? <Menu closeOnSelect={true}>
        <MenuButton transition='all 0.2s'>
          <div className='flex gap-2'>
            <ChevronDownIcon className='hidden w-6 lg:block' />
            <Image src={session.user?.image!} width={60} height={60} className='h-7 w-7 lg:h-12 lg:w-12 rounded-full cursor-pointer mx-auto hover:opacity-50' alt={session.user?.name!} />
          </div>
        </MenuButton>
        <MenuList className='bg-primary'>
          <MenuItem className=' hover:bg-alternative'><Link href="https://sr.reservas.clarosvillage.org.ar" className='nav-wrapper-link'>Panel Reservas</Link></MenuItem>
          <MenuItem className=' hover:bg-alternative'><Link href="/vecinos" className='nav-wrapper-link'>Listado Vecinos</Link></MenuItem>
          <MenuItem className=' hover:bg-alternative'><Link href="/morosos" className='nav-wrapper-link'>Morosos</Link></MenuItem>
          <MenuItem className=' hover:bg-alternative' onClick={onLogOut}>Log Out</MenuItem>
        </MenuList>
      </Menu>
      : <Link href="/login" className='nav-wrapper-link uppercase'><ArrowRightOnRectangleIcon className='nav-icon' /><span className='hidden lg:inline-block'>Login</span></Link>
  )
}

export default Profile
