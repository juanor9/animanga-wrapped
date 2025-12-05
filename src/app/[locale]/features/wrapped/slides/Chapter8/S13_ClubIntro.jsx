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
    <SlideBase
      background="linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)"
      className="chapter8-slide"
    >
      <div className="slide-content">
        <h1 ref={textRef} className="slide-statement">
          La forma en que viste anime te hizo parte de algo más grande.
        </h1>
      </div>
    </SlideBase>
  );
};

export default S13_ClubIntro;
