'use client';

import { useState, useMemo } from 'react';
import { Search, Box, AlertTriangle, MapPin } from 'lucide-react';

interface InventoryItem {
  id: string;
  product_name: string;
  sku: string;
  bin_location: string;
  quantity_in_stock: number;
  quantity_reserved: number;
  quantity_shipped: number;
  variant_label?: string;
  profiles: {
    business_name: string;
    full_name: string;
  } | null;
}

export default function GlobalFulfillmentTable({ inventory }: { inventory: InventoryItem[] }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    return inventory.filter((item) =>
      item.product_name?.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase()) ||
      item.profiles?.business_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [inventory, search]);

  const totalItems = inventory.length;
  const lowStockItems = inventory.filter(i => ((i.quantity_in_stock || 0) - (i.quantity_reserved || 0)) < 5).length;

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
          <input
            type="text"
            placeholder="Search product, SKU, or merchant..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-[#7c3aed]/10 rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-[#7c3aed]/30 transition-colors"
          />
        </div>
        <div className="flex gap-4 text-sm">
          <span className="text-white/40">{totalItems} products tracked</span>
          {lowStockItems > 0 && (
            <span className="text-red-400 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5" /> {lowStockItems} low stock
            </span>
          )}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#7c3aed]/10">
              <th className="p-4 text-sm font-semibold text-white/40">Merchant</th>
              <th className="p-4 text-sm font-semibold text-white/40">Product</th>
              <th className="p-4 text-sm font-semibold text-white/40">SKU</th>
              <th className="p-4 text-sm font-semibold text-white/40">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> Bin</span>
              </th>
              <th className="p-4 text-sm font-semibold text-white/40 text-center">In Stock</th>
              <th className="p-4 text-sm font-semibold text-white/40 text-center">Reserved</th>
              <th className="p-4 text-sm font-semibold text-white/40 text-center">Shipped</th>
              <th className="p-4 text-sm font-semibold text-white/40 text-center">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#7c3aed]/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={8} className="p-8 text-center text-white/20">
                  <Box className="w-8 h-8 mx-auto mb-2" />
                  No inventory items found.
                </td>
              </tr>
            ) : (
              filtered.map((item) => {
                const available = (item.quantity_in_stock || 0) - (item.quantity_reserved || 0);
                const isLow = available < 5;
                const profile = item.profiles;

                return (
                  <tr key={item.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4">
                      <span className="text-sm text-white font-medium">{profile?.business_name || profile?.full_name || '—'}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#7c3aed]/10 flex items-center justify-center border border-[#7c3aed]/10">
                          <Box className="w-4 h-4 text-[#a78bfa]" />
                        </div>
                        <div>
                          <span className="text-white text-sm font-medium block">{item.product_name}</span>
                          {item.variant_label && <span className="text-xs text-white/30">{item.variant_label}</span>}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-white/40 font-mono">{item.sku || '—'}</td>
                    <td className="p-4">
                      <span className="text-sm text-white bg-white/5 px-2.5 py-1 rounded-md ring-1 ring-[#7c3aed]/10">
                        {item.bin_location || '—'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <span className={`font-bold font-poppins ${isLow ? 'text-red-400' : 'text-green-400'}`}>
                        {item.quantity_in_stock || 0}
                      </span>
                    </td>
                    <td className="p-4 text-center text-yellow-400 font-bold font-poppins">
                      {item.quantity_reserved || 0}
                    </td>
                    <td className="p-4 text-center text-[#a78bfa] font-bold font-poppins">
                      {item.quantity_shipped || 0}
                    </td>
                    <td className="p-4 text-center">
                      {isLow ? (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-red-500/10 text-red-400 border border-red-500/20 inline-flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> Low
                        </span>
                      ) : (
                        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
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
