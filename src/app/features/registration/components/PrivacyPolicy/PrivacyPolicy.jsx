const PrivacyPolicy = ({ color, clickFunction }) => (
  <div>
    <p>
      For your own safety groove,
      take a moment to dive into our
      Privacy Policy. It&apos;s crucial.
    </p>
    <form onSubmit={clickFunction}>
      <label htmlFor="accept">
        <input type="checkbox" name="acceptPolicy" id="acceptPolicy" />
        I&apos;ve read and accept the Privacy Policy.
        <button type="submit" className={`register__button register__button--${color}`}>Next</button>
      </label>
    </form>
  </div>
);

export default PrivacyPolicy;
