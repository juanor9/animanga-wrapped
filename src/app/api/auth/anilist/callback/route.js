import { ApolloClient, InMemoryCache, HttpLink, gql } from '@apollo/client';
import { NextResponse } from 'next/server';

const GET_VIEWER = gql`
  query {
    Viewer {
      id
      name
      avatar {
        large
      }
    }
  }
`;

export async function POST(request) {
  try {
    const { accessToken } = await request.json();

    if (!accessToken) {
      return NextResponse.json({ error: 'Access token is required' }, { status: 400 });
    }

    // Create Apollo client for AniList
    const client = new ApolloClient({
      link: new HttpLink({
        uri: 'https://graphql.anilist.co',
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }),
      cache: new InMemoryCache(),
    });

    // Fetch user data from AniList
    const { data } = await client.query({
      query: GET_VIEWER,
    });

    if (!data || !data.Viewer) {
      return NextResponse.json({ error: 'Failed to fetch AniList user data' }, { status: 401 });
    }

    const { Viewer } = data;

    // Calculate token expiry (AniList tokens last 1 year)
    const tokenExpiry = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000);

    return NextResponse.json({
      anilistId: Viewer.id,
      anilistUsername: Viewer.name,
      anilistAvatar: Viewer.avatar?.large || null,
      anilistAccessToken: accessToken,
      anilistTokenExpiry: tokenExpiry,
    });
  } catch (error) {
     
    console.error('AniList callback error:', error);
    return NextResponse.json(
      { error: 'Failed to process AniList authentication', details: error.message },
      { status: 500 }
    );
  }
}
