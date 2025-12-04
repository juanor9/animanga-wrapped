'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import BrandFooter from '../BrandFooter/BrandFooter';
import ProgressBar from '../ProgressBar/ProgressBar';
import './WrappedContainer.scss';

const WrappedContainer = ({
  slides,
  onComplete,
  onProgress,
  initialSlide = 0,
  canSkip = false,
}) => {
  const [currentSlide, setCurrentSlide] = useState(initialSlide);
  const [touchStart, setTouchStart] = useState(null);
  const containerRef = useRef(null);

  const totalSlides = slides.length;

  const goToSlide = useCallback(
    (index) => {
      if (index < 0 || index >= totalSlides) return;
      setCurrentSlide(index);
      if (onProgress) {
        onProgress(index);
      }
    },
    [totalSlides, onProgress],
  );

  const goToNext = useCallback(() => {
    if (currentSlide < totalSlides - 1) {
      goToSlide(currentSlide + 1);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentSlide, totalSlides, goToSlide, onComplete]);

  const goToPrevious = useCallback(() => {
    if (currentSlide > 0) {
      goToSlide(currentSlide - 1);
    }
  }, [currentSlide, goToSlide]);

  const handleClick = useCallback(
    (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;

      if (x < width / 3) {
        goToPrevious();
      } else {
        goToNext();
      }
    },
    [goToPrevious, goToNext],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        goToNext();
      } else if (e.key === 'Escape' && canSkip) {
        if (onComplete) {
          onComplete();
        }
      }
    },
    [goToPrevious, goToNext, canSkip, onComplete],
  );

  const handleTouchStart = useCallback((e) => {
    setTouchStart(e.touches[0].clientX);
  }, []);

  const handleTouchEnd = useCallback(
    (e) => {
      if (touchStart === null) return;

      const touchEnd = e.changedTouches[0].clientX;
      const diff = touchStart - touchEnd;

      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToNext();
        } else {
          goToPrevious();
        }
      }

      setTouchStart(null);
    },
    [touchStart, goToNext, goToPrevious],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const CurrentSlideComponent = slides[currentSlide];

  return (
    <div className="wrapped-container" ref={containerRef}>
      <ProgressBar
        totalSlides={totalSlides}
        currentSlide={currentSlide}
        onSegmentClick={canSkip ? goToSlide : undefined}
      />

      <div
        className="wrapped-container__content"
        onClick={handleClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="region"
        aria-label="Wrapped story viewer"
        tabIndex={0}
      >
        {CurrentSlideComponent && <CurrentSlideComponent />}
      </div>

      <BrandFooter />

      {canSkip && (
        <button
          className="wrapped-container__close"
          onClick={onComplete}
          aria-label="Close wrapped"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default WrappedContainer;
