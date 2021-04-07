import RegisterSize from './registerSize';

describe('RegisterSize constant', () => {
  test('should be defined', () => {
    expect(RegisterSize).toBeDefined();
  });

  test('should be equal to 1', () => {
    expect(RegisterSize).toEqual(1);
  });
});
