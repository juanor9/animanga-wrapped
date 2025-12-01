import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useEffect, useState } from 'react';
import { yearNumber } from '@/app/lib/constants/year';
import Carrusel from '../../../../../../components/Carrusel/Carrusel';
import MangaChapters from '../MangaChapters/MangaChapters';
import MangaFav from '../MangaFav/MangaFav';
import MangaFormat from '../MangaFormat/MangaFormat';
import MangaGenre from '../MangaGenre/MangaGenre';
import Mangaka from '../Mangaka/Mangaka';
import MangaSeries from '../MangaSeries/MangaSeries';
import ReleaseYear from '../ReleaseYear/ReleaseYear';

const MangaStatsDisplay = ({ lists }) => {
  const year = yearNumber;

  const [manga, setManga] = useState(null);

  ChartJS.register(
    Title,
    Legend,
    ArcElement,
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement
  );

  useEffect(() => {
    if (lists && Array.isArray(lists)) {
      const currentYearList = lists.find((element) => Number(element.year) === year);
      if (currentYearList) {
        const { mangaList } = currentYearList;
        const readManga = mangaList.filter(
          (w) =>
            w.status === 'read chapter' ||
            w.status === 'completed' ||
            w.status === 'reread chapter' ||
            w.status === 'reread'
        );
        if (mangaList) {
          setManga(readManga);
        }
      }
    }
  }, [lists, year]);

  return (
    <section>
      <h3>Manga stats</h3>
      <Carrusel>
        <MangaChapters list={manga} />
        <MangaFav list={manga} />
        <MangaSeries list={manga} />
        <MangaFormat list={manga} />
        <ReleaseYear list={manga} />
        <MangaGenre list={manga} />
        <Mangaka list={manga} />
      </Carrusel>
    </section>
  );
};

export default MangaStatsDisplay;
