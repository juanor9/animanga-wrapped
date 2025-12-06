'use client';

import { useEffect, useRef } from 'react';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn, slideUp } from '../../utils/animations';
import './Chapter1.scss';
const S01_Opening = ({ userName, year = 2025 }) => {
  const titleRef = useRef(null);
  const messageRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    fadeIn(titleRef.current, { delay: 0.2 });
    slideUp(messageRef.current, { delay: 0.5 });
    scaleIn(yearRef.current, { delay: 0.9, duration: 0.8 });
  }, []);

  return (
    <SlideBase background="#2c2c2c" className="chapter1-slide with-arcs">
      <div className="slide-content">
        <h1 ref={titleRef} className="slide-title">
          Tenemos todo listo para ti,
          <br />
          <span className="slide-title--highlight">{userName}</span>
        </h1>

        <p ref={messageRef} className="slide-message">
          Desliza para descubrir tu año en anime
        </p>

        <div ref={yearRef} className="slide-year">
          {year}
        </div>
      </div>
    </SlideBase>
  );
};

export default S01_Opening;
