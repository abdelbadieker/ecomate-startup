'use client';

import { useState, useMemo } from 'react';
import { Search, Shield, User } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Subscription {
  status: string;
  plans?: {
    name: string;
  };
}

interface Merchant {
  id: string;
  business_name?: string;
  full_name?: string;
  email: string;
  wilaya?: string;
  created_at: string;
  is_admin: boolean;
  subscription_status?: string;
  subscriptions?: Subscription | Subscription[] | null;
}

export default function MerchantsTable({ merchants }: { merchants: Merchant[] }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return merchants.filter((m) =>
      m.full_name?.toLowerCase().includes(search.toLowerCase()) ||
      m.business_name?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase())
    );
  }, [merchants, search]);

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search merchants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-[#7c3aed]/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#7c3aed]/30 transition-colors"
          />
        </div>
        <span className="text-sm text-white/40">{merchants.length} total merchants</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#7c3aed]/10">
              <th className="p-4 text-sm font-semibold text-white/40">Merchant</th>
              <th className="p-4 text-sm font-semibold text-white/40">Email</th>
              <th className="p-4 text-sm font-semibold text-white/40">Wilaya</th>
              <th className="p-4 text-sm font-semibold text-white/40">Plan</th>
              <th className="p-4 text-sm font-semibold text-white/40">Status</th>
              <th className="p-4 text-sm font-semibold text-white/40">Role</th>
              <th className="p-4 text-sm font-semibold text-white/40">Joined</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#7c3aed]/5">
            {filtered.map((merchant) => {
              const sub = Array.isArray(merchant.subscriptions)
                ? merchant.subscriptions[0]
                : merchant.subscriptions;
              const planName = sub?.plans?.name || '—';
              const subStatus = sub?.status || merchant.subscription_status || 'inactive';

              return (
                <tr key={merchant.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#7c3aed]/30 to-[#5b21b6]/30 flex items-center justify-center text-white font-bold text-sm">
                        {merchant.full_name?.charAt(0)?.toUpperCase() || 'M'}
                      </div>
                      <div>
                        <span className="text-white font-medium block">{merchant.business_name || merchant.full_name}</span>
                        {merchant.business_name && (
                          <span className="text-xs text-white/30">{merchant.full_name}</span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/50">{merchant.email}</td>
                  <td className="p-4 text-sm text-white/40">{merchant.wilaya || '—'}</td>
                  <td className="p-4">
                    <span className="text-sm text-[#a78bfa] bg-[#7c3aed]/10 px-2.5 py-1 rounded-md font-medium">
                      {planName}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      subStatus === 'active' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                      subStatus === 'trial' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                      'bg-white/5 text-white/30 border border-white/5'
                    }`}>
                      {subStatus}
                    </span>
                  </td>
                  <td className="p-4">
                    {merchant.is_admin ? (
                      <span className="flex items-center gap-1 text-xs text-[#a78bfa]">
                        <Shield className="w-3 h-3" /> Admin
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-white/30">
                        <User className="w-3 h-3" /> Client
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-xs text-white/30">
                    {merchant.created_at ? formatDistanceToNow(new Date(merchant.created_at), { addSuffix: true }) : '—'}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
