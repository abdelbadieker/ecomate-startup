'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Layers, Star, Handshake, Warehouse, LogOut, Shield } from 'lucide-react';
import { signOut } from '@/lib/actions/auth.actions';

const ADMIN_ITEMS = [
  { name: 'Global Analytics', icon: LayoutDashboard, path: '/admin' },
  { name: 'Merchants', icon: Users, path: '/admin/merchants' },
  { name: 'Client Integrations', icon: Layers, path: '/admin/integrations' },
  { name: 'Reviews', icon: Star, path: '/admin/reviews' },
  { name: 'Partners', icon: Handshake, path: '/admin/partners' },
  { name: 'Fulfillment', icon: Warehouse, path: '/admin/fulfillment' },
];

export default function AdminSidebar({ locale }: { locale: string }) {
  const pathname = usePathname();
  const buildPath = (path: string) => `/${locale}${path}`;

  return (
    <aside className="w-64 h-full hidden md:flex flex-col bg-[#0d0a1f]/80 backdrop-blur-xl border-r border-[#7c3aed]/10 z-20">
      <div className="h-20 flex items-center px-6 border-b border-[#7c3aed]/10">
        <Link href={buildPath('/admin')} className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-white font-bold shadow-lg shadow-[#7c3aed]/30">
            <Shield className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="font-poppins font-bold text-lg tracking-tight text-white">EcoMate</span>
            <span className="text-[10px] font-bold text-[#a78bfa] tracking-widest uppercase -mt-1">ADMIN</span>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-4 flex flex-col gap-1.5">
        {ADMIN_ITEMS.map((item) => {
          const isActive = pathname === buildPath(item.path) ||
            (item.path !== '/admin' && pathname.startsWith(buildPath(item.path)));
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              href={buildPath(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-[#7c3aed]/15 text-[#a78bfa] font-medium border border-[#7c3aed]/20'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-5 h-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-[#7c3aed]/10">
        <Link
          href={buildPath('/dashboard')}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/40 hover:text-white hover:bg-white/5 transition-all mb-2"
        >
          <LayoutDashboard className="w-5 h-5" />
          Merchant View
        </Link>
        <button
          onClick={() => signOut()}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-red-400/60 hover:text-red-400 hover:bg-red-400/10"
        >
          <LogOut className="w-5 h-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
