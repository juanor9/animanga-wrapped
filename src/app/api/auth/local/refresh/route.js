import { NextResponse } from 'next/server';
import { verifyToken, generateAccessToken } from '../../../lib/auth';

export async function POST(request) {
  try {
    const { refreshToken } = await request.json();

    if (!refreshToken) {
      return NextResponse.json({ error: 'Refresh token is required' }, { status: 400 });
    }

    // Verify refresh token
    const payload = verifyToken(refreshToken);

    if (!payload || !payload.userId) {
      return NextResponse.json({ error: 'Invalid or expired refresh token' }, { status: 401 });
    }

    // Generate new access token
    const accessToken = generateAccessToken(payload.userId);

    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
