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
import AnimeWatchedHours from '../AnimeWatchedHours/AnimeWatchedHours';
import AnimeFormat from '../AnimeFormat/AnimeFormat';
import LauchYear from '../LauchYear/LauchYear';
import AnimeGenre from '../AnimeGenre/AnimeGenre';
import Carrusel from '../../../../../../components/Carrusel/Carrusel';
import AnimeFav from '../AnimeFav/AnimeFav';
import AnimeSeries from '../AnimeSeries/AnimeSeries';

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
    BarElement,
  );

  useEffect(() => {
    if (lists && Array.isArray(lists)) {
      const currentYearList = lists.find((element) => Number(element.year) === year);
      const { animeList } = currentYearList;
      const watchedAnime = animeList.filter((w) => w.status === 'watched episode'
      || w.status === 'completed'
      || w.status === 'rewatched episode'
      || w.status === 'rewatched');
      if (animeList) {
        setAnime(watchedAnime);
      }
    }
  }, [lists]);

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
