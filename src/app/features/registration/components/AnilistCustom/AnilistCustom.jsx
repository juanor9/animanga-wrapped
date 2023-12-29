/* eslint-disable no-console */
import React, { useState } from 'react';
import UserAL from '../../../anilist/components/UserAL/UserAL';
import './AnilistCustom.scss';

const AnilistCustom = ({ color, clickFunction }) => {
  // TODO: 1.Registrar en un estado de redux los valores que trae el query de Anilist.

  const [selectedLists, setSelectedLists] = useState({
    anime: false,
    manga: false,
  });
  console.log('🚀 ~ file: AnilistCustom.jsx:12 ~ AnilistCustom ~ selectedLists:', selectedLists);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedLists((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  return (
    <div>
      <p>
        Next up! Choose which lists you&apos;d like us to analyze:
        just your anime, only your manga, or both. Once selected,
        please confirm if the displayed records are correct. Make
        your pick and let&apos;s continue with the next step.
      </p>
      <form onSubmit={clickFunction} className="custom__form">
        <div className="custom__form-checkbox">
          <label htmlFor="anime">
            <input
              type="checkbox"
              name="anime"
              id="anime"
              onChange={handleCheckboxChange}
            /> Anime List
          </label>
          <label htmlFor="manga">
            <input
              type="checkbox"
              name="manga"
              id="manga"
              onChange={handleCheckboxChange}
            /> Manga List
          </label>
        </div>

        <UserAL settings={selectedLists} />
        <button
          type="submit"
          className={`register__button register__button--${color}`}
        >
          Next
        </button>
      </form>

    </div>
  );
};

export default AnilistCustom;
