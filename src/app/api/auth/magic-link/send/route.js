import crypto from 'crypto';
import { NextResponse } from 'next/server';
import connectDB from '../../../lib/db';
import { sendMagicLink } from '../../../lib/email';
import MagicLink from '../../../models/MagicLink';
import User from '../../../models/User';

export async function POST(request) {
  try {
    await connectDB();

    const { email } = await request.json();

    // Validate email
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 });
    }

    // Check if user exists
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: 'No account found with this email' }, { status: 404 });
    }

    // Generate secure token
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Delete any existing magic links for this email
    await MagicLink.deleteMany({ email: email.toLowerCase() });

    // Create new magic link
    await MagicLink.create({
      email: email.toLowerCase(),
      token,
      expiresAt,
    });

    // Send email
    await sendMagicLink(email, token);

    return NextResponse.json({
      message: 'Magic link sent to your email',
    });
  } catch (error) {
    console.error('Magic link send error:', error);
    return NextResponse.json(
      { error: 'Failed to send magic link', details: error.message },
      { status: 500 }
    );
  }
}
