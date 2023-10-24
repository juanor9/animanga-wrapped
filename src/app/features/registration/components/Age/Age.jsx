import { useState } from 'react';

const Age = ({ color, clickFunction }) => {
  const [isChecked, setChecked] = useState(false);
  const handleCheckboxChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div>
      <p>
        Hey! Quick check-in: You&apos;re 18 or older, right? Just making sure before we dive deeper.
      </p>
      <form onSubmit={clickFunction}>
        <label htmlFor="accept">
          <input
            type="checkbox"
            name="acceptTerms"
            id="acceptTerms"
            className="register__checkbox"
            onChange={handleCheckboxChange}
          />
          Yes. I&apos;m 18 or older
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

export default Age;
