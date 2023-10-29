/* eslint-disable react-hooks/exhaustive-deps */

import { useState, useEffect } from 'react';
import ActivityCard from '../../../anilist/components/ActivityCard/ActivityCard';
import './UserLists.scss';

const UserLists = ({ lists }) => {
  console.log('🚀 ~ file: UserLists.jsx:8 ~ UserLists ~ lists:', lists);
  const year = Number(process.env.NEXT_PUBLIC_YEAR);
  // console.log('🚀 ~ file: UserLists.jsx:9 ~ UserLists ~ year:', year);

  const [anime, setAnime] = useState(null);
  // console.log('🚀 ~ file: UserLists.jsx:12 ~ UserLists ~ anime:', anime);
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
    <section className="user-lists">
      <h2>{`Activity from ${year}`}</h2>

      {anime
        ? (
          <>
            <p>Anime Activity</p>
            <section className="user-lists__list">
              {anime.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
            </section>
          </>
        )
        : null}

      {manga
        ? (
          <>
            <p>Manga Activity</p>
            <section className="user-lists__list">
              {manga.map((activity) => <ActivityCard key={activity.id} activity={activity} />)}
            </section>
          </>
        )
        : null}
    </section>
  );
};

export default UserLists;
