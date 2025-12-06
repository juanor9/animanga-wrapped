'use client';

import html2canvas from 'html2canvas';
import { useState } from 'react';
import Toast from '../Toast/Toast';
import './ShareButton.scss';
const ShareButton = ({ targetRef, fileName = 'animanga-wrapped' }) => {
  const [isSharing, setIsSharing] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleShare = async () => {
    if (!targetRef.current) return;

    setIsSharing(true);

    try {
      const canvas = await html2canvas(targetRef.current, {
        scale: 2,
        backgroundColor: null,
        logging: false,
        useCORS: true,
      });

      canvas.toBlob(async (blob) => {
        if (!blob) {
          setIsSharing(false);
          return;
        }

        if (navigator.share && navigator.canShare) {
          try {
            const file = new File([blob], `${fileName}.png`, {
              type: 'image/png',
            });

            await navigator.share({
              files: [file],
              title: 'Animanga Wrapped 2025',
              text: 'Check out my Animanga Wrapped!',
            });
            setShowToast(true);
          } catch (error) {
            if (error.name !== 'AbortError') {
              downloadImage(blob, fileName);
              setShowToast(true);
            }
          }
        } else {
          downloadImage(blob, fileName);
          setShowToast(true);
        }

        setIsSharing(false);
      });
    } catch (error) {
      console.error('Error sharing:', error);
      setIsSharing(false);
    }
  };

  const downloadImage = (blob, name) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <button
        className="share-button"
        onClick={handleShare}
        disabled={isSharing}
        type="button"
        aria-label="Share this story"
      >
        {isSharing ? (
          <>
            <span className="share-button__icon">⏳</span>
            <span>Preparando...</span>
          </>
        ) : (
          <>
            <span className="share-button__icon">📤</span>
            <span>Compartir esta historia</span>
          </>
        )}
      </button>

      {showToast && (
        <Toast
          message="¡Historia compartida!"
          icon="✓"
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </>
  );
};

export default ShareButton;
