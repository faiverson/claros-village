'use client'

import { forwardRef } from 'react'

import dynamic from 'next/dynamic'
import { Controller, useFormContext } from 'react-hook-form'
import type { CSSObjectWithLabel, StylesConfig, SingleValue, GroupBase, SelectInstance } from 'react-select'

import { Variant } from '@/utils/enums'

const Select = dynamic(() => import('react-select'), {
  ssr: false,
}) as typeof import('react-select').default<Option, false, GroupBase<Option>>

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
  variant?: Variant
  height?: string
}

export const CVSelect = forwardRef<SelectInstance<Option, false, GroupBase<Option>>, CVSelectProps>(
  (
    {
      id,
      name,
      options,
      placeholder,
      error,
      label,
      isClearable = true,
      isSearchable = true,
      variant = Variant.PRIMARY,
      height = '38px',
      ...props
    },
    ref
  ) => {
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
                    minHeight: height,
                    height: height,
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
