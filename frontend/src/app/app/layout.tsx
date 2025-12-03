'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SidebarNav } from '@/components/app/sidebar-nav';
import { TopBar } from '@/components/app/top-bar';
import { Car, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };
    checkUser();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-slate-50/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-6 lg:h-[60px]">
            <Link href="/" className="flex items-center gap-2 font-bold">
              <Car className="h-6 w-6 text-blue-600" />
              <span className="">GarageLog</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <SidebarNav />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <TopBar />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-slate-50/50">
          {children}
        </main>
      </div>
    </div>
  );
}
