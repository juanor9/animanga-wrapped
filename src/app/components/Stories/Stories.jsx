const StoryCard = ({ children, color }) => (
  <div id="series-story" className={`story story--${color}-gradient`}>
    <div className="story__content">
      {children}
    </div>
    <div className="story__footer">
      <p className="story__footer-link">animanga-wrapped.vercel.app</p>
    </div>
  </div>
);

export default StoryCard;
