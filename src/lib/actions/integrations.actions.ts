'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

export async function connectTelegramBot(botToken: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: 'Unauthorized' };

  // Validate with Telegram API
  try {
    const res = await fetch(`https://api.telegram.org/bot${botToken}/getMe`);
    const data = await res.json();

    if (!data.ok) {
      return { error: 'Invalid bot token. Please check and try again.' };
    }

    const botInfo = data.result;

    // Upsert the integration
    const { error } = await supabase
      .from('social_integrations')
      .upsert({
        user_id: user.id,
        platform: 'telegram',
        account_name: botInfo.username,
        account_id: String(botInfo.id),
        access_token: botToken,
        status: 'connected',
        connected_at: new Date().toISOString(),
        last_synced_at: new Date().toISOString()
      }, {
        onConflict: 'user_id,platform',
        ignoreDuplicates: false
      });

    if (error) {
      // If unique constraint doesn't exist on (user_id, platform), do a manual check
      const { data: existing } = await supabase
        .from('social_integrations')
        .select('id')
        .eq('user_id', user.id)
        .eq('platform', 'telegram')
        .single();

      if (existing) {
        await supabase.from('social_integrations').update({
          account_name: botInfo.username,
          account_id: String(botInfo.id),
          access_token: botToken,
          status: 'connected',
          connected_at: new Date().toISOString(),
          last_synced_at: new Date().toISOString()
        }).eq('id', existing.id);
      } else {
        await supabase.from('social_integrations').insert({
          user_id: user.id,
          platform: 'telegram',
          account_name: botInfo.username,
          account_id: String(botInfo.id),
          access_token: botToken,
          status: 'connected',
          connected_at: new Date().toISOString(),
          last_synced_at: new Date().toISOString()
        });
      }
    }

    revalidatePath('/[locale]/dashboard/integrations', 'page');
    return { success: true };
  } catch {
    return { error: 'Failed to validate bot token.' };
  }
}
