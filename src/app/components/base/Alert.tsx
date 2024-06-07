import { AlertType } from '@/utils/types'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Button } from '@nextui-org/react'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface AlertProps {
  title?: string
  message: string
  type: AlertType
  show: boolean
}

export default function Alert({
  show = false,
  title = 'Error',
  message,
  type,
}: AlertProps) {
  const [isOpen, setIsOpen] = useState<boolean>(show)
  let typeClass, closeClass

  switch (type) {
    case 'error':
      typeClass = 'bg-red-100 border-red-400 text-red-700'
      closeClass = 'text-red-700'
      break
    case 'info':
      typeClass = 'bg-blue-100 border-blue-400 text-blue-700'
      closeClass = 'text-blue-700'
      break
    case 'success':
      typeClass = 'bg-green-100 border-green-400 text-green-700'
      closeClass = 'text-green-700'
      break
    case 'warning':
      typeClass = 'bg-yellow-100 border-yellow-400 text-yellow-700'
      closeClass = 'text-yellow-700'
      break
  }

  useEffect(() => setIsOpen(show), [show])

  return (
    <AnimatePresence>
      {!!isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`${typeClass} relative flex flex-col rounded border px-4 py-3`}
          role="alert"
        >
          <Button
            isIconOnly
            className="absolute right-1 top-1 w-fit bg-transparent"
            onClick={() => setIsOpen(false)}
            aria-label="close"
          >
            <XMarkIcon className={`w-5 ${closeClass}`} />
          </Button>
          <strong className="font-bold">{title}</strong>
          <span className="block sm:inline">{message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
