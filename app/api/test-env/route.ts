import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  return NextResponse.json({
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS,
    hasEmailTo: !!process.env.EMAIL_TO,
    emailUserLength: process.env.EMAIL_USER?.length || 0,
    emailPassLength: process.env.EMAIL_PASS?.length || 0,
    // Don't expose actual values, just check they exist
    emailUserPreview: process.env.EMAIL_USER?.substring(0, 4) + '***',
  });
}
