import { getPopularAnime, getPopularManga } from '../../anilist/services/anilist';
import PopularItemCard from '../PopularAnimeCard/PopularItemCard';
import './PopularSlider.scss';

const fetchPopularAnime = async () => {
  try {
    const fetch = await getPopularAnime();
    return fetch;
  } catch (error) {
    throw new Error(error);
  }
};
const popularAnimeData = await fetchPopularAnime();
const popularAnime = popularAnimeData.Page.media;

const fetchPopularManga = async () => {
  try {
    const fetch = await getPopularManga();
    return fetch;
  } catch (error) {
    return error;
  }
};
const popularMangaData = await fetchPopularManga();
const popularManga = popularMangaData.Page.media;

const PopularSlider = () => (
  <section className="slider">
    <h2>Popular Anime This Year</h2>
    <div className="slider__container">
      {popularAnime
        ? popularAnime.map((anime) => <PopularItemCard key={anime.id} item={anime} />)
        : null}
    </div>
    <h2>Popular Manga This Year</h2>
    <div className="slider__container">
      {popularManga
        ? popularManga.map((manga) => <PopularItemCard key={manga.id} item={manga} />)
        : null}
    </div>
  </section>
);

export default PopularSlider;
