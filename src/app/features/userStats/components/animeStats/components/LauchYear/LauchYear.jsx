/* eslint-disable react/jsx-key */
/* eslint-disable no-plusplus */
/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import './LaunchYear.scss';

const LauchYear = ({ list }) => {
  const [years, setYears] = useState([]);
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          anime: activity.media.title.userPreferred,
          year: activity.media.startDate.year,
        }
      ));
      const groupedByAnime = fullData.reduce((acc, curr) => {
        if (!acc[curr.anime]) {
          acc[curr.anime] = [];
        }
        acc[curr.anime].push(curr);
        return acc;
      }, {});

      const uniqueAnimeList = [];

      Object.values(groupedByAnime).forEach((category) => {
        category.forEach((anime) => {
          if (!uniqueAnimeList.some((item) => item.title === anime.anime)) {
            uniqueAnimeList.push({
              title: anime.anime,
              year: anime.year,
            });
          }
        });
      });

      const yearCounts = uniqueAnimeList.reduce((acc, curr) => {
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
export default LauchYear;
