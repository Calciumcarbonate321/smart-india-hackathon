import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import supabase from '@smartindia/components/supabase'

export async function middleware(request: NextRequest) {
    const res = NextResponse.next()
    const {
        data: { session: user },
    } = await supabase.auth.getSession()

    if (!user) {
        return NextResponse.redirect(new URL('/auth/login', request.url))
    }
    return res
}


// See "Matching Paths" below to learn more
export const config = {
    matcher: '/about/:path*',
}