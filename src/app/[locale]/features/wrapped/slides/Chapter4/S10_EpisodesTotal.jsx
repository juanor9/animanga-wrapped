'use client';

import { useEffect, useRef } from 'react';

import SlideBase from '../../components/SlideBase/SlideBase';
import { useCounterAnimation } from '../../hooks/useGSAP';
import { fadeIn, slideUp } from '../../utils/animations';
import './Chapter4.scss';

const S10_EpisodesTotal = ({ totalEpisodes }) => {
  const titleRef = useRef(null);
  const numberRef = useRef(null);
  const descRef = useRef(null);
  const questionRef = useRef(null);

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    fadeIn(descRef.current, { delay: 1.5 });
    fadeIn(questionRef.current, { delay: 2 });
  }, []);

  useCounterAnimation(numberRef, totalEpisodes, 1.5, 0);

  return (
    <SlideBase
      background="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      className="chapter4-slide"
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Viste
        </h2>

        <div ref={numberRef} className="slide-big-number">
          {totalEpisodes}
        </div>

        <p ref={descRef} className="slide-description">
          episodios de anime este año
        </p>

        <p ref={questionRef} className="slide-question">
          ¿Puedes adivinar cuál fue tu serie principal?
        </p>
      </div>
    </SlideBase>
  );
};

export default S10_EpisodesTotal;
