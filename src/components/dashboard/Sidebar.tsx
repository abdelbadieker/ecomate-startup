'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingBag, Users, Package, Clapperboard, Layers, Warehouse, Settings, LogOut } from 'lucide-react';
import { signOut } from '@/lib/actions/auth.actions';

const SIDEBAR_ITEMS = [
  { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Orders', icon: ShoppingBag, path: '/dashboard/orders' },
  { name: 'Products', icon: Package, path: '/dashboard/products' },
  { name: 'CRM', icon: Users, path: '/dashboard/crm' },
  { name: 'Fulfillment', icon: Warehouse, path: '/dashboard/fulfillment' },
  { name: 'Creative Assets', icon: Clapperboard, path: '/dashboard/creative' },
  { name: 'Integrations', icon: Layers, path: '/dashboard/integrations' },
];

const SETTINGS_ITEM = { name: 'Settings', icon: Settings, path: '/dashboard/settings' };

export default function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname();

  // Next-intl handles putting the locale in the URL implicitly via Link in their library, 
  // but since we are using next/link directly here, we prefix it or assume usePathname handles it
  const buildPath = (path: string) => `/${locale}${path}`;

  return (
    <aside className="w-64 h-full hidden md:flex flex-col bg-[var(--bg-section)]/80 backdrop-blur-xl border-r border-[var(--border-c)] z-20">
      <div className="h-20 flex items-center px-6 border-b border-[var(--border-c)]">
        <Link href={`/${locale}/dashboard`} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-white font-bold shadow-lg shadow-primary/20">
            E
          </div>
          <span className="font-poppins font-bold text-xl tracking-tight">EcoMate</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-2">
        {SIDEBAR_ITEMS.map((item) => {
          const isActive = pathname === buildPath(item.path) || (item.path !== '/dashboard' && pathname.startsWith(buildPath(item.path)));
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={buildPath(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive 
                  ? 'bg-primary/10 text-primary-light font-medium' 
                  : 'text-[var(--text-sub)] hover:text-white hover:bg-[var(--card-hover)]'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[var(--border-c)]">
         <Link
            href={buildPath(SETTINGS_ITEM.path)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
              pathname.includes('/settings')
                ? 'bg-primary/10 text-primary-light font-medium' 
                : 'text-[var(--text-sub)] hover:text-white hover:bg-[var(--card-hover)]'
            }`}
          >
            <SETTINGS_ITEM.icon className="w-5 h-5" />
            {SETTINGS_ITEM.name}
          </Link>
          <button
            onClick={() => signOut()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400/80 hover:text-red-400 hover:bg-red-400/10 mt-2"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
      </div>
    </aside>
  );
}
