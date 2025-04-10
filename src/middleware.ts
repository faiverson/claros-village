import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const pathname = request.nextUrl.pathname

  // Public paths that don't require authentication
  const publicPaths = ['/', '/auth/signin', '/auth/register', '/auth/verify', '/auth/error']
  const isPublicPath = publicPaths.some((path) => pathname === path)

  // Protected paths that require authentication
  const protectedPaths = ['/espacios-comunes', '/usuarios']
  const isProtectedPath = protectedPaths.some((path) => pathname.startsWith(path))

  // Allow access to public paths
  if (isPublicPath) {
    return NextResponse.next()
  }

  // Redirect to login if accessing protected path without token
  if (!token && isProtectedPath) {
    const loginUrl = new URL('/auth/signin', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Redirect to home if accessing auth pages with token
  if (token && pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}
