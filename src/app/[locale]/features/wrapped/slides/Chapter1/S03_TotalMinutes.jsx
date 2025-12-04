'use client';

import { useEffect, useRef } from 'react';

import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { useCounterAnimation } from '../../hooks/useGSAP';
import { fadeIn, slideUp } from '../../utils/animations';
import './Chapter1.scss';

const S03_TotalMinutes = ({ totalMinutes }) => {
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const numberRef = useRef(null);
  const descRef = useRef(null);
  const daysRef = useRef(null);
  const ctaRef = useRef(null);

  const days = Math.floor(totalMinutes / 60 / 24);

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    fadeIn(descRef.current, { delay: 1.5 });
    slideUp(daysRef.current, { delay: 1.8 });
    fadeIn(ctaRef.current, { delay: 2.2 });
  }, []);

  useCounterAnimation(numberRef, totalMinutes, 1.5, 0);

  return (
    <SlideBase
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      className="chapter1-slide"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Este año viste
        </h2>

        <div ref={numberRef} className="slide-big-number">
          {totalMinutes.toLocaleString()}
        </div>

        <p ref={descRef} className="slide-description">
          minutos de anime
        </p>

        <p ref={daysRef} className="slide-equivalent">
          Eso equivale a <strong>{days}</strong> días
        </p>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-total-minutes" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S03_TotalMinutes;
