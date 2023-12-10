/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import { useEffect, useState, useRef } from 'react';
import { toBlob } from 'html-to-image';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import uploadImage from '../../../../services/upload';
import './AnimeWatchedHours.scss';
import 'react-responsive-modal/styles.css';
import StoryCard from '../../../../../../components/Stories/Stories';

const serverUrl = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;
const year = process.env.NEXT_PUBLIC_YEAR;
const AnimeWatchedHours = ({ list }) => {
  const [sortedWatchedMinutes, setSortedWatchedMinutes] = useState(null);

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
  const [totalMinutes, setTotalMinutes] = useState(0);
  useEffect(() => {
    if (sortedWatchedMinutes) {
      const totalTime = sortedWatchedMinutes.reduce(
        (acc, curr) => acc + curr.timeWatched,
        0,
      );
      setTotalMinutes(totalTime);
    }
  }, [sortedWatchedMinutes]);

  // CLOUDINARY
  const [imageUrl, setImageUrl] = useState(null);
  const { listUsername } = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();
  const ref = useRef(null);

  // Función para subir elemento del DOM a cloudinary
  const uploadToCloudinary = async () => {
    if (ref.current) {
      try {
        // console.log('🚀 ~ file: AnimeWatchedHours.jsx:173 ~ uploadToCloudinary ~ ref.current:', ref.current);

        const blob = await toBlob(ref.current);
        // console.log('🚀 ~ file: AnimeWatchedHours.jsx:177 ~ uploadToCloudinary ~ blob:', blob);
        if (blob) {
          const file = new File([blob], 'anime-watched-hours.png', {
            type: 'image/png',
          });
          // console.log('🚀 ~ file: AnimeWatchedHours.jsx:182 ~ uploadToCloudinary ~ file:', file);
          const uploadedImage = await dispatch(
            uploadImage({ file, listUsername }),
          );
          // console.log('🚀 ~ file: AnimeWatchedHours.jsx:186 ~ uploadToCloudinary ~ uploadedImage:', uploadedImage);
          const { url } = uploadedImage.payload;
          // console.log('🚀 ~ file: AnimeWatchedHours.jsx:188 ~ uploadToCloudinary ~ url:', url);
          setImageUrl(String(url));
        }
      } catch (err) {
        throw new Error('Oops, something went wrong!', err);
      }
    }
  };

  // Fragmento para traer la imagen del anime No. 1 y guardarla para reutilizarla
  const [topImage, setTopImage] = useState(null);

  const downloadToCloudinary = async (url) => {
    const response = await fetch(url);
    const blob = await response.blob();
    const file = new File([blob], 'anime-watched-image.png', {
      type: 'image/png',
    });
    const uploadedImage = await dispatch(uploadImage({ file, listUsername }));
    const cloudinaryUrl = uploadedImage.payload.url;
    setTopImage(cloudinaryUrl);
  };

  // UseEffect para descargar la imagen y subirla a Cloudinary
  useEffect(() => {
    if (sortedWatchedMinutes && Array.isArray(sortedWatchedMinutes)) {
      const alImage = sortedWatchedMinutes[0].image;
      const parts = alImage.split('/');
      const newPath = parts.slice(3).join('/');
      const newUrl = `${serverUrl}/api/al/sources/${newPath}`;
      downloadToCloudinary(newUrl);
    }
  }, [sortedWatchedMinutes]);

  return (
    <>
      <StoryCard key="1" id="1" color="orange">
        <p>This year you watched <span className="story__text-highlight">{totalMinutes}</span> minutes of anime.</p>
      </StoryCard>
      <StoryCard key="2" id="2" color="green">
        <>
          <p className="story__main-copy">Your favorite anime this year was:</p>
          {Array.isArray(sortedWatchedMinutes) && sortedWatchedMinutes.length > 0
            ? (
              <>
                <picture className="story__image-main">
                  <img src={sortedWatchedMinutes[0].image} alt={sortedWatchedMinutes[0].anime} />
                </picture>
                <p className="story__text-highlight--longer">{sortedWatchedMinutes[0].anime}</p>
                <p className="story__text-regular">{sortedWatchedMinutes[0].timeWatched} minutes</p>
              </>
            )
            : null}

        </>
      </StoryCard>
      <StoryCard key="3" id="3" color="pink">
        <>
          <p className="story__main-copy">Your main series</p>
          <ol className="story__list-container">
            {Array.isArray(sortedWatchedMinutes) && sortedWatchedMinutes.length > 0
              ? sortedWatchedMinutes.slice(0, 5).map((item) => (
                <li key={uuidv4()} className="story__list-item">
                  <picture className="story__list-image">
                    <img src={item.image} alt={item.anime} />
                  </picture>
                  <div className="story__list-text">
                    <p className="story__list-text--title">{item.anime}</p>
                    <p className="story__list-text--time">{item.timeWatched} minutes</p>
                  </div>
                </li>
              ))
              : null}
          </ol>
        </>

      </StoryCard>
    </>
  );
};
export default AnimeWatchedHours;
