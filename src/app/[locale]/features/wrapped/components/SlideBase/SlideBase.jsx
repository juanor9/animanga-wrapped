'use client';

import './SlideBase.scss';

const SlideBase = ({ children, background, className = '', shareRef }) => {
  return (
    <div className={`slide-base ${className}`} style={{ background }} ref={shareRef}>
      <div className="slide-base__content">{children}</div>
    </div>
  );
};

export default SlideBase;
