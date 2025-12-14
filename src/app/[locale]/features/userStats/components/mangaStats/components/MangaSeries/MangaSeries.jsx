/* eslint-disable max-len */
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yearString } from '@/app/lib/constants/year';
import StoryCard from '../../../../../../components/Stories/Stories';
import uploadImage from '../../../../services/upload';

const serverUrl =
  typeof window !== 'undefined'
    ? window.location.origin
    : process.env.NEXT_PUBLIC_REACT_APP_BASE_URL || 'http://localhost:3000';

const MangaSeries = ({ list }) => {
  const [sortedChapters, setSortedChapters] = useState(null);
  const dispatch = useDispatch();
  const { listUsername } = useSelector((state) => state.UserReducer.user);

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => ({
        status: activity.status,
        progress: activity.progress,
        manga: activity.media.title.userPreferred,
        chapters: activity.media.chapters,
        image: activity.media.coverImage.extraLarge,
      }));
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

          if (firstActivityProgress && firstActivityProgress.includes('-')) {
            const firstReadChapter = firstActivity.progress.split(' - ')[0];
            const fullChapters = firstActivity.chapters;
            const readChapters = Number(fullChapters) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstReadChapter = firstActivity.progress;
            const fullChapters = firstActivity.chapters;
            const readChapters = Number(fullChapters) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
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

          if (
            firstActivityProgress &&
            firstActivityProgress.includes('-') &&
            lastActivityProgress &&
            lastActivityProgress.includes('-')
          ) {
            const firstReadChapter = firstActivityProgress.split(' - ')[0];
            const lastReadChapter = lastActivityProgress.split(' - ')[1];
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          if (
            firstActivityProgress &&
            !firstActivityProgress.includes('-') &&
            lastActivityProgress &&
            !lastActivityProgress.includes('-')
          ) {
            const firstReadChapter = firstActivityProgress;
            const lastReadChapter = lastActivityProgress;
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          if (
            firstActivityProgress &&
            firstActivityProgress.includes('-') &&
            lastActivityProgress &&
            !lastActivityProgress.includes('-')
          ) {
            const firstReadChapter = firstActivityProgress.split(' - ')[0];
            const lastReadChapter = lastActivityProgress;
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
          if (
            firstActivityProgress &&
            !firstActivityProgress.includes('-') &&
            lastActivityProgress &&
            lastActivityProgress.includes('-')
          ) {
            const firstReadChapter = firstActivityProgress;
            const lastReadChapter = lastActivityProgress.split(' - ')[1];
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters, image: firstActivity.image };
          }
        }
        return null;
      });
      const sortedChaptersBySeries = ChaptersBySeries.filter(Boolean).sort(
        (a, b) => b.readChapters - a.readChapters
      );
      if (sortedChaptersBySeries && Array.isArray(sortedChaptersBySeries)) {
        setSortedChapters(sortedChaptersBySeries);
      }
    }
  }, [list]);

  const [topReadChapters, setTopReadChapters] = useState([]);
  const downloadToCloudinary = useCallback(
    async (url, filename) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const blob = await response.blob();
        const file = new File([blob], 'manga-series-image.png', {
          type: blob.type,
        });

        const uploadedImageResponse = await dispatch(
          uploadImage({ file, type: 'stats', listUsername, filename })
        );

        if (uploadedImageResponse.type === 'uploads/uploadImage/fulfilled') {
          const cloudinaryUrl = uploadedImageResponse.payload.url;
          return cloudinaryUrl;
        }
        throw new Error('Image upload failed');
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`Error downloading or uploading image for ${filename}:`, error);
        return null; // Return null instead of throwing to prevent app crash
      }
    },
    [dispatch, listUsername]
  );

  useEffect(() => {
    const processImages = async () => {
      if (sortedChapters && sortedChapters.length > 0) {
        // Only process top 5 to save resources, matching render logic
        const rawTopWatchedMinutes = sortedChapters.slice(0, 5);

        const newTopWatchedMinutesPromises = rawTopWatchedMinutes.map(async (element) => {
          const alImage = element.image;
          // Construct proxy URL safely
          try {
            if (!alImage) return element;
            const parts = alImage.split('/');
            const newPath = parts.slice(3).join('/');
            const newUrl = `${serverUrl}/api/al/sources/${newPath}`;
            const cloudinaryUrl = await downloadToCloudinary(newUrl, element.manga);

            return {
              ...element,
              image: cloudinaryUrl || element.image, // Fallback to original image if upload fails
            };
          } catch (e) {
            console.error('Error constructing image URL', e);
            return element;
          }
        });

        const newTopWatchedMinutes = await Promise.all(newTopWatchedMinutesPromises);
        setTopReadChapters(newTopWatchedMinutes);
      }
    };

    processImages();
  }, [sortedChapters, downloadToCloudinary]);

  return (
    <StoryCard key="9" id="9" color="orange">
      <>
        <p className="story__main-copy">Your main series for {yearString}</p>
        <ul className="story__list-container">
          {Array.isArray(topReadChapters) && topReadChapters.length > 0
            ? topReadChapters.slice(0, 5).map((item) => {
                let image = item.image;
                // Only try to inject cloudinary transformations if it is a cloudinary url
                if (image && image.includes('image/upload/')) {
                  const cloudinaryParams = 'ar_1:1,c_crop/ar_1:1,c_scale,w_300/';
                  const parts = image.split('image/upload/');
                  if (parts.length > 1) {
                    image = `${parts[0]}image/upload/${cloudinaryParams}${parts[1]}`;
                  }
                }

                return (
                  <li key={uuidv4()} className="story__list-item">
                    <picture className="story__list-image">
                      <div
                        role="img"
                        aria-label={item.manga}
                        style={{ backgroundImage: `url(${image})` }}
                      />
                    </picture>
                    <div className="story__list-text">
                      <p className="story__list-text--title">{item.manga}</p>
                      <p className="story__list-text--time">{item.readChapters} chapters</p>
                    </div>
                  </li>
                );
              })
            : null}
        </ul>
      </>
    </StoryCard>
  );
};

export default MangaSeries;
