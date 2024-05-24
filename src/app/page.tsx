import {
  EnvelopeIcon,
  MapPinIcon,
  PhoneIcon,
} from '@heroicons/react/24/outline'
import { DevicePhoneMobileIcon } from '@heroicons/react/24/solid'
import { Image, Snippet } from '@nextui-org/react'
import { useTranslations } from 'next-intl'
import NextImage from 'next/image'
import Link from 'next/link'

export default function Home() {
  const t = useTranslations('Home')

  return (
    <section className="flex-1 p-2 md:p-0">
      <div className="flex flex-col flex-wrap gap-y-8">
        <header className="flex gap-x-6 md:mb-8 md:mt-12 md:items-center md:justify-center">
          <DevicePhoneMobileIcon className="hidden w-6 lg:block" />
          <h2 className="text-center text-base font-bold uppercase lg:text-xl">
            {t('info')}
          </h2>
        </header>
        <div className="md: flex flex-col justify-between md:flex-row md:justify-center">
          <div className="flex flex-col gap-y-8">
            <div className="flex flex-shrink flex-col justify-start gap-y-3">
              <h3 className="flex items-center text-xl font-bold uppercase text-main-green-dark">
                {t('direction')}
              </h3>
              <Snippet
                variant="flat"
                color="success"
                radius="sm"
                codeString="Once de Septiembre 3480"
                hideSymbol
              >
                <address className="flex items-center gap-x-2 text-balance font-sans">
                  <MapPinIcon className="h-4" />
                  {t('address')}
                </address>
                <address className="items-center text-balance pl-6 font-sans">
                  {t('zip')}
                </address>
              </Snippet>
            </div>
            <div className="flex flex-col gap-y-3">
              <h3 className="flex items-center text-xl font-bold uppercase text-main-green-dark">
                {t('phone')}
              </h3>
              <div className="flex flex-col gap-y-2">
                <Snippet
                  variant="flat"
                  color="success"
                  radius="sm"
                  codeString="3514029025"
                  hideSymbol
                >
                  <div className="flex items-center gap-x-2 font-sans">
                    <PhoneIcon className="h-4" />
                    {t('phone1')}
                  </div>
                </Snippet>
                <Snippet
                  variant="flat"
                  color="success"
                  radius="sm"
                  codeString="3514028961"
                  hideSymbol
                >
                  <div className="flex items-center gap-x-2 font-sans">
                    <PhoneIcon className="h-4" />
                    {t('phone2')}
                  </div>
                </Snippet>
              </div>
            </div>
            <div className="flex flex-shrink flex-col gap-y-3">
              <h3 className="flex items-center text-xl font-bold uppercase text-main-green-dark">
                {t('mails')}
              </h3>
              <Snippet
                variant="flat"
                color="success"
                radius="sm"
                codeString="directorio@clarosvillage.org.ar"
                hideSymbol
              >
                <div className="flex items-center gap-x-2 font-sans">
                  <EnvelopeIcon className="h-4" />
                  <Link href={`mailto:${t('directory')}`}>
                    {t('directory')}
                  </Link>
                </div>
              </Snippet>
              <Snippet
                variant="flat"
                color="success"
                radius="sm"
                codeString="intendencia@clarosvillage.org.ar"
                hideSymbol
              >
                <div className="flex items-center gap-x-2 font-sans">
                  <EnvelopeIcon className="h-4" />
                  <Link href={`mailto:${t('intendency')}`}>
                    {t('intendency')}
                  </Link>
                </div>
              </Snippet>
              <Snippet
                variant="flat"
                color="success"
                radius="sm"
                codeString="denuncias@clarosvillage.org.ar"
                hideSymbol
              >
                <div className="flex items-center gap-x-2 font-sans">
                  <EnvelopeIcon className="h-4" />
                  <Link href={`mailto:${t('complaints')}`}>
                    {t('complaints')}
                  </Link>
                </div>
              </Snippet>
            </div>
          </div>
          <div className="flex flex-col items-center lg:w-2/5">
            <Image
              as={NextImage}
              src={'/static/mapa.png'}
              alt="Mapa"
              width={0}
              height={0}
              priority
              sizes="100vw"
              style={{
                width: '100%',
                height: 'auto',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
