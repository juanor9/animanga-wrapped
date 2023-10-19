/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-console */
const ActivityCard = (anime) => {
  // console.log('🚀 ~ file: ActivityCard.jsx:4 ~ ActivityCard ~ anime:', anime);
  const { title } = anime.anime;
  const img = anime.anime.main_picture.medium;
  const { status } = anime.anime.my_list_status;
  const episodes = anime.anime.my_list_status.num_episodes_watched;
  // console.log('🚀 ~ file: ActivityCard.jsx:9 ~ ActivityCard ~ episodes:', episodes);
  return (
    <div>
      <picture>
        <img src={img} alt={title} />
      </picture>
      <p>{title}</p>
      <p>{status}</p>
      {status === 'watching'
        ? <p>Episode {episodes}</p>
        : null}
    </div>
  );
};

export default ActivityCard;
