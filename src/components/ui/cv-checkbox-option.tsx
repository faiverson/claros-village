'use client'

import * as React from 'react'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/lib/utils'

function CVCheckbox({ className, ...props }: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        'peer border-input ring-primary-500 dark:bg-input/30 data-[state=checked]:bg-primary-500 data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary-500 data-[state=checked]:border-primary-500 focus-visible:border-ring focus-visible:ring-primary-500/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 group-hover:bg-green-100 transition-colors',
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="flex items-center justify-center text-current transition-none">
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export interface CVCheckboxOptionProps {
  id: string
  value: string
  label: string
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  className?: string
}

export function CVCheckboxOption({ id, value, label, checked, onCheckedChange, className, ...props }: CVCheckboxOptionProps) {
  return (
    <div className={cn('flex items-center space-x-2 group', className)}>
      <CVCheckbox id={id} value={value} checked={checked} onCheckedChange={onCheckedChange} {...props} />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  )
}

export { CVCheckbox }
