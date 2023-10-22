/* eslint-disable no-unused-vars */
const TermsAndConditions = ({ color, clickFunction }) => (
  <div>
    <p>
      Alright, time for the epic saga:
      our Terms & Conditions. Yeah, it&apos;s
      a bit of a read, but it&apos;s worth the journey.
      Check &apos;em out.
    </p>
    <form onSubmit={clickFunction}>
      <label htmlFor="accept">
        <input type="checkbox" name="acceptTerms" id="acceptTerms" />
        I&apos;ve read and accept the Terms and Conditions.
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >Next
        </button>
      </label>
    </form>
  </div>
);

export default TermsAndConditions;
