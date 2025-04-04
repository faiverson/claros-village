'use client'

import { forwardRef } from 'react'
import dynamic from 'next/dynamic'
import type { CSSObjectWithLabel, StylesConfig, SingleValue, GroupBase, SelectInstance } from 'react-select'
import { Controller, useFormContext } from 'react-hook-form'

const Select = dynamic(() => import('react-select'), {
  ssr: false,
})

interface Option {
  value: string
  label: string
}

interface CVSelectProps {
  id: string
  name: string
  options: Option[]
  placeholder?: string
  error?: string
  label?: string
  isClearable?: boolean
  isSearchable?: boolean
}

export const CVSelect = forwardRef<SelectInstance<Option, false, GroupBase<Option>>, CVSelectProps>(
  ({ id, name, options, placeholder, error, label, isClearable = true, isSearchable = true, ...props }, ref) => {
    const { control } = useFormContext()

    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <div className="relative">
            {label && (
              <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {label}
              </label>
            )}
            <Select
              id={id}
              name={field.name}
              ref={ref}
              options={options}
              value={options.find((option) => option.value === field.value)}
              onChange={(newValue: SingleValue<Option>) => {
                field.onChange(newValue?.value || '')
              }}
              onBlur={field.onBlur}
              placeholder={placeholder}
              isClearable={isClearable}
              isSearchable={isSearchable}
              className="react-select-container"
              classNamePrefix="react-select"
              {...props}
              styles={
                {
                  control: (base: CSSObjectWithLabel) => ({
                    ...base,
                    minHeight: '38px',
                    borderRadius: '0.375rem',
                    borderColor: error ? 'var(--color-destructive)' : '#d1d5db',
                    '&:hover': {
                      borderColor: error ? 'var(--color-destructive)' : '#9ca3af',
                    },
                    '&:focus-within': {
                      borderColor: error ? 'var(--color-destructive)' : 'var(--color-primary)',
                      borderWidth: '0px',
                      boxShadow: '0 0 0 1px var(--color-primary)',
                    },
                    outline: 'none',
                  }),
                  menu: (base: CSSObjectWithLabel) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  option: (base: CSSObjectWithLabel, state: { isFocused: boolean }) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
                    color: '#1f2937',
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                  }),
                } satisfies StylesConfig
              }
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </div>
        )}
      />
    )
  }
)

CVSelect.displayName = 'CVSelect'
