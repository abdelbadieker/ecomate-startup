import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return request.cookies.getAll(); },
        setAll(cookiesToSet: { name: string; value: string; options: any }[]) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return supabaseResponse;
  }

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
    // Unauthenticated users can only access the landing page and api auth
    const isPublicRoute = cleanPath === '/' || cleanPath.startsWith('/auth') || cleanPath.startsWith('/api/') || cleanPath.startsWith('/checkout');
    if (!isPublicRoute) {
      return NextResponse.redirect(new URL(`/${locale}/?modal=signin`, request.url));
    }
  }

  // Protect /admin additional RBAC check
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
