import { NextResponse } from 'next/server';
import { getUserFromRequest } from '../../lib/auth';
import connectDB from '../../lib/db';
import User from '../../models/User';

/**
 * GET /api/user/history
 * Get user's anime and manga history grouped by year
 */
export async function GET(request) {
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

    // Check if account is deleted
    if (user.status === 'deleted') {
      return NextResponse.json({ error: 'Account has been deleted' }, { status: 410 });
    }

    // Group lists by year
    const historyByYear = {};

    if (user.lists && user.lists.length > 0) {
      user.lists.forEach((list) => {
        // Assuming lists have a year property or createdAt date
        const year = list.year || new Date(list.createdAt).getFullYear();

        if (!historyByYear[year]) {
          historyByYear[year] = {
            year,
            anime: [],
            manga: [],
          };
        }

        // Categorize by type
        if (list.type === 'anime') {
          historyByYear[year].anime.push(list);
        } else if (list.type === 'manga') {
          historyByYear[year].manga.push(list);
        }
      });
    }

    // Convert to sorted array (most recent first)
    const history = Object.values(historyByYear).sort((a, b) => b.year - a.year);

    return NextResponse.json(
      {
        history,
        totalYears: history.length,
        totalAnime: history.reduce((sum, year) => sum + year.anime.length, 0),
        totalManga: history.reduce((sum, year) => sum + year.manga.length, 0),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching user history:', error);
    return NextResponse.json({ error: 'Failed to fetch user history' }, { status: 500 });
  }
}
