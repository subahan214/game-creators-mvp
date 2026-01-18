import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect('http://10.25.161.252:3000/dashboard?status=linkedin_connected');
}
