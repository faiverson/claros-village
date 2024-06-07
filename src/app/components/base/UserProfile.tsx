'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from '@nextui-org/react'
import { Role } from '@prisma/client'
import { signOut, useSession } from 'next-auth/react'
import { useTranslations } from 'next-intl'

export default function UserProfile() {
  const { data: session } = useSession()
  const t = useTranslations('Header')

  const onLogOut = () => signOut()

  const avatarUrl = (!!session && session.user?.image) || ''

  const role = !!session ? session?.user.role : ''

  const userMenu = [
    {
      key: 'morosos',
      href: '/morosos',
      name: t('morosos'),
      show: role === Role.ADMIN,
    },
    {
      key: 'resident',
      href: '/resident',
      name: t('resident'),
      show: role === Role.ADMIN,
    },
    {
      key: 'logout',
      onClick: onLogOut,
      name: t('logout'),
      show: true,
    },
  ]

  return (
    <Dropdown>
      <DropdownTrigger>
        {avatarUrl ? (
          <Avatar
            isBordered
            as="button"
            className="transition-transform hover:cursor-pointer"
            src={avatarUrl}
          />
        ) : (
          <UserCircleIcon className="h-10 w-10 rounded-full bg-white fill-main-green hover:cursor-pointer hover:opacity-50" />
        )}
      </DropdownTrigger>
      <DropdownMenu aria-label="Link Actions">
        {userMenu
          .filter((menuItem) => menuItem.show)
          .map((menuItem) => {
            const props = menuItem.onClick
              ? { onClick: menuItem.onClick }
              : { href: menuItem.href }
            return (
              <DropdownItem key={menuItem.key} {...props}>
                {menuItem.name}
              </DropdownItem>
            )
          })}
      </DropdownMenu>
    </Dropdown>
  )
}
