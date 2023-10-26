import React from 'react';
import Select from 'react-select';
import { countries } from 'countries-list';

const CountrySelect = ({ onChange }) => {
  // Convertir el objeto de países a un array para poder mapearlo fácilmente
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  return (
    <Select
      options={countryOptions}
      onChange={onChange}
      placeholder="Select a country..."
    />
  );
};

export default CountrySelect;
