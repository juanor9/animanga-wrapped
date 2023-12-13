import React, { useRef } from 'react';
import html2canvas from 'html2canvas';

const StoryCard = ({ children, color }) => {
  // Para compartir como imagen
  const storyCardRef = useRef();
  const shareStoryCard = async () => {
    try {
      const canvas = await html2canvas(storyCardRef.current);
      const image = canvas.toDataURL('image/png');
      const blob = await (await fetch(image)).blob();

      if (navigator.share) {
        await navigator.share({
          files: [new File([blob], 'storycard.png', { type: 'image/png' })],
          title: 'Check out my favorite anime genres!',
        });
      } else {
        // Alternativa para navegadores que no soportan compartir archivos
        const link = document.createElement('a');
        link.href = image;
        link.download = 'storycard.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Error sharing the story card:', error);
    }
  };
  return (
    <div>
      <div ref={storyCardRef} id="series-story" className={`story story--${color}-gradient`}>
        <div className="story__content">
          {children}
        </div>
        <div className="story__footer">
          <p className="story__footer-link">animanga-wrapped.vercel.app</p>
        </div>
      </div>
      <div className="story__button-container">
        <button type="button" onClick={shareStoryCard} className="story__button">Share</button>
        <button type="button" className="story__button">Save</button>
      </div>
    </div>
  );
};

StoryCard.displayName = 'StoryCard';

export default StoryCard;
