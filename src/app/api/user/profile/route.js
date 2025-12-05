import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { getUserFromRequest } from '../../lib/auth';
import connectDB from '../../lib/db';
import User from '../../models/User';

/**
 * GET /api/user/profile
 * Get current authenticated user's profile
 */
export async function GET(request) {
  try {
    await connectDB();

    const userId = await getUserFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(userId).select(
      '-loginAttempts -lockoutUntil -anilistAccessToken'
    );

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if account is suspended or deleted
    if (user.status === 'suspended') {
      return NextResponse.json(
        {
          error: 'Account suspended',
          suspendedAt: user.suspendedAt,
          suspendedReason: user.suspendedReason,
        },
        { status: 403 }
      );
    }

    if (user.status === 'deleted') {
      return NextResponse.json({ error: 'Account has been deleted' }, { status: 410 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json({ error: 'Failed to fetch user profile' }, { status: 500 });
  }
}

/**
 * PUT /api/user/profile
 * Update current authenticated user's profile
 */
export async function PUT(request) {
  try {
    await connectDB();

    const userId = await getUserFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { email, country, anilistUsername } = body;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if account is suspended or deleted
    if (user.status === 'suspended' || user.status === 'deleted') {
      return NextResponse.json(
        { error: 'Cannot update suspended or deleted account' },
        { status: 403 }
      );
    }

    // Update allowed fields
    if (email && email !== user.email) {
      // Check if email is already taken
      const existingUser = await User.findOne({ email: email.toLowerCase() });
      if (existingUser) {
        return NextResponse.json({ error: 'Email already in use' }, { status: 400 });
      }
      user.email = email.toLowerCase();
      user.emailVerified = false; // Reset email verification
    }

    if (country) {
      user.country = country;
    }

    if (anilistUsername) {
      user.anilistUsername = anilistUsername;
    }

    await user.save();

    const updatedUser = await User.findById(userId).select(
      '-loginAttempts -lockoutUntil -anilistAccessToken'
    );

    return NextResponse.json(
      { message: 'Profile updated successfully', user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user profile:', error);
    return NextResponse.json({ error: 'Failed to update user profile' }, { status: 500 });
  }
}
