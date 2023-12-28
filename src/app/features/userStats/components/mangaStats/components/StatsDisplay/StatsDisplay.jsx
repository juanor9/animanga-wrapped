import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  Title,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import MangaChapters from '../MangaChapters/MangaChapters';
import MangaFormat from '../MangaFormat/MangaFormat';
import ReleaseYear from '../ReleaseYear/ReleaseYear';
import MangaGenre from '../MangaGenre/MangaGenre';
import Mangaka from '../Mangaka/Mangaka';
import Carrusel from '../../../../../../components/Carrusel/Carrusel';
import MangaFav from '../MangaFav/MangaFav';
import MangaSeries from '../MangaSeries/MangaSeries';

const MangaStatsDisplay = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);

  const [manga, setManga] = useState(null);

  ChartJS.register(
    Title,
    Legend,
    ArcElement,
    ChartDataLabels,
    CategoryScale,
    LinearScale,
    BarElement,
  );

  useEffect(() => {
    if (lists && Array.isArray(lists)) {
      const currentYearList = lists.find((element) => Number(element.year) === year);
      const { mangaList } = currentYearList;
      const readManga = mangaList.filter((w) => w.status === 'read chapter'
      || w.status === 'completed'
      || w.status === 'reread chapter'
      || w.status === 'reread');
      if (mangaList) {
        setManga(readManga);
      }
    }
  }, [lists]);

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
