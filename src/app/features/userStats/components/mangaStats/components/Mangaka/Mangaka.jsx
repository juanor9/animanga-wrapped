import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useDispatch, useSelector } from 'react-redux';
import uploadImage from '../../../../services/upload';
import StoryCard from '../../../../../../components/Stories/Stories';
// TODO: realizar el conteo, no por cantidad de actividades, sino por cantidad de capítulos leídos.

const serverUrl = process.env.NEXT_PUBLIC_REACT_APP_BASE_URL;

const Mangaka = ({ list }) => {
  const [mangakaList, SetMangakaList] = useState([]);
  const dispatch = useDispatch();
  const { listUsername } = useSelector((state) => state.UserReducer.user);

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          manga: activity.media.title.userPreferred,
          staff: activity.media.staff.nodes,
        }
      ));
      const mangakaFilter = fullData.map((activity) => {
        const filteredActivity = {
          manga: activity.manga,
          mangaka: activity.staff.filter((staffMember) => staffMember.primaryOccupations.includes('Mangaka')),
        };
        return filteredActivity;
      });
      const mangakaCount = {};
      mangakaFilter.forEach((mangaEntry) => {
        mangaEntry.mangaka.forEach((mangaka) => {
          const mangakaName = mangaka.name.userPreferred;
          const mangakaPic = mangaka.image.large;
          if (!mangakaCount[mangakaName]) {
            mangakaCount[mangakaName] = { titles: 1, image: mangakaPic }; // Initialize the object
          } else {
            mangakaCount[mangakaName].titles += 1;
          }
        });
      });
      const result = Object.entries(mangakaCount).map(
        (e) => (
          {
            id: uuidv4(),
            mangaka: e[0],
            image: e[1].image,
            count: e[1].titles,
          }
        ),
      );
      const mangakaListSorted = result.sort((a, b) => b.count - a.count);
      SetMangakaList(mangakaListSorted);
    }
  }, [list]);

  const [topMangaka, setTopMangaka] = useState([]);
  const downloadToCloudinary = async (url, filename) => {
    try {
      const response = await fetch(url);
      if (!response.ok) { throw new Error(`HTTP error! status: ${response.status}`); }

      const blob = await response.blob();
      const file = new File([blob], 'anime-watched-image.png', {
        type: blob.type,
      });

      const uploadedImageResponse = await dispatch(
        uploadImage({ file, listUsername, filename }),
      );

      if (uploadedImageResponse.type === 'uploads/uploadImage/fulfilled') {
        const cloudinaryUrl = uploadedImageResponse.payload.url;
        return cloudinaryUrl;
      }
      throw new Error('Image upload failed');
    } catch (error) {
      throw new Error('Error downloading or uploading image:', error);
    }
  };

  useEffect(() => {
    const processImages = async () => {
      if (mangakaList && mangakaList.length > 0) {
        const rawTopWatchedMinutes = mangakaList.slice(0, 5);

        const newTopWatchedMinutesPromises = rawTopWatchedMinutes.map(
          async (element) => {
            const alImage = element.image;
            const parts = alImage.split('/');
            const newPath = parts.slice(3).join('/');
            const newUrl = `${serverUrl}/api/al/sources/${newPath}`;
            const cloudinaryUrl = await downloadToCloudinary(
              newUrl,
              element.mangaka,
            );

            return {
              ...element,
              image: cloudinaryUrl,
            };
          },
        );

        const newTopWatchedMinutes = await Promise.all(
          newTopWatchedMinutesPromises,
        );

        setTopMangaka(newTopWatchedMinutes);
      }
    };

    processImages();
  }, [mangakaList]);

  return (
    <StoryCard key="13" id="13" color="orange">
      <p className="story__main-copy">This were the mangaka you most read this year:</p>
      <ol className="story__list-container">
        {topMangaka
          ? topMangaka.slice(0, 5).map((item) => {
            const url = item.image;
            const cloudinaryParams = 'ar_1:1,c_crop/ar_1:1,c_scale,w_300/';
            const parts = url.split('image/upload/');
            const image = `${parts[0]}image/upload/${cloudinaryParams}${parts[1]}`;
            return (
              <li key={item.id} className="story__list-item">
                <picture className="story__list-image">
                  <div
                    role="img"
                    aria-label={item.mangaka}
                    style={{ backgroundImage: `url(${image})` }}
                  />
                </picture>
                <div className="story__list-text">
                  <p className="story__list-text--title">{item.mangaka}</p>
                </div>
              </li>
            );
          })
          : null}
      </ol>
    </StoryCard>
  );
};
export default Mangaka;
