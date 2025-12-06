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
    <SlideBase background="#2c2c2c" className="chapter2-slide with-arcs" shareRef={shareRef}>
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Mis géneros principales
        </h2>

        <ol className="genre-list">
          {topGenres.slice(0, 5).map((genre, index) => (
            <li
              key={genre.genre}
              ref={(el) => {
                listRef.current[index] = el;
              }}
              className="genre-list__item"
            >
              <span className="genre-list__number">{index + 1}</span>
              <span className="genre-list__name">{genre.genre}</span>
            </li>
          ))}
        </ol>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-top-genres" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S06_TopGenres;
