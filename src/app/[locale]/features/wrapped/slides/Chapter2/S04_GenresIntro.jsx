'use client';

import { useEffect, useRef } from 'react';
import SlideBase from '../../components/SlideBase/SlideBase';
import { slideUp } from '../../utils/animations';
import './Chapter2.scss';
const S04_GenresIntro = () => {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);

  useEffect(() => {
    slideUp(line1Ref.current, { delay: 0.2 });
    slideUp(line2Ref.current, { delay: 0.5 });
  }, []);

  return (
    <SlideBase
      background="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
      className="chapter2-slide"
    >
      <div className="slide-content">
        <h1 ref={line1Ref} className="slide-statement">
          Tus gustos en anime no se pueden definir.
        </h1>

        <h2 ref={line2Ref} className="slide-statement slide-statement--secondary">
          Pero vamos a intentarlo de todas formas.
        </h2>
      </div>
    </SlideBase>
  );
};

export default S04_GenresIntro;
