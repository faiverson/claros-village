'use client'

import { Control, Controller, FieldValues, Path } from 'react-hook-form'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

interface CVSwitchProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  error?: string
  labelPosition?: 'left' | 'right'
}

export function CVSwitch<T extends FieldValues>({ name, control, label, error, labelPosition = 'left' }: CVSwitchProps<T>) {
  return (
    <div className="space-y-2">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className={`flex items-center ${labelPosition === 'left' ? 'space-x-2' : 'space-x-2 flex-row-reverse'}`}>
            {labelPosition === 'left' && <Label htmlFor={name}>{label}</Label>}
            <Switch id={name} checked={field.value} onCheckedChange={field.onChange} />
            {labelPosition === 'right' && <Label htmlFor={name}>{label}</Label>}
          </div>
        )}
      />
      {error && <p className="text-sm text-destructive-500">{error}</p>}
    </div>
  )
}
