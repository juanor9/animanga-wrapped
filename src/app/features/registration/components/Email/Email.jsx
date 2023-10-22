const Email = ({ color, clickFunction }) => (
  <div>
    <p>

      Ready to get started?
      Just pop in your email for us.
      Don&apos;t worry, we&apos;ll treat it like a
      limited edition manga – with utmost care.

    </p>
    <form onSubmit={clickFunction}>
      <label htmlFor="email">
        Email
        <input type="email" name="email" id="email" />
      </label>
      <button type="submit" className={`register__button register__button--${color}`}>Submit</button>
    </form>

  </div>
);

export default Email;
