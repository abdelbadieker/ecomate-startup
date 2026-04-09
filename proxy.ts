import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  // 1. Handle i18n routing first
  const intlResponse = intlMiddleware(request);
  
  // If next-intl wants to redirect (3xx) e.g. / -> /fr, 
  // return that response immediately to satisfy its internal logic.
  if (intlResponse.status >= 300 && intlResponse.status < 400) {
    return intlResponse;
  }

  // 2. Use the next-intl response as the base for our Supabase session logic
  let supabaseResponse = intlResponse;

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          // Update the request cookies to satisfy getUser()
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          
          // Update the response cookies to persist the session
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Skip if env vars are missing
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

  // Refresh session and get user
  const { data: { user } } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const localeMatch = path.match(/^\/(en|fr|ar)(\/|$)/);
  const locale = localeMatch ? localeMatch[1] : 'fr';
  const cleanPath = localeMatch ? path.replace(`/${locale}`, '') || '/' : path;

  // Redirection rules based on auth status
  if (user) {
    if (cleanPath === '/' || cleanPath.startsWith('/auth')) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  } else {
    // Unauthenticated users can only access the landing page, api auth, and checkout
    const isPublicRoute = cleanPath === '/' || cleanPath.startsWith('/auth') || cleanPath.startsWith('/api/') || cleanPath.startsWith('/checkout');
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL(`/${locale}/?modal=signin`, request.url));
    }
  }

  // Protect /admin routes
  if (cleanPath.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user?.id)
      .single();
    if (!profile?.is_admin) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
