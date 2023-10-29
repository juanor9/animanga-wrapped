/* eslint-disable react/jsx-key */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import TimePerSeries from './TimePerSeries/TimePerSeries';

const AnimeWatchedHours = ({ list }) => {
  const [sortedWatchedMinutes, setSortedWatchedMinutes] = useState(null);
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          status: activity.status,
          progress: activity.progress,
          anime: activity.media.title.userPreferred,
          episodes: activity.media.episodes,
          duration: activity.media.duration,
        }
      ));
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

          // Caso 1: Varios episodios: progress: '1 - 6', como está completo, se extrae el primer capítulo con un split, y se resta el primer capítulo del total de capítulos para tener el total de capítulos vistos durante el año.
          if (firstActivityProgress && firstActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivity.progress.split(' - ')[0];
            const fullEpisodes = firstActivity.episodes;
            const watchedEpisodes = Number(fullEpisodes) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched };
          }
          // Caso 2: Un episodio: progress: '1', como está completo, se resta el número inicial de capítulos al número total de capítulos para tener los capítulos vistos durante el año.
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivity.progress;
            const fullEpisodes = firstActivity.episodes;
            const watchedEpisodes = Number(fullEpisodes) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched };
          }
          // Caso 3: visto de una sentada: status: 'completed', progress: null
          if (firstActivityProgress === null && firstActivity.status === 'completed') {
            const { episodes } = firstActivity;
            const { duration } = firstActivity;
            const timeWatched = Number(episodes) * Number(duration);
            return { anime: key, timeWatched };
          }
        }

        if (!isAnimeCompleted) {
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          const firstActivityProgress = firstActivity.progress;
          const lastActivity = fullActivity[0];
          const lastActivityProgress = lastActivity.progress;

          // Caso 1: Varios episodios: progress: '1 - 6', en inicio y ultimo
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress.split(' - ')[0];
            const lastWatchedEpisode = lastActivityProgress.split(' - ')[1];
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched };
          }
          // Caso 2: Un episodio: progress: '1', en inicio y último
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress;
            const lastWatchedEpisode = lastActivityProgress;
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched };
          }
          // Caso 3: progress: '1 - 6' en primera actividad y progress: '1' en última
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress.split(' - ')[0];
            const lastWatchedEpisode = lastActivityProgress;
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched };
          }
          // Caso 4: progress: '1' en primera actividad y progress: '1 - 6' en última
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivityProgress;
            const lastWatchedEpisode = lastActivityProgress.split(' - ')[1];
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched };
          }
        }
        return null;
      });
      const sortedWatchedTimeBySeries = WatchedTimeBySeries.sort((a, b) => b.timeWatched - a.timeWatched);
      if (sortedWatchedTimeBySeries && Array.isArray(sortedWatchedTimeBySeries)) {
        setSortedWatchedMinutes(sortedWatchedTimeBySeries);
      }
    }
  }, [list]);
  const [totalMinutes, setTotalMinutes] = useState(0);
  useEffect(() => {
    if (sortedWatchedMinutes) {
      const totalTime = sortedWatchedMinutes.reduce((acc, curr) => acc + curr.timeWatched, 0);
      setTotalMinutes(totalTime);
    }
  }, [sortedWatchedMinutes]);
  return (
    <div>
      <p>Total time watched: {totalMinutes} minutes.</p>
      <TimePerSeries list={sortedWatchedMinutes} />
    </div>
  );
};
export default AnimeWatchedHours;
