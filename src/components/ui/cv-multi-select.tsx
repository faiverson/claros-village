'use client'

import { forwardRef } from 'react'
import dynamic from 'next/dynamic'
import type { CSSObjectWithLabel, StylesConfig, MultiValue, GroupBase, SelectInstance } from 'react-select'
import { Controller, useFormContext } from 'react-hook-form'
import { Check } from 'lucide-react'
import { Variant } from '@/utils/enums'

const Select = dynamic(() => import('react-select'), {
  ssr: false,
}) as any

interface Option {
  value: string
  label: string
}

interface CVMultiSelectProps {
  id: string
  name: string
  options: Option[]
  placeholder?: string
  error?: string
  label?: string
  isClearable?: boolean
  isSearchable?: boolean
  variant?: Variant
}

export const CVMultiSelect = forwardRef<SelectInstance<Option, true, GroupBase<Option>>, CVMultiSelectProps>(
  ({ id, name, options, placeholder, error, label, isClearable = true, isSearchable = true, variant = Variant.PRIMARY, ...props }, ref) => {
    const { control } = useFormContext()
    const currentVariant = error ? Variant.ERROR : variant

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
              value={options.filter((option) => field.value?.includes(option.value))}
              onChange={(newValue: MultiValue<Option>) => {
                field.onChange(newValue.map((option) => option.value))
              }}
              onBlur={field.onBlur}
              placeholder={placeholder}
              isClearable={isClearable}
              isSearchable={isSearchable}
              isMulti
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
                      borderColor: error ? 'var(--color-destructive)' : `var(--color-${currentVariant})`,
                      borderWidth: '0px',
                      boxShadow: `0 0 0 1px var(--color-${currentVariant})`,
                    },
                    outline: 'none',
                  }),
                  menu: (base: CSSObjectWithLabel) => ({
                    ...base,
                    zIndex: 9999,
                  }),
                  option: (base: CSSObjectWithLabel, state: { isSelected: boolean; isFocused: boolean }) => ({
                    ...base,
                    backgroundColor: state.isFocused ? '#f3f4f6' : 'white',
                    color: '#1f2937',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    '&:hover': {
                      backgroundColor: '#f3f4f6',
                    },
                  }),
                  multiValue: (base: CSSObjectWithLabel) => ({
                    ...base,
                    backgroundColor: `var(--color-${currentVariant}-100)`,
                    color: `var(--color-${currentVariant}-700)`,
                    borderRadius: '0.25rem',
                  }),
                  multiValueLabel: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: `var(--color-${currentVariant}-700)`,
                    padding: '0.25rem 0.5rem',
                  }),
                  multiValueRemove: (base: CSSObjectWithLabel) => ({
                    ...base,
                    color: `var(--color-${currentVariant}-700)`,
                    '&:hover': {
                      backgroundColor: `var(--color-${currentVariant}-200)`,
                      color: `var(--color-${currentVariant}-800)`,
                    },
                  }),
                } satisfies StylesConfig
              }
              components={{
                Option: ({ children, isSelected, ...props }: { children: React.ReactNode; isSelected: boolean; [key: string]: any }) => (
                  <div {...props}>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-4 h-4 border rounded flex items-center justify-center ${isSelected ? `bg-${currentVariant}-500 border-${currentVariant}-500` : 'border-gray-300'}`}
                      >
                        {isSelected && <Check className="w-3 h-3 text-white" />}
                      </div>
                      {children}
                    </div>
                  </div>
                ),
              }}
            />
            {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
          </div>
        )}
      />
    )
  }
)

CVMultiSelect.displayName = 'CVMultiSelect'
