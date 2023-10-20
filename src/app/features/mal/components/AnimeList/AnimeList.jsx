/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

'use client';

import { useState, useEffect } from 'react';
import { fetchAnimeList } from '../../services/mal';
import ActivityCard from '../ActivityCard/ActivityCard';
import './AnimeList.scss';

const AnimeList = () => {
  const [animeList, setAnimeList] = useState([]);
  const [animeListDef, setAnimeListDef] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [malUser, setMalUser] = useState(null);
  const [userName, setUserName] = useState(null);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const windowAccessToken = window.localStorage.getItem('malToken');
      const windowMalUser = JSON.parse(window.localStorage.getItem('malUser'));
      setAccessToken(windowAccessToken);
      if (windowMalUser) {
        setMalUser(windowMalUser);
        setUserName(windowMalUser.name);
      }
    }
  }, []);

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
          if (aniList.paging.next) {
            const nextPageUrl = aniList.paging.next;
            const parts = nextPageUrl.split('?');
            const queryParams = parts[1];
            const nextUrl = `/api/mal/v2/users/${userName}/animelist?${queryParams}`;
            const nextAniList = await fetchAnimeList(accessToken, nextUrl);
            setAnimeList((prevAnimeList) => [...prevAnimeList, ...nextAniList.data]);
          } else {
            setAnimeList(aniList.data);
          }
        } catch (error) {
          console.error('Error fetching anime list:', error);
        }
      })();
    }
  }, [accessToken, userName]);

  useEffect(() => {
    if (animeList.length) {
      const filteredAnimes = animeList.filter((anime) => {
        const updatedAtYear = new Date(anime.node.my_list_status.updated_at).getFullYear();
        return updatedAtYear === currentYear;
      });
      setAnimeListDef(filteredAnimes);
    }
  }, [animeList, currentYear]);

  return (
    <section className="anime-list">
      <h3>Anime List</h3>
      <div className="anime-list__list-container">
        {animeListDef.map((item, index) => (
          <ActivityCard key={index} anime={item.node} />
        ))}
      </div>

    </section>
  );
};

export default AnimeList;
