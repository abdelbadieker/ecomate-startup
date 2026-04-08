'use client';

import { motion } from 'framer-motion';
import { Users, CreditCard, DollarSign, Star } from 'lucide-react';

export default function AdminStats({
  merchantCount,
  activeSubsCount,
  totalRevenue,
  pendingReviewCount
}: {
  merchantCount: number;
  activeSubsCount: number;
  totalRevenue: number;
  pendingReviewCount: number;
}) {
  const formatDA = (val: number) => val.toLocaleString() + ' DA';

  const cards = [
    { title: 'Registered Merchants', value: merchantCount.toString(), icon: Users, color: '#a78bfa', bg: 'rgba(124,58,237,0.1)' },
    { title: 'Active Subscriptions', value: activeSubsCount.toString(), icon: CreditCard, color: '#10B981', bg: 'rgba(16,185,129,0.1)' },
    { title: 'Platform Revenue', value: formatDA(totalRevenue), icon: DollarSign, color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' },
    { title: 'Pending Reviews', value: pendingReviewCount.toString(), icon: Star, color: '#f472b6', bg: 'rgba(244,114,182,0.1)' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative overflow-hidden rounded-2xl p-6 group"
          style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(124,58,237,0.12)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-30 transition-opacity" style={{ background: card.color }} />

          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-white/40 text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-poppins font-bold text-white tracking-tight">{card.value}</h3>
            </div>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: card.bg, color: card.color }}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
