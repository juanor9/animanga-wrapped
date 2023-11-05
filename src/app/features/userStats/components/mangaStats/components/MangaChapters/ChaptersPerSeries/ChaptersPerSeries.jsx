import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const ChaptersPerSeries = ({ list }) => {
  const [orderList, serOrderList] = useState([]);
  useEffect(() => {
    if (list && Array.isArray(list)) {
      const listWithIds = list.map((e) => ({ ...e, id: uuidv4() }));
      serOrderList(listWithIds);
    }
  }, [list]);
  return (
    <ol className="time-watched-list">
      {orderList.map((manga) => (
        <li className="time-watched-list__items" key={manga.id}>
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
