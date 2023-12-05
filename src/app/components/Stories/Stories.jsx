const StoryCard = ({ children }) => (
  <div id="series-story" className="story">
    <div>
      {children}
    </div>
    <div className="story__footer">
      <p>Anime Anime and Manga Year Wrapped</p>
      <p>animanga-wrapped.vercel.app/</p>
    </div>
  </div>
);

export default StoryCard;
