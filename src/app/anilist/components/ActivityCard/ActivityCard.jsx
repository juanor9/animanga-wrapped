import "./ActivityCard.scss";

const ActivityCard = ({ activity }) => {
  function convertTimestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);

    return date.toDateString();
  }

  const date = convertTimestampToDate(activity.createdAt);
  const { status, progress, media } = activity;
  const title = media.title.userPreferred;
  const image = media.coverImage.medium;

  if (status !== "watched episode" && status !== "completed") {
    console.log(activity)
    return null;
  }

  return (
    <div className="activity-card">
      <img src={image} alt={title} />
      <p>Date: {date}</p>
      <p>Anime: {title}</p>
      <p>
        Status: {status} {progress ? progress : null}
      </p>
    </div>
  );
};

export default ActivityCard;
