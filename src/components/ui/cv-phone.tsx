'use client'

import { forwardRef } from 'react'

import { Controller, useFormContext } from 'react-hook-form'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

interface CVPhoneProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
  name: string
}

export const CVPhone = forwardRef<HTMLInputElement, CVPhoneProps>(({ error, label, name, ...props }, ref) => {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="relative z-30">
          {label && (
            <label htmlFor={props.id} className="block text-sm font-medium text-gray-700 mb-1">
              {label}
            </label>
          )}
          <PhoneInput
            country={'ar'}
            preferredCountries={['ar', 'uy', 'cl', 'br', 'py', 'bo']}
            value={field.value || ''}
            masks={{ ar: '(...) ...-....' }}
            inputProps={{
              name: field.name,
              ref: (inputRef: HTMLInputElement | null) => {
                if (typeof ref === 'function') {
                  ref(inputRef)
                } else if (ref) {
                  ref.current = inputRef
                }
              },
            }}
            onChange={(value) => {
              field.onChange(value)
            }}
            containerClass="!w-full"
            inputClass="!w-full !h-[42px]"
            buttonClass="!h-[42px]"
            dropdownStyle={{
              width: '300px',
            }}
            specialLabel=""
            enableSearch
            searchClass="!p-2 !m-0 !text-sm"
            searchPlaceholder="Buscar país..."
            countryCodeEditable={false}
          />
          {error && <p className="mt-1 text-xs text-destructive-500">{error}</p>}
          <style jsx global>{`
            .react-tel-input .form-control {
              width: 100% !important;
              height: 42px !important;
              padding-left: 48px !important;
              border: 1px solid ${error ? '#ef4444' : '#d1d5db'} !important;
              border-radius: 0.375rem !important;
              font-size: 0.875rem !important;
              background-color: white !important;
              box-shadow: 0 0 0 1px ${error ? '#ef4444' : 'transparent'} !important;
              color: #111827 !important;
              position: relative;
            }

            .react-tel-input .flag-dropdown {
              background-color: transparent !important;
              border: 1px solid ${error ? '#ef4444' : '#d1d5db'} !important;
              border-right: none !important;
              border-radius: 0.375rem 0 0 0.375rem !important;
            }

            .react-tel-input .form-control:focus {
              outline: none !important;
              border-color: var(--color-primary) !important;
            }

            .react-tel-input .form-control:focus + .flag-dropdown {
              border-color: var(--color-primary) !important;
            }

            .react-tel-input .selected-flag {
              background-color: transparent !important;
              border-radius: 0.375rem 0 0 0.375rem !important;
            }

            .react-tel-input .selected-flag:hover,
            .react-tel-input .selected-flag:focus {
              background-color: transparent !important;
            }

            .react-tel-input .flag-dropdown.open {
              background-color: transparent !important;
              border-radius: 0.375rem 0 0 0.375rem !important;
            }

            .react-tel-input .flag-dropdown.open .selected-flag {
              background-color: transparent !important;
              border-radius: 0.375rem 0 0 0.375rem !important;
            }

            .react-tel-input .country-list {
              width: 300px !important;
              margin: 4px 0 !important;
              border: 1px solid #d1d5db !important;
              border-radius: 0.375rem !important;
              box-shadow:
                0 4px 6px -1px rgba(0, 0, 0, 0.1),
                0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
              z-index: 20;
            }

            .react-tel-input .country-list .search-box {
              width: calc(100% - 16px) !important;
              padding: 8px !important;
              padding-left: 30px !important;
              margin: 8px !important;
              border: 1px solid #d1d5db !important;
              border-radius: 0.375rem !important;
              z-index: 20;
              position: relative !important;
              display: inline-block !important;
            }

            .react-tel-input .country-list .search {
              display: flex;
            }

            .react-tel-input .country-list .search-box input {
              width: 100% !important;
              padding: 0 !important;
              border: none !important;
              background: transparent !important;
            }

            .react-tel-input .country-list .country {
              padding: 8px 10px !important;
            }

            .react-tel-input .country-list .country:hover {
              background-color: #f3f4f6 !important;
            }
          `}</style>
        </div>
      )}
    />
  )
})

CVPhone.displayName = 'CVPhone'
