'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

import Spinner from '../components/Spinner/Spinner';
import WrappedContainer from '../features/wrapped/components/WrappedContainer/WrappedContainer';
import * as Slides from '../features/wrapped/slides';

const WrappedClient = ({ anilistId, userName }) => {
  const router = useRouter();
  const [wrappedData, setWrappedData] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const year = new Date().getFullYear();

  useEffect(() => {
    const fetchWrappedData = async () => {
      if (!anilistId) {
        setError('No AniList ID provided');
        setIsLoading(false);
        return;
      }

      try {
        const progressRes = await fetch(
          `/api/wrapped?anilistId=${anilistId}&year=${year}`,
        );

        if (!progressRes.ok) {
          throw new Error('Failed to fetch progress');
        }

        const progressData = await progressRes.json();
        setProgress(progressData);
        setWrappedData(progressData.wrappedData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching wrapped data:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchWrappedData();
  }, [anilistId, year]);

  const slides = useMemo(() => {
    if (!wrappedData) return [];

    return [
      () => <Slides.S01_Opening userName={userName} year={year} />,
      () => <Slides.S02_YouWatched />,
      () => (
        <Slides.S03_TotalMinutes
          totalMinutes={wrappedData.totalMinutesWatched || 0}
        />
      ),
      () => <Slides.S04_GenresIntro />,
      () => (
        <Slides.S05_GenresCount
          genresCount={wrappedData.genresBreakdown?.length || 0}
        />
      ),
      () => (
        <Slides.S06_TopGenres topGenres={wrappedData.genresBreakdown || []} />
      ),
      () => (
        <Slides.S07_GenresCard topGenres={wrappedData.genresBreakdown || []} />
      ),
      () => <Slides.S08_AgeIntro />,
      () => (
        <Slides.S09_OtakuAge weightedYear={wrappedData.weightedYear || 2020} />
      ),
      () => (
        <Slides.S10_EpisodesTotal
          totalEpisodes={wrappedData.totalEpisodesWatched || 0}
        />
      ),
      () => (
        <Slides.S11_TopSeriesReveal
          topSeries={wrappedData.topAnimeByMinutes}
        />
      ),
      () => <Slides.S12_TopSeriesList topSeries={wrappedData.topSeries || []} />,
      () => <Slides.S13_ClubIntro />,
      () => <Slides.S14_ClubReveal club={wrappedData.club} />,
      () => <Slides.S15_ThankYou year={year} />,
      () => (
        <Slides.S16_Summary wrappedData={wrappedData} onComplete={handleComplete} />
      ),
    ];
  }, [wrappedData, userName, year]);

  const handleProgress = useCallback(
    async (slideIndex) => {
      if (!anilistId || !progress) return;

      try {
        await fetch('/api/wrapped', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            anilistId,
            userId: progress.userId,
            year,
            status: 'in_progress',
            lastSlideIndex: slideIndex,
          }),
        });
      } catch (err) {
        console.error('Error updating progress:', err);
      }
    },
    [anilistId, progress, year],
  );

  const handleComplete = useCallback(async () => {
    if (!anilistId || !progress) return;

    try {
      await fetch('/api/wrapped', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          anilistId,
          userId: progress.userId,
          year,
          status: 'completed',
          lastSlideIndex: slides.length - 1,
        }),
      });

      router.push('/user');
    } catch (err) {
      console.error('Error completing wrapped:', err);
      router.push('/user');
    }
  }, [anilistId, progress, year, slides.length, router]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        }}
      >
        <Spinner />
      </div>
    );
  }

  if (error || !wrappedData) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '2rem',
          textAlign: 'center',
        }}
      >
        <h1>Oops!</h1>
        <p>No pudimos cargar tu Wrapped.</p>
        <button
          onClick={() => router.push('/user')}
          style={{
            marginTop: '2rem',
            padding: '1rem 2rem',
            background: 'white',
            color: '#667eea',
            border: 'none',
            borderRadius: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
          type="button"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  const canSkip = progress?.status === 'completed';

  return (
    <WrappedContainer
      slides={slides}
      onComplete={handleComplete}
      onProgress={handleProgress}
      initialSlide={progress?.lastSlideIndex || 0}
      canSkip={canSkip}
    />
  );
};

export default WrappedClient;
