import { NextResponse } from 'next/server';

export async function GET() {
  // Demo LinkedIn connect
  const demoCallback = 'http://localhost:3000/dashboard?status=linkedin_connected';
  return NextResponse.redirect(demoCallback);
}
