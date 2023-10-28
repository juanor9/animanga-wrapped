/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useEffect } from 'react';

const AnimeWatchedHours = ({ list }) => {
  // console.log('🚀 ~ file: AnimeWatchedHours.jsx:4 ~ AnimeWatchedHours ~ list:', list);
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
      Object.keys(groupedByAnime).forEach((key) => {
        const fullActivity = groupedByAnime[key];
        const isAnimeCompleted = fullActivity.some((e) => e.status === 'completed');
        if (isAnimeCompleted) {
          // console.log(`${key} has been completed`);
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          // console.log('🚀 ~ file: AnimeWatchedHours.jsx:32 ~ Object.keys ~ firstActivity:', firstActivity);
          const firstActivityProgress = firstActivity.progress;

          // TODO: Caso 1: Varios episodios: progress: '1 - 6'
          // TODO: Caso 2: Un episodio: progress: '1',
          if (firstActivityProgress && Number(firstActivityProgress.length) === 1) {
            console.log('🚀 ~ file: AnimeWatchedHours.jsx:34 ~ Object.keys ~ firstActivityProgress:', );
          }
          // Caso 3: visto de una sentada: status: 'completed', progress: null
          if (firstActivityProgress === null && firstActivity.status === 'completed') {
            // console.log('🚀 ~ file: AnimeWatchedHours.jsx:38 ~ Object.keys ~ firstActivity:', firstActivity);
            const { episodes } = firstActivity;
            const { duration } = firstActivity;
            const timeWatched = Number(episodes) * Number(duration);
            // console.log(key, 'de una sentada', episodes, '| duration:', duration, 'minutes | Time watched:', timeWatched);
          }
        }
      });
    }
  }, [list]);
};
export default AnimeWatchedHours;
