import './ActivityCard.scss';

const ActivityCard = ({ activity }) => {
  function convertTimestampToDate(timestamp) {
    if (!timestamp) return '';
    const dateObj = new Date(timestamp * 1000);
    return dateObj.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  }

  const { status, progress, media, createdAt } = activity;

  if (
    status === 'plans to watch' ||
    status === 'plans to read' ||
    status === 'paused watching' ||
    status === 'dropped' ||
    status === 'paused reading'
  ) {
    return null;
  }

  const date = convertTimestampToDate(createdAt);
  const title = media?.title?.userPreferred || 'Unknown Title';
  const image = media?.coverImage?.large || media?.coverImage?.medium;

  // Helper for status formatting
  const getStatusStyle = (s) => {
    switch (s?.toLowerCase()) {
      case 'completed':
        return 'completed';
      case 'current':
      case 'watching':
      case 'reading':
        return 'current';
      default:
        return 'default';
    }
  };

  return (
    <div className={`activity-card activity-card--${getStatusStyle(status)}`}>
      <div className="activity-card__image-container">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt={title} className="activity-card__image" />
        <span className="activity-card__status-badge">
          {status} {progress ? ` ${progress}` : ''}
        </span>
      </div>
      <div className="activity-card__content">
        <h3 className="activity-card__title" title={title}>
          {title}
        </h3>
        <p className="activity-card__date">{date}</p>
      </div>
    </div>
  );
};

export default ActivityCard;
