'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Icons } from '@/components/Icons';
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


export function CreateAccountForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            toast({
                variant: 'destructive',
                title: 'Data Tidak Sesuai',
                description: 'Konfirmasi password tidak sesuai dengan password.',
            });
            return;
        }

        try {
            setIsLoading(true);

            toast({
                title: 'Berhasil',
                description: 'Cek email untuk aktivasi akun.',
            });

            router.push('/login');
        } catch (error) {
            toast({
                variant: 'destructive',
                title: 'Gagal Membuat Akun',
                description: "Terjadi kesalahan, silahkan coba lagi.",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-96">
            <form onSubmit={handleSubmit}>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">Buat Akun</CardTitle>
                    <CardDescription className="text-xs">
                        Masukkan email dan password untuk membuat akun baru.
                    </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div>
                        Sudah punya akun?{' '}
                        <Link href="/login" className="text-blue-500">
                            Masuk
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
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                            required
                        />
                    </div>

                    <Button className="w-full" type="submit" disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Daftar
                    </Button>
                </CardContent>
            </form>
        </Card>
    );
}