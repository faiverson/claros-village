import { RadioGroup } from '@/components/ui/radio-group'
import { CVRadioOptionProps } from '@/components/ui/cv-radio-option'
import { UseFormRegisterReturn } from 'react-hook-form'
import React from 'react'

interface CVRadioGroupProps {
  children: React.ReactNode
  className?: string
  register: UseFormRegisterReturn
  value?: string | undefined
}

export function CVRadioGroup({ children, className, register, value }: CVRadioGroupProps) {
  return (
    <RadioGroup
      className={className}
      name={register.name}
      onValueChange={(val) => register.onChange({ target: { value: val, name: register.name } })}
      value={value || ''}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          const childProps = child.props as CVRadioOptionProps
          return React.cloneElement(child as React.ReactElement<CVRadioOptionProps & { ref?: React.Ref<HTMLInputElement> }>, {
            ...childProps,
            ref: index === 0 ? register.ref : undefined,
          })
        }
        return child
      })}
    </RadioGroup>
  )
}
