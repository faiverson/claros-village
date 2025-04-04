import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { CheckCircle2, XCircle, User, Mail, Shield, Activity, CheckCircle, Plus, Phone, Pencil } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Role } from '@prisma/client'

interface User {
  id: string
  name: string | null
  email: string | null
  phone: string | null
  role: string | null
  active: boolean
  emailVerified: Date | null
  unidad: string | null
}

export default async function UsuariosPage() {
  const session = await getServerSession(authOptions)
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/users`, {
    cache: 'no-store',
  })
  const users: User[] = await response.json()

  const canAddUsers = session?.user.role && (session.user.role === Role.ADMIN || session.user.role === Role.MANAGER)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-primary-900">Usuarios</h1>
        {canAddUsers && (
          <Link href="/admin/usuarios/nuevo">
            <Button className="bg-primary-500 hover:bg-primary-600 text-white">
              <Plus className="h-4 w-4" />
              Nuevo Usuario
            </Button>
          </Link>
        )}
      </div>
      <div className="rounded-md border border-accent-500 bg-white shadow-sm">
        <Table className="border-collapse">
          <TableHeader className="bg-accent-100">
            <TableRow className="bg-accent-50/50">
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-accent-500" />
                  <span className="text-accent-700">Nombre</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-accent-500" />
                  <span className="text-accent-700">Email</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-accent-500" />
                  <span className="text-accent-700">Teléfono</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <span className="text-accent-700">Unidad</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-center">
                <div className="flex items-center gap-2 justify-center">
                  <Shield className="h-4 w-4 text-accent-500" />
                  <span className="text-accent-700">Tipo de usuario</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-accent-500" />
                  <span className="text-accent-700">Estado</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-center">
                <div className="flex items-center gap-2 justify-center">
                  <CheckCircle className="h-4 w-4 text-accent-500" />
                  <span className="text-accent-700">Verificado</span>
                </div>
              </TableHead>
              <TableHead className="font-semibold text-center">
                <div className="flex items-center gap-2 justify-center">
                  <span className="text-accent-700">Acciones</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id} className="hover:bg-accent-50 transition-colors">
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>{user.unidad || '-'}</TableCell>
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium bg-primary-100 text-primary-700">
                    {user.role}
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ${
                      user.active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-destructive-700'
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
                <TableCell className="text-center">
                  <span className="inline-flex items-center gap-1 justify-center w-full">
                    {user.emailVerified ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-destructive-500" />
                    )}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <Link href={`/admin/usuarios/editar/${user.id}`}>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
