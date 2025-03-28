import { Calendar } from '@/components/ui/calendar'
import { addDays, startOfDay } from 'date-fns'

interface CVCalendarProps {
  selected?: Date
  onSelect?: (date: Date | undefined) => void
  disabled?: boolean | ((date: Date) => boolean)
  minDays?: number
  maxDays?: number
}

export function CVCalendar({ selected, onSelect, disabled = false, minDays = 1, maxDays = 90 }: CVCalendarProps) {
  const minDate = addDays(startOfDay(new Date()), minDays)
  const maxDate = addDays(startOfDay(new Date()), maxDays)

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={onSelect}
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
        },
      }}
    />
  )
}
