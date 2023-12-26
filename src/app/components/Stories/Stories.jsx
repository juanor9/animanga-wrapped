import React, { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';

const StoryCard = ({ children, color }) => {
  // Para compartir como imagen
  const storyCardRef = useRef();

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);

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

  const shareStoryCard = async () => {
    try {
      const canvas = await html2canvas(storyCardRef.current, {
        allowTaint: true,
        scale: 1,
        useCORS: true,
        onclone: () => {
        },
      });
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
      throw new Error('Error sharing the story card:', error);
    }
  };
  // Para guardar la imagen
  const saveStoryCard = async () => {
    try {
      const canvas = await html2canvas(storyCardRef.current, {
        allowTaint: true,
        scale: 1,
        useCORS: true,
        onclone: () => {
        },
      });
      const image = canvas.toDataURL('image/png');

      // Crear un enlace para la descarga
      const link = document.createElement('a');
      link.href = image;
      link.download = 'storycard.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      throw new Error('Error saving the story card:', error);
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
      {allImagesLoaded === true
        ? (
          <div className="story__button-container">
            <button type="button" onClick={shareStoryCard} className={`story__button story__button--${color}`}>Share</button>
            <button type="button" onClick={saveStoryCard} className={`story__button story__button--${color}`}>Save</button>
          </div>
        )
        : null}

    </div>
  );
};

StoryCard.displayName = 'StoryCard';

export default StoryCard;
