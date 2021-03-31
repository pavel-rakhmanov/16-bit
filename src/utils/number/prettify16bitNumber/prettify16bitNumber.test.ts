import prettify16bitNumber from './prettify16bitNumber';

describe('prettify16bitNumber', () => {
  test('should correctly prettify number', () => {
    expect(prettify16bitNumber(42)).toBe('0x002a');
  });
});
