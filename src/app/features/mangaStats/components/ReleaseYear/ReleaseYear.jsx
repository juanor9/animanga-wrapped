/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';

const ReleaseYear = ({ list }) => {
  const [years, setYears] = useState([]);
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          manga: activity.media.title.userPreferred,
          year: activity.media.startDate.year,
        }
      ));
      const groupedByManga = fullData.reduce((acc, curr) => {
        if (!acc[curr.manga]) {
          acc[curr.manga] = [];
        }
        acc[curr.manga].push(curr);
        return acc;
      }, {});

      const uniqueMangaList = [];

      Object.values(groupedByManga).forEach((category) => {
        category.forEach((manga) => {
          if (!uniqueMangaList.some((item) => item.title === manga.manga)) {
            uniqueMangaList.push({
              title: manga.anime,
              year: manga.year,
            });
          }
        });
      });

      const yearCounts = uniqueMangaList.reduce((acc, curr) => {
        if (acc[curr.year]) {
          acc[curr.year]++;
        } else {
          acc[curr.year] = 1;
        }
        return acc;
      }, {});
      const yearsArray = Object.entries(yearCounts).map(([year, titles]) => ({
        year: parseInt(year, 10),
        titles,
      }));
      setYears(yearsArray.sort((a, b) => b.titles - a.titles));
    }
  }, [list]);
  return (
    <section className="release-year">
      <h3>Titles Per Release Year</h3>
      <ol className="release-year__list">
        {years && years.length > 0
          ? years.map((year) => (
            <li className="release-year__item">
              <strong>{year.year}: </strong>
              {year.titles} titles
            </li>
          ))
          : null}
      </ol>
    </section>
  );
};
export default ReleaseYear;
