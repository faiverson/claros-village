import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, XCircle, User, Mail, Shield, Activity, CheckCircle, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface User {
  id: string
  name: string | null
  email: string | null
  role: string | null
  active: boolean
  emailVerified: Date | null
}

export default async function UsuariosPage() {
  const session = await getServerSession(authOptions)

  // Check if user has required role
  const userRole = session?.user?.role
  if (!userRole || !['admin', 'manager', 'guard'].includes(userRole)) {
    redirect('/')
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
    cache: 'no-store',
  })
  const users: User[] = await response.json()

  const canAddUsers = userRole === 'admin' || userRole === 'manager'

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary-900">Usuarios</h1>
        {canAddUsers && (
          <Link href="/usuarios/nuevo">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Nuevo Usuario
            </Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border border-primary-500 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary-50/50">
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-primary-500" />
                  <span className="text-primary-700">Nombre</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-primary-500" />
                  <span className="text-primary-700">Email</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary-500" />
                  <span className="text-primary-700">Rol</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-primary-500" />
                  <span className="text-primary-700">Estado</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  <span className="text-primary-700">Verificado</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-accent-50 transition-colors">
                <TableCell className="font-medium text-primary-900">{user.name}</TableCell>
                <TableCell className="text-primary-700">{user.email}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {user.active ? (
                      <>
                        <CheckCircle2 className="h-3 w-3" />
                        Activo
                      </>
                    ) : (
                      <>
                        <XCircle className="h-3 w-3" />
                        Inactivo
                      </>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1">
                    {user.emailVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className={`text-sm ${user.emailVerified ? 'text-green-700' : 'text-red-700'}`}>
                      {user.emailVerified ? 'Sí' : 'No'}
                    </span>
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
