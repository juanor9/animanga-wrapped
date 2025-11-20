import { countries } from 'countries-list';
import React from 'react';
import Select from 'react-select';

const CountrySelect = ({ onChange }) => {
  const countryOptions = Object.entries(countries).map(([code, country]) => ({
    value: code,
    label: country.name,
  }));

  return <Select options={countryOptions} onChange={onChange} placeholder="Select a country..." />;
};

export default CountrySelect;
