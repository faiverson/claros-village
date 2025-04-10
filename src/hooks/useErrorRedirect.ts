import { useRouter } from 'next/navigation'

type ErrorType = 'Unauthorized' | 'Forbidden' | 'NotFound' | 'InternalServerError'

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

  const handleError = (error: string | undefined) => {
    if (!error) return

    switch (error) {
      case 'Unauthorized':
        handlers.onUnauthorized()
        break
      case 'Forbidden':
        handlers.onForbidden()
        break
      case 'User not found':
        handlers.onNotFound()
        break
      case 'Internal Server Error':
        handlers.onInternalServerError()
        break
    }
  }

  return { handleError }
}
