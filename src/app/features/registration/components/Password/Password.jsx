const Password = ({ color }) => (
  <div>
    <p>
      Alright, last piece of the puzzle!
      Let&apos;s set a sturdy password to safeguard your epic
      yearly stats. After this, we&apos;ll break down your
      anime and manga journey for the year!
    </p>
    <form action="">
      <label htmlFor="password">
        Password
        <input type="password" name="password" id="password" />
      </label>
      <button type="submit" className={`register__button register__button--${color}`}>Save</button>
    </form>
  </div>
);
export default Password;
