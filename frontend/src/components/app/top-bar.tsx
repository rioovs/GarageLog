'use client';

import Link from 'next/link';
import { Button } from '@/components/ui';
import { Car, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function TopBar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-white px-6 lg:h-[60px]">
      <Link className="flex items-center gap-2 font-bold md:hidden" href="#">
        <Car className="h-6 w-6" />
        <span className="">GarageLog</span>
      </Link>
      <div className="w-full flex-1">
        {/* Breadcrumb or Title could go here */}
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm font-medium">
          <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center">
            <User className="h-4 w-4 text-slate-500" />
          </div>
          <span className="hidden md:inline-block">John Doe</span>
        </div>
        <Button variant="ghost" size="icon" onClick={handleLogout} title="Logout">
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Logout</span>
        </Button>
      </div>
    </header>
  );
}
