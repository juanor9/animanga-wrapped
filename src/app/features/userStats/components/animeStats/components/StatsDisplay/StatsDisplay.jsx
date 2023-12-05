import { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  Title,
  Legend,
  ArcElement,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import AnimeWatchedHours from '../AnimeWatchedHours/AnimeWatchedHours';
import AnimeFormat from '../AnimeFormat/AnimeFormat';
import LauchYear from '../LauchYear/LauchYear';
import AnimeGenre from '../AnimeGenre/AnimeGenre';

const AnimeStatsDisplay = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);

  const [anime, setAnime] = useState(null);

  ChartJS.register(
    Title,
    Legend,
    ArcElement,
    ChartDataLabels,
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
      <div id="watched-hours" className="story__container">
        <AnimeWatchedHours list={anime} />
        <AnimeFormat list={anime} />
        <LauchYear list={anime} />
        <AnimeGenre list={anime} />
      </div>
    </section>
  );
};

export default AnimeStatsDisplay;
