/* eslint-disable no-unused-vars */
/* eslint-disable react/no-array-index-key */

'use client';

import { useState, useEffect } from 'react';
import { fetchMangaList } from '../../services/mal';
import ActivityCard from '../ActivityCard/ActivityCard';
import './MangaList.scss';

const MangaList = () => {
  const [mangaList, setMangaList] = useState([]);
  const [mangaListDef, setMangaListDef] = useState([]);
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
      const fetchMangaListData = async () => {
        const url = `/api/mal/v2/users/${userName}/mangalist?fields=id,title,genres,start_date,updated_at,media_type,my_list_status,num_episodes,my_list_status,average_episode_duration,studios`;
        const callAnimeList = await fetchMangaList(accessToken, url);
        return callAnimeList;
      };

      (async () => {
        try {
          const manList = await fetchMangaListData();
          if (manList.paging.next) {
            const nextPageUrl = mangaList.paging.next;
            const parts = nextPageUrl.split('?');
            const queryParams = parts[1];
            const nextUrl = `/api/mal/v2/users/${userName}/mangalist?${queryParams}`;
            const nextMangaList = await fetchMangaList(accessToken, nextUrl);
            setMangaList((prevMangaList) => [...prevMangaList, ...nextMangaList.data]);
          } else {
            setMangaList(manList.data);
          }
        } catch (error) {
          console.error('Error fetching manga list:', error);
        }
      })();
    }
  }, [accessToken, userName]);

  useEffect(() => {
    if (mangaList.length) {
      const filteredManga = mangaList.filter((manga) => {
        const updatedAtYear = new Date(manga.node.my_list_status.updated_at).getFullYear();
        return updatedAtYear === currentYear;
      });
      setMangaListDef(filteredManga);
    }
  }, [mangaList, currentYear]);

  return (
    <section className="manga-list">
      <h3>Manga List</h3>
      <div className="manga-list__list-container">
        {mangaListDef.map((item, index) => (
          <ActivityCard key={index} anime={item.node} />
        ))}
      </div>

    </section>
  );
};

export default MangaList;
