/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from '../../../../services/upload';
import StoryCard from '../../../../../../components/Stories/Stories';

const year = process.env.NEXT_PUBLIC_YEAR;
const serverUrl = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

const MangaFav = ({ list }) => {
  const [sortedChapters, setSortedChapters] = useState(null);
  const dispatch = useDispatch();
  const { listUsername } = useSelector((state) => state.UserReducer.user);
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          status: activity.status,
          progress: activity.progress,
          manga: activity.media.title.userPreferred,
          chapters: activity.media.chapters,
          image: activity.media.coverImage.extraLarge,
        }
      ));
      const groupedByManga = fullData.reduce((acc, curr) => {
        if (!acc[curr.manga]) {
          acc[curr.manga] = [];
        }
        acc[curr.manga].push(curr);
        return acc;
      }, {});

      const ChaptersBySeries = Object.keys(groupedByManga).map((key) => {
        const fullActivity = groupedByManga[key];
        const isMangaCompleted = fullActivity.some((e) => e.status === 'completed');

        if (isMangaCompleted) {
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          const firstActivityProgress = firstActivity.progress;

          // Caso 1: Varios episodios: progress: '1 - 6', como está completo, se extrae el primer capítulo con un split, y se resta el primer capítulo del total de capítulos para tener el total de capítulos vistos durante el año.
          if (firstActivityProgress && firstActivityProgress.includes('-')) {
            const firstReadChapter = firstActivity.progress.split(' - ')[0];
            const fullChapters = firstActivity.chapters;
            const readChapters = Number(fullChapters) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          // Caso 2: Un episodio: progress: '1', como está completo, se resta el número inicial de capítulos al número total de capítulos para tener los capítulos vistos durante el año.
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstReadChapter = firstActivity.progress;
            const fullChapters = firstActivity.chapters;
            const readChapters = Number(fullChapters) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          // Caso 3: visto de una sentada: status: 'completed', progress: null
          if (firstActivityProgress === null && firstActivity.status === 'completed') {
            const { chapters } = firstActivity;
            return { manga: key, readChapters: chapters, image: firstActivity.image };
          }
        }

        if (!isMangaCompleted) {
          const { length } = fullActivity;
          const firstActivityIndex = length - 1;
          const firstActivity = fullActivity[firstActivityIndex];
          const firstActivityProgress = firstActivity.progress;
          const lastActivity = fullActivity[0];
          const lastActivityProgress = lastActivity.progress;

          // Caso 1: Varios episodios: progress: '1 - 6', en inicio y ultimo
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress.split(' - ')[0];
            const lastReadChapter = lastActivityProgress.split(' - ')[1];
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          // Caso 2: Un episodio: progress: '1', en inicio y último
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress;
            const lastReadChapter = lastActivityProgress;
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          // Caso 3: progress: '1 - 6' en primera actividad y progress: '1' en última
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress.split(' - ')[0];
            const lastReadChapter = lastActivityProgress;
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          // Caso 4: progress: '1' en primera actividad y progress: '1 - 6' en última
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress;
            const lastReadChapter = lastActivityProgress.split(' - ')[1];
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
        }
        return null;
      });
      const sortedChaptersBySeries = ChaptersBySeries.sort((a, b) => b.readChapters - a.readChapters);
      if (sortedChaptersBySeries && Array.isArray(sortedChaptersBySeries)) {
        setSortedChapters(sortedChaptersBySeries);
      }
    }
  }, [list]);

  const [topReadChapters, setTopReadChapters] = useState([]);
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
      if (sortedChapters && sortedChapters.length > 0) {
        const rawTopWatchedMinutes = sortedChapters.slice(0, 5);

        const newTopWatchedMinutesPromises = rawTopWatchedMinutes.map(
          async (element) => {
            const alImage = element.image;
            const parts = alImage.split('/');
            const newPath = parts.slice(3).join('/');
            const newUrl = `${serverUrl}/api/al/sources/${newPath}`;
            const cloudinaryUrl = await downloadToCloudinary(
              newUrl,
              element.manga,
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

        setTopReadChapters(newTopWatchedMinutes);
      }
    };

    processImages();
  }, [sortedChapters]);

  return (
    <StoryCard key="8" id="8" color="yellow">
      <>
        <p className="story__main-copy">Your favorite manga this {year} was:</p>
        {Array.isArray(topReadChapters) && topReadChapters.length > 0
          ? (
            <>
              <picture className="story__image-main">
                <div
                  role="img"
                  aria-label={topReadChapters[0].manga}
                  style={{ backgroundImage: `url(${topReadChapters[0]?.image})` }}
                />
              </picture>
              <p className="story__text-highlight--longer">
                {topReadChapters[0].manga}
              </p>
              <p className="story__text-regular">{topReadChapters[0].readChapters} chapters</p>
            </>
          )
          : null}

      </>
    </StoryCard>
  );
};

export default MangaFav;
