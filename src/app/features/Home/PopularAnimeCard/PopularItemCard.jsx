import './PopularItemCard.scss';

const PopularItemCard = ({ item }) => {
  const title = item.title.romaji;
  const image = item.coverImage.large;

  function truncateString(str, maxLength = 35) {
    if (str.length <= maxLength) return str;
    return `${str.slice(0, maxLength - 3)}...`;
  }

  return (
    <div className="card">
      <picture className="card__image">
        <img src={image} alt={title} />
      </picture>
      <p className="card__title">{truncateString(title)}</p>
    </div>
  );
};

export default PopularItemCard;
