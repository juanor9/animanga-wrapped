import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StoryCard from '../../../../../../components/Stories/Stories';

const MangaGenre = ({ list }) => {
  const [genreList, SetGenreList] = useState([]);

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          manga: activity.media.title.userPreferred,
          genre: activity.media.genres,
        }
      ));
      const genreCount = fullData.map((manga) => manga.genre)
        .reduce((acc, genres) => {
          genres.forEach((genre) => {
            acc[genre] = (acc[genre] || 0) + 1;
          });
          return acc;
        }, {});

      const result = Object.keys(genreCount).map((genre) => ({
        id: uuidv4(),
        genre,
        count: genreCount[genre],
      }));

      SetGenreList(result.sort((a, b) => b.count - a.count));
    }
  }, [list]);

  const backgroundColors = ['pink', 'green', 'yellow', 'light-green', 'light-yellow'];
  return (
    <StoryCard key="6" id="6" color="orange">
      <p className="story__main-copy">This were your favorite anime genres for this year:</p>
      <ul className="story__grid-container">
        {genreList && genreList.length > 0
          ? genreList.slice(0, 5).map((item, index) => <li lang="en" key={item.id} className={`story__grid-item story__grid-item--${index + 1} story__grid-item--${backgroundColors[index % backgroundColors.length]}`}>{item.genre}</li>)
          : null}
      </ul>
    </StoryCard>
  );
};
export default MangaGenre;
