'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { upsertProduct } from '@/lib/actions/products.actions';

interface Product {
  id?: string;
  name?: string;
  price_da?: number | string;
  stock?: number | string;
  category?: string;
  sku?: string;
}

export default function ProductModal({ product }: { product?: Product | null }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEdit = !!product;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    if (product?.id) formData.set('id', product.id);
    const res = await upsertProduct(formData);
    setIsSubmitting(false);

    if (res.error) {
      toast.error(res.error);
    } else {
      toast.success(isEdit ? 'Product updated!' : 'Product created!');
      setIsOpen(false);
    }
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)} className="btn-primary flex items-center gap-2">
        <Plus className="w-5 h-5" />
        {isEdit ? 'Edit' : 'New Product'}
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              className="absolute inset-0 bg-[#07101f]/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="card-glass w-full max-w-lg relative z-10 p-6 md:p-8 overflow-hidden"
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary-light">
                  <Package className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-poppins font-bold text-white">
                  {isEdit ? 'Edit Product' : 'Create Product'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-sm text-[var(--text-sub)] mb-1">Product Name</label>
                  <input
                    required
                    name="name"
                    type="text"
                    defaultValue={product?.name || ''}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light"
                    placeholder="e.g. Premium T-Shirt"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-sub)] mb-1">Price (DA)</label>
                    <input
                      required
                      name="price_da"
                      type="number"
                      min="0"
                      defaultValue={product?.price_da || ''}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light"
                      placeholder="2500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-sub)] mb-1">Stock Level</label>
                    <input
                      required
                      name="stock"
                      type="number"
                      min="0"
                      defaultValue={product?.stock ?? '0'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light"
                      placeholder="50"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[var(--text-sub)] mb-1">SKU</label>
                    <input
                      name="sku"
                      type="text"
                      defaultValue={product?.sku || ''}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light"
                      placeholder="TS-BLK-001"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[var(--text-sub)] mb-1">Category</label>
                    <select
                      name="category"
                      defaultValue={product?.category || 'general'}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary-light appearance-none cursor-pointer"
                    >
                      <option value="general" className="text-black">General</option>
                      <option value="clothing" className="text-black">Clothing</option>
                      <option value="electronics" className="text-black">Electronics</option>
                      <option value="beauty" className="text-black">Beauty</option>
                      <option value="food" className="text-black">Food & Beverage</option>
                      <option value="accessories" className="text-black">Accessories</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full mt-4 flex items-center justify-center"
                >
                  {isSubmitting ? 'Saving...' : isEdit ? 'Update Product' : 'Create Product'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
