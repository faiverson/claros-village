'use client'

import { useState } from 'react'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CVPasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  placeholder?: string
}

export function CVPassword({ className, error, label, placeholder, ...props }: CVPasswordProps) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="relative">
      {label && (
        <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Lock className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type={showPassword ? 'text' : 'password'}
          className={cn(
            'appearance-none rounded-md relative block w-full pl-10 pr-10 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm',
            error && 'border-red-500 focus:ring-red-500 focus:border-red-500',
            className
          )}
          placeholder={placeholder}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600 focus:outline-none z-20"
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  )
}
