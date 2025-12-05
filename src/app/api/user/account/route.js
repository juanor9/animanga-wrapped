import { NextResponse } from 'next/server';
import { getUserFromRequest } from '../../lib/auth';
import connectDB from '../../lib/db';
import User from '../../models/User';

/**
 * DELETE /api/user/account
 * Soft delete current authenticated user's account
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

    // Check if already deleted
    if (user.status === 'deleted') {
      return NextResponse.json({ error: 'Account is already deleted' }, { status: 400 });
    }

    // Soft delete the account
    user.status = 'deleted';
    user.deletedAt = new Date();

    // Optionally anonymize sensitive data
    user.email = `deleted_${user._id}@deleted.com`;
    user.anilistAccessToken = null;

    await user.save();

    return NextResponse.json(
      {
        message: 'Account deleted successfully',
        deletedAt: user.deletedAt,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error deleting account:', error);
    return NextResponse.json({ error: 'Failed to delete account' }, { status: 500 });
  }
}
