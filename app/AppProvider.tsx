/**
 * Komponen AppProvider ini berfungsi sebagai wrapper untuk aplikasi kita.
 * Ia akan menyediakan context React Query untuk seluruh komponen di dalamnya.
 * React Query ini akan membantu kita dalam mengelola data yang berasal dari API.
 */

'use client'

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/ThemeProvider";
import { Header } from "@/components/Header";

// Membuat instance dari QueryClient
const queryClient = new QueryClient();

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        // Membungkus komponen children dengan QueryClientProvider
        // agar komponen-komponen di dalamnya dapat menggunakan context React Query
        <QueryClientProvider client={queryClient}>
            <ThemeProvider>
                <div className="h-16">
                    <Header />
                </div>
                {children}
            </ThemeProvider>
            <Toaster />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};
