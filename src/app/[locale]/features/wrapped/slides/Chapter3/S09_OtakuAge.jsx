'use client';

import { useEffect, useRef } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn, slideUp } from '../../utils/animations';
import './Chapter3.scss';
const S09_OtakuAge = ({ weightedYear }) => {
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const yearRef = useRef(null);
  const descRef = useRef(null);
  const ctaRef = useRef(null);

  const decade = Math.floor(weightedYear / 10) * 10;

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    scaleIn(yearRef.current, { delay: 0.6 });
    fadeIn(descRef.current, { delay: 1.2 });
    fadeIn(ctaRef.current, { delay: 1.8 });
  }, []);

  return (
    <SlideBase background="#e8e2d5" className="chapter3-slide with-stripes" shareRef={shareRef}>
      <div className="slide-content">
        <div className="stripe-yellow"></div>
        <div className="stripe-white"></div>
        <div className="stripe-white"></div>
        <div className="stripe-white"></div>

        <h2 ref={titleRef} className="slide-label" style={{ color: '#111' }}>
          Tu edad otaku es
        </h2>

        <div ref={yearRef} className="slide-big-number" style={{ color: '#111' }}>
          {decade}s
        </div>

        <p ref={descRef} className="slide-description" style={{ color: '#111' }}>
          Porque la mayoría del anime que viste se estrenó en esa década
        </p>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-otaku-age" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S09_OtakuAge;
