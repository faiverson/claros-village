import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from '@/src/routes'
import NextAuth from 'next-auth'
import authConfig from './auth.config'

export const { auth } = NextAuth(authConfig)

export default auth((req) => {
  console.log(
    '----------------- ROUTE ----------------- ' + req.nextUrl.pathname,
  )
  const { auth, nextUrl } = req

  const isLogin = !!auth
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isApiAuthRoute) {
    return undefined
  }

  if (isAuthRoute && isLogin) {
    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLogin && !isPublicRoute) {
    Response.redirect(new URL('/auth/login', nextUrl))
  }

  if (!isLogin && !isPublicRoute) {
    Response.redirect(new URL('/auth/login', nextUrl))
  }

  return undefined
})

export const runtime = 'nodejs'

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
