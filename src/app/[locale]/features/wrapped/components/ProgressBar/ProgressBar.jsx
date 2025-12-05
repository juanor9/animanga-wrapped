'use client';

/* eslint-disable import/no-named-as-default */
import gsap from 'gsap';
import { useEffect, useRef } from 'react';
import './ProgressBar.scss';
const ProgressBar = ({ totalSlides, currentSlide, onSegmentClick }) => {
  const segmentsRef = useRef([]);

  useEffect(() => {
    segmentsRef.current.forEach((segment, index) => {
      if (!segment) return;

      const fill = segment.querySelector('.progress-bar__fill');
      if (!fill) return;

      if (index < currentSlide) {
        gsap.to(fill, {
          scaleX: 1,
          duration: 0.3,
          ease: 'power2.out',
        });
      } else if (index === currentSlide) {
        gsap.to(fill, {
          scaleX: 1,
          duration: 5,
          ease: 'none',
        });
      } else {
        gsap.to(fill, {
          scaleX: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    });
  }, [currentSlide]);

  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax={totalSlides}
      aria-valuenow={currentSlide + 1}
    >
      {Array.from({ length: totalSlides }).map((_, index) => (
        <button
          key={index}
          ref={(el) => {
            segmentsRef.current[index] = el;
          }}
          className={`progress-bar__segment ${index === currentSlide ? 'progress-bar__segment--active' : ''} ${index < currentSlide ? 'progress-bar__segment--completed' : ''}`}
          onClick={() => onSegmentClick && onSegmentClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          type="button"
        >
          <div className="progress-bar__track">
            <div className="progress-bar__fill" />
          </div>
        </button>
      ))}
    </div>
  );
};

export default ProgressBar;
