
import { Metadata } from 'next'
import Link from 'next/link'
import { DevicePhoneMobileIcon } from '@heroicons/react/24/solid'
import { MapPinIcon } from '@heroicons/react/24/outline'
import { PhoneIcon } from '@heroicons/react/24/outline'
import { EnvelopeIcon } from '@heroicons/react/24/outline'
import { Card, CardHeader, CardBody, Heading, Box, Stack, StackDivider, Text } from '@chakra-ui/react'
import './informacion.css'


export const metadata: Metadata = {
  title: 'Información',
}

export default function Page() {

  return (
    <section className='content reglamento flex flex-col'>
      <div className='main flex flex-wrap justify-between w-full flex-grow items-center px-36 '>
        <address className='w-3/5 text-lg text-center'>
          <Card>
            <CardHeader>
              <Heading size='md'>Aca podes encontrar información que necesites</Heading>
            </CardHeader>
            <CardBody>
              <Stack divider={<StackDivider />} spacing='4'>
                <Box>
                  <Heading size='xs' className='flex gap-2 font-bold text-xl items-center uppercase'>
                    <MapPinIcon className='h-6 text-alternative' /><Text>Dirección</Text>
                  </Heading>
                  <Text pt='2' fontSize='md' className='flex'>Celso Barrios 3500</Text>
                  <Text pt='2' fontSize='md' className='flex'>CP: 5014, Córdoba - Argentina</Text>
                </Box>
                <Box>
                  <Heading size='xs' className='flex gap-2 font-bold text-xl items-center uppercase'>
                    <PhoneIcon className='h-6 text-alternative' /><Text>Teléfonos</Text>
                  </Heading>
                  <div className='flex gap-2'>
                    <Text pt='2' fontSize='md'>Puesto 1 (Entrada)</Text><Text pt='2' fontSize='md'>+351-4029025</Text>
                  </div>
                  <div className='flex gap-2'>
                    <Text pt='2' fontSize='md'>Puesto 3 (Canchas)</Text><Text pt='2' fontSize='md'>+351-4028961</Text>
                  </div>
                </Box>
                <Box>
                  <Heading size='xs' className='flex gap-2 font-bold text-xl items-center uppercase'>
                    <EnvelopeIcon className='h-6 text-alternative' /><Text>Correos</Text>
                  </Heading>
                  <div className='flex gap-6'>
                    <Text pt='2' fontSize='md' className='font-medium font-lato text-lg not-italic'>Intendente</Text>
                    <Text pt='2' fontSize='md'><Link href="mailto: intendencia@clarosvillage.org.ar">intendencia@clarosvillage.org.ar</Link></Text>
                  </div>
                  <div className='flex gap-6'>
                    <Text pt='2' fontSize='md' className='font-medium font-lato text-lg not-italic'>Directorio</Text>
                    <Text pt='2' fontSize='md'><Link href="mailto: directorio@clarosvillage.org.ar">directorio@clarosvillage.org.ar</Link></Text>
                  </div>
                  <div className='flex gap-6'>
                    <Text pt='2' fontSize='md' className='font-medium font-lato text-lg not-italic'>Seguridad</Text>
                    <Text pt='2' fontSize='md'><Link href="mailto: seguridad@clarosvillage.org.ar">seguridad@clarosvillage.org.ar</Link></Text>
                  </div>
                  <div className='flex gap-6'>
                    <Text pt='2' fontSize='md' className='font-medium font-lato text-lg not-italic'>Denuncias</Text>
                    <Text pt='2' fontSize='md'><Link href="mailto: denuncias@clarosvillage.org.ar">denuncias@clarosvillage.org.ar</Link></Text>
                  </div>

                </Box>
              </Stack>
            </CardBody>
          </Card>
        </address>
        <div className='w-2/5 flex flex-col items-center'>
          <DevicePhoneMobileIcon className="text-gray-500 w-2/3" />
        </div>
      </div>
    </section>
  )
}
