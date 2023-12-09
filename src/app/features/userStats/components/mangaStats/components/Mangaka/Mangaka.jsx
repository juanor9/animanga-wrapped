import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import StoryCard from '../../../../../../components/Stories/Stories';
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
          const mangakaPic = mangaka.image.large;
          if (!mangakaCount[mangakaName]) {
            mangakaCount[mangakaName] = { titles: 1, image: mangakaPic }; // Initialize the object
          } else {
            mangakaCount[mangakaName].titles += 1;
          }
        });
      });
      const result = Object.entries(mangakaCount).map(
        (e) => (
          {
            id: uuidv4(),
            mangaka: e[0],
            img: e[1].image,
            count: e[1].titles,
          }
        ),
      );
      const mangakaListSorted = result.sort((a, b) => b.count - a.count);
      SetMangakaList(mangakaListSorted);
    }
  }, [list]);
  return (
    <StoryCard>
      <h3>Most Read Mangaka</h3>
      <ol>
        {mangakaList
          ? mangakaList.slice(0, 5).map((item) => (
            <li key={item.id}>
              <picture>
                <img src={item.img} alt={item.mangaka} />
              </picture>
              <div>
                <p>{item.mangaka}</p>
              </div>
            </li>
          ))
          : null}
      </ol>
    </StoryCard>
  );
};
export default Mangaka;
