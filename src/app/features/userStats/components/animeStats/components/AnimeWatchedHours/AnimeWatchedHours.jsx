/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './AnimeWatchedHours.scss';
import StoryCard from '../../../../../../components/Stories/Stories';

const AnimeWatchedHours = ({ list }) => {
  const [totalMinutes, setTotalMinutes] = useState(0);

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => ({
        status: activity.status,
        progress: activity.progress,
        anime: activity.media.title.userPreferred,
        episodes: activity.media.episodes,
        duration: activity.media.duration,
        image: activity.media.coverImage.extraLarge,
      }));
      const groupedByAnime = fullData.reduce((acc, curr) => {
        if (!acc[curr.anime]) {
          acc[curr.anime] = [];
        }
        acc[curr.anime].push(curr);
        return acc;
      }, {});

      const WatchedTimeBySeries = Object.keys(groupedByAnime).map((key) => {
        const fullActivity = groupedByAnime[key];
        const isAnimeCompleted = fullActivity.some((e) => e.status === 'completed');

        if (isAnimeCompleted) {
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          const firstActivityProgress = firstActivity.progress;

          if (firstActivityProgress && firstActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivity.progress.split(' - ')[0];
            const fullEpisodes = firstActivity.episodes;
            const watchedEpisodes = Number(fullEpisodes) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivity.progress;
            const fullEpisodes = firstActivity.episodes;
            const watchedEpisodes = Number(fullEpisodes) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          if (firstActivityProgress === null && firstActivity.status === 'completed') {
            const { episodes, duration } = firstActivity;
            const timeWatched = Number(episodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
        }

        if (!isAnimeCompleted) {
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          const firstActivityProgress = firstActivity.progress;
          const lastActivity = fullActivity[0];
          const lastActivityProgress = lastActivity.progress;

          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress.split(' - ')[0];
            const lastWatchedEpisode = lastActivityProgress.split(' - ')[1];
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress;
            const lastWatchedEpisode = lastActivityProgress;
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress.split(' - ')[0];
            const lastWatchedEpisode = lastActivityProgress;
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress;
            const lastWatchedEpisode = lastActivityProgress.split(' - ')[1];
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
        }
        return null;
      }).filter(Boolean); // Filter out null values

      const totalTime = WatchedTimeBySeries.reduce((acc, curr) => acc + curr.timeWatched, 0);
      setTotalMinutes(totalTime);
    }
  }, [list]);

  return (
    <StoryCard key="1" id="1" color="orange">
      <p>
        This year you watched{' '}
        <span className="story__text-highlight">{totalMinutes}</span> minutes
        of anime.
      </p>
    </StoryCard>
  );
};
export default AnimeWatchedHours;
