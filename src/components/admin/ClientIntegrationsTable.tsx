'use client';

import { useState } from 'react';
import { Copy, Eye, EyeOff, Facebook, Instagram, MessageCircle, Send, Music2, Smartphone } from 'lucide-react';
import toast from 'react-hot-toast';

const PLATFORM_META: Record<string, { icon: React.ElementType; color: string }> = {
  facebook: { icon: Facebook, color: '#1877F2' },
  instagram: { icon: Instagram, color: '#E4405F' },
  whatsapp: { icon: MessageCircle, color: '#25D366' },
  telegram: { icon: Send, color: '#0088cc' },
  tiktok: { icon: Music2, color: '#00f2ea' },
  google: { icon: Smartphone, color: '#f59e0b' },
};

function maskToken(token: string | null | undefined) {
  if (!token) return '—';
  if (token.length <= 12) return '••••••••';
  return token.slice(0, 6) + '••••••••' + token.slice(-4);
}

interface Integration {
  id: string;
  platform: string;
  account_name?: string;
  page_name?: string;
  access_token?: string;
  status: string;
  profiles: {
    business_name?: string;
    full_name?: string;
    email?: string;
  } | null;
}

export default function ClientIntegrationsTable({ integrations }: { integrations: Integration[] }) {
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});

  const toggleReveal = (id: string) => {
    setRevealed(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToken = (token: string) => {
    navigator.clipboard.writeText(token);
    toast.success('Token copied to clipboard!');
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-[#7c3aed]/10">
            <th className="p-4 text-sm font-semibold text-white/40">Merchant</th>
            <th className="p-4 text-sm font-semibold text-white/40">Platform</th>
            <th className="p-4 text-sm font-semibold text-white/40">Account</th>
            <th className="p-4 text-sm font-semibold text-white/40">Access Token</th>
            <th className="p-4 text-sm font-semibold text-white/40">Status</th>
            <th className="p-4 text-sm font-semibold text-white/40 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#7c3aed]/5">
          {integrations.length === 0 ? (
            <tr>
              <td colSpan={6} className="p-8 text-center text-white/30">
                No client integrations found yet.
              </td>
            </tr>
          ) : (
            integrations.map((integ) => {
              const meta = PLATFORM_META[integ.platform] || PLATFORM_META.google;
              const Icon = meta.icon;
              const profile = integ.profiles;
              const isRevealed = revealed[integ.id];

              return (
                <tr key={integ.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-white">{profile?.business_name || profile?.full_name || 'Unknown'}</span>
                      <span className="text-xs text-white/30">{profile?.email}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${meta.color}15` }}>
                        <Icon className="w-4 h-4" style={{ color: meta.color }} />
                      </div>
                      <span className="text-white capitalize text-sm">{integ.platform}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/60">{integ.account_name || integ.page_name || '—'}</td>
                  <td className="p-4">
                    <code className="text-xs font-mono text-[#a78bfa] bg-[#7c3aed]/10 px-2 py-1 rounded-md">
                      {isRevealed ? integ.access_token : maskToken(integ.access_token)}
                    </code>
                  </td>
                  <td className="p-4">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                      integ.status === 'connected' 
                        ? 'bg-green-500/10 text-green-400 border border-green-500/20' 
                        : 'bg-red-500/10 text-red-400 border border-red-500/20'
                    }`}>
                      {integ.status === 'connected' ? '● Connected' : '○ ' + integ.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <button
                        onClick={() => toggleReveal(integ.id)}
                        className="w-8 h-8 rounded-lg bg-white/5 border border-[#7c3aed]/10 flex items-center justify-center text-white/40 hover:text-white transition-colors"
                        title={isRevealed ? 'Hide' : 'Reveal'}
                      >
                        {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => copyToken(integ.access_token || '')}
                        className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 border border-[#7c3aed]/20 flex items-center justify-center text-[#a78bfa] hover:text-white transition-colors"
                        title="Copy Token"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
