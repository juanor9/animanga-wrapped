import React, { useState, useEffect } from 'react';

const AnimeFormat = ({ list }) => {
  const [formatData, setFormatData] = useState({});

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          anime: activity.media.title.userPreferred,
          format: activity.media.format,
        }
      ));
      const uniqueAnime = fullData.filter((
        anime,
        index,
        selfArray,
      ) => selfArray.findIndex((t) => t.anime === anime.anime) === index);
      const formats = uniqueAnime.reduce((acc, item) => {
        acc[item.format] = (acc[item.format] || 0) + 1;
        return acc;
      }, {});
      setFormatData(formats);
    }
  }, [list]);

  return (
    <section>
      <h3>Anime Format</h3>
      <ul>
        {Object.entries(formatData).map(([format, count]) => (
          <li key={format}>
            <strong>{format}:</strong> {count}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default AnimeFormat;
