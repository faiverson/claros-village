'use client'

import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { CVCheckboxOption } from '@/components/ui/cv-checkbox-option'
import { cn } from '@/lib/utils'

interface CheckboxOption {
  id: string
  value: string
  label: string
}

interface CVCheckboxGroupProps {
  className?: string
  name: string
  options: CheckboxOption[]
}

export function CVCheckboxGroup<T extends string = string>({ className, name, options }: CVCheckboxGroupProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const handleChange = (val: T, checked: boolean) => {
          const currentValue = field.value || []
          const newValue = checked ? [...currentValue, val] : currentValue.filter((v: T) => v !== val)

          field.onChange(newValue)
        }

        return (
          <div className={cn('flex flex-wrap gap-4', className)} role="group" id={name} aria-label={name}>
            {options.map((option) => (
              <CVCheckboxOption
                key={option.id}
                id={option.id}
                value={option.value}
                label={option.label}
                checked={Array.isArray(field.value) && field.value.includes(option.value as unknown as T)}
                onCheckedChange={(checked) => handleChange(option.value as unknown as T, checked)}
              />
            ))}
          </div>
        )
      }}
    />
  )
}
