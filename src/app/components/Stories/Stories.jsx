import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import './Stories.scss';

const StoryCard = ({ children, color }) => {
  const storyCardRef = useRef();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

  const captureOptions = {
    allowTaint: true,
    scale: 2.7,
    useCORS: true,
    onclone: () => {},
  };

  useEffect(() => {
    const images = storyCardRef.current.getElementsByTagName('img');
    setTotalImages(images.length);

    Array.from(images).forEach((image) => {
      if (image.complete && image.naturalHeight !== 0) {
        setImagesLoaded((loaded) => loaded + 1);
      } else {
        image.onload = () => {
          setImagesLoaded((loaded) => loaded + 1);
        };
      }
    });
  }, [children]);

  const allImagesLoaded = imagesLoaded === totalImages;

  const downloadImage = (imageDataUrl) => {
    const link = document.createElement('a');
    link.href = imageDataUrl;
    link.download = 'storycard.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const shareStoryCard = async () => {
    try {
      const canvas = await html2canvas(storyCardRef.current, captureOptions);
      const image = canvas.toDataURL('image/png');
      const blob = await (await fetch(image)).blob();

      if (navigator.share) {
        const file = new File([blob], 'storycard.png', { type: 'image/png' });

        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: 'Check out my favorite anime genres!',
            text: 'Here is my story card created using Animanga Wrapped!',
          });
        } else {
          downloadImage(image);
        }
      } else {
        downloadImage(image);
      }
    } catch (error) {
      console.error('Error sharing the story card:', error);
    }
  };

  return (
    <div className="carrusel__item">
      <div>
        <div ref={storyCardRef} id="series-story" className={`story story--${color}-gradient`}>
          <div className="story__content">
            {children}
          </div>
          <div className="story__footer">
            <p className="story__footer-link">animanga-wrapped.vercel.app</p>
          </div>
        </div>
        {allImagesLoaded
          && (
          <div className="story__button-container">
            <button type="button" onClick={shareStoryCard} className={`story__button story__button--${color}`}>Share</button>
            <button type="button" onClick={() => downloadImage()} className={`story__button story__button--${color}`}>Save</button>
          </div>
          )}
      </div>
    </div>
  );
};

StoryCard.displayName = 'StoryCard';

export default StoryCard;
