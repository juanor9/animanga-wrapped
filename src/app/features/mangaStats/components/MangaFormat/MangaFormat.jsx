import { useState, useEffect } from 'react';

const MangaFormat = ({ list }) => {
  const [formatData, setFormatData] = useState({});
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          manga: activity.media.title.userPreferred,
          format: activity.media.format,
        }
      ));
      const uniqueAnime = fullData.filter((
        manga,
        index,
        selfArray,
      ) => selfArray.findIndex((t) => t.manga === manga.manga) === index);
      const formats = uniqueAnime.reduce((acc, item) => {
        acc[item.format] = (acc[item.format] || 0) + 1;
        return acc;
      }, {});
      setFormatData(formats);
    }
  }, [list]);
  return (
    <section>
      <h3>Manga Format</h3>
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

export default MangaFormat;
