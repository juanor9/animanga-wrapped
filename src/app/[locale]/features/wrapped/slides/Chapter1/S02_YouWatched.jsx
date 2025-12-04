'use client';

import { useEffect, useRef } from 'react';

import SlideBase from '../../components/SlideBase/SlideBase';
import { slideUp } from '../../utils/animations';
import './Chapter1.scss';

const S02_YouWatched = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    slideUp(line1Ref.current, { delay: 0.2 });
    slideUp(line2Ref.current, { delay: 0.5 });
  }, []);

  return (
    <SlideBase
      background="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      className="chapter1-slide"
    >
      <div className="slide-content">
        <h1 ref={line1Ref} className="slide-statement">
          Tú viste anime.
        </h1>

        <h2 ref={line2Ref} className="slide-statement slide-statement--secondary">
          Nosotros llevamos la cuenta.
        </h2>
      </div>
    </SlideBase>
  );
};

export default S02_YouWatched;
