/* eslint-disable spaced-comment */
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
        if (isAnimeCompleted) { // Esto es solo para los animes que están ya finalizados de ver.
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
            // console.log(key, watchedEpisodes, ' episodes | duration:', duration, 'minutes | Time watched:', timeWatched);
          }
          // Caso 2: Un episodio: progress: '1', como está completo, se resta el número inicial de capítulos al número total de capítulos para tener los capítulos vistos durante el año.
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivity.progress;
            const fullEpisodes = firstActivity.episodes;
            const watchedEpisodes = Number(fullEpisodes) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            // console.log(key, watchedEpisodes, ' episodes | duration:', duration, 'minutes | Time watched:', timeWatched);
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
        // TODO: deal with watching titles
        if (!isAnimeCompleted) {
          // console.log(key);
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          const firstActivityProgress = firstActivity.progress;
          // console.log('🚀 ~ file: AnimeWatchedHours.jsx:68 ~ Object.keys ~ firstActivityProgress:', firstActivityProgress);
          const lastActivity = fullActivity[0];
          const lastActivityProgress = lastActivity.progress;
          // console.log('🚀 ~ file: AnimeWatchedHours.jsx:72 ~ Object.keys ~ lastActivityProgress:', lastActivityProgress);
          // TODO: Caso 1: Varios episodios: progress: '1 - 6', en inicio y ultimo
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            console.log(key);
            console.log('🚀 ~ file: AnimeWatchedHours.jsx:75 ~ Object.keys ~ lastActivityProgress:', lastActivityProgress);
            console.log('🚀 ~ file: AnimeWatchedHours.jsx:75 ~ Object.keys ~ firstActivityProgress:', firstActivityProgress);
          }
          // TODO: Caso 2: Un episodio: progress: '1', en inicio y último
          // TODO: Caso 3: progress: '1 - 6' en primera actividad y progress: '1' en última
          // TODO: Caso 4: progress: '1' en primera actividad y progress: '1 - 6' en última
          // TODO: obtener último episodio visto
        }
      });
    }
  }, [list]);
};
export default AnimeWatchedHours;
