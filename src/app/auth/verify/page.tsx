'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando tu cuenta...');

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');

      if (!token) {
        setStatus('error');
        setMessage('Token de verificación no proporcionado');
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${token}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('¡Cuenta verificada exitosamente!');
          // Redirect to login after 3 seconds
          setTimeout(() => {
            router.push('/auth/signin');
          }, 3000);
        } else {
          setStatus('error');
          setMessage(data.message || 'Error al verificar la cuenta');
        }
      } catch (error) {
        setStatus('error');
        setMessage('Error al verificar la cuenta');
      }
    };

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Verificación de cuenta
          </h2>
        </div>
        <div className="mt-8 text-center">
          {status === 'loading' && (
            <div className="text-gray-600">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4">{message}</p>
            </div>
          )}
          {status === 'success' && (
            <div className="text-green-600">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="mt-4">{message}</p>
              <p className="mt-2 text-sm text-gray-600">
                Serás redirigido al inicio de sesión en unos segundos...
              </p>
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-600">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <p className="mt-4">{message}</p>
              <div className="mt-4">
                <Link
                  href="/auth/signin"
                  className="text-primary hover:text-primary-600"
                >
                  Volver al inicio de sesión
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
