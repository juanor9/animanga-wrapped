import { NextResponse } from 'next/server';
import { getUserFromRequest } from '../../lib/auth';
import connectDB from '../../lib/db';
import User from '../../models/User';

/**
 * PUT /api/user/suspend
 * Suspend current authenticated user's account
 */
export async function PUT(request) {
  try {
    await connectDB();

    const userId = await getUserFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { reason } = body;

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if already suspended or deleted
    if (user.status === 'suspended') {
      return NextResponse.json({ error: 'Account is already suspended' }, { status: 400 });
    }

    if (user.status === 'deleted') {
      return NextResponse.json({ error: 'Cannot suspend a deleted account' }, { status: 400 });
    }

    // Suspend the account
    user.status = 'suspended';
    user.suspendedAt = new Date();
    user.suspendedReason = reason || 'User requested suspension';

    await user.save();

    return NextResponse.json(
      {
        message: 'Account suspended successfully',
        suspendedAt: user.suspendedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error suspending account:', error);
    return NextResponse.json({ error: 'Failed to suspend account' }, { status: 500 });
  }
}

/**
 * DELETE /api/user/suspend
 * Reactivate suspended account
 */
export async function DELETE(request) {
  try {
    await connectDB();

    const userId = await getUserFromRequest(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Check if account is suspended
    if (user.status !== 'suspended') {
      return NextResponse.json({ error: 'Account is not suspended' }, { status: 400 });
    }

    // Reactivate the account
    user.status = 'active';
    user.suspendedAt = null;
    user.suspendedReason = null;

    await user.save();

    return NextResponse.json({ message: 'Account reactivated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error reactivating account:', error);
    return NextResponse.json({ error: 'Failed to reactivate account' }, { status: 500 });
  }
}
