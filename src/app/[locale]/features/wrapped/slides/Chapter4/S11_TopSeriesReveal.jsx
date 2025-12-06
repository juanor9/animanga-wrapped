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

  useEffect(() => {
    if (!topSeries) return;
    slideUp(titleRef.current, { delay: 0.2 });
    scaleIn(coverRef.current, { delay: 0.6 });
    fadeIn(seriesTitleRef.current, { delay: 1 });
    slideUp(statsRef.current, { delay: 1.3 });
    fadeIn(ctaRef.current, { delay: 1.8 });
  }, [topSeries]);

  if (!topSeries) return null;

  const hours = Math.floor(topSeries.minutesWatched / 60);

  return (
    <SlideBase background="#e8e2d5" className="chapter4-slide with-lines" shareRef={shareRef}>
      <div className="slide-content">
        <div className="geometric-line line-1"></div>
        <div className="geometric-line line-2"></div>
        <div className="geometric-line line-3"></div>

        <h2 ref={titleRef} className="slide-label" style={{ color: '#111' }}>
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

        <h3 ref={seriesTitleRef} className="anime-title" style={{ color: '#111' }}>
          {topSeries.title}
        </h3>

        <div ref={statsRef} className="anime-stats" style={{ color: '#111' }}>
          <div className="anime-stats__item">
            <span className="anime-stats__value">{hours}h</span>
            <span className="anime-stats__label">vistas</span>
          </div>
          <div className="anime-stats__item">
            <span className="anime-stats__value">{topSeries.episodesWatched}</span>
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
