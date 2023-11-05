import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AnimeGenre = ({ list }) => {
  const [genreList, SetGenreList] = useState([]);

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => ({
        anime: activity.media.title.userPreferred,
        genre: activity.media.genres,
      }));
      const genreCount = fullData
        .map((anime) => anime.genre)
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
    <section>
      <h3>Anime genres</h3>
      <ol>
        {genreList && genreList.length > 0
          ? genreList.map((item) => <li key={item.id}>{item.genre}</li>)
          : null}
      </ol>
    </section>
  );
};
export default AnimeGenre;
