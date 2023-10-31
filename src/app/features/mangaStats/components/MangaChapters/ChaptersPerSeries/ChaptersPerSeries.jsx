/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';

const ChaptersPerSeries = ({ list }) => {
  const [orderList, serOrderList] = useState([]);
  useEffect(() => {
    if (list && Array.isArray(list)) {
      serOrderList(list);
    }
  }, [list]);
  return (
    <ol className="time-watched-list">
      {orderList.map((manga) => (
        <li className="time-watched-list__items">
          {manga.manga}, {manga.readChapters}
          {manga.readChapters === 1
            ? ' chapter'
            : ' chapters'}
        </li>
      ))}
    </ol>
  );
};

export default ChaptersPerSeries;
