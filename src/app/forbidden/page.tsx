'use client'

import Link from 'next/link'
import { ShieldAlert } from 'lucide-react'

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center">
          <ShieldAlert className="h-12 w-12 text-destructive-500" />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Acceso denegado</h2>
          <p className="mt-2 text-center text-sm text-gray-600">No tienes permiso para acceder a esta página.</p>
        </div>

        <div className="text-center">
          <Link href="/" className="font-medium text-primary-500 hover:text-primary-500/80">
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
