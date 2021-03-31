import prettify8bitNumber from './prettify8bitNumber';

describe('prettify8bitNumber', () => {
  test('should correctly prettify number', () => {
    expect(prettify8bitNumber(42)).toBe('0x2a');
  });
});
