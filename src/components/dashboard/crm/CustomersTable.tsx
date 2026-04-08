'use client';

import { useState, useMemo } from 'react';
import { Search, Filter, Facebook, Instagram, MessageCircle, Phone, MonitorSmartphone } from 'lucide-react';

const SOURCE_ICONS: Record<string, { icon: React.ElementType; color: string }> = {
  facebook: { icon: Facebook, color: 'text-blue-500' },
  instagram: { icon: Instagram, color: 'text-pink-500' },
  whatsapp: { icon: MessageCircle, color: 'text-green-500' },
  manual: { icon: Phone, color: 'text-[var(--text-sub)]' }
};

interface Customer {
  id: string;
  name: string;
  phone?: string;
  wilaya?: string;
  source: string;
  total_spent_da: number;
}

export default function CustomersTable({ initialCustomers }: { initialCustomers: Customer[] }) {
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('all');

  const filteredCustomers = useMemo(() => {
    return initialCustomers.filter((c) => {
      const matchesSearch = c.name?.toLowerCase().includes(search.toLowerCase()) || c.phone?.includes(search);
      const matchesSource = sourceFilter === 'all' || c.source === sourceFilter;
      return matchesSearch && matchesSource;
    });
  }, [initialCustomers, search, sourceFilter]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-[var(--border-c)] rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-light transition-colors"
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white/5 border border-[var(--border-c)] px-3 py-2 rounded-xl">
            <Filter className="w-4 h-4 text-[var(--text-sub)]" />
            <select 
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="bg-transparent text-sm text-white focus:outline-none appearance-none cursor-pointer"
            >
              <option value="all" className="text-black">All Platforms</option>
              <option value="facebook" className="text-black">Facebook</option>
              <option value="instagram" className="text-black">Instagram</option>
              <option value="whatsapp" className="text-black">WhatsApp</option>
              <option value="manual" className="text-black">Manual Entry</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-[var(--border-c)]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-[var(--border-c)]">
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">Customer Name</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">Phone</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">Wilaya</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)]">Source</th>
              <th className="p-4 text-sm font-semibold text-[var(--text-sub)] text-right">Total Spent</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-c)]">
            {filteredCustomers.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-[var(--text-muted)]">
                  No customers found.
                </td>
              </tr>
            ) : (
              filteredCustomers.map((customer) => {
                const SourceMeta = SOURCE_ICONS[customer.source] || { icon: MonitorSmartphone, color: 'text-white' };
                const Icon = SourceMeta.icon;
                return (
                  <tr key={customer.id} className="hover:bg-white/5 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-admin/20 flex items-center justify-center text-white font-bold text-xs ring-1 ring-white/10">
                          {customer.name?.charAt(0).toUpperCase() || 'C'}
                        </div>
                        <span className="font-medium text-white">{customer.name}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm text-[var(--text-sub)]">{customer.phone || '-'}</td>
                    <td className="p-4 text-sm text-[var(--text-sub)]">{customer.wilaya || 'Alger'}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5 bg-white/5 w-fit px-2.5 py-1 rounded-md ring-1 ring-white/10">
                        <Icon className={`w-3.5 h-3.5 ${SourceMeta.color}`} />
                        <span className="text-xs font-medium text-white capitalize">{customer.source}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm font-bold text-white text-right font-poppins">
                      {(customer.total_spent_da || 0).toLocaleString()} DA
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
