'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function approveReview(reviewId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('reviews')
    .update({ is_approved: true })
    .eq('id', reviewId);

  if (error) return { error: error.message };
  revalidatePath('/[locale]/admin/reviews', 'page');
  return { success: true };
}

export async function rejectReview(reviewId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);

  if (error) return { error: error.message };
  revalidatePath('/[locale]/admin/reviews', 'page');
  return { success: true };
}

export async function featureReview(reviewId: string, featured: boolean) {
  const supabase = await createClient();
  const { error } = await supabase
    .from('reviews')
    .update({ is_featured: featured })
    .eq('id', reviewId);

  if (error) return { error: error.message };
  revalidatePath('/[locale]/admin/reviews', 'page');
  return { success: true };
}

export async function updatePartner(partnerId: string, formData: FormData) {
  const supabase = await createClient();

  const name = formData.get('name') as string;
  const logo = formData.get('logo') as string;
  const category = formData.get('category') as string;
  const website_url = formData.get('website_url') as string;
  const is_active = formData.get('is_active') === 'true';
  const soon = formData.get('soon') === 'true';

  const { error } = await supabase
    .from('partners')
    .update({ name, logo, category, website_url, is_active, soon })
    .eq('id', partnerId);

  if (error) return { error: error.message };
  revalidatePath('/[locale]/admin/partners', 'page');
  return { success: true };
}
