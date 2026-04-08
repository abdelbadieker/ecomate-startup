'use client';

import { Shield, Bell } from 'lucide-react';

export default function AdminTopbar({ profile }: { profile: Record<string, unknown> | null }) {
  return (
    <header className="h-20 bg-[#0d0a1f]/80 backdrop-blur-xl border-b border-[#7c3aed]/10 px-6 flex items-center justify-between z-10 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#7c3aed]/20 flex items-center justify-center">
          <Shield className="w-4 h-4 text-[#a78bfa]" />
        </div>
        <div>
          <h1 className="font-poppins font-bold text-xl text-white">Super Admin Console</h1>
          <p className="text-xs text-[#a78bfa]">{profile?.email as string}</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative w-10 h-10 rounded-full bg-white/5 border border-[#7c3aed]/15 flex items-center justify-center text-white/40 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <div className="absolute top-2 right-2.5 w-2 h-2 bg-[#7c3aed] rounded-full" />
        </button>

        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] flex items-center justify-center text-white font-bold border border-white/10">
          {(profile?.full_name as string)?.charAt(0)?.toUpperCase() || 'A'}
        </div>
      </div>
    </header>
  );
}
