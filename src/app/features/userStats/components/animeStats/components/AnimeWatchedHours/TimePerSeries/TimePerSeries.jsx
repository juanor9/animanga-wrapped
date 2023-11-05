import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './TimePerSeries.scss';

const TimePerSeries = ({ list }) => {
  const [orderList, serOrderList] = useState([]);
  useEffect(() => {
    if (list && Array.isArray(list)) {
      const listWithIds = list.map((e) => ({ ...e, id: uuidv4() }));
      serOrderList(listWithIds);
    }
  }, [list]);
  return (
    <ol className="time-watched-list">
      {orderList.map((anime) => <li key={anime.id} className="time-watched-list__items">{anime.anime}, {anime.timeWatched} minutes</li>)}
    </ol>
  );
};

export default TimePerSeries;
