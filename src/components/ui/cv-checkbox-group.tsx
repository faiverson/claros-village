import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { type CVCheckboxOptionProps } from '@/components/ui/cv-checkbox-option'

interface CVCheckboxGroupProps<T extends string> {
  children: React.ReactNode
  className?: string
  register: UseFormRegisterReturn
  value?: T[]
  onValueChange: (value: T[]) => void
}

export function CVCheckboxGroup<T extends string>({ children, className, register, value = [], onValueChange }: CVCheckboxGroupProps<T>) {
  const handleChange = (val: T, checked: boolean) => {
    const newValue = checked ? [...value, val] : value.filter((v) => v !== val)

    onValueChange(newValue)
    register.onChange({ target: { value: newValue, name: register.name } })
  }

  return (
    <div className={className} role="group">
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child

        const childProps = child.props as CVCheckboxOptionProps
        return React.cloneElement(child as React.ReactElement<CVCheckboxOptionProps>, {
          onCheckedChange: (checked: boolean) => handleChange(childProps.value as T, checked),
          checked: value.includes(childProps.value as T),
        })
      })}
    </div>
  )
}
