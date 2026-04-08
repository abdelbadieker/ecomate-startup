'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { error } = await supabase.from('profiles').update({
    full_name: formData.get('full_name') as string,
    business_name: formData.get('business_name') as string,
    phone: formData.get('phone') as string,
    wilaya: formData.get('wilaya') as string,
  }).eq('id', user.id);

  if (error) return { error: error.message };
  revalidatePath('/[locale]/dashboard/settings', 'page');
  return { success: true };
}

export async function changePassword(currentPassword: string, newPassword: string) {
  const supabase = await createClient();
  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: error.message };
  return { success: true };
}

export async function submitReview(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  const { data: profile } = await supabase.from('profiles').select('full_name, business_name, wilaya').eq('id', user.id).single();

  const { error } = await supabase.from('reviews').insert({
    user_id: user.id,
    reviewer_name: profile?.full_name || 'Anonymous',
    business_name: profile?.business_name || '',
    reviewer_wilaya: profile?.wilaya || '',
    rating: parseInt(formData.get('rating') as string || '5', 10),
    title: formData.get('title') as string,
    content: formData.get('content') as string,
    is_approved: false,
    plan_at_review: 'active',
  });

  if (error) return { error: error.message };
  revalidatePath('/[locale]/dashboard/settings', 'page');
  return { success: true };
}

export async function deleteAccount() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: 'Unauthorized' };

  // Soft delete: mark profile as inactive
  await supabase.from('profiles').update({ role: 'deleted' }).eq('id', user.id);
  await supabase.auth.signOut();
  return { success: true };
}
