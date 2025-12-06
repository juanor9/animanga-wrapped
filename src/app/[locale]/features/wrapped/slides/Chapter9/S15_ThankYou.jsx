'use client';

import { useEffect, useRef } from 'react';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn } from '../../utils/animations';
import './Chapter9.scss';
const S15_ThankYou = ({ year = 2025 }) => {
  const textRef = useRef(null);
  const yearRef = useRef(null);

  useEffect(() => {
    fadeIn(textRef.current, { delay: 0.3 });
    scaleIn(yearRef.current, { delay: 0.8, duration: 1 });
  }, []);

  return (
    <SlideBase background="#2c2c2c" className="chapter9-slide with-arcs">
      <div className="slide-content">
        <h1 ref={textRef} className="slide-statement">
          Gracias por compartir tu año en anime con nosotros
        </h1>

        <div ref={yearRef} className="slide-year-large">
          {year}
        </div>
      </div>
    </SlideBase>
  );
};

export default S15_ThankYou;
