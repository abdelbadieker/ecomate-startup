'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Facebook, Instagram, Music2, Send, Smartphone, CheckCircle2, XCircle, RefreshCw, X, Bot } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import toast from 'react-hot-toast';
import { connectTelegramBot } from '@/lib/actions/integrations.actions';

const PLATFORMS = [
  { key: 'whatsapp', name: 'WhatsApp Business', icon: MessageCircle, color: '#25D366', desc: 'Receive & confirm DM orders via AI chatbot' },
  { key: 'facebook', name: 'Facebook Pages', icon: Facebook, color: '#1877F2', desc: 'Auto-respond to Messenger leads & comments' },
  { key: 'instagram', name: 'Instagram DMs', icon: Instagram, color: '#E4405F', desc: 'Capture orders from Story replies & DMs' },
  { key: 'tiktok', name: 'TikTok Shop', icon: Music2, color: '#00f2ea', desc: 'Sync TikTok catalog & order pipeline' },
  { key: 'telegram', name: 'Telegram Bot', icon: Send, color: '#0088cc', desc: 'Deploy your custom storefront bot' },
  { key: 'sms', name: 'SMS Gateway', icon: Smartphone, color: '#f59e0b', desc: 'Order confirmations & delivery updates' },
];

interface Integration {
  id: string;
  platform: string;
  status: string;
  last_synced_at?: string;
}

interface Automation {
  id: string;
  scenario_name: string;
  is_active: boolean;
  total_triggers: number;
}

export default function IntegrationsGrid({ integrations, automations }: { integrations: Integration[], automations: Automation[] }) {
  const [telegramModalOpen, setTelegramModalOpen] = useState(false);
  const [botToken, setBotToken] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getIntegration = (platform: string) => integrations.find(i => i.platform === platform);

  async function handleTelegramConnect(e: React.FormEvent) {
    e.preventDefault();
    if (!botToken.trim()) return;
    setIsSubmitting(true);
    const res = await connectTelegramBot(botToken.trim());
    setIsSubmitting(false);
    if (res?.error) {
      toast.error(res.error);
    } else {
      toast.success('Telegram bot connected!');
      setTelegramModalOpen(false);
      setBotToken('');
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {PLATFORMS.map((platform, i) => {
          const integration = getIntegration(platform.key);
          const isConnected = integration?.status === 'connected';
          const Icon = platform.icon;

          return (
            <motion.div
              key={platform.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="card-glass overflow-hidden flex flex-col group"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center"
                    style={{ background: `${platform.color}15`, border: `1px solid ${platform.color}30` }}
                  >
                    <Icon className="w-7 h-7" style={{ color: platform.color }} />
                  </div>

                  {isConnected ? (
                    <div className="badge-green flex items-center gap-1.5 px-2.5 py-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Connected
                    </div>
                  ) : (
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-white/5 text-[var(--text-muted)] border border-[var(--border-c)]">
                      <XCircle className="w-3 h-3" />
                      Not Connected
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-poppins font-bold text-white mb-1">{platform.name}</h3>
                <p className="text-sm text-[var(--text-sub)] leading-relaxed mb-4">{platform.desc}</p>

                {isConnected && integration.last_synced_at && (
                  <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-4">
                    <RefreshCw className="w-3 h-3" />
                    Last synced {formatDistanceToNow(new Date(integration.last_synced_at), { addSuffix: true })}
                  </div>
                )}

                <div className="mt-auto pt-4 border-t border-[var(--border-c)]">
                  {platform.key === 'telegram' ? (
                    <button
                      onClick={() => setTelegramModalOpen(true)}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all ${
                        isConnected
                          ? 'bg-white/5 text-[var(--text-sub)] hover:text-white border border-[var(--border-c)]'
                          : 'text-white'
                      }`}
                      style={!isConnected ? { background: `${platform.color}`, boxShadow: `0 0 20px ${platform.color}40` } : undefined}
                    >
                      {isConnected ? 'Reconfigure Bot' : 'Connect Bot'}
                    </button>
                  ) : platform.key === 'facebook' || platform.key === 'instagram' ? (
                    <a
                      href={`/api/integrations/meta?platform=${platform.key}`}
                      className={`w-full py-2.5 rounded-xl text-sm font-bold transition-all block text-center ${
                        isConnected
                          ? 'bg-white/5 text-[var(--text-sub)] hover:text-white border border-[var(--border-c)]'
                          : 'text-white'
                      }`}
                      style={!isConnected ? { background: `${platform.color}`, boxShadow: `0 0 20px ${platform.color}40` } : undefined}
                    >
                      {isConnected ? 'Reconnect' : 'Connect'}
                    </a>
                  ) : (
                    <button
                      className="w-full py-2.5 rounded-xl text-sm font-bold bg-white/5 text-[var(--text-muted)] border border-[var(--border-c)] cursor-not-allowed"
                      disabled
                    >
                      Coming Soon
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Automation Stats */}
      <div className="card-glass p-6 mt-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-poppins font-bold text-white">Automation Engine</h3>
            <p className="text-sm text-[var(--text-sub)]">Active webhook scenarios powered by Make.com / n8n</p>
          </div>
        </div>

        {automations.length === 0 ? (
          <div className="flex items-center justify-center h-24 border-2 border-dashed border-[var(--border-c)] rounded-xl text-[var(--text-muted)]">
            No automations configured yet. Connect a platform to begin.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {automations.map((auto) => (
              <div key={auto.id} className="bg-white/[0.02] border border-[var(--border-c)] rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium text-sm">{auto.scenario_name}</span>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${auto.is_active ? 'badge-green' : 'bg-white/5 text-[var(--text-muted)]'}`}>
                    {auto.is_active ? 'Active' : 'Paused'}
                  </span>
                </div>
                <div className="text-xs text-[var(--text-muted)]">
                  {auto.total_triggers || 0} triggers total
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Telegram Bot Token Modal */}
      <AnimatePresence>
        {telegramModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-[#07101f]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setTelegramModalOpen(false)}
            />
            <motion.div
              className="card-glass w-full max-w-md relative z-10 p-6 md:p-8"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              <button onClick={() => setTelegramModalOpen(false)} className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white">
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#0088cc15', border: '1px solid #0088cc30' }}>
                  <Send className="w-5 h-5 text-[#0088cc]" />
                </div>
                <h2 className="text-xl font-poppins font-bold text-white">Connect Telegram Bot</h2>
              </div>

              <form onSubmit={handleTelegramConnect} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Bot Token</label>
                  <input
                    required
                    value={botToken}
                    onChange={(e) => setBotToken(e.target.value)}
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#0088cc] font-mono text-sm"
                    placeholder="123456:ABC-DEF1234ghIkl-zyx57W2v1u..."
                  />
                  <p className="text-xs text-[var(--text-muted)] mt-2">
                    Get your token from <span className="text-[#0088cc]">@BotFather</span> on Telegram.
                  </p>
                </div>
                <button type="submit" disabled={isSubmitting} className="btn-primary w-full flex items-center justify-center">
                  {isSubmitting ? 'Connecting...' : 'Connect Bot'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
