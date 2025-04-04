import { notFound } from 'next/navigation'
import { UserForm } from '@/components/forms/UserForm'

interface EditUserPageProps {
  params: {
    id: string
  }
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users/${params.id}`, {
    cache: 'no-store',
  })

  if (!response.ok) {
    notFound()
  }

  const user = await response.json()

  return <UserForm units={[]} initialData={user} isEdit userId={params.id} />
}
