'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, CheckCircle2, XCircle, ArrowLeft } from 'lucide-react';

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Verificando tu cuenta...');

  useEffect(() => {
    const verifyEmail = async () => {
      const verificationToken = searchParams.get('token');

      if (!verificationToken) {
        setStatus('error');
        setMessage('Token de verificación no proporcionado');
        return;
      }

      try {
        const response = await fetch(`/api/auth/verify?token=${verificationToken}`);
        const data = await response.json();

        if (response.ok) {
          setStatus('success');
          setMessage('¡Cuenta verificada exitosamente!');
          // Redirect to login page after successful verification
          router.push('/auth/signin');
        } else {
          setStatus('error');
          setMessage(data.message || 'Error al verificar la cuenta');
        }
      } catch {
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
        <div className="mt-8">
          {status === 'loading' && (
            <div className="flex items-center justify-center space-x-4 text-gray-600">
              <Loader2 className="h-12 w-12 animate-spin" />
              <p className="text-lg">{message}</p>
            </div>
          )}
          {status === 'success' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-4 text-green-600">
                <CheckCircle2 className="h-12 w-12" />
                <p className="text-lg">{message}</p>
              </div>
              <p className="text-gray-600">Redirigiendo al inicio...</p>
            </div>
          )}
          {status === 'error' && (
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center space-x-2">
                <XCircle className="h-8 w-8 text-red-600" />
                <p className="text-xl text-red-600">{message}</p>
              </div>
              <div className="mt-4">
                <Link
                  href="/auth/signin"
                  className="flex items-center space-x-2 text-primary-600 hover:text-primary-500"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Volver al inicio de sesión</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
