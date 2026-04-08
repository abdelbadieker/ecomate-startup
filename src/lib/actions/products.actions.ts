'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function upsertProduct(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  const id = formData.get('id') as string | null;
  const name = formData.get('name') as string;
  const price_da = parseInt(formData.get('price_da') as string || '0', 10);
  const sku = formData.get('sku') as string;
  const category = formData.get('category') as string;
  const stock = parseInt(formData.get('stock') as string || '0', 10);

  const payload = {
    user_id: user.id,
    name,
    price_da,
    sku,
    category,
    stock
  };

  let error;
  if (id) {
    // Update
    ({ error } = await supabase.from('products').update(payload).eq('id', id).eq('user_id', user.id));
    if (!error) {
      await supabase.from('inventory').update({ quantity_in_stock: stock }).eq('product_id', id);
    }
  } else {
    // Insert
    const { data: prodData, error: insError } = await supabase.from('products').insert(payload).select().single();
    error = insError;
    if (prodData && !insError) {
      await supabase.from('inventory').insert({
        user_id: user.id,
        product_id: prodData.id,
        product_name: prodData.name,
        sku: prodData.sku,
        quantity_in_stock: stock,
        bin_location: 'A-01'
      });
    }
  }

  if (error) {
    return { error: error.message };
  }

  revalidatePath('/[locale]/dashboard/products', 'page');
  return { success: true };
}
