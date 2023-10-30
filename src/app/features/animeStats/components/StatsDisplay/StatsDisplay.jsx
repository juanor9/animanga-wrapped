/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import AnimeWatchedHours from '../AnimeWatchedHours/AnimeWatchedHours';
import AnimeFormat from '../AnimeFormat/AnimeFormat';
import LauchYear from '../LauchYear/LauchYear';
import AnimeGenre from '../AnimeGenre/AnimeGenre';

const StatsDisplay = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);

  const [anime, setAnime] = useState(null);
  const [manga, setManga] = useState(null);

  useEffect(() => {
    if (lists && Array.isArray(lists)) {
      const currentYearList = lists.find((element) => Number(element.year) === year);
      const { animeList, mangaList } = currentYearList;
      const watchedAnime = animeList.filter((w) => w.status === 'watched episode'
      || w.status === 'completed'
      || w.status === 'rewatched episode'
      || w.status === 'rewatched');
      if (animeList) {
        setAnime(watchedAnime);
      }
      if (mangaList) {
        setManga(mangaList);
      }
    }
  }, [lists]);

  return (
    <section>
      <h2>{`Stats for ${year}`}</h2>
      <h3>Anime stats</h3>
      <AnimeWatchedHours list={anime} />
      <AnimeFormat list={anime} />
      <LauchYear list={anime} />
      <AnimeGenre list={anime} />
    </section>
  );
};

export default StatsDisplay;
