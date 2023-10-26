import './ActivityCard.scss';

const ActivityCard = ({ activity }) => {
  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);

    return date.toDateString();
  }

  const date = convertTimestampToDate(activity.createdAt);
  const { status, progress, media } = activity;
  const title = media.title.userPreferred;
  const image = media.coverImage.medium;

  if (
    status === 'plans to watch'
    || status === 'plans to read'
    || status === 'paused watching'
    || status === 'dropped'
    || status === 'paused reading'
  ) {
    return null;
  }

  return (
    <div className="activity-card">
      <picture>
        <img src={image} alt={title} />
      </picture>
      <div>
        <p>{title}</p>
        <p>Date: {date}</p>
        <p>
          Status: {status} {progress || null}
        </p>
      </div>
    </div>
  );
};

export default ActivityCard;
