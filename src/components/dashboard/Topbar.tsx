'use client';

import { Bell, Search, Menu } from 'lucide-react';
import Image from 'next/image';

interface TopbarProps {
  profile: {
    business_name?: string;
    full_name?: string;
    avatar_url?: string;
    subscription_status?: string;
  } | null;
}

export default function Topbar({ profile }: TopbarProps) {
  const businessName = profile?.business_name || profile?.full_name || 'My Business';
  const isActive = profile?.subscription_status === 'active';

  return (
    <header className="h-20 bg-[var(--bg-section)]/80 backdrop-blur-xl border-b border-[var(--border-c)] px-6 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center gap-4">
        {/* Mobile menu stub */}
        <button className="md:hidden p-2 -ml-2 text-[var(--text-sub)] hover:text-white transition-colors">
          <Menu className="w-6 h-6" />
        </button>

        <div>
          <h1 className="font-poppins font-bold text-xl">{businessName}</h1>
          <div className="flex items-center gap-2 mt-1">
            {isActive ? (
              <div className="badge-green flex items-center gap-1.5 px-2 py-0.5">
                <div className="dot-green" />
                Subscription: Active
              </div>
            ) : (
              <div className="badge-blue flex items-center gap-1.5 px-2 py-0.5">
                Subscription: Inactive
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden md:flex relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search orders..." 
            className="bg-white/5 border border-[var(--border-c)] rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-light transition-colors w-64"
          />
        </div>

        <button className="relative w-10 h-10 rounded-full bg-white/5 border border-[var(--border-c)] flex items-center justify-center text-[var(--text-sub)] hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <div className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[var(--bg-section)]" />
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-admin flex items-center justify-center text-white font-bold border border-white/10 overflow-hidden cursor-pointer">
          {profile?.avatar_url ? (
            <Image 
              src={profile.avatar_url} 
              alt="Avatar" 
              fill
              className="object-cover" 
            />
          ) : (
            businessName.charAt(0).toUpperCase()
          )}
        </div>
      </div>
    </header>
  );
}
