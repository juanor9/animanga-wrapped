import { useState, useEffect } from 'react';
import MangaChapters from '../MangaChapters/MangaChapters';
import MangaFormat from '../MangaFormat/MangaFormat';
import ReleaseYear from '../ReleaseYear/ReleaseYear';
import MangaGenre from '../MangaGenre/MangaGenre';
import Mangaka from '../Mangaka/Mangaka';

const MangaStatsDisplay = ({ lists }) => {
  const year = Number(process.env.NEXT_PUBLIC_YEAR);

  const [manga, setManga] = useState(null);

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
      <div id="watched-hours" className="story__container">
        <MangaChapters list={manga} />
        <MangaFormat list={manga} />
        <ReleaseYear list={manga} />
        <MangaGenre list={manga} />
        <Mangaka list={manga} />
      </div>
    </section>
  );
};

export default MangaStatsDisplay;
