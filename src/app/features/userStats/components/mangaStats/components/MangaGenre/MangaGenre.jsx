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

      SetGenreList(result.sort((a, b) => b.genre - a.genre));
    }
  }, [list]);
  return (
    <StoryCard key="6" id="6">
      This were your favorite anime genres for this year:
      <ol>
        {genreList && genreList.length > 0
          ? genreList.slice(0, 5).map((item) => <li key={item.id}>{item.genre}</li>)
          : null}
      </ol>
    </StoryCard>
  );
};
export default MangaGenre;
