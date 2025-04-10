'use client'

import { Calendar } from '@/components/ui/calendar'
import { addDays, startOfDay } from 'date-fns'
import { Controller, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'

interface CVCalendarProps {
  name: string
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean | ((date: Date) => boolean)
  minDays?: number
  maxDays?: number
  className?: string
}

export function CVCalendar({ name, onSelect, disabled = false, minDays = 1, maxDays = 90, className }: CVCalendarProps) {
  const { control } = useFormContext()
  const minDate = addDays(startOfDay(new Date()), minDays)
  const maxDate = addDays(startOfDay(new Date()), maxDays)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={cn('flex justify-start', className)}>
          <div className="w-full max-w-sm">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={(date) => {
                field.onChange(date)
                onSelect?.(date)
              }}
              disabled={disabled}
              fromDate={minDate}
              toDate={maxDate}
              modifiers={{
                conflict: (date) => {
                  if (typeof disabled === 'function') {
                    return disabled(date)
                  }
                  return false
                },
              }}
              modifiersStyles={{
                conflict: {
                  backgroundColor: 'var(--color-destructive-100)',
                  color: 'var(--color-destructive-900)',
                  cursor: 'auto',
                },
              }}
            />
          </div>
        </div>
      )}
    />
  )
}
