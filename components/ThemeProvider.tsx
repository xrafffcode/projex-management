'use client';

import * as React from 'react'
import {
    ThemeProvider as NextThemeProvider,
    ThemeProviderProps,
} from 'next-themes'

// Komponen ini digunakan untuk mengatur tema pada aplikasi
export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
    // next-themes menggunakan attribute "class" untuk mengatur tema
    // defaultTheme diatur ke "system" agar tema mengikuti settingan sistem
    // enableSystem digunakan agar tema dapat diubah melalui settingan sistem
    // disableTransitionOnChange digunakan agar tidak ada efek transisi ketika tema diubah
    return (
        <NextThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            {...props}
        >
            {children}
        </NextThemeProvider>
    )
}
