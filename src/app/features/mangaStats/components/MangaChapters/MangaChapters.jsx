/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import ChaptersPerSeries from './ChaptersPerSeries/ChaptersPerSeries';

const MangaChapters = ({ list }) => {
  const [sortedChapters, setSortedChapters] = useState(null);
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          status: activity.status,
          progress: activity.progress,
          manga: activity.media.title.userPreferred,
          chapters: activity.media.chapters,
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
            return { manga: key, readChapters };
          }
          // Caso 2: Un episodio: progress: '1', como está completo, se resta el número inicial de capítulos al número total de capítulos para tener los capítulos vistos durante el año.
          if (firstActivityProgress && !firstActivityProgress.includes('-')) {
            const firstReadChapter = firstActivity.progress;
            const fullChapters = firstActivity.chapters;
            const readChapters = Number(fullChapters) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters };
          }
          // Caso 3: visto de una sentada: status: 'completed', progress: null
          if (firstActivityProgress === null && firstActivity.status === 'completed') {
            const { chapters } = firstActivity;
            return { manga: key, readChapters: chapters };
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
            return { manga: key, readChapters };
          }
          // Caso 2: Un episodio: progress: '1', en inicio y último
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress;
            const lastReadChapter = lastActivityProgress;
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters };
          }
          // Caso 3: progress: '1 - 6' en primera actividad y progress: '1' en última
          if (firstActivityProgress && firstActivityProgress.includes('-') && lastActivityProgress && !lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress.split(' - ')[0];
            const lastReadChapter = lastActivityProgress;
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { manga: key, readChapters };
          }
          // Caso 4: progress: '1' en primera actividad y progress: '1 - 6' en última
          if (firstActivityProgress && !firstActivityProgress.includes('-') && lastActivityProgress && lastActivityProgress.includes('-')) {
            const firstReadChapter = firstActivityProgress;
            const lastReadChapter = lastActivityProgress.split(' - ')[1];
            const readChapters = Number(lastReadChapter) - Number(firstReadChapter) + 1;
            return { anime: key, readChapters };
          }
        }
        return null;
      });
      // console.log('🚀 ~ file: MangaChapters.jsx:107 ~ ChaptersBySeries ~ ChaptersBySeries:', ChaptersBySeries);
      const sortedChaptersBySeries = ChaptersBySeries.sort((a, b) => b.readChapters - a.readChapters);
      if (sortedChaptersBySeries && Array.isArray(sortedChaptersBySeries)) {
        setSortedChapters(sortedChaptersBySeries);
      }
    }
  }, [list]);
  const [totalChapters, setTotalchapters] = useState(0);
  useEffect(() => {
    if (sortedChapters) {
      const totalChaptersCalc = sortedChapters.reduce((acc, curr) => acc + curr.readChapters, 0);
      setTotalchapters(totalChaptersCalc);
    }
  }, [sortedChapters]);
  return (
    <section>
      <p>Total of chapters read: {totalChapters} chapters.</p>
      <ChaptersPerSeries list={sortedChapters} />
    </section>
  );
};

export default MangaChapters;
