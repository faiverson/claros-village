
import { Metadata } from 'next'
import Link from 'next/link'
import { DevicePhoneMobileIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { PhoneIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import './informacion.css'


export const metadata: Metadata = {
  title: 'Información',
}

export default function Page() {

  return (
    <section className='content reglamento flex flex-col'>
      <div className='main flex flex-wrap justify-between w-full flex-grow items-center px-36 '>
        <address className='w-1/2 text-lg text-center'>
          <div className='flex gap-2 font-bold text-xl items-center'><MapPinIcon className='h-6 text-alternative' />Dirección</div>
          <div className='flex'>Celso Barrios 3500</div>
          <div className='flex'>CP: 5014, Córdoba - Argentina</div>
          <div className='flex gap-2 mt-4 font-bold text-xl items-center'><PhoneIcon className='h-6 text-alternative' />Teléfonos</div>
          <div className='flex'><span>Puesto Entrada: </span><span>+351-4029025</span></div>
          <div className='flex'><span>Puesto Canchas: </span><span>+351-4028961</span></div>
          <div className='flex gap-2 mt-4 font-bold text-xl items-center'><EnvelopeIcon className='h-6 text-alternative' />Correos</div>
          <div className='flex'><span>Intendente</span><span><Link href="mailto: intendencia@clarosvillage.org.ar">intendencia@clarosvillage.org.ar</Link></span></div>
          <div className='flex'><span>Directorio</span><span><Link href="mailto: directorio@clarosvillage.org.ar">directorio@clarosvillage.org.ar</Link></span></div>
          <div className='flex'><span>Seguridad</span><span><Link href="mailto: seguridad@clarosvillage.org.ar">seguridad@clarosvillage.org.ar</Link></span></div>
          <div className='flex'><span>Denuncias</span><span><Link href="mailto: denuncias@clarosvillage.org.ar">denuncias@clarosvillage.org.ar</Link></span></div>
        </address>
        <div className='w-1/2 flex flex-col items-center'>
          <DevicePhoneMobileIcon className="text-gray-500 w-3/5" />
        </div>
      </div>
    </section>
  )
}
