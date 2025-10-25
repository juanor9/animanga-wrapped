
import { useState, useCallback, Children } from 'react';
import './Carrusel.scss';

const Carrusel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const count = Children.count(children);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : count - 1));
  }, [count]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex < count - 1 ? prevIndex + 1 : 0));
  }, [count]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft') {
      goToPrevious();
    } else if (e.key === 'ArrowRight') {
      goToNext();
    }
  }, [goToPrevious, goToNext]);

  return (
    <div className="carrusel__root">
      <div
        className="carrusel__container"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={count - 1}
        aria-valuenow={currentIndex}
        tabIndex="0"
        onKeyDown={handleKeyDown}
        aria-label="Carousel"
      >
        <div className="carrusel__wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {children}
        </div>
      </div>
      <div className="carrusel__button-container">
        <button className="carrusel__button" type="button" onClick={goToPrevious}>Previous</button>
        <button className="carrusel__button" type="button" onClick={goToNext}>Next</button>
      </div>
    </div>
  );
};

export default Carrusel;
