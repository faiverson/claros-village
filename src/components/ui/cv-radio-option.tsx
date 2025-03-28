import { RadioGroupItem } from '@/components/ui/radio-group'
import { forwardRef } from 'react'

export interface CVRadioOptionProps {
  id: string
  value: string
  label: string
}

export const CVRadioOption = forwardRef<HTMLInputElement, CVRadioOptionProps>(({ id, value, label }, ref) => {
  return (
    <div className="flex items-center space-x-2 group">
      <RadioGroupItem
        ref={ref as React.Ref<HTMLButtonElement>}
        value={value}
        id={id}
        className="group-hover:bg-green-100 transition-colors"
      />
      <label htmlFor={id} className="text-sm cursor-pointer">
        {label}
      </label>
    </div>
  )
})

CVRadioOption.displayName = 'CVRadioOption'
