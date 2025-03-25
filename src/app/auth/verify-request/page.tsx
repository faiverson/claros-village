'use client';

import Link from 'next/link';

export default function VerifyRequest() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Check your email
          </h2>
        </div>

        <div className="rounded-md bg-blue-50 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">
                A sign in link has been sent to your email address. Please check your inbox.
              </h3>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/auth/signin"
            className="font-medium text-primary-500 hover:text-primary-500/80"
          >
            Return to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
