import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
// TODO: realizar el conteo, no por cantidad de actividades, sino por cantidad de capítulos leídos.

const Mangaka = ({ list }) => {
  const [mangakaList, SetMangakaList] = useState([]);

  useEffect(() => {
    if (list) {
      const fullData = list.map((activity) => (
        {
          manga: activity.media.title.userPreferred,
          staff: activity.media.staff.nodes,
        }
      ));
      const mangakaFilter = fullData.map((activity) => {
        const filteredActivity = {
          manga: activity.manga,
          mangaka: activity.staff.filter((staffMember) => staffMember.primaryOccupations.includes('Mangaka')),
        };
        return filteredActivity;
      });
      const mangakaCount = {};
      mangakaFilter.forEach((mangaEntry) => {
        mangaEntry.mangaka.forEach((mangaka) => {
          const mangakaName = mangaka.name.userPreferred;
          if (!mangakaCount[mangakaName]) {
            mangakaCount[mangakaName] = 1;
          } else {
            mangakaCount[mangakaName] += 1;
          }
        });
      });
      const result = Object.entries(mangakaCount).map(
        ([mangakaName, count]) => (
          {
            id: uuidv4(),
            mangaka: mangakaName,
            count,
          }),
      );
      const mangakaListSorted = result.sort((a, b) => b.count - a.count);
      SetMangakaList(mangakaListSorted);
    }
  }, [list]);
  return (
    <section>
      <h3>Most Read Mangaka</h3>
      <ol>
        {mangakaList
          ? mangakaList.map((item) => (
            <li key={item.id}>{item.mangaka}</li>
          ))
          : null}
      </ol>
    </section>
  );
};
export default Mangaka;
