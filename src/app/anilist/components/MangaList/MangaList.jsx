/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { getMangaList } from '../../services/anilist';
import ActivityCard from '../ActivityCard/ActivityCard';
import './MangaList.scss';

const ALMangaList = ({ userId }) => {
  const [mangaList, setMangaList] = useState([]);
  const [loadingMangaList, setLoadingMangaList] = useState('loading');

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const fetch = await getMangaList(userId);
        setMangaList(fetch);
      } catch (error) {
        throw new Error(error);
      }
    };
    if (userId) {
      fetchMangaList();
    }
  }, [userId]);

  useEffect(() => {
    if (!Array.isArray(mangaList) || mangaList.length < 0) {
      setLoadingMangaList('loading');
    }
    if (mangaList.length > 0) {
      setLoadingMangaList('loaded');
    }
  }, [mangaList]);

  return (
    <section className="anime-list">
      <h2>Manga List Activity</h2>
      {loadingMangaList === 'loading' ? (
        <div className="anime-list__loading">Cargando...</div>
      ) : (
        <article className="anime-list__list-container">
          {mangaList.map((e, index) => (
            <ActivityCard activity={e} key={index} />
          ))}
        </article>
      )}
    </section>
  );
};

export default ALMangaList;
