import { useEffect, useState } from "react";
import { getAnimeList } from "../../services/anilist";
import ActivityCard from "../ActivityCard/ActivityCard";
import "./AnimeList.scss";

const ALAnimeList = ({ userId }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loadingAnimeList, setLoadingAnimeList] = useState("loading");

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
      setLoadingAnimeList("loading");
    }
    if (animeList.length > 0) {
      setLoadingAnimeList("loaded");
    }
  }, [animeList]);

  return (
    <section className="anime-list">
      <h2>Anime List Activity</h2>
      {loadingAnimeList === "loading" ? (
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
