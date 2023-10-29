/* eslint-disable react/jsx-key */
const TimePerSeries = ({ list }) => (
  <ol>
    {list.map((anime) => <li>{anime.anime}, {anime.timeWatched} minutes</li>)}
  </ol>
);

export default TimePerSeries;
