import React, { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import StoryCard from '../../../../../../components/Stories/Stories';

const year = process.env.NEXT_PUBLIC_YEAR;

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

  const data = {
    labels: Object.keys(formatData),
    datasets: [{
      label: 'My First Dataset',
      data: Object.values(formatData),
      backgroundColor: [
        'rgba(255,145,255)',
        'rgba(255,211,25)',
        'rgba(49,181,122)',
        'rgba(252, 128,45)',
      ],
      borderColor: 'transparent',
      color: 'rgba(48, 42, 37,1)',
    }],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label(context) {
            let label = context.label || '';

            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              label += context.parsed;
            }
            return label;
          },
        },
      },
      datalabels: {
        display: true,
        color: 'rgba(48, 42, 37,1)',
        formatter: (value) => `${value}`,
        font: {
          weight: 'bold',
          size: 18,
          align: 'center',
        },
      },
      legend: {
        labels: {
          color: 'rgba(48, 42, 37,1)',
          font: {
            weight: 'bold',
            size: 18,
          },
        },
      },
    },
    cutout: '50%',
  };

  return (
    <StoryCard key="4" id="4" color="yellow">
      <p>This is how you distributed your formats on {year}:</p>
      <Doughnut
        data={data}
        options={options}
      />
    </StoryCard>
  );
};

export default AnimeFormat;
