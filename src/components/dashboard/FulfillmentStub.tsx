'use client';

import { CheckCircle2, Warehouse, PhoneCall, Package, Truck, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const STAGES = [
  { id: 'warehousing', label: 'Warehousing', icon: Warehouse, status: 'completed' },
  { id: 'confirmation', label: 'Confirmation', icon: PhoneCall, status: 'completed' },
  { id: 'packaging', label: 'Packaging', icon: Package, status: 'current' },
  { id: 'dispatched', label: 'Dispatched', icon: Truck, status: 'upcoming' },
  { id: 'tracking', label: 'Tracking', icon: MapPin, status: 'upcoming' },
];

export default function FulfillmentStub() {
  return (
    <div className="w-full relative py-8 px-4 md:px-12 bg-white/[0.01] rounded-2xl border border-[var(--border-c)] overflow-x-auto">
      <div className="min-w-[600px] flex items-center justify-between relative">
        
        {/* Background line track */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-[var(--border-c)] -translate-y-1/2 rounded-full z-0" />
        
        {/* Active line track */}
        <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-gradient-to-r from-primary-light to-accent -translate-y-1/2 rounded-full z-0" />

        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isCompleted = stage.status === 'completed';
          const isCurrent = stage.status === 'current';

          return (
            <motion.div 
              key={stage.id} 
              className="relative z-10 flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 + 0.5 }}
            >
              <div 
                className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500
                  ${isCompleted ? 'bg-accent border-[#0a1628] shadow-[0_0_20px_rgba(16,185,129,0.3)]' : 
                    isCurrent ? 'bg-primary border-primary-light/30 shadow-[0_0_25px_rgba(37,99,235,0.4)] animate-pulse' : 
                    'bg-[var(--bg-section)] border-[var(--border-c)] text-[var(--text-muted)]'}
                `}
              >
                {isCompleted ? (
                   <CheckCircle2 className="w-7 h-7 text-[#0a1628]" strokeWidth={3} />
                ) : (
                   <Icon className={`w-6 h-6 ${isCurrent ? 'text-white' : ''}`} />
                )}
              </div>
              
              <div className="text-center absolute -bottom-8 w-24">
                <span className={`text-sm font-poppins font-medium ${isCurrent || isCompleted ? 'text-white' : 'text-[var(--text-muted)]'}`}>
                  {stage.label}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
