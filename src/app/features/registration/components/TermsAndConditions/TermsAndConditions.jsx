import { useState } from 'react';
import TermsAndConditionsPage from '../../../../terms-and-conditions/page';
import './TermsAndConditions.scss';

const TermsAndConditions = ({ color, clickFunction }) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <p>
        Alright, time for the epic saga:
        our Terms & Conditions. Yeah, it&apos;s
        a bit of a read, but it&apos;s worth the journey.
        Check &apos;em out.
      </p>
      <div className="register__formal-text">
        <TermsAndConditionsPage />
      </div>
      <form onSubmit={clickFunction}>
        <label htmlFor="accept">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            className="register__checkbox"
            onChange={handleCheckboxChange}
          />
          I&apos;ve read and accept the Terms and Conditions.
          {isChecked !== true
            ? (
              <button
                type="submit"
                className="register__button register__button--disabled"
              >Next
              </button>
            )
            : (
              <button
                type="submit"
                className={`register__button register__button--${color}`}
              >Next
              </button>
            )}

        </label>
      </form>
    </div>
  );
};

export default TermsAndConditions;
