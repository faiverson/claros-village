'use client'

import { Role } from '@prisma/client'
import { LogOut, Building, Users, User } from 'lucide-react'
import Link from 'next/link'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { usePermission } from '@/hooks/usePermission'

interface UserDropdownMenuProps {
  user: Session['user']
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const { hasPermission } = usePermission([Role.ADMIN, Role.MANAGER] as const)
  const canAccessUsers = hasPermission()

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 pl-1 pr-2 hover:bg-transparent hover:cursor-pointer hover:ring hover:ring-emerald-500 focus-visible:ring-emerald-500 focus-visible:ring-offset-1 focus-visible:outline-none data-[state=open]:ring data-[state=open]:ring-emerald-500"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || undefined} alt={user.name || 'User'} />
            <AvatarFallback className="bg-emerald-50 text-emerald-600">
              {user.image ? user.name?.[0] : <User className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <span className="text-xs font-medium text-emerald-600">{user.name}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50 bg-white border-emerald-100">
        <Link href="/espacios-comunes">
          <DropdownMenuItem className="text-xs cursor-pointer text-gray-700 hover:text-emerald-600 group">
            <Building className="mr-2 h-4 w-4 text-emerald-500 group-hover:text-white transition-colors" />
            Espacios comunes
          </DropdownMenuItem>
        </Link>
        {canAccessUsers && (
          <Link href="/admin/usuarios">
            <DropdownMenuItem className="text-xs cursor-pointer text-gray-700 hover:text-emerald-600 group">
              <Users className="mr-2 h-4 w-4 text-emerald-500 group-hover:text-white transition-colors" />
              Usuarios
            </DropdownMenuItem>
          </Link>
        )}
        <DropdownMenuItem onClick={handleSignOut} className="text-xs cursor-pointer text-gray-700 hover:text-emerald-600 group">
          <LogOut className="mr-2 h-4 w-4 text-emerald-500 group-hover:text-white transition-colors" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
