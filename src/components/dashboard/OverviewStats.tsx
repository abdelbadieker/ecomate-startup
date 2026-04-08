'use client';

import { motion } from 'framer-motion';
import { DollarSign, ShoppingCart, Bot, Box } from 'lucide-react';

export default function OverviewStats({ revenue, ordersCount, fulfillmentActive }: { revenue: number, ordersCount: number, fulfillmentActive: number }) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-DZ', { style: 'currency', currency: 'DZD', maximumFractionDigits: 0 }).format(val).replace('DZD', '').trim() + ' DA';
  };

  const cards: {
    title: string;
    value: string;
    sub: string;
    icon: React.ElementType;
    color: string;
    bg: string;
  }[] = [
    {
      title: 'Gross Revenue',
      value: formatCurrency(revenue),
      sub: '+12.5% from last week',
      icon: DollarSign,
      color: 'text-green-400',
      bg: 'bg-green-400/10'
    },
    {
      title: 'Total Orders',
      value: ordersCount.toString(),
      sub: `${ordersCount > 0 ? '+4' : '0'} new today`,
      icon: ShoppingCart,
      color: 'text-primary-light',
      bg: 'bg-primary-light/10'
    },
    {
      title: 'AI Response Rate',
      value: '98.4%',
      sub: 'Avg. response time < 3s',
      icon: Bot,
      color: 'text-purple-400',
      bg: 'bg-purple-400/10'
    },
    {
      title: 'Active Fulfillment',
      value: fulfillmentActive.toString(),
      sub: 'Syncing to Yalidine',
      icon: Box,
      color: 'text-accent',
      bg: 'bg-accent/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="card-glass p-6 relative overflow-hidden group"
        >
          {/* Subtle gradient hover effect */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-[50px] opacity-0 group-hover:opacity-20 transition-opacity ${card.bg.replace('/10', '')}`} />
          
          <div className="flex justify-between items-start mb-4 relative z-10">
            <div>
              <p className="text-[var(--text-sub)] text-sm font-medium mb-1">{card.title}</p>
              <h3 className="text-3xl font-poppins font-bold text-white tracking-tight">{card.value}</h3>
            </div>
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${card.bg} ${card.color}`}>
              <card.icon className="w-6 h-6" />
            </div>
          </div>
          <div className="text-xs text-[var(--text-muted)] font-medium">
            {card.sub}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
