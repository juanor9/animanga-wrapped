import { NextResponse } from 'next/server';

import dbConnect from '../lib/db';
import WrappedProgress from '../models/WrappedProgress';

export async function GET(request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const anilistId = searchParams.get('anilistId');
    const year = searchParams.get('year') || new Date().getFullYear();

    if (!anilistId) {
      return NextResponse.json(
        { error: 'anilistId is required' },
        { status: 400 },
      );
    }

    const progress = await WrappedProgress.findOne({
      anilistId: parseInt(anilistId),
      year: parseInt(year),
    });

    if (!progress) {
      return NextResponse.json(
        {
          status: 'not_started',
          lastSlideIndex: 0,
          wrappedData: null,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error('Error fetching wrapped progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { anilistId, userId, year, status, lastSlideIndex, wrappedData } =
      body;

    if (!anilistId || !userId) {
      return NextResponse.json(
        { error: 'anilistId and userId are required' },
        { status: 400 },
      );
    }

    const updateData = {
      userId,
      anilistId: parseInt(anilistId),
      year: year || new Date().getFullYear(),
    };

    if (status) {
      updateData.status = status;
    }

    if (lastSlideIndex !== undefined) {
      updateData.lastSlideIndex = lastSlideIndex;
    }

    if (wrappedData) {
      updateData.wrappedData = wrappedData;
    }

    if (status === 'completed') {
      updateData.completedAt = new Date();
    }

    const progress = await WrappedProgress.findOneAndUpdate(
      {
        anilistId: parseInt(anilistId),
        year: updateData.year,
      },
      updateData,
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      },
    );

    return NextResponse.json(progress, { status: 200 });
  } catch (error) {
    console.error('Error updating wrapped progress:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
