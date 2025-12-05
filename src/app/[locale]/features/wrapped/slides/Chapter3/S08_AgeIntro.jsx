'use client';

import { useEffect, useRef } from 'react';
import SlideBase from '../../components/SlideBase/SlideBase';
import { slideUp } from '../../utils/animations';
import './Chapter3.scss';
const S08_AgeIntro = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    slideUp(line1Ref.current, { delay: 0.2 });
    slideUp(line2Ref.current, { delay: 0.5 });
  }, []);

  return (
    <SlideBase
      background="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
      className="chapter3-slide"
    >
      <div className="slide-content">
        <h1 ref={line1Ref} className="slide-statement">
          La edad otaku es solo un número.
        </h1>

        <h2 ref={line2Ref} className="slide-statement slide-statement--secondary">
          No te lo tomes personal.
        </h2>
      </div>
    </SlideBase>
  );
};

export default S08_AgeIntro;
