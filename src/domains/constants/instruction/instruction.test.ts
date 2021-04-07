import { InstructionSize } from 'domains/constants';
import { getEnumNumberValues } from 'utils/enum';

import Instruction from './instruction';

const NUMBER_ENUM_VALUES = getEnumNumberValues(Object.values(Instruction));

describe('Instruction enum', () => {
  test('should be defined', () => {
    expect(Instruction).toBeDefined();
    expect(NUMBER_ENUM_VALUES.length).toBeGreaterThan(0);
  });

  test(`values should be a valid ${InstructionSize} byte numbers`, () => {
    expect(
      NUMBER_ENUM_VALUES.every(
        (num) => num >= 0 && num <= 2 ** (InstructionSize * 8)
      )
    ).toBe(true);
  });

  test(`values should be uniq numbers`, () => {
    expect(
      NUMBER_ENUM_VALUES.every((num, index, arr) => arr.indexOf(num) === index)
    ).toBe(true);
  });
});
