'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Car, FileText, Wrench, Users, Settings } from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    href: '/app',
    icon: LayoutDashboard,
  },
  {
    title: 'Vehicles',
    href: '/app/vehicles',
    icon: Car,
  },
  {
    title: 'Taxes',
    href: '/app/taxes',
    icon: FileText,
  },
  {
    title: 'Services',
    href: '/app/services',
    icon: Wrench,
  },
];

const adminItems = [
  {
    title: 'Users',
    href: '/app/admin/users',
    icon: Users,
  },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 p-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900',
            pathname === item.href ? 'bg-slate-100 text-slate-900' : 'text-slate-500'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
      <div className="my-2 border-t border-slate-200" />
      <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
        Admin
      </div>
      {adminItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 hover:text-slate-900',
            pathname === item.href ? 'bg-slate-100 text-slate-900' : 'text-slate-500'
          )}
        >
          <item.icon className="h-4 w-4" />
          {item.title}
        </Link>
      ))}
    </nav>
  );
}
