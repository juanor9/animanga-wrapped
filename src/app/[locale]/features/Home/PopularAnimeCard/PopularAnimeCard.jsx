import './PopularAnimeCard.scss';

const PopularAnimeCard = ({ item }) => {
  const title = item?.title?.romaji ?? 'Unknown Title';
  const image = item?.coverImage?.large ?? '';

  const truncateString = (str, maxLength = 35) => {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength - 3)}...`;
  };

  const safeTitle = truncateString(title);

  return (
    <div className="card">
      <picture className="card__image">
        <img src={image} alt={title} />
      </picture>
      <p className="card__title">{safeTitle}</p>
    </div>
  );
};

export default PopularAnimeCard;
