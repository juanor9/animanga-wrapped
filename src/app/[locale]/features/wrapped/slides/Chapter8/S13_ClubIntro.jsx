'use client';

import { useEffect, useRef } from 'react';
import SlideBase from '../../components/SlideBase/SlideBase';
import { slideUp } from '../../utils/animations';
import './Chapter8.scss';
const S13_ClubIntro = () => {
  const textRef = useRef(null);

  useEffect(() => {
    slideUp(textRef.current, { delay: 0.3 });
  }, []);

  return (
    <SlideBase background="#2c2c2c" className="chapter8-slide with-arcs">
      <div className="slide-content">
        <h1 ref={textRef} className="slide-statement">
          La forma en que viste anime te hizo parte de algo más grande.
        </h1>
      </div>
    </SlideBase>
  );
};

export default S13_ClubIntro;
