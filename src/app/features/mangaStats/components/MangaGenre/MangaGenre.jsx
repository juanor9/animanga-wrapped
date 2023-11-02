/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';

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
          ? genreList.map((item) => (
            <li>{item.genre}</li>
          ))
          : null}
      </ol>
    </section>
  );
};
export default MangaGenre;
