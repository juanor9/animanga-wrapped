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
    <SlideBase
      background="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      className="chapter2-slide"
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Viste anime de
        </h2>

        <div ref={numberRef} className="slide-big-number">
          {genresCount}
        </div>

        <p ref={descRef} className="slide-description">
          géneros diferentes
        </p>
      </div>
    </SlideBase>
  );
};

export default S05_GenresCount;
