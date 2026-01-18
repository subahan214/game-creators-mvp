import { NextResponse } from 'next/server';

export async function GET() {
  // LinkedIn demo success flow
  return NextResponse.redirect('http://10.25.161.252:3000/api/linkedin/callback?code=linkedin_success_001');
}
