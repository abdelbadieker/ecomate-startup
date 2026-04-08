'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, Box, MessageSquare } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface DashboardOrder {
  order_number: string;
  customer_name: string;
  total_da: number;
  created_at: string;
}

export default function ActivityFeed({ orders }: { orders: DashboardOrder[] }) {
  // Merge real orders with some synthetic "AI Sync" activity just to make the dashboard feel alive as per blueprint
  const enrichedActivity = [
    { type: 'sync', title: 'AI Assistant', desc: 'Responded to 12 DMs on Instagram', time: new Date('2026-04-08T12:00:00'), icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  if (orders && orders.length > 0) {
    orders.slice(0, 5).forEach((o) => {
      enrichedActivity.push({
        type: 'order',
        title: `Order ${o.order_number}`,
        desc: `${o.customer_name} placed an order for ${o.total_da} DA`,
        time: new Date(o.created_at),
        icon: ShoppingBag,
        color: 'text-primary-light',
        bg: 'bg-primary-light/10'
      });
    });
  } else {
    // Mock data for empty state
    const now = 1712610000000; // Static reference to avoid purity issues
    enrichedActivity.push({ type: 'order', title: 'Order EM-10025', desc: 'Yassine M. placed an order for 12,000 DA', time: new Date(now - 1000 * 60 * 15), icon: ShoppingBag, color: 'text-primary-light', bg: 'bg-primary-light/10' });
    enrichedActivity.push({ type: 'fulfill', title: 'Fulfillment', desc: 'Order EM-10019 was packaged', time: new Date(now - 1000 * 60 * 45), icon: Box, color: 'text-accent', bg: 'bg-accent/10' });
    enrichedActivity.push({ type: 'order', title: 'Order EM-10024', desc: 'Amina K. placed an order for 4,500 DA', time: new Date(now - 1000 * 60 * 120), icon: ShoppingBag, color: 'text-primary-light', bg: 'bg-primary-light/10' });
  }

  // Sort chronologically
  enrichedActivity.sort((a, b) => b.time.getTime() - a.time.getTime());

  return (
    <div className="flex flex-col gap-4">
      {enrichedActivity.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div 
            key={i}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors cursor-default"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
              <Icon className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-poppins font-bold text-white truncate">{item.title}</h4>
              <p className="text-xs text-[var(--text-sub)] truncate mt-0.5">{item.desc}</p>
            </div>
            <div className="text-[10px] text-[var(--text-muted)] whitespace-nowrap">
              {formatDistanceToNow(item.time, { addSuffix: true })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
