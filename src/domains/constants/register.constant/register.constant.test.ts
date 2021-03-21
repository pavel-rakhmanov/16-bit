import { Register } from './register.constant';

describe('Register constant', () => {
  test('Register should be defined', () => {
    expect(Register).toBeDefined();
    expect(Object.values(Register).length).toBeGreaterThan(0);
  });
});
