import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { yearString } from '@/app/lib/constants/year';
import { newUser } from '../../../../../../redux/features/user';
import { getAnimeList } from '../../../../../lib/anilist';
import Spinner from '../../../../components/Spinner/Spinner';
import ActivityCard from '../ActivityCard/ActivityCard';
import './AnimeList.scss';

const ALAnimeList = ({ userId, checkFunc }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loadingAnimeList, setLoadingAnimeList] = useState('loading');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const year = yearString;

  useEffect(() => {
    const fetchAnimeList = async () => {
      try {
        const fetch = await getAnimeList(userId);
        const animeListWithIds = fetch.map((anime) => ({
          ...anime,
          id: uuidv4(),
        }));
        setAnimeList(animeListWithIds);
      } catch (error) {
        // Log error but don't throw - this prevents breaking the component tree
        console.error('Error fetching anime list:', error);
        // Set loading state to 'error' to show error UI
        setLoadingAnimeList('error');
        checkFunc(false);
      }
    };
    if (userId) {
      fetchAnimeList();
    }
  }, [userId, checkFunc]);

  useEffect(() => {
    if (!Array.isArray(animeList) || animeList.length < 0) {
      setLoadingAnimeList('loading');
      checkFunc(false);
    }
    if (animeList.length > 0) {
      setLoadingAnimeList('loaded');
      checkFunc(true);
    }
  }, [animeList, checkFunc]);

  useEffect(() => {
    if (loadingAnimeList === 'loaded' && user) {
      const currentLists = Array.isArray(user.lists) ? user.lists : [];
      const existingListIndex = currentLists.findIndex((list) => list.year === year);
      const currentAnimeList =
        existingListIndex !== -1 ? currentLists[existingListIndex].animeList : null;

      // Check if update is needed (simple reference check might not be enough if objects are recreated,
      // but let's try to avoid dispatch if the length and first item ID are the same as a proxy for "same list"
      // or just check if we just did this).
      // Better: check if the list in redux is already the same as the local state list.

      if (currentAnimeList !== animeList) {
        const updatedLists = [...currentLists];

        if (existingListIndex !== -1) {
          updatedLists[existingListIndex] = {
            ...updatedLists[existingListIndex],
            animeList,
          };
        } else {
          updatedLists.push({
            year,
            animeList,
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
  }, [loadingAnimeList, animeList, dispatch, user, year]);

  return (
    <section className="anime-list">
      <h2>Anime List Activity</h2>
      {loadingAnimeList === 'loading' ? (
        <Spinner />
      ) : loadingAnimeList === 'error' ? (
        <div className="anime-list__error">
          <p>⚠️ Unable to load anime list. Please try again later.</p>
        </div>
      ) : (
        <article className="anime-list__list-container">
          {animeList.map((e) => (
            <ActivityCard activity={e} key={e.id} />
          ))}
        </article>
      )}
    </section>
  );
};

export default ALAnimeList;
