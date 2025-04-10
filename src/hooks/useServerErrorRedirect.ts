import { redirect } from 'next/navigation'

export function handleServerError(error: string | undefined) {
  if (!error) return

  switch (error) {
    case 'Unauthorized':
      redirect('/auth/signin')
    case 'Forbidden':
      redirect('/forbidden')
    case 'User not found':
      redirect('/404')
    case 'Internal Server Error':
      redirect('/500')
  }
}
