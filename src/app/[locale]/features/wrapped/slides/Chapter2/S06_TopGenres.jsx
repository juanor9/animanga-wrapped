'use client';

import { useEffect, useRef } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, slideUp, staggerIn } from '../../utils/animations';
import './Chapter2.scss';

const S06_TopGenres = ({ topGenres = [] }) => {
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    staggerIn(listRef.current.filter(Boolean), { delay: 0.6, stagger: 0.15 });
    fadeIn(ctaRef.current, { delay: 1.8 });
  }, []);

  return (
    <SlideBase
      background="#e8e2d5"
      className="chapter2-slide spotify-genres-list"
      shareRef={shareRef}
    >
      <div className="slide-content">
        {/* Decorative circles */}
        <div className="decorative-circle circle-black-1" />
        <div className="decorative-circle circle-red-1" />
        <div className="decorative-circle circle-orange-1" />
        <div className="decorative-circle circle-black-2" />

        <h2 ref={titleRef} className="slide-label" style={{ color: '#111' }}>
          Mis géneros principales
        </h2>

        <div className="spotify-genre-list">
          {topGenres.slice(0, 5).map((genre, index) => (
            <div
              key={genre.genre}
              ref={(el) => {
                listRef.current[index] = el;
              }}
              className="spotify-genre-item"
            >
              <span className="genre-number">{index + 1}</span>
              <div className="genre-text-box">{genre.genre}</div>
            </div>
          ))}
        </div>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-top-genres" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S06_TopGenres;
