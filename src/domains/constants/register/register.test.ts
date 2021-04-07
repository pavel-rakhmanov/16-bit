import { RegisterSize } from 'domains/constants';
import { getEnumNumberValues } from 'utils/enum';

import Register from './register';

const NUMBER_ENUM_VALUES = getEnumNumberValues(Object.values(Register));

describe('Register enum', () => {
  test('should be defined', () => {
    expect(Register).toBeDefined();
    expect(NUMBER_ENUM_VALUES.length).toBeGreaterThan(0);
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
