import { getPopularAnime, getPopularManga } from '../../../lib/anilist';
import PopularSliderClient from './PopularSliderClient';

const fetchPopularAnime = async () => {
  try {
    const fetch = await getPopularAnime();
    return fetch;
  } catch (error) {
    throw new Error(error);
  }
};

const fetchPopularManga = async () => {
  try {
    const fetch = await getPopularManga();
    return fetch;
  } catch (error) {
    return error;
  }
};

const PopularSlider = async () => {
  const popularAnimeData = await fetchPopularAnime();
  const popularAnime = popularAnimeData.Page.media;
  const popularMangaData = await fetchPopularManga();
  const popularManga = popularMangaData.Page.media;

  return <PopularSliderClient popularAnime={popularAnime} popularManga={popularManga} />;
};

export default PopularSlider;
