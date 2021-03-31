import { RegisterSize } from 'domains/constants';

import Register from './register';

const ENUM_VALUES = Object.values(Register);
const NUMBER_ENUM_VALUES = ENUM_VALUES.reduce((acc: Register[], value) => {
  if (Number(value)) {
    acc.push(Number(value));
  }

  return acc;
}, []);

describe('Register enum', () => {
  test('should be defined', () => {
    expect(Register).toBeDefined();
    expect(Object.values(Register).length).toBeGreaterThan(0);
  });

  test(`values should be a valid ${RegisterSize} byte numbers`, () => {
    expect(
      NUMBER_ENUM_VALUES.every(
        (num) => num >= 0 && num <= 2 ** (RegisterSize * 8)
      )
    ).toBe(true);
  });

  test(`values should be uniq numbers`, () => {
    expect(
      NUMBER_ENUM_VALUES.every((num, index, arr) => arr.indexOf(num) === index)
    ).toBe(true);
  });
});
