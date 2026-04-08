'use client';

import { useState } from 'react';
import { Package, Tag, Search, Box } from 'lucide-react';
import ProductModal from './ProductModal';

interface Product {
  id: string;
  name: string;
  price_da: number;
  stock: number;
  category: string;
  sku: string;
}

export default function ProductsGrid({ initialProducts }: { initialProducts: Product[] }) {
  const [products] = useState(initialProducts);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input 
            type="text" 
            placeholder="Search products..." 
            className="w-full bg-white/5 border border-[var(--border-c)] rounded-full py-2 pl-9 pr-4 text-sm text-white focus:outline-none focus:border-primary-light transition-colors"
          />
        </div>
        <ProductModal />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card-glass overflow-hidden flex flex-col group">
            <div className="h-40 bg-[var(--bg-section)] relative flex items-center justify-center border-b border-[var(--border-c)] gap-2 flex-col">
               <Package className="w-12 h-12 text-[var(--text-muted)] group-hover:text-primary-light transition-colors" />
               <span className="text-[var(--text-muted)] text-sm">No Image</span>
               
               {/* Low Stock Indicator */}
               {product.stock < 5 && (
                 <div className="absolute top-3 right-3 badge-green !bg-red-500/10 !border-red-500/30 !text-red-400 flex items-center gap-1.5 px-2.5 py-1">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                   Low Stock
                 </div>
               )}
            </div>
            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-poppins font-bold text-white text-lg truncate mb-1">{product.name}</h3>
              
              <div className="flex items-center justify-between mt-auto pt-4">
                <div className="flex flex-col">
                  <span className="text-[var(--text-muted)] text-xs">Price</span>
                  <span className="text-white font-bold font-poppins">{(product.price_da || 0).toLocaleString()} DA</span>
                </div>
                
                <div className="flex flex-col items-end">
                  <span className="text-[var(--text-muted)] text-xs flex items-center gap-1"><Box className="w-3 h-3"/> Stock</span>
                  <span className={`font-bold font-poppins ${product.stock < 5 ? 'text-red-400' : 'text-green-400'}`}>{product.stock}</span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-[var(--border-c)] flex items-center justify-between text-xs text-[var(--text-sub)]">
                <span className="flex items-center gap-1.5"><Tag className="w-3.5 h-3.5" /> {product.category || 'General'}</span>
                <span>SKU: {product.sku || 'N/A'}</span>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full h-40 flex items-center justify-center border-2 border-dashed border-[var(--border-c)] rounded-2xl text-[var(--text-muted)] gap-2">
            <Package className="w-5 h-5" />
            No products found. Add your first product.
          </div>
        )}
      </div>
    </div>
  );
}
