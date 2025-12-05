import PopularSliderClient from './PopularSliderClient';
import { getPopularAnime, getPopularManga } from '../../../../lib/anilist';

const fetchPopularAnime = async () => {
  try {
    const fetch = await getPopularAnime();
    return fetch;
  } catch (error) {
    console.error('Error fetching popular anime data:', error);
    return { Page: { media: [] } };
  }
};

const fetchPopularManga = async () => {
  try {
    const fetch = await getPopularManga();
    return fetch;
  } catch (error) {
    console.error('Error fetching popular manga data:', error);
    return { Page: { media: [] } };
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
