'use client'

import * as React from 'react'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import dynamic from 'next/dynamic'

import { cn } from '@/lib/utils'

const DayPicker = dynamic(() => import('react-day-picker').then((mod) => mod.DayPicker), {
  ssr: false,
  loading: () => <div>Loading calendar...</div>,
})

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn('h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: 'h-9 w-9 text-center text-sm p-0 relative focus-within:relative focus-within:z-20',
        day: cn('h-9 w-9 p-0 font-normal aria-selected:opacity-100 rounded-full hover:bg-accent cursor-pointer'),
        day_selected: 'bg-primary text-primary-foreground hover:bg-primary focus:bg-primary focus:text-primary-foreground',
        day_today: 'border-2 border-primary hover:bg-primary text-accent-foreground hover:text-black',
        day_outside: 'hover:bg-accent/50 text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground hover:bg-gray-300 opacity-50 !cursor-default',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-5 w-5" />,
        IconRight: () => <ChevronRight className="h-5 w-5" />,
      }}
      {...props}
    />
  )
}
Calendar.displayName = 'Calendar'

export { Calendar }
