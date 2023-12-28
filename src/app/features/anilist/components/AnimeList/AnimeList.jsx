import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { newUser } from '../../../../../redux/features/user';
import { getAnimeList } from '../../services/anilist';
import ActivityCard from '../ActivityCard/ActivityCard';
import './AnimeList.scss';
import Spinner from '../../../../components/Spinner/Spinner';

const ALAnimeList = ({ userId }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loadingAnimeList, setLoadingAnimeList] = useState('loading');
  const { user } = useSelector((state) => state.UserReducer);
  const dispatch = useDispatch();

  const year = process.env.NEXT_PUBLIC_YEAR;

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
      const currentLists = user.lists || [];

      const updatedLists = [...currentLists];

      const existingListIndex = updatedLists.findIndex(
        (list) => list.year === year,
      );

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
        }),
      );
    }
  }, [loadingAnimeList, animeList]);

  return (
    <section className="anime-list">
      <h2>Anime List Activity</h2>
      {loadingAnimeList === 'loading' ? (
        <Spinner />
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
