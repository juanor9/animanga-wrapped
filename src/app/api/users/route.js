import { NextResponse } from 'next/server';
import { generateAccessToken, generateRefreshToken } from '../lib/auth';
import connectDB from '../lib/db';
import User from '../models/User';

export async function POST(request) {
  try {
    await connectDB();

    const {
      // AniList OAuth data
      anilistId,
      anilistUsername,
      anilistAvatar,
      anilistAccessToken,
      anilistTokenExpiry,
      // User-provided data
      email,
      country,
      isAdult,
      // Consents
      termsAccepted,
      privacyAccepted,
    } = await request.json();

    // Validate required fields
    if (!anilistId || !anilistUsername || !email || !country) {
      return NextResponse.json(
        { error: 'AniList ID, username, email, and country are required' },
        { status: 400 }
      );
    }

    // Validate age
    if (!isAdult) {
      return NextResponse.json(
        { error: 'You must be 18 or older to use this service' },
        { status: 403 }
      );
    }

    // Validate consents
    if (!termsAccepted || !privacyAccepted) {
      return NextResponse.json(
        { error: 'You must accept the Terms and Privacy Policy' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }

    // Check if user already exists (by anilistId or email)
    const existingUser = await User.findOne({
      $or: [{ anilistId }, { email: email.toLowerCase() }],
    });

    if (existingUser) {
      if (existingUser.anilistId === anilistId) {
        return NextResponse.json(
          { error: 'An account with this AniList profile already exists' },
          { status: 409 }
        );
      }
      return NextResponse.json(
        { error: 'An account with this email already exists' },
        { status: 409 }
      );
    }

    // Create user
    const now = new Date();
    const user = await User.create({
      anilistId,
      anilistUsername,
      anilistAvatar,
      anilistAccessToken,
      anilistTokenExpiry: anilistTokenExpiry ? new Date(anilistTokenExpiry) : null,
      email: email.toLowerCase(),
      country,
      isAdult,
      consents: {
        termsAccepted,
        termsAcceptedAt: now,
        privacyAccepted,
        privacyAcceptedAt: now,
      },
      lists: [],
    });

    // Generate JWT tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Return user data
    const userResponse = {
      id: user._id.toString(),
      anilistId: user.anilistId,
      anilistUsername: user.anilistUsername,
      anilistAvatar: user.anilistAvatar,
      email: user.email,
      country: user.country,
      emailVerified: user.emailVerified,
      lists: user.lists,
    };

    return NextResponse.json(
      {
        accessToken,
        refreshToken,
        user: userResponse,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
