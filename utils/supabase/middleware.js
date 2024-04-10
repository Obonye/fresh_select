import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value;
        },
        set(name, value, options) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name, options) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const session = await supabase.auth.getUser();
  const { user } = session.data;

  // Check if the user is not authenticated
  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  // Check if the user is authenticated and trying to access the login page
  if (user && request.nextUrl.pathname.startsWith("/auth/login")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Check if the user is authenticated and trying to access the register page
  if (user && request.nextUrl.pathname.startsWith("/auth/register")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // Refreshing the auth token
  await supabase.auth.getUser();

  return response;
}