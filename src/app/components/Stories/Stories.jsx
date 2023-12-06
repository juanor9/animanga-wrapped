const StoryCard = ({ children, color }) => (
  <div id="series-story" className={`story story--${color}-gradient`}>
    <div>
      {children}
    </div>
    <div className="story__footer">
      <p>animanga-wrapped.vercel.app</p>
    </div>
  </div>
);

export default StoryCard;
