'use client'

import { cn } from '@/lib/utils'

interface FormLayoutProps {
  children: React.ReactNode
  className?: string
}

export function FormLayout({ children, className }: FormLayoutProps) {
  return <div className={cn('w-full max-w-[40%]', className)}>{children}</div>
}
