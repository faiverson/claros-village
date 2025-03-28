'use client';

import { signOut } from 'next-auth/react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { LogOut, Building } from 'lucide-react';
import { Session } from 'next-auth';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import Link from 'next/link';

interface UserDropdownMenuProps {
  user: Session['user'];
}

export function UserDropdownMenu({ user }: UserDropdownMenuProps) {
  const hasAvatar = user.image;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {hasAvatar ? (
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarFallback>{user.name?.[0]}</AvatarFallback>
            </Avatar>
          </Button>
        ) : (
          <Button variant="ghost" className="text-xs font-medium text-primary-500 hover:text-primary-600">
            {user.name}
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 z-50 bg-white">
        <Link href="/espacios-comunes">
          <DropdownMenuItem className="text-xs hover:bg-gray-100 cursor-pointer">
            <Building className="mr-2 h-4 w-4" />
            Espacios comunes
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem onClick={() => signOut()} className="text-xs hover:bg-gray-100 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
