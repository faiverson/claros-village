import { getUnits } from '@/app/actions/unit'
import { getUserById } from '@/app/actions/user'
import { UserForm } from '@/components/forms/UserForm'
import { handleServerError } from '@/hooks/useServerErrorRedirect'

interface EditUserPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditUserPage({ params }: EditUserPageProps) {
  const { id } = await params
  const [userResponse, units] = await Promise.all([getUserById(id), getUnits()])

  if (userResponse.error) {
    handleServerError(userResponse.error)
  }

  return <UserForm units={units} initialData={userResponse.data} />
}
