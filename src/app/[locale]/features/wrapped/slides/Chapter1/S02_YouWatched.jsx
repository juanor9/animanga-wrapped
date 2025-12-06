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
    <SlideBase background="#e8e2d5" className="chapter1-slide with-diagonal-stripes">
      <div className="slide-content">
        <h1 ref={line1Ref} className="slide-statement" style={{ color: '#111' }}>
          Tú viste anime.
        </h1>

        <h2
          ref={line2Ref}
          className="slide-statement slide-statement--secondary"
          style={{ color: '#111' }}
        >
          Nosotros llevamos la cuenta.
        </h2>
      </div>
    </SlideBase>
  );
};

export default S02_YouWatched;
