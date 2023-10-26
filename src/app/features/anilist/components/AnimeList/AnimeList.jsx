/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newUser } from '../../../../../redux/features/user';
import { getAnimeList } from '../../services/anilist';
import ActivityCard from '../ActivityCard/ActivityCard';
import './AnimeList.scss';

const ALAnimeList = ({ userId }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loadingAnimeList, setLoadingAnimeList] = useState('loading');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const year = process.env.NEXT_PUBLIC_YEAR;
  // console.log('🚀 ~ file: AnimeList.jsx:16 ~ ALAnimeList ~ year:', year);

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const fetch = await getAnimeList(userId);
        setAnimeList(fetch);
      } catch (error) {
        throw new Error(error);
      }
    };
    if (userId) {
      fetchAnimeList();
    }
  }, [userId]);

  useEffect(() => {
    if (!Array.isArray(animeList) || animeList.length < 0) {
      setLoadingAnimeList('loading');
    }
    if (animeList.length > 0) {
      setLoadingAnimeList('loaded');
    }
  }, [animeList]);

  useEffect(() => {
    if (loadingAnimeList === 'loaded') {
      // Verificar si user.lists existe y es un array, si no, usar un array vacío
      const currentLists = user.lists || [];

      // Copia de la lista actual
      const updatedLists = [...currentLists];

      // Buscar si ya existe una lista para ese año
      const existingListIndex = updatedLists.findIndex((list) => list.year === year);

      if (existingListIndex !== -1) {
        // Si existe, actualizamos
        updatedLists[existingListIndex] = {
          ...updatedLists[existingListIndex],
          animeList,
        };
      } else {
        // Si no existe, añadimos una nueva
        updatedLists.push({
          year,
          animeList,
        });
      }

      dispatch(newUser({
        ...user,
        lists: updatedLists,
      }));
    }
  }, [loadingAnimeList, animeList]);

  return (
    <section className="anime-list">
      <h2>Anime List Activity</h2>
      {loadingAnimeList === 'loading' ? (
        <div className="anime-list__loading">Cargando...</div>
      ) : (
        <article className="anime-list__list-container">
          {animeList.map((e, index) => (
            <ActivityCard activity={e} key={index} />
          ))}
        </article>
      )}
    </section>
  );
};

export default ALAnimeList;
