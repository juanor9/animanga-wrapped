const First = ({ color, clickFunction }) => (
  <div>
    <h3>Welcome!</h3>
    <p>

      Hey there! Thanks for jumping on board with us.
      We&apos;re stoked to whip up an awesome recap of all the anime
      you&apos;ve binged and the manga pages you&apos;ve flipped through this year.
      But first, let&apos;s get to know each other a bit. Promise,
      it&apos;ll be a breeze.

    </p>
    <button
      type="button"
      className={`register__button register__button--${color}`}
      onClick={clickFunction}
    >
      Let&apos;s begin!
    </button>
  </div>
);
export default First;
