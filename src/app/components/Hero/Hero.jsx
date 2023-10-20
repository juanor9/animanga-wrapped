import './Hero.scss';
import { getPopularAnime, getPopularManga } from '../../features/anilist/services/anilist';
import PopularItemCard from '../PopularAnimeCard/PopularItemCard';
import LoginSignup from '../../features/user/components/LoginSignup/LoginSignup';

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

const Hero = () => (
  <section className="hero">
    <article className="hero__copy">
      <h1 className="hero__header">Your Anime and Manga Year Wrapped</h1>
      <p>
        Get relevant statiscics on your watched anime or read manga.
        Share with everyone what is important for you
      </p>
      <h2>Popular Anime This Year</h2>
      <div className="hero__popular-anime">
        {popularAnime
          ? popularAnime.map((anime) => <PopularItemCard key={anime.id} item={anime} />)
          : null}
      </div>
      <h2>Popular Manga This Year</h2>
      <div className="hero__popular-anime">
        {popularManga
          ? popularManga.map((manga) => <PopularItemCard key={manga.id} item={manga} />)
          : null}
      </div>

    </article>
    <article className="hero__forms">
      <LoginSignup />
    </article>
  </section>
);

export default Hero;
