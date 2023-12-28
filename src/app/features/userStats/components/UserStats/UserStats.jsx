import { useState, useEffect } from 'react';
import MangaStatsDisplay from '../mangaStats/components/StatsDisplay/StatsDisplay';
import AnimeStatsDisplay from '../animeStats/components/StatsDisplay/StatsDisplay';

const UserStats = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);
  const [anime, setAnime] = useState(null);
  const [manga, setManga] = useState(null);

  useEffect(() => {
    if (lists && Array.isArray(lists)) {
      const currentYearList = lists.find(
        (element) => Number(element.year) === year,
      );
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
      {(anime && anime.length > 0) || (manga && manga.length > 0)
        ? (
          <>
            <p>
              <b>🚀 Save & Share Your Faves!</b>
            </p>
            <p>🔒 Can&apos;t share directly? No stress!</p>
            <p>
              💻 PC: Click &quot;Save&quot;, new tab opens,
              right-click, &quot;Save image as...&quot;.
            </p>
            <p>
              📱 Android: Press &quot;Save&quot;, tap and hold on the new image, select
              &quot;Download&quot;.
            </p>
            <p>
              🍏 iPhone/iPad: Hit &quot;Save&quot;, touch and hold the image, then &quot;Add to
              Photos&quot;.
            </p>
          </>
        ) : (
          <p>
            <b>You didn&apos;t register any list for us.
              Please create your user again and check at least one list to analyze.
            </b>
          </p>
        )}
      {anime && anime.length > 0
        ? <AnimeStatsDisplay lists={lists} /> : null}

      {manga && manga.length > 0 ? <MangaStatsDisplay lists={lists} /> : null}
    </section>
  );
};
export default UserStats;
