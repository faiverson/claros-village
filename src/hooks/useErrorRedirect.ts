import { useRouter } from 'next/navigation'
import { ErrorType } from '@/utils/types/error'

interface ErrorRedirectOptions {
  onUnauthorized?: () => void
  onForbidden?: () => void
  onNotFound?: () => void
  onInternalServerError?: () => void
}

export function useErrorRedirect(options: ErrorRedirectOptions = {}) {
  const router = useRouter()

  const defaultHandlers = {
    onUnauthorized: () => router.push('/auth/signin'),
    onForbidden: () => router.push('/forbidden'),
    onNotFound: () => router.push('/404'),
    onInternalServerError: () => router.push('/500'),
  }

  const handlers = {
    ...defaultHandlers,
    ...options,
  }

  const handleError = (error: ErrorType | undefined) => {
    if (!error) return

    switch (error) {
      case 'Unauthorized':
        handlers.onUnauthorized()
        break
      case 'Forbidden':
        handlers.onForbidden()
        break
      case 'NotFound':
        handlers.onNotFound()
        break
      case 'InternalServerError':
        handlers.onInternalServerError()
        break
    }
  }

  return { handleError }
}
