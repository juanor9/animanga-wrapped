'use client';

import { useEffect, useRef } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn } from '../../utils/animations';
import './Chapter2.scss';

const S07_GenresCard = ({ topGenres = [] }) => {
  const shareRef = useRef(null);
  const cardRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    scaleIn(cardRef.current, { delay: 0.3 });
    fadeIn(ctaRef.current, { delay: 1.2 });
  }, []);

  return (
    <SlideBase
      background="#e8e2d5"
      className="chapter2-slide with-diagonal-stripes"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <div ref={cardRef} className="genres-card">
          <h3 className="genres-card__title" style={{ color: '#111' }}>
            Mis Géneros 2025
          </h3>
          <ul className="genres-card__list">
            {topGenres.slice(0, 5).map((genre, index) => (
              <li key={genre.genre} className="genres-card__item" style={{ color: '#111' }}>
                <span className="genres-card__number">{index + 1}.</span>
                <span className="genres-card__name">{genre.genre}</span>
              </li>
            ))}
          </ul>
          <div className="genres-card__footer" style={{ color: '#111' }}>
            <span>animanga-wrapped.vercel.app</span>
          </div>
        </div>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-genres-card" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S07_GenresCard;
