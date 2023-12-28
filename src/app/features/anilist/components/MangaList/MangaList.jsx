import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { newUser } from '../../../../../redux/features/user';
import { getMangaList } from '../../services/anilist';
import ActivityCard from '../ActivityCard/ActivityCard';
import './MangaList.scss';
import Spinner from '../../../../components/Spinner/Spinner';

const ALMangaList = ({ userId }) => {
  const [mangaList, setMangaList] = useState([]);
  const [loadingMangaList, setLoadingMangaList] = useState('loading');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const year = process.env.NEXT_PUBLIC_YEAR;

  useEffect(() => {
    const fetchMangaList = async () => {
      try {
        const fetch = await getMangaList(userId);
        const mangaListWithIds = fetch.map((manga) => ({
          ...manga,
          id: uuidv4(),
        }));
        setMangaList(mangaListWithIds);
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

  useEffect(() => {
    if (loadingMangaList === 'loaded') {
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
          mangaList,
        };
      } else {
        // Si no existe, añadimos una nueva
        updatedLists.push({
          year,
          mangaList,
        });
      }

      dispatch(newUser({
        ...user,
        lists: updatedLists,
      }));
    }
  }, [loadingMangaList, mangaList]);

  return (
    <section className="anime-list">
      <h2>Manga List Activity</h2>
      {loadingMangaList === 'loading' ? (
        <Spinner />
      ) : (
        <article className="anime-list__list-container">
          {mangaList.map((e) => (
            <ActivityCard activity={e} key={e.id} />
          ))}
        </article>
      )}
    </section>
  );
};

export default ALMangaList;
