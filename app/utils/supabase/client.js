import React from 'react'
import { createBrowserClient } from '@supabase/ssr'

export default function CreateClientSupabase() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    )
}
