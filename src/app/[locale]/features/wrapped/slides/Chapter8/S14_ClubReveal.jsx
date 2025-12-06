'use client';

import { useEffect, useRef } from 'react';
import ShareButton from '../../components/ShareButton/ShareButton';
import SlideBase from '../../components/SlideBase/SlideBase';
import { fadeIn, scaleIn, slideUp } from '../../utils/animations';
import './Chapter8.scss';
const S14_ClubReveal = ({ club }) => {
  const shareRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const descRef = useRef(null);
  const roleRef = useRef(null);
  const roleDescRef = useRef(null);
  const percentageRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    if (!club) return;
    slideUp(titleRef.current, { delay: 0.2 });
    scaleIn(nameRef.current, { delay: 0.6 });
    fadeIn(descRef.current, { delay: 1 });
    slideUp(roleRef.current, { delay: 1.4 });
    fadeIn(roleDescRef.current, { delay: 1.7 });
    fadeIn(percentageRef.current, { delay: 2 });
    fadeIn(ctaRef.current, { delay: 2.4 });
  }, [club]);

  if (!club) return null;

  return (
    <SlideBase
      background="#e8e2d5"
      className="chapter8-slide with-club-pattern"
      shareRef={shareRef}
    >
      <div className="slide-content">
        <h2 ref={titleRef} className="slide-label" style={{ color: '#111' }}>
          Tu club
        </h2>

        <div ref={nameRef} className="club-badge">
          <div className="club-badge__icon">🎌</div>
          <h3 className="club-badge__name" style={{ color: '#111' }}>
            {club.name}
          </h3>
        </div>

        <p ref={descRef} className="slide-description" style={{ color: '#111' }}>
          {club.description}
        </p>

        <div ref={roleRef} className="club-role" style={{ color: '#111' }}>
          <span className="club-role__label">Tu rol:</span>
          <span className="club-role__value">{club.role}</span>
        </div>

        <p ref={roleDescRef} className="club-role-desc" style={{ color: '#111' }}>
          {club.roleDescription}
        </p>

        <p ref={percentageRef} className="club-percentage" style={{ color: '#111' }}>
          Tienes buena compañía: <strong>{club.percentage}%</strong> de los usuarios comparten tu
          club
        </p>

        <div ref={ctaRef}>
          <ShareButton targetRef={shareRef} fileName="wrapped-club" />
        </div>
      </div>
    </SlideBase>
  );
};

export default S14_ClubReveal;
