'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast"
import { Icons } from '@/components/Icons';

export function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            setIsLoading(true);

        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Error',
                description: 'Terjadi kesalahan, silahkan coba lagi',
            })
        } finally {
            setIsLoading(false);

            toast({
                title: 'Login Berhasil',
                description: 'Selamat datang di ProjeX',
            });
        }
    };

    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Masuk</CardTitle>
                    <CardDescription className="text-xs">Selamat Datang Di ProjeX</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div>
                        Belum punya akun? {''}
                        <Link href="/create-account" className="text-blue-500">
                            Daftar
                        </Link>
                    </div>

                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password">Password</Label>
                            <Link href="/forgot-password" className="text-xs text-blue-500">
                                Lupa password?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Masuk
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}