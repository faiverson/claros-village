import { DEFAULT_LOGIN_REDIRECT, apiPrefix, authRoutes, publicRoutes } from '@/src/routes'
import NextAuth from 'next-auth'
import { NextResponse } from 'next/server'
import authConfig from './auth.config'

export default NextAuth(authConfig).auth

// export const { auth } = NextAuth(authConfig)

// export default auth((req) => {
//   const { auth, nextUrl } = req
//   console.log(
//     `-------------- ROUTE ${nextUrl.pathname} ---------------`
//   )
//   const isAuth = !!auth
//   console.log('isAuth', auth)
//   // const isApiRoute = nextUrl.pathname.startsWith(apiPrefix)
//   // const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname)

//   // if (isApiRoute && isPublicRoute) {
//   //   return NextResponse.next()
//   // }

//   // if (isAuth && isAuthRoute) {
//   //   return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT + '?r=1', nextUrl))
//   // }

//   // if (!isAuth && !isPublicRoute) {
//   //   return NextResponse.redirect(new URL('/login', nextUrl))
//   // }

//   return NextResponse.next()
// })

export const config = {
    matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
