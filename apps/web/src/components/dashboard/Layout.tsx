'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, Users, Settings, LogOut, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function DashboardSidebar() {
  const pathname = usePathname();

  const navigation = [
    { name: 'Dashboard', href: '/app', icon: LayoutDashboard },
    { name: 'Leads Queue', href: '/app/leads', icon: Users },
  ];

  return (
    <div className="flex h-screen w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center px-6 border-b">
        <Link href="/" className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-accent" />
          <span className="text-xl font-bold tracking-tight text-primary">Signal</span>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-accent/10 text-accent'
                    : 'text-muted-foreground hover:bg-muted hover:text-primary'
                )}
              >
                <item.icon
                  className={cn(
                    'mr-3 h-5 w-5 flex-shrink-0',
                    isActive ? 'text-accent' : 'text-muted-foreground group-hover:text-primary'
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="border-t p-4">
        <div className="space-y-1">
          <Link
            href="#"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
          >
            <Settings className="mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
            Settings
          </Link>
          <Link
            href="/"
            className="group flex items-center rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-primary transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-muted-foreground group-hover:text-primary" />
            Sign out
          </Link>
        </div>
      </div>
    </div>
  );
}

export function DashboardHeader() {
  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-background px-6">
      <div className="flex flex-1 items-center justify-between">
        <h2 className="text-lg font-semibold text-primary">Overview</h2>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
              JD
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium text-primary">Jane Doe</p>
              <p className="text-xs text-muted-foreground">Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
