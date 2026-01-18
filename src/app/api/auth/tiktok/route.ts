import { NextResponse } from 'next/server';

export async function GET() {
  // Demo TikTok OAuth flow
  const demoCallback = 'http://10.25.161.252:3000/api/tiktok/callback?code=demo_success_001';
  return NextResponse.redirect(demoCallback);
}
