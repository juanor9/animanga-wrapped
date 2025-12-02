/* eslint-disable no-console */
import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import UserAL from '../../../anilist/components/UserAL/UserAL';
import './AnilistCustom.scss';

const AnilistCustom = ({ color, clickFunction }) => {
  const t = useTranslations('registration.anilistCustom');
  // TODO: 1.Registrar en un estado de redux los valores que trae el query de Anilist.

  const [selectedLists, setSelectedLists] = useState({
    anime: false,
    manga: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedLists((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  const [isList, setIsList] = useState(false);

  return (
    <div>
      <p>{t('message')}</p>
      <form onSubmit={clickFunction} className="custom__form">
        <div className="custom__form-checkbox">
          <label htmlFor="anime">
            <input type="checkbox" name="anime" id="anime" onChange={handleCheckboxChange} />{' '}
            {t('animeList')}
          </label>
          <label htmlFor="manga">
            <input type="checkbox" name="manga" id="manga" onChange={handleCheckboxChange} />{' '}
            {t('mangaList')}
          </label>
        </div>

        <UserAL settings={selectedLists} checkFunc={setIsList} />
        <button
          type="submit"
          className={`register__button ${!isList ? 'register__button--disabled' : `register__button--${color}`} `}
        >
          {t('button')}
        </button>
      </form>
    </div>
  );
};

export default AnilistCustom;
