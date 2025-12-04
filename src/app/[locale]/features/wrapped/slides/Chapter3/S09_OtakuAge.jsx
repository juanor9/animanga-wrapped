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
    <SlideBase
      background="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      className="chapter3-slide"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Tu edad otaku es
        </h2>

        <div ref={yearRef} className="slide-big-number">
          {decade}s
        </div>

        <p ref={descRef} className="slide-description">
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
