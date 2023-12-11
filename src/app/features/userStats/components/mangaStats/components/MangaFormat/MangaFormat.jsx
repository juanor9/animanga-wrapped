import { useState, useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2';
import StoryCard from '../../../../../../components/Stories/Stories';

const year = process.env.NEXT_PUBLIC_YEAR;

const MangaFormat = ({ list }) => {
  const [formatData, setFormatData] = useState({});
  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          manga: activity.media.title.userPreferred,
          format: activity.media.format.replace('_', ' ').toLowerCase(),
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

  const data = {
    labels: Object.keys(formatData),
    datasets: [{
      label: 'My First Dataset',
      data: Object.values(formatData),
      backgroundColor: [
        'rgba(255,145,255)',
        'rgba(255,211,25)',
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
          size: 18,
          align: 'center',
          family: 'Poppins',
        },
      },
      legend: {
        labels: {
          color: 'rgba(48, 42, 37,1)',
          font: {
            size: 18,
            family: 'Poppins',
          },
        },
      },
    },
    cutout: '50%',
  };
  return (
    <StoryCard key="10" id="10" color="green">
      <p className="story__main-copy">This is how you distributed your manga formats on {year}:</p>
      <Doughnut
        data={data}
        options={options}
      />
    </StoryCard>
  );
};

export default MangaFormat;
