import { createClient } from '@/lib/supabase/server';
import ProductsGrid from '@/components/dashboard/products/ProductsGrid';

export default async function ProductsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto h-full">
      <div>
        <h2 className="text-3xl font-poppins font-bold text-white mb-2">Product Catalog</h2>
        <p className="text-[var(--text-sub)]">Manage your multi-channel product listings and stock.</p>
      </div>

      <ProductsGrid initialProducts={products || []} />
    </div>
  );
}
