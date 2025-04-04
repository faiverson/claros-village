import React from 'react'
import { cn } from '@/lib/utils'

type AlertVariant = 'error' | 'success' | 'warning' | 'info'

interface AlertProps {
  variant?: AlertVariant
  message: string
  className?: string
}

const variantStyles: Record<AlertVariant, string> = {
  error: 'bg-red-50 text-destructive-800 border-red-200',
  success: 'bg-green-50 text-green-800 border-green-200',
  warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
  info: 'bg-blue-50 text-blue-800 border-blue-200',
}

const Alert: React.FC<AlertProps> = ({ variant = 'info', message, className }) => {
  if (!message) return null

  return (
    <div className={cn('rounded-md p-4 border', variantStyles[variant], className)}>
      <div className="flex">
        <div className="ml-3">
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

export default Alert
