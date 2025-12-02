import { expect } from 'chai';

import { COUNTRIES } from '../../src/app/lib/constants/countries';

describe('COUNTRIES constant', () => {
  it('contains 50 country definitions', () => {
    expect(COUNTRIES).to.have.lengthOf(50);
  });

  it('preserves code and name structure for common locales', () => {
    const unitedStates = COUNTRIES.find((country) => country.code === 'US');
    const japan = COUNTRIES.find((country) => country.code === 'JP');

    expect(unitedStates).to.deep.equal({ code: 'US', name: 'United States' });
    expect(japan).to.deep.equal({ code: 'JP', name: 'Japan' });
  });
});
