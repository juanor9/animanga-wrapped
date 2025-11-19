import { useEffect, useState } from 'react';
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
import Carrusel from '../../../../../../components/Carrusel/Carrusel';
import AnimeFav from '../AnimeFav/AnimeFav';
import AnimeFormat from '../AnimeFormat/AnimeFormat';
import AnimeGenre from '../AnimeGenre/AnimeGenre';
import AnimeSeries from '../AnimeSeries/AnimeSeries';
import AnimeWatchedHours from '../AnimeWatchedHours/AnimeWatchedHours';
import LauchYear from '../LauchYear/LauchYear';

const AnimeStatsDisplay = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);

  const [anime, setAnime] = useState(null);

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
        const { animeList } = currentYearList;
        const watchedAnime = animeList.filter(
          (w) =>
            w.status === 'watched episode' ||
            w.status === 'completed' ||
            w.status === 'rewatched episode' ||
            w.status === 'rewatched'
        );
        if (animeList) {
          setAnime(watchedAnime);
        }
      }
    }
  }, [lists, year]);

  return (
    <section>
      <h3>Anime stats</h3>
      <Carrusel>
        <AnimeWatchedHours list={anime} />
        <AnimeFav list={anime} />
        <AnimeSeries list={anime} />
        <AnimeFormat list={anime} />
        <LauchYear list={anime} />
        <AnimeGenre list={anime} />
      </Carrusel>
    </section>
  );
};

export default AnimeStatsDisplay;
