import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code') || 'demo';
  
  // Save demo token to Supabase
  await supabase.from('profiles').upsert({
    id: 'demo-user-001',
    tiktok_id: 'tiktok_user_123',
    tiktok_token: `demo_${code}_${Date.now()}`
  });
  
  return NextResponse.redirect('http://10.25.161.252:3000/dashboard?status=tiktok_connected');
}
