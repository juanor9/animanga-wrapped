'use client';

import { useEffect, useRef } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, slideUp, staggerIn } from '../../utils/animations';
import './Chapter4.scss';
const S12_TopSeriesList = ({ topSeries = [] }) => {
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const listRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    slideUp(titleRef.current, { delay: 0.2 });
    staggerIn(listRef.current.filter(Boolean), { delay: 0.6, stagger: 0.12 });
    fadeIn(ctaRef.current, { delay: 1.8 });
  }, []);

  return (
    <SlideBase
      background="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
      className="chapter4-slide"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label">
          Estas fueron tus series principales
        </h2>

        <div className="series-list">
          {topSeries.slice(0, 5).map((series, index) => (
            <div
              key={series.id}
              ref={(el) => {
                listRef.current[index] = el;
              }}
              className="series-list__item"
            >
              {series.coverImage && (
                <img src={series.coverImage} alt={series.title} className="series-list__cover" />
              )}
              <div className="series-list__info">
                <h4 className="series-list__title">{series.title}</h4>
                <p className="series-list__stats">
                  {series.episodesWatched} eps • {Math.floor(series.minutesWatched / 60)}h
                </p>
              </div>
            </div>
          ))}
        </div>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-top-5-series" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S12_TopSeriesList;
