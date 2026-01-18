import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code') || 'demo';

  // Save TikTok connection to Supabase
  await supabase.from('profiles').upsert({
    id: 'demo-user-001',
    tiktok_id: `tiktok_${Date.now()}`,
    tiktok_token: `token_${code}_${Date.now()}`,
  });

  return NextResponse.redirect('/dashboard?status=tiktok_connected&user=demo-user-001');
}
