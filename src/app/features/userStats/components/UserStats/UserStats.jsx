import { useState, useEffect } from 'react';
import MangaStatsDisplay from '../mangaStats/components/StatsDisplay/StatsDisplay';
import AnimeStatsDisplay from '../animeStats/components/StatsDisplay/StatsDisplay';

const UserStats = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);
  const [anime, setAnime] = useState(null);
  const [manga, setManga] = useState(null);

  useEffect(() => {
    if (lists && Array.isArray(lists)) {
      const currentYearList = lists.find((element) => Number(element.year) === year);
      const { animeList, mangaList } = currentYearList;
      if (animeList) {
        setAnime(animeList);
      }
      if (mangaList) {
        setManga(mangaList);
      }
    }
  }, [lists]);
  return (
    <section>
      <h2>Stats for {year}</h2>
      {anime && anime.length > 0
        ? <AnimeStatsDisplay lists={lists} />
        : null}

      {manga && manga.length > 0
        ? (
          <MangaStatsDisplay lists={lists} />
        )
        : null}
    </section>
  );
};
export default UserStats;
