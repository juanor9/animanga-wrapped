import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { useSelector, useDispatch } from 'react-redux';
import './Stories.scss';
import uploadImage from '../../features/userStats/services/upload';
import Spinner from '../Spinner/Spinner';

const StoryCard = ({ children, color, id }) => {
  const storyCardRef = useRef();
  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const { listUsername } = useSelector((state) => state.UserReducer.user);
  const dispatch = useDispatch();

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

  const uploadAndSaveStoryCard = async () => {
    setIsUploading(true); // Comenzar la carga
    const newTab = window.open('', '_blank');

    try {
      const canvas = await html2canvas(storyCardRef.current, captureOptions);
      canvas.toBlob(async (blob) => {
        const file = new File([blob], 'storycard.png', { type: 'image/png' });
        const uploadData = {
          file,
          listUsername, // Asegúrate de que listUsername esté definido
          filename: `${listUsername}-${id}`, // Este es opcional
        };
        const resultAction = await dispatch(uploadImage(uploadData));
        const data = resultAction.payload;

        if (data && data.url) {
          newTab.location.href = data.url;
        } else {
          newTab.close(); // Cierra la nueva pestaña si la carga falla
        }
        setIsUploading(false); // Finalizar la carga
      });
    } catch (error) {
      newTab.close(); // Asegúrate de cerrar la nueva pestaña si hay un error
      setIsUploading(false); // Finalizar la carga
      throw new Error('Error uploading the story card:', error);
    }
  };

  return (
    <div className="carrusel__item">
      <div ref={storyCardRef} id="series-story" className={`story story--${color}-gradient`}>
        <div className="story__content">
          {children}
        </div>
        <div className="story__footer">
          <p className="story__footer-link">animanga-wrapped.vercel.app</p>
        </div>
      </div>
      {allImagesLoaded && (
        <div className="story__button-container">
          {isUploading ? (
            <Spinner />
          ) : (
            <button type="button" onClick={uploadAndSaveStoryCard} className={`story__button story__button--${color}`}>Save</button>
          )}
        </div>
      )}
    </div>
  );
};

StoryCard.displayName = 'StoryCard';

export default StoryCard;
