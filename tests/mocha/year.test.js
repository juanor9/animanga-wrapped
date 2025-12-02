import { expect } from 'chai';

describe('Year constants', () => {
  before(() => {
    process.env.NEXT_PUBLIC_YEAR = '2025';
  });

  it('exposes the year string and coerces it to a number', async () => {
    const { yearNumber, yearString } = await import('../../src/app/lib/constants/year.js');

    expect(yearString).to.equal('2025');
    expect(yearNumber).to.equal(2025);
  });
});
