'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn, staggerIn } from '../../utils/animations';
import './Chapter9.scss';

const S16_Summary = ({ wrappedData, onComplete }) => {
  const router = useRouter();
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const statsRef = useRef([]);
  const ctaRef = useRef(null);

  useEffect(() => {
    scaleIn(titleRef.current, { delay: 0.2 });
    staggerIn(statsRef.current.filter(Boolean), { delay: 0.6, stagger: 0.15 });
    fadeIn(ctaRef.current, { delay: 1.5 });
  }, []);

  const handleGoToDashboard = () => {
    if (onComplete) {
      onComplete();
    }
    router.push('/user');
  };

  const stats = [
    {
      label: 'Minutos vistos',
      value: wrappedData?.totalMinutesWatched?.toLocaleString() || '0',
    },
    {
      label: 'Serie principal',
      value: wrappedData?.topAnimeByMinutes?.title || 'N/A',
    },
    {
      label: 'Género favorito',
      value: wrappedData?.genresBreakdown?.[0]?.genre || 'N/A',
    },
    {
      label: 'Tu club',
      value: wrappedData?.club?.name || 'N/A',
    },
  ];

  return (
    <SlideBase
      background="#e8e2d5"
      className="chapter9-slide with-diagonal-stripes"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="summary-title" style={{ color: '#111' }}>
          Tu Animanga Wrapped 2025
        </h2>

        <div className="summary-card">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              ref={(el) => {
                statsRef.current[index] = el;
              }}
              className="summary-card__item"
              style={{ color: '#111' }}
            >
              <span className="summary-card__label">{stat.label}</span>
              <span className="summary-card__value">{stat.value}</span>
            </div>
          ))}
        </div>

        <div ref={ctaRef} className="summary-actions">
          <ShareButton targetRef={shareRef} fileName="wrapped-summary" />
          <button onClick={handleGoToDashboard} className="dashboard-button" type="button">
            Ir a mi panel
          </button>
        </div>
      </div>
    </SlideBase>
  );
};

export default S16_Summary;
