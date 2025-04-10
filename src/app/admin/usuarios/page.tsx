import { getUsers } from '@/app/actions/user'
import { UsersTable } from '@/components/UsersTable'
import { XCircle } from 'lucide-react'
import { checkServerPermission } from '@/hooks/useServerPermission'
import { Role } from '@prisma/client'

export default async function UsuariosPage() {
  const result = await getUsers()
  const addUserPermission = await checkServerPermission([Role.ADMIN, Role.MANAGER])

  if (result.error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-dashed border-gray-200 rounded-lg">
        <div className="w-12 h-12 text-gray-400 mb-4">
          <XCircle className="h-12 w-12" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar usuarios</h3>
        <p className="text-gray-500 max-w-sm">Hubo un problema al cargar la lista de usuarios. Por favor, intenta nuevamente.</p>
      </div>
    )
  }

  return <UsersTable users={result.data || []} addUserPermission={addUserPermission} />
}
