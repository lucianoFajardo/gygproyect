import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

export default async function updateSession(request) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    const {
        data: { user },
    } = await supabase.auth.getUser()
    const url = request.nextUrl.clone()

    if (
        !user &&
        !request.nextUrl.pathname.startsWith('/login') &&
        !request.nextUrl.pathname.startsWith('/auth')
    ) {
        url.pathname = '/login'
        return NextResponse.redirect(url)
    }

    if (user && request.nextUrl.pathname.startsWith('/login')) {
        //* solo si el usuario ya esta logueado lo redirige a la ruta por defecto para que no pueda volver al login
        url.pathname= '/';
        return NextResponse.redirect(url);
    }

    if (!user && !request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/auth')) {
        //* si el usuairo no esta registrado no podra ingresar a ninguna ruta protegida
        url.pathname = '/login';
        return NextResponse.redirect(url); 
    }


    return supabaseResponse
}