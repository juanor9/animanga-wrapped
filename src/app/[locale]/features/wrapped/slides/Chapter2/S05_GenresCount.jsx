'use client';

import { useEffect, useRef } from 'react';
import SlideBase from '../../components/SlideBase/SlideBase';
import { useCounterAnimation } from '../../hooks/useGSAP';
import { fadeIn, slideUp } from '../../utils/animations';
import './Chapter2.scss';

const S05_GenresCount = ({ genresCount }) => {
  const titleRef = useRef(null);
  const numberRef = useRef(null);
  const descRef = useRef(null);

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    fadeIn(descRef.current, { delay: 1.5 });
  }, []);

  useCounterAnimation(numberRef, genresCount, 1.2, 0);

  return (
    <SlideBase background="#e8e2d5" className="chapter2-slide with-diagonal-stripes">
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label" style={{ color: '#111' }}>
          Viste anime de
        </h2>

        <div ref={numberRef} className="spotify-outlined-number">
          {genresCount}
        </div>

        <p ref={descRef} className="slide-description" style={{ color: '#111' }}>
          géneros diferentes
        </p>
      </div>
    </SlideBase>
  );
};

export default S05_GenresCount;
