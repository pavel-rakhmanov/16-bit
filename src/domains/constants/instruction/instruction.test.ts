import { InstructionSize } from 'domains/constants';

import Instruction from './instruction';

const ENUM_VALUES = Object.values(Instruction);
const NUMBER_ENUM_VALUES = ENUM_VALUES.reduce((acc: Instruction[], value) => {
  if (Number(value)) {
    acc.push(Number(value));
  }

  return acc;
}, []);

describe('Instruction enum', () => {
  test('values should be a numbers', () => {
    expect(NUMBER_ENUM_VALUES.length).toEqual(ENUM_VALUES.length / 2);
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
