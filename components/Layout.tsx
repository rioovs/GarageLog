import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Car, Wrench, FileText, Settings, LogOut, Menu, X, User as UserIcon } from 'lucide-react';
import { Button } from './ui';
import { UserProfile } from '../types';

interface LayoutProps {
  user: UserProfile;
  onLogout: () => void;
}

const Layout: React.FC<LayoutProps> = ({ user, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: 'Dashboard', path: '/app', icon: <LayoutDashboard size={20} /> },
    { label: 'Vehicles', path: '/app/vehicles', icon: <Car size={20} /> },
    { label: 'Service Log', path: '/app/services', icon: <Wrench size={20} /> },
    { label: 'Taxes & Reminders', path: '/app/taxes', icon: <FileText size={20} /> },
  ];

  if (user.role === 'ADMIN') {
    navItems.push({ label: 'User Management', path: '/app/admin/users', icon: <Settings size={20} /> });
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen w-full bg-slate-50">
      {/* Sidebar for Desktop */}
      <aside className="hidden md:flex w-64 flex-col border-r bg-white">
        <div className="flex h-16 items-center border-b px-6">
          <Car className="mr-2 h-6 w-6 text-primary" />
          <span className="text-lg font-bold">GarageLog</span>
        </div>
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end={item.path === '/app'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`
                  }
                >
                  {item.icon}
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
              <UserIcon size={18} />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{user.full_name}</p>
              <p className="truncate text-xs text-slate-500">{user.role}</p>
            </div>
          </div>
          <Button variant="ghost" className="mt-2 w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700" onClick={onLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-white px-4 md:hidden">
          <Button variant="ghost" size="icon" onClick={toggleMenu}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 font-semibold">
            <Car className="h-5 w-5 text-primary" />
            GarageLog
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/50 md:hidden">
            <div className="absolute left-0 top-0 h-full w-3/4 bg-white p-4 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                 <span className="text-lg font-bold">Menu</span>
                 <Button variant="ghost" size="icon" onClick={toggleMenu}>
                    <X className="h-5 w-5" />
                 </Button>
              </div>
              <nav className="space-y-2">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive
                          ? 'bg-primary text-primary-foreground'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`
                    }
                  >
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </nav>
               <div className="absolute bottom-4 left-4 right-4">
                  <Button variant="destructive" className="w-full" onClick={onLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </Button>
               </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;