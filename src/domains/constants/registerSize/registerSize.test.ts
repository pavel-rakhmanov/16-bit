import RegisterSize from './registerSize';

describe('RegisterSize constant', () => {
  test('should be defined', () => {
    expect(RegisterSize).toBeDefined();
  });

  test('should be 1 for 8 bit registers', () => {
    expect(RegisterSize).toEqual(1);
  });
});
