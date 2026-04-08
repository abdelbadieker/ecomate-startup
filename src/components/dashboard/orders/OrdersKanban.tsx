'use client';

import { useState } from 'react';
import { DndContext, DragEndEvent, DragOverlay, closestCorners, DragStartEvent } from '@dnd-kit/core';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';
import { updateOrderStatus } from '@/lib/actions/orders.actions';
import toast from 'react-hot-toast';

const COLUMNS = [
  { id: 'pending', title: 'Pending' },
  { id: 'confirmed', title: 'Confirmed' },
  { id: 'packaging', title: 'Packaging' },
  { id: 'dispatched', title: 'Dispatched' },
  { id: 'delivered', title: 'Delivered' },
  { id: 'returned', title: 'Returned' },
];

export interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  total_da: number;
  status: string;
  created_at: string;
  customer_wilaya?: string;
}

export default function OrdersKanban({ initialOrders, locale }: { initialOrders: Order[], locale: string }) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const order = orders.find(o => o.id === active.id);
    if (order) setActiveOrder(order);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveOrder(null);

    if (!over) return;

    const orderId = active.id as string;
    const newStatus = over.id as string;
    const order = orders.find(o => o.id === orderId);

    if (order && order.status !== newStatus) {
      // Optimistic update
      const originalOrders = [...orders];
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));

      toast.promise(updateOrderStatus(orderId, newStatus), {
        loading: 'Updating order...',
        success: 'Order status updated!',
        error: 'Failed to update order'
      }).then(res => {
        if (res?.error) {
          setOrders(originalOrders); // revert on error
        }
      });
    }
  };

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className={`flex gap-6 h-[calc(100vh-250px)] overflow-x-auto pb-4 ${locale === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
        {COLUMNS.map(col => (
          <KanbanColumn 
            key={col.id} 
            id={col.id} 
            title={col.title} 
            orders={orders.filter(o => (o.status || 'pending') === col.id)} 
          />
        ))}
      </div>
      
      <DragOverlay>
        {activeOrder ? <KanbanCard order={activeOrder} /> : null}
      </DragOverlay>
    </DndContext>
  );
}
