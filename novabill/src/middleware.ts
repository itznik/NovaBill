import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define protected routes (everything inside /admin except the login page)
  const isProtectedAdminRoute = path.startsWith('/admin') && !path.startsWith('/admin/login');

  if (isProtectedAdminRoute) {
    // Check for the HTTP-Only cookie set by our login API
    const token = request.cookies.get('nova_auth')?.value;

    // If no token exists, immediately redirect to the stealth login
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    // Note: Deep cryptograpic signature verification of the JWT happens 
    // inside the Server Components (like layout.tsx) using the jwt library.
  }

  return NextResponse.next();
}

// Optimize middleware to only run on specific paths to save edge compute
export const config = {
  matcher: ['/admin/:path*'],
};
