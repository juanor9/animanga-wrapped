'use client';

import { useEffect, useRef } from 'react';

import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn, slideUp } from '../../utils/animations';
import './Chapter4.scss';

const S11_TopSeriesReveal = ({ topSeries }) => {
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const coverRef = useRef(null);
  const seriesTitleRef = useRef(null);
  const statsRef = useRef(null);
  const ctaRef = useRef(null);

  if (!topSeries) return null;

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    scaleIn(coverRef.current, { delay: 0.6 });
    fadeIn(seriesTitleRef.current, { delay: 1 });
    slideUp(statsRef.current, { delay: 1.3 });
    fadeIn(ctaRef.current, { delay: 1.8 });
  }, []);

  const hours = Math.floor(topSeries.minutesWatched / 60);

  return (
    <SlideBase
      background="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      className="chapter4-slide"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Tu serie principal fue
        </h2>

        {topSeries.coverImage && (
          <img
            ref={coverRef}
            src={topSeries.coverImage}
            alt={topSeries.title}
            className="anime-cover"
          />
        )}

        <h3 ref={seriesTitleRef} className="anime-title">
          {topSeries.title}
        </h3>

        <div ref={statsRef} className="anime-stats">
          <div className="anime-stats__item">
            <span className="anime-stats__value">{hours}h</span>
            <span className="anime-stats__label">vistas</span>
          </div>
          <div className="anime-stats__item">
            <span className="anime-stats__value">
              {topSeries.episodesWatched}
            </span>
            <span className="anime-stats__label">episodios</span>
          </div>
        </div>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-top-series" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S11_TopSeriesReveal;
