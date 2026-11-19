import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the user is trying to access the protected /app routes
  if (request.nextUrl.pathname.startsWith('/app')) {
    const token = request.cookies.get('signal_token')?.value;

    // If there is no token, redirect to login page
    if (!token) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  // If trying to access login page while already authenticated, redirect to app
  if (request.nextUrl.pathname === '/login') {
    const token = request.cookies.get('signal_token')?.value;
    if (token) {
      const url = request.nextUrl.clone();
      url.pathname = '/app';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/app/:path*', '/login'],
};
