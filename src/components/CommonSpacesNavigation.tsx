'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import * as LucideIcon from 'lucide-react'
import { LucideProps } from 'lucide-react'

interface NavItem {
  title: string
  href: string
  iconName: keyof typeof LucideIcon
}

interface CommonSpacesNavigationProps {
  navItems: NavItem[]
}

export default function CommonSpacesNavigation({ navItems }: CommonSpacesNavigationProps) {
  const pathname = usePathname()

  return (
    <nav className="flex space-x-2 mb-6 bg-gray-50 p-2 rounded-lg">
      {navItems.map((item) => {
        const isActive = pathname === item.href
        const Icon = LucideIcon[item.iconName] as React.ComponentType<LucideProps>

        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex items-center px-3 py-1.5 text-sm font-medium transition-all group',
              isActive
                ? 'bg-primary-50 text-primary-900 rounded-md ring-1 ring-primary-200'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md'
            )}
          >
            <Icon className={cn('mr-2 h-4 w-4', isActive ? 'text-primary-600' : 'text-gray-500 group-hover:text-gray-700')} />
            {item.title}
          </Link>
        )
      })}
    </nav>
  )
}
