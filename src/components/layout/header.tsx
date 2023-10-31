'use client'

import Image from 'next/image'
import Link from 'next/link'
import Burger from 'components/Burger'
import Navbar from 'components/Navbar'
import Profile from 'components/Profile'
import Shimmer from 'components/Shimmer'
import { toBase64 } from 'utils/toBase64'

export default function Header() {
  return (
    <header className='container bg-foreground py-2 lg:mx-auto lg:max-w-screen-xl flex gap-4 lg:h-24 lg:mt-2 relative text-light'>
      <div className='flex justify-between lg:items-center w-full '>
        <div className='w-16 lg:w-[122px]'>
          <Link href="/" >
            <Image src='/img/logo.png' alt='Claros Village' sizes="100vw"
              quality={100}
              priority
              width={122}
              height={96}
              placeholder={`data:image/svg+xml;base64,${toBase64(Shimmer(122, 96))}`} />
          </Link>
        </div>
        <Navbar className={'lg:flex flex-col lg:flex-row lg:gap-8 uppercase font-semibold text-xl hidden'} />
      </div>
      <div className='flex flex-shrink-0 items-center mr-4'>
        <Burger />
        <Profile />
      </div>
    </header>
  )
}
