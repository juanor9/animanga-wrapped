import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Bar } from 'react-chartjs-2';
import './LaunchYear.scss';
import StoryCard from '../../../../../../components/Stories/Stories';

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
        id: uuidv4(),
        year: parseInt(year, 10),
        titles,
      }));
      setYears(yearsArray.sort((a, b) => b.year - a.year));
    }
  }, [list]);

  const data = {
    labels: years.map((i) => i.year),
    datasets: [{
      label: 'My First Dataset',
      data: years.map((i) => i.titles),
      backgroundColor: [
        'rgba(255,145,255)',
        'rgba(255,211,25)',
        'rgba(49,181,122)',
        'rgba(252, 128,45)',
      ],
      borderColor: 'transparent',
      color: 'rgba(48, 42, 37,1)',
      barThickness: 16,
      categoryPercentage: 0.5,
      barPercentage: 1,
    }],
  };

  const options = {
    indexAxis: 'y',
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: true,
      },
    },
  };

  return (
    <StoryCard key="5" id="5">
      <p>These are the release years of the anime you watched this year:</p>
      <div style={{ height: '400px' }}>
        <Bar
          data={data}
          options={options}
        />
      </div>
    </StoryCard>
  );
};
export default LauchYear;
