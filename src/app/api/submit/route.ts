import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: Request) {
  const { videoUrl, videoId, platform } = await request.json();
  
  const campaign = await supabase.from('campaigns').select('id').limit(1);
  const campaignId = campaign.data?.[0]?.id;

  const { data, error } = await supabase.from('submissions').insert({
    user_id: 'demo-user-001',
    campaign_id: campaignId,
    platform,
    video_url: videoUrl,
    video_id: videoId,
    views: Math.floor(Math.random() * 10000) + 1000,
  });

  return NextResponse.json({ 
    success: true, 
    views: Math.floor(Math.random() * 10000) + 1000,
    submission_id: data?.[0]?.id 
  });
}
