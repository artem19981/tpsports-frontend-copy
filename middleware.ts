import { NextRequest, NextResponse } from 'next/server';

const authRoutes = ['/user-settings', '/ai/chat', '/initial-onboard'];
const noAuthRoutes = ['/login', '/registration', '/recover-password'];

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value;

  const path = request.nextUrl.pathname;

  if (path === '/logout') {
    const response = NextResponse.next();
    response.cookies.delete('access_token');
    return response;
  }

  // with auth redirects
  if (token) {
    if (noAuthRoutes.some((route) => path.startsWith(route))) {
      return Response.redirect(new URL('/ai', request.url));
    }
  } else {
    if (authRoutes.some((route) => path.startsWith(route))) {
      return Response.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
