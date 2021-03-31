import { Register } from './register';

describe('Register enum', () => {
  test('should be defined', () => {
    expect(Register).toBeDefined();
    expect(Object.values(Register).length).toBeGreaterThan(0);
  });

  test('values should be uniq', () => {
    expect(Object.values(Register).every((value, index, arr) => arr.indexOf(value) === index)).toBe(true);
  });
});
