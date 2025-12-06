'use client';

import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import PopularAnimeCard from '../PopularAnimeCard/PopularAnimeCard';
import './PopularSlider.scss';

const PopularSliderClient = ({ popularAnime, popularManga }) => {
  const t = useTranslations('home');
  const animeSliderRef = useRef(null);
  const mangaSliderRef = useRef(null);

  const [animeScroll, setAnimeScroll] = useState({ now: 0, max: 0 });
  const [mangaScroll, setMangaScroll] = useState({ now: 0, max: 0 });

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

  useEffect(() => {
    const setupSlider = (slider, setScroll) => {
      if (!slider) return undefined;

      const updateScroll = () => {
        setScroll({
          now: slider.scrollLeft,
          max: slider.scrollWidth - slider.clientWidth,
        });
      };

      slider.addEventListener('scroll', updateScroll);
      const resizeObserver = new ResizeObserver(updateScroll);
      resizeObserver.observe(slider);

      updateScroll();

      return () => {
        slider.removeEventListener('scroll', updateScroll);
        resizeObserver.disconnect();
      };
    };

    const cleanupAnime = setupSlider(animeSliderRef.current, setAnimeScroll);
    const cleanupManga = setupSlider(mangaSliderRef.current, setMangaScroll);

    return () => {
      if (cleanupAnime) cleanupAnime();
      if (cleanupManga) cleanupManga();
    };
  }, [popularAnime, popularManga]);

  return (
    <section className="slider">
      <h2>{t('popularAnimeTitle')}</h2>
      <div
        className="slider__container"
        tabIndex="0"
        ref={animeSliderRef}
        role="slider"
        aria-label={t('popularAnimeLabel')}
        aria-valuemin={0}
        aria-valuemax={animeScroll.max}
        aria-valuenow={animeScroll.now}
      >
        {popularAnime?.map((anime, index) => (
          <PopularAnimeCard key={anime.id} item={anime} rank={index + 1} type="anime" />
        ))}
      </div>
      <h2>{t('popularMangaTitle')}</h2>
      <div
        className="slider__container"
        tabIndex="0"
        ref={mangaSliderRef}
        role="slider"
        aria-label={t('popularMangaLabel')}
        aria-valuemin={0}
        aria-valuemax={mangaScroll.max}
        aria-valuenow={mangaScroll.now}
      >
        {popularManga?.map((manga, index) => (
          <PopularAnimeCard key={manga.id} item={manga} rank={index + 1} type="manga" />
        ))}
      </div>
    </section>
  );
};

export default PopularSliderClient;
