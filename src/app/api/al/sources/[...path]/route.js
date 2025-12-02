import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    // Reconstruct the path from the dynamic segments
    const path = params.path.join('/');
    const anilistUrl = `https://s4.anilist.co/${path}`;

    // Fetch the image from AniList
    const response = await fetch(anilistUrl);

    if (!response.ok) {
      return NextResponse.json({ error: 'Image not found on AniList' }, { status: 404 });
    }

    // Get the image buffer and content type
    const imageBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/png';

    // Return the image with appropriate headers
    return new NextResponse(imageBuffer, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch image from AniList' }, { status: 500 });
  }
}
