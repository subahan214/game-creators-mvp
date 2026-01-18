import { NextResponse } from 'next/server';

export async function GET() {
  // Instant demo TikTok flow (no real API needed)
  const demoCallback = 'http://localhost:3000/api/tiktok/callback?code=demo_success_001&state=gameofcreators';
  return NextResponse.redirect(demoCallback);
}
