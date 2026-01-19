import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// SERVER-SIDE: NO NEXT_PUBLIC_ prefix needed
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export async function POST(request: Request) {
  try {
    const { platform, videoUrl, videoId, campaignId } = await request.json();
    
    // Get campaign ID
    const { data: campaignData } = await supabase
      .from('campaigns')
      .select('id')
      .limit(1);
    
    const campaign_id = campaignData?.[0]?.id || 'default-campaign';
    
    // Random views + fraud detection
    const isFraud = Math.random() < 0.1;
    const views = isFraud ? 999999 : Math.floor(Math.random() * 5000) + 1000;
    
    // Save to Supabase
    const { data, error } = await supabase.from('submissions').insert({
      user_id: 'demo-user-001',
      campaign_id: campaign_id,
      platform,
      video_url: videoUrl,
      video_id: videoId || 'demo-video',
      views,
      is_fraud: isFraud
    });

    return NextResponse.json({
      success: true,
      views,
      submission_id: data?.[0]?.id || `sub-${Date.now()}`,
      is_fraud: isFraud
    });
  } catch (error) {
    console.error('Submit error:', error);
    return NextResponse.json(
      { success: false, error: 'Submit failed' }, 
      { status: 500 }
    );
  }
}
