import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';
import { getUserFromRequest } from '../lib/auth';

export async function POST(request) {
  try {
    // Verify authentication
    const user = getUserFromRequest(request);
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('image');
    const type = formData.get('type');
    const username = formData.get('username');

    // Validate type
    if (!type || (type !== 'media' && type !== 'stats')) {
      return NextResponse.json(
        { error: "Invalid upload type. Must be 'media' or 'stats'" },
        { status: 400 }
      );
    }

    // Validate username for stats uploads
    if (type === 'stats' && !username) {
      return NextResponse.json(
        { error: "Username is required for 'stats' upload type" },
        { status: 400 }
      );
    }

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Generate a unique filename
    const timestamp = Date.now();
    const originalName = file.name || 'image.png';
    const extension = originalName.split('.').pop();
    const pathname =
      type === 'stats'
        ? `stats/${username}/${timestamp}.${extension}`
        : `media/${timestamp}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(pathname, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    return NextResponse.json({
      secure_url: blob.url,
      url: blob.url,
      pathname: blob.pathname,
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed', details: error.message }, { status: 500 });
  }
}
