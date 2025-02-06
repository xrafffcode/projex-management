import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

// paths yang tidak memerlukan autentikasi
const publicPaths = [
    '/',
    '/login',
    '/create-account',
    '/auth/callback',
    '/auth/auth-error',
    '/profile/:id',
];

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({
                        request,
                    });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    const {
        data: { session },
    } = await supabase.auth.getSession();

    const currentPath = request.nextUrl.pathname;
    const nextPath =
        currentPath === '/login' || currentPath === '/create-account'
            ? request.nextUrl.searchParams.get('next') || '/' // Default to landing page
            : currentPath;

    // Cek apakah current path sesuai dengan salah satu pola public path
    const isPublicPath = publicPaths.some((path) => {
        // Convert path pattern to regex
        const pattern = path.replace(':id', '[^/]+');
        const regex = new RegExp(`^${pattern}$`);
        return regex.test(currentPath);
    });

    if (!session && !isPublicPath) {
        // tidak ada user, redirect ke halaman login dengan current path sebagai next
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('next', currentPath);
        return NextResponse.redirect(url);
    }

    if (
        session &&
        (currentPath === '/login' || currentPath === '/create-account')
    ) {
        // Untuk user yang sudah login dan mencoba mengakses halaman auth, redirect ke next path
        const url = new URL(nextPath, request.url);
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
