import { useEffect, useRef, useState } from 'react';
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

  const saveStoryCard = async () => {
    try {
      const canvas = await html2canvas(storyCardRef.current, captureOptions);
      // Convertir el lienzo a Blob en lugar de Data URL
      canvas.toBlob((blob) => {
        // Crear un objeto URL con el Blob
        const imageUrl = URL.createObjectURL(blob);
        // Abrir la imagen en una nueva pestaña
        window.open(imageUrl);
      });
    } catch (error) {
      console.error('Error saving the story card:', error);
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
          ? (
            <div className="story__button-container">
              <button type="button" onClick={saveStoryCard} className={`story__button story__button--${color}`}>Save</button>
            </div>
          )
          : null}
      </div>
    </div>
  );
};

StoryCard.displayName = 'StoryCard';

export default StoryCard;
