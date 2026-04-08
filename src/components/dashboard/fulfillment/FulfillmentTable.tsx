'use client';

import { useState, useMemo } from 'react';
import { Warehouse, Search, Box, MapPin, AlertTriangle } from 'lucide-react';

interface InventoryItem {
  id: string;
  product_name: string;
  sku: string;
  bin_location: string;
  quantity_in_stock: number;
  quantity_reserved: number;
  quantity_shipped: number;
  variant_label?: string;
}

export default function FulfillmentTable({ initialInventory }: { initialInventory: InventoryItem[] }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return initialInventory.filter((item) =>
      item.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase())
    );
  }, [initialInventory, search]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Search by product or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-[var(--border-c)] rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-light transition-colors"
          />
        </div>
        <div className="flex items-center gap-2 text-sm text-[var(--text-sub)]">
          <Warehouse className="w-4 h-4" />
          <span>{filtered.length} items tracked</span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-c)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-[var(--border-c)]">
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">Product</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">SKU</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">
                <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> Bin</span>
              </th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)] text-center">In Stock</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)] text-center">Reserved</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)] text-center">Shipped</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)] text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-c)]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="p-8 text-center text-[var(--text-muted)]">
                  <div className="flex flex-col items-center gap-2">
                    <Box className="w-8 h-8" />
                    No inventory items found. Products will appear here once added.
                  </div>
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const available = (item.quantity_in_stock || 0) - (item.quantity_reserved || 0);
                const isLow = available < 5;

                return (
                  <tr key={item.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[var(--bg-section)] flex items-center justify-center border border-[var(--border-c)]">
                          <Box className="w-5 h-5 text-[var(--text-muted)]" />
                        </div>
                        <div>
                          <span className="font-medium text-white block">{item.product_name}</span>
                          {item.variant_label && (
                            <span className="text-xs text-[var(--text-muted)]">{item.variant_label}</span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[var(--text-sub)] font-mono">{item.sku || '—'}</td>
                    <td className="p-4">
                      <span className="text-sm text-white bg-white/5 px-2.5 py-1 rounded-md ring-1 ring-white/10">
                        {item.bin_location || '—'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`font-bold font-poppins ${isLow ? 'text-red-400' : 'text-green-400'}`}>
                        {item.quantity_in_stock || 0}
                      </span>
                    </td>
                    <td className="p-4 text-center text-sm text-yellow-400 font-bold font-poppins">
                      {item.quantity_reserved || 0}
                    </td>
                    <td className="p-4 text-center text-sm text-primary-light font-bold font-poppins">
                      {item.quantity_shipped || 0}
                    </td>
                    <td className="p-4 text-center">
                      {isLow ? (
                        <span className="badge-green !bg-red-500/10 !border-red-500/30 !text-red-400 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Low
                        </span>
                      ) : (
                        <span className="badge-green inline-flex items-center gap-1">
                          ✓ OK
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
