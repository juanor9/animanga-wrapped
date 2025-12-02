import { NextResponse } from 'next/server';
import { comparePassword, generateAccessToken, generateRefreshToken } from '../../../lib/auth';
import connectDB from '../../../lib/db';
import User from '../../../models/User';

const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Check if account is locked
    if (user.lockoutEndTime && user.lockoutEndTime > new Date()) {
      const remainingTime = Math.ceil((user.lockoutEndTime - new Date()) / 1000 / 60);
      return NextResponse.json(
        {
          error: 'Account is locked due to multiple failed login attempts',
          lockoutEndTime: user.lockoutEndTime,
          remainingMinutes: remainingTime,
        },
        { status: 423 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.password);

    if (!isValidPassword) {
      // Increment login attempts
      user.loginAttempts += 1;

      // Lock account if max attempts reached
      if (user.loginAttempts >= MAX_LOGIN_ATTEMPTS) {
        user.lockoutEndTime = new Date(Date.now() + LOCKOUT_DURATION);
      }

      await user.save();

      return NextResponse.json(
        {
          error: 'Invalid credentials',
          attemptsRemaining: Math.max(0, MAX_LOGIN_ATTEMPTS - user.loginAttempts),
        },
        { status: 401 }
      );
    }

    // Reset login attempts on successful login
    user.loginAttempts = 0;
    user.lockoutEndTime = null;
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user._id.toString());
    const refreshToken = generateRefreshToken(user._id.toString());

    // Return user data without password
    const userResponse = {
      id: user._id.toString(),
      email: user.email,
      username: user.username,
      listUsername: user.listUsername,
      lists: user.lists,
    };

    return NextResponse.json({
      accessToken,
      refreshToken,
      user: userResponse,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
