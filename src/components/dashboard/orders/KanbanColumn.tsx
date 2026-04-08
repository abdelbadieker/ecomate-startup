'use client';

import { useDroppable } from '@dnd-kit/core';
import { Order } from './OrdersKanban';
import KanbanCard from './KanbanCard';

export default function KanbanColumn({ id, title, orders }: { id: string, title: string, orders: Order[] }) {
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });

  return (
    <div className="flex-shrink-0 w-80 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-bold text-white flex items-center gap-2">
          {title}
          <span className="bg-white/10 text-[var(--text-sub)] text-xs px-2 py-0.5 rounded-full">
            {orders.length}
          </span>
        </h3>
      </div>
      
      <div 
        ref={setNodeRef}
        className={`flex-1 rounded-2xl p-3 border-2 transition-colors overflow-y-auto ${
          isOver ? 'bg-primary/5 border-primary/30' : 'bg-[#0a1628]/40 border-transparent'
        }`}
      >
        {orders.map((order) => (
          <KanbanCard key={order.id} order={order} />
        ))}
        {orders.length === 0 && (
          <div className="h-20 flex items-center justify-center text-sm text-[var(--text-muted)] border-2 border-dashed border-[var(--border-c)] rounded-xl">
            Drop here
          </div>
        )}
      </div>
    </div>
  );
}
