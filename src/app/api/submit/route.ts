import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { platform, videoUrl, campaignId } = await request.json();
    
    // Random views + fraud detection
    const isFraud = Math.random() < 0.1;
    const views = isFraud ? 999999 : Math.floor(Math.random() * 5000) + 1000;
    
    return NextResponse.json({
      success: true,
      views,
      submission_id: `sub-${Date.now()}`, // ✅ FIXED
      is_fraud: isFraud
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Submit failed' }, { status: 500 });
  }
}
