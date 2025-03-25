'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === `/admin${path}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Admin Navbar */}
      <nav className="bg-primary-500 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                type="button"
                className="p-2 rounded-md text-white hover:bg-primary-500-700 focus:outline-none mr-3"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <Link href="/admin" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold">Claros Village Admin</span>
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-500-700 hover:text-white transition-colors">
                Back to Site
              </Link>
              <div className="ml-4 relative">
                <button className="flex items-center text-sm rounded-full focus:outline-none">
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-primary-500-700 flex items-center justify-center">
                    <span className="text-white">A</span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${isSidebarOpen ? 'block' : 'hidden'} w-64 bg-white dark:bg-gray-800 shadow-md min-h-screen`}>
          <div className="p-4">
            <nav className="mt-5 space-y-1">
              <Link
                href="/admin"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('') ? 'bg-primary-500-100 text-primary-500-600 dark:bg-primary-500-900 dark:text-primary-500-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${isActive('') ? 'text-primary-500-500 dark:text-primary-500-400' : 'text-gray-400 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Dashboard
              </Link>
              <Link
                href="/admin/properties"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/properties') ? 'bg-primary-500-100 text-primary-500-600 dark:bg-primary-500-900 dark:text-primary-500-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${isActive('/properties') ? 'text-primary-500-500 dark:text-primary-500-400' : 'text-gray-400 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Properties
              </Link>
              <Link
                href="/admin/users"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/users') ? 'bg-primary-500-100 text-primary-500-600 dark:bg-primary-500-900 dark:text-primary-500-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${isActive('/users') ? 'text-primary-500-500 dark:text-primary-500-400' : 'text-gray-400 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Users
              </Link>
              <Link
                href="/admin/settings"
                className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive('/settings') ? 'bg-primary-500-100 text-primary-500-600 dark:bg-primary-500-900 dark:text-primary-500-300' : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                <svg className={`mr-3 h-5 w-5 ${isActive('/settings') ? 'text-primary-500-500 dark:text-primary-500-400' : 'text-gray-400 dark:text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Settings
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
