import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'
import { authOptions } from 'app/api/auth/[...nextauth]/route'
import SignIn from './SignIn'


export default async function Page() {
  const session = await getServerSession(authOptions)

  if (!!session) {
    redirect('/')
  }

  return (
    <section className='content'>
      <div className='flex justify-center'>
        <SignIn />
      </div>
    </section>
  )
}
