"use client"

import { useRef, useState } from 'react'
import FocusLock from 'react-focus-lock'
import Navbar from 'components/Navbar'
import useOnClickOutside from 'hooks/useOnClickOutside'


export default function Burger() {
  const node = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState(false)

  const toggleBurger = () => setOpen(!open)

  useOnClickOutside(node, () => setOpen(false))

  return (
    <div className='flex items-center'>
      {!open && <button className='text-white lg:hidden w-8 h-8 mr-4' onClick={toggleBurger} aria-label="Toggle Navbar">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>}
      <div ref={node}>
        <FocusLock disabled={!open}>
          <div className="fixed flex flex-col h-screen top-0 right-0 bg-foreground z-50 transition-transform duration-300 ease-in-out"
            style={{ transform: (open ? 'translateX(0)' : 'translateX(100%)') }}>
            <button className='absolute top-2 right-2' onClick={toggleBurger} aria-label="Toggle Navbar">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <Navbar className='uppercase flex flex-col gap-6 pl-8 pr-16 pt-8' onClick={toggleBurger} />
          </div>
        </FocusLock>
      </div>
    </div>
  )
}
