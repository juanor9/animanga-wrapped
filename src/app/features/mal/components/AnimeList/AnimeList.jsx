/* eslint-disable react/no-array-index-key */
/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useState, useEffect } from 'react';
import { fetchAnimeList } from '../../services/mal';
import ActivityCard from '../ActivityCard/ActivityCard';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState(null);
  const [animeListDef, setAnimeListDef] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [malUser, setMalUser] = useState(null);
  const currentYear = new Date().getFullYear();

  // Efecto para traer la lista de anime
  if (typeof window !== 'undefined') {
    const windowAccessToken = window.localStorage.getItem('malToken');
    setAccessToken(windowAccessToken);
    const windowMalUser = JSON.parse(window.localStorage.getItem('malUser'));
    setMalUser(windowMalUser);
  }
  const [userName, setUserName] = useState(null);
  if (malUser) {
    const MalUserName = malUser.name;
    setUserName(MalUserName);
  }

  useEffect(() => {
    if (accessToken && userName) {
      const fetchAnimeListData = async () => {
        const url = `/api/mal/v2/users/${userName}/animelist?fields=id,title,genres,start_date,updated_at,media_type,my_list_status,num_episodes,my_list_status,average_episode_duration,studios`;
        const callAnimeList = await fetchAnimeList(accessToken, url);
        return callAnimeList;
      };
      (async () => {
        try {
          const aniList = await fetchAnimeListData();
          setAnimeList(animeList ? [...animeList, ...aniList.data] : aniList.data);
          if (aniList.paging.next) {
            const continueFetchAnimeListData = async () => {
              const nextPageUrl = aniList.paging.next;
              const parts = nextPageUrl.split('?');
              const queryParams = parts[1];
              const nextUrl = `/api/mal/v2/users/${userName}/animelist?${queryParams}`;
              const callAnimeList = await fetchAnimeList(accessToken, nextUrl);
              return callAnimeList;
            };
            const nextAniList = await continueFetchAnimeListData();
            setAnimeList(animeList ? [...animeList, ...nextAniList.data] : nextAniList.data);
          }
        } catch (error) {
          throw new Error(error);
        }
      })();
    }
  }, [accessToken, userName]);
  useEffect(() => {
    if (animeList) {
      const filteredAnimes = animeList.filter((anime) => {
        const updatedAtYear = new Date(anime.node.my_list_status.updated_at).getFullYear();
        return updatedAtYear === currentYear;
      });
      setAnimeListDef(filteredAnimes);
    }
  }, [animeList]);

  return (
    <section>
      <h3>Anime List</h3>
      {animeListDef
        ? animeListDef.map((item, index) => (
          <ActivityCard key={index} anime={item.node} />
        ))
        : null}
    </section>
  );
};
export default AnimeList;
