import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'
import NuevoUsuario from './NuevoUsuario'

export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/units`, {
    cache: 'no-store',
  })
  const units = await response.json()

  return <NuevoUsuario units={units} />
}
