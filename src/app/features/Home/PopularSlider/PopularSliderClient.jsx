'use client';

import { useRef, useEffect } from 'react';
import PopularItemCard from '../PopularAnimeCard/PopularItemCard';
import './PopularSlider.scss';

const PopularSliderClient = ({ popularAnime, popularManga }) => {
  const animeSliderRef = useRef(null);
  const mangaSliderRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event, slider) => {
      if (event.key === 'ArrowRight') {
        slider.scrollBy({ left: 300, behavior: 'smooth' });
      } else if (event.key === 'ArrowLeft') {
        slider.scrollBy({ left: -300, behavior: 'smooth' });
      }
    };

    const animeSlider = animeSliderRef.current;
    const mangaSlider = mangaSliderRef.current;

    const animeKeyDownListener = (event) => handleKeyDown(event, animeSlider);
    const mangaKeyDownListener = (event) => handleKeyDown(event, mangaSlider);

    if (animeSlider) {
      animeSlider.addEventListener('keydown', animeKeyDownListener);
    }
    if (mangaSlider) {
      mangaSlider.addEventListener('keydown', mangaKeyDownListener);
    }

    return () => {
      if (animeSlider) {
        animeSlider.removeEventListener('keydown', animeKeyDownListener);
      }
      if (mangaSlider) {
        mangaSlider.removeEventListener('keydown', mangaKeyDownListener);
      }
    };
  }, []);

  return (
    <section className="slider">
      <h2>Popular Anime This Year</h2>
      <div className="slider__container" tabIndex="0" ref={animeSliderRef}>
        {popularAnime
          ? popularAnime.map((anime) => <PopularItemCard key={anime.id} item={anime} />)
          : null}
      </div>
      <h2>Popular Manga This Year</h2>
      <div className="slider__container" tabIndex="0" ref={mangaSliderRef}>
        {popularManga
          ? popularManga.map((manga) => <PopularItemCard key={manga.id} item={manga} />)
          : null}
      </div>
    </section>
  );
};

export default PopularSliderClient;
