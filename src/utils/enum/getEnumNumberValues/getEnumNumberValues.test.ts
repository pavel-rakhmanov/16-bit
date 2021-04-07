import getEnumNumberValues from './getEnumNumberValues';

describe('getEnumNumberValues', () => {
  test('correctly work with enum wit not explicitly defined values', () => {
    enum ENUM {
      A,
      B,
      C,
    }

    expect(getEnumNumberValues(ENUM)).toEqual([0, 1, 2]);
  });

  test('correctly work with enum wit explicitly defined values', () => {
    enum ENUM {
      A = 8,
      B = 42,
      C = 69,
    }

    expect(getEnumNumberValues(ENUM)).toEqual([8, 42, 69]);
  });

  test('should throw if not all enum keys are numbers', () => {
    enum ENUM {
      A,
      B = 'B',
      C = 42,
    }

    expect(() => getEnumNumberValues(ENUM)).toThrow();
  });
});
