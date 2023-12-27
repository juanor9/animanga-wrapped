import { useState } from 'react';
import './Carrusel.scss';

const Carrusel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : children.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex < children.length - 1 ? prevIndex + 1 : 0));
  };

  return (
    <div className="carrusel__container">
      <div className="carrusel__button-container">
        <button className="carrusel__button" type="button" onClick={goToPrevious}>Previous</button>
        <button className="carrusel__button" type="button" onClick={goToNext}>Next</button>
      </div>
      <div className="carrusel__wrapper" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {children}
      </div>
    </div>
  );
};

export default Carrusel;
