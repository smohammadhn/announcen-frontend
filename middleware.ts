import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import authService from './services/authService'

export async function middleware(req: NextRequest) {
  // return NextResponse.next()
  const url = req.nextUrl.pathname

  if (url === '/') return NextResponse.redirect(new URL('/dashboard', req.url))
  if (!url.includes('/dashboard')) return NextResponse.next()

  const token = req.cookies.get('auth-token')?.value

  // inside protected pages:

  // no token available
  if (!token) return NextResponse.redirect(new URL('/login', req.url))
  return NextResponse.next()

  // there is a token present in cookies
  //   const { isTokenVerified } = await authService.verifyToken(token)
  //   if (isTokenVerified) return NextResponse.next()
  //   return NextResponse.redirect(new URL('/login', req.url))
}

export const config = {
  // matcher: ['/((?!api|_next/static|_next/image|favicon.ico|logos|images).*)'],
  matcher: ['/', '/dashboard', '/dashboard/(.*)'],
}
