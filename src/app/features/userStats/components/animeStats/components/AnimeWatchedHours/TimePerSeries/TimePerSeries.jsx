/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import './TimePerSeries.scss';

const TimePerSeries = ({ list }) => {
  const [orderList, serOrderList] = useState([]);
  useEffect(() => {
    if (list && Array.isArray(list)) {
      serOrderList(list);
    }
  }, [list]);
  return (
    <ol className="time-watched-list">
      {orderList.map((anime) => <li className="time-watched-list__items">{anime.anime}, {anime.timeWatched} minutes</li>)}
    </ol>
  );
};

export default TimePerSeries;
