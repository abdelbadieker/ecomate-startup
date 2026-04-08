'use client';

import { useDraggable } from '@dnd-kit/core';
import { GripVertical, MapPin } from 'lucide-react';
import { Order } from './OrdersKanban';

export default function KanbanCard({ order }: { order: Order }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: order.id,
    data: { order }
  });

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      className={`card-glass p-4 cursor-grab active:cursor-grabbing mb-3 group ${isDragging ? 'opacity-50 z-50 ring-2 ring-primary' : ''}`}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-2">
          <div {...listeners} className="text-[var(--text-muted)] hover:text-white cursor-grab p-1 -ml-1">
            <GripVertical className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold font-poppins text-primary-light bg-primary/10 px-2 py-0.5 rounded-md">
            {order.order_number}
          </span>
        </div>
        <span className="text-sm font-bold text-white">
          {(order.total_da || 0).toLocaleString()} DA
        </span>
      </div>
      
      <h4 className="text-white font-medium mb-1 truncate">{order.customer_name}</h4>
      
      <div className="flex items-center gap-1.5 text-xs text-[var(--text-sub)]">
        <MapPin className="w-3 h-3" />
        <span className="truncate">{order.customer_wilaya || 'Alger'}</span>
      </div>
    </div>
  );
}
