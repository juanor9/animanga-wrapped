import './PopularItemCard.scss';

const PopularItemCard = ({ item }) => {
  // console.log('🚀 ~ file: PopularItemCard.jsx:2 ~ PopularItemCard ~ item:', item);
  const title = item.title.romaji;
  // console.log('🚀 ~ file: PopularItemCard.jsx:4 ~ PopularItemCard ~ title:', title);
  const image = item.coverImage.large;

  function truncateString(str, maxLength = 25) {
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
