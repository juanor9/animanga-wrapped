import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import MagicLink from '../../../models/MagicLink';
import User from '../../../models/User';
import { generateAccessToken, generateRefreshToken } from '../../../lib/auth';

export async function GET(request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    // Find magic link
    const magicLink = await MagicLink.findOne({ token });

    if (!magicLink) {
      return NextResponse.json({ error: 'Invalid or expired magic link' }, { status: 401 });
    }

    // Check if expired
    if (magicLink.expiresAt < new Date()) {
      await MagicLink.deleteOne({ token });
      return NextResponse.json({ error: 'Magic link has expired' }, { status: 401 });
    }

    // Find user
    const user = await User.findOne({ email: magicLink.email });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Mark email as verified (first successful magic link login)
    if (!user.emailVerified) {
      user.emailVerified = true;
      user.emailVerifiedAt = new Date();
      await user.save();
    }

    // Delete magic link (one-time use)
    await MagicLink.deleteOne({ token });

    // Generate JWT tokens
    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    // Return tokens and user data
    return NextResponse.json({
      accessToken,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        anilistUsername: user.anilistUsername,
        anilistAvatar: user.anilistAvatar,
        country: user.country,
        emailVerified: user.emailVerified,
        lists: user.lists,
      },
    });
  } catch (error) {
    console.error('Magic link verify error:', error);
    return NextResponse.json(
      { error: 'Failed to verify magic link', details: error.message },
      { status: 500 }
    );
  }
}
