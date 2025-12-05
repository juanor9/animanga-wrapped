import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yearString } from '@/app/lib/constants/year';
import { newUser } from '../../../../../../redux/features/user';
import { getMangaList } from '../../../../../lib/anilist';
import Spinner from '../../../../components/Spinner/Spinner';
import ActivityCard from '../ActivityCard/ActivityCard';
import './MangaList.scss';

const ALMangaList = ({ userId, checkFunc }) => {
  const [mangaList, setMangaList] = useState([]);
  const [loadingMangaList, setLoadingMangaList] = useState('loading');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();
  const year = yearString;

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
      checkFunc(false);
    }
    if (mangaList.length > 0) {
      setLoadingMangaList('loaded');
      checkFunc(true);
    }
  }, [mangaList, checkFunc]);

  useEffect(() => {
    if (loadingMangaList === 'loaded' && user) {
      // Verificar si user.lists existe y es un array, si no, usar un array vacío
      const currentLists = Array.isArray(user.lists) ? user.lists : [];
      const existingListIndex = currentLists.findIndex((list) => list.year === year);
      const currentMangaList =
        existingListIndex !== -1 ? currentLists[existingListIndex].mangaList : null;

      if (currentMangaList !== mangaList) {
        // Copia de la lista actual
        const updatedLists = [...currentLists];

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

        dispatch(
          newUser({
            ...user,
            lists: updatedLists,
          })
        );
      }
    }
  }, [loadingMangaList, mangaList, dispatch, user, year]);

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
