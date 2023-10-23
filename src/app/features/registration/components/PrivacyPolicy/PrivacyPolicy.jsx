import { useState } from 'react';
import PrivacyPolicyPage from '../../../../privacy-policy/page';

const PrivacyPolicy = ({ color, clickFunction }) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <div>
      <p>
        For your own safety groove,
        take a moment to dive into our
        Privacy Policy. It&apos;s crucial.
      </p>
      <form onSubmit={clickFunction}>
        <label htmlFor="accept">
          <div className="register__formal-text">
            <PrivacyPolicyPage />
          </div>
          <input
            type="checkbox"
            name="acceptPolicy"
            id="acceptPolicy"
            className="register__checkbox"
            onChange={handleCheckboxChange}
          />
          I&apos;ve read and accept the Privacy Policy.
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

export default PrivacyPolicy;
