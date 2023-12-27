/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from '../../../../services/upload';
import './AnimeSeries.scss';
import 'react-responsive-modal/styles.css';
import StoryCard from '../../../../../../components/Stories/Stories';

const serverUrl = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;
const year = process.env.NEXT_PUBLIC_YEAR;

const AnimeSeries = ({ list }) => {
  const [sortedWatchedMinutes, setSortedWatchedMinutes] = useState(null);
  const dispatch = useDispatch();
  const { listUsername } = useSelector((state) => state.UserReducer.user);
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
        const isAnimeCompleted = fullActivity.some(
          (e) => e.status === 'completed',
        );

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
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          // Caso 2: Un episodio: progress: '1', como está completo, se resta el número inicial de capítulos al número total de capítulos para tener los capítulos vistos durante el año.
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstWatchedEpisode = firstActivity.progress;
            const fullEpisodes = firstActivity.episodes;
            const watchedEpisodes = Number(fullEpisodes) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          // Caso 3: visto de una sentada: status: 'completed', progress: null
          if (
            firstActivityProgress === null
            && firstActivity.status === 'completed'
          ) {
            const { episodes } = firstActivity;
            const { duration } = firstActivity;
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

          // Caso 1: Varios episodios: progress: '1 - 6', en inicio y ultimo
          if (
            firstActivityProgress
            && firstActivityProgress.includes('-')
            && lastActivityProgress
            && lastActivityProgress.includes('-')
          ) {
            const firstWatchedEpisode = firstActivityProgress.split(' - ')[0];
            const lastWatchedEpisode = lastActivityProgress.split(' - ')[1];
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          // Caso 2: Un episodio: progress: '1', en inicio y último
          if (
            firstActivityProgress
            && !firstActivityProgress.includes('-')
            && lastActivityProgress
            && !lastActivityProgress.includes('-')
          ) {
            const firstWatchedEpisode = firstActivityProgress;
            const lastWatchedEpisode = lastActivityProgress;
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          // Caso 3: progress: '1 - 6' en primera actividad y progress: '1' en última
          if (
            firstActivityProgress
            && firstActivityProgress.includes('-')
            && lastActivityProgress
            && !lastActivityProgress.includes('-')
          ) {
            const firstWatchedEpisode = firstActivityProgress.split(' - ')[0];
            const lastWatchedEpisode = lastActivityProgress;
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
          // Caso 4: progress: '1' en primera actividad y progress: '1 - 6' en última
          if (
            firstActivityProgress
            && !firstActivityProgress.includes('-')
            && lastActivityProgress
            && lastActivityProgress.includes('-')
          ) {
            const firstWatchedEpisode = firstActivityProgress;
            const lastWatchedEpisode = lastActivityProgress.split(' - ')[1];
            const watchedEpisodes = Number(lastWatchedEpisode) - Number(firstWatchedEpisode) + 1;
            const { duration } = firstActivity;
            const timeWatched = Number(watchedEpisodes) * Number(duration);
            return { anime: key, timeWatched, image: firstActivity.image };
          }
        }
        return null;
      });
      const sortedWatchedTimeBySeries = WatchedTimeBySeries.sort(
        (a, b) => b.timeWatched - a.timeWatched,
      );
      if (
        sortedWatchedTimeBySeries
        && Array.isArray(sortedWatchedTimeBySeries)
      ) {
        setSortedWatchedMinutes(sortedWatchedTimeBySeries);
      }
    }
  }, [list]);

  const [topWatchedMinutes, setTopWatchedMinutes] = useState([]);
  const downloadToCloudinary = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

      const blob = await response.blob();
      const file = new File([blob], 'anime-watched-image.png', {
        type: blob.type,
      });

      const uploadedImageResponse = await dispatch(
        uploadImage({ file, listUsername, filename }),
      );

      if (uploadedImageResponse.type === 'uploads/uploadImage/fulfilled') {
        const cloudinaryUrl = uploadedImageResponse.payload.url;
        return cloudinaryUrl;
      }
      throw new Error('Image upload failed');
    } catch (error) {
      throw new Error('Error downloading or uploading image:', error);
    }
  };

  useEffect(() => {
    const processImages = async () => {
      if (sortedWatchedMinutes && sortedWatchedMinutes.length > 0) {
        const newTopWatchedMinutesPromises = sortedWatchedMinutes.map(
          async (element) => {
            const alImage = element.image;
            const parts = alImage.split('/');
            const newPath = parts.slice(3).join('/');
            const newUrl = `${serverUrl}/api/al/sources/${newPath}`;
            const cloudinaryUrl = await downloadToCloudinary(
              newUrl,
              element.anime,
            );

            return {
              ...element,
              image: cloudinaryUrl,
            };
          },
        );

        const newTopWatchedMinutes = await Promise.all(
          newTopWatchedMinutesPromises,
        );
        setTopWatchedMinutes(newTopWatchedMinutes);
      }
    };

    processImages();
  }, [sortedWatchedMinutes]);

  return (
    <StoryCard key="3" id="3" color="pink">
      <>
        <p className="story__main-copy">Your main series for {year}</p>
        <ol className="story__list-container">
          {Array.isArray(topWatchedMinutes) && topWatchedMinutes.length > 0
            ? topWatchedMinutes.slice(0, 5).map((item) => {
              const url = item.image;
              const cloudinaryParams = 'ar_1:1,c_crop/ar_1:1,c_scale,w_300/';
              const parts = url.split('image/upload/');
              const image = `${parts[0]}image/upload/${cloudinaryParams}${parts[1]}`;
              return (
                <li key={uuidv4()} className="story__list-item">
                  <picture className="story__list-image">
                    <div
                      role="img"
                      aria-label={item.anime}
                      style={{ backgroundImage: `url(${image})` }}
                    />
                  </picture>
                  <div className="story__list-text">
                    <p className="story__list-text--title">{item.anime}</p>
                    <p className="story__list-text--time">
                      {item.timeWatched} minutes
                    </p>
                  </div>
                </li>
              );
            })
            : null}
        </ol>
      </>
    </StoryCard>
  );
};
export default AnimeSeries;
