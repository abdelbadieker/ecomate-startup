import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// ═══════════════════════════════════════════════════════════════
// META OAUTH CALLBACK — Facebook / Instagram Page Token Exchange
// ═══════════════════════════════════════════════════════════════
// Flow:
//   1. User clicks "Connect" → redirected to Meta OAuth dialog
//   2. Meta redirects back here with ?code=...
//   3. We exchange code for a short-lived token
//   4. Exchange short-lived for long-lived page_access_token
//   5. Store securely in social_integrations (never exposed to client)
// ═══════════════════════════════════════════════════════════════

const META_APP_ID = process.env.NEXT_PUBLIC_META_APP_ID!;
const META_APP_SECRET = process.env.META_APP_SECRET!;
const REDIRECT_URI = `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/meta`;

// Step 1: Initiate OAuth
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const platform = searchParams.get('platform') || 'facebook';
  const errorParam = searchParams.get('error');

  // If error from Meta
  if (errorParam) {
    return NextResponse.redirect(new URL('/en/dashboard/integrations?error=meta_denied', request.url));
  }

  // If no code, redirect to Meta OAuth dialog
  if (!code) {
    const scopes = platform === 'instagram'
      ? 'instagram_basic,instagram_manage_messages,pages_show_list,pages_messaging'
      : 'pages_show_list,pages_messaging,pages_read_engagement,pages_manage_metadata';

    const oauthUrl = `https://www.facebook.com/v19.0/dialog/oauth?` +
      `client_id=${META_APP_ID}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&scope=${scopes}` +
      `&state=${platform}` +
      `&response_type=code`;

    return NextResponse.redirect(oauthUrl);
  }

  // Step 2: Exchange code for short-lived token
  try {
    const tokenRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&code=${code}`
    );
    const tokenData = await tokenRes.json();

    if (tokenData.error) {
      console.error('[Meta OAuth] Token exchange error:', tokenData.error);
      return NextResponse.redirect(new URL('/en/dashboard/integrations?error=token_exchange', request.url));
    }

    const shortLivedToken = tokenData.access_token;

    // Step 3: Exchange for long-lived token
    const longLivedRes = await fetch(
      `https://graph.facebook.com/v19.0/oauth/access_token?` +
      `grant_type=fb_exchange_token` +
      `&client_id=${META_APP_ID}` +
      `&client_secret=${META_APP_SECRET}` +
      `&fb_exchange_token=${shortLivedToken}`
    );
    const longLivedData = await longLivedRes.json();
    const longLivedToken = longLivedData.access_token || shortLivedToken;

    // Step 4: Get user's pages
    const pagesRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?access_token=${longLivedToken}`
    );
    const pagesData = await pagesRes.json();
    const page = pagesData.data?.[0]; // First page

    if (!page) {
      return NextResponse.redirect(new URL('/en/dashboard/integrations?error=no_pages', request.url));
    }

    // Step 5: Store in Supabase using Service Role (secure, no client exposure)
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // We need a user_id. For now, we extract from a cookie or session.
    // In production, you'd pass user_id in the OAuth state parameter.
    // For the scaffold, we store with a placeholder that admin can assign.
    const state = searchParams.get('state') || 'facebook';

    await supabase.from('social_integrations').insert({
      platform: state,
      account_name: page.name,
      account_id: page.id,
      page_id: page.id,
      page_name: page.name,
      access_token: page.access_token, // Page-level token (most useful)
      long_lived_token: longLivedToken,
      token_expires_at: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // ~60 days
      scopes: tokenData.scope?.split(',') || [],
      status: 'connected',
      connected_at: new Date().toISOString(),
      last_synced_at: new Date().toISOString()
    });

    return NextResponse.redirect(new URL('/en/dashboard/integrations?success=connected', request.url));

  } catch (err) {
    console.error('[Meta OAuth] Unexpected error:', err);
    return NextResponse.redirect(new URL('/en/dashboard/integrations?error=unknown', request.url));
  }
}
