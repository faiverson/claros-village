import React from 'react'

import { Controller, useFormContext } from 'react-hook-form'

import { CVRadioOption } from '@/components/ui/cv-radio-option'
import { RadioGroup } from '@/components/ui/radio-group'
import { cn } from '@/lib/utils'

interface RadioOption {
  id: string
  value: string
  label: string
}

interface CVRadioGroupProps {
  id: string
  className?: string
  name: string
  options: RadioOption[]
}

export function CVRadioGroup({ id, className, name, options }: CVRadioGroupProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <RadioGroup
          id={id}
          className={cn('grid gap-3 [&_button:focus-visible]:ring [&_button:focus-visible]:ring-primary', className)}
          name={field.name}
          onValueChange={field.onChange}
          value={field.value}
        >
          {options.map((option, index) => (
            <CVRadioOption key={option.id} {...option} ref={index === 0 ? field.ref : undefined} />
          ))}
        </RadioGroup>
      )}
    />
  )
}
