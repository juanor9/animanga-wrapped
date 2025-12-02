import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // In a production environment, you might want to:
    // 1. Blacklist the refresh token in the database
    // 2. Clear any server-side sessions
    // For now, we just acknowledge the logout

    return NextResponse.json({
      message: 'Logout successful',
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
