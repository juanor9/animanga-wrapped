import './PopularAnimeCard.scss';

const PopularAnimeCard = ({ item, rank, type = 'anime' }) => {
  const title = item?.title?.romaji ?? 'Unknown Title';
  const image = item?.coverImage?.large ?? '';
  const id = item?.id;

  // Get studio for anime or author for manga
  const subtitle =
    type === 'anime'
      ? (item?.studios?.nodes?.[0]?.name ?? 'Unknown Studio')
      : (item?.staff?.edges?.[0]?.node?.name?.full ?? 'Unknown Author');

  const anilistUrl = `https://anilist.co/${type}/${id}`;

  return (
    <a
      href={anilistUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="song-card"
      aria-label={`View ${title} on AniList`}
    >
      <div className="song-card__rank">{rank}</div>
      <div className="song-card__image">
        <img src={image} alt={title} />
      </div>
      <div className="song-card__info">
        <h3 className="song-card__title">{title}</h3>
        <p className="song-card__artist">{subtitle}</p>
      </div>
    </a>
  );
};

export default PopularAnimeCard;
