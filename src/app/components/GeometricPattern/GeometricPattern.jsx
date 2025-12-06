'use client';

import PropTypes from 'prop-types';
import './GeometricPattern.scss';

/**
 * GeometricPattern - Reusable component for Spotify Wrapped-style decorations
 * Renders decorative circles and diagonal lines
 */
const GeometricPattern = ({ circles = [], lines = [], className = '' }) => {
  return (
    <div className={`geometric-pattern ${className}`} aria-hidden="true">
      {/* Decorative circles */}
      {circles.length > 0 && (
        <div className="pattern-circles">
          {circles.map((circle, index) => (
            <div
              key={`circle-${index}`}
              className={`decorative-circle ${circle.className || ''}`}
              style={{
                width: circle.size || '80px',
                height: circle.size || '80px',
                backgroundColor: circle.color || '#000',
                top: circle.top,
                right: circle.right,
                bottom: circle.bottom,
                left: circle.left,
              }}
            />
          ))}
        </div>
      )}

      {/* Diagonal lines */}
      {lines.length > 0 && (
        <div className="pattern-lines">
          {lines.map((line, index) => (
            <div
              key={`line-${index}`}
              className={`decorative-line ${line.className || ''}`}
              style={{
                width: line.width || '2px',
                height: line.height || '100px',
                backgroundColor: line.color || '#000',
                top: line.top,
                right: line.right,
                bottom: line.bottom,
                left: line.left,
                transform: line.rotation ? `rotate(${line.rotation}deg)` : undefined,
                opacity: line.opacity || 0.2,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

GeometricPattern.propTypes = {
  circles: PropTypes.arrayOf(
    PropTypes.shape({
      size: PropTypes.string,
      color: PropTypes.string,
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
      className: PropTypes.string,
    })
  ),
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      width: PropTypes.string,
      height: PropTypes.string,
      color: PropTypes.string,
      top: PropTypes.string,
      right: PropTypes.string,
      bottom: PropTypes.string,
      left: PropTypes.string,
      rotation: PropTypes.number,
      opacity: PropTypes.number,
      className: PropTypes.string,
    })
  ),
  className: PropTypes.string,
};

export default GeometricPattern;
